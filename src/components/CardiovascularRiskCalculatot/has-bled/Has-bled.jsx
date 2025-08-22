import React, { useState } from 'react';
import { Form, Input, Checkbox, Button, Typography } from 'antd';

const { Title, Text } = Typography;

const HASBLEDCalculator = () => {
    // State lar
    const [hypertension, setHypertension] = useState(false);
    const [kidneyDysfunction, setKidneyDysfunction] = useState(false);
    const [liverDysfunction, setLiverDysfunction] = useState(false);
    const [strokeHistory, setStrokeHistory] = useState(false);
    const [bleedingHistory, setBleedingHistory] = useState(false);
    const [instableINR, setInstableINR] = useState(false);
    const [elderly, setElderly] = useState(false);
    const [medications, setMedications] = useState(false);
    const [alcohol, setAlcohol] = useState(false);
    const [score, setScore] = useState(0);

    // Hisoblash funksiyasi
    const calculateScore = () => {
        let totalScore = 0;
        if (hypertension) totalScore++;
        if (kidneyDysfunction) totalScore++;
        if (liverDysfunction) totalScore++;
        if (strokeHistory) totalScore++;
        if (bleedingHistory) totalScore++;
        if (instableINR) totalScore++;
        if (elderly) totalScore++;
        if (medications) totalScore++;
        if (alcohol) totalScore++;
        setScore(totalScore);
    };

    // Formni jo'natish funksiyasi
    const handleSubmit = (values) => {
        calculateScore();
    };

    // Formani tozalash funksiyasi
    const resetForm = () => {
        setHypertension(false);
        setKidneyDysfunction(false);
        setLiverDysfunction(false);
        setStrokeHistory(false);
        setBleedingHistory(false);
        setInstableINR(false);
        setElderly(false);
        setMedications(false);
        setAlcohol(false);
        setScore(0);
    };

    return (
        <div className="calculator-container">
            <Title level={2}>HAS-BLED shkalasi (atriyal fibrilatsiyada qon ketish xavfini baholash)</Title>
            <Form onFinish={handleSubmit}>
                <Form.Item>
                    <Checkbox checked={hypertension} onChange={() => setHypertension(!hypertension)}>
                        Arterial gipertoniya
                    </Checkbox>
                    <Text type="secondary"><i className="ball"><b>1</b> ball</i><br /> sistolik qon bosimi 160 mm Hg dan yuqori. Art.</Text>
                </Form.Item>
                <Form.Item>
                    <Checkbox checked={kidneyDysfunction} onChange={() => setKidneyDysfunction(!kidneyDysfunction)}>
                        Buyrak disfunksiyasi
                    </Checkbox>
                    <Text type="secondary"><i className="ball"><b>1</b> ball</i><br /> uzluksiz gemodializ, buyrak transplantatsiyasi yoki sarum kreatinin 200 mkmol/l dan yuqori.</Text>
                </Form.Item>
                <Form.Item>
                    <Checkbox checked={liverDysfunction} onChange={() => setLiverDysfunction(!liverDysfunction)}>
                        Jigar disfunksiyasi
                    </Checkbox>
                    <Text type="secondary"><i className="ball"><b>1</b> ball</i><br /> surunkali jigar kasalligi (masalan, siroz) yoki muhim jigar shikastlanishining biokimyoviy ko'rsatkichlari (bilirubin AST, ALT va ishqoriy fosfatazaning me'yorning yuqori chegarasidan 3 baravar ko'payishi bilan birgalikda normaning yuqori chegarasidan 2 baravar yuqori).</Text>
                </Form.Item>
                <Form.Item>
                    <Checkbox checked={strokeHistory} onChange={() => setStrokeHistory(!strokeHistory)}>
                        Insult tarixi
                    </Checkbox>
                </Form.Item>
                <Form.Item>
                    <Checkbox checked={bleedingHistory} onChange={() => setBleedingHistory(!bleedingHistory)}>
                        Qon ketish tarixi
                    </Checkbox>
                    <Text type="secondary"><i className="ball"><b>1</b> ball</i><br /> Anamnezda qon ketish, gemorragik diatez yoki anemiya, Hb - 2 g/l ning kamayishi.</Text>
                </Form.Item>
                <Form.Item>
                    <Checkbox checked={instableINR} onChange={() => setInstableINR(!instableINR)}>
                        Beqaror INR
                    </Checkbox>
                    <Text type="secondary"><i className="ball"><b>1</b> ball</i><br /> beqaror yoki yuqori INR yoki terapevtik intervaldan tashqarida vaqtning 40% dan ko'prog'i.</Text>
                </Form.Item>
                <Form.Item>
                    <Checkbox checked={elderly} onChange={() => setElderly(!elderly)}>
                        Keksa yoshli
                    </Checkbox>
                    <Text type="secondary"><i className="ball"><b>1</b> ball</i><br /> 65 yoshdan katta.</Text>
                </Form.Item>
                <Form.Item>
                    <Checkbox checked={medications} onChange={() => setMedications(!medications)}>
                        Dorilar
                    </Checkbox>
                    <Text type="secondary"><i className="ball"><b>1</b> ball</i><br /> antiplatelet agentlari va NSAIDlar kabi qon ketish xavfini oshiradigan dori-darmonlarni qabul qilish.</Text>
                </Form.Item>
                <Form.Item>
                    <Checkbox checked={alcohol} onChange={() => setAlcohol(!alcohol)}>
                        Spirtli ichimliklar
                    </Checkbox>
                    <Text type="secondary"><i className="ball"><b>1</b> ball</i><br />Haftasiga 8 dan ortiq spirtli ichimliklar ichish.</Text>
                </Form.Item>
                <Form.Item>
                    <label>Hisoblangan HAS-BLED natijasi:</label>
                    <Input
                        value={
                            score && score >= 3
                                ? "Qon ketish xavfi yuqori va har qanday antitrombotik preparatni qo'llash juda ehtiyot bo'lishni talab qiladi."
                                : score
                        }
                        readOnly
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Hisoblash</Button>
                    <Button type="default" onClick={resetForm} style={{ marginLeft: '10px' }}>Tozalash</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default HASBLEDCalculator;
