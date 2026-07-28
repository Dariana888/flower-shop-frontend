import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


export default function Navbar() {


    const navigate = useNavigate();


    const [role, setRole] = useState(null);

    const [token, setToken] = useState(null);






    useEffect(() => {


        const updateAuth = () => {


            setToken(
                localStorage.getItem("token")
            );


            setRole(
                localStorage.getItem("role")
            );


        };



        updateAuth();



        window.addEventListener(
            "storage",
            updateAuth
        );



        return () => {


            window.removeEventListener(
                "storage",
                updateAuth
            );


        };


    }, []);









    const logout = () => {


        localStorage.removeItem(
            "token"
        );


        localStorage.removeItem(
            "role"
        );


        setToken(null);

        setRole(null);



        navigate("/login");


    };









    return (


        <nav

            style={{

                padding:"15px",

                display:"flex",

                gap:"20px",

                alignItems:"center",

                borderBottom:"1px solid #ddd",

                background:"#fff"

            }}

        >





            <Link to="/">

                🌸 Home

            </Link>






            <Link to="/products">

                🌺 Products

            </Link>







            {
                token &&

                <>

                    <Link to="/cart">

                        🛒 Cart

                    </Link>





                    {
                        role !== "admin" &&

                        <Link to="/my-orders">

                            📦 My Orders

                        </Link>
                    }



                </>

            }









            {
                role === "admin" &&

                <>


                    <Link to="/admin/dashboard">

                        📊 Dashboard

                    </Link>





                    <Link to="/admin/orders">

                        🛠 Admin Orders

                    </Link>





                    <Link to="/admin/stock">

                        📦 Stock

                    </Link>





                    <Link to="/admin/bouquets">

                        🌺 Bouquets

                    </Link>




                </>


            }









            {
                token ?


                (

                    <button


                        onClick={logout}


                        style={{

                            cursor:"pointer",

                            padding:"6px 12px"

                        }}

                    >

                        Logout

                    </button>


                )


                :


                (

                    <Link to="/login">

                        Login

                    </Link>


                )


            }






        </nav>


    );


}