import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish


const { Text } = Typography;

const UrineSpecificGravity = () => {
    const [urineVolume, setUrineVolume] = useState(''); // Siydik miqdori
    const [urineWeight, setUrineWeight] = useState(''); // Siydik og'irligi
    const [specificGravity, setSpecificGravity] = useState(null); // Natija

    const calculateSpecificGravity = () => {
        const urineVolumeValue = parseFloat(urineVolume); // Siydik miqdori
        const urineWeightValue = parseFloat(urineWeight); // Siydik og'irligi

        if (!isNaN(urineVolumeValue) && !isNaN(urineWeightValue) && urineVolumeValue > 0 && urineWeightValue > 0) {
            // Zichlikni hisoblash formulasi
            const specificGravityValue = urineWeightValue / (urineVolumeValue * 1.0); // Zichlik formulasi
            setSpecificGravity(specificGravityValue.toFixed(2)); // Natijani 2 xonali raqam bilan saqlash
        } else {
            setSpecificGravity("Iltimos, barcha maydonlarni to'ldiring va musbat raqam kiriting.");
        }
    };

    return (
        <div className="calculator-container" >
            <h2>Urine Specific Gravity Kalkulyatori</h2>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                Ushbu kalkulyator siydikning zichligini hisoblash uchun mo'ljallangan.
                Zichlik, siydik og'irligini siydik miqdoriga bo'lish orqali hisoblanadi.
            </Text>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                Formula: Zichlik = Siydik og'irligi (g/mL) / Siydik miqdori (mL)
            </Text>

            <label htmlFor="urineVolume">Siydik Miqdori (mL)</label>
            <Input
                id="urineVolume"
                placeholder="Siydik Miqdori (mL)"
                type="number"
                value={urineVolume}
                onChange={(e) => setUrineVolume(e.target.value)}
                className="input-field" // CSS klassi
            />
            <label htmlFor="urineWeight">Siydik Og'irligi (g)</label>
            <Input
                id="urineWeight"
                placeholder="Siydik Og'irligi (g)"
                type="number"
                value={urineWeight}
                onChange={(e) => setUrineWeight(e.target.value)}
                className="input-field" // CSS klassi
            />
            <Button type="primary" onClick={calculateSpecificGravity} style={{ marginTop: '10px' }}>
                Hisoblash
            </Button>
            {specificGravity !== null && (
                <Text style={{ display: 'block', marginTop: '10px' }}>
                    Siydik Zichligi: <strong>{specificGravity}</strong>
                </Text>
            )}
        </div>
    );
};

export default UrineSpecificGravity;
