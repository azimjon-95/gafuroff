import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import './style.css'; // CSS faylini import qilish

const { Title, Text } = Typography;

function WestNomogramCalculator() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bsa, setBsa] = useState(null);
    const [dosePerBsa, setDosePerBsa] = useState('');
    const [dose, setDose] = useState(null);

    const calculateBSA = () => {
        if (weight && height) {
            const bsaValue = Math.sqrt((parseFloat(weight) * parseFloat(height)) / 3600);
            setBsa(bsaValue.toFixed(2)); // Natijani ikki o'nlik raqamga to'g'rilash
        } else {
            alert("Vazn va bo'yini to'ldirish kerak!");
        }
    };

    const calculateDose = () => {
        if (bsa && dosePerBsa) {
            const doseValue = parseFloat(bsa) * parseFloat(dosePerBsa);
            setDose(doseValue.toFixed(2)); // Natijani ikki o'nlik raqamga to'g'rilash
        } else {
            alert("BSA va doza maydonlarini to'ldirish kerak!");
        }
    };

    return (
        <div className="calculator-container">

            <h2>West Nomogram Kalkulyatori</h2>

            <Text>Bemor vazni (kg):</Text>
            <Input
                className="input-field"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Masalan: 15"
                style={{ marginTop: "10px", marginBottom: "10px" }}
            />

            <Text>Bemor bo'yi (sm):</Text>
            <Input
                className="input-field"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Masalan: 100"
                style={{ marginTop: "10px", marginBottom: "10px" }}
            />

            <Button type="primary" onClick={calculateBSA} style={{ marginBottom: "10px" }}>
                BSA ni hisoblash
            </Button>

            {bsa !== null && (
                <h3>Tana Yuzasi Maydoni (BSA): {bsa} m²</h3>
            )}

            <Text>Dori doza (mg/m²):</Text>
            <Input
                className="input-field"
                type="number"
                value={dosePerBsa}
                onChange={(e) => setDosePerBsa(e.target.value)}
                placeholder="Masalan: 10"
                style={{ marginTop: "10px", marginBottom: "10px" }}
            />

            <Button type="primary" onClick={calculateDose}>
                Dozani hisoblash
            </Button>

            {dose !== null && (
                <h3>Dori doza: {dose} mg</h3>
            )}

            <div style={{ marginTop: "30px" }}>
                <Title level={4}>Formula:</Title>
                <Text>
                    BSA = √((Vazn (kg) × Bo'y (sm)) / 3600)
                </Text>
                <Text>
                    Dori doza = BSA × Dori doza (mg/m²)
                </Text>
            </div>
        </div>
    );
}

export default WestNomogramCalculator;

