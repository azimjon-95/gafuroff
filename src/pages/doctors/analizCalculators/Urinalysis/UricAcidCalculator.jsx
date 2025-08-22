import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const UricAcidCalculator = () => {
    const [urineUricAcid, setUrineUricAcid] = useState(''); // Siydikdagi urik kislotasi miqdori
    const [urineVolume, setUrineVolume] = useState(''); // Siydik hajmi
    const [uricAcidExcretion, setUricAcidExcretion] = useState(null); // Natija

    const calculateUricAcidExcretion = () => {
        // Urik kislotasi chiqarilishini hisoblash
        const excretion = (urineUricAcid * urineVolume);
        setUricAcidExcretion(excretion); // Natijani saqlash
    };

    return (
        <div className="calculator-container" >
            <h2>Siydikdagi Uric Acid Kalkulyatori</h2>
            <h3>Formulasi:</h3>
            <p>{`Uric Acid Excretion (mg/day) = Siydikdagi Uric Acid (mg/dL) * Siydik chiqarilishi (mL/day)`}</p>
            <p>
                Ushbu kalkulyator siydikdagi urik kislotasi miqdorini va siydik hajmini hisobga olib, urik kislotasi
                chiqarilishini hisoblashga yordam beradi.
            </p>

            <label htmlFor="urineUricAcid">Siydikdagi Uric Acid (mg/dL)
                <input
                    id="urineUricAcid"
                    className="input-field"
                    type="number"
                    placeholder="Siydikdagi Uric Acid (mg/dL)"
                    value={urineUricAcid}
                    onChange={(e) => setUrineUricAcid(e.target.value)}
                />
            </label>
            <label htmlFor="urineVolume">Siydik chiqarilishi (mL/day)
                <input
                    id="urineVolume"
                    className="input-field"
                    type="number"
                    placeholder="Siydik chiqarilishi (mL/day)"
                    value={urineVolume}
                    onChange={(e) => setUrineVolume(e.target.value)}
                />
            </label>
            <button onClick={calculateUricAcidExcretion}>Hisoblash</button>
            {uricAcidExcretion !== null && (
                <div className="result">
                    <h2>Siydik kislotasi chiqarilishi: {uricAcidExcretion.toFixed(2)} mg/day</h2>
                </div>
            )}
        </div>
    );
};

export default UricAcidCalculator;
