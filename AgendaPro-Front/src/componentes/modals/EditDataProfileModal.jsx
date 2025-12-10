
import { useState } from "react";
import { getToken, getUser, setPersonalData } from "../../utils/user.utils";

export default function EditDataProfileModal({setModal, userData}) {

    const baseURL = import.meta.env.VITE_API_URL;
    const [error, setError] = useState(false); 

    async function handleSubmit(e){
        e.preventDefault();

        const session = getUser();
        
        if (!session){
            return;
        }

        let id = null;
        let tipoUsuario = "";

        if (session.tipoUsuario == 'profesional'){
            id = session.profesional.idUsuario;
            tipoUsuario = "profesional";
        }
        
        if (session.tipoUsuario == 'cliente'){
            id = session.cliente.idUsuario;
            tipoUsuario = "clientes";
        }
        
        if (!id ||!tipoUsuario){
            return;
        }

        const name = e.target.elements.name.value;
        const surname = e.target.elements.surname.value;
        const mail = e.target.elements.mail.value;
        const tel = e.target.elements.tel.value;

        setError(false);
        if (!name || !surname || !mail || !tel){
            setError(true);
        }

        const data = {
            "nombre": name,
            "apellido": surname,
            "email": mail,
            "celular": tel
        }

        const response = await updateUser(id, data, tipoUsuario);

        if (response === true){
            setModal(false);
        }
    }
        
    async function updateUser(id, data, tipoUsuario){

        const token = getToken();

        if (data.nombre === "" || data.apellido === "" || data.email === "" || data.celular === ""){
            setModal(true);
            setError(true);
            return;
        }

        return fetch(baseURL + tipoUsuario + "/perfil/" +id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json()) // Parse respuesta as JSON
            .then(response => {
                
                const user = response.data;
                // valido la consulta

                    
                if (response.statusCode && response.statusCode >= 400){
                    new Error(response.message);
                    return false;
                }
                
                setPersonalData(user);
       
                return true;
            })
            .catch(error => {
                 
                 const response = error.data || error;
                 return response, false;
            });
    }
        

    return(
        <>
            {/* <!-- MODAL TURNOS --> */}
  
            <div className="Profile__data-edit-modal-container">
                <div className="Profile__data-edit-modal">                
                    <div className="Profile__data-edit-modal-header">
                            <div className="close-btn-container">
                                <button className="close-btn" onClick={()=> setModal(false)}>✖</button>
                            </div>    
                    </div>        


                    <div className="Profile__data-edit-modal-body">
                        <div className="Profile__data-edit-modal-content">
                            <div className="Profile__data-edit-modal-info">
                                <h2>Editar Datos</h2>
                                <p>Puedes editar tus datos personales aquí</p>
                            </div>
                            
                            {/*  Mensaje de error   */}
                            { error && <span className="error-msg"> Debe rellenar todos los campos </span> }

                            <form onSubmit={(e) => handleSubmit(e)} className="Profile__data-edit-modal-form">
                                <div className="Profile__data-edit-modal-form-group">
                                    <label>Nombre</label>
                                    <input type="text" name="name"  defaultValue={userData.nombre}/>
                                </div>

                                <div className="Profile__data-edit-modal-form-group">
                                    <label>Apellido</label>
                                    <input type="text" name="surname"  defaultValue={userData.apellido}/>
                                </div>

                                <div className="Profile__data-edit-modal-form-group">
                                    <label>Email</label>
                                    <input type="text" name="mail"  defaultValue={userData.email}/>
                                </div>

                                <div className="Profile__data-edit-modal-form-group">
                                    <label>Telefono</label>
                                    <input type="text" name="tel"  defaultValue={userData.celular}/>
                                </div>
                                
                                <button className="btn" type="submit">
                                    <svg width="26px" height="26px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--color-4)">
                                        <path d="M3 7.5V5C3 3.89543 3.89543 3 5 3H16.1716C16.702 3 17.2107 3.21071 17.5858 3.58579L20.4142 6.41421C20.7893 6.78929 21 7.29799 21 7.82843V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V16.5" stroke="var(--color-4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        </path><path d="M6 21V17" stroke="var(--color-4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M18 21V13.6C18 13.2686 17.7314 13 17.4 13H15" stroke="var(--color-4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M16 3V8.4C16 8.73137 15.7314 9 15.4 9H13.5" stroke="var(--color-4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M8 3V6" stroke="var(--color-4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        </path><path d="M1 12H12M12 12L9 9M12 12L9 15" stroke="var(--color-4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    <span>
                                        Guardar Cambios
                                    </span>
                                </button>

                            </form>
                           
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}