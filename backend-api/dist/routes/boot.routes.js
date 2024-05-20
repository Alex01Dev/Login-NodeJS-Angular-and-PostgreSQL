"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const boot_controller_1 = require("../controllers/boot.controller");
const router = (0, express_1.Router)();
router.post('/insertBoot', boot_controller_1.createPoke);
exports.default = router;
