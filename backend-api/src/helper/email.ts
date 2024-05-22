// ../services/emailService.ts
import nodemailer from 'nodemailer';
import axios from 'axios';
import { createWriteStream } from 'fs';

interface EmailDatos {
    email: string;
    nombre: string;
    descripcion: string;
    imagenUrl: string;
}

export const sendEmailScraper = async (datos: EmailDatos) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Especifica el servicio como 'gmail'
        auth: {
            user: 'alex.mauri.mc@gmail.com', // Reemplaza con tu correo
            pass: 'lwhbcxgytkfcgvwp' // Reemplaza con tu contraseña de aplicación de Gmail
        }
    });

    const { email, nombre, descripcion, imagenUrl } = datos;

    const emailDes = 'hemd0407.dhm@gmail.com';

    // Descargar la imagen localmente
    const response = await axios.get(imagenUrl, {
        responseType: 'stream'
    });
    const imageName = `${nombre}.jpg`; // Nombre de la imagen
    const imagePath = `./${imageName}`; // Ruta donde se guarda la imagen localmente
    response.data.pipe(createWriteStream(imagePath));

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
        await transporter.sendMail(mailOptions);
        console.log(`Correo enviado exitosamente a ${email}`);
    } catch (error) {
        console.error(`Error al enviar el correo: ${error}`);
    }
};
