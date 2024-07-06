import 'primeicons/primeicons.css';
import { BoatForm } from '@/components/publicaciones/Boats/BoatForm';
import { CreateComponent } from '@/components/WorkingComponent';
export default function CreateBoat() {
  return (
    <div className="flex justify-center items-center h-screen space-x-10">
      {/* <CreateComponent titulo="Estamos trabajando para que puedas publicar tus barcos ⛵️"/> */}
      <BoatForm/> 
    </div>
  );
}


