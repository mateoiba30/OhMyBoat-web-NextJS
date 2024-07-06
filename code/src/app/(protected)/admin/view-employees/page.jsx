
import ViewEmployeesComponent2 from "@/components/admin-components/viewEmployeesComponent2";
import { getAllEmployees } from "../../../../../actions/getEmployees";

  async function TableDemo() {
    const empleados = await getAllEmployees();
    console.log(empleados)
    return (
      <div>
        <ViewEmployeesComponent2 empleados={empleados}/>
      </div>
    );
  }
  
  export default TableDemo;
  
