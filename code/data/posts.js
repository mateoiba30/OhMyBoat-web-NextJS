"use server"
import { db } from "@/lib/db";
import { getCardPostByCompletePostId } from "./cardPosts";
import { CancelarOfertas, RechazarOfertas } from "../actions/Offer";

export const getAllPosts = async () => {
    try{
        const posts = await db.cardPost.findMany();
        return posts;

    } catch(error){
        console.log(error);
        return null;
    }

}

export const ocultarEmbarcacion = async ({completePostId}) => {
    try {
        console.log(completePostId)
        const hiddenBoat = await db.boatPost.update({
            where: {
                id: completePostId,
            },
            data: {
                status: "HIDDEN",
            }
        });
        console.log(hiddenBoat);

        const card = await getCardPostByCompletePostId({completePostId});
        console.log(card)
        const updatedBoat = await db.cardPost.update({
            where: {
                id: card.id,
            },
            data: {
                status: "HIDDEN",
            }
        });
        console.log(updatedBoat);
        return {success: "Embarcación ocultado correctamente"};
    } catch {
        return null;
    }
}


export const ocultarVehiculo = async ({completePostId}) => {
    try {
        console.log(completePostId);
        const hiddenVehicle = await db.vehiclePost.update({
            where: {
                id: completePostId,
            },
            data: {
                status: "HIDDEN",
            }
        });
        console.log(hiddenVehicle);

        const card = await getCardPostByCompletePostId({completePostId});
        console.log(card)
        const updatedCard = await db.cardPost.update({
            where: {
                id: card.id,
            },
            data: {
                status: "HIDDEN",
            }
        });
        console.log(updatedCard);
        return {success: "Vehículo ocultado correctamente"};
    } catch {
        return null;
    }
}





export const getBoatPostById = async (id) => {
    try {
        console.log(id)
        const boatPost= await db.boatPost.findUnique({
            where: {
                id,
            }
        });
        console.log(boatPost)
        return boatPost;

    } catch {
        return null;
    }
}

export const getVehiclePostById = async (id) => {
    console.log(id)
    try {
        const vehiclePost= await db.vehiclePost.findUnique({
            where: {
                id,
            }
        });
        console.log(vehiclePost)
        return vehiclePost;

    } catch {
        return null;
    }
}

export const getAllBoatPostsByUser = async ({userId}) => {
    //voy a obtener los que no se encuentren pausados
    try {
        const boatPosts = await db.boatPost.findMany(
            {
                where: {
                    idPublisher: userId,
                    OR: [
                        { status: "ACTIVE" },
                        { status: "HIDDEN" }
                      ]
                },
            },
        );
        return boatPosts;
    } catch {
        return null;
    }

}

export const getAllVehiclePostsByUser = async ({userId}) => {
    try {
        const vehiclePosts = await db.vehiclePost.findMany(
            {
                where: {
                    idPublisher: userId,
                    OR: [
                        { status: "ACTIVE" },
                        { status: "HIDDEN" }
                      ]
                },
            },
        );
        return vehiclePosts;
    } catch {
        return null;
    }

}

export const getAllPostsByUser = async ({userId}) => {
    try {
        const cardPosts = await db.cardPost.findMany(
            {
                where: {
                    idPublisher: userId,
                },
            },
        ); 
        return cardPosts
    } catch {
        return null;
    }

}

export const eliminarPost = async ({completePostId}) => {
    try {
        
        const boatPost = await getBoatPostById(completePostId);
        const vehiclePost = await getVehiclePostById(completePostId);
        console.log(boatPost);
        console.log(vehiclePost);

        if (boatPost !== null) {
            const deletedBoat = await db.boatPost.update({
                where: {
                    id: boatPost.id,
                },
                data: {
                    status: "DELETED",
                }
            });
            console.log(deletedBoat);
        } else {
            const deletedVehicle = await db.vehiclePost.update({
                where: {
                    id: vehiclePost.id,
                },
                data: {
                    status: "DELETED",
                }
            });
            console.log(deletedVehicle);
        }

        const card = await getCardPostByCompletePostId({completePostId});
        console.log(card)


        const deletedCard = await db.cardPost.update({
            where: {
                id: card.id,
            },
            data: {
                status: "DELETED",

            }
        });
        console.log(deletedCard);

        const cancelarOfertas = await CancelarOfertas({postId: completePostId});
        console.log(cancelarOfertas);
        const rechazarOfertas = await RechazarOfertas({postId: completePostId});
        console.log(rechazarOfertas);

        return {success: "Post eliminado correctamente"};

    } catch(error){
        console.log(error);
        return null;
    }


}

export const eliminarPostComoDuenio = async ({completePostId}) => {
    const res = await eliminarPost({completePostId});
    const cardPost = await getCardPostByCompletePostId({completePostId});
    console.log(cardPost);
    console.log(res);
    const notificarUsuario = await db.notification.create({
        data: {
            idEmisor: "???",
            idReceptor: cardPost.idPublisher,
            description: `Tu publicación ${cardPost.title} ha sido eliminada debido a que no cumplía con los términos y condiciones de la plataforma`,
            title: "Publicación eliminada",
            seen: false,
            type: "POST_DELETED",
        }
    });
    console.log(notificarUsuario)
    return {success: "El post fue eliminado y se le notifico al usuario"};
}

export const obtenerAutomovilesCard = async () => {
    try {
        const vehicles = await db.vehiclePost.findMany({
            where: {
                status: "ACTIVE",
                type: "Automóvil",
            }
        });

        console.log(vehicles.length);
        let data = [];
        for (let i = 0; i < vehicles.length; i++) {
            console.log("pep")
            const card = await db.cardPost.findFirst({
                where: {
                    idCompletePost: vehicles[i].id,
                }
            });
            console.log(card);
            data.push(card);
        }
        console.log(data.length)
        return data;

    } catch {
        return null;
    }
}

export const obtenerMotocicletasCard = async () => {
    try {
        const motos = await db.vehiclePost.findMany({
            where: {
                status: "ACTIVE",
                type: "Motocicleta",
            }
        })
        console.log(motos);
        let data = [];
        for (let i = 0; i < motos.length; i++) {
            const card = await db.cardPost.findFirst({
                where: {
                    idCompletePost: motos[i].id,
                }
            });
            console.log(card);
            data.push(card);
        }
        console.log(data.length)
        return data;

    } catch (error){
        console.log(error);
        return null;
    }

}

export const obtenerCamionetasCard = async () => {
    try {
        const camionetas = await db.vehiclePost.findMany({
            where: {
                status: "ACTIVE",
                type: "Camioneta",
            }
        })
        console.log(camionetas);
        let data = [];
        for (let i = 0; i < camionetas.length; i++) {
            const card = await db.cardPost.findFirst({
                where: {
                    idCompletePost: camionetas[i].id,
                }
            });
            console.log(card);
            data.push(card);
        }
        console.log(data.length)
        return data;

    } catch (error){
        console.log(error);
        return null;
    }

}

export const obtenerLanchasCard = async () => {
    try {
        const lanchas = await db.boatPost.findMany({
            where: {
                status: "ACTIVE",
                type: "Lancha",
            }
        })
        console.log(lanchas);
        let data = [];
        for (let i = 0; i < lanchas.length; i++) {
            const card = await db.cardPost.findFirst({
                where: {
                    idCompletePost: lanchas[i].id,
                }
            });
            console.log(card);
            data.push(card);
        }
        console.log(data.length)
        return data;

    } catch (error){
        console.log(error);
        return null;
    }
}

export const obtenerCatamaranesCard = async () => {
    try {
        const catamaranes = await db.boatPost.findMany({
            where: {
                status: "ACTIVE",
                type: "Catamarán",
            }
        })
        console.log(catamaranes);
        let data = [];
        for (let i = 0; i < catamaranes.length; i++) {
            const card = await db.cardPost.findFirst({
                where: {
                    idCompletePost: catamaranes[i].id,
                }
            });
            console.log(card);
            data.push(card);
        }
        console.log(data.length)
        return data;

    } catch (error){
        console.log(error);
        return null;
    }
}

export const obtenerVelerosCard = async () => {
    try {
        const veleros = await db.boatPost.findMany({
            where: {
                status: "ACTIVE",
                type: "Velero",
            }
        })
        console.log(veleros);
        let data = [];
        for (let i = 0; i < veleros.length; i++) {
            const card = await db.cardPost.findFirst({
                where: {
                    idCompletePost: veleros[i].id,
                }
            });
            console.log(card);
            data.push(card);
        }
        console.log(data.length)
        return data;

    } catch (error){
        console.log(error);
        return null;
    }
}

export const obtenerCrucerosCard = async () => {
    try {
        const cruceros = await db.boatPost.findMany({
            where: {
                status: "ACTIVE",
                type: "Crucero",
            }
        })
        console.log(cruceros);
        let data = [];
        for (let i = 0; i < cruceros.length; i++) {
            const card = await db.cardPost.findFirst({
                where: {
                    idCompletePost: cruceros[i].id,
                }
            });
            console.log(card);
            data.push(card);
        }
        console.log(data.length)
        return data;

    } catch (error){
        console.log(error);
        return null;
    }
}



export const obtenerBoatsPorModeloCard = async ({modelo}) => {
    try {
        console.log(modelo);
        const boats = await db.boatPost.findMany({
            where: {
                status: "ACTIVE",
                modelo: modelo,
            }
        })
        console.log(boats);
        let data = [];
        for (let i = 0; i < boats.length; i++) {
            const card = await db.cardPost.findFirst({
                where: {
                    idCompletePost: boats[i].id,
                }
            });
            console.log(card);
            data.push(card);
        }
        console.log(data.length)
        return data;

    } catch (error){
        console.log(error);
        return null;
    }
}


export const obtenerVehiclesPorModeloCard = async ({modelo}) => {
    try {
        console.log(modelo);
        const vehicles = await db.vehiclePost.findMany({
            where: {
                status: "ACTIVE",
                modelo: modelo,
            }
        })
        console.log(vehicles);
        let data = [];
        for (let i = 0; i < vehicles.length; i++) {
            const card = await db.cardPost.findFirst({
                where: {
                    idCompletePost: vehicles[i].id,
                }
            });
            console.log(card);
            data.push(card);
        }
        console.log(data.length)
        return data;

    } catch (error){
        console.log(error);
        return null;
    }
}

export const obtenerBoatsPorPrecio = async ({precio}) => {
    try {
        console.log(precio);
        const BoatsByPrice = await db.boatPost.findMany({
            where: {
                status: "ACTIVE",
                deuda: precio,
            }
        })
        console.log(BoatsByPrice);
        let data = [];
        for (let i = 0; i < BoatsByPrice.length; i++) {
            const card = await db.cardPost.findFirst({
                where: {
                    idCompletePost: BoatsByPrice[i].id,
                }
            });
            console.log(card);
            data.push(card);
        }
        console.log(data.length)
        return data;

    } catch (error){
        console.log(error);
        return null;
    }
}


export const obtenerCardsPorModelo = async ({modelo}) => {
    try {
        console.log(modelo);
        const data = await db.cardPost.findMany({
            where: {
                modelo: modelo,
            }
        })
        return data;

    } catch (error){
        console.log(error);
        return null;
    }
}
