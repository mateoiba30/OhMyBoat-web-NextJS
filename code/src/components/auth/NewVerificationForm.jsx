"use client"
import { useSearchParams } from "next/navigation"
import { CardWrapper } from "./CardWrapper"
import {PulseLoader} from "react-spinners"
import { useCallback, useEffect } from "react"
import { newVerification } from "../../../actions/new-verification"
import { useState } from "react"
import { FormError } from "../FormError"
import { FormSuccess } from "../FormSuccess"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "../ui/button"

export const NewVerificationForm = () => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const router = useRouter();

    const onSubmit = (() => {
        if (!token) {
            setError("Token invalido!")
        }
        
        newVerification(token)
        .then((response) => {
            response.error ? setError(response.error) : setSuccess(response.success)
            if (response.success) {
                toast.success(response.success)
                router.push("/auth/login")
            }
        })
        .catch(() => {
            setError("Algo salio mal!")
        })
        console.log(token)
    })

    

    return (
        <CardWrapper
        headerLabel="Confirma tu cuenta!"
        backButtonLabel="Inicia sesion"
        backButtonHref="/auth/login">
            <div className="flex items-center w-full justify-center">
                { !error && !success && (
                    <Button onClick={onSubmit} className="bg-sky-500">
                        Verificar mail
                    </Button>
                )}
         
                <FormError message={error}/>
            </div>
        </CardWrapper>
    )

}