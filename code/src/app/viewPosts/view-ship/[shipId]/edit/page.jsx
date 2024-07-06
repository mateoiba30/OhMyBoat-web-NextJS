import { BoatEditForm } from "@/components/publicaciones/Boats/BoatEditForm";
import { getBoatPostById } from "../../../../../../data/posts";
import { auth } from "../../../../../../auth";
async function EditShipPage ({params}) {
    const session = await auth();
    const BoatPost = await getBoatPostById(params.shipId);
    return (
        <>
        {BoatPost.idPublisher === session?.user?.id ? (
            <div className="flex justify-center items-center h-screen space-x-10">
            <BoatEditForm BoatPost={BoatPost}/>
            </div>
        ) : (
            <div className="flex justify-center items-center h-screen space-x-10">
            <div>Este barco no es tuyo</div>
            </div>
        
        )}

        </>
        
    )
}

export default EditShipPage;