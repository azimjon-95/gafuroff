import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish


const { Text } = Typography;

const UUNCalculator = () => {
    const [ureaNitrogen, setUreaNitrogen] = useState(''); // Urea azoti
    const [urineVolume, setUrineVolume] = useState(''); // Siydik miqdori
    const [totalUUN, setTotalUUN] = useState(null); // Natija

    const calculateUUN = () => {
        const ureaNitrogenValue = parseFloat(ureaNitrogen); // Urea azoti
        const urineVolumeValue = parseFloat(urineVolume); // Siydik miqdori

        if (!isNaN(ureaNitrogenValue) && !isNaN(urineVolumeValue) && ureaNitrogenValue > 0 && urineVolumeValue > 0) {
            // UUNni hisoblash formulasi
            const totalUUNValue = (ureaNitrogenValue * urineVolumeValue) / 100; // Tahlil formulasi
            setTotalUUN(totalUUNValue.toFixed(2)); // Natijani 2 xonali raqam bilan saqlash
        } else {
            setTotalUUN("Iltimos, barcha maydonlarni to'ldiring va musbat raqam kiriting.");
        }
    };

    return (
        <div className="calculator-container" style={{ padding: '20px' }}>
            <h2>Urinary Urea Nitrogen (UUN) Kalkulyatori</h2>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                Ushbu kalkulyator siydikdagi urea azotini hisoblashga yordam beradi.
                UUN hisoblash uchun quyidagi formula ishlatiladi:
            </Text>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                Formula: UUN = (Siydikdagi Urea Azoti (mg/dL) × Siydik Miqdori (mL)) / 100
            </Text>

            <label htmlFor="ureaNitrogen">Siydikdagi Urea Azoti (mg/dL)
                <Input
                    id="ureaNitrogen"
                    placeholder="Siydikdagi Urea Azoti (mg/dL)"
                    type="number"
                    value={ureaNitrogen}
                    onChange={(e) => setUreaNitrogen(e.target.value)}
                    className="input-field" // CSS klassi
                /></label>
            <label htmlFor="urineVolume">Siydik Miqdori (mL)
                <Input
                    id="urineVolume"
                    placeholder="Siydik Miqdori (mL)"
                    type="number"
                    value={urineVolume}
                    onChange={(e) => setUrineVolume(e.target.value)}
                    className="input-field" // CSS klassi
                /></label>
            <Button type="primary" onClick={calculateUUN} style={{ marginTop: '10px' }}>
                Hisoblash
            </Button>
            {totalUUN !== null && (
                <Text style={{ display: 'block', marginTop: '10px' }}>
                    Urinary Urea Nitrogen (UUN): <strong>{totalUUN} mg/dL</strong>
                </Text>
            )}
        </div>
    );
};

export default UUNCalculator;

