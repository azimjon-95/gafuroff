import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const NitrateNitriteTestCalculator = () => {
    const [nitrateLevel, setNitrateLevel] = useState(''); // Siydikdagi nitrat darajasi
    const [nitriteLevel, setNitriteLevel] = useState(''); // Siydikdagi nitrit darajasi
    const [result, setResult] = useState(null); // Natija

    const checkInfection = () => {
        if (nitriteLevel > 0) {
            setResult("Bakterial infeksiya mavjud bo'lishi mumkin.");
        } else if (nitrateLevel > 0) {
            setResult("Bakterial infeksiya aniqlanmaydi, lekin nitratlar mavjud.");
        } else {
            setResult("Nitrat va nitrit mavjud emas, bakterial infeksiya yo'q.");
        }
    };

    return (
        <div className="calculator-container" style={{ padding: '20px' }}>
            <h2>Siydikdagi Nitrat/Nitrit Test Kalkulyatori</h2>
            <h3>Formulasi:</h3>
            <p>
                Nitritning mavjudligi bakterial infeksiya belgisidir. <br />
                Agar nitrit darajasi 0 dan katta bo'lsa, bakterial infeksiya mavjud bo'lishi mumkin.
            </p>
            <p>
                Ushbu kalkulyator siydikdagi nitrat va nitrit darajalarini inobatga olib, bakterial infeksiya mavjudligini aniqlashga yordam beradi.
            </p>

            <div>
                <label htmlFor="nitrate">Siydikdagi Nitrat (mg/dL)
                    <input
                        id="nitrate"
                        className="input-field"
                        type="number"
                        placeholder="Nitrat darajasini kiriting..."
                        value={nitrateLevel}
                        onChange={(e) => setNitrateLevel(e.target.value)}
                    />
                </label>
            </div>

            <div>
                <label htmlFor="nitrite">Siydikdagi Nitrit (mg/dL)
                    <input
                        id="nitrite"
                        className="input-field"
                        type="number"
                        placeholder="Nitrit darajasini kiriting..."
                        value={nitriteLevel}
                        onChange={(e) => setNitriteLevel(e.target.value)}
                    />
                </label>
            </div>

            <button onClick={checkInfection}>Tekshirish</button>
            {result && (
                <div className="result">
                    <h2>Natija: {result}</h2>
                </div>
            )}
        </div>
    );
};

export default NitrateNitriteTestCalculator;

