"use client"
import Link from "next/link";
import {     Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle, } from "../ui/card";
    
import { Button } from "../ui/button";

  export default function CardPublicacion({modelo, titulo, img, isBoat, idCompletePost}) {
      return (
          <div>
              <Card style={{ width: "100%", height: "100%" }}>
                  <CardHeader>
                      <CardTitle>{titulo}</CardTitle>
                      <CardDescription>{modelo}</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <div>
                          <img src={img} width='300' height='300' alt='Image' className="rounded-md"/> {/*  */} 
                      </div>
                  </CardContent>
                  <CardFooter>
                      {isBoat ? (
                        <Link href={`/viewPosts/view-ship/${idCompletePost}`}>
                            <Button className="bg-sky-500">Ampliar publicación</Button>
                        </Link>
                      ) : (
                        <Link href={`/viewPosts/view-vehicle/${idCompletePost}`}>
                        <Button className="bg-sky-500">Ampliar publicación</Button>
                    </Link>
                      )}

                  </CardFooter>
              </Card>
          </div>
      );
  }