
import { db } from "@/lib/db"
export const getCardPostByCompletePostId = async ({completePostId}) => {
    try {
        console.log(completePostId)
        const cardPost = await db.cardPost.findFirst({
            where: {
                idCompletePost: completePostId,
            }
        })
        console.log(cardPost)
        return cardPost
    } catch(error)
    {
        console.log(error)
        return null;
    }
}