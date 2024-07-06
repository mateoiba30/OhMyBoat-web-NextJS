
import { getConfirmedDateTradesById } from "../../../../../../../actions/tradeActions";
import { auth } from "../../../../../../../auth";
import { MyTradesTable } from "@/components/publicaciones/Trades/ViewMyTrades";
async function MyTradesPage() {
    const session = await auth();
    const userId = session.user?.id;
    const trades = await getConfirmedDateTradesById(userId);
    console.log(trades);


    return (
        <div>
            <MyTradesTable data={trades} user={userId} />
        </div>
    )
}

export default MyTradesPage;