import React, { useState } from 'react';
import './style.css'; // CSS faylini import qilish

function BicarbonateDeficitCalculator() {
    const [baseDeficit, setBaseDeficit] = useState('');
    const [bodyWeight, setBodyWeight] = useState('');
    const [bicarbonateDeficit, setBicarbonateDeficit] = useState(null);

    const calculateBicarbonateDeficit = () => {
        const calculatedDeficit = parseFloat(baseDeficit) * parseFloat(bodyWeight) * 0.5;
        setBicarbonateDeficit(calculatedDeficit.toFixed(2)); // Natijani ikki o'nlik raqamga to'g'rilash
    };

    return (
        <div className="calculator-container">
            <h2>Bikarbonat Defitsit Kalkulyatori</h2>
            <p>
                Ushbu kalkulyator, bemorlar uchun bikarbonat defitsitini hisoblashda yordam beradi.
                Bikarbonat defitsiti, metabolik asidoz holatlarida muhim bo'lib,
                organizmning pH darajasini normallashtirish uchun zarur bo'lgan bikarbonat miqdorini hisoblaydi.
            </p>
            <p>
                <strong>MDRD Formulasi:</strong><br />
                MDRD formulasi quyidagicha:<br />
                eGFR (mL/min/1.73 m²) = 175 × (serum kreatinin)^-1.154 × (yosh)^-0.203 × (0.742 agar ayol bo'lsa) × (1.212 agar qora tanli bo'lsa)
            </p>

            <label>
                Base Deficit (mmol/L):
                <input
                    className="input-field"
                    type="number"
                    value={baseDeficit}
                    onChange={(e) => setBaseDeficit(e.target.value)}
                    placeholder="Masalan: 5"
                />
            </label>

            <label>
                Tana og'irligi (kg):
                <input
                    className="input-field"
                    type="number"
                    value={bodyWeight}
                    onChange={(e) => setBodyWeight(e.target.value)}
                    placeholder="Masalan: 70"
                />
            </label>

            <button onClick={calculateBicarbonateDeficit} className="calculate-button">Hisoblash</button>

            {bicarbonateDeficit !== null && (
                <h3>Bikarbonat defitsiti: {bicarbonateDeficit} mmol</h3>
            )}
        </div>
    );
}

export default BicarbonateDeficitCalculator;
