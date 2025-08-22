import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const { Text } = Typography;

const UrineOsmolality = () => {
    const [urineNa, setUrineNa] = useState(''); // Natriys
    const [urineK, setUrineK] = useState(''); // Kaliy
    const [urineUrea, setUrineUrea] = useState(''); // Urea
    const [result, setResult] = useState(null); // Natija

    const calculateOsmolality = () => {
        const sodium = parseFloat(urineNa);
        const potassium = parseFloat(urineK);
        const urea = parseFloat(urineUrea);

        if (!isNaN(sodium) && !isNaN(potassium) && !isNaN(urea)) {
            // Osmolality formula: 2 * Na + K + (Urea / 2.8)
            const osmolality = (2 * sodium) + potassium + (urea / 2.8);
            setResult(osmolality);
        } else {
            setResult("Iltimos, barcha maydonlarni to'ldiring.");
        }
    };

    return (
        <div className="calculator-container" style={{ padding: '20px' }}>

            <h2>Urine Osmolality Kalkulyatori</h2>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                Ushbu kalkulyator siydik osmolalitetini hisoblash uchun mo'ljallangan.
                Osmolalitet siydikning konsentratsiyasini baholashda yordam beradi,
                bu esa organizmning suyuqlik holatini ko'rsatadi.
            </Text>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                Formula: Osmolality = 2 * Sodium + Potassium + (Urea / 2.8)
            </Text>

            <label htmlFor="urineNa">Siydik Natriysi (Na) (mEq/L)
                <Input
                    id="urineNa"
                    placeholder="Siydik Natriysi (Na) (mEq/L)"
                    type="number"
                    value={urineNa}
                    onChange={(e) => setUrineNa(e.target.value)}
                    className="input-field" // CSS klassi
                /></label>
            <label htmlFor="urineK">Siydik Kaliy (K) (mEq/L)
                <Input
                    id="urineK"
                    placeholder="Siydik Kaliy (K) (mEq/L)"
                    type="number"
                    value={urineK}
                    onChange={(e) => setUrineK(e.target.value)}
                    className="input-field" // CSS klassi
                /></label>
            <label htmlFor="urineUrea">Siydik Urea (mg/dL)
                <Input
                    id="urineUrea"
                    placeholder="Siydik Urea (mg/dL)"
                    type="number"
                    value={urineUrea}
                    onChange={(e) => setUrineUrea(e.target.value)}
                    className="input-field" // CSS klassi
                /></label>
            <Button type="primary" onClick={calculateOsmolality} style={{ marginTop: '10px' }}>
                Hisoblash
            </Button>
            {result !== null && (
                <Text style={{ display: 'block', marginTop: '10px' }}>
                    Urine Osmolality: <strong>{result.toFixed(2)}</strong> mOsm/kg
                </Text>
            )}

        </div>
    );
};

export default UrineOsmolality;

