import { db } from "@/lib/db";

export const getTradesCatamaranAuto = async () => {
    try{
        const trades = await db.trade.findMany({
            where:{
                status: "TRUEQUE_REALIZADO",
                OR: [
                    {typePost1: "Catamarán", typePost2: "Automóvil"},
                    {typePost1: "Automóvil", typePost2: "Catamarán"},
                ]
            }
        })
        console.log(trades);
        return trades.length;
    } catch(error){
        console.log(error)
        return null;
    }

}


export const getTradesCatamaranCamioneta = async () => {
    try{
        const trades = await db.trade.findMany({
            where:{
                status: "TRUEQUE_REALIZADO",
                OR: [
                    {typePost1: "Catamarán", typePost2: "Camioneta"},
                    {typePost1: "Camioneta", typePost2: "Catamarán"},
                ]
            }
        })
        console.log(trades);
        return trades.length;
    } catch(error){
        console.log(error)
        return null;
    }

}

export const getTradesCatamaranMoto = async () => {
    try{
        const trades = await db.trade.findMany({
            where:{
                status: "TRUEQUE_REALIZADO",
                OR: [
                    {typePost1: "Catamarán", typePost2: "Motocicleta"},
                    {typePost1: "Motocicleta", typePost2: "Catamarán"},
                ]
            }
        })
        console.log(trades);
        return trades.length;
    } catch(error){
        console.log(error)
        return null;
    }

}

export const getTradesCruceroAuto = async () => {
    try{
        const trades = await db.trade.findMany({
            where:{
                status: "TRUEQUE_REALIZADO",
                OR: [
                    {typePost1: "Crucero", typePost2: "Automóvil"},
                    {typePost1: "Automóvil", typePost2: "Crucero"},
                ]
            }
        })
        console.log(trades);
        return trades.length;
    } catch(error){
        console.log(error)
        return null;
    }

}


export const getTradesCruceroCamioneta = async () => {
    try{
        const trades = await db.trade.findMany({
            where:{
                status: "TRUEQUE_REALIZADO",
                OR: [
                    {typePost1: "Crucero", typePost2: "Camioneta"},
                    {typePost1: "Camioneta", typePost2: "Crucero"},
                ]
            }
        })
        console.log(trades);
        return trades.length;
    } catch(error){
        console.log(error)
        return null;
    }

}



export const getTradesCruceroMoto = async () => {
    try{
        const trades = await db.trade.findMany({
            where:{
                status: "TRUEQUE_REALIZADO",
                OR: [
                    {typePost1: "Crucero", typePost2: "Motocicleta"},
                    {typePost1: "Motocicleta", typePost2: "Crucero"},
                ]
            }
        })
        console.log(trades);
        return trades.length;
    } catch(error){
        console.log(error)
        return null;
    }

}




export const getTradesVeleroAuto = async () => {
    try{
        const trades = await db.trade.findMany({
            where:{
                status: "TRUEQUE_REALIZADO",
                OR: [
                    {typePost1: "Velero", typePost2: "Automóvil"},
                    {typePost1: "Automóvil", typePost2: "Velero"},
                ]
            }
        })
        console.log(trades);
        return trades.length;
    } catch(error){
        console.log(error)
        return null;
    }

}


export const getTradesVeleroCamioneta = async () => {
    try{
        const trades = await db.trade.findMany({
            where:{
                status: "TRUEQUE_REALIZADO",
                OR: [
                    {typePost1: "Velero", typePost2: "Camioneta"},
                    {typePost1: "Camioneta", typePost2: "Velero"},
                ]
            }
        })
        console.log(trades);
        return trades.length;
    } catch(error){
        console.log(error)
        return null;
    }

}

export const getTradesVeleroMoto = async () => {
    try{
        const trades = await db.trade.findMany({
            where:{
                status: "TRUEQUE_REALIZADO",
                OR: [
                    {typePost1: "Velero", typePost2: "Motocicleta"},
                    {typePost1: "Motocicleta", typePost2: "Velero"},
                ]
            }
        })
        console.log(trades);
        return trades.length;
    } catch(error){
        console.log(error)
        return null;
    }

}

export const getTradesLanchaAuto = async () => {
    try{
        const trades = await db.trade.findMany({
            where:{
                status: "TRUEQUE_REALIZADO",
                OR: [
                    {typePost1: "Lancha", typePost2: "Automóvil"},
                    {typePost1: "Automóvil", typePost2: "Lancha"},
                ]
            }
        })
        console.log(trades);
        return trades.length;
    } catch(error){
        console.log(error)
        return null;
    }

}

export const getTradesLanchaCamioneta = async () => {
    try{
        const trades = await db.trade.findMany({
            where:{
                status: "TRUEQUE_REALIZADO",
                OR: [
                    {typePost1: "Lancha", typePost2: "Camioneta"},
                    {typePost1: "Camioneta", typePost2: "Lancha"},
                ]
            }
        })
        console.log(trades);
        return trades.length;
    } catch(error){
        console.log(error)
        return null;
    }

}

export const getTradesLanchaMoto = async () => {
    try{
        const trades = await db.trade.findMany({
            where:{
                status: "TRUEQUE_REALIZADO",
                OR: [
                    {typePost1: "Lancha", typePost2: "Motocicleta"},
                    {typePost1: "Motocicleta", typePost2: "Lancha"},
                ]
            }
        })
        console.log(trades);
        return trades.length;
    } catch(error){
        console.log(error)
        return null;
    }

}




