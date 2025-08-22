import React, { useState } from 'react';
import { Form, Input, Radio, Checkbox, notification, Button } from 'antd';

const { Item } = Form;
const { TextArea } = Input;

const HuntHessScale = () => {
    const [result, setResult] = useState('');
    const [form] = Form.useForm();

    const calculateScore = (values) => {
        const { condition, additional } = values;
        let score = parseInt(condition, 10);

        if (additional) {
            score += 1;
        }

        return score;
    };

    const onValuesChange = (changedValues, allValues) => {
        const score = calculateScore(allValues);
        setResult(score);

        notification.success({
            message: 'Natija',
            description: `Sizning Hant-Hess shkalasi bo'yicha bahoyingiz: ${score}`,
        });
    };

    const resetForm = () => {
        form.resetFields();
        setResult('');
    };

    const getResultText = () => {
        if (result <= 0) return '';

        let mortalityRate;
        if (result > 4) {
            mortalityRate = 90;
        } else if (result > 3) {
            mortalityRate = 80;
        } else if (result > 2) {
            mortalityRate = 50;
        } else if (result > 1) {
            mortalityRate = 40;
        } else if (result > 0) {
            mortalityRate = 30;
        }

        return result === 1 || result === 2
            ? `Agar anevrizma aniqlansa, darhol jarrohlik davolash mumkin. Jarrohlik o'lim xavfi - ${mortalityRate}%. Hayot uchun xavfli gematoma Hunt-Hess shkalasi bo'yicha istalgan darajada darhol operatsiya qilinadi.`
            : `Agar anevrizma aniqlansa, shkala bo'yicha 2 yoki 1 ballga erishilgunga qadar konservativ davo amalga oshiriladi. Jarrohlik o'lim xavfi - ${mortalityRate}%. Hayot uchun xavfli gematoma Hunt-Hess shkalasi bo'yicha istalgan darajada darhol operatsiya qilinadi.`;
    };

    return (
        <div className="calculator-container">
            <h2>Hant-Hess Shkalasi Bo'yicha Baholash</h2>
            <Form form={form} onValuesChange={onValuesChange} layout="vertical">
                <Item
                    label="Kriteriyalar"
                    name="condition"
                    rules={[{ required: true, message: 'Iltimos, kriteriyani tanlang!' }]}
                >
                    <Radio.Group>
                        <Radio value="1">
                            Simptomlar yo'q, ehtimol yengil bosh og'rig'i yoki bo'yin mushaklari qattiqligi (1 ball)
                        </Radio>
                        <Radio value="2">
                            O'rtacha yoki yengil bosh og'rig'i; meningial sindrom; fokal nevrologik simptomlar yo'q, faqat ko'z harakati nervlari ta'sirlangan (2 ball)
                        </Radio>
                        <Radio value="3">
                            Meningial sindrom; hushyorlikning buzilishi; o'rtacha fokal simptomatika (3 ball)
                        </Radio>
                        <Radio value="4">
                            Meningial sindrom; hushyorlikning buzilishi; fokal simptomatika aniq; hayotiy funksiyalarning buzilishi (4 ball)
                        </Radio>
                        <Radio value="5">
                            Komatöz holat; akineto-mutik holat, dekerebratsion rigidlik (5 ball)
                        </Radio>
                    </Radio.Group>
                </Item>

                <Item name="additional" valuePropName="checked">
                    <Checkbox>
                        Arterial gipertenziya, diabet, ateroskleroz, XOBL yoki angiografiyada vazospazm mavjud (qo'shimcha 1 ball)
                    </Checkbox>
                </Item>

                <Item>
                    <label>Natija: </label>
                    <TextArea
                        value={getResultText()}
                        readOnly
                        autoSize={{
                            minRows: 3,
                            maxRows: 5,
                        }}
                    />
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

export default HuntHessScale;
