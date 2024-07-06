"use client"
import { RechazarOferta,ConfirmarOferta } from "../../../../actions/Offer";
import { ContactPopover } from "../Trades/ContactPopover";
import { getUserById } from "../../../../data/user";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getConfirmedOffersByPostId } from "../../../../data/getOffers";
import { Check, Hourglass, LucideAlignHorizontalSpaceBetween, MoveLeft, Search, X } from "lucide-react";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

const columns = (handleRejectConfirmation,handleConfirmation) => [ 
  {
    accessorKey: "idOfertante",
    header: "Ofertante",
    cell: ({ row }) => (
      <div className="flex justify-center">
      <ContactPopover email={row.original.emailOfertante} name= {row.original.firstNameOfertante} lastname={row.original.lastNameOfertante} phone={row.original.cellphoneOfertante } userId={row.original.idOfertante}/>
      </div> 
    )
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.descripcion}
      </div>
    )
  },
  { accessorKey: "publication",
    header: "Publicación ofertada",
    cell: ({ row }) => {

      return (
        <>
          
          <div className="flex flex-col items-center">
          <Link href={row.original.boat 
            ? `/viewPosts/view-ship/${row.original.idPublicacionOfrecida}`
            : `/viewPosts/view-vehicle/${row.original.idPublicacionOfrecida}`
          }>
          <h1 className="font-semibold text-sm mb-2 hover:text-sky-600">{row.original.tituloPublicacionOfrecida}</h1>
          </Link>
        
            <img
              src={row.original.imgPublicacionOfrecida}
              width="100"
              height="100"
              alt="Image"
              className="rounded-md"
            />

      </div>
    
        </>

      )
    }
  },
  { accessorKey: "rejectbutton",
    header: "Acciones",
    cell: ({ row }) => {
      return (
        <>
        {row.original.status === "PENDING" && (
          <div className="flex justify-center">
            <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded text-xs" onClick={() => handleRejectConfirmation(row.original.id)}>
                Rechazar
            </button>
          </div>   
        )}
        {row.original.status === "PENDING" && (
          <div className="flex justify-center">
            <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 mt-2 rounded text-xs" onClick={() => handleConfirmation({offerId: row.original.id,idPublicacionPedida: row.original.idPublicacionPedida})}>
              Aceptar
            </button>
          </div>
        )}
        {row.original.status === "CONFIRMED" && (
           <div className="flex justify-center">
          <Check height={20} width={20} className="text-green-600"/>
          </div>
        )}
        {(row.original.status === "REJECTED" || row.original.status === "CANCELLED") && (
          <div className="flex justify-center">
            <X height={20} width={20} className="text-red-600"/>
          </div>

        )}
        </>

      )
    }
  },
  { accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      return (
        <>
        {row.original.status === "CONFIRMED" && (
            <div className="flex justify-center text-green-600">
              Aceptada
            </div>
          
        )}
        {row.original.status === "PENDING" && (
          <div className="flex justify-center text-yellow-500">
            Pendiente
          </div>
        )}
        {row.original.status === "REJECTED" && (
          <div className="flex justify-center text-red-500">
            Rechazada
          </div>
        )}
          {row.original.status === "CANCELLED" && (
          <div className="flex justify-center text-red-500">
            Cancelada
          </div>
        )}
        </>
      )
    }
  },

];



export function OffersTable({ data, isBoat,postId,filter='',model=''}) {
  console.log(isBoat)
  console.log(postId)
  console.log(filter)
  const router = useRouter()
  const [modelValue, setModelValue] = useState("");
  const [filterValue, setFilterValue] = useState(""); 
  console.log(filterValue);
  console.log(modelValue);
  
  const handlePush = () => {
    if (filterValue === "sinfiltro") {
      console.log("sinfiltro")
      router.push(`/profile/offer/${postId}`);
      return
    }
    if (modelValue === "" && filterValue !== "") {
      if (filterValue === "catamaran" || filterValue === "cruise" || filterValue === "lancha" || filterValue === "sailboat") {
      router.push(`/profile/offer/${postId}/filterBy/boat/${filterValue}`)
    } else {
      router.push(`/profile/offer/${postId}/filterBy/vehicle/${filterValue}`)
    
    }
  }
    if (modelValue !== "" && filterValue === "") {
      if (isBoat === true) {
        router.push(`/profile/offer/${postId}/filterBy/vehicle/model/${modelValue}`);
      }
      if (isBoat === false) {
        router.push(`/profile/offer/${postId}/filterBy/boat/model/${modelValue}`);
      }
    }

    if (modelValue !== "" && filterValue !== "") {
      if (isBoat === true) {
        router.push(`/profile/offer/${postId}/filterBy/vehicle/model/${modelValue}/${filterValue}`);
      }
      if (isBoat === false) {
        router.push(`/profile/offer/${postId}/filterBy/boat/model/${modelValue}/${filterValue}`);
      }
    }


  }
  const handleReject = async (offerId) => {
    console.log(offerId)
    const response = await RechazarOferta({ offerId });
    console.log(response)
    if (response.success) {
      toast.success(response.success);
      router.refresh();
    }
  }

  const handleConfirm = async ({offerId,idPublicacionPedida}) => {
      const response = await ConfirmarOferta({ offerId });
      console.log(response)
      if (response.success) {
        toast.success(response.success);
        router.refresh();
      }

  }


  const handleRejectConfirmation = (offerId) => {
    console.log(offerId)
    toast.error("Estás seguro de que quieres rechazar la oferta?", {
      action: <>
      <div>
        <button onClick={() => {handleReject(offerId);toast.dismiss()}} className='hover:text-red-800 text-red-500'>Confirmar</button>
        <button onClick={() => {toast.dismiss()}} className='hover:text-red-800 text-red-500'>Cancelar</button>
        </div>
      </> ,
  })
  }

  const handleConfirmation = ({offerId,idPublicacionPedida}) => {
    console.log(offerId)
    toast.info("Estás seguro de que quieres aceptar la oferta?", {
      action: <>
      <div>
        <button onClick={() => {handleConfirm({offerId,idPublicacionPedida});toast.dismiss()}} className='hover:text-green-500  text-blue-500'>Confirmar</button>
        <button onClick={() => {toast.dismiss()}} className='hover:text-red-800 text-blue-500'>Cancelar</button>
        </div>
      </> ,
  })

  }

  const table = useReactTable({
    data: data,
    columns: columns(handleRejectConfirmation,handleConfirmation),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } } // Set page size to 5
  });

  const handleBack = () => {
    router.back();
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex justify-center items-center p-2 rounded-lg bg-sky-600">
        {(data && data.length !== 0) ? (
          <Card className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-2">
              <button variant="ghost" className="hover:text-sky-500" onClick={handleBack}><MoveLeft height={20} width={20}/></button>
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold hover:text-sky-600">Ofertas</CardTitle>
            </CardHeader>
            <CardContent>
              {isBoat === false && (
              <div className="flex flex-col space-y-2 p-2 bg-white shadow-md rounded-md border border-gray-200">
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label" className="flex">
                  Filtrar:
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
                  <FormControlLabel value="sinfiltro" control={<Radio size="small" />} label="Sin filtros" />
                </RadioGroup>

              </FormControl>
          
              <div className="flex items-center">
              <input type="number" placeholder="Modelo" className="border rounded-md p-1 mt-1 w-1/4" onChange={(e) => {setModelValue(e.target.value)}} />
              <Search className="hover:text-slate-500 cursor-pointer ml-1" height={20} width={20} onClick={handlePush} />


              </div>
            

             
            </div>
              )}

            {isBoat === true && (
               <div className="flex flex-col space-y-2 p-2 bg-white shadow-md rounded-md border border-gray-200">
               <FormControl>
                 <FormLabel id="demo-row-radio-buttons-group-label" className="mb-2 font-semibold text-gray-700">Filtrar:</FormLabel>
                 <RadioGroup
                   row
                   value={filterValue}
                   aria-labelledby="demo-row-radio-buttons-group-label"
                   name="row-radio-buttons-group"
                   onChange={(e) => { setFilterValue(e.target.value)}}
                 >
                   <FormControlLabel value="van" control={<Radio size="small" />} label="Camioneta" />
                   <FormControlLabel value="motorbike" control={<Radio size="small" />} label="Motocicleta" />
                   <FormControlLabel value="automov" control={<Radio size="small" />} label="Automóvil" />
                   <FormControlLabel value="sinfiltro" control={<Radio size="small" />} label="Sin filtros" />
                 </RadioGroup>
               </FormControl>
               <div className="flex items-center">
               <input type="number" placeholder="Modelo" className="border rounded-md p-1 mt-1 w-1/4" onChange={(e) => {setModelValue(e.target.value)}} />
                 <Search className="hover:text-slate-500 cursor-pointer ml-1" height={20} width={20} onClick={handlePush}/> 
               </div>
       
               
             </div>
              )}

              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id} className="text-center">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="text-center">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              {/* PAGINATION */}
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button
                variant="ghost"
                className="text-sm hover:text-blue-600"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </Button>
              <span className="text-sm">
                Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
              </span>
              <Button
                variant="ghost"
                className="text-sm hover:text-blue-600"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Siguiente
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-2">
            <button variant="ghost" className="hover:text-sky-500" onClick={handleBack}><MoveLeft height={20} width={20}/></button>
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold hover:text-sky-600">Ofertas</CardTitle>
            </CardHeader>
            <CardContent>
            {isBoat === false && (
              <div className="flex flex-col space-y-2 p-2 bg-white shadow-md rounded-md border border-gray-200">
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label" className="flex">
                  Filtrar:
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
                  <FormControlLabel value="sinfiltro" control={<Radio size="small" />} label="Sin filtros" />
                </RadioGroup>
              </FormControl>
          
              <div className="flex items-center">
              <input type="number" placeholder="Modelo" className="border rounded-md p-1 mt-1 w-1/4" onChange={(e) => {setModelValue(e.target.value)}} />
              <Search className="hover:text-slate-500 cursor-pointer ml-1" height={20} width={20} onClick={handlePush} />
              </div>
            </div>
              )}

            {isBoat === true && (
               <div className="flex flex-col space-y-2 p-2 bg-white shadow-md rounded-md border border-gray-200">
               <FormControl>
                 <FormLabel id="demo-row-radio-buttons-group-label" className="mb-2 font-semibold text-gray-700">Filtrar:</FormLabel>
                 <RadioGroup
                   row
                   value={filterValue}
                   aria-labelledby="demo-row-radio-buttons-group-label"
                   name="row-radio-buttons-group"
                   onChange={(e) => { setFilterValue(e.target.value)}}
                 >
                   <FormControlLabel value="van" control={<Radio size="small" />} label="Camioneta" />
                   <FormControlLabel value="motorbike" control={<Radio size="small" />} label="Motocicleta" />
                   <FormControlLabel value="automov" control={<Radio size="small" />} label="Automóvil" />
                   <FormControlLabel value="sinfiltro" control={<Radio size="small" />} label="Sin filtros" />
                 </RadioGroup>
               </FormControl>
               <div className="flex items-center">
               <input type="number" placeholder="Modelo" className="border rounded-md p-1 mt-1 w-1/4" onChange={(e) => {setModelValue(e.target.value)}} />
                 <Search className="hover:text-slate-500 cursor-pointer ml-1" height={20} width={20} onClick={handlePush}/> 
               </div>
       
               
             </div>
              )}
              {(filter !=='' || model !=='' ) ? (
                <span>No hay ofertas para el filtro y/o modelo seleccionado 💰</span>
              ): (
                <span>No hay ofertas para esta publicación 💰</span>
              )}
               
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
