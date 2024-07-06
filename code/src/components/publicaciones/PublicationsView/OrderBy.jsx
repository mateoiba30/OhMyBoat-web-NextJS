"use client"
import { useState, useEffect } from 'react';
import Sidebar from "@/components/Sidebar";
import CardPublicacion from "@/components/publicaciones/CardPublicacion";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

export default function OrderBy({ publicaciones }) {
  const [pageNumber, setPageNumber] = useState(1);
  const publicacionesPerPage = 12;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(publicacionesPerPage);
  const [fix,setFix] = useState(false);
  // function setFixedSideBar(){
  //   if (window.scrollY >= 500) {
  //     console.log("entro")
  //     setFix(true)
  //   } else {
  //     console.log("entro")
  //     setFix(false)
  //   }
  // }

  //window.addEventListener("scroll",setFixedSideBar)
  return (
      <div className="flex">
        {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col items-center bg-blancoahumado overflow-y-hidden">
      <h1 className="text-4xl font-semibold text-black border shadow-xl bg-white p-2 w-full text-center">
            Publicaciones 
          </h1>
        <section className="space-y-6 text-center mt-8">
          {publicaciones.length === 0 && (
            <div>
              <p className="text-black font-semibold">No hay publicaciones por el momento, vuelve más tarde...</p>
            </div>
          )}
          <section className="w-full px-4">
            <div  className="overflow-y-auto grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3" style={{ maxHeight: 580}} >
              {publicaciones.slice(startIndex, endIndex).map((publicacion) => (
                <CardPublicacion
                  key={publicacion.id}
                  modelo={publicacion.modelo}
                  titulo={publicacion.title}
                  img={publicacion.img}
                  isBoat={publicacion.boat}
                  idCompletePost={publicacion.idCompletePost}
                />
              ))}
            </div>
          </section>
        </section>
        <Pagination className="w-full">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={
                  startIndex === 0 ? "pointer-events-none opacity-50" : undefined
                }
                onClick={() => {
                  setStartIndex(startIndex - publicacionesPerPage);
                  setEndIndex(endIndex - publicacionesPerPage);
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className={
                  endIndex >= publicaciones.length ? "pointer-events-none opacity-50" : undefined
                }
                onClick={() => {
                  setStartIndex(startIndex + publicacionesPerPage);
                  setEndIndex(endIndex + publicacionesPerPage);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  );
}
