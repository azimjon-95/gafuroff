import React, { useState } from 'react';
import './style.css'; // CSS faylini import qilish

function OICalculator() {
    const [meanAirwayPressure, setMeanAirwayPressure] = useState('');
    const [fio2, setFio2] = useState('');
    const [paO2, setPaO2] = useState('');
    const [oi, setOI] = useState(null);

    const calculateOI = () => {
        if (parseFloat(paO2) === 0) {
            alert("PaO2 0 ga teng bo'lmasligi kerak!");
            return;
        }
        const calculatedOI = (parseFloat(meanAirwayPressure) * parseFloat(fio2)) / parseFloat(paO2);
        setOI(calculatedOI.toFixed(2)); // Natijani ikki o'nlik raqamga to'g'rilash
    };

    return (
        <div className="calculator-container">
            <h2 className="calculator-title">Kislorod Yetkazib Berish Samaradorligi (OI) Kalkulyatori</h2>

            <p className="calculator-description">
                Ushbu kalkulyator yordamida kislorod yetkazib berish samaradorligini hisoblash mumkin. OI (Oxygenation Index) organizmga kislorod yetkazib berish va o'pkadagi ventilyatsiya samaradorligini aniqlash uchun ishlatiladi.
                <br />
                <strong>Formula: OI = (MAP * FiO2) / PaO2</strong>
            </p>

            <div className="input-group">
                <input
                    className="input-field"
                    type="number"
                    value={meanAirwayPressure}
                    onChange={(e) => setMeanAirwayPressure(e.target.value)}
                    placeholder="O'rtacha Havo Bosimi (MAP) (cmH2O)"
                />

                <input
                    className="input-field"
                    type="number"
                    value={fio2}
                    onChange={(e) => setFio2(e.target.value)}
                    placeholder="FiO2 (Kislorod foizi)"
                    step="0.01"
                />

                <input
                    className="input-field"
                    type="number"
                    value={paO2}
                    onChange={(e) => setPaO2(e.target.value)}
                    placeholder="PaO2 (mmHg)"
                />
            </div>

            <button className="calculate-button" onClick={calculateOI}>Hisoblash</button>

            {oi !== null && (
                <div className="result">
                    <h3>Kislorod Yetkazib Berish Samaradorligi (OI): {oi}</h3>
                </div>
            )}
        </div>
    );
}

export default OICalculator;
