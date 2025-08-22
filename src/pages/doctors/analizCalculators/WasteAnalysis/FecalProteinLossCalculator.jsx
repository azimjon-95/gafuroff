import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const FecalProteinLossCalculator = () => {
    const [fecalProtein, setFecalProtein] = useState('');
    const [output, setOutput] = useState(null);

    const calculateProteinLoss = () => {
        if (fecalProtein) {
            // Najosat orqali chiqarilayotgan oqsilni hisoblash
            const proteinLossValue = parseFloat(fecalProtein).toFixed(2);
            setOutput(`Najosat orqali chiqarilayotgan oqsil miqdori: ${proteinLossValue} g/dia.`);
        }
    };

    return (
        <div className="calculator-container">
            <h1>Najosat Oqsil Yo'qotish Kalkulyatori</h1>
            <h2>Formulasi: Oqsil yo'qotish (g/dia) = Najosatdagi oqsil miqdori</h2>
            <div>
                <label>
                    Najosatdagi oqsil miqdori (g/dia):
                    <input
                        type="number"
                        placeholder="Oqsil miqdorini kiriting (g/dia)"
                        className="input-field"
                        value={fecalProtein}
                        onChange={(e) => setFecalProtein(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={calculateProteinLoss}>Hisoblash</button>
            {output && (
                <h3>{output}</h3>
            )}
        </div>
    );
};

export default FecalProteinLossCalculator;
