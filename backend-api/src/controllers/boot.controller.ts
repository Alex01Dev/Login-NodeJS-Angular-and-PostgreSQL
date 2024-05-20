// ../controllers/boot.controller.ts
import { Request, Response } from "express";
import { Poke } from "../models/poke.model";

export const getPokemon = async (req: Request, res: Response) => {
    try {
        const listPokemon = await Poke.findAll();
        res.json(listPokemon);
    } catch (error) {
        console.error("Error al obtener los Pokemones:", error);
        res.status(500).json({ message: "Error al obtener Pokemon" });
    }
};


export const createPoke = async (req: Request, res: Response) => {
    const { name, description, image } = req.body;

    try {
        // Verificar si el Pokémon ya existe
        const existingPokemon = await Poke.findOne({ where: { name } });
        if (existingPokemon) {
            return res.status(400).json({ message: "El Pokémon ya existe" });
        }

        // Crear el nuevo Pokémon
        const newPokemon = await Poke.create({ name, description, image });

        res.status(201).json(newPokemon);
    } catch (error) {
        console.error("Error al crear Pokémon:", error);
        res.status(500).json({ message: "Error al crear Pokémon" });
    }
};
