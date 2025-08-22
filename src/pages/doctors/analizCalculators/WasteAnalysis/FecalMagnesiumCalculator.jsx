import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const FecalMagnesiumCalculator = () => {
    const [magnesium, setMagnesium] = useState('');
    const [output, setOutput] = useState(null);

    const calculateMagnesium = () => {
        if (magnesium) {
            // Magniy kontsentratsiyasi (mg/g) ni hisoblash
            const magnesiumValue = parseFloat(magnesium).toFixed(2);
            setOutput(`Najosatda magniy miqdori: ${magnesiumValue} mg/g`);
        }
    };

    return (
        <div className="calculator-container">
            <h2>Najosatda Magniy Kalkulyatori</h2>
            <p>
                Ushbu kalkulyator najosatda mavjud magniy miqdorini hisoblash uchun ishlatiladi.
                Magniy konsentratsiyasini mg/g ko'rsatkichida kiriting.
            </p>
            <p><strong>Formula:</strong> Magniy (mg/g) = Najosatdagi magniy miqdori</p>

            <div>
                <label>
                    Najosatdagi magniy miqdori (mg/g):
                    <input
                        type="number"
                        placeholder="Magniy miqdori (mg/g)"
                        className="input-field"
                        value={magnesium}
                        onChange={(e) => setMagnesium(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={calculateMagnesium}>Hisoblash</button>
            {output && (
                <h3>{output}</h3>
            )}
        </div>
    );
};

export default FecalMagnesiumCalculator;
