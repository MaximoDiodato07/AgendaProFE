import React, { useState } from 'react';

function AccordionItem({ title, content, isOpen, onClick }) {
    return (
        // Añadimos la clase 'active' cuando el accordion-item está abierto
        <div className={`accordion-item ${isOpen ? 'active' : ''}`}>
            
            {/* manejo de apertura/cierre */}
            <div className="accordion-header" onClick={onClick}>
                {title}
                {/* añadir ícono + / - segun estado "isOpen" */}
                <span style={{ float: 'right', fontWeight: 'bold' }}>
                    {isOpen ? '' : '+'}
                </span>
            </div>
            
            {/* El CSS se encargará de mostrar/ocultar el accordion-content */}
            <div className="accordion-content">
                <p>{content}</p>
            </div>
        </div>
    );
}

export default AccordionItem;