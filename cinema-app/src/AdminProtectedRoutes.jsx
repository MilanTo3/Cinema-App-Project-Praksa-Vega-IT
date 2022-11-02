import { Navigate, Outlet } from "react-router-dom";
import Frontpage from "./Pages/frontPage/frontPage";

const UseAuth = () => {
    var user = JSON.parse(localStorage.getItem("loggedInUser"));
    var role = "none";
    
    console.log('here');
    if(user){
        role = user.role;
        console.log(user, role);
    }

    return role;
}

const IsAdmin = () => {
    var user = JSON.parse(localStorage.getItem("loggedInUser"));
    var role = user.role;

    return role === "admin" ? <Outlet/> : <Navigate to="/" />
}

const IsLoggedIn = () => {
    var user = JSON.parse(localStorage.getItem("loggedInUser"));
    var role = user.role;

    return role ? <Outlet/> : <Navigate to="/" />
}

export {IsAdmin, IsLoggedIn}