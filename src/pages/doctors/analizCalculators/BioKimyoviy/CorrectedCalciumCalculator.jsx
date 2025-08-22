import React, { useState } from 'react';
import './style.css'; // CSS fayli

function CorrectedCalciumCalculator() {
    const [calcium, setCalcium] = useState('');
    const [albumin, setAlbumin] = useState('');
    const [correctedCalcium, setCorrectedCalcium] = useState(null);

    const calculateCorrectedCalcium = () => {
        if (!calcium || !albumin) {
            alert('Iltimos, barcha maydonlarni to‘ldiring.');
            return;
        }

        const correctedCalciumValue = parseFloat(calcium) + 0.8 * (4 - parseFloat(albumin));
        setCorrectedCalcium(correctedCalciumValue.toFixed(2));
    };

    return (
        <div className="calculator-container">
            <h2>Corrected Calcium Kalkulyatori</h2>
            <p>
                Ushbu kalkulyator, qon plazmasida o‘lchangan albomin darajasiga qarab,
                to‘g‘rilangan kalsiy miqdorini hisoblash uchun qo‘llaniladi.
                To‘g‘rilangan kalsiy jigar va buyrak yetishmovchiligi kabi holatlarda qo‘llaniladi.
                <br />
                <strong>MDRD formulasi:</strong>
                <em> GFR = 186 × (kreatinin)^-1.154 × (yosh)^-0.203 × (0.742, agar ayol bo'lsa) × (1.212, agar afro-amerikalik bo'lsa)</em>
            </p>

            <label>
                O‘lchangan Kalsiy (mg/dL):
                <input
                    type="number"
                    className="input-field" // className qo'shildi
                    value={calcium}
                    onChange={(e) => setCalcium(e.target.value)}
                />
            </label>

            <label>
                Albomin (g/dL):
                <input
                    type="number"
                    className="input-field" // className qo'shildi
                    value={albumin}
                    onChange={(e) => setAlbumin(e.target.value)}
                />
            </label>

            <button onClick={calculateCorrectedCalcium} className="calculate-button">
                Hisoblash
            </button>

            {correctedCalcium && (
                <div className="result">
                    <h3>To‘g‘rilangan Kalsiy: {correctedCalcium} mg/dL</h3>
                </div>
            )}
        </div>
    );
}

export default CorrectedCalciumCalculator;
