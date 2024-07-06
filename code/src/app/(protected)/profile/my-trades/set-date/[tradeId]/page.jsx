import { auth } from "../../../../../../../auth";
import { SetDateComponent } from "@/components/publicaciones/Trades/SetDate/SetDateComponent";
import { DateAlreadySetted } from "../../../../../../../actions/tradeActions";
import { getTradeById } from "../../../../../../../actions/tradeActions";
async function SetDatePage({params}) {
    const session = await auth();
    const userId = session.user?.id;
    const alreadySetted = await DateAlreadySetted({idTrade:params.tradeId,idUser:userId});
    const trade = await getTradeById(params.tradeId);
    console.log(trade);
    console.log(alreadySetted);
    return (
        <div>
            <SetDateComponent alreadySetted={alreadySetted} userId={userId} tradeId={params.tradeId} trade={trade}/>
        </div>
    )
}

export default SetDatePage