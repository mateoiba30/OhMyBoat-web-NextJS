import { CerrarSesion } from "@/components/CerrarSesion";
import { auth, signOut } from "../../../../auth"
import Link from "next/link";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

const SettingsPage = async () => {

    const session = await auth();
    const {email,role,id} = session.user;
    return (
    <div className="flex justify-center items-center h-screen">
        <div>
        <h1 className="font-bold text-center">
            Configuracion de usuario
        </h1>
        <ul>
            <li>Su Email es: {email}</li>
            <li>Su ID es: {id}</li>
            <li>Su Rol es: {role}</li>
          <li>
                <Link href="/auth/new-password-logged">
                <button>
                    Restablecer contraseña
                </button>
                </Link>
            </li> 
        </ul>
     {/* <CerrarSesion triggerLabel="Cerrar Sesion"/> */}  
        </div>
  
    </div>
    )
}

export default SettingsPage
