import * as z from "zod"

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email requerido",
    }),
    emailConfirmation: z.string().email({
        message: "Email requerido",
    
    }),

}) 

export const NewPasswordSchema = z.object({
    password: z.string().min(6,{
        message: "Minimo 6 caracteres requeridos."
    }), //no bloquear con min por ser login es buena practica
    confirmPassword: z.string().min(6,{
        message: "Minimo 6 caracteres requeridos."
    }), //no bloquear con min por ser login es buena practica    
})

export const NewPasswordLoggedSchema = z.object({
    previousPassword: z.string().min(6,{
        message: "Mínimo 6 caracteres requeridos."
    }),
    newPassword: z.string().min(6,{
        message: "Mínimo 6 caracteres requeridos."
    }), //no bloquear con min por ser login es buena practica   
    confirmPassword: z.string().min(6,{
        message: "Mínimo 6 caracteres requeridos."
    }), //no bloquear con min por ser login es buena practica 
})


export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email requerido",
    }),
    password: z.string().min(1,{
        message: "Contraseña requerida"
    }), //no bloquear con min por ser login es buena practica    
}) 



export const RegisterSchema = z.object({
    firstname: z.string().min(1,{
        message: "Ingresa un nombre."
    }),
    lastname: z.string().min(1,{
        message: "Ingresa un apellido."
    }),
    cellphone: z.string().min(1,{
        message: "Ingresa un telefono."
    }),
    birthday: z.string().refine((value) => {
        // Convertir la cadena de fecha en un objeto Date
        const dateOfBirth = new Date(value);
        // Obtener la fecha hace 18 años
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
        // Validar que la fecha de nacimiento sea menor o igual a la fecha hace 18 años
        return dateOfBirth <= eighteenYearsAgo;
      }, {
        // Mensaje de error si la validación falla
        message: "Debes tener al menos 18 años para registrarte.",
    }),
    email: z.string().email({
        message: "Email requerido.",
    }),
    password: z.string().min(6,{
        message: "Mínimo 6 caracteres requeridos."
    }), //no bloquear con min por ser login es buena practica  
    confirmPassword: z.string().min(6,{
        message: "Mínimo 6 caracteres requeridos."
    }), //no bloquear con min por ser login es buena practica
}) 

const FileSchema = z.object({
    name: z.string().max(255), // Validar el nombre del archivo
    size: z.number().min(1).max(10485760), // Validar el tamaño del archivo (1 byte mínimo, 10 MB máximo)
  });



export const UpdateProfileSchema = z.object({
    firstname: z.string().min(1,{
        message: "Ingresa un nombre."
    }),
    lastname: z.string().min(1,{
        message: "Ingresa un apellido."
    }),
    cellphone: z.string().min(1,{
        message: "Ingresa un telefono."
    }),
    email: z.string().email({
        message: "Email requerido.",
    }),

})

export const BoatSchema = z.object({
    title: z.string().min(1,{
        message: "Ingresa un titulo",
    }),
    modelo: z.string().min(1,{
        message: "Ingresa un modelo"
    }), 
    descripcion: z.string().min(1,{
        message: "Ingresa una descripcion"
    }), 
    matricula: z.string().min(1,{
        message: "Ingresa una matricula"
    }),
    eslora: z.string().min(1,{
        message: "Ingresa una eslora"
    }),
    manga: z.string().min(1,{
        message: "Ingresa una manga"
    }),
    metros: z.string().min(1,{
        message: "Ingresa los metros"
    }),
    deuda: z.string().min(1,{
        message: "Ingresa la deuda"
    }),
    image: FileSchema,
}) 


export const RegisterManagerSchema = z.object({
    firstname: z.string().min(1,{
        message: "Ingresa un nombre."
    }),
    lastname: z.string().min(1,{
        message: "Ingresa un apellido."
    }),
    cellphone: z.string().min(1,{
        message: "Ingresa un telefono."
    }),
    birthday: z.string().refine((value) => {
        // Convertir la cadena de fecha en un objeto Date
        const dateOfBirth = new Date(value);
        // Obtener la fecha hace 18 años
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
        // Validar que la fecha de nacimiento sea menor o igual a la fecha hace 18 años
        return dateOfBirth <= eighteenYearsAgo;
      }, {
        // Mensaje de error si la validación falla
        message: "El gerente debe tener al menos 18 años para registrarse.",
    }),
    email: z.string().email({
        message: "Email requerido.",
    }),
    password: z.string().min(6,{
        message: "Mínimo 6 caracteres requeridos."
    }), //no bloquear con min por ser login es buena practica  
    confirmPassword: z.string().min(6,{
        message: "Mínimo 6 caracteres requeridos."
    }), //no bloquear con min por ser login es buena practica
}) 

export const TradeDateSchema = z.object({
    selectDate: z.string().refine((value) => {

        // Obtener la fecha actual y ajustarla para que no incluya la parte del tiempo
        console.log(value)
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000; // Obtiene el offset de la zona horaria en milisegundos
        const localISOTime = new Date(now - offset).toISOString().split('T')[0];
        console.log(localISOTime);
        // Validar que la fecha seleccionada sea igual o posterior a la fecha actual
        return value >= localISOTime;
      }, {
        // Mensaje de error si la validación falla
        message: "La fecha seleccionada debe ser igual o posterior a la fecha actual.",
    }),
});