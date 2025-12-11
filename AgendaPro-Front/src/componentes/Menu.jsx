import imagen from "/img/profile-img.png"
import { useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, getPersonalData, removeUser } from "../utils/user.utils";
import { REFRESH_EVENT_NAME } from '../utils/profile.utils';
import { showOperation } from "../App";

export default function Menu() {
    const navigate = useNavigate();
    const user = getUser();

    const [imageUrl, setImageUrl] = useState(getPersonalData().imagen); // Por defecto leo el loca storage
    useEffect(() => {
        const handleRefresh = () => {
            const freshImageUrl = getPersonalData().imagen;
            setImageUrl(freshImageUrl); 
        };

        // Me suscribo al evento y hago un callback de la funcion:
        document.addEventListener(REFRESH_EVENT_NAME, handleRefresh);

        // Desuscribo del evento
        return () => {
            document.removeEventListener(REFRESH_EVENT_NAME, handleRefresh);
        };
    }, []);


    const handleLogout = () => {
        removeUser();
        navigate('/login', { replace: true });
        showOperation("Sesión cerrada correctamente");
    };    


    const homeUrl = "/" + user.tipoUsuario;

    return( 
            <div className="header-container">
                <div className="logo-container">
                    <Link to={homeUrl}>
                        <h1 className="logo"> AgendaPro </h1>
                    </Link>
                    
                </div>
        
                <div className="links-container">
                
                    <Link to="/perfil" className="profile-container">
                        <img src={(imageUrl) ? imageUrl : imagen} alt="Profile Photo" className="header-profile-img"/>
                    </Link>
                    <button className="header-close-link" onClick={handleLogout}>
                        <img src="/img/close-session.png" className="header-close-link-img"/>
                    </button>
                    
                </div>
            
            </div>
    )
             
    
}

