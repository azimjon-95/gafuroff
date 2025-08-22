// LoadingSkeleton.jsx - Alohida skeleton komponent yarating
import React from 'react';

const LoadingSkeleton = () => {
    return (
        <div className="doctor-appointment-system">
            <div className="queues-container">
                <div className="queues-container_box">
                    <div className="queues-header">
                        <div className="header-info">
                            <div className="skeleton skeleton-round" style={{ width: '48px', height: '48px' }}></div>
                            <div style={{ flex: 1 }}>
                                <div className="skeleton skeleton-text large" style={{ width: '200px', marginBottom: '8px' }}></div>
                                <div className="skeleton skeleton-text" style={{ width: '300px' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="queues-container_section">
                        <div className="stat-card">
                            <div className="skeleton skeleton-round" style={{ width: '40px', height: '40px' }}></div>
                            <div style={{ flex: 1 }}>
                                <div className="skeleton skeleton-text large" style={{ width: '40px', marginBottom: '4px' }}></div>
                                <div className="skeleton skeleton-text small" style={{ width: '80px' }}></div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="skeleton skeleton-round" style={{ width: '40px', height: '40px' }}></div>
                            <div style={{ flex: 1 }}>
                                <div className="skeleton skeleton-text large" style={{ width: '40px', marginBottom: '4px' }}></div>
                                <div className="skeleton skeleton-text small" style={{ width: '120px' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="dates-info">
                            <div className="skeleton" style={{ width: '24px', height: '24px', borderRadius: '4px' }}></div>
                            <div className="skeleton skeleton-text" style={{ width: '120px' }}></div>
                        </div>
                    </div>
                </div>

                <div className="tables-container">
                    <table>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Bemorning ismi</th>
                                <th>Yoshi</th>
                                <th>Kasallik</th>
                                <th>To'lov</th>
                                <th>Summa</th>
                                <th>Tarix</th>
                                <th>Amal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 5 ta skeleton qator */}
                            {Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="skeleton skeleton-text" style={{ width: '20px' }}></div>
                                    </td>
                                    <td className="patient-name">
                                        <div className="skeleton skeleton-round" style={{ width: '40px', height: '40px' }}></div>
                                        <div style={{ flex: 1 }}>
                                            <div className="skeleton skeleton-text" style={{ width: `${Math.random() * 50 + 100}px`, marginBottom: '4px' }}></div>
                                            <div className="skeleton skeleton-text small" style={{ width: `${Math.random() * 30 + 90}px` }}></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="skeleton skeleton-text" style={{ width: '60px' }}></div>
                                    </td>
                                    <td>
                                        <div className="skeleton skeleton-text" style={{ width: `${Math.random() * 40 + 80}px` }}></div>
                                    </td>
                                    <td>
                                        <div className="skeleton skeleton-badge"></div>
                                    </td>
                                    <td>
                                        <div className="skeleton skeleton-text" style={{ width: '80px' }}></div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div className="skeleton" style={{ width: '16px', height: '16px', borderRadius: '2px' }}></div>
                                            <div className="skeleton skeleton-text" style={{ width: '60px' }}></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="skeleton skeleton-button"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;