import OrderBy from "@/components/publicaciones/PublicationsView/OrderBy";
import { obtenerVelerosCard } from "../../../../../../data/posts";
async function sailboatPage() {
    const publicaciones = await obtenerVelerosCard();
    console.log(publicaciones);
  return (
    <div>
        <OrderBy publicaciones={publicaciones}/>
    </div>
  );
}

export default sailboatPage;