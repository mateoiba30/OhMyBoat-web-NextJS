import { auth } from "../../../auth";
import { NewPasswordLoggedForm } from "./NewPasswordLoggedForm";
export async function NewPasswordFormAdapter () {
    const session = await auth();
    const { email } = session.user;
    console.log(email);
    return(
       <NewPasswordLoggedForm email={email} />
    )
}