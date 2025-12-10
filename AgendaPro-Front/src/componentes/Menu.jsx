import imagen from "/img/profile-img.png"
import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { getUser, getPersonalData } from "../utils/user.utils";
import { REFRESH_EVENT_NAME } from '../utils/profile.utils';

export default function Menu() {

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

    const homeUrl = "/" + user.tipoUsuario;

    return( 
            <div className="header-container">
            <div className="logo-container">
                <Link to={homeUrl}>
                    <h1 className="logo"> AgendaPro </h1>
                </Link>
                
            </div>
    
            
           <Link to="/perfil" className="profile-container">
                <img src={(imageUrl) ? imageUrl : imagen} alt="Profile Photo" className="header-profile-img"/>
            </Link>
            
            </div>
    )
             
    
}

