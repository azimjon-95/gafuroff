import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const CystatinCCalculator = () => {
    const [urineCystatinC, setUrineCystatinC] = useState(''); // Siydikdagi Sistatin C
    const [plasmaCystatinC, setPlasmaCystatinC] = useState(''); // Plazmadagi Sistatin C
    const [urineVolume, setUrineVolume] = useState(''); // Siydik chiqarilish miqdori
    const [filtrationRate, setFiltrationRate] = useState(null); // Filtratsiya darajasi

    const calculateFiltrationRate = () => {
        if (plasmaCystatinC > 0) {
            const rate = (urineCystatinC * urineVolume) / plasmaCystatinC;
            setFiltrationRate(rate); // Filtratsiya darajasini hisoblash
        } else {
            setFiltrationRate(0); // Plazmadagi Sistatin C 0 dan kichik bo'lsa
        }
    };

    return (
        <div className="calculator-container" style={{ padding: '20px' }}>
            <h2>Siydikdagi Cystatin C Kalkulyatori</h2>
            <h3>Formulasi:</h3>
            <p>
                Filtratsiya darajasi = (Sistatin C darajasi siydikda * Siydikning chiqarilish miqdori) / Sistatin C darajasi plazmada
            </p>
            <p>
                Ushbu kalkulyator siydikda va plazmada Sistatin C darajasidan kelib chiqib filtratsiya darajasini hisoblashga yordam beradi.
                Iltimos, barcha maydonlarni to'ldiring.
            </p>

            <label htmlFor="urineCystatinC">Siydikdagi Sistatin C (mg/L)
                <input
                    id="urineCystatinC"
                    className="input-field"
                    type="number"
                    value={urineCystatinC}
                    onChange={(e) => setUrineCystatinC(e.target.value)}
                />
            </label>
            <label htmlFor="plasmaCystatinC">Plazmadagi Sistatin C (mg/L)
                <input
                    id="plasmaCystatinC"
                    className="input-field"
                    type="number"
                    value={plasmaCystatinC}
                    onChange={(e) => setPlasmaCystatinC(e.target.value)}
                />
            </label>

            <label htmlFor="urineVolume">Siydikning chiqarilish miqdori (mL/min)
                <input
                    id="urineVolume"
                    className="input-field"
                    type="number"
                    value={urineVolume}
                    onChange={(e) => setUrineVolume(e.target.value)}
                />
            </label>
            <button onClick={calculateFiltrationRate}>Hisoblash</button>
            {filtrationRate !== null && (
                <div>
                    <h2>Filtratsiya darajasi: {filtrationRate.toFixed(2)} mL/min</h2>
                </div>
            )}
        </div>
    );
};

export default CystatinCCalculator;
