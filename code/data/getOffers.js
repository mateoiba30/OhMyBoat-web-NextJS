"use server"
import { db } from "@/lib/db"
export const getOffersByPostId = async ({postId}) => {
    try {
        const offers = await db.offer.findMany({
            where: {
                idPublicacionPedida: postId
            }
        })
        return offers;
    }
    catch {
        return null
    }
}

export const getOffersByOfferentId = async ({offerentId}) => {
    try {
        const offers = await db.offer.findMany({
            where: {
                idOfertante: offerentId
            }
        })
        console.log(offers)
        return offers;
    }
    catch {
        return null
    }

}

export const getConfirmedOffersByPostId = async ({idPublicacionPedida}) => {
    try {
        const offers = await db.offer.findMany({
            where: {
                idPublicacionPedida,
                status: "CONFIRMED"
            }
        })
        return offers;
    } catch {
        return null
    }

}

export const getMotorbikeOffersByPostId = async ({postId}) => {
    try {
        const offers = await db.offer.findMany({
            where: {
                idPublicacionPedida: postId
            }
        })
        let data = [];
        for (let i = 0; i < offers.length; i++) {
            const post = await db.vehiclePost.findFirst({
                where: {
                    id: offers[i].idPublicacionOfrecida,
                }
            })
            if (post.type === "Motocicleta"){
                data.push(offers[i]);
            }

        }
        console.log(data);
        return data;
    }
    catch {
        return null
    }
}


export const getCarOffersByPostId = async ({postId}) => {
    try {
        const offers = await db.offer.findMany({
            where: {
                idPublicacionPedida: postId
            }
        })
        let data = [];
        for (let i = 0; i < offers.length; i++) {
            const post = await db.vehiclePost.findFirst({
                where: {
                    id: offers[i].idPublicacionOfrecida,
                }
            })
            if (post.type === "Automóvil"){
                data.push(offers[i]);
            }

        }
        console.log(data);
        return data;
    }
    catch {
        return null
    }
}



export const getVanOffersByPostId = async ({postId}) => {
    try {
        const offers = await db.offer.findMany({
            where: {
                idPublicacionPedida: postId
            }
        })
        let data = [];
        for (let i = 0; i < offers.length; i++) {
            const post = await db.vehiclePost.findFirst({
                where: {
                    id: offers[i].idPublicacionOfrecida,
                }
            })
            if (post.type === "Camioneta"){
                data.push(offers[i]);
            }

        }
        console.log(data);
        return data;
    }
    catch {
        return null
    }
}

export const getCatamaranOffersByPostId = async ({postId}) => {
    try {
        const offers = await db.offer.findMany({
            where: {
                idPublicacionPedida: postId
            }
        })
        let data = [];
        for (let i = 0; i < offers.length; i++) {
            const post = await db.boatPost.findFirst({
                where: {
                    id: offers[i].idPublicacionOfrecida,
                }
            })
            if (post.type === "Catamarán"){
                data.push(offers[i]);
            }

        }
        console.log(data);
        return data;
    }
    catch {
        return null
    }
}

export const getCruiseOffersByPostId = async ({postId}) => {
    try {
        const offers = await db.offer.findMany({
            where: {
                idPublicacionPedida: postId
            }
        })
        let data = [];
        for (let i = 0; i < offers.length; i++) {
            const post = await db.boatPost.findFirst({
                where: {
                    id: offers[i].idPublicacionOfrecida,
                }
            })
            if (post.type === "Crucero"){
                data.push(offers[i]);
            }

        }
        console.log(data);
        return data;
    }
    catch {
        return null
    }
}

export const getLanchaOffersByPostId = async ({postId}) => {
    try {
        const offers = await db.offer.findMany({
            where: {
                idPublicacionPedida: postId
            }
        })
        let data = [];
        for (let i = 0; i < offers.length; i++) {
            const post = await db.boatPost.findFirst({
                where: {
                    id: offers[i].idPublicacionOfrecida,
                }
            })
            if (post.type === "Lancha"){
                data.push(offers[i]);
            }

        }
        console.log(data);
        return data;
    }
    catch {
        return null
    }
}

export const getSailboatOffersByPostId = async ({postId}) => {
    try {
        const offers = await db.offer.findMany({
            where: {
                idPublicacionPedida: postId
            }
        })
        let data = [];
        for (let i = 0; i < offers.length; i++) {
            const post = await db.boatPost.findFirst({
                where: {
                    id: offers[i].idPublicacionOfrecida,
                }
            })
            if (post.type === "Velero"){
                data.push(offers[i]);
            }

        }
        console.log(data);
        return data;
    }
    catch {
        return null
    }
}

export const getBoatOffersByModelAndPostId = async ({postId,year,boat=""}) => {
    try {
        console.log(year);
        console.log(boat)
        const offers = await db.offer.findMany({
            where: {
                idPublicacionPedida: postId
            }
        })
        if (boat === "catamaran"){
            boat = "Catamarán"
        }
        if (boat === "cruise"){
            boat = "Crucero"
        }
        if (boat === "lancha"){
            boat = "Lancha"
        }
        if (boat === "sailboat"){
            boat = "Velero"
        }
        let data = [];
        if (boat !== "") {
        for (let i = 0; i < offers.length; i++) {
            const post = await db.boatPost.findFirst({
                where: {
                    id: offers[i].idPublicacionOfrecida,
                    modelo: year,
                    type: boat,
                }
            })
            if (post !== null){
                data.push(offers[i]);
            }
        }
    } else {
        for (let i = 0; i < offers.length; i++) {
            const post = await db.boatPost.findFirst({
                where: {
                    id: offers[i].idPublicacionOfrecida,
                    modelo: year,
                }
            })
            if (post !== null){
                data.push(offers[i]);
            }
        }

    }
            

        console.log(data);
        return data;
    }

    catch {
        return null
    }
}

export const getVehicleOffersByModelAndPostId = async ({postId,year,vehicle=""}) => {
    try {
        console.log(year);
        console.log(vehicle)
        if(vehicle === "automov"){
            vehicle = "Automóvil"
        }
        if(vehicle === "motorbike"){
            vehicle = "Motocicleta"
        }
        if (vehicle === "van"){
            vehicle = "Camioneta"
        }
        const offers = await db.offer.findMany({
            where: {
                idPublicacionPedida: postId
            }
        })
        let data = [];
        if (vehicle !== "") {
            for (let i = 0; i < offers.length; i++) {
                const post = await db.vehiclePost.findFirst({
                    where: {
                        id: offers[i].idPublicacionOfrecida,
                        modelo: year,
                        type: vehicle,
                    }
                })
                if (post !== null){
                    data.push(offers[i]);
                }
            }
            console.log(data);


        } else {
            for (let i = 0; i < offers.length; i++) {
                const post = await db.vehiclePost.findFirst({
                    where: {
                        id: offers[i].idPublicacionOfrecida,
                        modelo: year,
                    }
                })
                if (post !== null){
                    data.push(offers[i]);
                }
            }
            console.log(data);
        }

        return data;
    }
    catch {
        return null
    }
}


export const getBoatOffersByPriceAndPostId = async ({postId,price}) => {
    try {
        console.log(price);
        const offers = await db.offer.findMany({
            where: {
                idPublicacionPedida: postId
            }
        })
        let data = [];
        for (let i = 0; i < offers.length; i++) {
            const post = await db.boatPost.findFirst({
                where: {
                    id: offers[i].idPublicacionOfrecida,
                    deuda: price,
                }
            })
            if (post !== null){
                data.push(offers[i]);
            }
        }
        console.log(data);
        return data;
    }
    catch {
        return null
    }
}