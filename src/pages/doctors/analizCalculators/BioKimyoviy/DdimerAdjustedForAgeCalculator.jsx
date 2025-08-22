import React, { useState } from 'react';
import './style.css'; // CSS faylini import qilish

function DdimerAdjustedForAgeCalculator() {
    const [initialDdimer, setInitialDdimer] = useState('');
    const [age, setAge] = useState('');
    const [adjustedDdimer, setAdjustedDdimer] = useState(null);

    // D-dimerni yoshga moslashtirish hisoblash funktsiyasi
    const calculateAdjustedDdimer = () => {
        if (!initialDdimer || !age) {
            alert('Iltimos, barcha maydonlarni to‘ldiring.');
            return;
        }

        const calculatedAdjustedDdimer = parseFloat(initialDdimer) * (parseFloat(age) / 100);
        setAdjustedDdimer(calculatedAdjustedDdimer.toFixed(2)); // Natijani ikki o'nlik raqamga to'g'rilash
    };

    return (
        <div className="calculator-container">
            <h2 className="calculator-title">D-dimer Yoshga Moslashtirilgan Kalkulyatori</h2>

            <p className="calculator-description">
                Ushbu kalkulyator D-dimer darajasini yoshga moslashtirish orqali buyrak funktsiyasiga qarab D-dimer darajasini aniqlashga yordam beradi. Katta yoshdagi bemorlarda D-dimer darajasi oshgan bo‘lishi mumkin, shuning uchun yoshga qarab moslashgan qiymat qo‘llaniladi.
            </p>

            <label>
                D-dimer (boshqa):
                <input
                    className="input-field"
                    type="number"
                    value={initialDdimer}
                    onChange={(e) => setInitialDdimer(e.target.value)}
                    placeholder="Masalan: 500"
                />
            </label>

            <label>
                Yoshi:
                <input
                    className="input-field"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Masalan: 45"
                />
            </label>

            <button className="calculate-button" onClick={calculateAdjustedDdimer}>Hisoblash</button>

            {adjustedDdimer !== null && (
                <h3 className="result">
                    D-dimer (Yoshga Moslashtirilgan): {adjustedDdimer} ng/mL
                </h3>
            )}
        </div>
    );
}

export default DdimerAdjustedForAgeCalculator;
