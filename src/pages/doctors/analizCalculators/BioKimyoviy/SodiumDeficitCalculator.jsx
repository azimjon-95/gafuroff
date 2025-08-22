import React, { useState } from 'react';
import './style.css'; // CSS faylini import qilish

function SodiumDeficitCalculator() {
    const [weight, setWeight] = useState('');
    const [currentSodium, setCurrentSodium] = useState('');
    const [desiredSodium, setDesiredSodium] = useState(140); // Odatda 140 mEq/L
    const [gender, setGender] = useState('male'); // Erkaklar
    const [sodiumDeficit, setSodiumDeficit] = useState(null);

    const calculateTBW = () => {
        return gender === 'male' ? weight * 0.6 : weight * 0.5;
    };

    const calculateSodiumDeficit = () => {
        const tbw = calculateTBW();
        const deficit = tbw * (desiredSodium - currentSodium);
        setSodiumDeficit(deficit.toFixed(2)); // Natijani ikki o'nlik raqamga to'g'rilash
    };

    return (
        <div className="calculator-container">
            <h2 className="calculator-title">Giponatriemiya Uchun Natriy Defisiti Kalkulyatori</h2>

            <p className="calculator-description">
                <strong>Giponatriemiya</strong> bu qonda natriy miqdorining pasayishi bilan bog'liq holat.
                Natriy defisiti tananing umumiy suv miqdoriga (TBW) va joriy natriy miqdoriga asoslangan holda hisoblanadi.
                <br />
                <strong>Formula:</strong>
                <em> TBW × (Istalgan Natriy - Joriy Natriy)</em>
            </p>

            <div className="input-group">
                <input
                    className="input-field"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Vazn (kg)"
                />

                <input
                    className="input-field"
                    type="number"
                    value={currentSodium}
                    onChange={(e) => setCurrentSodium(e.target.value)}
                    placeholder="Joriy Natriy (mEq/L)"
                />

                <input
                    className="input-field"
                    type="number"
                    value={desiredSodium}
                    onChange={(e) => setDesiredSodium(e.target.value)}
                    placeholder="Istalgan Natriy (mEq/L)"
                />

                <select
                    className="input-field"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="male">Erkak</option>
                    <option value="female">Ayol</option>
                </select>
            </div>

            <button className="calculate-button" onClick={calculateSodiumDeficit}>
                Hisoblash
            </button>

            {sodiumDeficit !== null && (
                <div className="result">
                    <h3>Natriy Defisiti: {sodiumDeficit} mEq</h3>
                </div>
            )}
        </div>
    );
}

export default SodiumDeficitCalculator;
