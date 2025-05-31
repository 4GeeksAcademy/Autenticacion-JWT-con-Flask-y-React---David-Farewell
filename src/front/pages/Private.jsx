import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/private`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => {
            if (!resp.ok) throw new Error("Token inválido");
            return resp.json();
        })
        .then(data => setUser(data))
        .catch(() => navigate("/login"));
    }, []);

    return (
        <div className="container mt-5">
            <h2>Área Privada</h2>
            {user ? (
                <>
                    <p>Bienvenido, usuario ID: {user.user_id}</p>
                    <p>Email: {user.user_email}</p>
                </>
            ) : (
                <p>Cargando datos...</p>
            )}
        </div>
    );
};
