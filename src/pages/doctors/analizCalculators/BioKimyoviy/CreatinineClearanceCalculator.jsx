import React, { useState } from 'react';
import './style.css'; // CSS faylni import qilish

function CreatinineClearanceCalculator() {
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [creatinine, setCreatinine] = useState('');
    const [isFemale, setIsFemale] = useState(false);
    const [clearance, setClearance] = useState(null);

    // Cockcroft-Gault formulasi
    const calculateClearance = () => {
        if (!age || !weight || !creatinine) {
            alert('Iltimos, barcha maydonlarni to‘ldiring.');
            return;
        }

        let crClValue = ((140 - parseFloat(age)) * parseFloat(weight)) / (72 * parseFloat(creatinine));
        if (isFemale) {
            crClValue *= 0.85;
        }

        setClearance(crClValue.toFixed(2));
    };

    return (
        <div className="calculator-container">
            <h2 className="calculator-title">Creatinine Clearance (Cockcroft-Gault) Kalkulyatori</h2>

            <p className="calculator-description">
                Ushbu kalkulyator kreatinin klirensini Cockcroft-Gault formulasi asosida hisoblaydi.
                Bu formula buyraklarning filtratsiya qobiliyatini baholash uchun ishlatiladi. Agar foydalanuvchi ayol bo'lsa, hisoblash ayollar uchun maxsus faktor bilan ko'paytiriladi.
            </p>

            {/* Formula matn ko‘rinishda */}
            <h3 className="formula">
                Creatinine Clearance (CrCl) = (140 - Yosh) × Tana Og‘irligi / (72 × Serum Kreatinin) {' '}
                × 0.85 (Ayollar uchun)
            </h3>

            <label>
                Yosh:
                <input
                    className="input-field"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Masalan: 65"
                />
            </label>

            <label>
                Tana Og‘irligi (kg):
                <input
                    className="input-field"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Masalan: 70"
                />
            </label>

            <label>
                Serum Kreatinin (mg/dL):
                <input
                    className="input-field"
                    type="number"
                    value={creatinine}
                    onChange={(e) => setCreatinine(e.target.value)}
                    placeholder="Masalan: 1.2"
                />
            </label>

            <label className="checkbox-label">
                Ayolmi:
                <input
                    type="checkbox"
                    checked={isFemale}
                    onChange={(e) => setIsFemale(e.target.checked)}
                />
            </label>

            <button className="calculate-button" onClick={calculateClearance}>Hisoblash</button>

            {clearance && (
                <div>
                    <h3 className="result">Kreatinin Klirensi (CrCl): {clearance} mL/min</h3>
                </div>
            )}
        </div>
    );
}

export default CreatinineClearanceCalculator;




