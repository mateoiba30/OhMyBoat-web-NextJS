"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "../data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { getVerificationTokenByEmail } from "../data/verification-token";
export const registerManager = async (values) => {

    const validateFields = RegisterSchema.safeParse(values);
    if (!validateFields.success) {
        return { error : "Campos invalidos!"}
    }
    const { firstname, lastname, cellphone, birthday, email, password, confirmPassword } = validateFields.data;
    if (password !== confirmPassword) {
        return { error : "Las contraseñas no coinciden!"}
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error : "Email ya registrado!"}
    }
    
    
    const usuarioCreado = await db.user.create({
        data: {
            firstname,
            lastname,
            cellphone,
            birthday,
            email,
            password,
            emailVerified: new Date(),
            role: "MANAGER"
        }
    })
    console.log(usuarioCreado)

    //const verifcationToken = await generateVerificationToken(email); 
    //await sendVerificationEmail(verifcationToken.email,verifcationToken.token); 
    //como es gerente asumo que no necesita verificado de mail.
    return { success : "Gerente registrado!"}

}
//no la encriptamos por el momento