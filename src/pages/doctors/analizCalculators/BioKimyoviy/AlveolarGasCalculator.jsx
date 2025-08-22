import React, { useState } from 'react';
import './style.css'; // CSS faylini qo'shish

function AlveolarGasCalculator() {
    const [atmosphericPressure, setAtmosphericPressure] = useState('');
    const [h2oPressure, setH2oPressure] = useState(47); // Suv bosimi
    const [fio2, setFio2] = useState(0.21); // Odatda kislorod foizi
    const [paCO2, setPaCO2] = useState('');
    const [alveolarPO2, setAlveolarPO2] = useState(null);

    const calculateAlveolarPO2 = () => {
        if (!atmosphericPressure || !paCO2) {
            alert('Iltimos, barcha kerakli maydonlarni to‘ldiring.');
            return;
        }

        const calculatedPO2 = (atmosphericPressure - h2oPressure) * fio2 - (paCO2 / 0.8);
        setAlveolarPO2(calculatedPO2.toFixed(2)); // Natijani ikki o'nlik raqamga to'g'rilash
    };

    return (
        <div className="calculator-container">
            <h2>Alveolyar Gaz Tenglamasi Kalkulyatori</h2>
            <p>
                Ushbu kalkulyator alveolyar kislorod bosimini (PAO₂) hisoblash uchun mo‘ljallangan. PAO₂
                nafas olish funktsiyasini baholashda muhim ahamiyatga ega. Ushbu formulani
                hisoblash uchun atmosfera bosimi, arterial CO₂ bosimi va kislorod foizini kiritishingiz kerak.
            </p>

            <label>
                Atmosferik Bosim (mmHg):
                <input
                    type="number"
                    value={atmosphericPressure}
                    onChange={(e) => setAtmosphericPressure(parseFloat(e.target.value))}
                    placeholder="Masalan: 760"
                    className="input-field"
                />
            </label>

            <label>
                Arterial CO2 Bosimi (mmHg):
                <input
                    type="number"
                    value={paCO2}
                    onChange={(e) => setPaCO2(parseFloat(e.target.value))}
                    placeholder="Masalan: 40"
                    className="input-field"
                />
            </label>

            <label>
                FiO2 (Kislorod foizi):
                <input
                    type="number"
                    value={fio2}
                    onChange={(e) => setFio2(parseFloat(e.target.value))}
                    placeholder="Masalan: 0.21"
                    step="0.01"
                    className="input-field"
                />
            </label>

            <button onClick={calculateAlveolarPO2} className="calculate-button">Hisoblash</button>

            {alveolarPO2 !== null && (
                <h3>Alveolyar Kislorod Bosimi (PAO₂): {alveolarPO2} mmHg</h3>
            )}

            <h4>Alveolyar Gaz Tenglamasi Formulasi:</h4>
            <p className="formula">
                PAO₂ = (Atmosferik Bosim - Suv Bosimi) × FiO₂ - (PaCO₂ / 0.8)
            </p>
        </div>
    );
}

export default AlveolarGasCalculator;
