"use client"
//para el selector
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//para el input

import { getBoatPostById } from "../../../../data/posts";

import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { CreateComponent } from "@/components/WorkingComponent";


import { useState } from 'react';
import { BackButton } from "@/components/auth/BackButton";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner"; // Importa la función toast desde sonner
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";

import { OfertarEmbarcacion } from '../../../../actions/Offer';

const BoatOfferForm = ({ vehicleId,boatPosts, idOfertante }) => {
  const [post, setPost] = useState(boatPosts.length > 0 ? boatPosts[0].id : null);
  const [postError, setPostError] = useState(null);
  console.log(post)
  const router = useRouter();
  console.log(boatPosts.length)
  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log(vehicleId);
  const handleBack = () => {
    router.back();
  }
  const handleChange = (event) => {
    console.log(event.target.value);
    if (event.target.value === null) {
      setPostError(true)
      return;
    }
    setPost(event.target.value);
    console.log(post)
  }

  const onSubmitWithEvent = (event) => {
    event.preventDefault();
    if ( !post ) {
      setPostError(true);
      return;
    }
    setPostError(false);
    handleSubmit(onSubmit)();
  }
  const onSubmit = async (data) => {
    console.log("paso!");
    console.log(idOfertante)
    console.log(data)
    console.log(post)
    console.log(vehicleId)
    const res = await OfertarEmbarcacion({idOfertante: idOfertante, idPublicacionOfrecida: post, descripcion: data.descripcion,idPublicacionPedida: vehicleId});
    if (res.success) {
      toast.success("¡Oferta realizada!");
      router.back()
    }
    console.log(res?.error);
    setPostError(res?.error);

  }


  return (
    <div className="flex items-center justify-center h-screen">

      <div className="bg-sky-600 rounded-md shadow-md p-1">
      <Card className="w-full max-w-3xl bg-white shadow-lg rounded-md p-6">
        <button onClick={handleBack}variant="ghost" className="hover:text-sky-500"><MoveLeft height={20} width={20}/></button>
      <CardHeader>
        <h1 className="font-semibold text-2xl text-center">Realizar oferta</h1>
        <span className="text-slate-500 text-sm">Selecciona una publicación de una embarcación e ingresa una breve descripción para enviar tu oferta. </span>
      </CardHeader>
      <CardContent>
      <form onSubmit={onSubmitWithEvent}>
        <Input type="text" {...register("descripcion", { required: true })} placeholder="Descripción" className="mt-3 block w-full" />
        <div className='mt-3 flex'>
        <Box sx={{ minWidth: 203 }}>
              <FormControl fullWidth>
                <InputLabel id="post-id-input" className='text-sm'>Post</InputLabel>
                <Select
                  className='text-sm'
                  labelId="post-input"
                  id="post-id-selector"
                  value={post}
                  label="post"
                  onChange={handleChange}
                  sx={{ height: 50 }}
                >
                  {boatPosts.length === 0 && (
                    <MenuItem value={null} className='text-sm'>No hay embarcaciones</MenuItem>
                  )}
                  {boatPosts.length > 0 && (
                    boatPosts.map((post) => (
                      <MenuItem key={post.id} value={post.id} className='text-sm'>{post.title}</MenuItem>
                    ))
                  )}
   
                </Select>
              </FormControl>
            </Box>
        </div>
        <div className='flex mt-3'>
          <Button className='text-sm bg-sky-500' type="submit">Confirmar oferta</Button>
        </div>
        { (postError === true || errors.descripcion) ? <span className="text-red-500 text-sm">Ingresa una descripción y selecciona una publicación de una embarcación</span>
        : (
          <span className="text-red-500 text-sm">{postError}</span>
        
        )}

      </form>
      </CardContent>
      <CardFooter className="flex justify-center items-center h-full">
      </CardFooter>
    </Card>
    </div>
    </div>
  );
}

export default BoatOfferForm;
