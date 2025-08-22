import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const SodiumExcretionCalculator = () => {
    const [sodiumConcentration, setSodiumConcentration] = useState(''); // Siydikdagi natriy miqdori
    const [urineVolume, setUrineVolume] = useState(''); // Siydik hajmi
    const [result, setResult] = useState(null); // Natija

    const calculateExcretion = () => {
        if (sodiumConcentration >= 0 && urineVolume >= 0) {
            const calculatedResult = (sodiumConcentration * urineVolume).toFixed(2); // Natrij chiqarilishining hisoblanishi
            setResult(calculatedResult); // Natijani saqlash
        } else {
            alert("Siydikdagi natriy va siydik hajmi 0 dan kichik bo'lmasligi kerak");
        }
    };

    return (
        <div className="calculator-container" >
            <h2>Siydikdagi Natriy Chiqarilishi Kalkulyatori</h2>
            <h3>Formulasi:</h3>
            <p>Urine Sodium Excretion = Siydikdagi Natriy (mmol/L) × Siydik Hajmi (L)</p>
            <p>
                Ushbu kalkulyator siydikdagi natriy miqdorini va siydik hajmini hisobga olib, natriy chiqarilishi
                ni hisoblashga yordam beradi. Bu natija, siydik analizlarida natriy miqdorini aniqlash uchun muhimdir.
            </p>

            <label htmlFor="sodiumConcentration">Siydikdagi Natriy (mmol/L)
                <input
                    id="sodiumConcentration"
                    className="input-field"
                    type="number"
                    placeholder="Siydikdagi Natriy (mmol/L)"
                    value={sodiumConcentration}
                    onChange={(e) => setSodiumConcentration(e.target.value)}
                />
            </label>
            <label htmlFor="urineVolume">Siydik Hajmi (L)
                <input
                    id="urineVolume"
                    className="input-field"
                    type="number"
                    placeholder="Siydik Hajmi (L)"
                    value={urineVolume}
                    onChange={(e) => setUrineVolume(e.target.value)}
                />
            </label>
            <button onClick={calculateExcretion}>Hisoblash</button>
            {result !== null && (
                <div className="result">
                    <h2>Siydikdagi Natriy Chiqarilishi: {result} mmol</h2>
                </div>
            )}
        </div>
    );
};

export default SodiumExcretionCalculator;
