import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const PotassiumCreatinineRatioCalculator = () => {
    const [potassium, setPotassium] = useState(''); // Kaliyning miqdori
    const [creatinine, setCreatinine] = useState(''); // Kreatinin miqdori
    const [result, setResult] = useState(null); // Natija

    const calculateRatio = () => {
        if (potassium >= 0 && creatinine > 0) {
            const calculatedResult = (potassium / creatinine).toFixed(2); // Nisbati hisoblash
            setResult(calculatedResult); // Natijani saqlash
        } else {
            alert("Kreatinin miqdori 0 dan kichik bo'lmasligi kerak");
        }
    };

    return (
        <div className="calculator-container" >
            <h2>Siydikdagi Kaliyning Kreatinin Nisbati Kalkulyatori</h2>
            <h3>Formulasi:</h3>
            <p>
                Urine Potassium/Creatinine Ratio = Kaliyning miqdori (mmol/L) / Kreatinin miqdori (mmol/L)
            </p>
            <p>
                Ushbu kalkulyator siydikdagi kaliyning miqdorini va kreatinin miqdorini hisobga olib, kaliyning kreatinin nisbati
                ni hisoblashga yordam beradi. Bu nisbati, siydik analizlarida kaliyning holatini aniqlash uchun muhimdir.
            </p>

            <label htmlFor="potassium">Kaliyning miqdori (mmol/L)</label>
            <input
                id="potassium"
                className="input-field"
                type="number"
                placeholder="Kaliyning miqdori (mmol/L)"
                value={potassium}
                onChange={(e) => setPotassium(e.target.value)}
            />

            <label htmlFor="creatinine">Kreatinin miqdori (mmol/L)</label>
            <input
                id="creatinine"
                className="input-field"
                type="number"
                placeholder="Kreatinin miqdori (mmol/L)"
                value={creatinine}
                onChange={(e) => setCreatinine(e.target.value)}
            />

            <button onClick={calculateRatio}>Hisoblash</button>
            {result !== null && (
                <div className="result">
                    <h2>Kaliyning Kreatinin Nisbati: {result}</h2>
                </div>
            )}
        </div>
    );
};

export default PotassiumCreatinineRatioCalculator;
