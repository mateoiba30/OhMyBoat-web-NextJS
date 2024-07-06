import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "./data/user"
import { getUserById } from "./data/user"

export const { handlers, auth, signIn, signOut} = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)
        if (validatedFields.success) {
          const {email, password} = validatedFields.data;
          const user = await getUserByEmail(email)
          if (!user || !user.password) return null;

          const passwordsMatch = user.password === password

          if (passwordsMatch) {
            return user
          }
        } 
        return null
      }
    })
  ],
  callbacks: {
    async signOut(){
      return true
    },
    async signIn({user,account}){

      //if (account?.provider !== "credentials") { return true; } //si no es un inicio de sesion normal, retorno true
      const existingUser = await getUserById(user.id) //busco el usuario por el id del token(inicio de sesion)

      if (!existingUser?.emailVerified) {
        return false
      }


      return true; 
    },
    async session({token,session}){
      if (session.user && token.sub) {
        session.user.id = token.sub //asigno a la session el id del token
      }

      if(session.user && token.role){
        session.user.role = token.role //asigno a la session el rol del token
      }

      if(session.user && token.firstname){
        session.user.firstname = token.firstname //asigno a la session el rol del token
      }



      return session; 
    },
    async jwt({token}){
      if (!token.sub) return token; //no estoy logeado, retorno token

      const existingUser = await getUserById(token.sub) //busco el usuario por el id del token(inicio de sesion)

      if (!existingUser) return token; //si no existe el usuario, retorno token

      token.role=existingUser.role; //agrego el rol al token si es que el usuario existe
      token.firstname=existingUser.firstname; //agrego el nombre al token si es que el usuario existe
      return token; //siempre retonar el token, ya que lo puede usar directamente el middleware para detectar tipo de usuario
    }
  }
});

//pongo dantos en el token, de ahi lo asigno a la session y de ahi se cara desde up