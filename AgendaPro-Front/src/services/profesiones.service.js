import { getUser, getToken } from "../utils/user.utils";

const baseURL = import.meta.env.VITE_API_URL;
const tipoUsuario = 'clientes';

export async function getProfesiones(estados)
    {   
        return fetch(baseURL+ tipoUsuario +"/profesiones", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getToken()
            },
        })
            .then(response => response.json()) // Parse respuesta as JSON
            .then(response => {
                const profesiones = response;
                
                // valido la consulta
                if (response.statusCode && response.statusCode >= 400){
                    new Error(response.message);
                    return false;
                }

                 // Redirect to home
                return profesiones;
            })
            .catch(error => {
                 
                 const response = error.data || error
                 console.log(error);
                 return false;
            });
}