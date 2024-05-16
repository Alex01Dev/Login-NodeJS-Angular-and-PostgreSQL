import { Router } from 'express';
import { getProducts, createProduct } from '../controllers/products.controller';
import validateToken from './validate.token';

const router = Router();

router.get('/',validateToken, getProducts);
router.post('/insert', createProduct);

export default router;