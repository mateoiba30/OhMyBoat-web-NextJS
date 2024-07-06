import { getBoatPostById } from "../../../../../data/posts"
import { BoatView } from "@/components/publicaciones/Boats/BoatView";
import { auth } from "../../../../../auth";
async function ViewShip({ params }) {
  const boatPost = await getBoatPostById(params.shipId);
  const session = await auth();
  console.log(boatPost);

  return (
    <div className="flex items-center justify-center h-screen">
      <BoatView boatPost={boatPost} userSessionId={session?.user.id} role={session?.user?.role}/>
    </div>
  );
}

export default ViewShip;
