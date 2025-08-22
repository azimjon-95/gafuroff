import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const FOBTCalculator = () => {
    const [totalTests, setTotalTests] = useState('');
    const [positiveTests, setPositiveTests] = useState('');
    const [result, setResult] = useState(null);

    const calculateFOBT = () => {
        if (totalTests && positiveTests) {
            const percentage = (positiveTests / totalTests) * 100;
            setResult(percentage.toFixed(2));
        }
    };

    return (
        <div>
            <h1>Fecal Occult Blood Test (FOBT) Kalkulyatori</h1>
            <h2>Formulasi: FOBT natijasi = (Musbat testlar soni / Jami testlar soni) × 100</h2>
            <div>
                <label>
                    Jami testlar soni:
                    <input
                        type="number"
                        placeholder="Jami testlar sonini kiriting"
                        value={totalTests}
                        onChange={(e) => setTotalTests(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Musbat testlar soni:
                    <input
                        type="number"
                        placeholder="Musbat testlar sonini kiriting"
                        value={positiveTests}
                        onChange={(e) => setPositiveTests(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={calculateFOBT}>Hisoblash</button>
            {result !== null && (
                <h3>FOBT natijasi: {result}%</h3>
            )}
        </div>
    );
};

export default FOBTCalculator;

