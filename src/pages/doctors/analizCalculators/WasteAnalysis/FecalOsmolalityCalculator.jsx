import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const FecalOsmolalityCalculator = () => {
    const [sodium, setSodium] = useState('');
    const [potassium, setPotassium] = useState('');
    const [urea, setUrea] = useState('');
    const [fecalOsmolality, setFecalOsmolality] = useState(null);

    const calculateFecalOsmolality = () => {
        if (sodium && potassium && urea) {
            // Fecal osmolality formulasi: Osmolality = 2 * (Sodium + Potassium) + Urea
            const calculatedOsmolality = (2 * (parseFloat(sodium) + parseFloat(potassium)) + parseFloat(urea)).toFixed(2);
            setFecalOsmolality(calculatedOsmolality);
        }
    };

    return (
        <div className="calculator-container">
            <h2>Najosatning Osmolyar Kalkulyatori</h2>
            <p>
                Ushbu kalkulyator natriy, kaliy va urea konsentratsiyalariga asoslangan holda najosatning osmolyar kontsentratsiyasini hisoblash uchun mo'ljallangan.
            </p>
            <p><strong>Formula:</strong> Osmolyar = 2 * (Natriy + Kaliy) + Urea</p>

            <div>
                <label>
                    Natriy (mEq/L):
                    <input
                        type="number"
                        placeholder="Natriy miqdori (mEq/L)"
                        className="input-field"
                        value={sodium}
                        onChange={(e) => setSodium(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Kaliy (mEq/L):
                    <input
                        type="number"
                        placeholder="Kaliy miqdori (mEq/L)"
                        className="input-field"
                        value={potassium}
                        onChange={(e) => setPotassium(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Urea (mg/dL):
                    <input
                        type="number"
                        placeholder="Urea miqdori (mg/dL)"
                        className="input-field"
                        value={urea}
                        onChange={(e) => setUrea(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={calculateFecalOsmolality}>Hisoblash</button>
            {fecalOsmolality !== null && (
                <h3>Najosatning Osmolyar Kontsentratsiyasi: {fecalOsmolality} mOsm/kg</h3>
            )}
        </div>
    );
};

export default FecalOsmolalityCalculator;
