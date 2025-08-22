import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';

const { Item } = Form;

const HemorrhageVolumeCalculator = () => {
    const [result, setResult] = useState('');
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const { largestDiameter, diameter90, sliceCount } = values;

        // Calculate the volume of intracerebral hemorrhage
        const volume = (largestDiameter * diameter90 * sliceCount * 0.52).toFixed(2);

        setResult(`${volume} cm³`);
        notification.success({
            message: 'Natija',
            description: `Sizning ichki parenximatoz qon ketishi hajmi: ${volume} cm³`,
        });
    };

    const resetForm = () => {
        form.resetFields();
        setResult('');
    };

    return (
        <div className="calculator-container">
            <h2>Ichki Parenximatoz Qon Ketishi Hajmini Hisoblash</h2>
            <p style={{ fontSize: "14px", color: "gray" }}>Ushbu kalkulyator intraparenximal qon ketish hajmini hisoblash uchun ishlatilishi mumkin.</p>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Item label="Katta diametr (sm)" name="largestDiameter" rules={[{ required: true, message: 'Iltimos, katta diametrni kiriting!' }]}>
                    <Input type="number" suffix="sm" />
                </Item>

                <Item label="90° ga katta diametr (sm)" name="diameter90" rules={[{ required: true, message: 'Iltimos, 90° ga katta diametrni kiriting!' }]}>
                    <Input type="number" suffix="sm" />
                </Item>

                <Item label="Kesmaning soni (10 mm)" name="sliceCount" rules={[{ required: true, message: 'Iltimos, kesmaning sonini kiriting!' }]}>
                    <Input type="number" suffix="kesmalar" />
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
        </div>
    );
};


export default HemorrhageVolumeCalculator;
