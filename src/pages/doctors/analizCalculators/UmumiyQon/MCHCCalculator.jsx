import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import '../BioKimyoviy/style.css';


const { Text } = Typography;

const MCHCCalculator = () => {
    const [hemoglobin, setHemoglobin] = useState('');
    const [hematocrit, setHematocrit] = useState('');
    const [mchc, setMCHC] = useState(null);

    const calculateMCHC = () => {
        if (!hemoglobin || !hematocrit) {
            alert('Iltimos, barcha maydonlarni to‘ldiring.');
            return;
        }

        const calculatedMCHC = (parseFloat(hemoglobin) / (parseFloat(hematocrit) / 100)) * 100;
        setMCHC(calculatedMCHC.toFixed(2)); // Natijani ikki o'nlik raqamga to'g'rilash
    };

    return (
        <div className="calculator-container" style={{ padding: '20px' }}>
            <h2>Mean Corpuscular Hemoglobin Concentration (MCHC) Kalkulyatori</h2>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                Formula: MCHC (g/dL) = (Gemoglobin (g/dL) / Gematokrit (%)) × 100
            </Text>
            <Text>
                Ushbu kalkulyator yordamida siz gemoglobin darajasini va gematokritni kiritib, MCHC ni hisoblash imkoniyatiga ega bo'lasiz.
            </Text>

            <Input
                className="input-field"
                placeholder="Gemoglobin darajasi (g/dL)"
                type="number"
                value={hemoglobin}
                onChange={(e) => setHemoglobin(e.target.value)}
            />
            <Input
                className="input-field"
                placeholder="Gematokrit (%)"
                type="number"
                value={hematocrit}
                onChange={(e) => setHematocrit(e.target.value)}
            />
            <Button type="primary" onClick={calculateMCHC} style={{ marginTop: '10px' }}>
                Hisoblash
            </Button>
            {mchc !== null && (
                <Text style={{ display: 'block', marginTop: '10px' }}>
                    O'rtacha qizil qon hujayralaridagi gemoglobin kontsentratsiyasi: <strong>{mchc} g/dL</strong>
                </Text>
            )}
        </div>
    );
};

export default MCHCCalculator
