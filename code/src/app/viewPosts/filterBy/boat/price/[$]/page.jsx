import OrderBy from "@/components/publicaciones/PublicationsView/OrderBy";
import { obtenerBoatsPorPrecio } from "../../../../../../../data/posts";
async function PriceBoatPage({params}) {
    const price = params.$;
    console.log(price)
    const publicaciones = await obtenerBoatsPorPrecio({precio: price});
    console.log(publicaciones);
  return (
    <div>
        <OrderBy publicaciones={publicaciones}/>
    </div>
  );
}

export default PriceBoatPage;