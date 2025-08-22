import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const CreatinineClearance = () => {
    const [creatinine, setCreatinine] = useState(''); // Siydikdagi kreatinin
    const [age, setAge] = useState(''); // Yoshi
    const [weight, setWeight] = useState(''); // Vazni
    const [gender, setGender] = useState('male'); // Jinsi
    const [result, setResult] = useState(null); // Natija

    const calculateCreatinineClearance = () => {
        const creatinineValue = parseFloat(creatinine); // Siydikdagi kreatinin
        const ageValue = parseFloat(age); // Yoshi
        const weightValue = parseFloat(weight); // Vazni

        if (!isNaN(creatinineValue) && !isNaN(ageValue) && !isNaN(weightValue) && ageValue > 0 && weightValue > 0) {
            // Creatinine Clearance formulasi
            const clearance = (140 - ageValue) * weightValue * (gender === 'male' ? 1.23 : 1.04) / creatinineValue;
            setResult(clearance.toFixed(2)); // Natijani 2 xonali raqam bilan saqlash
        } else {
            setResult("Iltimos, barcha maydonlarni to'ldiring va musbat raqam kiriting.");
        }
    };

    return (
        <div className="calculator-container" style={{ padding: '20px' }}>
            <h2>Creatinine Clearance Kalkulyatori (Cockcroft-Gault)</h2>
            <h3>Formulasi:</h3>
            <p>
                Filtratsiya darajasini baholash:
                <br />
                Clearance (mL/min) = (140 - Yosh) × Vazn (kg) × K / Kreatinin (mg/dL)
                <br />
                K = 1.23 (erkaklar) yoki 1.04 (ayollar)
            </p>
            <p>
                Ushbu kalkulyator siydikdagi kreatinin clearance darajasini hisoblashga yordam beradi.
                Iltimos, barcha maydonlarni to'ldiring.
            </p>
            <label htmlFor="creatinine">Siydikdagi kreatinin (mg/dL)
                <input
                    id="creatinine"
                    className="input-field"
                    type="number"
                    value={creatinine}
                    onChange={(e) => setCreatinine(e.target.value)}
                />
            </label>
            <label htmlFor="age">Yosh (yil)
                <input
                    id="age"
                    className="input-field"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </label>
            <label htmlFor="weight">Vazn (kg)
                <input
                    id="weight"
                    className="input-field"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
            </label>
            <label htmlFor="gender">Jinsi
                <select className="input-field" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <option value="male">Erkak</option>
                    <option value="female">Ayol</option>
                </select>
            </label>
            <button onClick={calculateCreatinineClearance}>Hisoblash</button>
            {result !== null && (
                <p style={{ display: 'block', marginTop: '10px' }}>
                    Creatinine Clearance: <strong>{result}</strong> mL/min
                </p>
            )}
        </div>
    );
};

export default CreatinineClearance;
