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
const express_1 = __importDefault(require("express"));
const product_router_1 = __importDefault(require("../routes/product.router"));
const user_router_1 = __importDefault(require("../routes/user.router"));
const product_modell_1 = require("./product.modell");
const user_modell_1 = require("./user.modell");
class Server {
    constructor() {
        this.app = (0, express_1.default)(); //orden en el que se ejecutan
        this.port = process.env.PORT || '3001';
        this.app.listen();
        this.middlewares(); //middleware de ir antes de routes o no hará el parseo para podr leer json
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App en puerto ${this.port}`);
        });
    }
    routes() {
        this.app.use('/products', product_router_1.default);
        this.app.use('/users', user_router_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json()); //parseo de jsons para poder leerlos con express
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_modell_1.Product.sync();
                yield user_modell_1.User.sync();
                console.log('-----Conexión exitosa-----');
            }
            catch (error) {
                console.log('xxxxxxxxx NO CONEXION xxxxxxxxxx');
            }
        });
    }
}
exports.default = Server;
