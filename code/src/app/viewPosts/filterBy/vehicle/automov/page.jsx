import OrderBy from "@/components/publicaciones/PublicationsView/OrderBy";
import { obtenerAutomovilesCard } from "../../../../../../data/posts";
async function automovPage() {
    const publicaciones = await obtenerAutomovilesCard();
    console.log(publicaciones);
  return (
    <div>
        <OrderBy publicaciones={publicaciones}/>
    </div>
  );
}

export default automovPage;