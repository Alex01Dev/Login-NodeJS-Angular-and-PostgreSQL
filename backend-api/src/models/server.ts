import express from 'express';
import cors from 'cors';
import routerProduct from '../routes/product.router';
import routerUser from '../routes/user.router';
import routerBoot from '../routes/boot.routes';
import { Product } from './product.modell';
import { User } from './user.modell';
import { Poke } from './poke.model';

class Server {
    private app:express.Application;
    private port: string;

    constructor() {
        this.app = express(); //orden en el que se ejecutan
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
        this.app.use('/products', routerProduct);
        this.app.use('/users', routerUser);
        this.app.use('/boot', routerBoot);
    }

    middlewares() {
        this.app.use(express.json()); //parseo de jsons para poder leerlos con express
    
        //cors
        this.app.use(cors());
    }

    async dbConnect() {
        try { 
            await Poke.sync();
            await Product.sync();
            await User.sync();
            console.log('-----Conexión exitosa-----');
        } catch (error) {
            console.log('xxxxxxxxx NO CONEXION xxxxxxxxxx');
            
        }
    }
}


export default Server;