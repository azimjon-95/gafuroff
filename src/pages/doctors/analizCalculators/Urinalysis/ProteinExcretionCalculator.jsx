import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const ProteinExcretionCalculator = () => {
    const [proteinConcentration, setProteinConcentration] = useState(''); // Siydikdagi oqsil miqdori
    const [urineVolume, setUrineVolume] = useState(''); // Siydik hajmi
    const [result, setResult] = useState(null); // Natija

    const calculateExcretion = () => {
        if (proteinConcentration >= 0 && urineVolume >= 0) {
            const calculatedResult = (proteinConcentration * urineVolume).toFixed(2); // Oqsil chiqarilishining hisoblanishi
            setResult(calculatedResult); // Natijani saqlash
        } else {
            alert("Siydikdagi oqsil va siydik hajmi 0 dan kichik bo'lmasligi kerak");
        }
    };

    return (
        <div className="calculator-container" >
            <h2>Siydikdagi Oqsil Chiqarilishi Kalkulyatori</h2>
            <h3>Formulasi:</h3>
            <p>Urine Protein Excretion = Siydikdagi Oqsil (mg/dL) × Siydik Miqdori (L)</p>
            <p>
                Ushbu kalkulyator siydikdagi oqsil miqdorini va siydik hajmini hisobga olib, oqsil chiqarilishi
                ni hisoblashga yordam beradi. Bu natija, siydik analizlarida oqsil miqdorini aniqlash uchun muhimdir.
            </p>

            <label htmlFor="proteinConcentration">Siydikdagi Oqsil (mg/dL)
                <input
                    id="proteinConcentration"
                    className="input-field"
                    type="number"
                    placeholder="Siydikdagi Oqsil (mg/dL)"
                    value={proteinConcentration}
                    onChange={(e) => setProteinConcentration(e.target.value)}
                />
            </label>
            <label htmlFor="urineVolume">Siydik Hajmi (L)
                <input
                    id="urineVolume"
                    className="input-field"
                    type="number"
                    placeholder="Siydik Hajmi (L)"
                    value={urineVolume}
                    onChange={(e) => setUrineVolume(e.target.value)}
                />
            </label>
            <button onClick={calculateExcretion}>Hisoblash</button>
            {result !== null && (
                <div className="result">
                    <h2>Siydikdagi Oqsil Chiqarilishi: {result} mg</h2>
                </div>
            )}
        </div>
    );
};

export default ProteinExcretionCalculator;
