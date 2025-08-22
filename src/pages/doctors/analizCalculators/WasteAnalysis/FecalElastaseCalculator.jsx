import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const { Text } = Typography;

const FecalElastaseCalculator = () => {
    const [elastaseValue, setElastaseValue] = useState(''); // Najosatdagi elastaza miqdori
    const [stoolWeight, setStoolWeight] = useState(''); // Najosat og'irligi
    const [elastaseContent, setElastaseContent] = useState(null); // Natija

    const calculateFecalElastase = () => {
        if (elastaseValue && stoolWeight) {
            // Elastaza miqdorini umumiy miqdor bilan taqqoslash
            const normalizedElastaseValue = (parseFloat(elastaseValue) / parseFloat(stoolWeight)).toFixed(2);
            setElastaseContent(normalizedElastaseValue);
        }
    };

    return (
        <div className="calculator-container">
            <h2>Najosatdagi Elastaza Kalkulyatori</h2>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                Ushbu kalkulyator najosatda elastaza miqdorini hisoblashga yordam beradi.
                <br />
                Formula: Normalized Elastase (ug/g) = Najosatdagi Elastaza / Najosat og'irligi.
            </Text>

            <div>
                <label>
                    Najosatdagi Elastaza miqdori (ug/g):
                    <Input
                        type="number"
                        value={elastaseValue}
                        onChange={(e) => setElastaseValue(e.target.value)}
                        step="0.01"
                        className="input-field"
                        placeholder="Najosatdagi elastaza (ug/g) kiriting"
                    />
                </label>
            </div>

            <div>
                <label>
                    Najosat og'irligi (g):
                    <Input
                        type="number"
                        value={stoolWeight}
                        onChange={(e) => setStoolWeight(e.target.value)}
                        className="input-field"
                        placeholder="Najosat og'irligini (g) kiriting"
                    />
                </label>
            </div>

            <Button type="primary" onClick={calculateFecalElastase} style={{ marginTop: '10px' }}>
                Hisoblash
            </Button>

            {elastaseContent !== null && (
                <Text style={{ display: 'block', marginTop: '10px' }}>
                    Normalizatsiyalangan Elastaza: <strong>{elastaseContent} ug/g</strong>
                </Text>
            )}
        </div>
    );
};

export default FecalElastaseCalculator;

