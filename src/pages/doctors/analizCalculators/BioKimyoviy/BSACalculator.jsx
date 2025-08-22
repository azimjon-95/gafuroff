import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';

const { Text } = Typography;

function BSACalculator() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bsa, setBsa] = useState(null);

    const calculateBSA = () => {
        if (!height || !weight) {
            alert('Iltimos, barcha kerakli maydonlarni to‘ldiring.');
            return;
        }

        const heightInCm = parseFloat(height);
        const weightInKg = parseFloat(weight);
        const bsaValue = 0.007184 * Math.pow(heightInCm, 0.725) * Math.pow(weightInKg, 0.425);

        setBsa(bsaValue.toFixed(2));
    };

    return (
        <div className="calculator-container">
            <h2 >BSA (Tana Yuzasi Maydoni) Kalkulyatori</h2>
            <p>
                Ushbu kalkulyator Tana Yuzasi Maydonini (BSA) hisoblash imkonini beradi. BSA insonning tana yuzasi maydonini belgilash uchun ishlatiladi va u turli tibbiy amaliyotlarda, masalan, dori-darmon dozalarini hisoblashda muhim ahamiyatga ega.
            </p><br />
            <p>
                <strong>MDRD Formulasi:</strong><br />
                MDRD formulasi quyidagicha:<br />
                eGFR (mL/min/1.73 m²) = 175 × (serum kreatinin)^-1.154 × (yosh)^-0.203 × (0.742 agar ayol bo'lsa) × (1.212 agar qora tanli bo'lsa)
            </p>

            <label>
                Bo‘y (sm):
                <Input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                />
            </label>

            <label>
                Vazn (kg):
                <Input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                />
            </label>

            <Button type="primary" onClick={calculateBSA}>
                Hisoblash
            </Button>

            {bsa && (
                <div style={{ marginTop: "20px" }}>
                    <Text strong>BSA: </Text>
                    <Text>{bsa} m²</Text>
                </div>
            )}
        </div>
    );
}

export default BSACalculator;
