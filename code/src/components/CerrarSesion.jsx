"use client"
import React from 'react';
import { PulseLoader } from 'react-spinners';

import { CerradoDeSesion } from '../../actions/cerrarsession';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
export const CerrarSesion = ({triggerLabel}) => {
    const handleConfirm = async () => {
        await CerrarSession();
      };
    
  return (
    <>       
    <AlertDialog>
    <AlertDialogTrigger>{triggerLabel}</AlertDialogTrigger>
    <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Estás seguro?</AlertDialogTitle>
      <AlertDialogDescription>
        Se cerrara la sesión y deberás volver a iniciar sesión para acceder a las funcionalidades de la aplicación.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction onClick={handleConfirm} >Confirmar</AlertDialogAction>
    </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
    </>
  );
}