import React, { useState } from 'react';

const ServiceModal = ({ isOpen, onClose, services, onConfirm, doctorName }) => {
    const [selectedServices, setSelectedServices] = useState([]);

    const handleServiceToggle = (service) => {
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((s) => s !== service)
                : [...prev, service]
        );
    };

    const handleConfirm = () => {
        onConfirm(selectedServices);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{doctorName} uchun xizmatlar</h3>
                <div className="services-list">
                    {services?.map((service, index) => (
                        <div key={index} className="service-item">
                            <input
                                type="checkbox"
                                checked={selectedServices.includes(service)}
                                onChange={() => handleServiceToggle(service)}
                            />
                            <span>{service.name} - {service.price.toLocaleString()} so'm</span>
                        </div>
                    ))}
                </div>
                <div className="modal-actions">
                    <button onClick={handleConfirm} className="confirm-btn">
                        Tasdiqlash
                    </button>
                    <button onClick={onClose} className="cancel-btn">
                        Bekor qilish
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceModal;
