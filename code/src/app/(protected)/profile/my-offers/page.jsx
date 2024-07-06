import { CreateComponent } from "@/components/WorkingComponent";
import { auth } from "../../../../../auth";
import { MyOffersTable } from "@/components/publicaciones/Offers/MyOffersTable";
import { getOffersByOfferentId } from "../../../../../data/getOffers";
async function MyoffersPage() {
    const session = await auth();
    const offers = await getOffersByOfferentId({offerentId: session?.user.id});
    console.log(offers.length)
    return (
        <div>
            <MyOffersTable data={offers}/>
        </div>
    )
}

export default MyoffersPage;