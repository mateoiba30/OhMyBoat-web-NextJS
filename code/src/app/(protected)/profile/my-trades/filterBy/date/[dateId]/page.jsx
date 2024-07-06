
import { getTradesByDateAndId } from "../../../../../../../../actions/tradeActions";
import { auth } from "../../../../../../../../auth";
import { MyTradesTable } from "@/components/publicaciones/Trades/ViewMyTrades";
async function MyTradesPage({params}) {
    const session = await auth();
    const userId = session.user?.id;
    console.log(params.dateId)
    const trades = await getTradesByDateAndId({id: userId, date: params.dateId});
    console.log(trades);


    return (
        <div>
            <MyTradesTable data={trades} user={userId} />
        </div>
    )
}

export default MyTradesPage;