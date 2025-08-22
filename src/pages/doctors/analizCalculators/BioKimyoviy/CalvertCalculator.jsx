import React, { useState } from 'react';
import './style.css'; // Uslub faylini qo'shamiz

function CalvertCalculator() {
    const [auc, setAuc] = useState('');
    const [creatinineClearance, setCreatinineClearance] = useState('');
    const [concentration, setConcentration] = useState('');
    const [dose, setDose] = useState(null);

    const calculateDose = () => {
        if (!auc || !creatinineClearance || !concentration) {
            alert('Iltimos, barcha kerakli maydonlarni to‘ldiring.');
            return;
        }

        const aucValue = parseFloat(auc);
        const creatinineClearanceValue = parseFloat(creatinineClearance);
        const concentrationValue = parseFloat(concentration);

        const doseValue = aucValue * creatinineClearanceValue + concentrationValue;

        setDose(doseValue.toFixed(2));
    };

    return (
        <div className="calculator-container">
            <h2>Calvert Formulasi Kalkulyatori</h2>
            <p>
                Ushbu kalkulyator Calvert formulasidan foydalanib dori dozasini hisoblashga yordam beradi.
                Dori dozi AUC (area under the curve), kreatinin klirens va konsentratsiya ma'lumotlari
                asosida hisoblanadi.
                <br />
                <strong>MDRD formulasi</strong>:
                <em> GFR = 186 × (kreatinin)^-1.154 × (yosh)^-0.203 × (0.742, agar ayol bo'lsa) × (1.212, agar afro-amerikalik bo'lsa)</em>
            </p>

            <label>
                AUC:
                <input
                    type="number"
                    value={auc}
                    onChange={(e) => setAuc(e.target.value)}
                    className="input-field"
                />
            </label>

            <label>
                Kreatinin Klirens (mL/min):
                <input
                    type="number"
                    value={creatinineClearance}
                    onChange={(e) => setCreatinineClearance(e.target.value)}
                    className="input-field"
                />
            </label>

            <label>
                Konsentratsiya:
                <input
                    type="number"
                    value={concentration}
                    onChange={(e) => setConcentration(e.target.value)}
                    className="input-field"
                />
            </label>

            <button onClick={calculateDose} className="calculate-button">Hisoblash</button>

            {dose && (
                <div className="result">
                    <h3>Dori dozi: {dose} mg</h3>
                </div>
            )}
        </div>
    );
}

export default CalvertCalculator;
