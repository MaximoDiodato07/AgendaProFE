
import { useEffect } from 'react';

export default function OperationMessage({ message, setModalVisible }) {

    if (message == null) {
        "Operación Exitosa";
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setModalVisible(false);
        }, 3000); // 3 segundos

        // Función de limpieza para cancelar el temporizador si el componente se desmonta antes
        return () => clearTimeout(timer);
    }, [setModalVisible]);

    const closeHandle = () => {
        setModalVisible(false);
        setMessage(null);
    }

    return (  
            <>
            {/* Contenedor principal del modal */}
            <div className="success__modal-content" >
                <button onClick={closeHandle} className="success__close-btn-container">
                    <h3 className="success__modal-title">{message} </h3>               
                </button>
            </div>
            </>    
    );
}