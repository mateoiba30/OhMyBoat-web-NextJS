"use server"
import { db } from "@/lib/db";

export const createSede = async (values) => {
    try{
        console.log(values);
        const { name, address, phone, email, lat, lng, description} = values;
        const sede = await db.sede.create({
            data: {
                address: address,
                description: description,
                email: email,
                lat: lat,
                lng: lng,
                name: name,
                phone: phone,
            }
        });
        console.log(sede)
        return {success: "La sede fue creada con éxito!"}
    } catch (error){
        console.log(error)
        return null;
    }

}

export const getAllSedes = async () => {
    try{
        const sedes = await db.sede.findMany();
        return sedes;
    } catch(error){
        console.log(error)
        return null;
    }
}

export const deleteSede = async (id) => {
    try{
        const sede = await db.sede.delete({
            where: {
                id: id
            }
        });
        console.log(sede)
        return {success: "La sede fue eliminada con éxito"}

    } catch(error){
        console.log(error)
        return null;
    }



}