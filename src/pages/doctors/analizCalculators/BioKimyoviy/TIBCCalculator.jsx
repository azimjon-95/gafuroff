import React, { useState } from "react";
import { Input, Button, Typography } from "antd";
import "./style.css"; // CSS faylini import qilish

const { Title, Text, Paragraph } = Typography;

const TIBCCalculator = () => {
    const [tibc, setTibc] = useState("");
    const [result, setResult] = useState(null);

    const calculateTIBC = () => {
        const tibcValue = parseFloat(tibc);

        if (isNaN(tibcValue)) {
            setResult("Iltimos, to'g'ri raqam kiriting!");
            return;
        }

        let diagnosis = "";

        if (tibcValue < 240) {
            diagnosis = "Temir darajasi past (Temir yetishmovchiligi bo'lishi mumkin)";
        } else if (tibcValue >= 240 && tibcValue <= 450) {
            diagnosis = "Normal darajada";
        } else {
            diagnosis = "Temir darajasi yuqori (Temir ortiqcha)";
        }

        setResult(diagnosis);
    };

    return (
        <div className="calculator-container">
            <h2 level={3} className="calculator-title">TIBC Kalkulyatori</h2>
            <Paragraph className="calculator-description">
                <Text strong>TIBC (Temirning umumiy bog‘lanish sig‘imi) kalkulyatori</Text> organizmdagi
                umumiy temir bog'lash imkoniyatini hisoblash uchun ishlatiladi. Bu o'lchov orqali
                temir yetishmovchiligi yoki ortiqchaligi holatlarini aniqlash mumkin.
                <br />
                <br />
                TIBC darajasi past bo'lsa, organizmda temir yetishmasligi ehtimoli bor. TIBC darajasi
                yuqori bo'lsa, bu temir ortiqchaligini ko'rsatishi mumkin. Normada esa TIBC qiymati
                **240 - 450 mcg/dL** oralig'ida bo'lishi kerak.
            </Paragraph>
            <Text>Temirning umumiy bog‘lanish sig‘imini kiriting (240 - 450 mcg/dL):</Text>
            <Input
                className="input-field"
                placeholder="TIBC qiymatini kiriting"
                value={tibc}
                onChange={(e) => setTibc(e.target.value)}
            />
            <Button className="calculate-button" type="primary" onClick={calculateTIBC}>
                Hisoblash
            </Button>
            {result && (
                <div className="result">
                    <Text strong>Natija:</Text>
                    <Text>{result}</Text>
                </div>
            )}
            <div className="formula-section">
                <Title level={4}>Formula:</Title>
                <Paragraph>
                    TIBC normal diapazoni: <strong>240 - 450 mcg/dL</strong> oralig'ida.
                    <ul>
                        <li>
                            Agar <strong>TIBC &gt; 240 mcg/dL</strong> bo'lsa: Temir yetishmovchiligi
                            ehtimoli bor.
                        </li>
                        <li>
                            Agar <strong>TIBC 240 - 450 mcg/dL</strong> bo'lsa: Temir darajasi normal.
                        </li>
                        <li>
                            Agar <strong>TIBC &gt; 450 mcg/dL</strong> bo'lsa: Temir ortiqcha.
                        </li>
                    </ul>
                </Paragraph>
            </div>
        </div>
    );
};

export default TIBCCalculator;
