import { OffersTable } from "@/components/publicaciones/Offers/OffersTable";
import { getBoatOffersByModelAndPostId } from "../../../../../../../../../../data/getOffers";

async function offersPage({params}) {
    const offers = await getBoatOffersByModelAndPostId({postId: params.postId,year: params.year})
    console.log(offers)
    return (
        <div>
            <OffersTable data={offers}/>
        </div>
    )
}

export default offersPage;