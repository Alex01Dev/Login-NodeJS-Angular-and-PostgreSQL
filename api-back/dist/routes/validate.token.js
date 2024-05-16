"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Cargar las variables de entorno
const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (headerToken && headerToken.startsWith('Bearer')) {
        // Tiene token
        try {
            const bearerToken = headerToken;
            jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || 'lolsito');
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                res.status(401).json({
                    msg: "El token ha expirado. Por favor, inicie sesión nuevamente."
                });
            }
            else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                res.status(401).json({
                    msg: "El token es inválido. Por favor, inicie sesión nuevamente."
                });
            }
            else {
                res.status(401).json({
                    msg: "Ocurrió un error al verificar el token de autorización."
                });
            }
        }
    }
    else {
        res.status(401).json({
            msg: "Acceso denegado. Se requiere un token de autorización en el encabezado 'Authorization'."
        });
    }
};
exports.default = validateToken;
