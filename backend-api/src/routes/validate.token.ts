import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); // Cargar las variables de entorno

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization'];

    if (headerToken && headerToken.startsWith('Bearer')) {
        // Tiene token
        try {
            const bearerToken = headerToken.slice(7);
            jwt.verify(bearerToken, process.env.SECRET_KEY || 'lolsito');
            next();
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                res.status(401).json({
                    msg: "El token ha expirado. Por favor, inicie sesión nuevamente."
                });
            } else if (error instanceof jwt.JsonWebTokenError) {
                res.status(401).json({
                    msg: "El token es inválido. Por favor, inicie sesión nuevamente."
                });
            } else {
                res.status(401).json({
                    msg: "Ocurrió un error al verificar el token de autorización."
                });
            }
        }
    } else {
        res.status(401).json({
            msg: "Acceso denegado. Se requiere un token de autorización en el encabezado 'Authorization'."
        });
    }
}

export default validateToken;
