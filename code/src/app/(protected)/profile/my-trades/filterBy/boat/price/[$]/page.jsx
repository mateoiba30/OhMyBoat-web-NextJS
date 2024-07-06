import { OffersTable } from "@/components/publicaciones/Offers/OffersTable";

import { getBoatOffersByPriceAndPostId } from "../../../../../../../../../../data/getOffers";

async function offersPage({params}) {
    const offers = await getBoatOffersByPriceAndPostId({postId: params.postId, price: params.$})
    console.log(offers)
    return (
        <div>
            <OffersTable data={offers}/>
        </div>
    )
}

export default offersPage;