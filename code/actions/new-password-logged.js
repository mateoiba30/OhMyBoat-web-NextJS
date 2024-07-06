"use server"

import * as z from "zod"

import { NewPasswordLoggedSchema } from "@/schemas"
import { getPasswordResetbyToken } from "../data/password-reset-token"
import { getUserByEmail } from "../data/user"
import { db } from "@/lib/db"
export const newPasswordLogged = async ({data,email}) => {
    console.log(data)
    console.log(email)
    if(!data) {
        return { error: "No hay datos ingresados." }
    }
    const validatedFields = NewPasswordLoggedSchema.safeParse(data)
    if (!validatedFields.success) {
        return { error: "Revisa los campos!" }
    }

    const { previousPassword,newPassword,confirmPassword } = validatedFields.data
    if (newPassword !== confirmPassword) {
        return { error: "La nueva contraseña no coincide con la confirmacion!" }
    }

    const user = await getUserByEmail(email)
    console.log(user.password)
    console.log(previousPassword)
    if( user.password !== previousPassword) {
        return { error: "La contraseña original no es valida, intente nuevamente" }
    }

    const resetedPassword = await db.user.update({
        where: { id: user.id },
        data: {
            password: newPassword,
        }
    })

    console.log(resetedPassword)
    return { success: "Contraseña actualizada con éxito!"}


}
