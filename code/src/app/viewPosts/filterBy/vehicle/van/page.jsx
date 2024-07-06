import OrderBy from "@/components/publicaciones/PublicationsView/OrderBy";
import { obtenerCamionetasCard } from "../../../../../../data/posts";
async function vanPage() {
    const publicaciones = await obtenerCamionetasCard();
    console.log(publicaciones);
  return (
    <div>
        <OrderBy publicaciones={publicaciones}/>
    </div>
  );
}

export default vanPage;