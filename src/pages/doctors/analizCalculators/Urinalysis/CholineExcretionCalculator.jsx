import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const CholineExcretionCalculator = () => {
    const [urineCholine, setUrineCholine] = useState(''); // Siydikdagi xolin
    const [urineVolume, setUrineVolume] = useState(''); // Siydik chiqarilishi
    const [cholineExcretion, setCholineExcretion] = useState(null); // Xolin chiqarilishi natijasi

    const calculateCholineExcretion = () => {
        // Xolin chiqarilishiga hisoblash formulasi
        const excretion = (urineCholine * urineVolume);
        setCholineExcretion(excretion); // Natijani saqlash
    };

    return (
        <div className="calculator-container" style={{ padding: '20px' }}>
            <h2>Siydikdagi Xolin Kalkulyatori</h2>
            <h3>Formulasi: {`Choline Excretion (mg/day) = Siydikdagi Choline (mg/dL) * Siydik chiqarilishi (mL/day)`}</h3>
            <p>
                Ushbu kalkulyator siydikdagi xolin chiqarilishini hisoblash imkonini beradi.
                Kiritilgan xolin miqdori mg/dL da va siydik chiqarilishi mL/day da bo'lishi kerak.
            </p>

            <label htmlFor="urineCholine" >
                Siydikdagi Choline (mg/dL):

                <input
                    id="urineCholine"
                    className="input-field"
                    type="number"
                    placeholder="Siydikdagi Choline (mg/dL)"
                    value={urineCholine}
                    onChange={(e) => setUrineCholine(e.target.value)}
                />
            </label>
            <label htmlFor="urineVolume" >
                Siydik chiqarilishi (mL/day):

                <input
                    id="urineVolume"
                    className="input-field"
                    type="number"
                    placeholder="Siydik chiqarilishi (mL/day)"
                    value={urineVolume}
                    onChange={(e) => setUrineVolume(e.target.value)}
                />
            </label>
            <button onClick={calculateCholineExcretion}>Hisoblash</button>
            {cholineExcretion !== null && (
                <div>
                    <h2>Xolin chiqarilishi: {cholineExcretion.toFixed(2)} mg/day</h2>
                </div>
            )}
        </div>
    );
};

export default CholineExcretionCalculator;
