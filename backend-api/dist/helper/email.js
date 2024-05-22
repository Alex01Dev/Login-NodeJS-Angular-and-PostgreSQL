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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailScraper = void 0;
// ../services/emailService.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = require("fs");
const sendEmailScraper = (datos) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail', // Especifica el servicio como 'gmail'
        auth: {
            user: 'alex.mauri.mc@gmail.com', // Reemplaza con tu correo
            pass: 'lwhbcxgytkfcgvwp' // Reemplaza con tu contraseña de aplicación de Gmail
        }
    });
    const { email, nombre, descripcion, imagenUrl } = datos;
    const emailDes = 'hemd0407.dhm@gmail.com';
    // Descargar la imagen localmente
    const response = yield axios_1.default.get(imagenUrl, {
        responseType: 'stream'
    });
    const imageName = `${nombre}.jpg`; // Nombre de la imagen
    const imagePath = `./${imageName}`; // Ruta donde se guarda la imagen localmente
    response.data.pipe((0, fs_1.createWriteStream)(imagePath));
    const mailOptions = {
        from: 'ScraperInfo <alex.mauri.mc@gmail.com>',
        to: emailDes,
        subject: 'Información del Scrapeo',
        html: `
            <p>Hola ${emailDes}, revisa la información de este scrapeo:</p>
            <p>${descripcion}</p>
            <p>Haz clic en la imagen adjunta para descargarla.</p>
        `,
        attachments: [
            {
                filename: imageName,
                path: imagePath
            }
        ]
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log(`Correo enviado exitosamente a ${email}`);
    }
    catch (error) {
        console.error(`Error al enviar el correo: ${error}`);
    }
});
exports.sendEmailScraper = sendEmailScraper;
