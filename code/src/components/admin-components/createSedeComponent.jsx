"use client";
import React, { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { MapPin } from "lucide-react";
import { createSede } from "../../../actions/sedes";
import { toast } from "sonner";
import Switch from '@mui/material/Switch';

const containerStyle = {
  width: "100%",
  height: "300px"
};

const defaultCenter = {
  lat:  -34.918961,
  lng: -57.954949,
};

const mapOptions = {
  streetViewControl: true,
  mapTypeControl: false,
  fullscreenControl: true,
  zoomControl: false,
};

export default function Maps() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [map, setMap] = useState(null);
  const [clickedPosition, setClickedPosition] = useState(null);
  const [clickedError, setClickedError] = useState(false);
  const [pinOn, setPinOn] = useState(false);
  console.log(pinOn)

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleClick = (event) => {
    if (pinOn){
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setClickedPosition({ lat, lng });
      setClickedError(false);
    }
    return;

  };

  const submit = async (data) => {
    if (!clickedPosition) {
     setClickedError(true);
      return;
    }
    console.log(data)
    const res = await createSede({...data, lat: clickedPosition.lat, lng: clickedPosition.lng});
    console.log(res)
    if (res.success){
      toast.success("Sede creada con éxito!");
    }
  }

  const handlePinOn = () => {
    if(pinOn){
      setPinOn(false);
    } else {
      setPinOn(true);
    }

  }


  return isLoaded ? (
    <div>

    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg">
        <Card className="bg-white shadow-lg rounded-lg p-6">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold animate-color-change">⚓️ Crear sede ⚓️</CardTitle>
            <span>Completa los datos para crear una sede</span>
          </CardHeader>
          <CardContent>
          <div className="flex items-center">
          <Switch color="error" onClick={handlePinOn} />
          <span className={pinOn ? "text-red-500" : "text-slate-500"}>Pin </span>
          <MapPin className={pinOn ? "text-red-500" : "text-slate-500"} />
          </div>
 
          <div className="p-1 bg-sky-700 rounded-sm drop-shadow-md">
          <div style={containerStyle}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={defaultCenter}
                zoom={12}
                onClick={handleClick}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={mapOptions} 
              >
                {clickedPosition && <Marker position={clickedPosition} />}
              </GoogleMap>
            </div>

          </div>
        

      <form onSubmit={handleSubmit(submit)} className="w-full max-w-lg mt-6 text-center">
      <div className="p-1 rounded-sm bg-sky-700">
      <div className="p-2 rounded-sm bg-white">
      <div className="flex space-x-2 mt-3">
          <Input type="text" {...register("name", { required: true })} placeholder="Nombre" className="block w-1/2" />
          <Input type="text" {...register("address", { required: true })} placeholder="Dirección" className="block w-1/2" />
          <Input type="text" {...register("phone", { required: true })} placeholder="Teléfono" className="block w-1/2" />
        </div>
        <div className="flex space-x-2 mt-3">
          <Input type="text" {...register("email", { required: true })} placeholder="Email" className="block w-1/2" />
          <Input type="text" {...register("description", { required: true })} placeholder="Descripción" className="block w-1/2" />
        </div>
        </div>

      </div> 
      <div>

      </div>
      <div className="flex flex-col">
      <Button type="submit" className="mt-3" variant="direction" >Crear sede</Button>
      {(errors.name || errors.address || errors.phone || errors.email || errors.description || clickedError) && (<span className="text-red-500 text-sm">Asegurate de llenar los campos y seleccionar con un pin la ubicación en el mapa</span>)}

      </div>

      </form>

      {/* {clickedPosition && (
        <div className="text-center mt-4">
          <p className="font-semibold">Clicked Position:</p>
          <p>Latitude: {clickedPosition.lat}</p>
          <p>Longitude: {clickedPosition.lng}</p>
        </div>
      )} */}

          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <p>Loading...</p>
    </div>
  );
}
