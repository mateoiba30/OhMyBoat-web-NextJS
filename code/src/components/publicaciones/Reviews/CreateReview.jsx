"use client"
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner"; // Importa la función toast desde sonner
import { useRouter } from "next/navigation";
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { createReview } from "../../../../actions/reviewActions";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const CreateReviewComponent = ({tradeId }) => {
  console.log(tradeId)
  const [starError, setStarError] = useState(false)
  const [rating, setRating] = useState(null);
  const handleRatingChange = (event, newValue) => {
    console.log(newValue)
    setRating(newValue); 
    if (newValue === null) {
        setStarError(true);
        return;
    } else {
        setStarError(false);
    }
    console.log("Selected Rating:", newValue);
  };
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleBack = () => {
    router.back();
  };
  const onSubmitWithEvent = (event) => {
    event.preventDefault();
    if (rating === null) {
        setStarError(true);
        return
    }
    handleSubmit(onSubmit)();
  };
  const onSubmit = async (data) => {
    console.log(data);
    const res = await createReview({tradeId: tradeId, stars: rating, description: data.descripcion,title: data.titulo});
    if (res.success){
      toast.success(res.success);
      router.refresh();
      router.back();
      router.refresh();

    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-sky-600 rounded-md shadow-lg p-1 w-full max-w-md">

        <Card className="w-full bg-white shadow-lg rounded-md p-6">
        <button onClick={handleBack} className="hover:text-sky-500 mb-4">
          <MoveLeft height={20} width={20} />
        </button>
          <CardHeader className="text-center">
            <h1 className="font-semibold text-2xl text-yellow-500">Realizar reseña</h1>
            <span className="text-slate-500 text-sm">
              Ingresa una breve descripción y una cantidad de estrellas para realizar la reseña.
            </span>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmitWithEvent}>
              <Input
                type="text"
                {...register("titulo", { required: true })}
                placeholder="Título"
                className="mt-3 block w-full"
              />

              <Input
                type="text"
                {...register("descripcion", { required: true })}
                placeholder="Descripción"
                className="mt-3 block w-full"
              />

              <div className="flex justify-center mt-4">
                  <Box sx={{'& > legend': { mt: 2 },}}>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={handleRatingChange}
                  />
                  </Box>
              </div>
              <div className="text-center mt-2">
                <span>Selected Rating: {rating}</span>
              </div>
              <div className="flex justify-center mt-4">
                <Button className="text-sm bg-sky-500 hover:bg-sky-600 text-white" type="submit">
                  Realizar reseña
                </Button>
              </div>
              {(errors.descripcion || starError === true || errors.titulo) && (
                <span className="text-red-500 text-sm mt-2 block text-center">
                  Ingresa una descripción, un título y selecciona una cantidad de estrellas
                </span>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateReviewComponent;

