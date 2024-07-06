import OrderBy from "@/components/publicaciones/PublicationsView/OrderBy";
import { obtenerCardsPorModelo } from "../../../../../../data/posts";
async function modelBoatPage({params}) {
    const year = params.year;
    console.log(year)
    const publicaciones = await obtenerCardsPorModelo({modelo: year})
    console.log(publicaciones);
  return (
    <div>
        <OrderBy publicaciones={publicaciones}/>
    </div>
  );
}

export default modelBoatPage;