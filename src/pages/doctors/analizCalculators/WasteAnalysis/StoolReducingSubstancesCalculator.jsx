import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const StoolReducingSubstancesCalculator = () => {
    const [reducingSubstances, setReducingSubstances] = useState('');
    const [stoolWeight, setStoolWeight] = useState('');
    const [reducingSubstancesContent, setReducingSubstancesContent] = useState(null);

    const calculateReducingSubstances = () => {
        if (reducingSubstances && stoolWeight) {
            const reducingSubstancesPercentage = (parseFloat(reducingSubstances) / parseFloat(stoolWeight)) * 100;
            setReducingSubstancesContent(reducingSubstancesPercentage);
        }
    };

    return (
        <div>
            <h1>Najosatdagi Reducing Substances Kalkulyatori</h1>
            <h2>Formulasi: Uglevodlar miqdori (%) = (Najosatda reducing substances (g) / Najosat og‘irligi (g)) × 100</h2>
            <div>
                <label>
                    Najosatda reducing substances (g):
                    <input
                        type="number"
                        placeholder="Najosatda reducing substances miqdorini kiriting"
                        value={reducingSubstances}
                        onChange={(e) => setReducingSubstances(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Najosat og‘irligi (g):
                    <input
                        type="number"
                        placeholder="Najosat og‘irligini kiriting"
                        value={stoolWeight}
                        onChange={(e) => setStoolWeight(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={calculateReducingSubstances}>Hisoblash</button>
            {reducingSubstancesContent !== null && (
                <h3>Najosatda uglevodlar miqdori: {reducingSubstancesContent.toFixed(2)}%</h3>
            )}
        </div>
    );
};

export default StoolReducingSubstancesCalculator;
