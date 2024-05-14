import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const DATABASE = process.env.DATABASE || 'db_login_node';
const USER = process.env.USER || 'postgres';
const PASSWORD = process.env.PASSWORD;
const HOST = process.env.HOST || 'localhost';

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    port: 5433,
    dialect: 'postgres',
});

export default sequelize;