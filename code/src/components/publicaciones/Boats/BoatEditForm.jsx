"use client";
//para el selector
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//para el formulario
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/auth/BackButton";
import { useForm } from "react-hook-form";
import { actualizarBarco, publicarBarco } from "../../../../actions/publicar-barco";
import { cn } from "../../../lib/utils";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner"; // Importa la función toast desde sonner
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "../../ui/card";
import { Poppins } from "next/font/google";
import { getBoatPostById } from '../../../../data/posts';
import { undefined } from 'zod';
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const BoatEditForm = ({BoatPost}) => {
  const [imageError, setImageError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(BoatPost.img);
  console.log(BoatPost.img)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [type, setType] = useState(BoatPost.type);
  const [typeError,setTypeError] = useState(false);

  const handleBackConfirmation = () => {
    toast.info("Estás seguro que no quieres aplicar los cambios?", {
        action: <>
        <div>
          <button onClick={() => {router.back();toast.dismiss()}} className='hover:text-emerald-500 text-blue-600'>Confirmar</button>
          <button onClick={() => {toast.dismiss()}} className='hover:text-rose-600 text-blue-600 '>Cancelar</button>
          </div>
        </> ,
    })
   }
  const onSubmit = async (data) => {
    console.log(data)
    if (!type) {
      setTypeError(true);
      return;
    } else {
      setTypeError(false);
    }
    const { title, modelo, descripcion, matricula, eslora, manga, metros, deuda, image } = data;
    console.log(image);
    const file = image[0];
    let archivo = null //si hay una imagen, entonces la guardo en archivo,sino ira "archivo" null
    if (file){;
        archivo = new FormData();
        archivo.append("image", file);
    }
    
    const postId = BoatPost.id;

    const res = await actualizarBarco({ postId,title, modelo, descripcion, matricula, eslora, manga, metros, deuda,type, archivo });
    if (res.success) {
      router.back();
      toast.success("¡Publicación actualizada!");
    } else {
      setImageError(res?.error);
    }
  };

  const onSubmitWithEvent = (event) => {
    event.preventDefault();
    console.log(event.target.image.files[0])
    toast.info("Estás seguro que quieres aplicar los cambios?", {
        action: <>
        <div>
          <button onClick={() => {handleSubmit(onSubmit)();toast.dismiss()}} className='hover:text-emerald-500 text-blue-600'>Confirmar</button>
          <button onClick={() => {toast.dismiss()}} className='hover:text-rose-600 text-blue-600 '>Cancelar</button>
          </div>
        </> ,
    })

  };

  const handleChange = (event) => {
    setType(event.target.value);
    setTypeError(false)
  };

  const handleFileChange = (selectedFile) => {
    if (selectedFile && ["image/jpeg", "image/png", "image/jpg"].includes(selectedFile.type)) {
      setImageError("");
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
      if (!selectedFile) {
        setPreviewUrl(BoatPost.img)
        return;
      }
      setImageError("Por favor, selecciona un archivo de tipo JPG, PNG o JPEG.");
    }
  };

  return (
      <Card className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold animate-color-change">⚓️ Editar embarcación ⚓️</CardTitle>
          <CardDescription className="text-center">Modifica los campos que quieras editar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmitWithEvent}>
            <Input type="text" {...register("title", { required: true })} defaultValue={BoatPost.title} className="mt-3 block w-full" />
            <Input type="text" {...register("descripcion", { required: true })} defaultValue={BoatPost.descripcion} className="mt-3 block w-full" />
            <div className="flex space-x-2 mt-3">
              <Input type="text" {...register("matricula", { required: true })} defaultValue={BoatPost.matricula} className="block w-1/2" />
              <Input type="text" {...register("modelo", { required: true })} defaultValue={BoatPost.modelo} className="block w-1/2" />
            </div>
            <div className="flex space-x-2 mt-3">
              <Input type="text" {...register("eslora", { required: true })} defaultValue={BoatPost.eslora} className="block w-1/2" />
              <Input type="text" {...register("manga", { required: true })} defaultValue={BoatPost.manga} className="block w-1/2" />
            </div>
            <div className="flex space-x-2 mt-3">
              <Input type="text" {...register("metros", { required: true })} defaultValue={BoatPost.metros} className="block w-1/2" />
              <Input type="text" {...register("deuda", { required: true })} defaultValue={BoatPost.deuda} className="block w-1/2" />
            </div>

            <div className="flex mt-3">
            <Box sx={{ minWidth: 203 }}>
              <FormControl fullWidth>
                <InputLabel id="ship-type-input" className='text-sm'> Tipo</InputLabel>
                <Select
                  className='text-sm'
                  labelId="ship-input"
                  id="ship-type-selector"
                  value={type}
                  label="type"
                  onChange={handleChange}
                  sx={{ height: 50 }}
                >
                  <MenuItem value={"Lancha"} className='text-sm'>Lancha</MenuItem>
                  <MenuItem value={"Catamarán"} className='text-sm'>Catamarán</MenuItem>
                  <MenuItem value={"Crucero"} className='text-sm'>Crucero</MenuItem>
                  <MenuItem value={"Velero"} className='text-sm'>Velero</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
            
            <div className="mt-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Seleccione una imágen:</label>
              <Input
                    type="file"
                    {...register("image", {
                        validate: {
                        validFileType: (value) => {
                        if (!value || value.length === 0) return true;
                        const fileType = value[0].type;
                        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
                        if (!allowedTypes.includes(fileType)) {
                        return "Por favor, selecciona un archivo de tipo JPG, PNG o JPEG.";
                        }
                            return true;
                            },
                                },
                        })}
                        onChange={(e) => handleFileChange(e.target.files[0])}
                />
              {previewUrl && <img className="mt-2 rounded-md" src={previewUrl} alt="Vista previa" style={{ maxWidth: "100px", maxHeight: "100px" }} />}
              {(imageError) && <p className="text-red-500 text-xs mt-1">{imageError}</p>}
            </div>
            
            {(errors.title || errors.descripcion || errors.matricula || errors.modelo || errors.eslora || errors.manga || errors.metros || errors.deuda || imageError === "Imagen no encontrada" || typeError) && <p className="text-red-500 text-xs mt-2">¡Todos los campos son obligatorios!</p>}
            <Button type="submit" className="w-full mt-4 bg-sky-500 hover:bg-sky-600 text-white">Actualizar</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
            <Button variant="link" onClick={handleBackConfirmation} >Volver</Button>
        </CardFooter>
      </Card>
  );
};
