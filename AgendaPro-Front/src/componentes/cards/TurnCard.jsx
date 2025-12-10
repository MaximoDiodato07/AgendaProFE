
import { showLoading, hideLoading, showOperation } from '../../App';
import { cancelTurn, confirmTurn } from '../../services/turno.service';
import { getUser } from '../../utils/user.utils';

export default function TurnCards({turno, setModal, recharge}) {

    const badgeClassName = (turno.estado === 'pendiente') ? "pending-icon status-badge" : "check-icon status-badge";
    const cardClassName = (turno.estado === 'pendiente') ? "pending-card consulta-card" : "confirmed-card consulta-card";
    const icon = (turno.estado === 'pendiente') ? "⏳" : "✔";
    let tipoUsuario = getUser().tipoUsuario;

    let nombre = (tipoUsuario === 'cliente') ? turno.profesional.nombre + " " + turno.profesional.apellido : turno.cliente.nombre + " " + turno.cliente.apellido;
  
    async function handleCancel() {
        showLoading("Cancelando turno");
        const response = await cancelTurn(turno.idTurno, tipoUsuario);
        if (response) {
            hideLoading(); 
            recharge();
            
            showOperation(response);
        }

        hideLoading();
    }
    
    async function handleConfirm() {
        showLoading("Confirmando turno");
        const response = await confirmTurn(turno.idTurno);
        
        if (response) {
            hideLoading();
            recharge();

            showOperation(response);
        }

        hideLoading();
    }


    return(
        <div className={cardClassName}>

            <div className="card-header">
                <h1 className="card-title">Consulta Estándar</h1>
                <div className={badgeClassName}><div className="icon"> {icon} {turno.estado} </div></div>
            </div>
            
            <div className="card-line"> </div>
            
            <div className="card-info-section">
                <div className="card-info-item">
                    <div className="card-info-icon">📅</div>
                    
                    <div className="card-info-text"> {turno.fecha} </div>
                    
                </div>
                
                <div className="card-info-item">
                    <div className="card-info-icon">🕐</div>
                    
                    <div className="card-info-text"> {turno.hora} </div>
                    
                </div>
                
                <div className="card-info-item">
                    <div className="card-info-icon">
                        { (tipoUsuario === 'cliente') ? "👨‍💼" : "👦" }
                    </div>
                    
                    <div className="card-info-text"> {nombre} </div>
                    
                </div>
                
                {
                    (tipoUsuario === 'cliente') ?
                        <div className="card-info-item">
                            <div className="card-info-icon">📍</div>

                            <div className="card-info-text">{turno.lugar}</div>

                        </div>
                        : null                 
                }
                
            </div>
            
            <div className="card-line"> </div>
            
            <div className="card-buttons">

                {  (tipoUsuario === 'cliente') 
                ?
                    <button className="btn primary-btn cancel-turn-btn" onClick={()=> handleCancel()}>
                        <span className="btn-icon">✕</span>
                        Cancelar
                    </button>
                :    
                <>
                    {(turno.estado === 'pendiente') 
                    ?    
                        <>                           
                        <button className="btn secondary-btn update-turn-btn" onClick={() => setModal(turno)}>
                            <span className="btn-icon">↻</span>
                            Reprogramar
                        </button>

                            <button className="btn primary-btn confirm-turn-btn" onClick={() => handleConfirm()}>
                                <span className="btn-icon">✔</span>
                                Confirmar
                            </button>
                        </>     
                    :
                        <button className="btn primary-btn cancel-turn-btn" onClick={()=> handleCancel()}>
                            <span className="btn-icon">✕</span>
                            Cancelar
                        </button>        
                    }
                </> 
                    
                }
                
            </div>
        </div>
    )
}