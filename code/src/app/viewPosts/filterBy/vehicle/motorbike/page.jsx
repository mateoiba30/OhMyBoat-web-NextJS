import OrderBy from "@/components/publicaciones/PublicationsView/OrderBy";
import { obtenerMotocicletasCard } from "../../../../../../data/posts";
async function motorbikePage() {
    const publicaciones = await obtenerMotocicletasCard();
    console.log(publicaciones);
  return (
    <div>
        <OrderBy publicaciones={publicaciones}/>
    </div>
  );
}

export default motorbikePage;