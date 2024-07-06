"use server"
import { getCardPostByCompletePostId } from "../data/cardPosts";
import { getBoatPostById } from "../data/posts"
import { db } from "@/lib/db";
import { getVehiclePostById } from "../data/posts";

export const pausarPublicaciónBarco = async (idPublicacion) => {
    const boatPost = await getBoatPostById(idPublicacion);

    if(boatPost){
        try {
            const boatPostUpdated = await db.boatPost.update({
                where: {
                    id: boatPost.id,
                },
                data: {
                    status: "HIDDEN",
                },
            });
            const boatPostcard = await getCardPostByCompletePostId({completePostId: idPublicacion});
            let cardPost;
            if(boatPostcard){
                cardPost = await db.cardPost.update({
                    where: {
                        id: boatPostcard.id,
                    },
                    data: {
                        status: "HIDDEN",
                    },
                });
            }
            console.log(cardPost)
            if (boatPostUpdated && cardPost) {
                return {success : "Publicación ocultada correctamente"};
            }
        } catch {
            return null;
        }
    }
}

export const pausarPublicaciónVehículo = async (idPublicacion) => {
    const vehiclePost = await getVehiclePostById(idPublicacion);
    if(vehiclePost){
        try {
            const vehiclePost = await db.vehiclePost.update({
                where: {
                    id: idPublicacion,
                },
                data: {
                    status: "HIDDEN",
                },
            });
            const vehiclePostcard = await getCardPostByCompletePostId({completePostId: idPublicacion});
            let cardPost;
            if(vehiclePostcard){
                cardPost = await db.cardPost.update({
                    where: {
                        id: vehiclePostcard.id,
                    },
                    data: {
                        status: "HIDDEN",
                    },
                });
            }
            if (vehiclePost && cardPost) {
                return {success : "Publicación ocultada correctamente"};
            }
        } catch {
            return null;
        }
    }
}

export const reanudarPublicaciónBarco = async (idPublicacion) => {
    console.log(idPublicacion)
    const boatPost = await getBoatPostById(idPublicacion);
    console.log(boatPost)
    if(boatPost){
        try {
            console.log(boatPost)
            const boatPostUpdated = await db.boatPost.update({
                where: {
                    id: boatPost.id,
                },
                data: {
                    status: "ACTIVE",
                },
            });
            console.log(boatPostUpdated)
            const boatPostcard = await getCardPostByCompletePostId({completePostId: idPublicacion});
            let cardPost;
            if(boatPostcard){
                cardPost = await db.cardPost.update({
                    where: {
                        id: boatPostcard.id,
                    },
                    data: {
                        status: "ACTIVE",
                    },
                });
            }
            if (boatPostUpdated && cardPost) {
                return {success : "Publicación reanudada correctamente"};
            }
        } catch {
            return null;
        }
    }
}

export const reanudarPublicaciónVehículo = async (idPublicacion) => {
    const vehiclePost = await getVehiclePostById(idPublicacion);
    if(vehiclePost){
        try {
            const vehiclePost = await db.vehiclePost.update({
                where: {
                    id: idPublicacion,
                },
                data: {
                    status: "ACTIVE",
                },
            });
            const vehiclePostcard = await getCardPostByCompletePostId({completePostId: idPublicacion});
            let cardPost;
            if(vehiclePostcard){
                cardPost = await db.cardPost.update({
                    where: {
                        id: vehiclePostcard.id,
                    },
                    data: {
                        status: "ACTIVE",
                    },
                });
            }
            if (vehiclePost && cardPost) {
                return {success : "Publicación reanudada correctamente"};
            }
        } catch {
            return null;
        }
    }

}