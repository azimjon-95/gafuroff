import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

function RPICalculator() {
    const [reticulocyteCount, setReticulocyteCount] = useState('');
    const [patientHematocrit, setPatientHematocrit] = useState('');
    const [rpi, setRPI] = useState(null);

    const calculateRPI = () => {
        const normalHematocrit = 45; // Normal gematokrit darajasi
        const correctionFactor = parseFloat(patientHematocrit) < 45 ? 2 : 1;

        const calculatedRPI =
            (parseFloat(reticulocyteCount) * parseFloat(patientHematocrit)) /
            (normalHematocrit * correctionFactor);

        setRPI(calculatedRPI.toFixed(2)); // Natijani ikki o'nlik raqamga to'g'rilash
    };

    return (
        <div className="calculator-container">
            <h2>Reticulocyte Production Index (RPI) Kalkulyatori</h2>
            <p style={{ color: 'gray', marginBottom: '10px' }}>
                Formula: RPI = (Retikulotsitlar soni (%) * Bemor gematokriti (%)) / (Normal gematokrit * Korrektsiya faktori)
            </p>
            <p>
                Ushbu kalkulyator yordamida siz retikulotsitlar soni va bemor gematokritini kiritib, RPI ni hisoblash imkoniyatiga ega bo'lasiz. RPI qonning qizil qon hujayralarini ishlab chiqarish darajasini baholashda muhim ko'rsatkich hisoblanadi.
            </p>

            <label htmlFor="reticulocyteCount"  >
                Retikulotsitlar soni (%):

                <input
                    id="reticulocyteCount"
                    className="input-field"
                    type="number"
                    value={reticulocyteCount}
                    onChange={(e) => setReticulocyteCount(e.target.value)}
                    placeholder="Masalan: 2.5"
                />
            </label>
            <label htmlFor="patientHematocrit"  >
                Bemor gematokriti (%):

                <input
                    id="patientHematocrit"
                    className="input-field"
                    type="number"
                    value={patientHematocrit}
                    onChange={(e) => setPatientHematocrit(e.target.value)}
                    placeholder="Masalan: 35"
                />
            </label>
            <button onClick={calculateRPI}>Hisoblash</button>

            {rpi !== null && (
                <h3>Reticulocyte Production Index: {rpi}</h3>
            )}
        </div>
    );
}

export default RPICalculator;
