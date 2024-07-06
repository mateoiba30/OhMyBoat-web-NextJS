import ViewSedeComponent from "@/components/admin-components/viewSedesComponent";
import { getAllSedes } from "../../../actions/sedes";
import { auth } from "../../../auth";
import { Card } from "@/components/ui/card";
import { MapPinOff } from "lucide-react";

export default async function ViewSedesPage() {
  const sedes = await getAllSedes();
  const session = await auth();
  const role = session.user?.role;

  return (
    <div className="p-4">
      {sedes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sedes.map((sede) => (
            <ViewSedeComponent sede={sede} key={sede.id} role={role}/>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
        <Card className="bg-white w-1/1 shadow-lg rounded-lg flex items-center justify-center">
          <div className="p-4 text-center">
            <MapPinOff size={40} className="text-red-500 mb-2" />
            <h1 className="text-xl font-semibold text-gray-700">
              No hay sedes registradas
            </h1>
          </div>
        </Card>
      </div>
      )}
    </div>
  );
}
