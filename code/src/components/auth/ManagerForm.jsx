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
import { RegisterManagerSchema } from "@/schemas";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import { registerManager } from "../../../actions/registerManager";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export const ManagerForm = () => {
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition(); //usamos esto para la login transition
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(RegisterManagerSchema),
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
    startTransition(() => {registerManager(data)
        .then((response) => {
            if (response.success) {
                toast.success(response.success);
                router.push("/admin/view-employees");
            }
            setError(response.error)
        })
    
    })

   }

    return (
        <div>
        <CardWrapper 
            headerLabel="Crea una cuenta para un gerente rellenando los campos." 
            backButtonLabel="Volver" 
            backButtonHref="/profile"
            headerTitle="Registrar gerente"
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
                    Registrar gerente
                </Button>
                </form>
            </Form>
        </CardWrapper> 
        </div>        
    );
}

