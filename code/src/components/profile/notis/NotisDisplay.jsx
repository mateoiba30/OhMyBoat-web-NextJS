"use client"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Separator } from "@radix-ui/react-menubar"
import Link from "next/link"

export const NotisDisplay = ({ notificacionesArray }) => {
  return (
    <div className="mx-auto mt-6 p-4">
      <div className="p-4">
        {notificacionesArray.length === 0 ? (
        <h4 className="mb-4 text-2xl font-semibold text-center text-blue-400">
            No hay notificaciones por el momento
          </h4>
        ) : (
          <h4 className="mb-4 text-2xl font-semibold text-center text-blue-400">
            Historial de notificaciones
          </h4>
        )}

        <Separator className="my-4" />

        <ScrollArea className="h-80">
          <div className="p-4 space-y-4">
            {notificacionesArray.slice().reverse().map((notif) => (
              <div key={notif.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <div className="mb-1 text-lg font-semibold text-gray-800">
                  {notif.title}
                </div>
                <div className="text-sm text-gray-700">
                  {notif.description}
                </div>
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
