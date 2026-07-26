import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


export default function Navbar() {


    const navigate = useNavigate();


    const [role, setRole] = useState(
        localStorage.getItem("role")
    );


    const token = localStorage.getItem("token");



    useEffect(()=>{


        const update = ()=>{

            setRole(
                localStorage.getItem("role")
            );

        };


        window.addEventListener(
            "storage",
            update
        );


        return ()=>{

            window.removeEventListener(
                "storage",
                update
            );

        };


    },[]);





    const logout = ()=>{


        localStorage.removeItem(
            "token"
        );


        localStorage.removeItem(
            "role"
        );


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




            <Link to="/cart">
                🛒 Cart
            </Link>




            <Link to="/orders">
                📦 Orders
            </Link>





            {
                role === "admin" &&

                <>

                    <Link to="/admin/dashboard">

                        📊 Dashboard

                    </Link>



                    <Link to="/admin/orders">

                        🛠 Admin Orders

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