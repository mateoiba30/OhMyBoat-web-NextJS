import OrderBy from "@/components/publicaciones/PublicationsView/OrderBy";
import { obtenerAutomovilesCard, obtenerCamionetasCard, obtenerCatamaranesCard, obtenerCrucerosCard, obtenerLanchasCard, obtenerMotocicletasCard, obtenerVelerosCard } from "../../../../../../../data/posts";
async function modelBoatPage({params}) {
  console.log(params.model)
  console.log(params.type)
    let publicaciones;
    if (params.type === "sailboat") {
        publicaciones = (await obtenerVelerosCard()).filter(publicacion => publicacion.modelo === params.model);
    }
    if (params.type === "catamaran") {
        console.log("entro")
        publicaciones = (await obtenerCatamaranesCard()).filter(publicacion => publicacion.modelo === params.model)
        console.log(publicaciones)
    }
    if (params.type === "lancha"){
        publicaciones = (await obtenerLanchasCard()).filter(publicacion => publicacion.modelo === params.model);
    }
    if (params.type === "cruise"){
      publicaciones = (await obtenerCrucerosCard()).filter(publicacion => publicacion.modelo === params.model);
    }
    if(params.type === "automov"){
      publicaciones = (await obtenerAutomovilesCard()).filter(publicacion => publicacion.modelo === params.model);
    }
    if(params.type === "motorbike"){
      publicaciones = (await obtenerMotocicletasCard()).filter(publicacion => publicacion.modelo === params.model);
    }
    if(params.type === "van"){
      publicaciones = (await obtenerCamionetasCard()).filter(publicacion => publicacion.modelo === params.model);
    }
    console.log(publicaciones);
  return (
    <div>
        <OrderBy publicaciones={publicaciones}/>
    </div>
  );
}

export default modelBoatPage;