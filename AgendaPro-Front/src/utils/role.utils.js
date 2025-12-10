import { getUser } from "./user.utils";

export const getUserRole = () => {
    
    const user = getUser();
    const role = user.tipoUsuario;
    console.log
    // Si no hay rol, devuelvo null.
    return role ? role : null; 
};