import React, { useState } from 'react';
import { Form, Radio, Button } from 'antd';

const { Item } = Form;

const GlasgowComaScale = () => {
    const [result, setResult] = useState('');
    const [form] = Form.useForm();

    const calculateScore = (values) => {
        const { eyeOpening, motorResponse, verbalResponse } = values;
        const score = (parseInt(eyeOpening, 10) || 0) + (parseInt(motorResponse, 10) || 0) + (parseInt(verbalResponse, 10) || 0);
        return score;
    };

    const onValuesChange = (changedValues, allValues) => {
        const score = calculateScore(allValues);
        setResult(score);


    };

    const resetForm = () => {
        form.resetFields();
        setResult('');
    };

    const getResultText = () => {
        if (!result) return '';

        let state;
        if (result <= 8) {
            state = 'Og\'ir koma holati';
        } else if (result <= 12) {
            state = 'O\'rtacha koma holati';
        } else {
            state = 'Yengil koma holati';
        }

        return `Sizning Glazgo koma shkalasi bo'yicha bahoyingiz: ${result}. Bu ${state} hisoblanadi.`;
    };

    return (
        <div className="calculator-container">
            <h2>Glazgo Koma Shkalasi Bo'yicha Baholash</h2>
            <Form form={form} onValuesChange={onValuesChange} layout="vertical">
                <Item label="Ko'zlarni ochish" name="eyeOpening" rules={[{ required: true, message: 'Iltimos, birini tanlang!' }]}>
                    <Radio.Group>
                        <Radio value="4">Spontan (4 ball)</Radio><br />
                        <Radio value="3">Ovozga (3 ball)</Radio><br />
                        <Radio value="2">Ogroq bilan (2 ball)</Radio><br />
                        <Radio value="1">Hech qaysi (1 ball)</Radio><br />
                    </Radio.Group>
                </Item>

                <Item label="Eng yaxshi motor javob" name="motorResponse" rules={[{ required: true, message: 'Iltimos, birini tanlang!' }]}>
                    <Radio.Group>
                        <Radio value="6">Og'zaki buyruqni bajaradi (6 ball)</Radio><br />
                        <Radio value="5">Ogroq stimulyatorlarni lokalizatsiya qiladi (5 ball)</Radio><br />
                        <Radio value="4">Ogroq stimulyatorlardan chekinadi (4 ball)</Radio><br />
                        <Radio value="3">Dekortikal reaktsiya (3 ball)</Radio><br />
                        <Radio value="2">Dekerebratsion reaktsiya (2 ball)</Radio><br />
                        <Radio value="1">Hech qaysi (1 ball)</Radio><br />
                    </Radio.Group>
                </Item>

                <Item label="Eng yaxshi og'zaki javob" name="verbalResponse" rules={[{ required: true, message: 'Iltimos, birini tanlang!' }]}>
                    <Radio.Group>
                        <Radio value="5">Orientatsiyalangan suhbat (5 ball)</Radio><br />
                        <Radio value="4">Dezorientatsiyalangan suhbat (4 ball)</Radio><br />
                        <Radio value="3">Noo'rin so'zlar (3 ball)</Radio><br />
                        <Radio value="2">Noaniq tovushlar (2 ball)</Radio><br />
                        <Radio value="1">Hech qaysi (1 ball)</Radio><br />
                    </Radio.Group>
                </Item>

                <Item>
                    <label>Natija: </label>
                    <div>{getResultText()}</div>
                </Item>

                <Item>
                    <Button type="default" onClick={resetForm} style={{ marginLeft: '10px' }}>
                        Tozalash
                    </Button>
                </Item>
            </Form>
        </div>
    );
};

export default GlasgowComaScale;
