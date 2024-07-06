"use server"
import { db } from "@/lib/db";
import { auth } from "../auth";
import { getUserById } from "../data/user";
export const createReview = async ({tradeId,stars,description,title}) => {
    try {
        console.log(tradeId,stars,description);
        const session = await auth();
        const user = session?.user //obtenemos el usuario
        const userFound = await getUserById(user.id);
        //obtenemos la sesion del usuario
        console.log(userFound);
        const trade = await db.trade.findFirst({
            where: {
                id: tradeId,
            },
        });
        console.log(trade.idUsuario1);
        if (userFound.id === trade.idUsuario1) { //si es el user uno entonces marco como reseñado y creo la review
            const updatedTrade = await db.trade.update({
                where: {
                    id: tradeId,
                },
                data: {
                    ReviewedByUser1: true,
                },
            })

            console.log(updatedTrade);
            const review = await db.review.create({
                data: {
                    idReviewer: userFound.id,
                    idReviewed: trade.idUsuario2,
                    stars: stars,
                    description: description,
                    title: title,
                    ReviewerFirstName: userFound.firstname,
                    ReviewerLastName: userFound.lastname,
                    tradeId: tradeId,
                },
            });

            const notif = await db.notification.create({
                data: {
                    idEmisor: '???',
                    idReceptor: trade.idUsuario2,
                    title: 'Nueva reseña',
                    description: `El usuario ${userFound.firstname} ${userFound.lastname} ha realizado una reseña sobre ti`,
                    seen: false,
                    type: 'REVIEW',
                }
            })
            console.log(notif);
            console.log(review);


        } else if (userFound.id === trade.idUsuario2) {

            const updatedTrade = await db.trade.update({
                where: {
                    id: tradeId,
                },
                data: {
                    ReviewedByUser2: true,
                },
            })

            console.log(updatedTrade);
            const review = await db.review.create({
                data: {
                    idReviewer: userFound.id,
                    idReviewed: trade.idUsuario1,
                    stars: stars,
                    description: description,
                    title : title,
                    ReviewerFirstName: userFound.firstname,
                    ReviewerLastName: userFound.lastname,
                    tradeId: tradeId,
                },
            });

            const notif = await db.notification.create({
                data: {
                    idEmisor: '???',
                    idReceptor: trade.idUsuario1,
                    title: 'Nueva reseña',
                    description: `El usuario ${userFound.firstname} ${userFound.lastname} ha realizado una reseña sobre ti`,
                    seen: false,
                    type: 'REVIEW', 
                }
            })
            console.log(notif)
            console.log(review);
        }

        return {success: "Reseña hecha con éxito!"}

    } catch(error){
        console.log(error);
        return null;
    }



}

export const UserRatingProm = async (id) => {
    const reviews = await db.review.findMany({
        where: {
            idReviewed: id,
        },
    });
    console.log(reviews);
    let total = 0;
    reviews.map((review) => {
        total += review.stars;
    });
    console.log(total);
    const promedio = (total / reviews.length) ;
    const promedioRedondeado = Math.round(promedio);
    console.log(promedioRedondeado)
    return promedioRedondeado;

}

export const getUserReviewsByUserId = async (id) => {  
    try{
        const reviews = await db.review.findMany({
            where: {
                idReviewed: id,
            },
        });
        console.log(reviews);
        return reviews;

    } catch(error){
        console.log(error);
        return null;
    }

}

export const deleteReview = async ({reviewId}) => {
    try {
        console.log(reviewId)
        const review = await db.review.delete({
            where: {
                id: reviewId,
            },
        });
        console.log(review.idReviewed);
        const usuarioPerjudicado = await getUserById(review.idReviewer);
        console.log(usuarioPerjudicado);
        const notifReseniado = await db.notification.create({
            data: {
                idEmisor: '???',
                idReceptor: review.idReviewed,
                title: 'Reseña eliminada',
                description: `Una reseña realizada por el usuario ${usuarioPerjudicado.firstname} ${usuarioPerjudicado.lastname} ha sido eliminada debido a que no cumplia con los terminos y condiciones`,
                seen: false,
                type: 'REVIEW',
            }
        })
        console.log(notifReseniado);
        const usuarioReseniado = await getUserById(review.idReviewed);
        console.log(usuarioReseniado);
        const notifReseniador = await db.notification.create({
            data: {
                idEmisor: '???',
                idReceptor: review.idReviewer,
                title: 'Reseña eliminada',
                description: `Una reseña que realizaste al usuario ${usuarioReseniado.firstname} ${usuarioReseniado.lastname} ha sido eliminada debido a que no cumplia con los terminos y condiciones`,
                seen: false,
                type: 'REVIEW',
            }
        })
        console.log(notifReseniador);

        return {success: "Reseña eliminada con éxito!"}
    } catch(error){
        console.log(error);
        return null;
    }


}

export const getAllReviews = async () => {
    try {
        const reviews = await db.review.findMany()
        console.log(reviews);
        return reviews;

    } catch(error){
        console.log(error)
        return null;
    }


}


export const getUserReviewsByUserIdAndStars = async ({id,stars}) => {  
    try{
        console.log(id)
        console.log(stars)
        const reviews = await db.review.findMany({
            where: {
                idReviewed: id,
                stars: stars,
            },
        });
        console.log(reviews);
        return reviews;

    } catch(error){
        console.log(error);
        return null;
    }

}


export const getUserReviewsByStars = async ({stars}) => {  
    try{

        console.log(stars)
        const reviews = await db.review.findMany({
            where: {
                stars: stars,
            },
        });
        console.log(reviews);
        return reviews;

    } catch(error){
        console.log(error);
        return null;
    }

}
