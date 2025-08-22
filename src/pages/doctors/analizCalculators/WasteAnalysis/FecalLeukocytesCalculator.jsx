import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const FecalLeukocytesCalculator = () => {
    const [leukocyteCount, setLeukocyteCount] = useState('');
    const [stoolVolume, setStoolVolume] = useState('');
    const [leukocyteDensity, setLeukocyteDensity] = useState(null);

    const calculateFecalLeukocytes = () => {
        if (leukocyteCount && stoolVolume) {
            // Leykotsitlar miqdori umumiy miqdor bilan taqqoslanadi
            const normalizedLeukocyteCount = (parseFloat(leukocyteCount) / parseFloat(stoolVolume)).toFixed(2);
            setLeukocyteDensity(normalizedLeukocyteCount);
        }
    };

    return (
        <div className="calculator-container">
            <h2>Najosatdagi Leykotsitlar Kalkulyatori</h2>
            <p>
                Ushbu kalkulyator najosatdagi leykotsitlar sonini hisoblash uchun ishlatiladi.
                Agar sizda najosatdagi leykotsitlar soni va hajmi ma'lum bo'lsa, formuladan foydalanib
                normalizatsiyalangan leykotsitlar sonini hisoblay olasiz.
            </p>
            <p><strong>Formula:</strong> Normalizatsiyalangan Leykotsitlar = Najosatdagi Leykotsitlar / Najosat hajmi</p>

            <div>
                <label>
                    Najosatdagi Leykotsitlar miqdori (soni):
                    <input
                        type="number"
                        placeholder="Leykotsitlar soni (soni)"
                        className="input-field"
                        value={leukocyteCount}
                        onChange={(e) => setLeukocyteCount(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Najosat hajmi (ml):
                    <input
                        type="number"
                        placeholder="Najosat hajmi (ml)"
                        className="input-field"
                        value={stoolVolume}
                        onChange={(e) => setStoolVolume(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={calculateFecalLeukocytes}>Hisoblash</button>
            {leukocyteDensity !== null && (
                <h3>Normalizatsiyalangan Leykotsitlar: {leukocyteDensity} son/ml</h3>
            )}
        </div>
    );
};

export default FecalLeukocytesCalculator;
