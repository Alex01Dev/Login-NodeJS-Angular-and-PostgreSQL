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
exports.createProduct = exports.getProducts = void 0;
const product_modell_1 = require("../models/product.modell");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listProducts = yield product_modell_1.Product.findAll();
        res.json(listProducts);
    }
    catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ message: "Error al obtener productos" });
    }
});
exports.getProducts = getProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    try {
        // Verificar si el producto ya existe
        const existingProduct = yield product_modell_1.Product.findOne({ where: { name } });
        if (existingProduct) {
            return res.status(400).json({ message: "El producto ya existe" });
        }
        // Crear el nuevo producto
        const newProduct = yield product_modell_1.Product.create({ name, description });
        res.status(201).json(newProduct);
    }
    catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ message: "Error al crear producto" });
    }
});
exports.createProduct = createProduct;
