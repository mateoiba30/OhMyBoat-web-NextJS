"use server"
import { signOut } from "../auth";
import { DEFAULT_SINGOUT_REDIRECT } from "../routes";

export const CerradoDeSesion = async () => {
   await signOut({redirectTo: DEFAULT_SINGOUT_REDIRECT});
}