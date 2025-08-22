import React, { useState } from 'react';
import './style.css'; // CSS faylini import qilish

function MAPCalculator() {
    const [systolicBP, setSystolicBP] = useState('');
    const [diastolicBP, setDiastolicBP] = useState('');
    const [map, setMAP] = useState(null);

    const calculateMAP = () => {
        if (!systolicBP || !diastolicBP) {
            alert('Iltimos, barcha maydonlarni to‘ldiring.');
            return;
        }

        const mapValue = parseFloat(diastolicBP) + (parseFloat(systolicBP) - parseFloat(diastolicBP)) / 3;
        setMAP(mapValue.toFixed(2));
    };

    return (
        <div className="calculator-container">
            <h2 className="calculator-title">Mean Arterial Pressure (MAP) Kalkulyatori</h2>

            <p className="calculator-description">
                Ushbu kalkulyator yordamida arterial bosimning o'rtacha qiymatini (MAP) hisoblash mumkin. Arterial bosimning o'rtacha qiymati organizmdagi qon aylanishi jarayonini samarali baholash uchun ishlatiladi.
                <br />
                <strong>Formula: MAP = Diastolik BP + (Sistolik BP - Diastolik BP) / 3</strong>
            </p>

            <div className="input-group">
                <input
                    className="input-field"
                    type="number"
                    value={systolicBP}
                    onChange={(e) => setSystolicBP(e.target.value)}
                    placeholder="Sistolik Qon Bosimi (mmHg)"
                />

                <input
                    className="input-field"
                    type="number"
                    value={diastolicBP}
                    onChange={(e) => setDiastolicBP(e.target.value)}
                    placeholder="Diastolik Qon Bosimi (mmHg)"
                />
            </div>

            <button className="calculate-button" onClick={calculateMAP}>Hisoblash</button>

            {map && (
                <div className="result">
                    <h3>Arterial Bosimning O‘rtacha Qiymati (MAP): {map} mmHg</h3>
                </div>
            )}
        </div>
    );
}

export default MAPCalculator;
