import { useState, useEffect } from "react";


export default function EditImageProfile({ setModalImage, imgUrl, onImageUpload }) {

  const [selectedFile, setSelectedFile] = useState(null);
  
  const [imagePreview, setImagePreview] = useState(null); 
  
  const [isDragging, setIsDragging] = useState(false); 
  
  // actualizo el estado y obtengo la imagen
  useEffect(() => {
    if (imgUrl) {
      setImagePreview(imgUrl);
    }
  }, [imgUrl]);

  const handleFile = (file) => {
    
    // al obtener un cambio de archivo, genero viste previa
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // La nueva URL temporal
    };
    reader.readAsDataURL(file);
  };

  // Manejo de la selección de archivo por el input estándar
  const handleFileChange = (event) => {
    handleFile(event.target.files[0]);
  };


  // ante la subida, evito el cambio del archivo
  const handleDragOver = (e) => { e.preventDefault(); };
  // cuando ingresa muestro vista previa
  const handleDragEnter = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length) {
      handleFile(droppedFiles[0]); 
    }
  };

  // ----------------------------------------------------
  // ENVÍO DEL FORMULARIO
  // ----------------------------------------------------
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imagen", selectedFile); 

    try {

      await onImageUpload(formData);
      
      setModalImage(false); // Cerrar al éxito

      
    } catch (apiError) {
      console.error("Error al subir la imagen:", apiError);  
    }
  };
  

  return(
    <>
    
            <div className="Profile__data-edit-modal-container">
                <div className="Profile__data-edit-modal">                
                    <div className="Profile__data-edit-modal-header">
                            <div className="close-btn-container">
                                <button className="close-btn" onClick={()=> setModalImage(false)}> ✖ </button>
                            </div>    
                    </div>     

                <div className="Profile__image-edit-modal-body">
                    
                    <form onSubmit={handleSubmit} className="Profile__image-edit-form">

                        {/* DRAG AND DROP AREA */}
                        <div 
                            className={`Profile__image-edit-drop-area ${isDragging ? 'is-dragging' : ''}`}
                            onDragOver={handleDragOver}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop} 
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                            <p>Arrastra y suelta tu imagen aquí</p>
                            <p>o</p>

                            <label htmlFor="file-upload" className="Profile__image-edit-select-button">
                                Seleccionar Archivo
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </div>

                        {/* VISTA PREVIA Y NOMBRE DEL ARCHIVO */}
                        {imagePreview && (
                            <div className="Profile__image-edit-preview-container">
                                <h3 className="Profile__image-edit-file-name">{selectedFile ? selectedFile.name : "Imagen Actual"}</h3>
                                <img 
                                    src={imagePreview} 
                                    alt="Vista Previa" 
                                    className="Profile__image-edit-preview-img"
                                />
                            </div>
                        )}

                        {/* BOTÓN DE SUBIDA */}
                        <button 
                            type="submit" 
                            className="Profile__image-edit-upload-button"
                            disabled={!selectedFile}
                        >
                            Guardar y Subir
                        </button>
                    </form>
                </div>
            </div>
        </div>
    
    </>
  )
}