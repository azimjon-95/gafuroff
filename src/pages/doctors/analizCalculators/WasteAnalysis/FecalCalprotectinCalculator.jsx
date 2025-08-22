import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish


const { Text } = Typography;

const FecalCalprotectinCalculator = () => {
    const [calprotectinLevel, setCalprotectinLevel] = useState(''); // Kalprotektin darajasi
    const [result, setResult] = useState(null); // Natija

    const interpretCalprotectin = () => {
        if (calprotectinLevel) {
            let interpretation;
            const level = parseFloat(calprotectinLevel);
            if (level < 50) {
                interpretation = "Normal darajadagi kalprotektin.";
            } else if (level >= 50 && level <= 200) {
                interpretation = "Yengil yallig'lanish.";
            } else {
                interpretation = "Og'ir yallig'lanish.";
            }
            setResult(interpretation);
        }
    };

    return (
        <div className="calculator-container">
            <h2>Fecal Calprotectin Kalkulyatori</h2>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                Ushbu kalkulyator najosatda kalprotektin darajasini tahlil qilish va ichaklardagi yallig'lanishni baholashga yordam beradi.
                Kalprotektin darajasi ichaklarda yallig‘lanishni ko‘rsatadi.
            </Text>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                Formula: Kalprotektin darajasi - 50 mg/kg ichaklarda yallig‘lanishni ko‘rsatadi.
            </Text>

            <label htmlFor="calprotectinInput">Najosatda kalprotektin darajasi (mg/kg):
                <Input
                    id="calprotectinInput"
                    type="number"
                    value={calprotectinLevel}
                    onChange={(e) => setCalprotectinLevel(e.target.value)}
                    placeholder="Kalprotektin darajasi (mg/kg)"
                    className="input-field" // CSS klassi
                /></label>
            <Button type="primary" onClick={interpretCalprotectin} style={{ marginTop: '10px' }}>
                Hisoblash
            </Button>
            {result && (
                <Text style={{ display: 'block', marginTop: '10px' }}>
                    Natija: <strong>{result}</strong>
                </Text>
            )}
        </div >
    );
};

export default FecalCalprotectinCalculator;
