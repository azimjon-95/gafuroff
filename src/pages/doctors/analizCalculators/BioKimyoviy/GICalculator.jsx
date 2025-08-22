import React, { useState } from 'react';
import './style.css'; // CSS faylini import qilish

function GICalculator() {
    const [foodGlucoseResponse, setFoodGlucoseResponse] = useState('');
    const [controlGlucoseResponse, setControlGlucoseResponse] = useState('');
    const [gi, setGI] = useState(null);

    const calculateGI = () => {
        if (!foodGlucoseResponse || !controlGlucoseResponse) {
            alert('Iltimos, barcha kerakli maydonlarni to‘ldiring.');
            return;
        }

        const calculatedGI = (parseFloat(foodGlucoseResponse) / parseFloat(controlGlucoseResponse)) * 100;
        setGI(calculatedGI.toFixed(2)); // Natijani ikki o'nlik raqamga to'g'rilash
    };

    return (
        <div className="calculator-container">
            <h2 className="calculator-title">Glycemic Index (GI) Kalkulyatori</h2>

            <p className="calculator-description">
                Ushbu kalkulyator Glycemic Index (GI) ni hisoblash uchun ishlatiladi. GI oziq-ovqat mahsulotining qondagi glyukoza darajasiga ta'sirini o‘lchaydi. Formula quyidagicha:
                <br />
                <strong>GI = (Oziq-ovqat mahsulotining glyukoza reaktsiyasi / Kontrol glyukoza reaktsiyasi) × 100</strong>
            </p>

            <input
                className="input-field"
                type="number"
                placeholder="Oziq-ovqat glyukoza reaktsiyasi (mmol/L)"
                value={foodGlucoseResponse}
                onChange={(e) => setFoodGlucoseResponse(e.target.value)}
            />

            <input
                className="input-field"
                type="number"
                placeholder="Kontrol glyukoza reaktsiyasi (mmol/L)"
                value={controlGlucoseResponse}
                onChange={(e) => setControlGlucoseResponse(e.target.value)}
            />

            <button className="calculate-button" onClick={calculateGI}>Hisoblash</button>

            {gi && (
                <div className="result">
                    <h3>Glycemic Index (GI): {gi}</h3>
                </div>
            )}
        </div>
    );
}

export default GICalculator;
