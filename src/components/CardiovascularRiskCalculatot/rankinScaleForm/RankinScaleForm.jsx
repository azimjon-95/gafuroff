import React, { useState } from 'react';
import { Form, Button, Radio, Input, notification } from 'antd';

const { Item } = Form;

const RankinScaleForm = () => {
    const [result, setResult] = useState('');
    const [score, setScore] = useState(null);

    const onFinish = () => {
        let interpretation = '';

        switch (score) {
            case 0:
                interpretation = 'Simptomlar mavjud emas';
                break;
            case 1:
                interpretation = 'Nizomni buzganmagan bo\'lib, ba\'zi simptomlar mavjud';
                break;
            case 2:
                interpretation = 'Yengil natijalar: Biror vazifani bajarolmay qolish, ammo o\'z ishlarini o\'zining tushunishida';
                break;
            case 3:
                interpretation = 'O\'rtacha natijalar: Bir qismini qo\'llab-quvvatlash zarur, ammo yordamsiz yurish mumkin';
                break;
            case 4:
                interpretation = 'Kuchli natijalar: Yordamsiz yurish mumkin emas, shaxsiy talablarni o\'z o\'ziga qo\'llash mumkin emas';
                break;
            case 5:
                interpretation = 'Qiyin natijalar: Ustunlikka bog\'liq, piyodalar bilan bog\'langan, qorin va o\'tqa saqlash zarur, doimiy yordam va qarshilik talab etiladi';
                break;
            default:
                interpretation = 'Noma\'lum natija';
                break;
        }

        setResult(interpretation);
        notification.success({
            message: 'Natija',
            description: `Natija: ${interpretation}`,
        });
    };

    const handleRadioChange = (e) => {
        const selectedScore = parseInt(e.target.value);
        setScore(selectedScore);
    };
    const resetForm = () => {
        setResult('');
        setScore(null);
    }
    return (
        <div className="calculator-container">
            <h2>Rankin shkalasi</h2>
            <b style={{ fontSize: "14px", color: "grey" }}>Rankin shkalasi insultdan keyingi nogironlik darajasini baholaydi va insultdan keyin nogironlikning besh darajasini o'z ichiga oladi.</b>
            <Form onFinish={onFinish} layout="vertical">
                <Item>
                    <Radio.Group onChange={handleRadioChange} value={score}>
                        <Radio value={0}>Simptomlar mavjud emas (0 ball)</Radio>
                        <Radio value={1}>
                            Nizomni buzganmagan bo'lib, ba'zi simptomlar mavjud: barcha kundalik vazifalarni bajara oladi (1 ball)
                        </Radio>
                        <Radio value={2}>
                            Yengil natijalar: Ba'zi eski vazifalarni bajara olmaydi, lekin o'z ishlarini mustaqil bajaradi (2 ball)
                        </Radio>
                        <Radio value={3}>
                            O'rtacha natijalar: Ba'zi yordam zarur, lekin mustaqil yuradi (3 ball)
                        </Radio>
                        <Radio value={4}>
                            Kuchli natijalar: Yordam bilan yuradi, o'z ehtiyojlarini mustaqil bajara olmaydi (4 ball)
                        </Radio>
                        <Radio value={5}>
                            Qiyin natijalar: To'shakka mixlangan, peshob va axlatni ushlab tura olmaydi, doimiy yordam zarur (5 ball)
                        </Radio>
                    </Radio.Group>
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


export default RankinScaleForm;
