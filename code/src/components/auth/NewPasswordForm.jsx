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
import { NewPasswordSchema } from "@/schemas";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import { newPassword } from "../../../actions/new-password";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");
    console.log(token)
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending, startTransition] = useTransition(); //usamos esto para la login transition

    const form = useForm({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        }
    });

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");
    startTransition(() => {newPassword(data,token)
        .then((response) => {
            setError(response?.error) //con el ? no le asigna indefinido si no le llega nada
            if(response?.success){
                toast.success(response.success)
                router.push("/auth/login")
            }
        })
    })
  
    console.log(success)
    console.log(error)
    }

    return (
        <>
        
             <CardWrapper 
             headerLabel="Ingrese los nuevos datos" 
             backButtonLabel="Iniciar sesión" 
             backButtonHref="/auth/login"
             headerTitle="Nueva contraseña"
         >
             <Form {... form}>
                 <form onSubmit={form.handleSubmit(onSubmit)}
                 className="space-y-6"
                 >
                 
                 <div className="space-y-4">
                     <FormField
                         control={form.control}
                         name="password"
                         render={({field}) => (
                             <FormItem>
                                 <FormLabel> Nueva contraseña:</FormLabel>
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
                 <Button disabled={isPending}
                 type="submit" 
                 className="w-full bg-sky-500">
                     Confirmar datos
                 </Button>
                 </form>
             </Form>
         </CardWrapper> 
        </>   
    );

}

