import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const FecalReducingSugarsCalculator = () => {
    const [reducingSugars, setReducingSugars] = useState('');
    const [output, setOutput] = useState(null);

    const calculateReducingSugars = () => {
        if (reducingSugars) {
            // Najosatda uglevodlarning hazm qilinmagan qismini hisoblash
            const sugarsValue = parseFloat(reducingSugars).toFixed(2);
            setOutput(`Najosatda uglevodlarning hazm qilinmagan qismi: ${sugarsValue} g/dia.`);
        }
    };

    return (
        <div>
            <h1>Najosatdagi Qaytariluvchi Shakar Kalkulyatori</h1>
            <h2>Formulasi: Hazm qilinmagan uglevodlar (g/dia) = Najosatdagi qaytariluvchi shakar miqdori</h2>
            <div>
                <label>
                    Najosatda qaytariluvchi shakar miqdori (g/dia):
                    <input
                        type="number"
                        placeholder="Shakar miqdorini kiriting (g/dia)"
                        value={reducingSugars}
                        onChange={(e) => setReducingSugars(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={calculateReducingSugars}>Hisoblash</button>
            {output && (
                <h3>{output}</h3>
            )}
        </div>
    );
};

export default FecalReducingSugarsCalculator;

