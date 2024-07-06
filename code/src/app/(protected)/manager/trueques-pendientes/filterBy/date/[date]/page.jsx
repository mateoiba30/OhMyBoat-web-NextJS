import { getAllPendingTradesByDate } from "../../../../../../../../actions/tradeActions";
import { auth } from "../../../../../../../../auth";
import { PendingTradesTable } from "@/components/publicaciones/Trades/ViewPendingTrades";
async function TruequesRevisadosPage({params}) {
    const session = await auth();
    const userId = session.user?.id;
    const pendingTrades = await getAllPendingTradesByDate(params.date);
    console.log(pendingTrades.length);

    return (
        <div>
            <PendingTradesTable data={pendingTrades} paramDate={params.date} />
        </div>
    )
}

export default TruequesRevisadosPage;