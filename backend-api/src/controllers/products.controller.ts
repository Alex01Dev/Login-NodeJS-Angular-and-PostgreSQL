import { Request, Response } from 'express';
import { Product } from '../models/product.modell';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const listProducts = await Product.findAll();
        res.json(listProducts);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ message: "Error al obtener productos" });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    const { name, description } = req.body;

    try {
        // Verificar si el producto ya existe
        const existingProduct = await Product.findOne({ where: { name } });
        if (existingProduct) {
            return res.status(400).json({ message: "El producto ya existe" });
        }

        // Crear el nuevo producto
        const newProduct = await Product.create({ name, description });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ message: "Error al crear producto" });
    }
};