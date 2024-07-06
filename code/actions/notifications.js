"use server"
import { db } from "@/lib/db";
export const getAllNotis = async (idOwner) => {
    try {
        console.log(idOwner)
        const notis = await db.notification.findMany({
            where: {
                idReceptor: idOwner,
            }
        });
        console.log(notis);
        return notis;
    } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
    }
}

export const getUnseenNotis = async (idOwner) => {
    try {
        const notis = await db.notification.findMany({
            where: {
                idReceptor: idOwner,
                seen:false,
            },
        });
        if (notis) {
            return notis;
        }
        console.log(notis);
        return notis;
    } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
    }
}

export const seeNotis = async (idOwner) => {
    try {
        const notis = await db.notification.updateMany({
            where: {
                idReceptor: idOwner,
                seen:false,
            },
            data: {
                seen:true,
            }
        });
        console.log(notis);
        return notis;
    } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
    }
}

export const NotifSeen = async (notifId) => {
    try {

        const notifSeen = await db.notification.update({
            where: {
                id: notifId,
            },
            data: {
                seen: true,
            }
        });

        console.log(notifSeen);

        return notifSeen;
    } catch (error){
        console.error('Error al obtener las notificaciones:', error);
        return null;
    }

}