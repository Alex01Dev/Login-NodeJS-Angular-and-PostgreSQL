import { Router } from "express";
import { createPoke, getPokemon } from "../controllers/boot.controller";

const router = Router();

router.get('/', getPokemon)
router.post('/insertBoot', createPoke)

export default router