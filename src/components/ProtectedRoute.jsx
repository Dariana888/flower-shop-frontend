import { Navigate } from "react-router-dom";


export default function ProtectedRoute({

    children,

    role

}) {


    const token = localStorage.getItem("token");

    const userRole = localStorage.getItem("role");



    // Nu este logat

    if (!token) {

        return (

            <Navigate
                to="/login"
                replace
            />

        );

    }



    // Verificare rol

    if (

        role &&

        userRole !== role

    ) {

        return (

            <Navigate
                to="/"
                replace
            />

        );

    }



    return children;


}