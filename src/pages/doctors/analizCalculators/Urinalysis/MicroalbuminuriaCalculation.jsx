import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const MicroalbuminuriaCalculation = () => {
    const [microalbumin, setMicroalbumin] = useState(''); // Mikroalbumin miqdori
    const [creatinine, setCreatinine] = useState(''); // Kreatinin miqdori
    const [ratio, setRatio] = useState(null); // Natija

    const calculateMicroalbuminuria = () => {
        const microalbuminValue = parseFloat(microalbumin); // Mikroalbumin
        const creatinineValue = parseFloat(creatinine); // Kreatinin

        if (!isNaN(microalbuminValue) && !isNaN(creatinineValue) && creatinineValue > 0) {
            // Mikroalbuminuriya nisbati hisoblash formulasi
            const microalbuminuriaRatio = microalbuminValue / creatinineValue;
            setRatio(microalbuminuriaRatio.toFixed(2)); // Natijani 2 xonali raqam bilan saqlash
        } else {
            setRatio("Iltimos, barcha maydonlarni to'ldiring va musbat raqam kiriting.");
        }
    };

    return (
        <div className="calculator-container" style={{ padding: '20px' }}>
            <h2>Microalbuminuria Kalkulyatori</h2>
            <h3>Formulasi:</h3>
            <p>
                Mikroalbumin (mg/dL) / Kreatinin (mg/dL) nisbati.
            </p>
            <div>
                <label htmlFor="microalbumin">Mikroalbumin (mg/dL)</label>
                <input
                    id="microalbumin"
                    className="input-field"
                    type="number"
                    placeholder="Mikroalbumin darajasini kiriting..."
                    value={microalbumin}
                    onChange={(e) => setMicroalbumin(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="creatinine">Kreatinin (mg/dL)</label>
                <input
                    id="creatinine"
                    className="input-field"
                    type="number"
                    placeholder="Kreatinin darajasini kiriting..."
                    value={creatinine}
                    onChange={(e) => setCreatinine(e.target.value)}
                />
            </div>

            <button onClick={calculateMicroalbuminuria}>Hisoblash</button>
            {ratio !== null && (
                <div className="result">
                    <h2>Mikroalbuminuria Nisbati: <strong>{ratio}</strong></h2>
                </div>
            )}
        </div>
    );
};

export default MicroalbuminuriaCalculation;
