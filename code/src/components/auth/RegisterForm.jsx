"use client"
//exportar desde ahi sino no funciona
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form"
import * as z from "zod"
import { useTransition } from "react";
import { RegisterSchema } from "@/schemas";
import { FormError } from "../FormError";
import { register } from "../../../actions/register";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
//<FormMessage/> para mostrarl os mensajes abajo de <Formcontrol/>
export const RegisterForm = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending, startTransition] = useTransition(); //usamos esto para la login transition
    const currentDate = new Date();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            cellphone: "",
            birthday: "00/00/0000", //no se si esta bien "00/00/0000
            email: "",
            password: "",
            confirmPassword: "",
        }
    });

  const onSubmit = async (data) => { //async poner
   setError("");
   setSuccess("");
   console.log(data.password)
    startTransition(() => {register(data)
        .then((response) => {
            setError(response.error)
            setSuccess(response.success)
            if (response.success) {
                toast.success(response.success)
                router.push("/auth/login")
            }
        })
    console.log(error)
    })
    console.log(data)
   }

    return (
        <div>
        <CardWrapper 
            headerLabel="Crea una cuenta rellenando los campos" 
            backButtonLabel="Ya tienes una cuenta?" 
            backButtonHref="/auth/login"
            headerTitle="Registro"
        >
            <Form {... form} >
                <form onSubmit={form.handleSubmit(onSubmit)} //form onSubmit={onSubmit}
                className="space-y-6"
                >
                
                <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4"> 
                {/* NOMBRE */}   
                <FormField
                        control={form.control}
                        name="firstname"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Nombre:</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="tincho"
                                        />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* APELLIDO */}   
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Apellido:</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="tech"
                                        />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    
                    </div> 

                    <div className="grid grid-cols-2 gap-4"> 
                    {/* TELEFONO */}   
                    <FormField
                        control={form.control}
                        name="cellphone"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Teléfono:</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="+54 9 221 --- ----"
                                        />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    
                    {/* BIRTHDAY */}   
                    <FormField
                        control={form.control}
                        name="birthday"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Fecha de Nacimiento:</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        //placeholder="+54 9 221 --- ----"
                                        type="date"
                                        />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    </div>
                    
                    {/* MAIL */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email:</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="tinchotech@gmail.com"
                                        type="email"
                                        />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
            
                    {/* PASSWORD */}
                    <FormField
                        control={form.control}
                        name="password"
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

                    {/* CONFIRM PASSWORD */}
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
                            </FormItem>
                        )}
                    />


    
                </div>
                {/* luego el error los mostrar */}
                <FormError message={error}/>

                <Button disabled={isPending}
                type="submit" 
                className="w-full bg-sky-500">
                    Registrarse
                </Button>
                </form>
            </Form>
        </CardWrapper> 
        </div>    
    );
}

