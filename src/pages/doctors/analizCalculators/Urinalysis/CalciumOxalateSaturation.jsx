import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const CalciumOxalateSaturation = () => {
    const [calcium, setCalcium] = useState(''); // Kaltsiy darajasi
    const [oxalate, setOxalate] = useState(''); // Oksalat darajasi
    const [saturation, setSaturation] = useState(null);

    const calculateSaturation = () => {
        const calciumValue = parseFloat(calcium); // Kaltsiy darajasi
        const oxalateValue = parseFloat(oxalate); // Oksalat darajasi

        if (!isNaN(calciumValue) && !isNaN(oxalateValue) && calciumValue > 0 && oxalateValue > 0) {
            // Kaltsiy oksalat saturatsiyasini hisoblash formulasi
            const saturationValue = (calciumValue * oxalateValue) / 100; // Tahlil formulasi
            setSaturation(saturationValue.toFixed(2)); // Natijani 2 xonali raqam bilan saqlash
        } else {
            setSaturation("Iltimos, barcha maydonlarni to'ldiring va musbat raqam kiriting.");
        }
    };

    return (
        <div className="calculator-container" style={{ padding: '20px' }}>
            <h2>Calcium Oxalate Saturation Kalkulyatori</h2>
            <h3>Formulasi: Saturation = (Kaltsiy (mg/dL) × Oksalat (mg/dL)) / 100</h3>
            <p>
                Ushbu kalkulyator sizga siydikdagi kaltsiy va oksalat darajalarini kiritish orqali kaltsiy
                oksalat saturatsiyasini hisoblash imkonini beradi. Kalsiy va oksalat o'lchovlari mg/dL
                (milligram per deciliter) da berilishi kerak.
            </p>

            <label htmlFor="calcium">
                Kaltsiy darajasi (mg/dL):

                <input
                    id="calcium"
                    className="input-field"
                    type="number"
                    placeholder="Kaltsiy darajasi (mg/dL)"
                    value={calcium}
                    onChange={(e) => setCalcium(e.target.value)}
                />
            </label>
            <label htmlFor="oxalate">
                Oksalat darajasi (mg/dL):
                <input
                    id="oxalate"
                    className="input-field"
                    type="number"
                    placeholder="Oksalat darajasi (mg/dL)"
                    value={oxalate}
                    onChange={(e) => setOxalate(e.target.value)}
                />
            </label>
            <button onClick={calculateSaturation}>Hisoblash</button>
            {saturation !== null && (
                <div>
                    <h2>Saturatsiya: <strong>{saturation}</strong></h2>
                </div>
            )}
        </div>
    );
};

export default CalciumOxalateSaturation;

