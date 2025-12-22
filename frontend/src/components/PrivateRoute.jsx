import {Navigate, Outlet} from "react-router-dom";
import { useContext } from "react";
import { authContext } from "./authContext.jsx";

const PrivateRoute = () => {
    const {user, loading} = useContext(authContext);

    if(loading) {
        return <div>Loading...</div>
    }

    if(!user){
        return <Navigate to="/login" replace />
    } 

    return <Outlet />
}

export default PrivateRoute;

