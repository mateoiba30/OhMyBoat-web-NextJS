"use client"
import Link from 'next/link';
import 'primeicons/primeicons.css';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
export const CreateComponent = ({titulo,backLink=null}) =>{
  const router = useRouter();
  const handleReturn = () => {
    if (backLink) {
      router.push(backLink);
    }
    else{
      router.back();
    }
  }
  return (
    <div className="flex justify-center items-center h-screen">
    <div className="bg-sky-600 rounded-lg shadow-md p-4">
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
        <i className="pi pi-spin pi-cog" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></i>
        <span>{titulo}</span>
          <Button className="text-sm hover:text-sky-500" variant="link" onClick={handleReturn}>
            Volver
          </Button>        
      </div>
    </div>
    </div>
  );
}
