import express from 'express';
import routerProduct from '../routes/product.router';
import routerUser from '../routes/user.router';
import { Product } from './product.modell';
import { User } from './user.modell';

class Server {
    private app:express.Application;
    private port: string;

    constructor() {
        this.app = express(); //orden en el que se ejecutan
        this.port = process.env.PORT || '3000';
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
    }

    middlewares() {
        this.app.use(express.json()); //parseo de jsons para poder leerlos con express
    }

    async dbConnect() {
        try { 
            await Product.sync();
            await User.sync();
            console.log('Conexión exitosa');
        } catch (error) {
            console.log('Error en la conexión');
        }
    }
}


export default Server;