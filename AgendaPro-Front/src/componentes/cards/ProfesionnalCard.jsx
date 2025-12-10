import React from 'react'
import { Link } from "react-router-dom";
import imagen from "/img/profile-img.png"

export default function ProfessionalCard({profesional}) {
    let avatarImg = (profesional.imagen) ? profesional.imagen : imagen;
    return(
        <Link to={"/cliente/profesional/"+profesional.idUsuario} className="professional-card">

            <div className="avatar">
                <img src={avatarImg} alt="Profile Photo" className="avatar-img"/>
            </div>
            
            <div className="professional-info">
                <div className="professional-name">{profesional.nombre + " " + profesional.apellido}</div>
                <div className="professional-badge">{profesional.profesion.descripcion}</div>
            </div>

            <div className="arrow"> → </div>
 
        </Link>
    )
}