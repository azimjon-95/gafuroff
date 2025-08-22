import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const FecalLactoferrinCalculator = () => {
    const [lactoferrin, setLactoferrin] = useState('');
    const [output, setOutput] = useState(null);

    const calculateLactoferrin = () => {
        if (lactoferrin) {
            // Najosatda laktoferrin miqdorini hisoblash
            const lactoferrinValue = parseFloat(lactoferrin).toFixed(2);
            setOutput(`Najosatda laktoferrin miqdori: ${lactoferrinValue} mg/kg.`);
        }
    };

    return (
        <div className="calculator-container">
            <h2>Najosatdagi Laktoferrin Kalkulyatori</h2>
            <p>
                Bu kalkulyator najosatdagi laktoferrin miqdorini hisoblash uchun ishlatiladi.
                Siz laktoferrin miqdorini milligramm/kilogramm (mg/kg) ko'rsatishingiz kerak.
            </p>
            <p><strong>Formula:</strong> Najosatdagi laktoferrin miqdori (mg/kg)</p>

            <div>
                <input
                    type="number"
                    placeholder="Najosatda laktoferrin miqdori (mg/kg)"
                    className="input-field"
                    value={lactoferrin}
                    onChange={(e) => setLactoferrin(e.target.value)}
                />
            </div>
            <button onClick={calculateLactoferrin}>Hisoblash</button>
            {output && (
                <h3>{output}</h3>
            )}
        </div>
    );
};

export default FecalLactoferrinCalculator;
