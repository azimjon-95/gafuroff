import React, { useState } from "react";
import { Input, Button, Typography } from "antd";

const { Text } = Typography;

const BMICalculator = () => {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [result, setResult] = useState(null);

    const calculateBMI = () => {
        const weightValue = parseFloat(weight);
        const heightValue = parseFloat(height);

        if (isNaN(weightValue) || isNaN(heightValue)) {
            setResult("Iltimos, to'g'ri raqam kiriting!");
            return;
        }

        // Bo'y uzunligini metrlarda kiritish kerak
        const heightInMeters = heightValue / 100; // sm -> m
        const bmi = weightValue / (heightInMeters * heightInMeters);
        let diagnosis = "";

        if (bmi < 18.5) {
            diagnosis = "Ozg'inlik";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            diagnosis = "Normal vazn";
        } else if (bmi >= 25 && bmi <= 29.9) {
            diagnosis = "Ortiqcha vazn";
        } else {
            diagnosis = "Semizlik";
        }

        setResult(`Sizning BMI: ${bmi.toFixed(2)} (${diagnosis})`);
    };

    return (
        <div className="calculator-container">

            <h2>BMI Kalkulyatori</h2>
            <p>
                Ushbu kalkulyator, sizning BMI (Body Mass Index) ni hisoblash imkonini beradi. BMI
                odamning vaznini bo'yiga nisbatan baholash uchun ishlatiladi va insonning normal vazn,
                ortiqcha vazn yoki ozg'inligini aniqlashda yordam beradi.
            </p>
            <br />
            <p>
                <strong>MDRD Formulasi:</strong><br />
                MDRD formulasi quyidagicha:<br />
                eGFR (mL/min/1.73 m²) = 175 × (serum kreatinin)^-1.154 × (yosh)^-0.203 × (0.742 agar ayol bo'lsa) × (1.212 agar qora tanli bo'lsa)
            </p>

            <Text>Vazningizni kiriting (kg):</Text>
            <Input
                placeholder="Vazn (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                style={{ marginTop: "10px", marginBottom: "10px" }}
            />
            <Text>Bo'yingizni kiriting (sm):</Text>
            <Input
                placeholder="Bo'y (sm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                style={{ marginTop: "10px", marginBottom: "10px" }}
            />
            <Button type="primary" onClick={calculateBMI}>
                Hisoblash
            </Button>
            {result && (
                <div style={{ marginTop: "20px" }}>
                    <Text strong>Natija:</Text>
                    <Text>{result}</Text>
                </div>
            )}
        </div>
    );
};

export default BMICalculator;
