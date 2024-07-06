"use server";
import { db } from '@/lib/db';  


export const obtenerPublicaciones = async () => {
  try {
    const publicaciones = await db.cardPost.findMany({
      where: {
        status: "ACTIVE",
      }
    });
    return publicaciones;
  } catch (error) {
    console.error('Error al obtener las publicaciones:', error);
    throw error;
  }
};