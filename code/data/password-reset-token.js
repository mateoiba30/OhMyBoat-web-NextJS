import { db } from "@/lib/db";

export const getPasswordResetbyToken = async (token) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findUnique({
            where: {
                token
            }
        })
        return passwordResetToken;
    } catch {
        return  null
    }

} 

export const getPasswordResetbyEmail = async (email) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findUnique({
            where: {
                email
            }
        })
        return passwordResetToken;
    } catch {
        return  null
    }

} 