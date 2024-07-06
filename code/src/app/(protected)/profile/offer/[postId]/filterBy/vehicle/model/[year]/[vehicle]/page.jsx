import { OffersTable } from "@/components/publicaciones/Offers/OffersTable";
import { getVehicleOffersByModelAndPostId } from "../../../../../../../../../../../data/getOffers";

async function offersPage({params}) {
    
    const offers = await getVehicleOffersByModelAndPostId({postId: params.postId,year: params.year,vehicle: params.vehicle})
    console.log(offers)
    return (
        <div>
            <OffersTable data={offers} isBoat={true} postId={params.postId} filter={params.vehicle} model={params.years}/>
        </div>
    )
}

export default offersPage;