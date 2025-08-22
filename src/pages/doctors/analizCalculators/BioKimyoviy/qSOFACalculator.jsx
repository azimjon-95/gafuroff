import React, { useState } from 'react';
import './style.css';  // CSS faylini import qilish

function QSOFACalculator() {
    const [bloodPressure, setBloodPressure] = useState('');
    const [respiratoryRate, setRespiratoryRate] = useState('');
    const [alteredMentalStatus, setAlteredMentalStatus] = useState(false);
    const [score, setScore] = useState(null);

    const calculateScore = () => {
        let totalScore = 0;

        if (bloodPressure && parseInt(bloodPressure) < 100) totalScore += 1;
        if (respiratoryRate && parseInt(respiratoryRate) >= 22) totalScore += 1;
        if (alteredMentalStatus) totalScore += 1;

        setScore(totalScore);
    };

    return (
        <div className="calculator-container">
            <h2 className="calculator-title">qSOFA Kalkulyatori</h2>

            <p className="calculator-description">
                <strong>qSOFA (Quick Sequential Organ Failure Assessment)</strong>
                - sepsis va o‘tkir organ yetishmovchiligi xavfini aniqlash uchun ishlatiladigan oddiy, tezkor ball tizimi.
                <br />
                <strong>Formula:</strong> <em>Sistolik qon bosimi ( 100 mmHg ) + Nafas olish tezligi ( ≥ 22 / daq ) + O'zgaruvchi aqliy holat (ha)</em>
            </p>

            <div className="input-group">
                <input
                    className="input-field"
                    type="number"
                    value={bloodPressure}
                    onChange={(e) => setBloodPressure(e.target.value)}
                    placeholder="Sistolik qon bosimi (mmHg)"
                />

                <input
                    className="input-field"
                    type="number"
                    value={respiratoryRate}
                    onChange={(e) => setRespiratoryRate(e.target.value)}
                    placeholder="Nafas tezligi (marta/daqiqa)"
                />

                <div className="checkbox-group">
                    <label>O'zgaruvchi aqliy holat:</label>
                    <input
                        type="checkbox"
                        checked={alteredMentalStatus}
                        onChange={() => setAlteredMentalStatus(!alteredMentalStatus)}
                    />
                </div>
            </div>

            <button className="calculate-button" onClick={calculateScore}>Hisoblash</button>

            {score !== null && (
                <div className="result">
                    <h3>qSOFA balli: {score}</h3>
                </div>
            )}
        </div>
    );
}

export default QSOFACalculator;
