import { useState } from 'react'

export default function ProfessionalCardHeader( {setEstado, estado, statusAlert} ) {

    const handleOptionClick = (optionKey) => {
        setEstado(optionKey)
    };

    return(
        <>
            <div className="professional-title-container">
                <h2> Panel de turnos </h2>
                <div className="radio-container">
            
                    {/* Pestaña "Por Confirmar" */}
                    <div 
                        className={`radio-item ${estado.includes('confirmado') ? 'active' : ''}`}
                        onClick={() => handleOptionClick(['confirmado'])}
                    >
                        ✔
                        Confirmados
                    </div>

                    {/* Pestaña "Proximos Turnos" */}
                    <div 
                        className={`radio-item ${estado.includes('pendiente') ? 'active' : ''}`}
                        onClick={() => handleOptionClick(['pendiente'])}
                    >
                        ⏳
                        Pendientes
                       { 
                        (statusAlert && estado.includes('confirmado')) // desactivo si no hay turnos pendientes, o estoy en la seccion pendientes
                        ?
                            <span className="pendent-alert"> 🔔 </span>
                        :
                            null
                       }
                    </div>

                </div>
            </div>

        </>

    )
}