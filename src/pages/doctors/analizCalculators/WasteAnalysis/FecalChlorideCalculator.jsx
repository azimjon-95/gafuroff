import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const { Text } = Typography;

const FecalChlorideCalculator = () => {
    const [chloride, setChloride] = useState(''); // Xlorid miqdori
    const [output, setOutput] = useState(null); // Natija

    const calculateChloride = () => {
        if (chloride) {
            // Xlorid kontsentratsiyasini hisoblash
            const chlorideValue = parseFloat(chloride).toFixed(2);
            setOutput(`Najosatda xlorid miqdori: ${chlorideValue} mg/g`);
        }
    };

    return (
        <div className="calculator-container">
            <h2>Najosatda Xlorid Kalkulyatori</h2>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                Ushbu kalkulyator najosatda xlorid miqdorini hisoblashga yordam beradi.
                <br />
                Formula: Xlorid (mg/g) = Najosatdagi xlorid miqdori.
            </Text>
            <Input
                placeholder="Najosatdagi xlorid miqdori (mg/g)"
                type="number"
                value={chloride}
                onChange={(e) => setChloride(e.target.value)}
                className="input-field" // Input uchun klass
            />
            <Button type="primary" onClick={calculateChloride} style={{ marginTop: '10px' }}>
                Hisoblash
            </Button>
            {output && (
                <Text style={{ display: 'block', marginTop: '10px' }}>
                    {output}
                </Text>
            )}
        </div>
    );
};

export default FecalChlorideCalculator;
