import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const FecalPHCalculator = () => {
    const [phValue, setPhValue] = useState('');
    const [stoolWeight, setStoolWeight] = useState('');
    const [phContent, setPhContent] = useState(null);

    const calculateFecalPH = () => {
        if (phValue && stoolWeight) {
            // Odatda pH 0 dan 14 gacha bo'ladi, agar 0-14 oralig'ida bo'lsa natijani hisoblaymiz
            const isValidPH = parseFloat(phValue) >= 0 && parseFloat(phValue) <= 14;
            if (isValidPH) {
                const normalizedPhValue = (parseFloat(phValue) / parseFloat(stoolWeight)).toFixed(2);
                setPhContent(normalizedPhValue);
            } else {
                alert("Iltimos, pH qiymatini 0 dan 14 gacha bo'lgan raqam sifatida kiriting.");
            }
        }
    };

    return (
        <div className="calculator-container">
            <h2>Najosatning pH Kalkulyatori</h2>
            <p>
                Ushbu kalkulyator najosatdagi pH darajasini najosat og'irligi bilan taqqoslab, normalizatsiyalangan pH qiymatini hisoblaydi.
            </p>
            <p><strong>Formula:</strong> Normalized pH = Najosat pH / Najosat og‘irligi</p>
            <div>
                <label>
                    Najosatning pH darajasi:
                    <input
                        type="number"
                        placeholder="pH darajasi (0-14)"
                        className="input-field"
                        value={phValue}
                        onChange={(e) => setPhValue(e.target.value)}
                        step="0.01"
                    />
                </label>
            </div>
            <div>
                <label>
                    Najosat og‘irligi (g):
                    <input
                        type="number"
                        placeholder="Najosat og‘irligi (g)"
                        className="input-field"
                        value={stoolWeight}
                        onChange={(e) => setStoolWeight(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={calculateFecalPH}>Hisoblash</button>
            {phContent !== null && (
                <h3>Normalizatsiyalangan pH: {phContent}</h3>
            )}
        </div>
    );
};

export default FecalPHCalculator;
