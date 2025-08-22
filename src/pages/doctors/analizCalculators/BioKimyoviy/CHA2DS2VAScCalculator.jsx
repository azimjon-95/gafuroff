import React, { useState } from 'react';
import './style.css'; // Uslub faylini qo'shamiz

function CHA2DS2VAScCalculator() {
    const [highBloodPressure, setHighBloodPressure] = useState(false);
    const [ageOver75, setAgeOver75] = useState(false);
    const [diabetes, setDiabetes] = useState(false);
    const [vascularDisease, setVascularDisease] = useState(false);
    const [age65to74, setAge65to74] = useState(false);
    const [female, setFemale] = useState(false);
    const [score, setScore] = useState(null);

    const calculateScore = () => {
        let totalScore = 0;

        if (highBloodPressure) totalScore += 1;
        if (ageOver75) totalScore += 2;
        if (diabetes) totalScore += 1;
        if (vascularDisease) totalScore += 1;
        if (age65to74) totalScore += 1;
        if (female) totalScore += 1;

        setScore(totalScore);
    };

    return (
        <div className="calculator-container">
            <h2>CHA2DS2-VASc Kalkulyatori</h2>
            <p>
                Ushbu kalkulyator CHA2DS2-VASc ballini hisoblashga yordam beradi,
                bu esa atrial fibrillyatsiya (AF) ga ega bo'lgan bemorlarda
                qon quyqasi (thromboembolic) xavfini baholashda qo'llaniladi.
                <br />
                <strong>MDRD formulasi</strong>:
                <em> GFR = 186 × (kreatinin)^-1.154 × (yosh)^-0.203 × (0.742, agar ayol bo'lsa) × (1.212, agar afro-amerikalik bo'lsa)</em>
            </p>

            <label>
                Yuqori qon bosimi:
                <input
                    type="checkbox"
                    checked={highBloodPressure}
                    onChange={() => setHighBloodPressure(!highBloodPressure)}
                />
            </label>

            <label>
                75 yoshdan katta:
                <input
                    type="checkbox"
                    checked={ageOver75}
                    onChange={() => setAgeOver75(!ageOver75)}
                />
            </label>

            <label>
                Diabetes:
                <input
                    type="checkbox"
                    checked={diabetes}
                    onChange={() => setDiabetes(!diabetes)}
                />
            </label>

            <label>
                Qon tomir kasalligi:
                <input
                    type="checkbox"
                    checked={vascularDisease}
                    onChange={() => setVascularDisease(!vascularDisease)}
                />
            </label>

            <label>
                65-74 yosh:
                <input
                    type="checkbox"
                    checked={age65to74}
                    onChange={() => setAge65to74(!age65to74)}
                />
            </label>

            <label>
                Ayol:
                <input
                    type="checkbox"
                    checked={female}
                    onChange={() => setFemale(!female)}
                />
            </label>

            <button onClick={calculateScore} className="calculate-button">Hisoblash</button>

            {score !== null && (
                <div className="result">
                    <h3>CHA2DS2-VASc balli: {score}</h3>
                </div>
            )}
        </div>
    );
}

export default CHA2DS2VAScCalculator;
