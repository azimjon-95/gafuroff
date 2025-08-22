import React, { useState } from 'react';
import './style.css'; // CSS faylini import qilish

function ParklandCalculator() {
    const [burnPercentage, setBurnPercentage] = useState('');
    const [bodySurfaceArea, setBodySurfaceArea] = useState('');
    const [fluidAmount, setFluidAmount] = useState(null);

    const calculateFluid = () => {
        if (!burnPercentage || !bodySurfaceArea) {
            alert('Iltimos, barcha maydonlarni to‘ldiring.');
            return;
        }
        const fluidVolume = 4 * parseFloat(burnPercentage) * parseFloat(bodySurfaceArea);
        setFluidAmount(fluidVolume.toFixed(2)); // Natijani ikki o'nlik raqamga to'g'rilash
    };

    return (
        <div className="calculator-container">
            <h2 className="calculator-title">Parkland Formula Kalkulyatori</h2>

            <p className="calculator-description">
                Ushbu kalkulyator yordamida kuyish natijasida zarur bo'ladigan suyuqlik miqdorini hisoblash mumkin.
                <br />
                <strong>Formula:</strong> <em>Suyuqlik hajmi (ml) = 4 * Kuyish yuzasi (%) * Tana yuzasi maydoni (m²)</em>
                <br />
                Hisoblangan suyuqlik hajmining yarmi birinchi 8 soat ichida, qolgan qismi esa keyingi 16 soat ichida berilishi kerak.
            </p>

            <div className="input-group">
                <input
                    className="input-field"
                    type="number"
                    value={burnPercentage}
                    onChange={(e) => setBurnPercentage(e.target.value)}
                    placeholder="Kuyish foizi (%)"
                />

                <input
                    className="input-field"
                    type="number"
                    value={bodySurfaceArea}
                    onChange={(e) => setBodySurfaceArea(e.target.value)}
                    placeholder="Tana yuzasi (m²)"
                />
            </div>

            <button className="calculate-button" onClick={calculateFluid}>Hisoblash</button>

            {fluidAmount !== null && (
                <div className="result">
                    <h3>Kerakli suyuqlik miqdori: {fluidAmount} ml</h3>
                </div>
            )}
        </div>
    );
}

export default ParklandCalculator;
