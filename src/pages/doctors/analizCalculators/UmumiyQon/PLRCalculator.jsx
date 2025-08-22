import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

function PLRCalculator() {
    const [plateletCount, setPlateletCount] = useState('');
    const [lymphocyteCount, setLymphocyteCount] = useState('');
    const [plr, setPLR] = useState(null);

    const calculatePLR = () => {
        if (!plateletCount || !lymphocyteCount) {
            alert('Iltimos, barcha maydonlarni to‘ldiring.');
            return;
        }

        const calculatedPLR = parseFloat(plateletCount) / parseFloat(lymphocyteCount);
        setPLR(calculatedPLR.toFixed(2)); // Natijani ikki o'nlik raqamga to'g'rilash
    };

    return (
        <div className="calculator-container">
            <h2>Platelet-to-Lymphocyte Ratio (PLR) Kalkulyatori</h2>
            <p style={{ color: 'gray', marginBottom: '10px' }}>
                Formula: PLR = Trombotsitlar soni (ming/µL) / Limfotsitlar soni (ming/µL)
            </p>
            <p>
                Ushbu kalkulyator yordamida siz trombotsitlar va limfotsitlar sonini kiritib, PLR ni hisoblash imkoniyatiga ega bo'lasiz. PLR — qonni tekshirishda muhim ko'rsatkich bo'lib, u immun tizimining holatini baholashda yordam beradi.
            </p>

            <input
                className="input-field"
                placeholder="Trombotsitlar soni (ming/µL)"
                type="number"
                value={plateletCount}
                onChange={(e) => setPlateletCount(e.target.value)}
            />
            <input
                className="input-field"
                placeholder="Limfotsitlar soni (ming/µL)"
                type="number"
                value={lymphocyteCount}
                onChange={(e) => setLymphocyteCount(e.target.value)}
            />
            <button onClick={calculatePLR}>Hisoblash</button>
            {plr !== null && (
                <h3>Trombosit-limfotsit nisbati: {plr}</h3>
            )}
        </div>
    );
}

export default PLRCalculator;

