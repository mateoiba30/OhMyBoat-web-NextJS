import OrderBy from "@/components/publicaciones/PublicationsView/OrderBy";
import { obtenerCatamaranesCard } from "../../../../../../data/posts";
async function catamaranPage() {
    const publicaciones = await obtenerCatamaranesCard();
    console.log(publicaciones);
  return (
    <div>
        <OrderBy publicaciones={publicaciones}/>
    </div>
  );
}

export default catamaranPage;