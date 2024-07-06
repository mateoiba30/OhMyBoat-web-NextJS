import { CreateComponent } from "@/components/WorkingComponent";
import { auth } from "../../../../../auth";
import { getAllPendingTrades } from "../../../../../actions/tradeActions";
import { PendingTradesTable } from "@/components/publicaciones/Trades/ViewPendingTrades";



async function TruequesPendientesPage() {
    const session = await auth();
    const userId = session.user?.id;
    const pendingTrades = await getAllPendingTrades();
    console.log(pendingTrades);

    return (
        <div>
            <PendingTradesTable data={pendingTrades} />
        </div>
    )
}

export default TruequesPendientesPage;
