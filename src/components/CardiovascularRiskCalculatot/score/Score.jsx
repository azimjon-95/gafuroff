import React, { useState } from 'react';
import { Form, Input, Button, Radio, notification } from 'antd';
import './style.css'
const { Item } = Form;

const ScoreScaleFormWrapper = () => {
    const [result, setResult] = useState('');
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const { gender, smoking, age, systolicBP, cholesterol } = values;
        let risk = 0;

        // Dummy calculation for demonstration purposes
        // In real application, use an actual SCORE calculation formula
        if (age && systolicBP && cholesterol) {
            risk = (age / 100) + (systolicBP / 200) + (cholesterol / 10);
            if (smoking === 'yes') risk += 1;
            if (gender === 'male') risk += 1;
        }

        let riskCategory = '';
        if (risk < 1) riskCategory = 'Riski past (< 1%)';
        else if (risk < 5) riskCategory = 'O\'rtacha (1-5%)';
        else if (risk < 10) riskCategory = 'Yuqori (5-10%)';
        else riskCategory = 'Juda yuqori (> 10%)';

        setResult(riskCategory);
        notification.success({
            message: 'Natija',
            description: `Sizning 10 yillik yurak-qon tomir kasalliklaridan o'lish xavfi: ${riskCategory}`,
        });
    };

    const resetForm = () => {
        form.resetFields();
        setResult('');
    };

    return (
        <div className="calculator-container">
            <h2>SCORE shkalasi</h2>
            <p style={{ fontSize: "14px", color: "gray" }}>SCORE (Sistematic Coronary Risk Evaluation) shkalasi insonning keyingi 10 yil ichida yurak-qon tomir kasalliklaridan o'lish xavfini baholash imkonini beradi. 40 yosh va undan katta yoshdagi odamlarda SCORE shkalasidan foydalanish tavsiya etiladi.</p>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Item label="Jinsi" name="gender" rules={[{ required: true, message: 'Iltimos, jinsni tanlang!' }]}>
                    <Radio.Group>
                        <Radio value="male">Erkak</Radio>
                        <Radio value="female">Ayol</Radio>
                    </Radio.Group>
                </Item>

                <Item label="Chekasizmi?" name="smoking" rules={[{ required: true, message: 'Iltimos, chekish holatini tanlang!' }]}>
                    <Radio.Group>
                        <Radio value="yes">Ha</Radio>
                        <Radio value="no">Yo'q</Radio>
                    </Radio.Group>
                </Item>

                <Item label="Yosh" name="age" rules={[{ required: true, message: 'Iltimos, yoshni kiriting!' }]}>
                    <Input type="number" suffix="yosh" />
                </Item>

                <Item label="Sistolik qon bosimi" name="systolicBP" rules={[{ required: true, message: 'Iltimos, sistolik qon bosimini kiriting!' }]}>
                    <Input type="number" suffix="mm. rt. st." />
                </Item>

                <Item label="Xolesterin" name="cholesterol" rules={[{ required: true, message: 'Iltimos, xolesterin darajasini kiriting!' }]}>
                    <Input type="number" suffix="mmol/l" />
                </Item>

                <Item>
                    <label>Natija: </label>
                    <Input
                        value={result}
                        readOnly
                    />
                </Item>

                <Item>
                    <Button type="primary" htmlType="submit">Hisoblash</Button>
                    <Button type="default" onClick={resetForm} style={{ marginLeft: '10px' }}>Tozalash</Button>
                </Item>
            </Form>
            <p style={{ fontSize: "14px", color: "gray" }}>1% dan kam bo'lgan xavf past deb hisoblanadi. 1% dan 5% gacha - o'rtacha, 5% dan 10% gacha - yuqori, 10% dan yuqori - juda yuqori.<br /><br />
                <h6>Bemor quyidagi hollarda SCORE shkalasidan foydalanilmaydi:</h6>
                <ul>
                    <li>qon tomir aterosklerozga asoslangan yurak-qon tomir kasalliklari;</li>
                    <li>Tutqanoq kiritilganidan so'ng (t-PA kiritishni ko'rib chiqish mumkin, agar qon tomir okklyuziya KT-angiografiya orqali aniqlansa).</li>
                    <li>I va II turdagi qandli diabet;</li>
                    <li>qon bosimi va / yoki umumiy xolesterinning juda yuqori darajasi;</li>
                    <li>surunkali buyrak kasalligi.</li>
                </ul>
                Agar bu shartlar mavjud bo'lsa, xavf yuqoridan juda yuqori deb hisoblanadi.

                O'rtacha va ayniqsa yuqori va juda yuqori yurak-qon tomir xavfi bo'lgan odamlarda barcha xavf omillari darajasini kamaytirish uchun faol choralar ko'rish kerak.</p>
        </div>
    );
};


export default ScoreScaleFormWrapper;
