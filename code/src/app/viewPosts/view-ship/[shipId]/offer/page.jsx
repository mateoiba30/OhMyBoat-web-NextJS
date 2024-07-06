import VehicleOfferForm from "@/components/publicaciones/Offers/VehicleOfferForm";
import { getAllVehiclePostsByUser } from "../../../../../../data/posts";
import { auth } from "../../../../../../auth";
async function offerPage ({params}) {
    const session = await auth();
    const userId = session?.user.id;
    const vehicles = await getAllVehiclePostsByUser({userId: userId});
    console.log(vehicles)
    return (
        <VehicleOfferForm shipId={params.shipId} vehiclePosts={vehicles} idOfertante={userId}/>
    )
}

export default offerPage