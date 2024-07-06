import { Resend } from "resend";
import { RESEND_API_KEY } from "../../routes";
const resend = new Resend(RESEND_API_KEY);

export const sendResetEmail = async (email, token) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Resetea tu contraseña",
        html: `
            <h1>Resetea tu contraseña!</h1>
            <p>Para resetear tu contraseña, haz click en el siguiente link:</p>
            <a href=${resetLink}>Resetear contraseña</a>
        `
    })
   
     
    }

export const sendVerificationEmail = async (email, token) => {
    const confirmLink= `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject:  "Confirma tu email",
        html: `
            <h1>Confirma tu email</h1>
            <p>Para confirmar tu email, haz click en el siguiente link:</p>
            <a href=${confirmLink}>Confirmar email</a>
        `
        
    })
}