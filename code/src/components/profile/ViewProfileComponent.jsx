"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import RatingComponent from "./RatingComponent";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function ViewProfileComponentInfa({ firstname, lastname, birthday, email, role, id, estrellas, reviews }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  console.log(reviews);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows:false,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };


  const router = useRouter();
  let rol = null;

  if (role === "ADMIN") {
    rol = "Administrador";
  }
  if (role === "USER") {
    rol = "Usuario";
  }
  if (role === "MANAGER") {
    rol = "Gerente";
  }
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div style={{ width: "50%", height: "85%" }}>
        <div className="bg-sky-600 rounded-lg shadow-md p-2">
          <div className="p-4 bg-white rounded-lg relative">
            <h1 className="hover:text-blue-500 cursor-pointer text-xl font-bold">{`Perfil del ${rol}`}</h1>
            <p className="text-gray-600">Datos del usuario:</p>
            <div className="my-4">
              <p className="mb-2"><span className="font-semibold hover:text-blue-500 cursor-pointer">Nombre:</span> {firstname}</p>
              <p className="mb-2"><span className="font-semibold hover:text-blue-500 cursor-pointer">Apellido:</span> {lastname}</p>
              <p className="mb-2"><span className="font-semibold hover:text-blue-500 cursor-pointer">Email:</span> {email}</p>
              <p className="mb-2"><span className="font-semibold hover:text-blue-500 cursor-pointer">Fecha de Nacimiento:</span> {birthday}</p>
              {role === "USER" && (
                <section className="flex items-center space-x-4 space-y-5">
                  <RatingComponent number={estrellas} />
                  {reviews.length === 0 && (
                    <span className="text-sm">(Sin reseñas)</span>
                  )}
               
                  <Link href={`/view-reviews/${id}`}>
                    <Button variant="ghost" className="hover:text-blue-500">Ver reseñas</Button>
                  </Link>
                </section>
              )}
            </div>

          
            {reviews.length > 0 && (
              <div>
                <div className="flex justify-center items-center mb-4">
                  <Star size={20} className="text-yellow-600" />
                  <h1 className="text-center font-bold text-yellow-600 mx-2">Reseñas Destacadas</h1>
                  <Star size={20} className="text-yellow-600" />
                </div>
                {reviews.length === 1 ? (
                  <div className="p-2">
                    <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col justify-between w-1/2">
                      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                        <h1 className="text-lg font-bold">{reviews[0].title}</h1>
                        <RatingComponent number={reviews[0].stars} format="table" />
                        <p className="mt-1 font-semibold text-sm">{reviews[0].ReviewerFirstName} {reviews[0].ReviewerLastName}</p>
                      </div>
                    </div>
                  </div>
                ) : reviews.length === 2 ? (
                  <div className="flex">
                  <div className="p-2 w-1/2">
                    <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col justify-between">
                      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                        <h1 className="text-lg font-bold">{reviews[0].title}</h1>
                        <RatingComponent number={reviews[0].stars} format="table" />
                        <p className="mt-1 font-semibold text-sm">{reviews[0].ReviewerFirstName} {reviews[0].ReviewerLastName}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 w-1/2">
                    <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col justify-between">
                      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                        <h1 className="text-lg font-bold">{reviews[1].title}</h1>
                        <RatingComponent number={reviews[1].stars} format="table" />
                        <p className="mt-1 font-semibold text-sm">{reviews[1].ReviewerFirstName} {reviews[1].ReviewerLastName}</p>
                      </div>
                    </div>
                  </div>
                </div>
                ) : (
                  <Slider {...settings}>
                  {reviews.map((review) => (
                    <div key={review.id} className="p-2">
                      <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col justify-between">
                        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                          <h1 className="text-lg font-bold">{review.title}</h1>
                          <RatingComponent number={review.stars} format="table" />
                          <p className="mt-1 font-semibold text-sm">{review.ReviewerFirstName} {review.ReviewerLastName}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
                )}
              </div>
            )}

            <Separator className="my-4"/>
            <div className="flex justify-center">
              <Button className="hover:text-blue-700" variant="ghost" onClick={handleBack}>Volver</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

