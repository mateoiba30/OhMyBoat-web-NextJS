import OrderBy from "@/components/publicaciones/PublicationsView/OrderBy";
import { obtenerPublicaciones } from "../../../actions/publicacion";
import Sidebar from "@/components/Sidebar";
async function viewPostsPage() {
    const publicaciones = await obtenerPublicaciones()
    console.log(publicaciones);
    console.log(publicaciones.length)
  return (
    <>
        <OrderBy publicaciones={publicaciones}/>
    </>

  );
}

export default viewPostsPage;