"use server"
import { db } from "@/lib/db";
import { getUserByEmail } from "../data/user"
export const updateProfileData = async ({data,email}) => {
    const {firstname,lastname,cellphone} = data;
    const user = await getUserByEmail(email);
    if (!user) {
        return { error: "No se encontró el usuario." }
    
    }
    const res = await db.user.update({
        where: { id: user.id },
        data: {
            firstname,
            lastname,
            cellphone,
        }
    })
    if (!res) {
        return {error : "Algo sucedió mal"}
    }

    return {success: "Datos actualizados correctamente!"}
}