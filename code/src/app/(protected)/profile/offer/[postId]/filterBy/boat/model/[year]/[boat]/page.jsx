import { OffersTable } from "@/components/publicaciones/Offers/OffersTable";
import { getBoatOffersByModelAndPostId } from "../../../../../../../../../../../data/getOffers";

async function offersPage({params}) {
    const offers = await getBoatOffersByModelAndPostId({postId: params.postId,year: params.year,boat :params.boat})
    console.log(offers)
    
    return (
        <div>
            <OffersTable data={offers} isBoat={false} postId={params.postId} filter={params.boat} model={params.year}/>
        </div>
    )
}

export default offersPage;