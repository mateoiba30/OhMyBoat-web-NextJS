"use client"
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter} from "next/navigation"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
  import Link from "next/link";
  import { Button } from "@/components/ui/button";
  import { Separator } from "@/components/ui/separator";

  import { updateProfileData } from "../../../../actions/actualizarDatosPerfil";
  export default function UpdateProfileForm({ firstname, lastname, cellphone, birthday, email, password, role }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const showedPassword = password.replace(/./g, "*");
    const router = useRouter();
    if (role === "ADMIN") {
      role = "Dueño";
    }
    if (role === "USER") {
      role = "Usuario"
    }
    if (role === "MANAGER") {
      role = "Gerente"
    }
    const onSumbit = async (data) => {
      console.log(email)
      const res = await updateProfileData({data,email})
      console.log(data)
      if (res.success) {
        toast.success(res.success);
        router.push("/profile");
        router.refresh();
      }
    }

    const handleConfirmation = (data) => {
      console.log(data)
      toast.info("Estás seguro que quieres aplicar los cambios?", {
        action: <>
        <div>
          <button onClick={() => {onSumbit(data);toast.dismiss()}} className='hover:text-emerald-500 text-blue-600'>Confirmar</button>
          <button onClick={() => {toast.dismiss()}} className='hover:text-rose-600 text-blue-600 '>Cancelar</button>
          </div>
        </> ,
    })
    }

    const handleExit = (event) => {
      event.preventDefault();
      toast.info("Estás seguro que no quieres aplicar los cambios?", {
        action: <>
        <div>
          <button onClick={() => {router.push("/profile");toast.dismiss()}} className='hover:text-emerald-500 text-blue-600'>Confirmar</button>
          <button onClick={() => {toast.dismiss()}} className='hover:text-rose-600 text-blue-600 '>Cancelar</button>
          </div>
        </> ,
    })
    }

    return (
      <div className="flex items-center justify-center h-screen">
        <div style={{ width: "50%", height: "85%" }}>
          <div className="bg-sky-600 rounded-lg shadow-md p-4">
            <Card>
            <form onSubmit={handleSubmit(handleConfirmation)}>
              <CardHeader>
                <CardTitle className="hover:text-blue-500">
                    Actualiza tu perfil
                    </CardTitle>
                <CardDescription>Ingresa datos en los campos que quieras actualizar:</CardDescription>
                {(errors.firstname || errors.lastname || errors.cellphone )&& ( <span className="text-red-500 text-xs mt-2">¡Faltan datos por ingresar!</span>)}
              </CardHeader>
              <CardContent>
                <div>
                
                <p className="mb-2 flex items-center space-x-2">
                  <span className="font-semibold hover:text-sky-500">Nombre:</span> 
                  <Input type="text" {...register("firstname", { required: true })} defaultValue={firstname} className="block w-1/3" />
                </p>

                <p className="mb-2 flex items-center space-x-2 mt-3">
                  <span className="font-semibold hover:text-sky-500">Apellido:</span> 
                  <Input type="text" {...register("lastname", { required: true })} defaultValue={lastname}  className="block w-1/3" />
                </p>

                <p className="mb-2 flex items-center space-x-2 mt-3">
                  <span className="font-semibold hover:text-sky-500">Teléfono:</span>
                  <Input type="text" {...register("cellphone", { required: true })} defaultValue={cellphone} className="block w-1/3" />
                </p>
                <p className="mb-2">
                  <span className="font-semibold hover:text-sky-500">Fecha de Nacimiento:</span> {birthday}
                </p>
                <p className="mb-2">
                  <span className="font-semibold hover:text-sky-500">Email:</span> {email}
                </p>
                <p className="mb-2">
                  <span className="font-semibold hover:text-sky-500">Contraseña:</span> {showedPassword}
                  <Link href="/auth/new-password-logged">
                  <button className="ml-2 text-sm font-semibold opacity-30 " disabled >Cambiar contraseña</button>
                  </Link>
                </p>
                <p className="mb-2">
                  <span className="font-semibold hover:text-sky-500">Rol:</span> {role}
                </p>
                </div>
                <Separator />
              </CardContent>
              <CardFooter>
                <div>
                <Button className="mr-2 hover:text-blue-700" variant="ghost" type="submit">Aplicar cambios</Button>
                <Button className="hover:text-blue-700" variant="ghost" onClick={handleExit}>Volver</Button>
                </div>
              </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  