import { getAllCheckedTradesByDate } from "../../../../../../../../actions/tradeActions";
import { auth } from "../../../../../../../../auth";
import { CheckedTradesTable } from "@/components/publicaciones/Trades/ViewCheckedTrades";
async function TruequesRevisadosPage({params}) {
    const session = await auth();
    const userId = session.user?.id;
    const checkedTrades = await getAllCheckedTradesByDate(params.date);
    console.log(checkedTrades.length);

    return (
        <div>
            <CheckedTradesTable data={checkedTrades} paramDate={params.date} />
        </div>
    )
}

export default TruequesRevisadosPage;