import React, { useState } from 'react';
import './style.css'; // Uslub faylini qo'shamiz

function LDLCholesterolCalculator() {
    const [totalCholesterol, setTotalCholesterol] = useState('');
    const [hdl, setHdl] = useState('');
    const [triglycerides, setTriglycerides] = useState('');
    const [ldl, setLdl] = useState(null);

    const calculateLDL = () => {
        if (!totalCholesterol || !hdl || !triglycerides) {
            alert('Iltimos, barcha kerakli maydonlarni to‘ldiring.');
            return;
        }

        const triglycerideValue = parseFloat(triglycerides);
        if (triglycerideValue > 400) {
            alert('Triglitseridlar darajasi 400 mg/dL dan yuqori bo‘lsa, Friedewald formulasi qo‘llanilmaydi.');
            return;
        }

        const ldlValue = parseFloat(totalCholesterol) - parseFloat(hdl) - (triglycerideValue / 5);
        setLdl(ldlValue.toFixed(2));
    };

    return (
        <div className="calculator-container">
            <h2>LDL Xolesterin Kalkulyatori (Friedewald Formula)</h2>
            <p>
                Ushbu kalkulyator LDL (low-density lipoprotein) xolesterin darajasini hisoblash uchun
                Friedewald formulasidan foydalanadi. LDL darajasi umumiy xolesterin, HDL (high-density lipoprotein)
                va triglitseridlar asosida hisoblanadi.
                <br />
                <strong>MDRD formulasi</strong>:
                <em> GFR = 186 × (kreatinin)^-1.154 × (yosh)^-0.203 × (0.742, agar ayol bo'lsa) × (1.212, agar afro-amerikalik bo'lsa)</em>
            </p>

            <label>
                Umumiy Xolesterin (mg/dL):
                <input
                    type="number"
                    value={totalCholesterol}
                    onChange={(e) => setTotalCholesterol(e.target.value)}
                    className="input-field"
                />
            </label>

            <label>
                HDL (mg/dL):
                <input
                    type="number"
                    value={hdl}
                    onChange={(e) => setHdl(e.target.value)}
                    className="input-field"
                />
            </label>

            <label>
                Triglitseridlar (mg/dL):
                <input
                    type="number"
                    value={triglycerides}
                    onChange={(e) => setTriglycerides(e.target.value)}
                    className="input-field"
                />
            </label>

            <button onClick={calculateLDL} className="calculate-button">Hisoblash</button>

            {ldl && (
                <div className="result">
                    <h3>LDL Xolesterin: {ldl} mg/dL</h3>
                </div>
            )}
        </div>
    );
}

export default LDLCholesterolCalculator;
