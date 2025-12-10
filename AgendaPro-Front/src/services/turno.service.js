import { getUser, getToken } from "../utils/user.utils";

const baseURL = import.meta.env.VITE_API_URL;
const user = getUser();
let tipoUsuario = user.tipoUsuario;


export async function getTurns(estados)
{   
    if (user.tipoUsuario === 'cliente'){
        tipoUsuario = "clientes";
    }
    return fetch(baseURL+ tipoUsuario +"/turnos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify({"estados" : estados})
    })
        .then(response => response.json()) // Parse respuesta as JSON
        .then(response => {
            const turnos = response;
            
            // valido la consulta
            if (response.statusCode && response.statusCode >= 400){
                new Error(response.message);
                return false;
            }
             // Redirect to home
            return turnos;
        })
        .catch(error => {
             
             const response = error.data || error
             console.log(error);
             return false;
        });
}

export async function getPendentsTurn()
{   

    return fetch(baseURL + "profesional/turnos/pendientes/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
    })
        .then(response => response.json()) // Parse respuesta as JSON
        .then(response => {
            const turno = response;
            // valido la consulta
            if (response.statusCode && response.statusCode >= 400){
                new Error(response.message);
                return false;
            }
             // Redirect to home
            return response;
        })
        .catch(error => {
             
             const response = error.data || error
             console.log(error);
             return false;
        });
}

export async function addTurn(idProfesional, fecha, hora)
{   
    const data ={
        "idProfesional" : idProfesional,
        "fecha" : fecha,
        "hora" : hora
    }

    return fetch(baseURL + "clientes/turno/crear", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json()) // Parse respuesta as JSON
        .then(response => {
            const turno = response;
            // valido la consulta
            if (response.statusCode && response.statusCode >= 400){
                new Error(response.message);
                return false;
            }
     
            return response.message;
        })
        .catch(error => {
             
             const response = error.data || error
             console.log(error);
             return false;
        });
}



export async function cancelTurn(idTurno, tipoUsuario)
{   
    if (tipoUsuario === 'cliente'){
        tipoUsuario = "clientes";
    }

    return fetch(baseURL + tipoUsuario + "/turno/cancelar/"+idTurno, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        }
    })
        .then(response => response.json()) // Parse respuesta as JSON
        .then(response => {
            const turno = response;
            console.log(turno)
            // valido la consulta
            if (response.statusCode && response.statusCode >= 400){
                new Error(response.message);
                return false;
            }
             // Redirect to home
            return response.message;
        })
        .catch(error => {
             
             const response = error.data || error
             console.log(error);
             return false;
        });
}

export async function confirmTurn(idTurno)
{
    return fetch(baseURL + tipoUsuario +"/turno/confirmar/"+idTurno, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
    })
        .then(response => response.json()) // Parse respuesta as JSON
        .then(response => {
            const turno = response;
            // valido la consulta
            if (response.statusCode && response.statusCode >= 400){
                new Error(response.message);
                return false;
            }
             // Redirect to home
            return response.message;
        })
        .catch(error => {
             
             const response = error.data || error
             console.log(error);
             return false;
        });
}

export async function updateTurn(idTurno, fecha, hora)
{   

    const data = {
        "nuevaFecha": fecha,
        "nuevaHora": hora
    }
    return fetch(baseURL + tipoUsuario +"/turno/reprogramar/"+idTurno, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json()) // Parse respuesta as JSON
        .then(response => {
            const turno = response;
            // valido la consulta
            if (response.statusCode && response.statusCode >= 400){
                new Error(response.message);
                return false;
            }
             // Redirect to home
            return response.message;
        })
        .catch(error => {
             
             const response = error.data || error
             console.log(error);
             return false;
        });
}

