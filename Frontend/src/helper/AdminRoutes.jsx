import { Outlet,Navigate } from "react-router-dom";


const AdminRoutes = () => {
    let role = localStorage.getItem( 'role' );
    return(
        role === "teacher" ? <Outlet /> : <Navigate to={"/login"} />
    )
}


export default AdminRoutes;