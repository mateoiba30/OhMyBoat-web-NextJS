"use client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function ContactPopover({ name, email, phone,lastname,userId}) {

  console.log(userId)
  return (

    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link" className="text-sm">{name} {lastname} </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="">
            <div className="items-center">
              <Link href={`/view-profile/${userId}`}>
              <span className="text-sm font-bold hover:text-sky-700">Ver perfil</span>
              </Link>
              <Separator className="mb-2 mt-2"></Separator>
              <h1 className="font-semibold text-sm">Información de contacto</h1>
              <span className="text-sm font-semibold">Email:  </span>
              <span className="text-sm">{email}</span>
            </div>
            <div className="items-center">
              <span className="text-sm font-semibold">Teléfono:  </span>
              <span className="text-sm">{phone}</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}