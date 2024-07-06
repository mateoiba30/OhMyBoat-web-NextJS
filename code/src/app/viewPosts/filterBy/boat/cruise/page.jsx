import OrderBy from "@/components/publicaciones/PublicationsView/OrderBy";
import { obtenerCrucerosCard } from "../../../../../../data/posts";
async function cruisePage() {
    const publicaciones = await obtenerCrucerosCard();
    console.log(publicaciones);
  return (
    <div>
        <OrderBy publicaciones={publicaciones}/>
    </div>
  );
}

export default cruisePage;