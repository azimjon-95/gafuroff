import React, { useState } from 'react';
import { Form, Radio, Typography } from 'antd';


const { Title } = Typography;

const ABCD2Calculator = () => {
    const [scores, setScores] = useState({
        age: 0,
        bloodPressure: 0,
        clinicalFeatures: 0,
        duration: 0,
        diabetes: 0,
    });

    const handleChange = (field, value) => {
        setScores(prevScores => ({
            ...prevScores,
            [field]: value,
        }));
    };

    const calculateScore = () => {
        const { age, bloodPressure, clinicalFeatures, duration, diabetes } = scores;
        return age + bloodPressure + clinicalFeatures + duration + diabetes;
    };

    const getRiskLevel = (score) => {
        if (score >= 0 && score <= 3) {
            return 'Past xavf';
        } else if (score >= 4 && score <= 5) {
            return 'O‘rtacha xavf';
        } else {
            return 'Yuqori xavf';
        }
    };

    const getRiskPercentages = (score) => {
        if (score >= 0 && score <= 3) {
            return {
                twoDays: '1.0%',
                oneWeek: '1.2%',
                threeMonths: '3.1%',
            };
        } else if (score >= 4 && score <= 5) {
            return {
                twoDays: '4.1%',
                oneWeek: '5.9%',
                threeMonths: '9.8%',
            };
        } else {
            return {
                twoDays: '8.1%',
                oneWeek: '11.7%',
                threeMonths: '17.8%',
            };
        }
    };

    const score = calculateScore();
    const riskLevel = getRiskLevel(score);
    const riskPercentages = getRiskPercentages(score);

    return (
        <div className="calculator-container">
            <h2>Shkala ABCD2 ko'rsatkichi vaqtinchalik ishemik xurujdan (TIA) keyingi dastlabki 2, 7 va 90 kun ichida insult xavfini erta bashorat qilishga yordam beradigan tezkor klinik vositadir.</h2>
            <Form>
                <b>Yosh</b>
                <Form.Item className="ItemForm_kard">
                    <Radio.Group onChange={(e) => handleChange('age', e.target.value)} value={scores.age}>
                        <Radio value={0}>60 yoshdan kichik</Radio><br />
                        <Radio value={1}>60 yoshdan katta</Radio>
                    </Radio.Group>
                </Form.Item>
                <b>Arterial bosim</b>
                <Form.Item className="ItemForm_kard">
                    <Radio.Group onChange={(e) => handleChange('bloodPressure', e.target.value)} value={scores.bloodPressure}>
                        <Radio value={0}>Normal</Radio><br />
                        <Radio value={1}>140/90 mm r.t.s. dan yuqori</Radio>
                    </Radio.Group>
                </Form.Item>
                <b>Klinik belgilari</b>
                <Form.Item className="ItemForm_kard">
                    <Radio.Group onChange={(e) => handleChange('clinicalFeatures', e.target.value)} value={scores.clinicalFeatures}>
                        <Radio value={0}>Boshqa belgilar</Radio><br />
                        <Radio value={1}>Nutqning buzilishi (gemiparezsiz)</Radio><br />
                        <Radio value={2}>Gemiparez</Radio>
                    </Radio.Group>
                </Form.Item>
                <b>Belgilarning davomiyligi</b>
                <Form.Item className="ItemForm_kard">
                    <Radio.Group onChange={(e) => handleChange('duration', e.target.value)} value={scores.duration}>
                        <Radio value={0}>10 daqiqadan kam</Radio><br />
                        <Radio value={1}>10-59 daqiqa</Radio><br />
                        <Radio value={2}>60 daqiqadan ko'p</Radio>
                    </Radio.Group>
                </Form.Item>
                <b>Qandli diabet</b>
                <Form.Item className="ItemForm_kard">
                    <Radio.Group onChange={(e) => handleChange('diabetes', e.target.value)} value={scores.diabetes}>
                        <Radio value={0}>Yo'q</Radio>
                        <Radio value={1}>Bor</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
            <div className="result">
                <Title level={2}>Umumiy Ball: {score}</Title>
                <Title level={2}>Xavf Darajasi: {riskLevel}</Title>
                <Title level={3}>2 Kun ichida insul't xavfi: {riskPercentages.twoDays}</Title>
                <Title level={3}>1 Hafta ichida insul't xavfi: {riskPercentages.oneWeek}</Title>
                <Title level={3}>3 Oy ichida insul't xavfi: {riskPercentages.threeMonths}</Title>
            </div>
        </div>
    );
};

export default ABCD2Calculator;
