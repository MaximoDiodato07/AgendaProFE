// React
import { useEffect, useState, useCallback } from "react";

// Utils
import { getUser } from "../../utils/user.utils";

// Services

import { getTurns, getPendentsTurn } from "../../services/turno.service";
import { getHorariosProfesional } from "../../services/horario.service";
// Componentes
import TurnCards from "../../componentes/cards/TurnCard";
import ClienteCardHeader from "../../componentes/headers/ClientHeader";
import ProfessionalCardHeader from "../../componentes/headers/ProfessionalHeader";
import EditTurnModal from "../../componentes/modals/EditTurnModal";

export default function Dashboard() {
  
  // Contador para notificar que la data de los turnos necesita ser recargada
  const [doRecharge, setDebeRecargar] = useState(0);

  const [modal, setModal] = useState(0);
  const user = getUser();
  const estadoInitial = (user.tipoUsuario === 'profesional') ? ["confirmado"] : ["pendiente", "confirmado"];
  const [estadoTurno, setEstadoTurno] = useState(estadoInitial);
  const [turnos, setTurnos] = useState([]);
  const [alert, setAlert] = useState(false);
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    // funcion auto-ejecutada
    (async () => {
      const turnosApi = await getTurns(estadoTurno);
      setTurnos(turnosApi);
      console.log(turnosApi);
    })();
     
  }, [estadoTurno, doRecharge]); // Solo se ejecutará cuando el estado cambie
  
  useEffect(() => { 
       (async () => {
           const turnosPendientes = await getPendentsTurn();
           setAlert(turnosPendientes);
        })();
   
  },[doRecharge]);

  if (user.tipoUsuario === 'profesional') {
    useEffect(() => { 
      (async () => {
        const horariosProfesional = await getHorariosProfesional();
        setHorarios(horariosProfesional);
      })();
      
    },[]);
  }
  

  // Función para notificar que la data de los turnos necesita ser recargada
    const handleRecargaTurnos = useCallback(() => {
        
        setDebeRecargar(prev => prev + 1);
    }, []);


  return (
  <>
    <div className="card-main-container">
    
      {(user.tipoUsuario === 'cliente') ? 
        <ClienteCardHeader />
        : 
        <ProfessionalCardHeader setEstado={setEstadoTurno} estado={estadoTurno} statusAlert={alert}/>
      }
        
      <div className="card-container">
        {
          (turnos.length === 0 ) 
          ? 
            <div className="no-turnos-container">
              <h2>No hay turnos pendientes</h2>
            </div>
          :
            turnos.map((turno) => <TurnCards key={turno.id} turno={turno} setModal={setModal} recharge={handleRecargaTurnos} />)
        }
        
      </div>
    </div>

    {
      (modal != 0) 
      ? 
        <EditTurnModal setModal={setModal} turno={modal} horarios={horarios} recharge={handleRecargaTurnos} />
      : null
    }
      
  </>
  )
}