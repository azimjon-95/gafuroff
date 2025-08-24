import React, { useState, useEffect } from "react";
import "./Toast.css";

const Toast = ({ id, type, message, description, onClose }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
        }, 3000); // Toast disappears after 3 seconds

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isExiting) {
            const animationTimer = setTimeout(() => {
                onClose(id); // Remove toast after animation completes
            }, 800); // Match the scatter animation duration
            return () => clearTimeout(animationTimer);
        }
    }, [isExiting, id, onClose]);

    const getBackgroundColor = () => {
        switch (type) {
            case "success":
                return "#28a745";
            case "error":
                return "#dc3545";
            case "info":
                return "#17a2b8";
            case "warning":
                return "#ffc107";
            default:
                return "#6c757d";
        }
    };

    return (
        <div
            className={`custom-toast ${isExiting ? "toast-exit" : "toast-enter"} toast-${type}`}
            style={{ backgroundColor: getBackgroundColor() }}
        >
            <div className="toast-content">
                <strong>{message}</strong>
                {description && <p>{description}</p>}
            </div>
            {isExiting && (
                <>
                    <div className="scatter-piece piece-1"></div>
                    <div className="scatter-piece piece-2"></div>
                    <div className="scatter-piece piece-3"></div>
                    <div className="scatter-piece piece-4"></div>
                    <div className="scatter-piece piece-5"></div>
                </>
            )}
        </div>
    );
};

export default Toast;