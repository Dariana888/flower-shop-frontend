import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";


export default function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);



    const register = async (e) => {

        e.preventDefault();


        try {

            setLoading(true);


            await api.post("/register", {

                username: username,
                email: email,
                password: password

            });


            alert("Account created successfully");


            navigate("/login");


        } catch(error) {


            console.error(
                "Register error:",
                error
            );


            alert(
                error.response?.data?.detail ||
                "Register failed"
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
                🌸 Create Account
            </h2>


            <form onSubmit={register}>


                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e)=>
                        setUsername(e.target.value)
                    }
                    required
                    style={{
                        width:"100%",
                        padding:"10px",
                        marginBottom:"15px"
                    }}
                />



                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>
                        setEmail(e.target.value)
                    }
                    required
                    style={{
                        width:"100%",
                        padding:"10px",
                        marginBottom:"15px"
                    }}
                />



                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>
                        setPassword(e.target.value)
                    }
                    required
                    style={{
                        width:"100%",
                        padding:"10px",
                        marginBottom:"15px"
                    }}
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
                        : "Register"
                    }

                </button>


            </form>


        </div>

    );

}