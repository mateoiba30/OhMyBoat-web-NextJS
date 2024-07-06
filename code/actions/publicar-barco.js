"use server"
import { writeFile} from "fs/promises"
import { auth } from "../auth"
import { db } from "@/lib/db"
import { updateAllOffersByPostId } from "./Offer"
import { updateAllTradesByPostId } from "./tradeActions"
import { getUserById } from "../data/user"
export const publicarBarco = async (values) => {

    console.log(values)
    const { title,modelo,descripcion,matricula,eslora,manga,metros,deuda,type,archivo } = values;
    console.log(archivo)
    const file = archivo.get("image"); //obtengo la imagen que fue comprimida
    console.log(file)
    console.log(file.name)

    if(!file){
        return { error : "Imagen requerida!"} //si por alguna razon no hay imagen, retorno un error
    }

    const session = await auth();
    if (!session) {
      return { error: "Usuario no autenticado,no puedes crear publicaciones" };
    }

    const existingBoat = await db.boatPost.findFirst({
      where: {
        matricula: matricula,
      },
    });

    if (existingBoat) {
      return { error: "La matrícula ingresada ya fue registrada" };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes); //chequeo que pueda ponerla en mi compu
    const path = `public/${file.name}`; //genero un path para guardar imagen
    const pathUsar = `/${file.name}`; //el path que va a usar el componente que renderiza las publis
    await writeFile(path,buffer); //escribo la imagen en mi compu

    const publicacionCreada = await db.boatPost.create({ //crep la publicacion
        data: {
          img: pathUsar,
          title: title,
          modelo:modelo,
          descripcion:descripcion,
          matricula:matricula,
          eslora:eslora,
          manga:manga,
          metros:metros,
          deuda:deuda,
          idPublisher: session.user.id,
          type: type,
          status: "ACTIVE",
        }
      })

    const user = await getUserById(session.user.id)
    console.log(user);
    const cardPublicacionCreada = await db.cardPost.create({
        data: {
          idCompletePost: publicacionCreada.id,
          boat: true,
          img: pathUsar,
          title: title,
          modelo:modelo,
          idPublisher: session.user.id,
          status:"ACTIVE",
          firstNamePublisher: user.firstname,
          lastNamePublisher: user.lastname,
          type:type,
        }
      
    })


    
    if (!(publicacionCreada && cardPublicacionCreada)) {
        return { error : "Error al crear la publicacion!"} //si no se creo la publicacion, retorno un error
    }


    return {success : "Publicación creada"} 
    //si todo salio bien, pongo el succes, y un mensaje que es el path para renderizarla si quiero en el formulario

}

export const actualizarBarco = async (values) => {

  console.log(values)
  const { postId,title,modelo,descripcion,matricula,eslora,manga,metros,deuda,type,archivo } = values;
  console.log(archivo)
  let file=null; 
  if(archivo){ //si archivo tiene algo, entonces hay una imagen
    file = archivo.get("image"); //obtengo la imagen que fue comprimida
    console.log(file)
    console.log(file.name)
  }


  const session = await auth();
  if (!session) {
    return { error: "Usuario no autenticado,no puedes crear publicaciones" };
  }

  const existingBoat = await db.boatPost.findFirst({
    where: {
      matricula: matricula,
    },
  });
 //busco si hay un barco con la patente
  if (existingBoat && existingBoat.id !== postId) { //si hay un barco con la patente nueva pero no es el barco actual, entonces quiere decir que ya se encuentra registrada esa patente
    return { error: "La matrícula ingresada ya fue registrada" };
  }
  let pathUsar = null; //pongo el path en null, si no hay imagen, se queda en null
  if(file){
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes); //chequeo que pueda ponerla en mi compu
    const path = `public/${file.name}`; //genero un path para guardar imagen
    pathUsar = `/${file.name}`; //el path que va a usar el componente que renderiza las publis
    await writeFile(path,buffer); //escribo la imagen en mi compu
  } 


  if (pathUsar === null ){ //si el path estuvo en null, es decir que no hubo imagen entonces busco la imagen que tenia antes
    pathUsar = await db.boatPost.findFirst({
      where: {
        id: postId,
      },
    }).img;
  }
  const publicacionCreada = await db.boatPost.update({ //crep la publicacion
    where: {
      id: postId,
    },
      data: {
        img: pathUsar,
        title: title,
        modelo:modelo,
        descripcion:descripcion,
        matricula:matricula,
        eslora:eslora,
        manga:manga,
        metros:metros,
        deuda:deuda,
        type: type,
      }
    })
    console.log()
  const findCardPublicacion = await db.cardPost.findFirst({
    where: {
      idCompletePost: postId,
    },
  });
  const cardPublicacionCreada = await db.cardPost.update({
    where: {
      id:findCardPublicacion.id,
    }, 
    data: {
        boat: true,
        img: pathUsar,
        title: title,
        modelo:modelo,
        type: type,
      }
    
  })

  const PropagarCambiosOfertas = await updateAllOffersByPostId({postId: postId})
  const PropagarCambiosTrades = await updateAllTradesByPostId({postId: postId})
  console.log(PropagarCambiosOfertas)
  console.log(PropagarCambiosTrades)
  
  if (!(publicacionCreada && cardPublicacionCreada)) {
      return { error : "Error al crear la publicacion!"} //si no se creo la publicacion, retorno un error
  }


  return {success : "Publicación creada"} 
  //si todo salio bien, pongo el succes, y un mensaje que es el path para renderizarla si quiero en el formulario

}