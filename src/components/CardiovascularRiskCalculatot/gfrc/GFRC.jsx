import React, { useState } from 'react';
import { Form, Input, Radio, Button, Typography } from 'antd';

const { Title } = Typography;

const GFRCalculator = () => {
    const [form] = Form.useForm();
    const [result, setResult] = useState({
        ckdEpi: '',
        mdrd: '',
        cockcroftGault: '',
        stage: '',
    });

    const calculateGFR = (values) => {
        const { gender, creatinine, age, weight, height } = values;
        const isMale = gender === 'male';
        // const k = isMale ? 1 : 0.742;
        const creatinineMgDl = creatinine / 88.4;

        // CKD-EPI formula
        const ckdEpi = (141 * Math.min(creatinineMgDl / 0.9, 1) ** -0.411 * Math.max(creatinineMgDl / 0.9, 1) ** -1.209 * 0.993 ** age * (isMale ? 1 : 1.018)).toFixed(2);

        // MDRD formula
        const mdrd = (175 * creatinineMgDl ** -1.154 * age ** -0.203 * (isMale ? 1 : 0.742)).toFixed(2);

        // Cockcroft-Gault formula
        const cockcroftGault = ((140 - age) * weight * (isMale ? 1 : 0.85) / creatinineMgDl / 72).toFixed(2);
        const cockcroftGaultNorm = ((cockcroftGault * 1.73) / (height * height / 10000)).toFixed(2);

        // Determine CKD stage
        let stage = '';
        const ckdEpiValue = parseFloat(ckdEpi);
        if (ckdEpiValue >= 90) stage = 'Normal yoki yuqori GFR';
        else if (ckdEpiValue >= 60) stage = 'S3A (Yuqori)';
        else if (ckdEpiValue >= 45) stage = 'S3B (O‘rta)';
        else if (ckdEpiValue >= 30) stage = 'S4 (O‘rta)';
        else if (ckdEpiValue >= 15) stage = 'S5 (Yuqori)';
        else stage = 'S5 (O‘ta yuqori)';

        setResult({
            ckdEpi: `${ckdEpi} ml/min / 1.73 m²`,
            mdrd: `${mdrd} ml/min / 1.73 m²`,
            cockcroftGault: `${cockcroftGault} ml/min (${cockcroftGaultNorm} ml/min / 1.73 m²)`,
            stage,
        });
    };

    // Formani tozalash funksiyasi
    const resetForm = () => {
        setResult("");

    };

    return (
        <div className="calculator-container">
            <Title level={1}>Kreatinin Klirensi va GFR Kalkulyatori</Title>
            <Form
                form={form}
                layout="vertical"
                onFinish={calculateGFR}
            >
                <Form.Item label="Jinsi" name="gender" rules={[{ required: true, message: 'Iltimos, jinsni tanlang!' }]}>
                    <Radio.Group>
                        <Radio value="male">Erkak</Radio>
                        <Radio value="female">Ayol</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Kreatinin (mkmol/l)" name="creatinine" rules={[{ required: true, message: 'Iltimos, kreatinin qiymatini kiriting!' }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item label="Yosh (yil)" name="age" rules={[{ required: true, message: 'Iltimos, yoshingizni kiriting!' }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item label="Vazn (kg)" name="weight" rules={[{ required: true, message: 'Iltimos, vazningizni kiriting!' }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item label="Balandlik (sm)" name="height" rules={[{ required: true, message: 'Iltimos, bo‘yingizni kiriting!' }]}>
                    <Input type="number" />
                </Form.Item>
            </Form>
            {result.ckdEpi && (
                <div className="result">
                    <Title level={2}>CKD-EPI: {result.ckdEpi}</Title>
                    <Title level={2}>MDRD: {result.mdrd}</Title>
                    <Title level={2}>Cockcroft-Gault: {result.cockcroftGault}</Title>
                    <Title level={3}>BPH darajasi: {result.stage}</Title>
                </div>
            )}
            <Form.Item>
                <Button type="primary" htmlType="submit">Hisoblash</Button>
                <Button type="default" onClick={resetForm} style={{ marginLeft: '10px' }}>Tozalash</Button>
            </Form.Item>
        </div>
    );
};

export default GFRCalculator;
