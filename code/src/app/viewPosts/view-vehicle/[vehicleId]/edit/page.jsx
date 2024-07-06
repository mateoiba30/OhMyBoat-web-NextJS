import { auth } from "../../../../../../auth";
import { getVehiclePostById } from "../../../../../../data/posts";
import { VehicleEditForm } from "@/components/publicaciones/Vehicles/VehicleEditForm";
async function EditVehiclePage ({params}) {
    const session = await auth();
    const vehiculo = await getVehiclePostById(params.vehicleId);

    return (
        <>        

        {vehiculo.idPublisher === session?.user?.id ? (
            <div className="flex justify-center items-center h-screen space-x-10">
            <VehicleEditForm VehiclePost={vehiculo}/>
            </div>
        ) : (
            <div>Este vehiculo no es tuyo</div>
        
        )}
        </>

    )
}

export default EditVehiclePage;