import { useState } from "react";
import { Link } from "react-router-dom";
import image from "/img/landing-img.png";
import AccordionItem from "../../componentes/AccordionItem";


// Datos de faqs
const faqs = [
    { title: '¿Cómo puedo contactar soporte?', content: 'Puedes escribirnos al correo diodatomaximo@gmail.com' },
    { title: '¿Puedo darme de baja?', content: 'Si, absolutamente, guardaremos tus datos personales y no compartiremos tus datos con nadie, por si decides volver' },
    { title: '¿Como funcionan los turnos?', content: 'Los turnos son un sistema de reserva de turnos para clientes, que te permite reservar solo tu turno y visualizar el estado, esperado la confirmacion del profesional' },
];

export default function Landing() {
  // --- MODAL ---
  const [modal, setModal] = useState(null);
  // --- ACORDEON ---
  const [openAccordion, setOpenAccordion] = useState(null); 
  const handleItemClick = (Accordion) => {
       // Cambiar el estado del accordion seleccionado
       setOpenAccordion(openAccordion === Accordion ? null : Accordion);
  };

  return (
    <>
      <div className="landing-container">
        <div className="image-container">
          <div className="background-box">
            <img
              src={image}
              alt="Landing Image"
              className="image-container-img"
            />
          </div>
        </div>

        <div className="text-container">
          <h1 className="logo"> AgendaPro </h1>
          <h2 className="slogan">
            Digitalizá tu agenda. Profesionalizá tu atención.
          </h2>
          <div className="info-container">
            <div className="client-data-container">
              <p>
                Encontrá el servicio que necesitás, elegí un turno que se ajuste
                a tus horarios, y gestioná tus citas desde tu celular. Sin
                llamadas, sin esperas.
              </p>
              <Link to="/login" className="btn primary-btn">
                Acceda Cliente
              </Link>
            </div>

            <div className="professional-data-container">
              <p>             
                Organizá tu agenda, permití que los clientes reserven solos y
                recibí notificaciones de citas confirmadas. Vos solo ocupate de
                atender.
              </p>
              <Link to="/login" className="btn secondary-btn">           
                Acceda Profesional
              </Link>
            </div>
          </div>
        </div>
      </div>

      <button className="floating-btn" onClick={() => setModal(true)}>
        ?<span>Preguntas frecuentes</span>
      </button>

    { (modal) ?
        <div className="faq-modal" id="faqModal">
          <div className="faq-modal-content">
              <div className="close-modal-container">
                  <button className="faq-close-btn" onClick={() => setModal(false)}>
                    &times;
                  </button>
              </div>
              <h2>Preguntas Frecuentes</h2>

              <div className="accordion">
                {faqs.map((item, Accordion) => (
                  <AccordionItem
                      key={Accordion}
                      title={item.title}
                      content={item.content}
                      isOpen={openAccordion === Accordion}
                      onClick={() => handleItemClick(Accordion)}
                  />
                ))}
              </div>
          </div>  
        </div>
      : ""
    }
      
    </>
  );
}
