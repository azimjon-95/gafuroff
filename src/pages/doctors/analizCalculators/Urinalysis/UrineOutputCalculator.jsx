import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const { Text } = Typography;

const UrineOutputCalculator = () => {
    const [urineVolume, setUrineVolume] = useState(''); // Siydik chiqarish miqdori
    const [timePeriod, setTimePeriod] = useState(''); // Vaqt (soat)
    const [result, setResult] = useState(null);

    const calculateOutput = () => {
        const volume = parseFloat(urineVolume); // Siydik chiqarish miqdori
        const time = parseFloat(timePeriod); // Vaqt

        if (!isNaN(volume) && !isNaN(time) && time > 0) {
            // Siydik chiqarish miqdorini hisoblash: L/soat
            const outputPerHour = volume / time;
            setResult(outputPerHour);
        } else {
            setResult("Iltimos, barcha maydonlarni to'ldiring va vaqtni musbat kiriting.");
        }
    };

    return (
        <div className="calculator-container" >
            <h2>Urine Output Kalkulyatori</h2>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                Ushbu kalkulyator siydik chiqarish miqdorini hisoblash uchun mo'ljallangan.
                Siydik chiqarish darajasi miqdor (L) va vaqt (soat) asosida hisoblanadi.
            </Text>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                Formula: Siydik chiqarish darajasi = Volume (L) / Time (soat)
            </Text>

            <label htmlFor="urineVolume">Siydik chiqarish miqdori (L)
                <Input
                    id="urineVolume"
                    placeholder="Siydik chiqarish miqdori (L)"
                    type="number"
                    value={urineVolume}
                    onChange={(e) => setUrineVolume(e.target.value)}
                    className="input-field" // CSS klassi
                /></label>
            <label htmlFor="timePeriod">Vaqt (soat)
                <Input
                    id="timePeriod"
                    placeholder="Vaqt (soat)"
                    type="number"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                    className="input-field" // CSS klassi
                /></label>
            <Button type="primary" onClick={calculateOutput} style={{ marginTop: '10px' }}>
                Hisoblash
            </Button>
            {result !== null && (
                <Text style={{ display: 'block', marginTop: '10px' }}>
                    Siydik chiqarish darajasi: <strong>{result.toFixed(2)}</strong> L/soat
                </Text>
            )}
        </div>
    );
};

export default UrineOutputCalculator;
