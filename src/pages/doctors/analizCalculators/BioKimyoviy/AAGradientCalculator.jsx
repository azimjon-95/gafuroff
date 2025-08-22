import React, { useState } from 'react';
import './style.css'; // CSS faylini qo'shish

function AAGradientCalculator() {
    const [fio2, setFiO2] = useState(0.21); // Default FiO₂ for room air
    const [atmosphericPressure, setAtmosphericPressure] = useState(760); // Default atmospheric pressure
    const [paco2, setPaCO2] = useState('');
    const [pao2, setPaO2] = useState('');
    const [aAGradient, setAAGradient] = useState(null);

    const calculateAAGradient = () => {
        if (!paco2 || !pao2) {
            alert('Iltimos, barcha kerakli maydonlarni to‘ldiring.');
            return;
        }

        const alveolarOxygen = (fio2 * (atmosphericPressure - 47)) - (parseFloat(paco2) / 0.8);
        const gradient = alveolarOxygen - parseFloat(pao2);

        setAAGradient(gradient.toFixed(2));
    };

    return (
        <div className="calculator-container">
            <h2>Alveolyar-Arterial (A-a) Kislorod Gradiyent Kalkulyatori</h2>
            <p>
                Ushbu kalkulyator Alveolyar-Arterial (A-a) kislorod gradiyentini (A-a gradient) hisoblash uchun mo'ljallangan.
                A-a gradiyenti bu kislorodning alveol va arteriyalarda qanday farq qilishini ko‘rsatadi. Bu ko‘rsatkich
                nafas olish va alveolyar funktsiyalarning baholashida muhimdir.
            </p>

            <label>
                FiO₂ (Kislorod fraksiyasi, 0 - 1):
                <input
                    type="number"
                    value={fio2}
                    onChange={(e) => setFiO2(parseFloat(e.target.value))}
                    step="0.01"
                    min="0"
                    max="1"
                    className="input-field"
                />
            </label>

            <label>
                Atmosferik Bosim (mmHg):
                <input
                    type="number"
                    value={atmosphericPressure}
                    onChange={(e) => setAtmosphericPressure(parseFloat(e.target.value))}
                    className="input-field"
                />
            </label>

            <label>
                PaCO₂ (Arteriyadagi CO₂, mmHg):
                <input
                    type="number"
                    value={paco2}
                    onChange={(e) => setPaCO2(parseFloat(e.target.value))}
                    className="input-field"
                />
            </label>

            <label>
                PaO₂ (Arteriyadagi O₂, mmHg):
                <input
                    type="number"
                    value={pao2}
                    onChange={(e) => setPaO2(parseFloat(e.target.value))}
                    className="input-field"
                />
            </label>

            <button onClick={calculateAAGradient} className="calculate-button">Hisoblash</button>

            {aAGradient && (
                <div>
                    <h3>A-a Kislorod Gradiyenti: {aAGradient} mmHg</h3>
                </div>
            )}

            <h4>A-a Gradiyenti Formulasi:</h4>
            <p className="formula">
                A-a Gradient = Alveolar Oksigen - PaO₂<br />
                Alveolar Oksigen = FiO₂ × (Atmosferik Bosim - 47) - (PaCO₂ / 0.8)
            </p>
        </div>
    );
}

export default AAGradientCalculator;
