/**
 * Rutas accesibles sin tener sesion iniciada
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification",
];

/**
 * Rutas que redirigen a la pagina de settings 
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/reset-password",
    "/auth/new-password",
];
/**
 * Nunca se va bloquear esta ruta ya que es para autenticarse
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Nunca se van a bloquear porque son rutas solo de vista
 */

export const viewPostsPrefix = "/viewPosts";
export const viewProfilePrefix = "/view-profile";
export const viewReviewsPrefix = "/view-reviews";

/**
 * Ruta por defecto despues de logearte
 */
export const DEFAULT_LOGIN_REDIRECT = "/profile";

/**
 * Ruta por defecto despues de cerrar sesion
 */
export const DEFAULT_SINGOUT_REDIRECT = "/viewPosts";

export const DEFAULT_FIRST_LOGIN_REDIRECT ="/viewPosts"
/**
 * Rutas accesibles solo si es admin
 */

export const adminRoutes = [
    "/admin/auth/register-manager",

];

/**
 * API PARA EL RESEND, CAMBIAR ACÁ
 */

export const RESEND_API_KEY = "re_NvqzqthW_Fr7iFzQtHJTZkFN7Msqt1o1T"