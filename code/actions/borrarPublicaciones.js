"use server"

import { db } from "@/lib/db";

export const borrarPublicaciones = async () => {
    try {

        const cards = await db.cardPost.deleteMany();
        const boats = await db.boatPost.deleteMany();
        const vehicles = await db.vehiclePost.deleteMany();

        if( (cards && boats && vehicles) ) {
        return { success: "Publicaciones borradas!" }
        }
    } catch (error) {
        console.error('Error al borrar las publicaciones:', error);
    }

}