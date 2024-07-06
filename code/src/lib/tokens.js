import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "../../data/verification-token";
import { db } from "./db";
import { getPasswordResetbyEmail } from "../../data/password-reset-token";

export const generatePasswordResetToken = async (email) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000) // 1 hour from now.

    const existingToken = await getPasswordResetbyEmail(email);

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: { id: existingToken.id }
        })
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: { 
            email,
            token,
            expires
        }
    });

    return passwordResetToken;
}   


export const generateVerificationToken = async (email) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000) // 1 hour from now.

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where: { id: existingToken.id }
        })
    }

    const verifcationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    return verifcationToken;

}