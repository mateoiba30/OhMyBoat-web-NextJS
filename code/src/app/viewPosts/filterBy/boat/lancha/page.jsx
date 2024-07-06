import OrderBy from "@/components/publicaciones/PublicationsView/OrderBy";
import { obtenerLanchasCard } from "../../../../../../data/posts";
async function lanchaPage() {
    const publicaciones = await obtenerLanchasCard();
    console.log(publicaciones);
  return (
    <div>
        <OrderBy publicaciones={publicaciones}/>
    </div>
  );
}

export default lanchaPage;