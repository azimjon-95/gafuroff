import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const FecalPotassiumCalculator = () => {
    const [fecalPotassium, setFecalPotassium] = useState('');
    const [output, setOutput] = useState(null);

    const calculateFecalPotassium = () => {
        if (fecalPotassium) {
            // Kaliy kontsentratsiyasi (mg/g) ni hisoblash
            const potassiumValue = parseFloat(fecalPotassium).toFixed(2);
            setOutput(`Najosatda kaliy miqdori: ${potassiumValue} mg/g`);
        }
    };

    return (
        <div className="calculator-container">
            <h1>Najosatda Kaliy Kalkulyatori</h1>
            <h2>Formulasi: Kaliy (mg/g) = Najosatdagi kaliy miqdori</h2>
            <div>
                <label>
                    Najosatdagi kaliy miqdori (mg/g):
                    <input
                        type="number"
                        placeholder="Kaliy miqdorini kiriting (mg/g)"
                        className="input-field"
                        value={fecalPotassium}
                        onChange={(e) => setFecalPotassium(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={calculateFecalPotassium}>Hisoblash</button>
            {output && (
                <h3>{output}</h3>
            )}
        </div>
    );
};

export default FecalPotassiumCalculator;

