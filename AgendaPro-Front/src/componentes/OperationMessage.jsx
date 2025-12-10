
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

    return (  
            <>
            {/* Contenedor principal del modal */}
            <div className="success__modal-content" >
                <h3 className="success__modal-title">{message} </h3>
                
            </div>
            </>    
    );
}