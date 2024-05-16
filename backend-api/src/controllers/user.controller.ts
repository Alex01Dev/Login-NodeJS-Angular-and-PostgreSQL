
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

    if(user) {
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


export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Validar si el usuario existe en la base de datos
        const user: any = await User.findOne({
            where: { username }
        });

        if (!user) {
            return res.status(400).json({
                msg: `El usuario ${username} no existe`
            });
        }

        // Validar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                msg: "Error en la contraseña"
            });
        }

        // Generar token JWT
        const token = jwt.sign({
            username: user.username // Puedes agregar más información al token si es necesario
        }, process.env.SECRET_KEY || 'lolsito');

        // Devolver el token JWT al cliente
        res.json( token );
    } catch (error) {
        console.error("Error al autenticar usuario:", error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};