import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

export default function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const register = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            await api.post("/register", {
                username: username,
                email: email,
                password: password
            });

            alert("Account created successfully");

            navigate("/login");

        } catch (error) {
            console.error("Register error:", error);

            setError(
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
                width: "350px",
                margin: "80px auto",
                padding: "30px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                background: "#fff",
                boxSizing: "border-box"
            }}
        >
            <h2>🌸 Create Account</h2>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            <form onSubmit={register}>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                        boxSizing: "border-box"
                    }}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                        boxSizing: "border-box"
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                        boxSizing: "border-box"
                    }}
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "10px",
                        cursor: "pointer"
                    }}
                >
                    {loading ? "Loading..." : "Register"}
                </button>

            </form>

            <p
                style={{
                    textAlign: "center",
                    marginTop: "20px"
                }}
            >
                Ai deja cont?{" "}
                <Link to="/login">
                    Login
                </Link>
            </p>
        </div>
    );
}