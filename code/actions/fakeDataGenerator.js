"use server";
import { db } from "@/lib/db";
import { getRandomUrlBoat,getRandomUrlVehicle} from "@/lib/urlgenerator";

export const fakeBoatGenerator = async () => {
  
  try {
    const randomUrlBoat = await getRandomUrlBoat();
    console.log(randomUrlBoat)
    const publicacionCreada = await db.boatPost.create({ //crep la publicacion
      data: {
        img: randomUrlBoat,
        title: 'Publicacion falsa',
        modelo:'2012',
        descripcion:'Descripcion falsa',
        matricula:'F4K3',
        eslora:'3',
        manga:'2',
        metros:'100',
        deuda:'50000',
        idPublisher: '???',
        type: 'f4k3 t1p3',
      }
    })
    console.log(publicacionCreada);
    const cardCreada = await db.cardPost.create({
      data: {
        idCompletePost: publicacionCreada.id,
        boat: true,
        img: publicacionCreada.img,
        title: publicacionCreada.title,
        modelo: publicacionCreada.modelo,
      },
    });
    if ((publicacionCreada && cardCreada)) {
      return { error: "Exito creando las publis." }; //si no se creo la publicacion, retorno un error
    }
  } catch (error) {
    console.error('Error al generar datos falsos:', error);
  } 
};

export const fakeVehicleGenerator = async () => {
  
  try {
    const randomUrlVehicle = await getRandomUrlVehicle();
    console.log(randomUrlVehicle)
    const publicacionCreada = await db.vehiclePost.create({ //crep la publicacion
      data: {
        img: randomUrlVehicle,
        title: 'Publicacion falsa',
        modelo:'2017',
        descripcion:'Descripcion falsa',
        patente: 'F4K3',
        kilometraje:'26000',
        cantPuertas:'4',
        idPublisher: '???',
        type: 'f4k3 t1p3',
      }
    })
    console.log(publicacionCreada);
    const cardCreada = await db.cardPost.create({
      data: {
        idCompletePost: publicacionCreada.id,
        boat: false,
        img: publicacionCreada.img,
        title: publicacionCreada.title,
        modelo: publicacionCreada.modelo,
      },
    });
    if ((publicacionCreada && cardCreada)) {
      return { error: "Exito creando las publis." }; //si no se creo la publicacion, retorno un error
    }
  } catch (error) {
    console.error('Error al generar datos falsos:', error);
  } 
};
