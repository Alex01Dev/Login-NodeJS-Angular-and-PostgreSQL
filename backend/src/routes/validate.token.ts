import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const validateToken = (req: Request, res:Response, next: NextFunction) => {

    const headerToken = req.headers['authorization']

    if(headerToken != undefined && headerToken.startsWith('Bearer')) {
        //Tiene token

        try {

        const bearerToken = headerToken.slice(7);
        jwt.verify(bearerToken, process.env.SECRET_KEY || 'lolsito');
        next();

        } catch (error) {

            res.status(401).json({
                msg: "invalid token"
            })
            
        }
        
    } else {
        res.status(401).json({
            msg: "Acceso denegado"
        })
    }

}

export default validateToken;