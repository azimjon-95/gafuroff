import React, { useState } from 'react';
import './style.css'; // CSS faylni import qilish

function CorrectedPhenytoinCalculator() {
    const [measuredPhenytoin, setMeasuredPhenytoin] = useState('');
    const [albumin, setAlbumin] = useState('');
    const [correctedPhenytoin, setCorrectedPhenytoin] = useState(null);

    const calculateCorrectedPhenytoin = () => {
        if (!measuredPhenytoin || !albumin) {
            alert('Iltimos, barcha maydonlarni to‘ldiring.');
            return;
        }

        const corrected = (parseFloat(measuredPhenytoin) / (0.2 * parseFloat(albumin) + 0.1)) + 1;
        setCorrectedPhenytoin(corrected.toFixed(2)); // Natijani ikki o'nlik raqamga to'g'rilash
    };

    return (
        <div className="calculator-container">
            <h2 className="calculator-title">Corrected Phenytoin Kalkulyatori (Gipoproteinemiya uchun)</h2>

            <label>
                O'lchanadigan fenitoin darajasi (μg/mL):
                <input className="input-field"
                    type="number"
                    value={measuredPhenytoin}
                    onChange={(e) => setMeasuredPhenytoin(e.target.value)}
                    placeholder="Masalan: 10"
                />
            </label>

            <label>
                Qon albumin darajasi (g/dL):
                <input className="input-field"
                    type="number"
                    value={albumin}
                    onChange={(e) => setAlbumin(e.target.value)}
                    placeholder="Masalan: 3.0"
                />
            </label>

            <button className="calculate-button" onClick={calculateCorrectedPhenytoin}>Hisoblash</button>

            {correctedPhenytoin !== null && (
                <h3 className="result">To'g'irlangan fenitoin darajasi: {correctedPhenytoin} μg/mL</h3>
            )}
        </div>
    );
}

export default CorrectedPhenytoinCalculator;

