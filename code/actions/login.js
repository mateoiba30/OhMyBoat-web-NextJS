"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { signIn } from "../auth"
import { LoginSchema } from "@/schemas";
import { DEFAULT_FIRST_LOGIN_REDIRECT, DEFAULT_LOGIN_REDIRECT } from "../routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "../data/user";
import { sendVerificationEmail } from "@/lib/mail";
export const login = async (values) => {

    const validateFields = LoginSchema.safeParse(values);
    if (!validateFields.success) {
        return { error : "Ops! Revisa los datos."}
    }

    const { email , password } = validateFields.data;

    const existingUser = await getUserByEmail(email);
    //anadir si la contra no es valida al principio
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "El mail y/o la contraseña son inválidos." }
    }

    if (!existingUser.emailVerified) {
        const verifcationToken = await generateVerificationToken(existingUser.email);
        console.log(verifcationToken.token)
        await sendVerificationEmail(verifcationToken.email,verifcationToken.token);
        return {success : "Tu cuenta se encuentra parcialmente confirmada, revisa tu bandeja de entrada!."}
    }


    try {
        await signIn("credentials",{
            email,
            password,
            redirectTo: DEFAULT_FIRST_LOGIN_REDIRECT,
        })
        return { success : "Iniciando sesión...", error : ""}
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error : "El mail y/o la contraseña son inválidos."}
                case "EmailVerification":
                    return { error : "Por favor verifica tu email."}
                default:
                    return { error : "Ops! Algo salio mal."}
            }
        }

        throw error;
    }

}