import React from 'react';

const Spinner = ({ isLoading, message }) => {
 
    let spinnerMessage = message || "Realizando opreaciones";
  
   
    if (!isLoading) {
        return null;
    }

    return (
        <div className="spinner-overlay">
            <div className="spinner-container">
                {/* Aquí puedes poner un icono de spinner SVG o CSS */}
                <div className="spinner-icon">
                    </div> 
                <p> {spinnerMessage}</p>
            </div>
        </div>
    );
};

export default Spinner;