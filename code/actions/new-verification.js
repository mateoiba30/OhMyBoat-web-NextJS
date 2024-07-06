"use server"

import { db } from "@/lib/db"
import { getUserByEmail } from "../data/user"
import { getVerificationTokenByToken } from "../data/verification-token"

export const newVerification = async (token) => {
    const existingToken = await getVerificationTokenByToken(token)

    if (!existingToken) {
        return { error: "Revisa si tu cuenta ya se encuentra registrada o intenta nuevamente" }
    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if (hasExpired) {
        return {error: "Revisa si tu cuenta ya se encuentra registrada o intenta nuevamente "}
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if (!existingUser) {
        return { error: "El mail no pertence a un usuario!" }
    }

    const user = await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            emailVerified: new Date(),
         //  email: existingToken.email, para cuando el usuario quiere cambiar el mail (no se podria teoricamente)
        }
    })

    const tokenEliminado = await db.verificationToken.delete({
        where: {
            id: existingToken.id
        }
    })

    console.log(tokenEliminado.id)

    return { success: "Email verificado!" }
}