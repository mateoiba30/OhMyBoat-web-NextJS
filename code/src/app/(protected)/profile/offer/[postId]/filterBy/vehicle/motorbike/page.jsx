import { OffersTable } from "@/components/publicaciones/Offers/OffersTable";
import { getMotorbikeOffersByPostId } from "../../../../../../../../../data/getOffers";
import { getBoatPostById } from "../../../../../../../../../data/posts";
async function offersPage({params}) {
    const offers = await getMotorbikeOffersByPostId({postId: params.postId});
    console.log(offers)
    const post = await getBoatPostById(params.postId);
    let isBoat;
    if (post === null){ //si el post es null, entonces no es un barco
        isBoat = false;
    } else {
        isBoat = true;
    }
    return (
        <div>
            <OffersTable data={offers} isBoat={isBoat} postId={params.postId} filter="motorbike"/>
        </div>
    )
}

export default offersPage;