import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";


export default function Login() {

    const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);



    const login = async (e) => {

        e.preventDefault();


        try {

            setLoading(true);


            const response = await api.post("/login", {

                email: email,

                password: password

            });



            // SAVE TOKEN

            localStorage.setItem(
                "token",
                response.data.access_token
            );



            // SAVE USER ROLE

            localStorage.setItem(
                "role",
                response.data.role || "user"
            );



            alert("Login successful");


            navigate("/");



        } catch (error) {


            console.log(
                "Login error:",
                error
            );


            alert(
                error.response?.data?.detail ||
                "Login failed"
            );



        } finally {


            setLoading(false);


        }

    };




    return (

        <div

            style={{
                width:"350px",
                margin:"80px auto",
                padding:"30px",
                border:"1px solid #ddd",
                borderRadius:"10px"
            }}

        >


            <h2>
                🌸 Flower Shop Login
            </h2>




            <form onSubmit={login}>



                <input

                    type="email"

                    placeholder="Email"

                    value={email}

                    onChange={(e)=>
                        setEmail(e.target.value)
                    }

                    style={{
                        width:"100%",
                        padding:"10px",
                        marginBottom:"15px"
                    }}

                    required

                />





                <input

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={(e)=>
                        setPassword(e.target.value)
                    }

                    style={{
                        width:"100%",
                        padding:"10px",
                        marginBottom:"15px"
                    }}

                    required

                />





                <button

                    type="submit"

                    disabled={loading}

                    style={{
                        width:"100%",
                        padding:"10px",
                        cursor:"pointer"
                    }}

                >

                    {
                        loading
                        ? "Loading..."
                        : "Login"
                    }


                </button>



            </form>



        </div>

    );

}