import React, { useState } from 'react';
import './style.css'; // CSS faylni import qilish

function CorrectedSodiumCalculator() {
    const [sodium, setSodium] = useState('');
    const [glucose, setGlucose] = useState('');
    const [correctedSodium, setCorrectedSodium] = useState(null);

    // Corrected Sodium formulasi
    const calculateCorrectedSodium = () => {
        if (!sodium || !glucose) {
            alert('Iltimos, barcha maydonlarni to‘ldiring.');
            return;
        }

        const corrected = parseFloat(sodium) + 0.016 * (parseFloat(glucose) - 100);
        setCorrectedSodium(corrected.toFixed(2)); // Natijani ikki o'nlik raqamga to'g'rilash
    };

    return (
        <div className="calculator-container">
            <h2 className="calculator-title">Corrected Sodium Kalkulyatori (Giperglikemiya uchun)</h2>

            <p className="calculator-description">
                Ushbu kalkulyator giperglikemiya (qondagi yuqori glyukoza) holatida
                natriy miqdorini to‘g‘irlash uchun ishlatiladi.
                Qon glyukoza darajasi ortib ketganda natriy konsentratsiyasi pasayishi mumkin,
                va natriy darajasini aniqlash uchun quyidagi formula qo‘llaniladi:
            </p>

            <h3 className="formula">
                Corrected Sodium = Sodium + 0.016 × (Glucose - 100)
            </h3>

            <label htmlFor="sodium">Qon natriy darajasi (mmol/L):</label>
            <input
                id="sodium"
                className="input-field"
                type="number"
                value={sodium}
                onChange={(e) => setSodium(e.target.value)}
                placeholder="Masalan: 140"
            />

            <label htmlFor="glucose">Qon glyukoza darajasi (mg/dL):</label>
            <input
                id="glucose"
                className="input-field"
                type="number"
                value={glucose}
                onChange={(e) => setGlucose(e.target.value)}
                placeholder="Masalan: 300"
            />

            <button className="calculate-button" onClick={calculateCorrectedSodium}>Hisoblash</button>

            {correctedSodium !== null && (
                <h3 className="result">To'g'irlangan natriy miqdori: {correctedSodium} mmol/L</h3>
            )}
        </div>
    );
}

export default CorrectedSodiumCalculator;
