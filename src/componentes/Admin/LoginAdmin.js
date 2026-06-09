import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

export const LoginAdmin = () => {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");

    const iniciarSesion = async (e) => {
        e.preventDefault();

        try {
        await signInWithEmailAndPassword(auth, correo, password);

        localStorage.setItem("adminAuth", "true");
        window.location.href = "/panel-admin";
        } catch (error) {
        setMensaje("Incorrect email or password");
        console.error(error);
        }
    };

    return (
        
        <div className="admin-login-page">
        
        <div className="admin-login-navbar">
            <a href="/" className="admin-back-link">
            ← Back to Website
            </a>
        </div>
        
        <div className="admin-card">
            <h2 className="admin-title">🐾 PawFriend Admin</h2>
            <p className="admin-subtitle">Manage rescued pets</p>

            <form onSubmit={iniciarSesion}>
            <input
                className="admin-input"
                type="email"
                placeholder="Email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
            />

            <input
                className="admin-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button className="admin-btn" type="submit">
                Sign In
            </button>
            </form>

            {mensaje && <p style={{ marginTop: "1rem" }}>{mensaje}</p>}
        </div>
        </div>
    );
};