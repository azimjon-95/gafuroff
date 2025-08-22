import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const ChlorideCalculator = () => {
    const [chloride, setChloride] = useState(''); // Xlorid darajasi
    const [result, setResult] = useState(null);

    const calculateChloride = () => {
        if (chloride >= 0) {
            // Xloridni hisoblash formulasi
            const calculatedResult = (chloride * 0.0283).toFixed(2);
            setResult(calculatedResult); // Natijani saqlash
        } else {
            alert("Xlorid miqdori 0 dan kichik bo'lmasligi kerak");
        }
    };

    return (
        <div className="calculator-container" style={{ padding: '20px' }}>
            <h2>Siydikdagi Xlorid Kalkulyatori</h2>
            <h3>Formulasi: Urine Chloride (mmol/L) = Xlorid miqdori (mg/dL) × 0.0283</h3>
            <p>
                Ushbu kalkulyator sizga siydikdagi xlorid darajasini hisoblash imkonini beradi.
                Kiritilgan xlorid miqdori mg/dL (milligram per deciliter) da bo'lishi kerak.
            </p>

            <label htmlFor="chloride" >
                Xlorid miqdori (mg/dL):

                <input
                    id="chloride"
                    className="input-field"
                    type="number"
                    placeholder="Xlorid miqdori (mg/dL)"
                    value={chloride}
                    onChange={(e) => setChloride(e.target.value)}
                />
            </label>
            <button onClick={calculateChloride}>Hisoblash</button>
            {result !== null && (
                <div>
                    <h2>Xlorid Miqdori: {result} mmol/L</h2>
                </div>
            )}
        </div>
    );
};

export default ChlorideCalculator;
