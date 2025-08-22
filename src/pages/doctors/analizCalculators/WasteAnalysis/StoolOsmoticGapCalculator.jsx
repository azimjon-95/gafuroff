import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const StoolOsmoticGapCalculator = () => {
    const [stoolOsmolality, setStoolOsmolality] = useState('');
    const [serumOsmolality, setSerumOsmolality] = useState('');
    const [osmoticGap, setOsmoticGap] = useState(null);

    const calculateOsmoticGap = () => {
        if (stoolOsmolality && serumOsmolality) {
            const gap = parseFloat(serumOsmolality) - (2 * parseFloat(stoolOsmolality));
            setOsmoticGap(gap);
        }
    };

    return (
        <div>
            <h1>Stool Osmotic Gap Kalkulyatori</h1>
            <h2>Formulasi: Osmotic Gap = Serum Osmolality - (2 × Stool Osmolality)</h2>
            <div>
                <label>
                    Najosat osmolarligi (mOsm/kg):
                    <input
                        type="number"
                        placeholder="Najosat osmolarligini kiriting"
                        value={stoolOsmolality}
                        onChange={(e) => setStoolOsmolality(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Qon osmolarligi (mOsm/kg):
                    <input
                        type="number"
                        placeholder="Qon osmolarligini kiriting"
                        value={serumOsmolality}
                        onChange={(e) => setSerumOsmolality(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={calculateOsmoticGap}>Hisoblash</button>
            {osmoticGap !== null && (
                <h3>Osmotic Gap: {osmoticGap} mOsm/kg</h3>
            )}
        </div>
    );
};

export default StoolOsmoticGapCalculator;

