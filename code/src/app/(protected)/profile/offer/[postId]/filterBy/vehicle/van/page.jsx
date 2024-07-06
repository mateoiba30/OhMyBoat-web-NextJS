import { OffersTable } from "@/components/publicaciones/Offers/OffersTable";
import { getVanOffersByPostId } from "../../../../../../../../../data/getOffers";
import { getBoatPostById } from "../../../../../../../../../data/posts";
async function offersPage({params}) {
    const offers = await getVanOffersByPostId({postId: params.postId});
    console.log(offers)
    const post = await getBoatPostById( params.postId);
    let isBoat;
    if (post === null){ //si el post es null, entonces no es un barco
        isBoat = false;
    } else {
        isBoat = true;
    }
    return (
        <div>
            <OffersTable data={offers} isBoat={isBoat} postId={params.postId} filter="van"/>
        </div>
    )
}

export default offersPage;