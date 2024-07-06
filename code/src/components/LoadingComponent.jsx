"use client"
import React from 'react';
import { PulseLoader } from 'react-spinners';

export const LoadingComponent = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-40 h-40 bg-white shadow-md rounded-md flex items-center justify-center">
      <p className="text-center font-bold oscillating-sky-text">Cargando...
        <a href="https://www.animatedimages.org/cat-boats-1002.htm"><img src="https://www.animatedimages.org/data/media/1002/animated-boat-image-0073.gif" border="0" alt="animated-boat-image-0073" /></a>
      </p>
      </div>
    </div>
  );
}