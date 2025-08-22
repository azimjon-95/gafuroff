import React, { useState } from 'react';
import { Input, Button, Typography, Divider } from 'antd';
import './style.css'; // CSS faylini import qilish

const { Title, Text, Paragraph } = Typography;

const VasopressorDoseCalculator = () => {
    const [weight, setWeight] = useState('');
    const [dosePerKg, setDosePerKg] = useState('');
    const [vasopressorDose, setVasopressorDose] = useState(null);

    const calculateVasopressorDose = () => {
        if (weight && dosePerKg) {
            const dose = (parseFloat(weight) * parseFloat(dosePerKg)) / 60; // Dozani mcg/min da hisoblash
            setVasopressorDose(dose.toFixed(2)); // Natijani ikki o'nlik raqamga to'g'rilash
        } else {
            alert("Barcha maydonlarni to'ldirish kerak!");
        }
    };

    return (
        <div className="calculator-container">
            <h2 className="calculator-title">Vasopressor Dozasi Kalkulyatori</h2>
            <Paragraph className="calculator-description">
                Vasopressor dozasini hisoblash uchun bemor vaznini (kg) va dozani (mcg/kg/min) kiriting.
                Bu kalkulyator intensiv terapiya muolajalari uchun doza hisoblashda yordam beradi.
            </Paragraph>
            <Divider />
            <Text>Bemorning vaznini va dozani kiriting:</Text>
            <Input
                className="input-field"
                type="number"
                placeholder="Bemor vazni (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            />
            <Input
                className="input-field"
                type="number"
                placeholder="Doza (mcg/kg/min)"
                value={dosePerKg}
                onChange={(e) => setDosePerKg(e.target.value)}
            />
            <Button className="calculate-button" type="primary" onClick={calculateVasopressorDose}>
                Hisoblash
            </Button>
            {vasopressorDose !== null && (
                <div className="result">
                    <Text strong>Vasopressor Dozasi:</Text>
                    <Text>{vasopressorDose} mcg/min</Text>
                </div>
            )}
            <div className="formula-section">
                <Title level={4}>Formula:</Title>
                <Paragraph>
                    Vasopressor Dozasi = (Bemor Vazni (kg) * Doza (mcg/kg/min)) / 60
                </Paragraph>
            </div>
        </div>
    );
};

export default VasopressorDoseCalculator;
