import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const CalciumCalculator = () => {
    const [calcium, setCalcium] = useState('');
    const [creatinine, setCreatinine] = useState('');
    const [ratio, setRatio] = useState(null);

    const calculateRatio = () => {
        if (creatinine > 0) {
            const calculatedRatio = (calcium / creatinine).toFixed(2);
            setRatio(calculatedRatio);
        } else {
            alert("Kreatinin miqdori 0 dan katta bo'lishi kerak");
        }
    };

    return (
        <div className="calculator-container" style={{ padding: '20px' }}>
            <h2>Siydikdagi Kalsiy/Kreatinin Nisbati Kalkulyatori</h2>
            <h3>Formulasi: Urine Calcium/Creatinine Ratio = Urine Calcium (mg/dL) / Urine Creatinine (mg/dL)</h3>
            <p>
                Ushbu kalkulyator sizga siydikdagi kalsiy va kreatinin miqdorini kiritish orqali ularning nisbati
                ni hisoblash imkonini beradi. Kalsiy va kreatinin o'lchovlari mg/dL (milligram per deciliter) da
                berilishi kerak.
            </p>

            <label htmlFor="calcium" >
                Siydikdagi Kalsiy (mg/dL):

                <input
                    id="calcium"
                    className="input-field"
                    type="number"
                    placeholder="Siydikdagi Kalsiy (mg/dL)"
                    value={calcium}
                    onChange={(e) => setCalcium(e.target.value)}
                />
            </label>
            <label htmlFor="creatinine" >
                Siydikdagi Kreatinin (mg/dL):

                <input
                    id="creatinine"
                    className="input-field"
                    type="number"
                    placeholder="Siydikdagi Kreatinin (mg/dL)"
                    value={creatinine}
                    onChange={(e) => setCreatinine(e.target.value)}
                />
            </label>
            <button onClick={calculateRatio}>Hisoblash</button>
            {ratio && (
                <div>
                    <h2>Nisbat: {ratio}</h2>
                </div>
            )}
        </div>
    );
};

export default CalciumCalculator;
