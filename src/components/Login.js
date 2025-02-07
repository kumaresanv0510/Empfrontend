import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Import icons
import "../styles/Login.css";

const Login = ({ setToken }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please fill in both fields.");
            return;
        }

        try {
            const data = await loginUser({ email, password });

            console.log("Login Response:", data);

            setToken(data.token);
            localStorage.setItem("token", data.token);

            alert("Login successful! Redirecting to dashboard...");

            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        } catch (error) {
            console.error("Login Error:", error);
            alert(error.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <div className="input-group">
                <FaEnvelope className="icon" />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="input-group">
                <FaLock className="icon" />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
