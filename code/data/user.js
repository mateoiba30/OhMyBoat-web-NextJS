import { db } from "@/lib/db";

export const getUserByEmail = async (email) => {
    try {
        const userFound= await db.user.findFirst({
            where: {
                email: email,
            }
        });

        return userFound;

    } catch {
        return null;
    }
}

export const getUserById = async (id) => {
    try {
        const user= await db.user.findUnique({
            where: {
                id,
            }
        });

        return user;

    } catch {
        return null;
    }
}