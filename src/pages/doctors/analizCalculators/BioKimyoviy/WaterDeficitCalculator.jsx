import React, { useState } from "react";
import { Input, Button, Typography, Radio } from "antd";
import './style.css'; // CSS faylini import qilish

const { Title, Text } = Typography;

const WaterDeficitCalculator = () => {
    const [weight, setWeight] = useState("");
    const [serumSodium, setSerumSodium] = useState("");
    const [gender, setGender] = useState("male");
    const [result, setResult] = useState(null);

    const calculateWaterDeficit = () => {
        const weightValue = parseFloat(weight);
        const sodiumValue = parseFloat(serumSodium);

        if (isNaN(weightValue) || isNaN(sodiumValue) || sodiumValue <= 140) {
            setResult("Iltimos, to'g'ri raqam kiriting! (Natriy darajasi 140 mmol/L dan yuqori bo'lishi kerak)");
            return;
        }

        // TBW (Total Body Water) ni hisoblash (Erkaklar uchun 0.6 × og'irlik, Ayollar uchun 0.5 × og'irlik)
        const tbw = gender === "male" ? 0.6 * weightValue : 0.5 * weightValue;

        // Water Deficit formulasi: TBW × ((Serum Sodium - 140) / 140)
        const waterDeficit = tbw * ((sodiumValue - 140) / 140);

        setResult(`Sizning suyuqlik yetishmasligi: ${waterDeficit.toFixed(2)} L`);
    };

    return (
        <div className="calculator-container">

            <h2>Gipernatriemiya suyuqlik yetishmasligi kalkulyatori</h2>

            <Text>Vazningizni kiriting (kg):</Text>
            <Input
                className="input-field"
                placeholder="Vazn (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                style={{ marginTop: "10px", marginBottom: "10px" }}
            />

            <Text>Qondagi natriy darajasini kiriting (mmol/L):</Text>
            <Input
                className="input-field"
                placeholder="Serum Sodium (mmol/L)"
                value={serumSodium}
                onChange={(e) => setSerumSodium(e.target.value)}
                style={{ marginTop: "10px", marginBottom: "10px" }}
            />

            <Text>Jinsingizni tanlang:</Text>
            <Radio.Group
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                style={{ marginTop: "10px", marginBottom: "10px" }}
            >
                <Radio value="male">Erkak</Radio>
                <Radio value="female">Ayol</Radio>
            </Radio.Group>

            <Button type="primary" onClick={calculateWaterDeficit}>
                Hisoblash
            </Button>

            {result && (
                <div style={{ marginTop: "20px" }}>
                    <Text strong>Natija:</Text>
                    <Text>{result}</Text>
                </div>
            )}

            <div style={{ marginTop: "30px" }}>
                <Title level={4}>Formula:</Title>
                <Text>
                    Suyuq yetishmasligi = TBW × ((Serum Sodium - 140) / 140)
                </Text>
            </div>
        </div>
    );
};

export default WaterDeficitCalculator;
