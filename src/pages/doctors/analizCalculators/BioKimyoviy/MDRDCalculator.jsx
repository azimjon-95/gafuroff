import React, { useState } from 'react';
import './style.css'; // CSS faylini qo'shish

function MDRDCalculator() {
    const [creatinine, setCreatinine] = useState('');
    const [age, setAge] = useState('');
    const [isFemale, setIsFemale] = useState(false);
    const [isAfricanAmerican, setIsAfricanAmerican] = useState(false);
    const [gfr, setGFR] = useState(null);

    const calculateGFR = () => {
        if (!creatinine || !age) {
            alert('Iltimos, barcha maydonlarni to\'ldiring.');
            return;
        }

        let gfrValue = 186 * Math.pow(creatinine, -1.154) * Math.pow(age, -0.203);
        if (isFemale) {
            gfrValue *= 0.742;
        }
        if (isAfricanAmerican) {
            gfrValue *= 1.212;
        }
        setGFR(gfrValue.toFixed(2));
    };

    return (
        <div className="calculator-container">
            <h2>MDRD Buyrak Filtratsiya Tezligi Kalkulyatori</h2>
            <p>
                Ushbu kalkulyator buyraklarning filtratsiya tezligini (GFR) aniqlash uchun ishlatiladi. GFR,
                buyrakning qon dan qanchalik samarali tarzda chiqindilarni chiqarishini ko‘rsatadi.
            </p>

            <label>
                Serum Kreatinin (mg/dL):
                <input
                    type="number"
                    value={creatinine}
                    onChange={(e) => setCreatinine(e.target.value)}
                    className="input-field"
                />
            </label>

            <label>
                Yosh:
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input-field"
                />
            </label>

            <label>
                Ayolmi:
                <input
                    type="checkbox"
                    checked={isFemale}
                    onChange={(e) => setIsFemale(e.target.checked)}
                />
            </label>

            <label>
                Afrikalik:
                <input
                    type="checkbox"
                    checked={isAfricanAmerican}
                    onChange={(e) => setIsAfricanAmerican(e.target.checked)}
                />
            </label>

            <button onClick={calculateGFR} className="calculate-button">Hisoblash</button>

            {gfr && (
                <div className="result">
                    <h3>Filtratsiya Tezligi (GFR): {gfr} mL/min/1.73 m²</h3>
                </div>
            )}

            <h4>MDRD Formulasi:</h4>
            <p>GFR = 186 × (Serum Kreatinin)⁻¹ᵗ⁵⁴ × (Yosh)⁻⁰.²⁰³ × (0.742 agar ayol) × (1.212 agar Afrikalik)</p>
        </div>
    );
}

export default MDRDCalculator;

