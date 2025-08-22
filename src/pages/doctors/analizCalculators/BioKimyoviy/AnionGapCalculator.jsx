import React, { useState } from 'react';
import './style.css'; // CSS faylini qo'shish

function AnionGapCalculator() {
    const [na, setNa] = useState('');
    const [k, setK] = useState('');
    const [cl, setCl] = useState('');
    const [hco3, setHco3] = useState('');
    const [useK, setUseK] = useState(false);
    const [anionGap, setAnionGap] = useState(null);

    const calculateAnionGap = () => {
        if (!na || !cl || !hco3) {
            alert('Iltimos, barcha kerakli maydonlarni to‘ldiring.');
            return;
        }

        let anionGapValue = parseFloat(na) - (parseFloat(cl) + parseFloat(hco3));
        if (useK) {
            anionGapValue += parseFloat(k || 0);
        }

        setAnionGap(anionGapValue.toFixed(2));
    };

    return (
        <div className="calculator-container">
            <h2>Anion Gap Kalkulyatori</h2>
            <p>
                Ushbu kalkulyator anion bo'shligini hisoblash uchun mo‘ljallangan.
                Anion bo'shligi nafas olish va metabolik holatni baholashda muhim ahamiyatga ega.
            </p>

            <label>
                Natriy (Na⁺, mEq/L):
                <input
                    type="number"
                    value={na}
                    onChange={(e) => setNa(e.target.value)}
                    className="input-field"
                />
            </label>

            <label>
                Kaliy (K⁺, mEq/L) <small>(Ixtiyoriy)</small>:
                <input
                    type="number"
                    value={k}
                    onChange={(e) => setK(e.target.value)}
                    className="input-field"
                />
            </label>

            <label>
                Xlor (Cl⁻, mEq/L):
                <input
                    type="number"
                    value={cl}
                    onChange={(e) => setCl(e.target.value)}
                    className="input-field"
                />
            </label>

            <label>
                Bikarbonat (HCO₃⁻, mEq/L):
                <input
                    type="number"
                    value={hco3}
                    onChange={(e) => setHco3(e.target.value)}
                    className="input-field"
                />
            </label>

            <label>
                Kalkulyatsiyaga Kaliy qo‘shish:
                <input
                    type="checkbox"
                    checked={useK}
                    onChange={(e) => setUseK(e.target.checked)}
                />
            </label>

            <button onClick={calculateAnionGap} className="calculate-button">Hisoblash</button>

            {anionGap !== null && (
                <h3>Anion Gap: {anionGap} mEq/L</h3>
            )}

            <h4>Anion Gap Formulasi:</h4>
            <p className="formula">
                Anion Gap = Na⁺ - (Cl⁻ + HCO₃⁻) + (K⁺, agar qo‘shilgan bo'lsa)
            </p>
        </div>
    );
}

export default AnionGapCalculator;
