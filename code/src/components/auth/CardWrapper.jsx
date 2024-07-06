import {Card,CardContent,CardFooter,CardHeader} from "../ui/card"
import { Header } from "@/components/auth/header"
import { BackButton } from "@/components/auth/BackButton";
export const CardWrapper = ({children,headerLabel,backButtonLabel,backButtonHref,headerTitle}) => {

    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header title={headerTitle}
                label={headerLabel}/>
            </CardHeader>

            <CardContent>
                {children}
            </CardContent>

            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
        </Card>
    );
}