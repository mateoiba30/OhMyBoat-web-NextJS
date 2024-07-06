import { db } from "@/lib/db"
export const getAllEmployees = async () => {
    try{
        const empleados = await db.user.findMany({
            where: {
                role: 'MANAGER'
            }
        })
    
        console.log(empleados);
        return empleados;
    } catch {
        console.error('Error al obtener empleados');
    }


}