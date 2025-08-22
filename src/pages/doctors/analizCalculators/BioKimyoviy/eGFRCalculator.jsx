import React, { useState } from 'react';
import './style.css'; // CSS faylini import qilish

function EgfrCalculator() {
    const [creatinine, setCreatinine] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [egfr, setEgfr] = useState(null);

    // eGFRni hisoblash funktsiyasi
    const calculateeGFR = () => {
        if (!creatinine || !age) {
            alert('Iltimos, barcha kerakli maydonlarni to‘ldiring.');
            return;
        }

        const creatinineValue = parseFloat(creatinine);
        const ageValue = parseFloat(age);
        const genderFactor = gender === 'male' ? 1 : 0.742;

        const egfrValue = 175 * Math.pow(creatinineValue, -1.154) * Math.pow(ageValue, -0.203) * genderFactor;

        setEgfr(egfrValue.toFixed(2));
    };

    return (
        <div className="calculator-container">
            <h2 className="calculator-title">eGFR (Estimated Glomerular Filtration Rate) Kalkulyatori</h2>

            <p className="calculator-description">
                Ushbu kalkulyator eGFR (taxminiy glomerular filtratsiya tezligi)ni hisoblash uchun ishlatiladi. Bu buyraklarning filtratsiya qobiliyatini baholashga yordam beradi.
                <br />
                <br />
                Formulasi:
                <br />
                <strong>eGFR = 175 × (Kreatinin)^(-1.154) × (Yosh)^(-0.203) × Jins faktori</strong>
            </p>

            <label>
                Kreatinin (mg/dL):
                <input
                    className="input-field"
                    type="number"
                    value={creatinine}
                    onChange={(e) => setCreatinine(e.target.value)}
                />
            </label>

            <label>
                Yosh (yil):
                <input
                    className="input-field"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </label>

            <label>
                Jins:
                <select className="input-field" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="male">Erkak</option>
                    <option value="female">Ayol</option>
                </select>
            </label>

            <button className="calculate-button" onClick={calculateeGFR}>Hisoblash</button>

            {egfr && (
                <div>
                    <h3>eGFR: {egfr} mL/min/1.73m²</h3>
                </div>
            )}
        </div>
    );
}

export default EgfrCalculator;
