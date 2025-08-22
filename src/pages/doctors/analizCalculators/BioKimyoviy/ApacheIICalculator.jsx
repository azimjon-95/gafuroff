import React, { useState } from 'react';
import './style.css'; // Make sure to create this CSS file for styles

function ApacheIICalculator() {
    const [age, setAge] = useState('');
    const [temperature, setTemperature] = useState('');
    const [systolicBP, setSystolicBP] = useState('');
    const [pulse, setPulse] = useState('');
    const [respiratoryRate, setRespiratoryRate] = useState('');
    const [paO2, setPaO2] = useState('');
    const [bicarbonate, setBicarbonate] = useState('');
    const [ph, setPh] = useState('');
    const [creatinine, setCreatinine] = useState('');
    const [sodium, setSodium] = useState('');
    const [calcium, setCalcium] = useState('');
    const [chronicDisease, setChronicDisease] = useState('');
    const [score, setScore] = useState(null);

    const calculateScore = () => {
        let totalScore = 0;

        // Age points
        if (age >= 65) totalScore += 2;

        // Temperature
        if (temperature < 35 || temperature > 39.9) totalScore += 1;

        // Systolic BP
        if (systolicBP < 70) totalScore += 4;
        else if (systolicBP >= 70 && systolicBP <= 79) totalScore += 3;
        else if (systolicBP >= 80 && systolicBP <= 89) totalScore += 2;
        else if (systolicBP >= 90 && systolicBP <= 99) totalScore += 1;

        // Pulse
        if (pulse < 40) totalScore += 3;
        else if (pulse >= 40 && pulse <= 49) totalScore += 2;
        else if (pulse >= 50 && pulse <= 109) totalScore += 0;
        else if (pulse >= 110 && pulse <= 139) totalScore += 1;
        else if (pulse >= 140) totalScore += 2;

        // Respiratory rate
        if (respiratoryRate < 6) totalScore += 4;
        else if (respiratoryRate >= 6 && respiratoryRate <= 9) totalScore += 3;
        else if (respiratoryRate >= 10 && respiratoryRate <= 29) totalScore += 0;
        else if (respiratoryRate >= 30 && respiratoryRate <= 34) totalScore += 1;
        else if (respiratoryRate >= 35) totalScore += 2;

        // PaO2
        if (paO2 < 60) totalScore += 4;
        else if (paO2 >= 60 && paO2 <= 69) totalScore += 3;
        else if (paO2 >= 70 && paO2 <= 89) totalScore += 2;
        else if (paO2 >= 90 && paO2 <= 99) totalScore += 1;

        // Bicarbonate
        if (bicarbonate < 15) totalScore += 2;
        else if (bicarbonate >= 15 && bicarbonate <= 19) totalScore += 1;

        // pH
        if (ph < 7.2) totalScore += 3;
        else if (ph >= 7.2 && ph <= 7.29) totalScore += 2;
        else if (ph >= 7.3 && ph <= 7.34) totalScore += 1;

        // Creatinine
        if (creatinine >= 3.5) totalScore += 4;
        else if (creatinine >= 2 && creatinine < 3.5) totalScore += 2;
        else if (creatinine >= 1.2 && creatinine < 2) totalScore += 1;

        // Sodium
        if (sodium < 130) totalScore += 3;
        else if (sodium >= 130 && sodium < 135) totalScore += 2;
        else if (sodium >= 135 && sodium < 145) totalScore += 0;
        else if (sodium >= 145 && sodium < 155) totalScore += 1;

        // Calcium
        if (calcium < 7.5) totalScore += 2;

        // Chronic disease
        if (chronicDisease === 'yes') totalScore += 2;

        setScore(totalScore);
    };

    return (
        <div className="calculator-container">
            <h2>APACHE II Kalkulyatori</h2>
            <p>
                Ushbu kalkulyator, APACHE II (Acute Physiology and Chronic Health Evaluation II) ballini hisoblash uchun mo‘ljallangan.
                APACHE II balli, bemorlarning kasallik darajasini baholashda va davolash natijalarini oldindan aytishda yordam beradi.
            </p>
            <p>
                <strong>MDRD Formulasi:</strong><br />
                MDRD formulasi quyidagicha:<br />
                eGFR (mL/min/1.73 m²) = 175 × (serum kreatinin)^-1.154 × (yosh)^-0.203 × (0.742 agar ayol bo'lsa) × (1.212 agar qora tanli bo'lsa)
            </p>

            <label>
                Yosh:
                <input
                    className="input-field"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </label>

            <label>
                Temperatura (°C):
                <input
                    className="input-field"
                    type="number"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                />
            </label>

            <label>
                Sistolik qon bosimi (mmHg):
                <input
                    className="input-field"
                    type="number"
                    value={systolicBP}
                    onChange={(e) => setSystolicBP(e.target.value)}
                />
            </label>

            <label>
                Puls tezligi (marta/daqiqa):
                <input
                    className="input-field"
                    type="number"
                    value={pulse}
                    onChange={(e) => setPulse(e.target.value)}
                />
            </label>

            <label>
                Nafas tezligi (marta/daqiqa):
                <input
                    className="input-field"
                    type="number"
                    value={respiratoryRate}
                    onChange={(e) => setRespiratoryRate(e.target.value)}
                />
            </label>

            <label>
                PaO2 (mmHg):
                <input
                    className="input-field"
                    type="number"
                    value={paO2}
                    onChange={(e) => setPaO2(e.target.value)}
                />
            </label>

            <label>
                Bikarbonat (mEq/L):
                <input
                    className="input-field"
                    type="number"
                    value={bicarbonate}
                    onChange={(e) => setBicarbonate(e.target.value)}
                />
            </label>

            <label>
                pH darajasi:
                <input
                    className="input-field"
                    type="number"
                    value={ph}
                    onChange={(e) => setPh(e.target.value)}
                />
            </label>

            <label>
                Serum kreatinin (mg/dL):
                <input
                    className="input-field"
                    type="number"
                    value={creatinine}
                    onChange={(e) => setCreatinine(e.target.value)}
                />
            </label>

            <label>
                Serum natriy (mEq/L):
                <input
                    className="input-field"
                    type="number"
                    value={sodium}
                    onChange={(e) => setSodium(e.target.value)}
                />
            </label>

            <label>
                Serum kaltsiy (mg/dL):
                <input
                    className="input-field"
                    type="number"
                    value={calcium}
                    onChange={(e) => setCalcium(e.target.value)}
                />
            </label>

            <label>
                Surunkali kasallik (ha yoki yo'q):
                <select className="input-field" value={chronicDisease} onChange={(e) => setChronicDisease(e.target.value)}>
                    <option value="">Tanlang</option>
                    <option value="yes">Ha</option>
                    <option value="no">Yo'q</option>
                </select>
            </label>

            <button onClick={calculateScore} className="calculate-button">Hisoblash</button>

            {score !== null && <h3>APACHE II Balli: {score}</h3>}
        </div>
    );
}

export default ApacheIICalculator;
