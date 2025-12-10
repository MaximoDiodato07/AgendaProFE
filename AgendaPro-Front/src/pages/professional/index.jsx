import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { generateHours, generateDays } from "../../utils/hours.util";
import AddTurnModal from "../../componentes/modals/AddTurnModal";
import { getProfesional, getHorariosProfesional } from "../../services/profesional.service";
import { showLoading, hideLoading } from "../../App";

import imagen from "/img/profile-img.png";

const mapScheduleToEasierLookup = (horariosArray) => {
    return horariosArray.reduce((acc, current) => {
        // La clave es el día ID, el valor es el ARRAY de horas
        acc[current.diaSemana] = current.horasDisponibles;
        return acc;
    }, {});
};
export default function Professional() {

    const [modal, setModal] = useState(false);
    const [profesional, setProfesional] = useState(null);
    const [horariosProfesional, setHorariosProfesional] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
        (async () => {
            showLoading("Cargando datos");

            const profesionalApi = await getProfesional(id);
            const horariosApi = await getHorariosProfesional(id);

            setProfesional(profesionalApi);
            setHorariosProfesional(horariosApi);

            hideLoading();
        })();
    }, []);

    // Mapeo de horas, que se actualiza con el cambio de horariosProfesional, de manera sincrona
    const scheduleMap = useMemo(() => { // gestiona el cambio, para que se actualicen los horarios a medida que se cambian
        return mapScheduleToEasierLookup(horariosProfesional);
    }, [horariosProfesional]);

    const allHours = generateHours();
    const allDays = generateDays();


    return (

        (profesional)?
        <>
        <div className="professional__main-container">

            <div className="professional__presentation-container">
                <div className="professional__presentation-img-container">
                    <img src={ (profesional.imagen) ? profesional.imagen : imagen} alt="Dr. Torrado" className="profile-img" />
                </div>

                <div className="professional__presentation-info-container">
                    <h2 className="professional__presentation-name">  {profesional.nombre + " " + profesional.apellido}</h2>
                    <div className="professional__presentation-description">
                        <p>
                            {profesional.descripcion}
                        </p>
                    </div>
                </div>
            </div>

            <div className="professional__data-container">
                <div className="professional__data-contact">
                    <h2 className="professional__data-contact-title"> Datos de Contacto: </h2>

                    <div className="professional__data-contact-item">
                        <span>📞</span>
                        <p>{profesional.celular}</p>
                    </div>
                
                    <div className="professional__data-contact-item">
                        <span>✉️</span>
                        <p>{profesional.email}</p>
                    </div>

                    <div className="professional__data-contact-item">
                        <span>📍</span>
                        <p>{profesional.direccion}</p>
                    </div>

                </div>

                <div className="professional__data-horary">
                    <h2 className="professional__data-contact-title"> Horarios: </h2>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th> Hora </th>
                                    <th> Lunes </th>
                                    <th> Martes</th>
                                    <th> Miercoles </th>
                                    <th> Jueves </th>
                                    <th> Viernes </th>
                                    <th> Sabado </th>
                                    <th> Domingo </th>
                                </tr>
                            </thead>

                            <tbody className="hours-table-body">
                                
                                    
                                {allHours.map((hour) => (
                                    <tr key={hour} className="professional__data-horary-row">
                                    
                                        <td className="professional__data-hour">{hour.toString().padStart(2, '0')}:00</td>{allDays.map((dayId) => {
        
                                            let dayKey = dayId + 1;                         

                                            const hoursForDay = scheduleMap[dayKey] || []; 
                                            const isAvailable = hoursForDay.includes(hour);

                                            return (
                                                <td key={`${hour}-${dayId}`} className="professional__data-horary-row-time">
                                                    {isAvailable ? '✅' : '—'}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                                
                                   
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="professional__data-add-turn-container">
                        <button className="btn secondary-btn add-turn-btn" onClick={()=> setModal(true)}>
                            📅 Agendar turno
                        </button>
                    </div>
                    {   
                        (modal) 
                        ?   
                            (!horariosProfesional)
                            ? 
                                showLoading("Cargando datos")
                            :
                                <AddTurnModal setModal={setModal} profesionalId={id} horarios={horariosProfesional} /> 
                        : 
                            null
                    } 

                </div>

            </div>
        </div>
        </>
        : null
    );
}