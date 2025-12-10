
import { useState } from 'react';
import ProfesionalesModal from '../modals/ProfesionalesModal';

export default function ClientCardHeader() {
    
    const [modal, setModal] = useState(false);

    return(
        <>
            <div className="title-container">
                        <h2> Mis turnos </h2>
                        <button className="btn secondary-btn addBtn" onClick={() => setModal(true)}>
                            <span className="plus-add"> + </span>
                            Nuevo turno 
                        </button>
            </div>

            { (modal) ? <ProfesionalesModal setModal={setModal} /> : null }
        </>

    )
}