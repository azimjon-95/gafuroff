import React, { useState } from "react";
import Toast from "./Toast";

const ToastContainer = () => {
    const [toasts, setToasts] = useState([]);

    const addToast = (type, message, description) => {
        const id = Date.now(); // Unique ID for each toast
        setToasts((prevToasts) => [
            ...prevToasts,
            { id, type, message, description },
        ]);
    };

    const removeToast = (id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    // Expose addToast methods globally (similar to react-toastify)
    window.toast = {
        success: (message, description) => addToast("success", message, description),
        error: (message, description) => addToast("error", message, description),
        info: (message, description) => addToast("info", message, description),
        warning: (message, description) => addToast("warning", message, description),
    };

    return (
        <div
            style={{
                position: "fixed",
                top: "20px",
                right: "20px",
                zIndex: 1000,
            }}
        >
            {toasts.map((toast, inx) => (
                <Toast
                    key={inx}
                    id={toast.id}
                    type={toast.type}
                    message={toast.message}
                    description={toast.description}
                    onClose={removeToast}
                />
            ))}
        </div>
    );
};

export default ToastContainer;