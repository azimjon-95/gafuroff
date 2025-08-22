import React, { useState } from 'react';

function FEUreaCalculator() {
    const [urineUrea, setUrineUrea] = useState('');
    const [urineVolume, setUrineVolume] = useState('');
    const [plasmaUrea, setPlasmaUrea] = useState('');
    const [time, setTime] = useState('');
    const [feUrea, setFeUrea] = useState(null);

    const calculateFEUrea = () => {
        const feUreaValue = (urineUrea * urineVolume) / (plasmaUrea * time) * 100;
        setFeUrea(feUreaValue.toFixed(2)); // Natijani ikki o'nlik raqamga to'g'rilash
    };

    return (
        <div>
            <h2>Fractional Excretion of Urea (FEUrea) Kalkulyatori</h2>

            <label>
                Siydikdagi Urea Konsentratsiyasi (mg/dL):
                <input
                    type="number"
                    value={urineUrea}
                    onChange={(e) => setUrineUrea(e.target.value)}
                    placeholder="Masalan: 200"
                />
            </label>

            <label>
                Siydikning Umumiy Hajmi (mL):
                <input
                    type="number"
                    value={urineVolume}
                    onChange={(e) => setUrineVolume(e.target.value)}
                    placeholder="Masalan: 1500"
                />
            </label>

            <label>
                Qon Plazmasidagi Urea Konsentratsiyasi (mg/dL):
                <input
                    type="number"
                    value={plasmaUrea}
                    onChange={(e) => setPlasmaUrea(e.target.value)}
                    placeholder="Masalan: 30"
                />
            </label>

            <label>
                Vaqt (soat):
                <input
                    type="number"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="Masalan: 24"
                />
            </label>

            <button onClick={calculateFEUrea}>Hisoblash</button>

            {feUrea !== null && (
                <h3>Fractional Excretion of Urea (FEUrea): {feUrea} %</h3>
            )}
        </div>
    );
}

export default FEUreaCalculator;
