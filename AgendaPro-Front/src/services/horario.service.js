import { getUser, getToken } from "../utils/user.utils";

const baseURL = import.meta.env.VITE_API_URL;
const user = getUser();

// Solo usado por profesional
export async function getHorariosProfesional(){
    return fetch(baseURL+"profesional/horarios", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
    })
        .then(response => response.json()) // Parse respuesta as JSON
        .then(response => {
            const horarios = response.horarios;             
            // valido la consulta
            if (response.statusCode && response.statusCode >= 400){
                new Error(response.message);
                return false;
            }
            return horarios;
        })
        .catch(error => {
             
             const response = error.data || error
             console.log(error);
             return false;
    });
}