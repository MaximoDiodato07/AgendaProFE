import { getUser, getToken } from "../utils/user.utils";

const baseURL = import.meta.env.VITE_API_URL;
const tipoUsuario = 'clientes';

export async function getProfesionales(estados)
    {   
        return fetch(baseURL+ tipoUsuario +"/profesionales", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getToken()
            },
        })
            .then(response => response.json()) // Parse respuesta as JSON
            .then(response => {
                const profesionales = response;             
                // valido la consulta
                if (response.statusCode && response.statusCode >= 400){
                    new Error(response.message);
                    return false;
                }

                 // Redirect to home
                return profesionales;
            })
            .catch(error => {
                 
                 const response = error.data || error
                 console.log(error);
                 return false;
            });
}

export async function getProfesional(idProfesional){
    return fetch(baseURL+ tipoUsuario +"/profesionales/"+idProfesional, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getToken()
            },
        })
            .then(response => response.json()) // Parse respuesta as JSON
            .then(response => {
                const profesional = response;             
                // valido la consulta
                if (response.statusCode && response.statusCode >= 400){
                    new Error(response.message);
                    return false;
                }

                 // Redirect to home
                return profesional;
            })
            .catch(error => {
                 
                 const response = error.data || error
                 console.log(error);
                 return false;
            });
}

export async function getHorariosProfesional(idProfesional){
    return fetch(baseURL+ tipoUsuario +"/profesional/"+idProfesional+"/horario", {
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

                 // Redirect to home
                return horarios;
            })
            .catch(error => {
                 
                 const response = error.data || error
                 console.log(error);
                 return false;
            });
}