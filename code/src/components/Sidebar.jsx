"use client";

import Link from "next/link";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";

export default function Sidebar() {
  const [modelValue, setModelValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const router = useRouter();
  console.log(filterValue);
  console.log(modelValue);

  const handlePush = () => {
    if (filterValue === "sinfiltro") {
      router.push(`/viewPosts`);
    }
    if (modelValue !== "" && filterValue === "") {
      router.push(`/viewPosts/filterBy/model/${modelValue}`);
    }
    if (modelValue === "" && filterValue !== "") {
      if (
        filterValue === "catamaran" ||
        filterValue === "cruise" ||
        filterValue === "lancha" ||
        filterValue === "sailboat"
      ) {
        router.push(`/viewPosts/filterBy/boat/${filterValue}`);
      }
      if (
        filterValue === "automov" ||
        filterValue === "motorbike" ||
        filterValue === "van"
      ) {
        router.push(`/viewPosts/filterBy/vehicle/${filterValue}`);
      }
    }
    if (modelValue !== "" && filterValue !== "") {
      router.push(`/viewPosts/filterBy/especial/${modelValue}/${filterValue}`);
    }
  };
  return (
    <div className="fixed h-full w-64 bg-white shadow-xl z-50">
      <div className="p-4">
        <h1 className="text-center font-bold text-2xl mb-4">Filtrar:</h1>
        <div className="flex flex-col space-y-4">
          <FormControl component="fieldset">
            <FormLabel component="legend" className="text-lg">
              Categoría
            </FormLabel>
            <RadioGroup
              row
              value={filterValue}
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => {
                setFilterValue(e.target.value);
              }}
            >
              <FormControlLabel
                value="catamaran"
                control={<Radio size="small" />}
                label="Catamarán"
              />
              <FormControlLabel
                value="cruise"
                control={<Radio size="small" />}
                label="Crucero"
              />
              <FormControlLabel
                value="lancha"
                control={<Radio size="small" />}
                label="Lancha"
              />
              <FormControlLabel
                value="sailboat"
                control={<Radio size="small" />}
                label="Velero"
              />

            <Separator/>
              <FormControlLabel
                value="van"
                control={<Radio size="small" />}
                label="Camioneta"
              />
              <FormControlLabel
                value="motorbike"
                control={<Radio size="small" />}
                label="Motocicleta"
              />
              <FormControlLabel
                value="automov"
                control={<Radio size="small" />}
                label="Automóvil"
              />
              <FormControlLabel
                value="sinfiltro"
                className="text-slate-500"
                control={<Radio size="small" />}
                label="Sin filtros"
              />
            </RadioGroup>



          </FormControl>
          <input
            type="number"
            placeholder="Buscar por modelo"
            className="border p-2 rounded-md w-full"
            value={modelValue}
            onChange={(e) => setModelValue(e.target.value)}
          />
        </div>
        <Separator className="mt-4" />
        <Button
          variant="contained"
          color="primary"
          className="mt-4 w-full"
          onClick={handlePush}
        >
          Buscar
        </Button>
      </div>
    </div>
  );
}
