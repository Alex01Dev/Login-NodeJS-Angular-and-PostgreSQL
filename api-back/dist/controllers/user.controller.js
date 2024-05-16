"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_modell_1 = require("../models/user.modell");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const hashedPass = yield bcrypt_1.default.hash(password, 10);
    //Verificar que no exista un usuario existete con el usuario para evitar duplicados en la bd
    const user = yield user_modell_1.User.findOne({
        where: {
            username: username //SELECT * FROM tbb_name WHERE username = username (sustitución con el findOne)
        }
    });
    if (user) {
        return res.status(400).json({
            msg: "Usuario ya existente"
        });
    }
    //Insertar un usuario en la bd
    try {
        //utilizamos el trychatch para atrapar un error si hay al registrar y que no crashee en caso de suceder
        yield user_modell_1.User.create({
            username: username,
            password: hashedPass
        });
        res.json({
            msg: `Usuario ${username} registrado`,
        });
    }
    catch (error) {
        //Atrapa el error y devuelve un mensaje 
        res.status(400).json({
            msg: 'error en servidor',
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //Validar usuario si existe en la bd
    const user = yield user_modell_1.User.findOne({
        where: {
            username: username //SELECT * FROM tbb_name WHERE username = username (sustitución con el findOne)
        }
    });
    if (!user) {
        return res.status(400).json({
            msg: `Usuario ${username} no existente en la BD`
        });
    }
    //Validar su password
    const passValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passValid) {
        return res.status(400).json({
            msg: "Error en la clave"
        });
    }
    //Generar token
    //NUNCA poner información sensible en el token porque se puede decodificar y vulnerar la información
    const token = jsonwebtoken_1.default.sign({
        username: username
    }, process.env.SECRET_KEY || 'lolsito');
    res.json({ token });
});
exports.loginUser = loginUser;
