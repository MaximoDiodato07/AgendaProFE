import { useState, useEffect } from "react";

import ProfessionalCard from '../cards/ProfesionnalCard'
import { getProfesionales } from '../../services/profesional.service';
import { getProfesiones } from '../../services/profesiones.service';

export default function ProfesionalesModal({setModal}) {
    const [profesionales, setProfesionales] = useState([]);
    const [profesionalesFiltered, setProfesionalesFiltered] = useState([]);
    const [profesiones, setProfesiones] = useState([]);

    const [selectedProfesiones, setSelectedProfesiones] = useState([]);

    const handleSelect = (e) => {
        if (e.target.value === "") {
            setProfesionalesFiltered(profesionales);
        }
        else{
            setProfesionalesFiltered(profesionales.filter((profesional) => profesional.profesion.idProfesion == e.target.value));
        }
    };


    // Se ejecuta al iniciar el componente
    useEffect(() => {
        // funcion auto-ejecutada
        (async () => {
            const profesionalesApi = await getProfesionales();
            setProfesionales(profesionalesApi);

            // por defecto trae todo
            setProfesionalesFiltered(profesionalesApi);
            console.log(profesionalesApi);
            const profesionesApi = await getProfesiones();
            setProfesiones(profesionesApi);
        })();
    }, []);



    return(
        <> 
                <div className="modal" id="modal">
                    <div className="modal-content  professional-modal">

                        <div className="add-turn-modal-header">
                             <div className="close-btn-container">
                                <button className="close-btn" onClick={()=> setModal(false)}>✖</button>
                            </div>    
                            <h2> Busca un especialista </h2>
                            <h3> Encuentra el profesional ideal para tu consulta </h3>
                        </div>

                        <div className="modal-body">
                            <div className="filters-container">

                                {
                                    (profesiones.length > 0) 
                                    ?
                                    <>  
                                       
                                        <select name="profession" onChange={handleSelect} defaultValue={""} className="Professional-modal__select" placeHolder="Seleccione una profesion" >
                                            <option value="" selected className="Professional-modal__default-option" > Todas las profesiones </option>
                                            { profesiones.map((profesion) =>
                                               <option value={profesion.idProfesion} key={profesion.idProfesion} className="Professional-modal__option">{profesion.descripcion}</option>
                                            )}
                                        </select>
                                    </>
                                    : 
                                        null
                                }
                                

                            </div>

                            <div className="professional-card-container">
                               {
                                (profesionalesFiltered.length === 0) ?
                                <div className="no-profesionales-container">
                                    <h2>No hay profesionales disponibles</h2>
                                </div>
                                :
                                profesionalesFiltered.map((profesional) => <ProfessionalCard 
                                    key={profesional.idUsuario}
                                    profesional={profesional} 
                                />)
                               }


                            </div>

                        </div>

                    </div>
                </div>
        </>
    )
}