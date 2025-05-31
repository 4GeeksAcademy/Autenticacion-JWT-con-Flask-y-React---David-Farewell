import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert("Usuario registrado correctamente");
            navigate("/login");
        } else {
            alert(data.msg || "Error al registrarse");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Registro</h2>
            <form onSubmit={handleSignup}>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Registrarse</button>
            </form>
        </div>
    );
};
