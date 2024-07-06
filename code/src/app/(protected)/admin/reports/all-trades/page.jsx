import ViewAllTradesComponent from "@/components/admin-components/viewReports";
import { getTradesCatamaranAuto, getTradesCatamaranCamioneta, getTradesCatamaranMoto, getTradesCruceroAuto, getTradesCruceroCamioneta, getTradesCruceroMoto, getTradesLanchaAuto, getTradesVeleroAuto,getTradesVeleroCamioneta,getTradesVeleroMoto,getTradesLanchaCamioneta,getTradesLanchaMoto } from "../../../../../../actions/dashboardActions";

async function AllTradesPage() {

  
    const valueCatamaranAuto = await getTradesCatamaranAuto();
    const valueCatamaranCamioneta = await getTradesCatamaranCamioneta();
    const valueCatamaranMotocicleta = await getTradesCatamaranMoto();
  
    const valueCruceroAuto = await getTradesCruceroAuto();
    const valueCruceroCamioneta = await getTradesCruceroCamioneta();
    const valueCruceroMotocicleta = await getTradesCruceroMoto();
  
    const valueVeleroAuto = await getTradesVeleroAuto();
    const valueVeleroCamioneta = await getTradesVeleroCamioneta();
    const valueVeleroMotocicleta = await getTradesVeleroMoto();
  
    const valueLanchaAuto = await getTradesLanchaAuto();
    const valueLanchaCamioneta = await getTradesLanchaCamioneta();
    const valueLanchaMotocicleta = await getTradesLanchaMoto();

  const Data2 = [{
  name: "Catamarán - Automóvil",
  value: valueCatamaranAuto,
  fill: '#2C82FF',
  },
  {name : "Catamarán - Camioneta",
  value: valueCatamaranCamioneta,
  fill: '#337DE8',
  },
  {name :"Catamarán - Motocicleta",
  value: valueCatamaranMotocicleta,
  fill: '#2D6FCD',
  },
  {name :"Crucero - Automóvil",
  value: valueCruceroAuto,
  fill: '#36D4FA',
  },
  {name :"Crucero - Camioneta",
  value: valueCruceroCamioneta,
  fill: '#35C0E1',
  },
  {name :"Crucero - Motocicleta",
  value: valueCruceroMotocicleta,
  fill: '#2EA3BF',
  },
  {name :"Velero - Automóvil",
  value: valueVeleroAuto,
  fill: '#EE8639',
  },
  {name :"Velero - Camioneta",
  value: valueVeleroCamioneta,
  fill: '#DE7E37',
  },
  {name :"Velero - Motocicleta",
  value: valueVeleroMotocicleta,
  fill: '#B8682E',
  },
  {name : "Lancha - Automóvil",
  value: valueLanchaAuto,
  fill: '#B148FA',
  },
  {name : "Lancha - Camioneta",
  value: valueLanchaCamioneta,
  fill: '#903BCB',
  },
  {name : "Lancha - Motocicleta",
  value: valueLanchaMotocicleta,
  fill: '#712DA0',
  }]

    return (
        <ViewAllTradesComponent pieDataDos={Data2}/>
    );
  }
  
  export default AllTradesPage;
  