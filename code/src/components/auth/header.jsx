import { Poppins } from "next/font/google";
import { cn }  from "@/lib/utils"

const font = Poppins({
    subsets: ['latin'],
    weight: ["600"]
})

export const Header = ({title="Autenticarse",label}) => {

    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn("text-2xl font-semibold animate-color-change text-center",font.className)}>
                ⚓️ {title} ⚓️
            </h1>
        <p className="text-muted-foreground text-sm">
            {label}
        </p>

        </div>
    )


}