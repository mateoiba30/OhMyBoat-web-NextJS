  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../ui/card";
  import Link from "next/link";
  import { Button } from "../ui/button";
  import { Separator } from "../ui/separator";

  
  export default function ProfileComponentInfa({ firstname, lastname, cellphone, birthday, email, password, role,userId }) {
    console.log(userId)
    const showedPassword = password.replace(/./g, "*");
    let rol = "";
    if (role === "ADMIN") {
      rol = "Dueño";
    }
    if (role === "USER") {
      rol = "Usuario"
    }
    if (role === "MANAGER") {
      rol  = "Gerente"
    }
    return (
      <div className="flex items-center justify-center h-screen">
        <div style={{ width: "50%", height: "85%" }}>
          <div className="bg-sky-600 rounded-lg shadow-md p-4">
            <Card>
              <CardHeader>
                <CardTitle className="hover:text-blue-500 cursor-pointer">
                    Mi perfil
                    </CardTitle>
                <CardDescription>Datos personales:</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                <p className="mb-2 ">
                  <span className="font-semibold hover:text-sky-500">Nombre:</span> {firstname} 
                </p>
  
                <p className="mb-2">
                  <span className="font-semibold hover:text-sky-500">Apellido:</span> {lastname} 
                </p>
  
                <p className="mb-2">
                  <span className="font-semibold hover:text-sky-500">Teléfono:</span> {cellphone}
                </p>
                <p className="mb-2">
                  <span className="font-semibold hover:text-sky-500">Fecha de Nacimiento:</span> {birthday}
                </p>
                <p className="mb-2">
                  <span className="font-semibold hover:text-sky-500">Email:</span> {email}
                </p>
                <p className="mb-2">
                  <span className="font-semibold hover:text-sky-500">Contraseña:</span> {showedPassword}
                  <Link href="/auth/new-password-logged">
                  <button className="ml-2 text-sm font-semibold transition duration-300 ease-in-out hover:text-blue-700 cursor-pointer">Cambiar contraseña</button>
                  </Link>
                </p>
                <p className="mb-2">
                  <span className="font-semibold hover:text-sky-500">Rol:</span> {rol}
                </p>
                </div>
                <Separator />
              </CardContent>
              <CardFooter>
                <div>
                <Link href="/profile/update-profile">
                <Button className="mr-2 hover:text-blue-700" variant="ghost">Editar perfil</Button>
                </Link>
                { role==="USER" && (
                <>
                <Link href="/profile/my-trades">
                <Button className="mr-2 hover:text-blue-700" variant="ghost">Trueques</Button>
                </Link>

                {/* <Link href="/profile/reviews">
                <Button className="mr-2 hover:text-blue-700" variant="ghost">Mis reseñas</Button>
                </Link> */}

                  
                <Link href={`/view-reviews/${userId}`}>
                <Button className="mr-2 hover:text-blue-700" variant="ghost">Mis reseñas</Button>
                </Link>

                <Link href={"/profile/own-posts"}>
                <Button className="hover:text-blue-700" variant="ghost">Publicaciones</Button>
                </Link>

                <Link href="/profile/my-offers">
                <Button className="hover:text-blue-700" variant="ghost">Mis ofertas</Button>
                </Link>
                  
                
                </>
                )}
                { role === "MANAGER" && (
                  <>
                  <Link href="/manager/trueques-pendientes">
                  <Button className="hover:text-blue-700" variant="ghost">Trueques pendientes</Button>
                  </Link>

                  <Link href="/manager/trueques-revisados">
                  <Button className="hover:text-blue-700" variant="ghost">Trueques revisados</Button>
                  </Link>
                  </>
                )}
                </div>
     

              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  