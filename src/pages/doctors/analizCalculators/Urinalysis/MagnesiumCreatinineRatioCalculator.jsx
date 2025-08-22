import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const MagnesiumCreatinineRatioCalculator = () => {
    const [magnesiumConcentration, setMagnesiumConcentration] = useState(''); // Magniy darajasi
    const [creatinineConcentration, setCreatinineConcentration] = useState(''); // Kreatinin darajasi
    const [result, setResult] = useState(null); // Natija

    const calculateRatio = () => {
        if (magnesiumConcentration >= 0 && creatinineConcentration > 0) {
            const calculatedResult = (magnesiumConcentration / creatinineConcentration).toFixed(2); // Nisbati hisoblash
            setResult(calculatedResult);
        } else {
            alert("Siydikdagi magniy va kreatinin qiymatlari 0 dan kichik bo'lmasligi kerak va kreatinin qiymati 0 dan katta bo'lishi shart.");
        }
    };

    return (
        <div className="calculator-container" style={{ padding: '20px' }}>
            <h2>Siydikdagi Magniy/Kreatinin Nisbati Kalkulyatori</h2>
            <h3>Formulasi:</h3>
            <p>
                Urine Magnesium/Creatinine Ratio = Siydikdagi Magniy (mmol/L) / Siydikdagi Kreatinin (mmol/L)
            </p>
            <p>
                Ushbu kalkulyator siydikdagi magniy va kreatinin darajalarini inobatga olib magniy/kreatinin nisbati hisoblashga yordam beradi.
                Iltimos, barcha maydonlarni to'ldiring.
            </p>

            <label htmlFor="magnesium">Siydikdagi Magniy (mmol/L):
                <input
                    id="magnesium"
                    className="input-field"
                    type="number"
                    value={magnesiumConcentration}
                    onChange={(e) => setMagnesiumConcentration(e.target.value)}
                />
            </label>
            <label htmlFor="creatinine">Siydikdagi Kreatinin (mmol/L):
                <input
                    id="creatinine"
                    className="input-field"
                    type="number"
                    value={creatinineConcentration}
                    onChange={(e) => setCreatinineConcentration(e.target.value)}
                />
            </label>
            <button onClick={calculateRatio} style={{ marginTop: '10px' }}>
                Hisoblash
            </button>
            {result && (
                <div>
                    <h2>Siydikdagi Magniy/Kreatinin Nisbati: {result}</h2>
                </div>
            )}
        </div>
    );
};

export default MagnesiumCreatinineRatioCalculator;
