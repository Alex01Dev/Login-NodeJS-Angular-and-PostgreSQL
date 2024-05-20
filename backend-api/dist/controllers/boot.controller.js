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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPoke = exports.getPokemon = void 0;
const poke_model_1 = require("../models/poke.model");
const getPokemon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listPokemon = yield poke_model_1.Poke.findAll();
        res.json(listPokemon);
    }
    catch (error) {
        console.error("Error al obtener los Pokemones:", error);
        res.status(500).json({ message: "Error al obtener Pokemon" });
    }
});
exports.getPokemon = getPokemon;
const createPoke = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, image } = req.body;
    try {
        // Verificar si el Pokémon ya existe
        const existingPokemon = yield poke_model_1.Poke.findOne({ where: { name } });
        if (existingPokemon) {
            return res.status(400).json({ message: "El Pokémon ya existe" });
        }
        // Crear el nuevo Pokémon
        const newPokemon = yield poke_model_1.Poke.create({ name, description, image });
        res.status(201).json(newPokemon);
    }
    catch (error) {
        console.error("Error al crear Pokémon:", error);
        res.status(500).json({ message: "Error al crear Pokémon" });
    }
});
exports.createPoke = createPoke;
