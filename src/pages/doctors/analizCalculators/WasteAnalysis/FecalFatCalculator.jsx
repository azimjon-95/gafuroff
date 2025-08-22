import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const FecalFatCalculator = () => {
    const [fecalFat, setFecalFat] = useState('');
    const [stoolWeight, setStoolWeight] = useState('');
    const [fatContent, setFatContent] = useState(null);

    const calculateFatContent = () => {
        if (fecalFat && stoolWeight) {
            const fatPerDay = (parseFloat(fecalFat) / parseFloat(stoolWeight)) * 100;
            setFatContent(fatPerDay);
        }
    };

    return (
        <div className="calculator-container">
            <h2>Najosatdagi yog‘ni hisoblash kalkulyatori</h2>
            <p>
                Bu kalkulyator najosatda mavjud yog‘ miqdorini hisoblash uchun ishlatiladi.
                Agar najosatdagi yog‘ va najosat og‘irligini bilsangiz, formuladan foydalanib
                yog‘ miqdorini (%da) hisoblay olasiz.
            </p>
            <p><strong>Formula:</strong> Yog‘ miqdori (%) = (Najosatdagi yog‘ (g) / Najosat og‘irligi (g)) × 100</p>

            <div>
                <input
                    type="number"
                    placeholder="Najosatda yog‘ miqdori (g)"
                    className="input-field"
                    value={fecalFat}
                    onChange={(e) => setFecalFat(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="number"
                    placeholder="Najosat og‘irligi (g)"
                    className="input-field"
                    value={stoolWeight}
                    onChange={(e) => setStoolWeight(e.target.value)}
                />
            </div>
            <button onClick={calculateFatContent}>Hisoblash</button>
            {fatContent !== null && (
                <h3>Najosatdagi yog‘ miqdori: {fatContent.toFixed(2)}%</h3>
            )}
        </div>
    );
};

export default FecalFatCalculator;

