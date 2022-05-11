import { getUser } from "./service/authorize";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute=()=>{

    return (
        getUser() ? <Outlet /> : <Navigate to="/login" />
    )
}

export default AdminRoute;