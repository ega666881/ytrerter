import * as dotenv from 'dotenv-ts'
import nodemailer from 'nodemailer';

dotenv.config();


const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
})


export const sendEmail = async (to: string, proxy: string) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: to,
        subject: 'Покупка прокси',
        text: `Ваш прокси ${proxy}`
    }
    transporter.sendMail(mailOptions)
}