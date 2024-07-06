import { CreateComponent } from "@/components/WorkingComponent";
import { auth } from "../../../../../auth";
import { getAllCheckedTrades } from "../../../../../actions/tradeActions";
import { CheckedTradesTable } from "@/components/publicaciones/Trades/ViewCheckedTrades";
async function TruequesRevisadosPage() {
    const session = await auth();
    const userId = session.user?.id;
    const checkedTrades = await getAllCheckedTrades();
    console.log(checkedTrades.length);

    return (
        <div>
            <CheckedTradesTable data={checkedTrades} />
        </div>
    )
}

export default TruequesRevisadosPage;