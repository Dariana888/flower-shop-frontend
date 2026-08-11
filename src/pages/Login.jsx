import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const login = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const response = await api.post("/login", {
                email,
                password
            });

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            localStorage.setItem(
                "role",
                response.data.role || "user"
            );

            navigate("/");

        } catch (error) {
            console.error("Login error:", error);

            setError(
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
                width: "350px",
                margin: "80px auto",
                padding: "30px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                background: "#fff",
                boxSizing: "border-box"
            }}
        >
            <h2>🌸 Flower Shop Login</h2>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            <form onSubmit={login}>

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
                    {loading ? "Loading..." : "Login"}
                </button>

            </form>

            <p
                style={{
                    textAlign: "center",
                    marginTop: "20px"
                }}
            >
                Nu ai cont?{" "}
                <Link to="/register">
                    Creează un cont
                </Link>
            </p>
        </div>
    );
}