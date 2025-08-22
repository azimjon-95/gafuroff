import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import './style.css';

const { Title, Text, Paragraph } = Typography;

const MIDASScale = () => {
    const [form] = Form.useForm();
    const [score, setScore] = useState(null);
    const [level, setLevel] = useState(null);
    const [disability, setDisability] = useState(null);

    const onFinish = (values) => {
        const totalScore = +values.q1 + +values.q2 + +values.q3 + +values.q4 + +values.q5;
        setScore(totalScore);

        if (totalScore >= 0 && totalScore <= 5) {
            setLevel('I');
            setDisability('Minimal nogironlik');
        } else if (totalScore >= 6 && totalScore <= 10) {
            setLevel('II');
            setDisability('Yengil nogironlik');
        } else if (totalScore >= 11 && totalScore <= 20) {
            setLevel('III');
            setDisability('O‘rtacha nogironlik');
        } else if (totalScore > 20) {
            setLevel('IV');
            setDisability('Og‘ir nogironlik');
        }
    };

    return (
        <div className="midas-container">
            <Title level={1}>MIDAS Shkalasi</Title>
            <Paragraph>Migrenda nogironlik darajasini o‘lchash.</Paragraph>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item
                    label="1. So'nggi 3 oyda bosh og'rig'i tufayli qancha kun ish kunini o'tkazib yubordingiz?"
                    name="q1"
                    rules={[{ required: true, message: 'Iltimos, bu maydonni to‘ldiring!' }]}
                >
                    <Input suffix="Kunlar" min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="2. So'nggi 3 oyda bosh og'rig'ingiz tufayli ishda yoki o'qishda ishlab chiqarish samaradorligingiz ikki baravar yoki undan ko'p pasaydimi?"
                    name="q2"
                    rules={[{ required: true, message: 'Iltimos, bu maydonni to‘ldiring!' }]}
                >
                    <Input suffix="Kunlar" min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="3. So'nggi 3 oyda bosh og'rig'ingiz tufayli uy ishlari (masalan, uy yumushlari, uy ta'mirlash va texnik xizmat ko'rsatish, xarid qilish, bolalar va qarindoshlarga qarash)ni bajarmagan kunlar soni?"
                    name="q3"
                    rules={[{ required: true, message: 'Iltimos, bu maydonni to‘ldiring!' }]}
                >
                    <Input suffix="Kunlar" min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="4. So'nggi 3 oyda bosh og'rig'ingiz tufayli uy mehnatining samaradorligi ikki baravar kamaygan kunlar soni?"
                    name="q4"
                    rules={[{ required: true, message: 'Iltimos, bu maydonni to‘ldiring!' }]}
                >
                    <Input suffix="Kunlar" min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="5. So'nggi 3 oyda bosh og'rig'i tufayli oilaviy yoki jamoat tadbirlari yoki dam olish kunlarini o'tkazib yubordingizmi?"
                    name="q5"
                    rules={[{ required: true, message: 'Iltimos, bu maydonni to‘ldiring!' }]}
                >
                    <Input suffix="Kunlar" min={0} style={{ width: '100%' }} />
                </Form.Item>
                {score !== null && (
                    <div style={{ fontWeight: 600 }}>
                        <Text>MIDAS Bahosi: {score}</Text><br />
                        <Text>MIDAS Darajasi: {level}</Text><br />
                        <Text>Nogironlik darajasi: {disability}</Text>
                    </div>
                )}<br />
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Hisoblash
                    </Button>
                </Form.Item>
            </Form>

            <div className="footer">
                <Paragraph>
                    MIDAS Bahosi Styuart va hammualliflar tomonidan yaratilgan. 2000 yilda birinchi marta Pain jurnalida chop etilgan.
                    U bemorlar uchun bosh og'rig'i kundaligiga tayanmasdan, migren darajasini tez va samarali o'lchash usuli sifatida ishlab chiqilgan.
                    Ushbu jadvaldagi ma'lumotlar migrenda diagnostika qilingan bemorlar tomonidan olingan va 90 kunlik kundalik bilan solishtirilgan.
                    MIDAS bahosi nogironlik darajasini aniq va ishonchli o'lchovi sifatida tan olingan. MIDAS umumiy bahosi va ekvivalent kundalik bahosi o'rtasidagi korrelyatsiya 0.63 ni tashkil etdi.
                </Paragraph>
            </div>
        </div>
    );
};

export default MIDASScale;
