
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.modell';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export const newUser = async (req: Request, res:Response) => {

    const { username, password  } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);

    //Verificar que no exista un usuario existete con el usuario para evitar duplicados en la bd
    const user = await User.findOne({
        where: {
            username: username //SELECT * FROM tbb_name WHERE username = username (sustitución con el findOne)
        }
    });

    if(username) {
        return res.status(400).json({ //el return sirve para que no se siga ejecutando el código si encontró un error o el usuario repetido
            msg: "Usuario ya existente"
        })
    }

    //Insertar un usuario en la bd
    try {
        //utilizamos el trychatch para atrapar un error si hay al registrar y que no crashee en caso de suceder
        await User.create({
            username: username,
            password: hashedPass
        })

        res.json({
            msg:`Usuario ${username} registrado`,
        })

    } catch (error) {
        //Atrapa el error y devuelve un mensaje 
        res.status(400).json({
            msg: 'error en servidor',
            error
        })

    }

}


export const loginUser = async (req: Request, res:Response) => {

    const { username, password  } = req.body;

    //Validar usuario si existe en la bd
    const user: any = await User.findOne({
        where: {
            username: username //SELECT * FROM tbb_name WHERE username = username (sustitución con el findOne)
        }
    });

    if(!user) {
        return res.status(400).json({
            msg: `Usuario ${username} no existente en la BD`
        });
    }

    //Validar su password
    const passValid = await bcrypt.compare(password, user.password)
    if(!passValid) {
        return res.status(400).json({
            msg: "Error en la clave"
        });
    }

    //Generar token
    //NUNCA poner información sensible en el token porque se puede decodificar y vulnerar la información
    const token = jwt.sign({
        username: username
    }, process.env.SECRET_KEY || 'lolsito',);

    res.json({token});

}