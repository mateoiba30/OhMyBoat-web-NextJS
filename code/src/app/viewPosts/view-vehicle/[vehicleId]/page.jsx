import { getVehiclePostById } from "../../../../../data/posts"
import Link from "next/link"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { auth  } from "../../../../../auth";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CreateComponent } from "@/components/WorkingComponent";
import { VehicleView } from "@/components/publicaciones/Vehicles/VehicleView";

async function viewVehicle({ params }) {
  const session = await auth();
  const vehiclePost = await getVehiclePostById(params.vehicleId);
  
  console.log(vehiclePost);
  return (
    <div className="flex items-center justify-center h-screen">
      <VehicleView vehiclePost={vehiclePost} userSessionId={session?.user.id}  role={session?.user?.role}/>
    </div>
  );
}

export default viewVehicle;
