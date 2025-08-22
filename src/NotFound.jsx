import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const nav = useNavigate();
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)",
      }}
    >
      <h1
        style={{
          fontSize: "8rem",
          margin: 0,
          color: "#1890ff",
          fontWeight: 900,
          letterSpacing: "8px",
          textShadow: "2px 4px 12px #b3c6e0",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: "2.5rem",
          color: "#333",
          margin: "16px 0 8px 0",
          fontWeight: 700,
        }}
      >
        Sahifa topilmadi
      </h2>
      <p style={{ color: "#666", fontSize: "1.2rem", marginBottom: 32 }}>
        Kechirasiz, siz so‘ragan sahifa mavjud emas yoki o‘chirilgan.
      </p>
      <button
        onClick={() => {
          localStorage.clear();
          nav("/login");
          window.location.reload();
        }}
        style={{
          background: "#1890ff",
          color: "#fff",
          padding: "12px 32px",
          borderRadius: "8px",
          fontSize: "1.1rem",
          fontWeight: 600,
          textDecoration: "none",
          boxShadow: "0 2px 8px #b3c6e0",
          transition: "background 0.2s",
          cursor: "pointer",
          border: "none",
        }}
      >
        Bosh sahifaga qaytish
      </button>
    </div>
  );
};

export default NotFound;
