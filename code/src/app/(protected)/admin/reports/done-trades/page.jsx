import {ViewDoneTradesComponent } from "@/components/admin-components/viewDoneTrades";
import { getAllConfirmedTrades, getAllRejectedTrades } from "../../../../../../actions/tradeActions";

async function DoneTradesPage() {
  const truequesRealizados = await getAllConfirmedTrades();
  const truequesNoRealizados = await getAllRejectedTrades();
  console.log(truequesRealizados);
    console.log(truequesNoRealizados);
  const data = [{
    name: "Trueques realizados",
    value: truequesRealizados,
    fill: '#38C712',
  },
  {name : "Trueques no realizados",
  value: truequesNoRealizados,
  fill: '#DF190C',
  }]
  return (
    <div className="w-1/2">
        <ViewDoneTradesComponent pieDataUno={data}/>
    </div>

  );
}

export default DoneTradesPage;