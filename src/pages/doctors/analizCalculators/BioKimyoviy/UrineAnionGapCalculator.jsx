import React, { useState } from 'react';
import { Input, Button, Typography, Divider } from 'antd';
import './style.css'; // CSS faylini import qilish

const { Title, Text, Paragraph } = Typography;

const UrineAnionGapCalculator = () => {
    const [sodium, setSodium] = useState('');
    const [potassium, setPotassium] = useState('');
    const [chloride, setChloride] = useState('');
    const [anionGap, setAnionGap] = useState(null);

    const calculateUrineAnionGap = () => {
        const uag = (parseFloat(sodium) + parseFloat(potassium)) - parseFloat(chloride);
        setAnionGap(uag); // Natijani saqlash
    };

    return (
        <div className="calculator-container">
            <h2 className="calculator-title">Urine Anion Gap Kalkulyatori</h2>
            <Paragraph className="calculator-description">
                Urine Anion Gap (UAG) siydikdagi asosiy ionlar (natriy, kaliy, xlor) orasidagi farqni ifodalaydi. Bu hisoblash
                siydikdagi anionlar va kationlar o'rtasidagi muvozanatni baholashda yordam beradi.
            </Paragraph>
            <Divider />
            <Text>Siydikdagi ionlarni (mEq/L) kiriting:</Text>
            <Input
                className="input-field"
                type="number"
                placeholder="Natriy (Na⁺)"
                value={sodium}
                onChange={(e) => setSodium(e.target.value)}
            />
            <Input
                className="input-field"
                type="number"
                placeholder="Kaliy (K⁺)"
                value={potassium}
                onChange={(e) => setPotassium(e.target.value)}
            />
            <Input
                className="input-field"
                type="number"
                placeholder="Xlor (Cl⁻)"
                value={chloride}
                onChange={(e) => setChloride(e.target.value)}
            />
            <Button className="calculate-button" type="primary" onClick={calculateUrineAnionGap}>
                Hisoblash
            </Button>
            {anionGap !== null && (
                <div className="result">
                    <Text strong>Urine Anion Gap:</Text>
                    <Text>{anionGap} mEq/L</Text>
                </div>
            )}
            <div className="formula-section">
                <Title level={4}>Formula:</Title>
                <Paragraph>
                    Urine Anion Gap = (Natriy + Kaliy) - Xlor
                </Paragraph>
            </div>
        </div>
    );
};

export default UrineAnionGapCalculator;
