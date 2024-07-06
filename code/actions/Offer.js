"use server"

import { db } from "@/lib/db";
import { getUserById } from "../data/user";
import { getBoatPostById, getVehiclePostById } from "../data/posts";
import { getCardPostByCompletePostId } from "../data/cardPosts";
import { getOffersByOfferentId } from "../data/getOffers";
import { auth } from "../auth";

export const OfertarVehículo = async ({idOfertante,descripcion,idPublicacionOfrecida,idPublicacionPedida}) => {

    try {
        const user = await getUserById(idOfertante);
        if (!user) {
            return { error: "Usuario no encontrado!" }
        }
        const existingOffer = await db.offer.findFirst({
            where: {
                idOfertante,
                idPublicacionOfrecida,
                idPublicacionPedida,
                status : {
                    notIn: ["CANCELLED","REJECTED"],
                }
            } 
        });
        console.log(existingOffer);
        if (existingOffer) {
            return { error: "Ya has ofertado este vehículo a esta embarcación!" }
        }
        const vehiclePost = await getVehiclePostById(idPublicacionOfrecida);
        const boatPost = await getBoatPostById(idPublicacionPedida);
        const userOfertado = await getUserById(boatPost.idPublisher);
        const oferta = await db.offer.create({
            data: {
                idOfertante,
                idOfertado: boatPost.idPublisher,
                descripcion,
                idPublicacionOfrecida,
                idPublicacionPedida,
                firstNameOfertante: user.firstname,
                lastNameOfertante: user.lastname,
                boat: false,
                status: "PENDING",
                cellphoneOfertante: user.cellphone,
                emailOfertante: user.email,
                firstNameOfertado: userOfertado.firstname,
                lastNameOfertado: userOfertado.lastname,
                tituloPublicacionOfrecida: vehiclePost.title,
                tituloPublicacionPedida: boatPost.title,
                imgPublicacionOfrecida: vehiclePost.img,
                imgPublicacionPedida: boatPost.img,
            }
        });
        
        const notificacionOferta = await db.notification.create({
            data: {
                idEmisor: idOfertante,
                idReceptor: boatPost.idPublisher,
                title: "Nueva oferta!",
                description: `El usuario ${user.firstname} ${user.lastname} ha ofertado su vehículo ${vehiclePost.title} por tu embarcación ${boatPost.title}`,
                seen: false,
                type: "OFFER",
            }
        
        })
        if (oferta) {
            return { success: "Oferta realizada con éxito!" }
        }

        
    } catch (error) {
        console.error('Error al ofertar:', error);
    }

}

export const OfertarEmbarcacion = async ({idOfertante,descripcion,idPublicacionOfrecida,idPublicacionPedida}) => {
    try {
        const user = await getUserById(idOfertante);
        if (!user) {
            return { error: "Usuario no encontrado!" }
        }
        const existingOffer = await db.offer.findFirst({
            where: {
                idOfertante,
                idPublicacionOfrecida,
                idPublicacionPedida,
                status : {
                    notIn: ["CANCELLED","REJECTED"],
                }
            }
        });

        if (existingOffer) {
            return { error: "Ya has ofertado esta embarcación a este vehículo!" }
        }

        const boatPost = await getBoatPostById(idPublicacionOfrecida);
        console.log(boatPost);
        const vehiclePost = await getVehiclePostById(idPublicacionPedida);
        console.log(vehiclePost);
        const userOfertado = await getUserById(vehiclePost.idPublisher);
        console.log(userOfertado)

        const oferta = await db.offer.create({
            data: {
                idOfertante,
                idOfertado: vehiclePost.idPublisher,
                descripcion,
                idPublicacionOfrecida,
                idPublicacionPedida,
                boat: true,
                firstNameOfertante: user.firstname,
                lastNameOfertante: user.lastname,
                status: "PENDING",
                cellphoneOfertante: user.cellphone,
                emailOfertante: user.email,
                firstNameOfertado: userOfertado.firstname,
                lastNameOfertado: userOfertado.lastname,
                tituloPublicacionOfrecida: boatPost.title,
                tituloPublicacionPedida: vehiclePost.title,
                imgPublicacionOfrecida: boatPost.img,
                imgPublicacionPedida: vehiclePost.img,  
            }
        });

        const notificacionOferta = await db.notification.create({
            data: {
                idEmisor: idOfertante,
                idReceptor: vehiclePost.idPublisher,
                title: "Nueva oferta!",
                description: `El usuario ${user.firstname} ${user.lastname} ha ofertado su embarcación ${boatPost.title} por tu vehículo ${vehiclePost.title}`,
                seen: false,
                type: "OFFER",
            }
        
        })
        if (oferta) {
            return { success: "Oferta realizada con éxito!" }
        }
    } catch (error) {
        console.error('Error al ofertar:', error);
    }

}

const rechazarOfertaInterno = async ({offerId}) => {
    try {
        console.log(offerId);
        const res = await db.offer.update({
            where: {
                id: offerId,
            },
            data: {
                status: "REJECTED",
            }
        });

        const notificacion = await db.notification.create({
            data: {
                idEmisor: "???",
                idReceptor: res.idOfertante,
                title: "Oferta rechazada",
                description: `Tu oferta por la publicación ${res.tituloPublicacionPedida} ofertando ${res.tituloPublicacionOfrecida} ha sido rechazada`,
                seen: false,
                type: "OFFER",
            }
        })
        console.log(notificacion);

        if (res.boat === false) { //quiere decir que la publicacion ofertada es un auto, por ende la pedida bote
            const vehiclePost = await getVehiclePostById(res.idPublicacionOfrecida);
            if (!vehiclePost) {
                return { error: "Publicación no encontrada!" }
            }
            const vehicleCard = await getCardPostByCompletePostId({completePostId: vehiclePost.id});
            if (!vehicleCard) {
                return { error: "Publicación card no encontrada!" }
            }
            const resCardPost = await db.cardPost.update({
                where: {
                    id: vehicleCard.id,
                },
                data: {
                    status: "ACTIVE",
                }
            });
            const resVehiclePost = await db.vehiclePost.update({
                where: {
                    id: vehiclePost.id,
                },
                data: {
                    status: "ACTIVE",
                }
            });

            if( res && resCardPost && resVehiclePost) {
                console.log("Oferta rechazada con éxito!")
            }
        } else if (res.boat === true) { //quiere decir que la publicacion ofertada es un bote, por ende la pedida auto  
            const boatPost = await getBoatPostById(res.idPublicacionOfrecida);
            if (!boatPost) {
                return { error: "Publicación no encontrada!" }
            }
            const boatCard = await getCardPostByCompletePostId({completePostId: boatPost.id});
            if (!boatCard) {
                return { error: "Publicación card no encontrada!" }
            }
            const resCardPost = await db.cardPost.update({
                where: {
                    id: boatCard.id,
                },
                data: {
                    status: "ACTIVE",
                }
            });
            const resBoatPost = await db.boatPost.update({
                where: {
                    id: boatPost.id,
                },
                data: {
                    status: "ACTIVE",
                }
            });
            if( res && resCardPost && resBoatPost) {
                return { success: "Oferta rechazada con éxito!" }
            }
        }

        if (res) {
            return { success: "Oferta rechazada con éxito!" }
        }
    } catch (error) {
        console.error('Error al rechazar la oferta:', error);
    }
}

export const RechazarOferta = async ({offerId}) => {
    try {
        console.log(offerId);
        const res = await db.offer.update({
            where: {
                id: offerId,
            },
            data: {
                status: "REJECTED",
            }
        });

        const notificacion = await db.notification.create({
            data: {
                idEmisor: "???",
                idReceptor: res.idOfertante,
                title: "Oferta rechazada",
                description: `Tu oferta de ${res.tituloPublicacionOfrecida} por la publicación ${res.tituloPublicacionPedida} ha sido rechazada`,
                seen: false,
                type: "OFFER",
            }
        })

        if (res) {
            return { success: "Oferta rechazada con éxito!" }
        }
    } catch (error) {
        console.error('Error al rechazar la oferta:', error);
    }
}


const enviarNotifRechazoInterno = async ({oferta}) => {
    try {
        const notificacion = await db.notification.create({
            data: {
                idEmisor: "???",
                idReceptor: oferta.idOfertante,
                title: "Oferta rechazada",
                description: `Tu oferta de ${oferta.tituloPublicacionOfrecida} por la publicación ${oferta.tituloPublicacionPedida} ha sido rechazada`,
                seen: false,
                type: "OFFER",
            }
        })
        console.log(notificacion);
        if (notificacion) {
            return { success: "Notificación enviada con éxito!" }
        }
    } catch (error) {
        console.error('Error al enviar la notificación:', error);
    }
}

export const ConfirmarOferta = async ({offerId}) => {
    try {
        console.log(offerId);
        const res = await db.offer.update({
            where: {
                id: offerId,
            },
            data: {
                status: "CONFIRMED",
            }
        });

        


        const ofertaParalela = await db.offer.findFirst({
            where: {
                idPublicacionPedida: res.idPublicacionOfrecida,
                idPublicacionOfrecida: res.idPublicacionPedida,
                status: "PENDING",
            }
        });
        if (ofertaParalela) {
            const confirmada = await db.offer.update({
                where: {
                    id: ofertaParalela.id,
                },
                data: {
                    status: "CONFIRMED",
                }
            });
            console.log(confirmada);
        }

        const rejectAllOffers = await db.offer.findMany({
            where: {
                idPublicacionPedida: res.idPublicacionPedida,
                id: {
                    not: offerId,
                },
                status: "PENDING",
            },
        });

        for (let i = 0; i < rejectAllOffers.length; i++) {
            const rechzada = await rechazarOfertaInterno({offerId: rejectAllOffers[i].id});
            console.log(rechzada);
        }

        if (res.boat === false) { //quiere decir que la publicacion ofertada es un auto, por ende la pedida bote
            const boatPost = await getBoatPostById(res.idPublicacionPedida);
            if (!boatPost) {
                return { error: "Publicación no encontrada!" }
            }
            console.log(boatPost);
            const boatCard = await getCardPostByCompletePostId({completePostId: boatPost.id});
            if (!boatCard) {
                return { error: "Publicación card no encontrada!" }
            }
            console.log(boatCard)
            const resCardPost = await db.cardPost.update({
                where: {
                    id: boatCard.id,
                },
                data: {
                    status: "PAUSED",
                }
            });
            console.log(resCardPost);
            const resBoatPost = await db.boatPost.update({
                where: {
                    id: boatPost.id,
                },
                data: {
                    status: "PAUSED",
                }
            });    
            console.log(resBoatPost);
            //ahora pauso la publicacion ofertada
            const resVehiclePost = await getVehiclePostById(res.idPublicacionOfrecida);
            console.log(resVehiclePost)
            const resVehiclePostUpdated = await db.vehiclePost.update({
                where: {
                    id: resVehiclePost.id,
                },
                data: {
                    status: "PAUSED",
                }
            });
            console.log(resVehiclePostUpdated);

            const cardPost = await getCardPostByCompletePostId({completePostId: resVehiclePost.id});
            console.log(cardPost);
            const cardPostUpdated = await db.cardPost.update({
                where: {
                    id: cardPost.id, 
                },
                data: {
                    status: "PAUSED",
                }
            });
            console.log(cardPostUpdated);
        } else if (res.boat === true){ //quiere decir que la publicacion ofertada es un bote, por ende la pedida auto
            const vehiclePost = await getVehiclePostById(res.idPublicacionPedida);
            if (!vehiclePost) {
                return { error: "Publicación no encontrada!" }
            }
            console.log(vehiclePost)
            const vehicleCard = await getCardPostByCompletePostId({completePostId: vehiclePost.id});
            if (!vehicleCard) {
                return { error: "Publicación card no encontrada!" }
            }
            console.log(vehicleCard)
            const resCardPost = await db.cardPost.update({
                where: {
                    id: vehicleCard.id,
                },
                data: {
                    status: "PAUSED",
                }
            });
            console.log(resCardPost)
            const resVehiclePost = await db.vehiclePost.update({
                where: {
                    id: vehiclePost.id,
                },
                data: {
                    status: "PAUSED",
                }
            });
            //pausamos la otra publicacion
            const resBoatPost = await getBoatPostById(res.idPublicacionOfrecida);
            console.log(resBoatPost);
            const resBoatPostUpdated = await db.boatPost.update({
                where: {
                    id: resBoatPost.id,
                },
                data: {
                    status: "PAUSED",
                }
            });
            console.log(resBoatPostUpdated);
            const cardPost = await getCardPostByCompletePostId({completePostId: resBoatPost.id});
            console.log(cardPost);
            const cardPostUpdated = await db.cardPost.update({
                where: {
                    id: cardPost.id,
                },
                data: {
                    status: "PAUSED",
                }
            });
            console.log(cardPostUpdated);
            
        } //probar aca

        //mandamos notificacion al ofertante de que se le confirmo la oferta

        const notificacionConfirmacionAOfertante = await db.notification.create({
            data: {
                idEmisor: "???",
                idReceptor: res.idOfertante,
                title: "Oferta aceptada!",
                description: `Tu oferta de ${res.tituloPublicacionOfrecida} por la publicación ${res.tituloPublicacionPedida} ha sido aceptada con éxito, ya puedes pactar una fecha para el trueque!`,
                seen: false,
                type: "OFFER",
            }
            })
            console.log(notificacionConfirmacionAOfertante);
            
            //le mandamos que se le pauso la oferta

            const notificacionPausadaOfertante = await db.notification.create({
                data: {
                    idEmisor: "???",
                    idReceptor: res.idOfertante,
                    title: "Publicación pausada",
                    description: `Debido a que la oferta de la publicación ${res.tituloPublicacionOfrecida} ha sido aceptada, esta ha sido pausada temporalmente`,
                    seen: false,
                    type: "OFFER",
                }
                })
           console.log(notificacionPausadaOfertante);

        const post = await getCardPostByCompletePostId({completePostId: res.idPublicacionPedida});
        console.log(post);
        //mandamos notificacion al ofertado de que se le pauso la publi
        const notificacionPausadaOfertado = await db.notification.create({
            data: {
                idEmisor: "???",
                idReceptor: post.idPublisher,
                title: "Publicación pausada",
                description: `Debido a que has aceptado el trueque de ${res.tituloPublicacionPedida} y ${res.tituloPublicacionOfrecida} tu publicación ha sido pausada temporalmente`,
                seen: false,
                type: "OFFER",
            }
            })
        console.log(notificacionPausadaOfertado);
            


        //busco las ofertas canceladas del ofertante
        const ofertasCanceladasOfertante = await db.offer.findMany({
            where: {
                idOfertante: res.idOfertante,
                idPublicacionOfrecida: res.idPublicacionOfrecida,
                status: "PENDING",
            },
        })
        console.log(ofertasCanceladasOfertante);



        //si hay ofertas a cancelar para el ofertante entro
        if (ofertasCanceladasOfertante.length > 0) {
            const notificacionCanceladasOfertante = await db.notification.create({
                data: {
                    idEmisor: "???",
                    idReceptor: res.idOfertante,
                    title: "Ofertas canceladas!",
                    description: `Debido a que tu oferta de ${res.tituloPublicacionPedida} y ${res.tituloPublicacionOfrecida} fue aceptada, las ofertas que hiciste con ${res.tituloPublicacionOfrecida} han sido canceladas`,
                    seen: false,
                    type: "OFFER",
                }
                })
            console.log(notificacionCanceladasOfertante);

    
                //le mando notif a cada uno de los ofertados que se les cancelo la oferta
                for (let i = 0; i < ofertasCanceladasOfertante.length; i++) {
                    const notifEnviada = await db.notification.create({
                        data: {
                            idEmisor: "???",
                            idReceptor: ofertasCanceladasOfertante[i].idOfertado,
                            title: "Oferta cancelada",
                            description: `La oferta realizada por ${ofertasCanceladasOfertante[i].firstNameOfertante} ${ofertasCanceladasOfertante[i].lastNameOfertante} de ${ofertasCanceladasOfertante[i].tituloPublicacionOfrecida} por la publicación ${ofertasCanceladasOfertante[i].tituloPublicacionPedida} ha sido cancelada`,
                            seen: false,
                            type: "OFFER",
                        }
                    })
                    console.log(notifEnviada);
                }
                //las cancelo
                const ofertasCanceladasOfertanteUpdated = await db.offer.updateMany({
                    where: {
                        idOfertante: res.idOfertante,
                        idPublicacionOfrecida: res.idPublicacionOfrecida,
                        status: "PENDING",
                    },
                    data: {
                        status: "CANCELLED",
                    }
                })
                console.log(ofertasCanceladasOfertanteUpdated)
        }

        //busca las ofertas pendientes del ofertado
        const ofertasCanceladasOfertado = await db.offer.findMany({
            where: {
                idPublicacionOfrecida: res.idPublicacionPedida,
                status: "PENDING",
            },

        })
        console.log(ofertasCanceladasOfertado);
        //mandamos notificacion al ofertado de que se le cancelaron las demas ofertas
        if (ofertasCanceladasOfertado.length > 0) {

                const notificacionCanceladasOfertado = await db.notification.create({
                    data: {
                        idEmisor: "???",
                        idReceptor: post.idPublisher,
                        title: "Ofertas canceladas!",
                        description: `Debido a que tu oferta de ${res.tituloPublicacionPedida} y ${res.tituloPublicacionOfrecida} fue aceptada, las ofertas que hiciste con ${res.tituloPublicacionPedida} han sido canceladas`,
                        seen: false,
                        type: "OFFER",
                    }
                 })
                 console.log(notificacionCanceladasOfertado);
                
                    //le mando notif a cada uno de los ofertados que se les cancelo la oferta

                    for (let i = 0; i < ofertasCanceladasOfertado.length; i++) {
                        const notifEnviada = await db.notification.create({
                            data: {
                                idEmisor: "???",
                                idReceptor: ofertasCanceladasOfertado[i].idOfertado,
                                title: "Oferta cancelada",
                                description: `La oferta realizada por ${ofertasCanceladasOfertado[i].firstNameOfertante} ${ofertasCanceladasOfertado[i].lastNameOfertante} de ${ofertasCanceladasOfertado[i].tituloPublicacionOfrecida} por la publicación ${ofertasCanceladasOfertado[i].tituloPublicacionPedida} ha sido cancelada`,
                                seen: false,
                                type: "OFFER",
                            }
                        })
                        console.log(notifEnviada);
                    }

                    //las cancelo
                 const ofertasCanceladasOfertadoUpdated = await db.offer.updateMany({
                    where: {
                        idPublicacionOfrecida: res.idPublicacionPedida,
                        status: "PENDING",
                    },
                    data : {
                        status: "CANCELLED",
                    }
                })

                console.log(ofertasCanceladasOfertadoUpdated);

        }

        const ofertasRechazadas = await db.offer.updateMany({
            where: {
                idPublicacionPedida: res.idPublicacionOfrecida,
                status: "PENDING",
            },
            data: {
                status: "REJECTED",
            }
        })
        console.log(ofertasRechazadas);
        //busco las ofertas rechazadas de la publi por parte del ofertante
        const arOfertasRechazadas = await db.offer.findMany({
            where: {
                idPublicacionPedida: res.idPublicacionOfrecida,
                status: "REJECTED",
            }
        })
        console.log(arOfertasRechazadas);
        if (arOfertasRechazadas) {
            console.log(arOfertasRechazadas)
            for (let j = 0; j < arOfertasRechazadas.length; j++) {
                console.log(arOfertasRechazadas[j]);
                const notifEnviada = await enviarNotifRechazoInterno({oferta: arOfertasRechazadas[j]});
                console.log(notifEnviada);
            }

        }


        const session = await auth()
        const userId = session.user?.id
        const userOfertado = await getUserById(userId);
        const userOfertante = await getUserById(res.idOfertante);
        console.log(userOfertante);
        console.log(userOfertado);
        const cardPost1 = await getCardPostByCompletePostId({completePostId: res.idPublicacionOfrecida});
        const cardPost2 = await getCardPostByCompletePostId({completePostId: res.idPublicacionPedida});
        const newTrade = await db.trade.create({ //creo el trade con los datos pedidos
            data: {
                status: "FECHA_PENDIENTE",
                proposedDay1: "EMPTY",
                proposedDay2: "EMPTY",
                idUsuario1: userOfertante.id,
                idUsuario2: userOfertado.id,
                idPost1: res.idPublicacionOfrecida,
                idPost2: res.idPublicacionPedida,
                PhoneUsuario1: userOfertante.cellphone,
                PhoneUsuario2: userOfertado.cellphone,
                EmailUsuario1: userOfertante.email,
                EmailUsuario2: userOfertado.email,
                NombreUsuario1: userOfertante.firstname,
                NombreUsuario2: userOfertado.firstname,
                ApellidoUsuario1: userOfertante.lastname,
                ApellidoUsuario2: userOfertado.lastname,
                tituloPublicacionOfrecida: res.tituloPublicacionOfrecida,
                tituloPublicacionPedida: res.tituloPublicacionPedida,
                imgPublicacionOfrecida: res.imgPublicacionOfrecida,
                imgPublicacionPedida: res.imgPublicacionPedida,
                ReviewedByUser1: false,
                ReviewedByUser2: false,
                typePost1: cardPost1.type,
                typePost2: cardPost2.type,
            }
        
        })
        console.log(newTrade);

        const notificacionTrueque1 = await db.notification.create({
            data : {
                idEmisor: "???",
                idReceptor: post.idPublisher,
                title: "Trueque pendiente",
                description: `La oferta por la publicación ${res.tituloPublicacionPedida} y ${res.tituloPublicacionOfrecida} ha sido aceptada con éxito, ahora puedes pactar una fecha para el trueque!`,
                seen: false,
                type: "TRADE",
            }
        })
        console.log(notificacionTrueque1);

        if (res) {
            return { success: "Oferta confirmada con éxito!" }
        }



    } catch (error) {
        console.error('Error al confirmar la oferta:', error);
    }
}


export const CancelarOferta = async ({offerId}) => {
    try {
        console.log(offerId);
        const offer = await db.offer.update({
            where: {
                id: offerId,
            },
            data: {
                status: "CANCELLED",
            }
        });
        
        const post = await getCardPostByCompletePostId({completePostId: offer.idPublicacionPedida});

        const notificacionOfertante = await db.notification.create({
            data: {
                idEmisor: "???",
                idReceptor: offer.idOfertante,
                title: "Oferta cancelada",
                description: `Tu oferta por la publicación ${offer.tituloPublicacionPedida} ofertando ${offer.tituloPublicacionOfrecida} ha sido cancelada`,
                seen: false,
                type: "OFFER",
            }
        })
        console.log(notificacionOfertante)

        const notificacionOfertado = await db.notification.create({
            data: {
                idEmisor: "???",
                idReceptor: post.idPublisher,
                title: "Oferta cancelada",
                description: `La oferta de ${offer.tituloPublicacionOfrecida} por la publicación ${offer.tituloPublicacionPedida} ha sido cancelada`,
                seen: false,
                type: "OFFER",
            }
        })
        console.log(notificacionOfertado)

        if (offer) {
            return { success: "Oferta cancelada con éxito!" }
        }

    } catch (error) {
        console.error('Error al cancelar la oferta:', error);
    }

}


export const updateAllOffersByPostId = async ({postId}) => {
    try {
        let updatedPost = await getBoatPostById(postId);
        if  (!updatedPost) { //quiere decir que el post es un vehiculo
            updatedPost = await getVehiclePostById(postId);
        }

        const offers = await db.offer.findMany({
            where: {
                OR: [
                    { idPublicacionOfrecida: postId },
                    { idPublicacionPedida: postId },
                ]
            }
        });
        console.log(offers)
        for (let i = 0; i < offers.length; i++) {
            if (offers[i].idPublicacionOfrecida === postId) {
                const res = await db.offer.update({
                    where: {
                        id: offers[i].id,
                    },
                    data: {
                        tituloPublicacionOfrecida: updatedPost.title,
                        imgPublicacionOfrecida: updatedPost.img,
                    }
                });
                console.log(res);
            }
            else if (offers[i].idPublicacionPedida === postId) {
                const res = await db.trade.update({
                    where: {
                        id: trades[i].id,
                    },
                    data: {
                        tituloPublicacionPedida: updatedPost.title,
                        imgPublicacionPedida: updatedPost.img,
                    }
                });
                console.log(res);
            }
        }

    } catch ( error) {
        console.log(error);
        return null;
    }
}

export const CancelarOfertas = async ({postId}) => {
    try {
        const offers = await db.offer.findMany({
            where: {
                idPublicacionOfrecida: postId,
                status: "PENDING",
            }
        })
        console.log(offers);
        for (let i = 0; i < offers.length; i++) {
            const res = await CancelarOferta({offerId: offers[i].id});
            console.log(res);
        }
        return true;
    } catch(error) {
        console.log(error)
        return null;
    }


}

export const RechazarOfertas = async ({postId}) => {
    try {
        const offers = await db.offer.findMany({
            where : {
                idPublicacionPedida: postId,
                status: "PENDING",
            }
        });
        console.log(offers);
        for (let i=0;i < offers.length; i++) {
            const res = await RechazarOferta({offerId: offers[i].id});
            console.log(res);
        }
        return true;
    } catch (error) {
        console.log(error);
        return null;
    }

}