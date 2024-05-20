// ../models/poke.model.ts
import { DataTypes } from "sequelize";
import sequelize from "../db/connection.db";

export const Poke = sequelize.define('tb_pokemon', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
});