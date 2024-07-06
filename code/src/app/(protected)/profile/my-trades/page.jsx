import { CreateComponent } from "@/components/WorkingComponent";
import { auth } from "../../../../../auth";
import { getTradesById } from "../../../../../actions/tradeActions";
import { MyTradesTable } from "@/components/publicaciones/Trades/ViewMyTrades";
async function MyTradesPage() {
    const session = await auth();
    const userId = session.user?.id;
    const trades = await getTradesById(userId);
    console.log(trades);


    return (
        <div>
            <MyTradesTable data={trades} user={userId} />
        </div>
    )
}

export default MyTradesPage;