import { useState } from "react";
import { Link } from "react-router-dom";
import { getUser, getPersonalData, getToken, setCurrentProfileImageUrl } from "../../utils/user.utils";
import EditDataProfileModal from "../../componentes/modals/EditDataProfileModal";
import EditImageProfile from "../../componentes/modals/EditImageProfile";
import { notifyMenuRefresh} from '../../utils/profile.utils';
import { showLoading, hideLoading, showOperation } from '../../App';

// Imagen por defecto
import imagen from "/img/profile-img.png";

export default function Professional() {
    const homeUrl = "/" + getUser().tipoUsuario;
    const [modalProfileData, setModalProfileData] = useState(false);
    const [modalImage, setModalImage] = useState(false);

    const session = getPersonalData();
    if(!session){
        return <Navigate to="/login" replace />;
    }
 
    // 4. Función para manejar el envío y la llamada a la API
    const handleImageUpload = async (formData) => {
        // llamo al spinner al iniciar la peticion
        showLoading("Subiendo imagen");
        const token = getToken();
        const baseUrl = import.meta.env.VITE_API_URL; // URL de tu endpoint
        const session = getUser();
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

        try {
            await fetch(baseUrl + tipoUsuario +'/perfil/' + id + '/imagen', {
                method: 'POST',
                headers: {    
                    'Authorization': 'Bearer '+token,
                },
                body: formData,
            })
            .then(response => response.json()) // Parse respuesta as JSON
            .then(response => {
                             
                console.log(response);
                if (response.statusCode && response.statusCode >= 400){
                    new Error(response.message);
                    return false;
                }
                
               // Actualizo la imagen del perfil
                setCurrentProfileImageUrl(response.url);
                notifyMenuRefresh();
                
                
                setModalImage(false);
                showOperation(response.message);
       
                return true;
            })
            ;

        } catch (error) {
            console.error("Fallo la subida:", error.message);
            
            throw error; 
        }
        
        hideLoading();
    };

    return (
        <>
            <div className="Profile__main-container">
                <div className="Profile__presentation-container">

                    <div className="Profile__header-container">
                        <div className="Profile__header-bag">
                           <Link to={homeUrl}>
                                ⬅ Volver 
                           </Link> 
                        </div>
                        <div className="Profile__header-bag">
                            <h2 className="Profile__title">Mi Perfil</h2>
                        </div>
                    </div>
                    <div className="Profile__card">
                        <div className="Profile__info">
                            <h3 className="Profile__section-title">Información Personal</h3>

                            <div className="Profile__info-group">
                                <label className="Profile__info-label">Nombre</label>
                                <p className="Profile__info-value">{session.nombre} {session.apellido}</p>
                            </div>

                            <div className="Profile__info-group">
                                <label className="Profile__info-label">Email</label>
                                <p className="Profile__info-value">{session.email}</p>
                            </div>

                            <div className="Profile__info-group">
                                <label className="Profile__info-label">Telefono</label>
                                <p className="Profile__info-value"> {session.celular} </p>
                            </div>

                            <button className="Profile__btn-edit" onClick={()=> setModalProfileData(true)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-4)" strokeWidth="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                                Editar
                            </button>
                        </div>

                        <div className="Profile__photo-section">
                            <div className="Profile__photo">
                                <img 
                                src={ (session.imagen) ? session.imagen : imagen}
                                alt="Profile Photo" 
                                className="Profile__photo-img"/>
                            </div>
                            <button className="Profile__btn-upload" onClick={ () => setModalImage(true )}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                    <polyline points="21 15 16 10 5 21"></polyline>
                                </svg>
                                Subir Foto
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {
              (modalProfileData) ? <EditDataProfileModal setModal={setModalProfileData} userData={session}/> : null
            } 
            
            {
                (modalImage) ? 
                   <>
                    <EditImageProfile setModalImage={setModalImage} imageUrl={session.imagen} onImageUpload={handleImageUpload}/>
                   </>
                : null
            } 
            
            {/* <editProfesionalData/> */}
        </>
    );
}