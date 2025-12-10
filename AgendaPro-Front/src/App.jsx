import { Suspense, lazy, useState, useEffect } from "react"
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Spinner from "./componentes/Spinner";
import OperationResult from "./componentes/OperationMessage";

import Layout from "./componentes/Layout"
import PrivateRoute from "./utils/authGuard";
import RoleGuard from "./componentes/roleGuard";


// Lazy es una funcion que nos permite importar componentes de forma asíncrona, cuando se necesiten
// la uso para importar las paginas
const Dashboard = lazy(() => import('./pages/dashboard/index'));
const Professional = lazy(() => import('./pages/professional/index'));
const Profile = lazy(() => import('./pages/profile/index'));
const Login = lazy(() => import('./pages/login/index'));
const Landing = lazy(() => import('./pages/landing/index'));

// funciones globales del spinner
export let showLoading = () => {};
export let hideLoading = () => {};

// funciones para el modal de operacion
export let showOperation = (message) => {};
export let hideOperation = () => {};

function App() {
  // funcion del spinner
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // 🔑 NUEVOS ESTADOS PARA EL MODAL DE ÉXITO
    const [showOperationModal, setShowOperationModal] = useState(false);
    const [operationMessage, setOperationMessage] = useState(null);

    useEffect(() => {
        // funciones globales

        // Funciones para el spinner
        showLoading = (message) =>{
          setMessage(message);
          setLoading(true);
        } 
        hideLoading = () => setLoading(false);

        // Funciones para el modal de operación
        showOperation = (message) => {
            setOperationMessage(message);
            setShowOperationModal(true);
        }

        hideOperation = () => setShowOperationModal(false);

    }, []);

  return (
    <>

      {/* Spinner */}
      { 
        (loading) ?
        <Spinner isLoading={loading}
           message = {message}
        />
        : null
      }
  
      {/* Modal de notificacion */}
      { 
        (showOperationModal) 
        ? 
          <OperationResult
              message={operationMessage}
              setModalVisible={hideOperation} // La función hideOperation usa el estado correcto
          />
        : 
          null
      }

    
      {/* Creamos Suspense para cargar el componente principal */}
      <BrowserRouter>
        <Suspense>

            {/* Creamos Routes, contenedor de todas las rutas */}
            <Routes>

            <Route path="/" element={ <Landing /> } />
            <Route path="/login" element={<Login/>} />

              {/* Creamos PrivateRoute, que nos permite validar que el usuario esté logueado */}
              <Route element={<PrivateRoute />}>
                <Route path="/" element={ <Layout/> } >
                  {/* Solo se muestra el Dashboard si el usuario está logueado, y es cliente */}
                  <Route path="cliente" 
                    element={
                      <RoleGuard allowedRoles={['cliente']}>
                        <Dashboard/> 
                      </RoleGuard>
                    }
                  />

                  <Route path="cliente/profesional" 
                    element={ 
                      <RoleGuard allowedRoles={['cliente']}>
                        <Professional /> 
                      </RoleGuard>
                    }
                  >
                    
                    {/* Ruta dentro de cliente/profesional */}
                    <Route path=":id" element={ <Professional /> } />
                    
                  </Route>
                  
                  {/* ------------------------------------------------------------------------------- */}
                  {/* Ruta de los profesionales */}
                  <Route 
                    path="profesional" 
                    element={ 
                      <RoleGuard allowedRoles={['profesional']}>
                        <Dashboard/> 
                      </RoleGuard>
                    } 
                  />


                  {/* Ruta para ambos perfiles */}
                  <Route path="perfil" 
                    element={
                      <RoleGuard allowedRoles={['cliente', 'profesional']}>
                        <Profile/>
                      </RoleGuard>
                    } 
                  />
                        

                </Route>

              </Route>
                
                {/* Ruta por si no encuentra otra ruta */}
              <Route path="*" element={<h1>404 | Página no encontrada</h1>} />

            </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
