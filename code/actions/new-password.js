"use server"

import * as z from "zod"

import { NewPasswordSchema } from "@/schemas"
import { getPasswordResetbyToken } from "../data/password-reset-token"
import { getUserByEmail } from "../data/user"
import { db } from "@/lib/db"
export const newPassword = async (data,token) => {
    if(!token) {
        return { error: "No hay token!" }
    }

    const validatedFields = NewPasswordSchema.safeParse(data)
    if (!validatedFields.success) {
        return { error: "Revisa los campos!" }
    }

    const { password,confirmPassword } = validatedFields.data

    if (password !== confirmPassword) {
        return { error: "Las contraseñas no coinciden!" }
    }

    const existingToken = await getPasswordResetbyToken(token)

    if (!existingToken) {
        return { error: "Token inválido!" }
    }

    const hasExpired = new Date() > new Date(existingToken.expires)

    if (hasExpired) {
        return { error: "El token ha expirado!" }
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if(!existingUser) {
        return { error: "El mail no pertenece a un usuario!" }
    }

    const newPassword = password;
    await db.user.update({
        where: { id: existingUser.id },
        data: {
            password: newPassword,
        }
    })
    
    await db.passwordResetToken.delete({
        where: { id: existingToken.id }
    })

    return { success: "Contraseña actualizada!"}
}
