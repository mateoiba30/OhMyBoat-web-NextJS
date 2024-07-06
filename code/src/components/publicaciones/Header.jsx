import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "../../../auth";
import BasicMenuCallback from "./BasicMenuCall";
import HomeCallBack from "./HomeCall";
import { getAllNotis, getUnseenNotis } from "../../../actions/notifications";

//al ser algo que depende del valor de la session lo ponemos como function async
export async function HeaderTincho() {
  const session = await auth();
  let notis;
  let unseenNotisNumber;
  if (session?.user?.id){
    notis = (await getAllNotis(session.user.id));
    console.log(notis);
    unseenNotisNumber = await getUnseenNotis(session.user.id);
    console.log(unseenNotisNumber)
  }
  let rol = null;
  console.log(session);
  if (session) {
    if (session.user?.role === "ADMIN") {
      rol = "Dueño";
    }
    if (session.user?.role === "USER") {
      rol = "Usuario";
    }
    if (session.user?.role === "MANAGER") {
      rol = "Gerente";
    }
  }

  return (
    <header className="bg-gradient-to-r from-sky-600 to-sky-100 text-black w-full py-3 shadow-lg bg-cover bg-center">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/viewPosts">
          {session ? (
            <span className="text-slate-200 font-bold hover:text-white" style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
              <img src="/Oh_My_Boat_logo_4.jpg" alt="Logo de Oh My Boat" width={60} height={60} />
              <span className="text-sm">Hola {session.user.firstname}, ingresaste como: {rol} </span>
            </span>
          ) : ( 
            <img src="/Oh_My_Boat_logo_4.jpg" alt="Logo de Oh My Boat" width={60} height={60} />
          )}
        </Link>

        <div className="flex items-center space-x-4">
          <HomeCallBack />
          {!session ? (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" className='text-blue-900'>Iniciar sesión</Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="ghost" className='text-blue-900'>Registrarse</Button>
              </Link>
            </>
          ) : (
            <>
              <BasicMenuCallback role={session?.user?.role} notis={notis} userId={session?.user?.id} unseenNotisNumber={unseenNotisNumber.length}/>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
