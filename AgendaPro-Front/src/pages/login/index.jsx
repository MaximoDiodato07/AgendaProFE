import { useState } from "react";
import { Navigate } from "react-router-dom";
import { setUser,getUser, removeUser } from "../../utils/user.utils";
import { hideLoading, showLoading, showOperation } from "../../App";

export default function Login() {
    
    // -- Reseteo los datos de sesion

    //-----> Variables
    const baseURL = import.meta.env.VITE_API_URL;

    const [userState, setUserState] = useState(0);

    async function handleSubmit(e){
        e.preventDefault();

        // Obtener los valores del formulario
        const user = e.target.elements.user.value;
        const password = e.target.elements.password.value;

        if (!user || !password) {
            console.log("Falta el usuario o la contraseña");
            return;
        }

        let body = {
            "login": user,
            "password": password
        }

        const response = await login(body);
        

        if (response === true){
            const user = getUser();
            const url = "/" + user.tipoUsuario;

            // Redireccionar al usuario
            setUserState(url);
        }

    }
    
    async function login(body)
    {   
        showLoading("Iniciando sesión");
        removeUser();

        return fetch(baseURL+"auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json()) // Parse respuesta as JSON
            .then(response => {
                const user = response.user;
                const token = response.access_token;
                
                // valido la consulta
                if (response.statusCode && response.statusCode >= 400){
                    new Error(response.message);
                    return false;
                }

                setUser(user, token);
                
                hideLoading();
                showOperation("Sesión iniciada correctamente");
                 // Redirect to home
                return true;
            })
            .catch(error => {
                 
                hideLoading();
                 const response = error.data || error
                 console.log(error);
                 return false;
            });
    }

    

    return (
        <>
            {(userState !== 0) ? <Navigate to={userState} replace /> 
            :
                <div className="login-bg">
                    <div className="login-container">
                        <div className="login-logo-container">
                            <h1 className="login-logo"> AgendaPro </h1>
                        </div>
                        <form className="login-form-container" onSubmit={(e) => handleSubmit(e)}>

                            <div className="login-input-container">
                                <label htmlFor="user"> Usuario </label>
                                <input type="text" name="user" id="userName"/>
                            </div>  

                            <div className="login-input-container">
                                 <label htmlFor="password"> Contraseña </label>
                                <input type="password" name="password" id="userPassword" />
                            </div>

                            <div className="login-btn-container">
                                <button type="submit" className="btn primary-btn login-sendButton"> Iniciar Sesion </button>
                            </div>
                        </form>
                    </div>
                </div>
            }    
        </>
    )
}