import React, { useState } from 'react';

function ChildPughCalculator() {
    const [bilirubin, setBilirubin] = useState('');
    const [albumin, setAlbumin] = useState('');
    const [prothrombin, setProthrombin] = useState('');
    const [ascites, setAscites] = useState('');
    const [encephalopathy, setEncephalopathy] = useState('');
    const [score, setScore] = useState(null);

    const calculateScore = () => {
        let totalScore = 0;

        // Bilirubin
        if (bilirubin && parseFloat(bilirubin) < 2) totalScore += 1;
        else if (bilirubin && parseFloat(bilirubin) <= 3) totalScore += 2;
        else if (bilirubin) totalScore += 3;

        // Albumin
        if (albumin && parseFloat(albumin) > 3.5) totalScore += 1;
        else if (albumin && parseFloat(albumin) >= 2.8) totalScore += 2;
        else if (albumin) totalScore += 3;

        // Prothrombin
        if (prothrombin && parseFloat(prothrombin) < 4) totalScore += 1;
        else if (prothrombin && parseFloat(prothrombin) <= 6) totalScore += 2;
        else if (prothrombin) totalScore += 3;

        // Ascites
        if (ascites === 'none') totalScore += 1;
        else if (ascites === 'soft') totalScore += 2;
        else if (ascites === 'severe') totalScore += 3;

        // Encephalopathy
        if (encephalopathy === 'none') totalScore += 1;
        else if (encephalopathy === 'mild') totalScore += 2;
        else if (encephalopathy === 'severe') totalScore += 3;

        setScore(totalScore);
    };

    return (
        <div className="calculator-container">
            <h2>Child-Pugh Kalkulyatori</h2>
            <p>
                Ushbu kalkulyator Child-Pugh ballini hisoblashga yordam beradi,
                bu esa jigar kasalliklarining og'irligini baholashda qo'llaniladi.
                <br />
                <strong>MDRD formulasi</strong>:
                <em> GFR = 186 × (kreatinin)^-1.154 × (yosh)^-0.203 × (0.742, agar ayol bo'lsa) × (1.212, agar afro-amerikalik bo'lsa)</em>
            </p>

            <label>
                Serum bilirubin darajasi (mg/dL):
                <input className="input-field"
                    type="number"
                    value={bilirubin}
                    onChange={(e) => setBilirubin(e.target.value)}
                />
            </label>

            <label>
                Serum albumin darajasi (g/dL):
                <input className="input-field"
                    type="number"
                    value={albumin}
                    onChange={(e) => setAlbumin(e.target.value)}
                />
            </label>

            <label>
                Prothrombin vaqt (soniya):
                <input className="input-field"
                    type="number"
                    value={prothrombin}
                    onChange={(e) => setProthrombin(e.target.value)}
                />
            </label>

            <label>
                Ascites:
                <select className="input-field" value={ascites} onChange={(e) => setAscites(e.target.value)}>
                    <option value="">Tanlang</option>
                    <option value="none">Yo'q</option>
                    <option value="soft">Yumshoq</option>
                    <option value="severe">O'tkir</option>
                </select>
            </label>

            <label>
                Ensefalopatiya:
                <select className="input-field" value={encephalopathy} onChange={(e) => setEncephalopathy(e.target.value)}>
                    <option value="">Tanlang</option>
                    <option value="none">Yo'q</option>
                    <option value="mild">1-2 daraja</option>
                    <option value="severe">3-4 daraja</option>
                </select>
            </label>

            <button className="calculate-button" onClick={calculateScore}>Hisoblash</button>

            {score !== null && (
                <div className="result">
                    <h3>Child-Pugh balli: {score}</h3>
                </div>
            )}
        </div>
    );
}

export default ChildPughCalculator;
