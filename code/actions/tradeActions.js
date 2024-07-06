"use server"
import { db } from "@/lib/db"
import { getBoatPostById, getVehiclePostById } from "../data/posts";
import { getCardPostByCompletePostId } from "../data/cardPosts";
import { getUserById } from "../data/user";

export const eraseAllOffers = async (postId) => {
    try {
        const res = await db.offer.deleteMany({
            where: {
                idPublicacionPedida: postId,
            }
        });
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const ocultarEmbarcacion = async ({completePostId}) => {
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


const ocultarVehiculo = async ({completePostId}) => {
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



export const getTradesById = async (id) => {
    try {
        const trades = await db.trade.findMany({
            where: {
                OR: [
                    { idUsuario1: id },
                    { idUsuario2: id },
                ]
            }
        });
        return trades;

    } catch {
        return null;
    }

}

export const getTradeById = async (id) => {
    try {
        const trade = await db.trade.findUnique({
            where: {
                id: id,
            }
        });
        return trade;
    } catch {
        return null;
    }
}

export const getAllPendingTrades = async () => {
    try {
        const pendingTrades = await db.trade.findMany({
            where: {
                OR : [
                    { status: "FECHA_PACTADA"},
                ]
            }
        });
        console.log(pendingTrades)
        return pendingTrades;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const DateAlreadySetted = async ({idTrade,idUser}) => {
    try {
        const actualTrade = await db.trade.findUnique({
            where: {
                id: idTrade,
            }
        });
        if ((actualTrade.idUsuario1 === idUser)) {
            if (actualTrade.proposedDay1 === "EMPTY") {
                return false;
            }
            return true;
        }
        if (actualTrade.idUsuario2 === idUser) {
            if (actualTrade.proposedDay2 === "EMPTY") {
                return false;
            }
            return true;
        }

    } catch (error) {
        console.log(error)
        return null;
}
}

export const setTradeDate = async ({userId,tradeId,proposedDay}) => {
    try {
        console.log(userId)
        console.log(tradeId)
        console.log(proposedDay)

        const actualTrade = await db.trade.findUnique({
            where: {
                id: tradeId,
            }
        });
        let res
        if ((actualTrade.idUsuario1 === userId)) {
            res = await db.trade.update({
                where: {
                    id: tradeId,
                },
                data: {
                    proposedDay1: proposedDay,
                }
            });
        }
        if (actualTrade.idUsuario2 === userId) {
            res = await db.trade.update({
                where: {
                    id: tradeId,
                },
                data: {
                    proposedDay2: proposedDay,
                }
            });
        }
        //si las dos estan puestas y son iguales
        if((res.proposedDay1 !== "EMPTY" && res.proposedDay2 !== "EMPTY") && (res.proposedDay1 === res.proposedDay2)) {
            console.log("entra");
            const updatedTrade = await db.trade.update({
                where: {
                    id: tradeId,
                },
                data: {
                    status: "FECHA_PACTADA",
                }
            });
            if (updatedTrade){ //si el trade se updateo
                //si el user 1 fue quien puso la fecha le mando una notificacion al user 2 de que el trueque se encuentra pendiente
                if (userId === actualTrade.idUsuario1) {
                    const notifUsuario2 = await db.notification.create({
                        data: {
                            idReceptor: actualTrade.idUsuario2,
                            idEmisor: "???",
                            title: "Trueque pendiente",
                            description: `El usuario ${actualTrade.NombreUsuario1} ${actualTrade.ApellidoUsuario1} confirmó la fecha ${proposedDay} para el trueque entre ${actualTrade.tituloPublicacionOfrecida} y ${actualTrade.tituloPublicacionPedida} ahora se encuentra en estado pendiente de confirmación!`,
                            seen: false,
                            type: "TRADE",
                        }
                    });
                    console.log(notifUsuario2);
                }
                //si el user 2 fue quien puso la fecha le mando una notificacion al user 1 de que el trueque se encuentra pendiente
                if (userId === actualTrade.idUsuario2) {
                    const notifUsuario1 = await db.notification.create({
                        data: {
                            idReceptor: actualTrade.idUsuario1,
                            idEmisor: "???",
                            title: "Trueque pendiente",
                            description: `El usuario ${actualTrade.NombreUsuario2} ${actualTrade.ApellidoUsuario2} confirmó la fecha ${proposedDay} para el trueque entre ${actualTrade.tituloPublicacionOfrecida} y ${actualTrade.tituloPublicacionPedida} ahora se encuentra en estado pendiente de confirmación!`,
                            seen: false,
                            type: "TRADE",
                        }
                    });
                    console.log(notifUsuario1);
                }

                return {success : "La fecha propuesta por ambos se confirmó correctamente y el trueque está pendiente de confirmación"}
            }
            
        }

        if ((res.proposedDay1 !== "EMPTY" && res.proposedDay2 !== "EMPTY") && (res.proposedDay1 !== res.proposedDay2)) {
            console.log("entra")
                //si el user1 ingreso la fecha y no coincide con la del user2
                if (userId === actualTrade.idUsuario1) {
                    const notifUsuario2 = await db.notification.create({
                        data: {
                            idReceptor: actualTrade.idUsuario2,
                            idEmisor: "???",
                            title: "Fecha inválida",
                            description: `El usuario ${actualTrade.NombreUsuario1} ${actualTrade.ApellidoUsuario1} ingresó la fecha ${proposedDay} y no coincide con la fecha
                            con la fecha anteriormente propuesta por vos (${actualTrade.proposedDay2}), se ha reseteado el formulario para que vuelvan a pactar una fecha`,
                            seen: false,
                            type: "TRADE",
                        }
                    });
                    console.log(notifUsuario2);
                }
                //si el usuario 2 fue el que ingreso la fecha que no coincidia
                if (userId === actualTrade.idUsuario2) {
                    const notifUsuario1 = await db.notification.create({
                        data: {
                            idReceptor: actualTrade.idUsuario1,
                            idEmisor: "???",
                            title: "Fecha inválida",
                            description: `El usuario ${actualTrade.NombreUsuario2} ${actualTrade.ApellidoUsuario2} ingresó la fecha ${proposedDay} y no coincide con la fecha
                            con la fecha anteriormente propuesta por vos (${actualTrade.proposedDay1}), se ha reseteado el formulario para que vuelvan a pactar una fecha`,
                            seen: false,
                            type: "TRADE",
                        }
                    });
                    console.log(notifUsuario1);
                }


            
            const reset = await db.trade.update({
                where: {
                    id: tradeId,
                },
                data: {
                    proposedDay1: "EMPTY",
                    proposedDay2: "EMPTY",
                }
            });

        

            console.log(reset);
            return {error : "Las fechas no coinciden, se resetearon los formularios para que vuelvan a pactar una fecha"}
        }
        if (res) {
            if (userId === actualTrade.idUsuario1) {
                const notifFechaUsuario2 = await db.notification.create({
                    data: {
                        idReceptor: actualTrade.idUsuario2,
                        idEmisor: userId,
                        title: "Fecha propuesta",
                        description: `El usuario ${actualTrade.NombreUsuario1} ${actualTrade.ApellidoUsuario1} ingresó la fecha ${proposedDay} para el trueque entre ${actualTrade.tituloPublicacionOfrecida} y ${actualTrade.tituloPublicacionPedida}`,
                        seen: false,
                        type: "TRADE",
                    }
                });
                console.log(notifFechaUsuario2);
            }

            if (userId === actualTrade.idUsuario2) {
                const notifFechaUsuario1 = await db.notification.create({
                    data: {
                        idReceptor: actualTrade.idUsuario1,
                        idEmisor: userId,
                        title: "Fecha propuesta",
                        description: `El usuario ${actualTrade.NombreUsuario2} ${actualTrade.ApellidoUsuario2} ingresó la fecha ${proposedDay} para el trueque entre ${actualTrade.tituloPublicacionOfrecida} y ${actualTrade.tituloPublicacionPedida}`,
                        seen: false,
                        type: "TRADE",
                    }
                });
                console.log(notifFechaUsuario1);
            }
            return {success : "La fecha se cargó correctamente. Espera a que el otro usuario confirme la fecha también!"};
        }
        return null;
    } catch (error) {
        console.log(error)
        return null;
    }


}

const modificarCards = async ({idCompletePost1,idCompletePost2,userId1,userId2}) => {
    try {
        const card1 = await getCardPostByCompletePostId({completePostId: idCompletePost1});
        const card2 = await getCardPostByCompletePostId({completePostId: idCompletePost2});
        const user1 = await getUserById(userId1);
        const user2 = await getUserById(userId2);
        if (card1 !== null && card2 !== null) {
            const res1 = await db.cardPost.update({
                where: {
                    id: card1.id,
                },
                data: {
                    idPublisher: userId2,
                    firstNamePublisher: user2.firstname,
                    lastNamePublisher: user2.lastname,
                }
            });
            const res2 = await db.cardPost.update({
                where: {
                    id: card2.id,
                },
                data: {
                    idPublisher: userId1,
                    firstNamePublisher: user1.firstname,
                    lastNamePublisher: user1.lastname,
                }
            });
            if (res1 && res2) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.log(error)
        return null;
    }



}

export const confirmTrade = async ({tradeId}) => {
    try {
        const res = await db.trade.update({
            where: {
                id: tradeId,
            },
            data: {
                status: "TRUEQUE_REALIZADO",
            }
        });

        const userId1 = res.idUsuario1;
        console.log(userId1);
        const userId2 = res.idUsuario2;
        console.log(userId2);
        const publicationId1 = res.idPost1;
        console.log(publicationId1);
        const publicationId2 = res.idPost2;
        console.log(publicationId2);
        //vamos a intercambiar los ids de las publicaciones
        let isBoat = false; //ocultar las publis
        const publication1EsBote = await getBoatPostById(publicationId1);
        console.log(publication1EsBote);
        if (publication1EsBote !== null) {
            console.log("entra");
            isBoat = true;
        }
        if (isBoat === true) {
            const res1 = await db.boatPost.update({
                where: {
                    id: publicationId1,
                },
                data: {
                    idPublisher: userId2,
                }
            });
            console.log(res1);
            //ocultamos la publi
            //const ocultarBote = await ocultarEmbarcacion({completePostId: publicationId1});
            //console.log(ocultarBote);
            
            const res2 = await db.vehiclePost.update({
                where: {
                    id: publicationId2,
                },
                data: {
                    idPublisher: userId1,
                }
            });
            console.log(res2);
            // const ocultarVehiculo = await ocultarVehiculo({completePostId: publicationId2});
            // console.log(ocultarVehiculo);

            const res1_boat = await ocultarEmbarcacion({completePostId: res.idPost1});
            console.log(res1_boat);

            const res2_vehicle = await ocultarVehiculo({completePostId: res.idPost2});
            console.log(res2_vehicle);

            const ok = await modificarCards({idCompletePost1: publicationId1,idCompletePost2: publicationId2,userId1: userId1,userId2: userId2});
            console.log(ok);

        }
        if (isBoat === false){
            const res1 = await db.vehiclePost.update({
                where: {
                    id: publicationId1,
                },
                data: {
                    idPublisher: userId2,
                }
            });
            // const ocultarVehiculo = await ocultarVehiculo({completePostId: publicationId1});
            // console.log(ocultarVehiculo);
            console.log(res1);

            const res2 = await db.boatPost.update({
                where: {
                    id: publicationId2,
                },
                data: {
                    idPublisher: userId1,
                }
            });
            console.log(res2);
            // const ocultarBote = await ocultarEmbarcacion({completePostId: publicationId2});
            // console.log(ocultarBote);


            const res1_vehicle = await ocultarVehiculo({completePostId: res.idPost1});
            console.log(res1_vehicle);


            const res2_boat = await ocultarEmbarcacion({completePostId: res.idPost2});
            console.log(res2_boat);


            
            const ok = await modificarCards({idCompletePost1: publicationId1,idCompletePost2: publicationId2,userId1: userId1,userId2: userId2});

            console.log(ok);
        }
        if (res) {
            //informamos a ambos usuarios de que tienen las publicaciones correspondientes a los trueques
            const notifUser1 = await db.notification.create({
                data: {
                    idReceptor: res.idUsuario1,
                    idEmisor: "???",
                    title: "Trueque realizado",
                    description: `El gerente confirmó que el trueque entre ${res.tituloPublicacionOfrecida} y ${res.tituloPublicacionPedida} se realizó correctamente, ahora
                    ${res.tituloPublicacionPedida} se encuentra dentro de tus publicaciones y puedes reseñar a ${res.NombreUsuario2} ${res.ApellidoUsuario2}!`,
                    seen: false,
                    type: "TRADE",
                }
            });
            console.log(notifUser1);

            const notifUser2 = await db.notification.create({
                data: {
                    idReceptor: res.idUsuario2,
                    idEmisor: "???",
                    title: "Trueque realizado",
                    description: `El gerente confirmó que el trueque entre ${res.tituloPublicacionOfrecida} y ${res.tituloPublicacionPedida} se realizó correctamente, ahora
                    ${res.tituloPublicacionOfrecida} se encuentra dentro de tus publicaciones y puedes reseñar a ${res.NombreUsuario1} ${res.ApellidoUsuario1}!`,
                    seen: false,
                    type: "TRADE",
                }
            });
            console.log(notifUser2);


            const res1 = await eraseAllOffers(res.idPost1);
            const res2 = await eraseAllOffers(res.idPost2); 
            console.log(res1);
            console.log(res2);
            return {success : "El trueque se confirmó correctamente"}
        }

        return null;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const rejectTrade = async ({tradeId}) => {
    try {
        const res = await db.trade.update({
            where: {
                id: tradeId,
            },
            data: {
                status: "TRUEQUE_NO_REALIZADO",
            }
        });
        if (res) {
            const notifUser1 = await db.notification.create({
                data: {
                    idReceptor: res.idUsuario1,
                    idEmisor: "???",
                    title: "Trueque no realizado",
                    description: `El gerente confirmó que el trueque entre ${res.tituloPublicacionOfrecida} y ${res.tituloPublicacionPedida} no se realizó correctamente`,
                    seen: false,
                    type: "TRADE",
                }
            });
            const notifUser2 = await db.notification.create({
                data: {
                    idReceptor: res.idUsuario2,
                    idEmisor: "???",
                    title: "Trueque no realizado",
                    description: `El gerente confirmó que el trueque entre ${res.tituloPublicacionOfrecida} y ${res.tituloPublicacionPedida} no se realizó correctamente`,
                    seen: false,
                    type: "TRADE",
                }
            });

            console.log(notifUser1);
            console.log(notifUser2);


            //pongo en oculta ambas publicaciones y se despausan
            const isBoat = await getBoatPostById(res.idPost1);
            if (isBoat !== null) {  //quiere decir que la publi 1 es un bote
                const res1 = await ocultarEmbarcacion({completePostId: res.idPost1});
                console.log(res1);

                const res2 = await ocultarVehiculo({completePostId: res.idPost2});
                console.log(res2);
            }
            
            if (isBoat === null) { //quiere decir que la publi 1 es un vehiculo
                const res1 = await ocultarVehiculo({completePostId: res.idPost1});
                console.log(res1);

                const res2 = await ocultarEmbarcacion({completePostId: res.idPost2});
                console.log(res2);            
            }


            return {success : "Se confirmó que no se realizó el trueque correctamente!"}
        }

        return null;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getAllCheckedTrades = async () => {

    try {
        const checkedTrades = await db.trade.findMany({
            where: {
                OR : [
                    { status: "TRUEQUE_REALIZADO"},
                    { status: "TRUEQUE_NO_REALIZADO"},
                ]
            }
        });
        console.log(checkedTrades)
        return checkedTrades;
    } catch (error) {
        console.log(error);
        return null;
    }

}

export const updateAllTradesByPostId = async ({postId}) => {
    try {
        console.log(postId)
        const updatedPostBoat = await getBoatPostById(postId);
        const updatedPostVehicle = await getVehiclePostById(postId);
        let updatedPost;
        if (updatedPostBoat !== null) {
            updatedPost = updatedPostBoat;
        } else {
            updatedPost = updatedPostVehicle;
        }
        console.log(updatedPost)
        

        const trades = await db.trade.findMany({
            where: {
                OR: [
                    { idPost1: postId },
                    { idPost2: postId },
                ]
            }
        });
        console.log(trades)
        for (let i = 0; i < trades.length; i++) {
            if (trades[i].idPost1 === postId) {
                const res = await db.trade.update({
                    where: {
                        id: trades[i].id,
                    },
                    data: {
                        tituloPublicacionOfrecida: updatedPost.title,
                        imgPublicacionOfrecida: updatedPost.img,
                    }
                });
                console.log(res);
            }
            else if (trades[i].idPost2 === postId) {
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


export const getConfirmedTradesById = async (id) => {
    try {
        const trades = await db.trade.findMany({
            where: {
                OR: [
                    { idUsuario1: id },
                    { idUsuario2: id },
                ],
                status: "TRUEQUE_REALIZADO"
            }
        });
        return trades;

    } catch {
        return null;
    }

}


export const getPendingDateTradesById = async (id) => {
    try {
        const trades = await db.trade.findMany({
            where: {
                OR: [
                    { idUsuario1: id },
                    { idUsuario2: id },
                ],
                status: "FECHA_PENDIENTE"
            }
        });
        return trades;

    } catch {
        return null;
    }

}


export const getConfirmedDateTradesById = async (id) => {
    try {
        const trades = await db.trade.findMany({
            where: {
                OR: [
                    { idUsuario1: id },
                    { idUsuario2: id },
                ],
                status: "FECHA_PACTADA"
            }
        });
        return trades;

    } catch {
        return null;
    }

}


export const getRejectedTradesById = async (id) => {
    try {
        const trades = await db.trade.findMany({
            where: {
                OR: [
                    { idUsuario1: id },
                    { idUsuario2: id },
                ],
                status: "TRUEQUE_NO_REALIZADO"
            }
        });
        return trades;

    } catch {
        return null;
    }

}

export const getTradesByDateAndId = async ({id,date}) => {
    try {
        console.log(id)
        console.log(date)
        const trades = await db.trade.findMany({
            where: {
                OR: [
                    { idUsuario1: id },
                    { idUsuario2: id },
                ],
                OR: [
                    { proposedDay1: date},
                    { proposedDay2: date},
                ]
            }
        });
        return trades;

    } catch {
        return null;
    }

}


export const getTradesByMotorbikeAndId = async (id) => {
    try {
        console.log(id)
        const trades = await db.trade.findMany({
            where: {
                OR: [
                    { idUsuario1: id },
                    { idUsuario2: id },
                ],
            }
        });

        console.log(trades)

        let data = [];
        for (let i = 0; i < trades.length; i++) {
            const post1 = await db.vehiclePost.findFirst({
                where: {
                    id: trades[i].idPost1,
                }
            })
            const post2 = await db.vehiclePost.findFirst({
                where: {
                    id: trades[i].idPost2,
                }
            })
            console.log(post1)
            console.log(post2)
            if (post1 !== null && post1.type === "Motocicleta"){
                console.log("entra")
                data.push(trades[i]);
            } else if (post2 !== null && post2.type === "Motocicleta"){
                console.log("entra")
                data.push(trades[i]);
            }

        }
        return data;

    } catch {
        return null;
    }

}


export const getTradesByVanAndId = async (id) => {
    try {
        console.log(id)
        const trades = await db.trade.findMany({
            where: {
                OR: [
                    { idUsuario1: id },
                    { idUsuario2: id },
                ],
            }
        });

        console.log(trades)

        let data = [];
        for (let i = 0; i < trades.length; i++) {
            const post1 = await db.vehiclePost.findFirst({
                where: {
                    id: trades[i].idPost1,
                }
            })
            const post2 = await db.vehiclePost.findFirst({
                where: {
                    id: trades[i].idPost2,
                }
            })
            console.log(post1)
            console.log(post2)
            if (post1 !== null && post1.type === "Camioneta"){
                console.log("entra")
                data.push(trades[i]);
            } else if (post2 !== null && post2.type === "Camioneta"){
                console.log("entra")
                data.push(trades[i]);
            }

        }
        return data;

    } catch {
        return null;
    }

}

export const getTradesByCarAndId = async (id) => {
    try {
        console.log(id)
        const trades = await db.trade.findMany({
            where: {
                OR: [
                    { idUsuario1: id },
                    { idUsuario2: id },
                ],
            }
        });

        console.log(trades)

        let data = [];
        for (let i = 0; i < trades.length; i++) {
            const post1 = await db.vehiclePost.findFirst({
                where: {
                    id: trades[i].idPost1,
                }
            })
            const post2 = await db.vehiclePost.findFirst({
                where: {
                    id: trades[i].idPost2,
                }
            })
            console.log(post1)
            console.log(post2)
            if (post1 !== null && post1.type === "Automóvil"){
                console.log("entra")
                data.push(trades[i]);
            } else if (post2 !== null && post2.type === "Automóvil"){
                console.log("entra")
                data.push(trades[i]);
            }

        }
        return data;

    } catch {
        return null;
    }

}

export const getTradesByCatamaranAndId = async (id) => {
    try {
        console.log(id)
        const trades = await db.trade.findMany({
            where: {
                OR: [
                    { idUsuario1: id },
                    { idUsuario2: id },
                ],
            }
        });

        console.log(trades)

        let data = [];
        for (let i = 0; i < trades.length; i++) {
            const post1 = await db.boatPost.findFirst({
                where: {
                    id: trades[i].idPost1,
                }
            })
            const post2 = await db.boatPost.findFirst({
                where: {
                    id: trades[i].idPost2,
                }
            })
            console.log(post1)
            console.log(post2)
            if (post1 !== null && post1.type === "Catamarán"){
                console.log("entra")
                data.push(trades[i]);
            } else if (post2 !== null && post2.type === "Catamarán"){
                console.log("entra")
                data.push(trades[i]);
            }

        }
        return data;

    } catch {
        return null;
    }

}


export const getTradesByCruiseAndId = async (id) => {
    try {
        console.log(id)
        const trades = await db.trade.findMany({
            where: {
                OR: [
                    { idUsuario1: id },
                    { idUsuario2: id },
                ],
            }
        });

        console.log(trades)

        let data = [];
        for (let i = 0; i < trades.length; i++) {
            const post1 = await db.boatPost.findFirst({
                where: {
                    id: trades[i].idPost1,
                }
            })
            const post2 = await db.boatPost.findFirst({
                where: {
                    id: trades[i].idPost2,
                }
            })
            console.log(post1)
            console.log(post2)
            if (post1 !== null && post1.type === "Crucero"){
                console.log("entra")
                data.push(trades[i]);
            } else if (post2 !== null && post2.type === "Crucero"){
                console.log("entra")
                data.push(trades[i]);
            }

        }
        return data;

    } catch {
        return null;
    }

}



export const getTradesBySailboatAndId = async (id) => {
    try {
        console.log(id)
        const trades = await db.trade.findMany({
            where: {
                OR: [
                    { idUsuario1: id },
                    { idUsuario2: id },
                ],
            }
        });

        console.log(trades)

        let data = [];
        for (let i = 0; i < trades.length; i++) {
            const post1 = await db.boatPost.findFirst({
                where: {
                    id: trades[i].idPost1,
                }
            })
            const post2 = await db.boatPost.findFirst({
                where: {
                    id: trades[i].idPost2,
                }
            })
            console.log(post1)
            console.log(post2)
            if (post1 !== null && post1.type === "Velero"){
                console.log("entra")
                data.push(trades[i]);
            } else if (post2 !== null && post2.type === "Velero"){
                console.log("entra")
                data.push(trades[i]);
            }

        }
        return data;

    } catch {
        return null;
    }

}



export const getTradesByLanchaAndId = async (id) => {
    try {
        console.log(id)
        const trades = await db.trade.findMany({
            where: {
                OR: [
                    { idUsuario1: id },
                    { idUsuario2: id },
                ],
            }
        });

        console.log(trades)

        let data = [];
        for (let i = 0; i < trades.length; i++) {
            const post1 = await db.boatPost.findFirst({
                where: {
                    id: trades[i].idPost1,
                }
            })
            const post2 = await db.boatPost.findFirst({
                where: {
                    id: trades[i].idPost2,
                }
            })
            console.log(post1)
            console.log(post2)
            if (post1 !== null && post1.type === "Lancha"){
                console.log("entra")
                data.push(trades[i]);
            } else if (post2 !== null && post2.type === "Lancha"){
                console.log("entra")
                data.push(trades[i]);
            }

        }
        return data;

    } catch {
        return null;
    }

}

export const getAllCheckedTradesByDate = async (date) => {

    try {
        console.log(date)
        const checkedTrades = await db.trade.findMany({
            where: {
                OR : [
                    { status: "TRUEQUE_REALIZADO"},
                    { status: "TRUEQUE_NO_REALIZADO"},
                ],
                proposedDay1: date,
            }
        });
        console.log(checkedTrades)
        return checkedTrades;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getAllPendingTradesByDate = async (date) => {

    try {
        console.log(date)
        const checkedTrades = await db.trade.findMany({
            where: {
                status: "FECHA_PACTADA",
                proposedDay1: date,
            }
        });
        console.log(checkedTrades)
        return checkedTrades;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getAllConfirmedTrades = async () => {
    try{
        const trades = await db.trade.findMany({
            where: {
                status: "TRUEQUE_REALIZADO",
            }
        })
        console.log(trades)
        return (trades.length)


    } catch(error){
        console.log(error)
        return null;
    }

}



export const getAllRejectedTrades = async () => {
    try{
        const trades = await db.trade.findMany({
            where: {
                status: "TRUEQUE_NO_REALIZADO",
            }
        })
        console.log(trades)
        return (trades.length)

    } catch(error){
        console.log(error)
        return null;
    }

}

