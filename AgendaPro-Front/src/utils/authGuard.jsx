import { Navigate, Outlet } from 'react-router-dom';
import { isLogged } from './user.utils'; // Tu función de validación

const PrivateRoute = () => {

    // 1. Obtener el estado
    const logged = isLogged();
    // 2. Si NO está logueado, redirige a /login.
    
    if (!logged) {
        return <Navigate to="/login" replace />;
    }

    // 3. Si SÍ está logueado, renderiza el componente Layout (que contendrá las rutas anidadas vía Outlet)
    return <Outlet />; 
};

export default PrivateRoute;