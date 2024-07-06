"use client"
import React from "react";
import DataTable from "react-data-table-component";
import "@/components/profile/style.css"
import { Button } from "@/components/ui/button"

export const ProfileComponent = () => {

    const columns = [
        {
            name: "Estrellas",
            selector: row => row.stars,
            sortable: true,
        },
        {
            name: "Reseñado",
            selector: row => row.reviewed,
            sortable: true,
        },
        {
            name: "Descripción",
            selector: row => row.description,
            sortable: true,
        },
    ]

    const data = [
        {
            stars: "⭐️⭐️⭐️⭐️",
            reviewed: "Pepe",
            description: "Muy buen vehíuclo"
        },
        {
            stars: "⭐️⭐️⭐️⭐️",
            reviewed: "Ana",
            description: "alto idiota el que intercambio conmigo"
        },
        {
            stars: "⭐️",
            reviewed: "Infa",
            description: "este hdp me dio un Renault 12 con asientos de Taylor Swift"
        },
        {
            stars: "⭐️",
            reviewed: "Tincho",
            description: "no juega al fulvo"
        },
        {
            stars: "⭐️",
            reviewed: "Juani",
            description: "es de estudiantes (creo)"
        },
        {
            stars: "⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️",
            reviewed: "La mamá de Juani",
            description: "excelente servicio"
        },
        {
            stars: "⭐️",
            reviewed: "Mate",
            description: "malísima experiencia"
        },
        {
            stars: "⭐️⭐️⭐️",
            reviewed: "Ramón",
            description: "auto roto"
        },
        {
            stars: "⭐️⭐️⭐️",
            reviewed: "Héctor",
            description: "tipo medio raro"
        },
        {
            stars: "⭐️⭐️⭐️",
            reviewed: "Luis",
            description: "podría mejorar el servicio"
        },
        {
            stars: "⭐️⭐️⭐️⭐️⭐️",
            reviewed: "Luciana",
            description: "una genia"
        }
    ]

    function Loader(){
        return (
            <h1>Cargando...</h1>
        )
    }
    return (
        <div>

            <div className="contenedorPrincipal">
                <div className="contenedor">
                    <img className="foto" src="/unknown-user.png" />
                </div>

                <div className="informacionTotal">
                    <p className="parrafo-estetico">nombre y apellido: </p>
                    <p className="parrafo-estetico">fecha de nacimiento: </p>
                    <p className="parrafo-estetico">mail:</p>
                    <p className="parrafo-estetico">telefono: </p>
                    <p className="parrafo-estetico">constraseña: ********</p>
                    <p className="parrafo-estetico">Puntuación: </p>
                </div>
            </div>

            <div className="contenedor">
                <Button className="boton">editar perfil</Button>
                <Button className="boton">modifcar clave</Button>
            </div>
            
            <div className="table-container">
                <DataTable
                    title="Reseñas Que Escribí"
                    columns={columns}
                    data={data}
                    pagination
                    fixedHeader
                    progressComponent={<Loader/>}
                />
            </div>

            <div className="table-container">
                <DataTable
                    title="Reseñas Que Me Hicieron"
                    columns={columns}
                    data={data}
                    pagination
                    fixedHeader
                    progressComponent={<Loader/>}
                />
            </div>
            
        </div>
    );
};
