"use client"
//VER COMO RECIBIR LOS ERRORES DEL ROUTE.JS
//exportar desde ahi sino no funciona
import 'primeicons/primeicons.css';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form"
import { useTransition } from "react";
import { ResetSchema } from "@/schemas";
import { FormError } from "../FormError";
import { useRouter } from 'next/navigation';
import { FormSuccess } from "../FormSuccess";


import { reset } from "../../../actions/reset";
import { toast } from 'sonner';

export const ResetForm= () => {
    const [error, setError] = useState("");
    const router=useRouter();
    const [success, setSuccess] = useState("");
    const [isPending, startTransition] = useTransition(); //usamos esto para la login transition
    const form = useForm({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
            emailConfirmation: "",
        }
    });

  const onSubmit = async (data) => {
    console.log(data);
    startTransition(() => {
        reset(data).then((response) => {
            setError(response?.error);
            if(response?.success){
                toast.success(response.success)
                router.push("/auth/login")
            }
        });
    });    
  


    }

    return (
        <>
        <CardWrapper 
            headerLabel="Ingresa el email asociado a tu cuenta." 
            backButtonLabel="Ya tienes una cuenta?" 
            backButtonHref="/auth/login"
            headerTitle="Restablecer"
        >
            <Form {... form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                >
                
                <div className="space-y-4">
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

                    <FormField
                        control={form.control}
                        name="emailConfirmation"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Confirma tu email:</FormLabel>
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

    
                </div>
                {/* luego el error los mostrar */}
                <FormError message={error}/>
                <Button disabled={isPending}
                type="submit" 
                className="w-full bg-sky-500">
                    Confirmar
                </Button>
                </form>
            </Form>
        </CardWrapper>
    
    
        
        </>
    );

}

