import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const DATABASE = process.env.DATABASE || 'login_node_db';
const USER = process.env.USER || 'postgres';
const PASSWORD = process.env.PASSWORD;
const HOST = process.env.HOST || 'localhost';

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    port: 5432,
    dialect: 'postgres',
});

export default sequelize;