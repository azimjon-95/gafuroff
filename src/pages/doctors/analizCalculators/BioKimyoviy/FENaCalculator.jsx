import React, { useState } from 'react';
import './style.css'; // CSS faylini import qilish

function FENaCalculator() {
    const [urineNa, setUrineNa] = useState('');
    const [plasmaCr, setPlasmaCr] = useState('');
    const [plasmaNa, setPlasmaNa] = useState('');
    const [urineCr, setUrineCr] = useState('');
    const [fena, setFena] = useState(null);

    // FENa ni hisoblash funktsiyasi
    const calculateFENa = () => {
        if (!urineNa || !plasmaCr || !plasmaNa || !urineCr) {
            alert('Iltimos, barcha kerakli maydonlarni to‘ldiring.');
            return;
        }

        const fenaValue = (parseFloat(urineNa) * parseFloat(plasmaCr)) /
            (parseFloat(plasmaNa) * parseFloat(urineCr)) * 100;

        setFena(fenaValue.toFixed(2));
    };

    return (
        <div className="calculator-container">
            <h2 className="calculator-title">FENa (Natriyning Fraksion Ajralishi) Kalkulyatori</h2>

            <p className="calculator-description">
                Ushbu kalkulyator FENa (Natriyning Fraksion Ajralishi) ni hisoblash uchun ishlatiladi, bu buyraklar orqali natriyning ajralishi darajasini ko‘rsatadi. Formulasi quyidagicha:
                <br />
                <strong>
                    FENa (%) = (Siydikdagi Na × Qondagi Cr) / (Qondagi Na × Siydikdagi Cr) × 100
                </strong>
            </p>

            <input
                className="input-field"
                type="number"
                placeholder="Siydikdagi Natriy (mEq/L)"
                value={urineNa}
                onChange={(e) => setUrineNa(e.target.value)}
            />

            <input
                className="input-field"
                type="number"
                placeholder="Qondagi Kreatinin (mg/dL)"
                value={plasmaCr}
                onChange={(e) => setPlasmaCr(e.target.value)}
            />

            <input
                className="input-field"
                type="number"
                placeholder="Qondagi Natriy (mEq/L)"
                value={plasmaNa}
                onChange={(e) => setPlasmaNa(e.target.value)}
            />

            <input
                className="input-field"
                type="number"
                placeholder="Siydikdagi Kreatinin (mg/dL)"
                value={urineCr}
                onChange={(e) => setUrineCr(e.target.value)}
            />

            <button className="calculate-button" onClick={calculateFENa}>Hisoblash</button>

            {fena && (
                <div className="result">
                    <h3>FENa: {fena} %</h3>
                </div>
            )}
        </div>
    );
}

export default FENaCalculator;
