import React, { useState } from 'react';
import { Form, Input, Button, Radio, notification } from 'antd';

const { Item } = Form;

const FunctionalIndependenceForm = () => {
    const [result, setResult] = useState('');
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const { volume, age, location, gcs, cognitive } = values;
        let score = 0;

        // Calculate score based on volume
        if (volume === 'less30') score += 4;
        else if (volume === 'between30and60') score += 2;

        // Calculate score based on age
        if (age === 'less70') score += 2;
        else if (age === 'between70and79') score += 1;

        // Calculate score based on location
        if (location === 'frontal') score += 2;
        else if (location === 'parietal') score += 1;

        // Calculate score based on GCS
        if (gcs === '9orMore') score += 2;

        // Calculate score based on cognitive status
        if (cognitive === 'no') score += 1;

        let outcome = '';
        if (score >= 11) {
            outcome = 'Funktsional mustaqillikka erishish ehtimoli yuqori';
        } else if (score <= 4) {
            outcome = 'Funktsional mustaqillikka erishish ehtimoli past';
        } else {
            outcome = 'Funktsional mustaqillikka erishish ehtimoli o\'rtacha';
        }

        setResult(outcome);
        notification.success({
            message: 'Natija',
            description: `Sizning 90 kundan keyin funktsional mustaqillikka erishish ehtimolingiz: ${outcome}`,
        });
    };

    const resetForm = () => {
        form.resetFields();
        setResult('');
    };

    return (
        <div className="calculator-container">
            <h2>Ichki miya qon ketishdan keyin funktsional mustaqillikni baholash</h2>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Item label="Ichki miya qon ketishi hajmi" name="volume" rules={[{ required: true, message: 'Iltimos, hajmni tanlang!' }]}>
                    <Radio.Group>
                        <Radio value="less30">Kamroq 30 cm³ (4 ball)</Radio><br />
                        <Radio value="between30and60">30-60 cm³ (2 ball)</Radio><br />
                        <Radio value="more60">Ko'proq 60 cm³ (0 ball)</Radio>
                    </Radio.Group>
                </Item>

                <Item label="Yosh" name="age" rules={[{ required: true, message: 'Iltimos, yoshni tanlang!' }]}>
                    <Radio.Group>
                        <Radio value="less70">Kamroq 70 yil (2 ball)</Radio><br />
                        <Radio value="between70and79">70-79 yil (1 ball)</Radio><br />
                        <Radio value="more80">Ko'proq 80 yil (0 ball)</Radio>
                    </Radio.Group>
                </Item>

                <Item label="Ichki miya qon ketishi joylashuvi" name="location" rules={[{ required: true, message: 'Iltimos, joylashuvni tanlang!' }]}>
                    <Radio.Group>
                        <Radio value="frontal">Lob frontal (2 ball)</Radio><br />
                        <Radio value="parietal">Temporal lob (1 ball)</Radio><br />
                        <Radio value="occipital">Occipital lob (0 ball)</Radio>
                    </Radio.Group>
                </Item>

                <Item label="GCS bahosi" name="gcs" rules={[{ required: true, message: 'Iltimos, GCS bahosini tanlang!' }]}>
                    <Radio.Group>
                        <Radio value="9orMore">9 yoki undan ko'p (2 ball)</Radio><br />
                        <Radio value="less9">Kamroq 9 (0 ball)</Radio>
                    </Radio.Group>
                </Item>

                <Item label="Ichki miya qon ketishidan oldin kognitiv buzilishlar" name="cognitive" rules={[{ required: true, message: 'Iltimos, kognitiv buzilishlar holatini tanlang!' }]}>
                    <Radio.Group>
                        <Radio value="no">Yo'q (1 ball)</Radio><br />
                        <Radio value="yes">Ha (0 ball)</Radio>
                    </Radio.Group>
                </Item>

                <Item>
                    <label>Natija: </label>
                    <Input value={result} readOnly />
                </Item>

                <Item>
                    <Button type="primary" htmlType="submit">Hisoblash</Button>
                    <Button type="default" onClick={resetForm} style={{ marginLeft: '10px' }}>Tozalash</Button>
                </Item>
            </Form>
        </div>
    );
};


export default FunctionalIndependenceForm;
