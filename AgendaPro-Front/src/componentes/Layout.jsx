import { Outlet } from "react-router-dom";
import Menu from "./Menu"

export default function Layout() {
  
  
  return (
    <>
        {/* Creamos Menu estatico */}
        <Menu></Menu>

        {/* Contenido dinamico */}
        <Outlet />
    </>
  )
}