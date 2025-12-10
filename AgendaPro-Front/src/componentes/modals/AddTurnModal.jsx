import { useState } from "react";
import { addTurn } from "../../services/turno.service";
import { showLoading, hideLoading, showOperation} from "../../App";
import { useNavigate } from "react-router-dom";



export default function AddTurnModal({setModal, profesionalId, horarios}) {
    const navigate = useNavigate();
    console.log(profesionalId);

    const [horas, setHoras] = useState(null);
    const [infoMessage, setInfoMessage] = useState("Seleccione una fecha");
    const [date, setDate] = useState(null);
    const [hour, setHour] = useState(null);
    const [isValidData, setIsValidData] = useState(false);

    const handleTimeClick = (hora) => {
        setHour(hora);
        setIsValidData(true);
    }

    function displayHours(e) {
        showLoading("Cargando horarios");
        
        setIsValidData(false);
        setHour(null);

        const fechaActual = new Date();
        const fechaSeleccionada = new Date(e);

        if (fechaSeleccionada <=fechaActual) {
            setHoras([]);
            setInfoMessage("La fecha seleccionada no es válida");
            hideLoading();
            return;
        }
        
        let dia = fechaSeleccionada.getDay() + 1; // <-- 0 es lunes en JS, y 1 en la BD
        let horariosFiltrados = horarios.filter(element => element.diaSemana === dia);
        if (horariosFiltrados[0]) {
            setDate(e)
            setHoras(horariosFiltrados[0].horasDisponibles)
        }else{
            setInfoMessage("No hay horarios disponibles para esa fecha");
            setHoras([]);
        }

       
        hideLoading();
    }

    async function handleSubmit () {
        showLoading("Creando turno");
        let formatedProfesionalId = parseInt(profesionalId);
        const response = await addTurn(formatedProfesionalId, date, hour);

        if (response) {
            hideLoading();
            navigate("/cliente", { replace: true }, { state: { message: "Turno creado correctamente" }});
            showOperation(response);
        }


    }

    return(
        <>

            {/* <!-- MODAL TURNOS --> */}
  
            <div className="add-turn-modal" id="add-turn-modal">
                <div className="add-turn-modal-content">

                    <div className="add-turn-modal-header">
                         <div className="close-btn-container">
                            <button className="close-btn" onClick={()=> setModal(false)}>✖</button>
                        </div>    
                        <h2> Agendar cita </h2>
                        <h3> Selecciona una fecha y hora para tu consulta </h3>
                    </div>

                    <div className="add-turn-modal-body">
                        <div className="day-container">
                             <label>📅 Fecha</label>
                             <input type="date" className="date-input" id="fecha" placeholder="Seleccione una fecha" onChange={(e) => displayHours(e.target.value)} />
                        </div>

                        <div className="hours-container">
                            <span>🕐 Horarios Disponibles</span>
                            <div className="time-container">
                                {(horas && horas.length > 0)
                                ?
                                    horas.map((hora, index) => {
                                        return (
                                            <button className={ (hour == hora) ? 'selected-time time-btn' : 'time-btn'} key={index} onClick={() => handleTimeClick(hora)}> {hora}:00 </button>
                                        )
                                    })
                                : 
                                    <span className="info-msg"> {infoMessage} </span>
                                }
                            </div>
                        </div>

                    </div>

                    <div className="add-turn-modal-footer">
                        <div className="add-turn-info">
                            <div>• Cada turno tiene una duración de 1 hora</div>
                            <div>• La fecha de turno es valida si es mayor la dia actual</div>
                        </div>
                                
                        <div className="add-turn-buttons">
                            {                    
                                (!isValidData)
                                ? 
                                    <span className="info-msg">Seleccione una fecha válida</span>
                                : null
                            }
                            <div>
                                <span></span>
                            </div>
                            <button className="btn secondary-btn get-date-button" disabled={!isValidData} onClick={() => handleSubmit()}> Agendar Cita </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}