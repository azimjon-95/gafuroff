import React, { useState } from 'react';
import { Input, Button, Typography, Card } from 'antd';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const { Title, Text } = Typography;

const FEUreaCalculator = () => {
    const [urineUrea, setUrineUrea] = useState('');
    const [plasmaUrea, setPlasmaUrea] = useState('');
    const [urineCreatinine, setUrineCreatinine] = useState('');
    const [plasmaCreatinine, setPlasmaCreatinine] = useState('');
    const [result, setResult] = useState(null);

    const calculateFEUrea = () => {
        if (!urineUrea || !plasmaUrea || !urineCreatinine || !plasmaCreatinine) {
            alert('Iltimos, barcha maydonlarni to‘ldiring.');
            return;
        }

        const numerator = (urineUrea / urineCreatinine) * 100;
        const denominator = plasmaUrea / plasmaCreatinine;
        const feUrea = numerator / denominator;

        setResult(feUrea);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Card>
                <Title level={2}>Fractional Excretion of Urea (FEUrea) Kalkulyatori</Title>
                <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                    Formula: FEUrea (%) = (U_Urea / U_Cr) / (P_Urea / P_Cr) × 100
                </Text>
                <Text>
                    Ushbu kalkulyator yordamida siydikdagi urea va kreatinin darajalaridan plazmadagi urea va kreatinin darajalari bilan solishtirish orqali FEUrea ni hisoblash mumkin.
                </Text>
                <Text strong style={{ display: 'block', marginTop: '10px' }}>
                    Formula:
                </Text>
                <Text style={{ display: 'block', marginBottom: '20px' }}>
                    FEUrea (%) = (U_Urea / U_Cr) / (P_Urea / P_Cr) × 100
                </Text>

                <Input
                    className="input-field"
                    placeholder="Siydik Urea (U_Urea) darajasi (mmol/L)"
                    type="number"
                    value={urineUrea}
                    onChange={(e) => setUrineUrea(e.target.value)}
                />
                <Input
                    className="input-field"
                    placeholder="Plazma Urea (P_Urea) darajasi (mmol/L)"
                    type="number"
                    value={plasmaUrea}
                    onChange={(e) => setPlasmaUrea(e.target.value)}
                />
                <Input
                    className="input-field"
                    placeholder="Siydik Kreatinin (U_Cr) darajasi (mmol/L)"
                    type="number"
                    value={urineCreatinine}
                    onChange={(e) => setUrineCreatinine(e.target.value)}
                />
                <Input
                    className="input-field"
                    placeholder="Plazma Kreatinin (P_Cr) darajasi (mmol/L)"
                    type="number"
                    value={plasmaCreatinine}
                    onChange={(e) => setPlasmaCreatinine(e.target.value)}
                />
                <Button type="primary" onClick={calculateFEUrea} style={{ marginTop: '10px' }}>
                    Hisoblash
                </Button>
                {result !== null && (
                    <Text style={{ display: 'block', marginTop: '10px' }}>
                        Fractional Excretion of Urea (FEUrea): <strong>{result.toFixed(2)}</strong> %
                    </Text>
                )}
            </Card>
        </div>
    );
};

export default FEUreaCalculator;
