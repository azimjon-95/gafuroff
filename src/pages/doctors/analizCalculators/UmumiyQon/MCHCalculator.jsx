import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import '../BioKimyoviy/style.css';

const { Text } = Typography;

const MCHCalculator = () => {
    const [hemoglobin, setHemoglobin] = useState('');
    const [rbcCount, setRBCCount] = useState('');
    const [mch, setMCH] = useState(null);

    const calculateMCH = () => {
        if (!hemoglobin || !rbcCount) {
            alert('Iltimos, barcha maydonlarni to‘ldiring.');
            return;
        }

        const calculatedMCH = (parseFloat(hemoglobin) * 10) / parseFloat(rbcCount);
        setMCH(calculatedMCH.toFixed(2)); // Natijani ikki o'nlik raqamga to'g'rilash
    };

    return (
        <div className="calculator-container">
            <h2>Mean Corpuscular Hemoglobin (MCH) Kalkulyatori</h2>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                Formula: MCH (pg) = (Hemoglobin (g/dL) × 10) / RBC Count (million/µL)
            </Text>
            <Text>
                Ushbu kalkulyator yordamida siz gemoglobin darajasini va qizil qon hujayralari (RBC) sonini kiritib, MCH ni hisoblash imkoniyatiga ega bo'lasiz.
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
                placeholder="Qizil qon hujayralari soni (million/µL)"
                type="number"
                value={rbcCount}
                onChange={(e) => setRBCCount(e.target.value)}
            />
            <Button type="primary" onClick={calculateMCH} style={{ marginTop: '10px' }}>
                Hisoblash
            </Button>
            {mch !== null && (
                <Text style={{ display: 'block', marginTop: '10px' }}>
                    O'rtacha qizil qon hujayralaridagi gemoglobin: <strong>{mch} pg</strong>
                </Text>
            )}
        </div>
    );
};

export default MCHCalculator;
