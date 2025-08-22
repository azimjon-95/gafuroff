import React, { useState } from 'react';
import { Input, Button, Typography, Divider } from 'antd';
import "./style.css"; // CSS faylini import qilish

const { Title, Text, Paragraph } = Typography;

const TransferrinSaturationCalculator = () => {
    const [iron, setIron] = useState('');
    const [tibc, setTibc] = useState('');
    const [transferrinSaturation, setTransferrinSaturation] = useState(null);

    const calculateTransferrinSaturation = () => {
        const ironValue = parseFloat(iron);
        const tibcValue = parseFloat(tibc);

        if (tibcValue > 0) {
            const saturation = (ironValue / tibcValue) * 100;
            setTransferrinSaturation(saturation.toFixed(2)); // Natijani ikki o'nlik raqamga to'g'rilash
        } else {
            alert("TIBC 0 dan katta bo'lishi kerak!");
        }
    };

    return (
        <div className="calculator-container">
            <h2 className="calculator-title">Transferrin Saturation Kalkulyatori</h2>
            <Paragraph className="calculator-description">
                <Text strong>Transferrin saturatsiyasi</Text> organizmdagi temirni tashish uchun
                mas'ul bo'lgan transferrin oqsili yordamida hisoblanadi. Ushbu kalkulyator
                temir va TIBC darajalarini kiritish orqali transferrin saturatsiyasini hisoblaydi.
            </Paragraph>
            <Divider />
            <Text>Temirni (mg/dL) va TIBCni (mg/dL) kiriting:</Text>
            <Input
                className="input-field"
                type="number"
                placeholder="Temir (masalan: 100)"
                value={iron}
                onChange={(e) => setIron(e.target.value)}
            />
            <Input
                className="input-field"
                type="number"
                placeholder="TIBC (masalan: 300)"
                value={tibc}
                onChange={(e) => setTibc(e.target.value)}
            />
            <Button className="calculate-button" type="primary" onClick={calculateTransferrinSaturation}>
                Hisoblash
            </Button>
            {transferrinSaturation !== null && (
                <div className="result">
                    <Text strong>Transferrin Saturation:</Text>
                    <Text>{transferrinSaturation} %</Text>
                </div>
            )}
            <div className="formula-section">
                <Title level={4}>Formula:</Title>
                <Paragraph>
                    Transferrin Saturation = (Temir / TIBC) × 100
                    <br />
                    TIBC 0 dan katta bo'lishi kerak.
                </Paragraph>
            </div>
        </div>
    );
};

export default TransferrinSaturationCalculator;
