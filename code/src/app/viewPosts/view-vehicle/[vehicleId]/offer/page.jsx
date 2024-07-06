import BoatOfferForm from "@/components/publicaciones/Offers/BoatOfferForm";
import { getAllBoatPostsByUser } from "../../../../../../data/posts";
import { auth } from "../../../../../../auth";
async function offerPage ({params}) {
    const session = await auth();
    console.log(params.vehicleId)
    const userId = session?.user.id;
    const boats = await getAllBoatPostsByUser({userId: userId});
    console.log(boats)
    return (
        <BoatOfferForm vehicleId={params.vehicleId} boatPosts={boats} idOfertante={userId}/>
    )
}

export default offerPage