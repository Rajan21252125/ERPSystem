import { Outlet, Navigate } from "react-router-dom";

const StudentRoutes = () => {
    // Retrieve the role from localStorage
    let role = localStorage.getItem('role');
    
    // Check if the role is "student"
    return (
        role === "student" ? <Outlet /> : <Navigate to={"/login"} />
    );
}

export default StudentRoutes;
