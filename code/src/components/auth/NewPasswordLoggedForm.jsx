"use client"
//VER COMO RECIBIR LOS ERRORES DEL ROUTE.JS
//exportar desde ahi sino no funciona
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form"
import { useTransition } from "react";
import { NewPasswordLoggedSchema} from "@/schemas";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import { newPasswordLogged } from "../../../actions/new-password-logged";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export const NewPasswordLoggedForm = ({email}) => {
    console.log(email)
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();
    const [isPending, startTransition] = useTransition(); //usamos esto para la login transition
    const form = useForm({
        resolver: zodResolver(NewPasswordLoggedSchema),
        defaultValues: {
            previousPassword: "",
            newPassword: "",
            confirmPassword: "",
        }
    });

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");
    console.log(data)
    startTransition(() => {newPasswordLogged({data,email})
        .then((response) => {
            if(response?.success){
                toast.success(response.success)
                router.push("/profile") //o /?
                router.refresh()
                
            }
            setError(response?.error) //con el ? no le asigna indefinido si no le llega nada
            setSuccess(response?.success)
        })
    })
  
    console.log(success)
    console.log(error)
    }

    return (
        <>
        
             <CardWrapper 
             headerLabel="Ingrese los nuevos datos" 
             backButtonLabel="Volver al perfil" 
             backButtonHref="/profile"
             headerTitle="Nueva contraseña"
         >
             <Form {... form}>
                 <form onSubmit={form.handleSubmit(onSubmit)}
                 className="space-y-6"
                 >
                 
                 <div className="space-y-4">
                     <FormField
                         control={form.control}
                         name="previousPassword"
                         render={({field}) => (
                             <FormItem>
                                 <FormLabel>Contraseña:</FormLabel>
                                 <FormControl>
                                     <Input
                                         {...field}
                                         disabled={isPending}
                                         placeholder="******"
                                         type="password"
                                         />
                                 </FormControl>
                                 <FormMessage/>
                             </FormItem>
                         )}
                     />
                     
                     <FormField
                         control={form.control}
                         name="newPassword"
                         render={({field}) => (
                             <FormItem>
                                 <FormLabel>Nueva contraseña:</FormLabel>
                                 <FormControl>
                                     <Input
                                         {...field}
                                         disabled={isPending}
                                         placeholder="******"
                                         type="password"
                                         />
                                 </FormControl>
                                 <FormMessage/>
                             </FormItem>
                         )}
                     />

                    <FormField
                         control={form.control}
                         name="confirmPassword"
                         render={({field}) => (
                             <FormItem>
                                 <FormLabel>Confirma la contraseña:</FormLabel>
                                 <FormControl>
                                     <Input
                                         {...field}
                                         disabled={isPending}
                                         placeholder="******"
                                         type="password"
                                         />
                                 </FormControl>
                                 <FormMessage/>
                             </FormItem>
                         )}
                     />
     
                 </div>
                 {/* luego el error los mostrar */}
                 <FormError message={error}/>
                 <FormSuccess message={success}/>
 
                 <Button disabled={isPending}
                 type="submit" 
                 className="w-full bg-sky-500">
                     Confirmar
                 </Button>
                 </form>
             </Form>
         </CardWrapper> 
        {/*{ success && (
        <CardWrapper  
        backButtonHref="/auth/login"
        backButtonLabel="Volver al inicio de sesion"
        headerTitle="Nueva contraseña">
        <FormSuccess message={success}/>
       </CardWrapper>
        )} */}

        </>   
    );

}

