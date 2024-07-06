"use client";
//para el selector
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';  
import { FormError } from '@/components/FormError';
import { actualizarVehiculo } from '../../../../actions/publicar-vehiculo';
//para el formulario
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/auth/BackButton";
import { useForm } from "react-hook-form";
import { publicarVehiculo } from "../../../../actions/publicar-vehiculo";
import { cn } from "../../../lib/utils";
import { Input } from "@/components/ui/input";
import { FormSuccess } from "@/components/FormSuccess";
import { Toaster, toast } from "sonner"; // Importa la función toast desde sonner
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "../../ui/card";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const VehicleEditForm = ({VehiclePost}) => {
  const [imageError, setImageError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(VehiclePost.img);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [type, setType] = useState(VehiclePost.type);
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
    console.log("SDA")
    if (!type) {
      setTypeError(true);
      return;
    } else {
      setTypeError(false);
    }
    const {title, descripcion, patente, modelo, kilometraje, cantpuertas, image} = data;
    console.log(image);
    const file = image[0];
    let archivo = null //si hay una imagen, entonces la guardo en archivo,sino ira "archivo" null
    if (file){;
        archivo = new FormData();
        archivo.append("image", file);
    }
    
    const postId = VehiclePost.id;

    const res = await actualizarVehiculo({postId,title, descripcion, patente, modelo, kilometraje, cantpuertas, type,archivo});
    if (res.success){
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

  const handleFileChange = (selectedFile) => {
    if (selectedFile && ["image/jpeg", "image/png", "image/jpg"].includes(selectedFile.type)) {
      setImageError("");
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
      if (!selectedFile) {
        setPreviewUrl(VehiclePost.img);
        return;
      }
      setImageError("Por favor, selecciona un archivo de tipo JPG, PNG o JPEG.");
    }
  };

  const handleChange = (event) => {
    setType(event.target.value);
    setTypeError(false)
  };

  return (
    <Card className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold animate-color-change">⚓️ Actualizar vehículo ⚓️</CardTitle>
        <CardDescription className="text-center">Modifica los campos que quieras editar</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmitWithEvent}>
          
          <Input type="text" {...register("title", { required: true })} defaultValue={VehiclePost.title} className="mt-3 block w-full" />
          <Input type="text" {...register("descripcion", { required: true })} defaultValue={VehiclePost.descripcion} className="mt-3 block w-full" />
          <div className="flex space-x-2 mt-3">
            <Input type="text" {...register("patente", { required: true })} defaultValue={VehiclePost.patente} className="block w-1/2" />
            <Input type="text" {...register("modelo", { required: true })} defaultValue={VehiclePost.modelo} className="block w-1/2" />
          </div>
          <div className="flex space-x-2 mt-3">
            <Input type="text" {...register("kilometraje", { required: true })} defaultValue={VehiclePost.kilometraje} className="block w-1/2" />
            <Input type="text" {...register("cantpuertas", { required: true })} defaultValue={VehiclePost.cantPuertas} className="block w-1/2" />
          </div>

          <div className="flex mt-3">
            <Box sx={{ minWidth: 203 }}>
              <FormControl fullWidth>
                <InputLabel id="vehicle-type-input" className='text-sm'> Tipo</InputLabel>
                <Select
                  className='text-sm'
                  labelId="vehicle-input"
                  id="vehicle-type-selector"
                  value={type}
                  label="type"
                  onChange={handleChange}
                  sx={{ height: 50 }}
                >
                  <MenuItem value={"Automóvil"} className='text-sm'>Automóvil</MenuItem>
                  <MenuItem value={"Camioneta"} className='text-sm'>Camioneta</MenuItem>
                  <MenuItem value={"Motocicleta"} className='text-sm'>Motocicleta</MenuItem>
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
            {imageError && <p className="text-red-500 text-xs mt-1">{imageError}</p>}
          </div>
          {(errors.title || errors.descripcion || errors.patente|| errors.modelo || errors.kilometraje || errors.cantpuertas || imageError === "Imagen no encontrada" || typeError) && <p className="text-red-500 text-xs mt-2">¡Todos los campos son obligatorios!</p>}
          <Button type="submit" className="w-full mt-4 bg-sky-500 hover:bg-sky-600 text-white">Actualizar</Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={handleBackConfirmation} >Volver</Button>
      </CardFooter> 
    </Card>
  );
};
