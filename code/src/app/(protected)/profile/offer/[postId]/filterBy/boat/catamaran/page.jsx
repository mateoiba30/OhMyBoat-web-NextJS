import { OffersTable } from "@/components/publicaciones/Offers/OffersTable";
import { getCatamaranOffersByPostId } from "../../../../../../../../../data/getOffers";
import { getBoatPostById } from "../../../../../../../../../data/posts";

async function offersPage({params}) {
    const offers = await getCatamaranOffersByPostId({postId: params.postId});
    console.log(offers)
    const post = await getBoatPostById({postId: params.postId});
    let isBoat;
    if (post === null){ //si el post es null, entonces no es un barco
        isBoat = false;
    } else {
        isBoat = true;
    }
    return (
        <div>
            <OffersTable data={offers} isBoat={isBoat} filter="catamaran" postId={params.postId}/>
        </div>
    )
}

export default offersPage;