import { Router } from "express";
import { createPoke } from "../controllers/boot.controller";

const router = Router();

router.post('/insertBoot', createPoke)

export default router