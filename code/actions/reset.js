"use server"

import { ResetSchema } from "@/schemas"
import { db } from "@/lib/db"
import { getUserByEmail } from "../data/user"
import { sendResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/tokens"
export const reset = async (data)  => {
    const validatedFields = ResetSchema.safeParse(data)
    
    if(!validatedFields.success) {
        return { error: "Revisa el formato!" }
    }

    const { email,emailConfirmation} = validatedFields.data

    if (email !== emailConfirmation) {
        return {error: "Los emails no coinciden!"}
    }

    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
        return { error: "El mail no pertenece a un usuario!" }
    }

    //generate token
    const passwordResetToken = await generatePasswordResetToken(email)
    console.log(passwordResetToken)
    await sendResetEmail(passwordResetToken.email, passwordResetToken.token);
    
    return { success: "Revisa tu bandeja de entrada!"}
    
}