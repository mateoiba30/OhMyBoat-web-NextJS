import { CreateComponent } from "@/components/WorkingComponent";
import { OffersTable } from "@/components/publicaciones/Offers/OffersTable";
import { getOffersByPostId } from "../../../../../../data/getOffers";
import { getBoatPostById } from "../../../../../../data/posts";
async function offersPage({params}) {
    const offers = await getOffersByPostId({postId: params.postId});
    console.log(params.postId)
    const post = await getBoatPostById(params.postId);
    console.log(post)
    let isBoat;
    if (post === null){ //si el post es null, entonces no es un barco
        isBoat = false;
    } else {
        isBoat = true;
    }
    console.log(isBoat)
    return (
        <div>
            <OffersTable data={offers} isBoat={isBoat} postId={params.postId} />
        </div>
    )
}

export default offersPage;