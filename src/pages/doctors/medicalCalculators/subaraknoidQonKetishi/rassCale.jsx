import React, { useState } from 'react';
import { Form, Button, Radio, Typography } from 'antd';

const { Item } = Form;
const { Text } = Typography;

const RASSScale = () => {
    const [result, setResult] = useState(null);
    const [form] = Form.useForm();

    const onValuesChange = (_, allValues) => {
        const { rass } = allValues;
        setResult(rass);
    };

    const resetForm = () => {
        form.resetFields();
        setResult('');
    };

    const getResultText = () => {
        switch (result) {
            case '4':
                return " Bemor tajovuzkor, jangari, tibbiyot xodimlariga darhol xavf tug'diradi (Baholash: +4)";
            case '3':
                return " Trubkalar va kateterlarni tortadi yoki chiqaradi yoki tibbiyot xodimlariga tajovuzkor munosabatda bo'ladi (Baholash: +3)";
            case '2':
                return " Tez-tez maqsadsiz harakatlar va/yoki IVL apparati bilan desinxronizatsiya (Baholash: +2)";
            case '1':
                return " Bezovta, lekin harakatlar energiyali emas va tajovuzkor emas (Baholash: +1)";
            case '0':
                return " Hushyor, tinch, diqqatli (Baholash: 0)";
            case '-1':
                return " Diqqatni yo'qotish, lekin so'zli aloqa qilganda ko'zlarini 10 soniyadan ko'proq yummaydi (Baholash: -1)";
            case '-2':
                return " So'zli aloqa qilganda ko'zlarini 10 soniyadan kamroq vaqt ichida yumadi (Baholash: -2)";
            case '-3':
                return " So'zga javoban har qanday harakat (lekin ko'z bilan aloqa yo'q) (Baholash: -3)";
            case '-4':
                return " So'zga hech qanday reaksiya yo'q, lekin jismoniy stimulyatsiyaga biron bir harakat (Baholash: -4)";
            case '-5':
                return " So'z va jismoniy stimulyatsiyaga hech qanday reaksiya yo'q (Baholash: -5)";
            default:
                return " Iltimos, bahoni tanlang";
        }
    };

    return (
        <div className="calculator-container">
            <h2>RASS (Richmond Agitation-Sedation Scale) Shkalasi Bo'yicha Baholash</h2>
            <b style={{ fontSize: "14px", color: "gray" }}>RASS shkalasi (Richmond Agitation-Sedation Scale) anesteziologiya, reanimatsiya va intensiv terapiya bo'limida bemorning tajovuzkorlik darajasini yoki sedasyon chuqurligi darajasini tavsiflash uchun qo'llaniladi.</b>
            <Form form={form} onValuesChange={onValuesChange} layout="vertical">
                <Item
                    label="Baholash"
                    name="rass"
                    rules={[{ required: true, message: 'Iltimos, bahoni tanlang!' }]}
                >
                    <Radio.Group>
                        <Radio value="4">Bemor tajovuzkor, jangari, tibbiyot xodimlariga darhol xavf tug'diradi (Baholash: +4)</Radio>
                        <Radio value="3">Trubkalar va kateterlarni tortadi yoki chiqaradi yoki tibbiyot xodimlariga tajovuzkor munosabatda bo'ladi (Baholash: +3)</Radio>
                        <Radio value="2">Tez-tez maqsadsiz harakatlar va/yoki IVL apparati bilan desinxronizatsiya (Baholash: +2)</Radio>
                        <Radio value="1">Bezovta, lekin harakatlar energiyali emas va tajovuzkor emas (Baholash: +1)</Radio>
                        <Radio value="0">Hushyor, tinch, diqqatli (Baholash: 0)</Radio>
                        <Radio value="-1">Diqqatni yo'qotish, lekin so'zli aloqa qilganda ko'zlarini 10 soniyadan ko'proq yummaydi (Baholash: -1)</Radio>
                        <Radio value="-2">So'zli aloqa qilganda ko'zlarini 10 soniyadan kamroq vaqt ichida yumadi (Baholash: -2)</Radio>
                        <Radio value="-3">So'zga javoban har qanday harakat (lekin ko'z bilan aloqa yo'q) (Baholash: -3)</Radio>
                        <Radio value="-4">So'zga hech qanday reaksiya yo'q, lekin jismoniy stimulyatsiyaga biron bir harakat (Baholash: -4)</Radio>
                        <Radio value="-5">So'z va jismoniy stimulyatsiyaga hech qanday reaksiya yo'q (Baholash: -5)</Radio>
                    </Radio.Group>
                </Item>

                <Item>
                    <label style={{ fontSize: "14px", color: "#3e3e3e", fontWeight: 600 }}>Natija: </label>
                    <Text>{getResultText()}</Text>
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

export default RASSScale;
