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
import { publicarBarco } from "../../../../actions/publicar-barco";
import { cn } from "../../../lib/utils";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner"; // Importa la función toast desde sonner
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "../../ui/card";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const BoatForm = () => {
  const [imageError, setImageError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [type, setType] = useState('');
  const [typeError,setTypeError] = useState(false);

  const onSubmit = async (data) => {
    console.log(data)
    if (!type) {
      setTypeError(true);
      return;
    } else {
      setTypeError(false);
    }
    const { title, modelo, descripcion, matricula, eslora, manga, metros, deuda, image } = data;
    const file = image[0];
    const archivo = new FormData();
    archivo.append("image", file);
    const res = await publicarBarco({ title, modelo, descripcion, matricula, eslora, manga, metros, deuda,type, archivo });
    if (res.success) {
      toast.success("¡Publicación creada!");
      router.push("/viewPosts");
    } else {
      setImageError(res?.error);
    }
  };

  const onSubmitWithEvent = (event) => {
    event.preventDefault();
    if (!event.target.image.files[0]) {
      setImageError("Imagen no encontrada");
    }
    handleSubmit(onSubmit)();
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
        console.log("Imagen obligatoria");
        setImageError("Imagen no encontrada");
        return;
      }
      setImageError("Por favor, selecciona un archivo de tipo JPG, PNG o JPEG.");
    }
  };

  return (
      <Card className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold animate-color-change">⚓️ Publicar embarcación ⚓️</CardTitle>
          <CardDescription className="text-center">Crea una publicación de una embarcación ingresando los datos requeridos</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmitWithEvent}>
            <Input type="text" {...register("title", { required: true })} placeholder="Titulo" className="mt-3 block w-full" />
            <Input type="text" {...register("descripcion", { required: true })} placeholder="Descripcion" className="mt-3 block w-full" />
            <div className="flex space-x-2 mt-3">
              <Input type="text" {...register("matricula", { required: true })} placeholder="Matricula" className="block w-1/2" />
              <Input type="text" {...register("modelo", { required: true })} placeholder="Modelo" className="block w-1/2" />
            </div>
            <div className="flex space-x-2 mt-3">
              <Input type="text" {...register("eslora", { required: true })} placeholder="Eslora" className="block w-1/2" />
              <Input type="text" {...register("manga", { required: true })} placeholder="Manga" className="block w-1/2" />
            </div>
            <div className="flex space-x-2 mt-3">
              <Input type="text" {...register("metros", { required: true })} placeholder="Metros" className="block w-1/2" />
              <Input type="text" {...register("deuda", { required: true })} placeholder="Deuda" className="block w-1/2" />
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
                        required: { value: true, message: "Imagen obligatoria" },
                        validate: {
                        validFileType: (value) => {
                        if (!value) return true;
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
            <Button type="submit" className="w-full mt-4 bg-sky-500 hover:bg-sky-600 text-white">Publicar</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <BackButton label="Volver" href="/" />
        </CardFooter>
      </Card>
  );
};
