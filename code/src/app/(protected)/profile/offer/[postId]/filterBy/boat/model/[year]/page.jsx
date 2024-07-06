import { OffersTable } from "@/components/publicaciones/Offers/OffersTable";
import { getBoatOffersByModelAndPostId } from "../../../../../../../../../../data/getOffers";

async function offersPage({params}) {
    const offers = await getBoatOffersByModelAndPostId({postId: params.postId,year: params.year})
    console.log(offers)
    
    return (
        <div>
            <OffersTable data={offers} isBoat={false} postId={params.postId} model={params.year}/>
        </div>
    )
}

export default offersPage;