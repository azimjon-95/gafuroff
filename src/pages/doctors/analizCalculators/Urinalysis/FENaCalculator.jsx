import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const FENaCalculatorUrine = () => {
    const [urineSodium, setUrineSodium] = useState(''); // Siydikdagi Natriy
    const [plasmaSodium, setPlasmaSodium] = useState(''); // Plazmadagi Natriy
    const [urineCreatinine, setUrineCreatinine] = useState(''); // Siydikdagi Kreatinin
    const [plasmaCreatinine, setPlasmaCreatinine] = useState(''); // Plazmadagi Kreatinin
    const [result, setResult] = useState(null); // Natija

    const calculateFENa = () => {
        if (urineCreatinine > 0 && plasmaCreatinine > 0) {
            const numerator = (urineSodium / urineCreatinine) * 100; // Olib keluvchi
            const denominator = plasmaSodium / plasmaCreatinine; // Qisqaruvchi
            const fen = numerator / denominator; // FENa hisoblash
            setResult(fen);
        } else {
            setResult(null); // Agar 0 dan kichik bo'lsa natijani o'chirish
        }
    };

    return (
        <div className="calculator-container" >
            <h2>Fractional Excretion of Sodium (FENa) Kalkulyatori</h2>
            <h3>Formulasi:</h3>
            <p>
                FENa (%) = (U_Na / U_Cr) / (P_Na / P_Cr) × 100
            </p>
            <p>
                Ushbu kalkulyator siydik va plazma natriy va kreatinin darajalarini inobatga olib natriyning fractional excretionini hisoblashga yordam beradi.
                Iltimos, barcha maydonlarni to'ldiring.
            </p>

            <label htmlFor="urineSodium">Siydik Natriy (U_Na) darajasi (mmol/L)
                <input
                    id="urineSodium"
                    className="input-field"
                    type="number"
                    value={urineSodium}
                    onChange={(e) => setUrineSodium(e.target.value)}
                />
            </label>
            <label htmlFor="plasmaSodium">Plazma Natriy (P_Na) darajasi (mmol/L)
                <input
                    id="plasmaSodium"
                    className="input-field"
                    type="number"
                    value={plasmaSodium}
                    onChange={(e) => setPlasmaSodium(e.target.value)}
                />
            </label>
            <label htmlFor="urineCreatinine">Siydik Kreatinin (U_Cr) darajasi (mmol/L)
                <input
                    id="urineCreatinine"
                    className="input-field"
                    type="number"
                    value={urineCreatinine}
                    onChange={(e) => setUrineCreatinine(e.target.value)}
                />
            </label>
            <label htmlFor="plasmaCreatinine">Plazma Kreatinin (P_Cr) darajasi (mmol/L)
                <input
                    id="plasmaCreatinine"
                    className="input-field"
                    type="number"
                    value={plasmaCreatinine}
                    onChange={(e) => setPlasmaCreatinine(e.target.value)}
                />
            </label>
            <button onClick={calculateFENa} style={{ marginTop: '10px' }}>
                Hisoblash
            </button>

            {result !== null && (
                <div>
                    <h2>Fractional Excretion of Sodium (FENa): <strong>{result.toFixed(2)}</strong> %</h2>
                </div>
            )}
        </div>
    );
};

export default FENaCalculatorUrine;
