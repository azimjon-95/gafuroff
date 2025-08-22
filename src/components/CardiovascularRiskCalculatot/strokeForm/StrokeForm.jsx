import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import './style.css';

const { Item } = Form;

const StrokeForm = () => {
    const [vazn, setVazn] = useState('');
    const [doza, setDoza] = useState(0);

    const dozaniHisoblash = () => {
        const hisoblanganDoza = Math.min(0.9 * parseFloat(vazn), 90);
        setDoza(hisoblanganDoza);

    };

    const tugatish = (values) => {
        dozaniHisoblash();
    };
    // Formani tozalash funksiyasi
    const resetForm = () => {
        setVazn('')
        setDoza(0)
    };

    return (
        <div className="calculator-container">
            <h2>T-PA Dozasini Hisoblash</h2>

            <Form onFinish={tugatish} layout="vertical">
                <Item label="Vazn (kg):" name="vazn" rules={[{ required: true, message: 'Iltimos, vazningizni kiriting!' }]}>
                    <Input type="number" value={vazn} onChange={(e) => setVazn(e.target.value)} />
                </Item>
                <Form.Item>
                    <label>t-PA dozasi: </label>
                    <Input
                        value={doza + " mg"}
                        readOnly
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Hisoblash</Button>
                    <Button type="default" onClick={resetForm} style={{ marginLeft: '10px' }}>Tozalash</Button>
                </Form.Item>

            </Form>
            <div className="container_TextInfo">
                <p>T-PA dozasi 0,9 mg/kg sifatida hisoblanadi. Maksimal doza 90 mg. Flakon 100 mg t-PA saqlaydi va shuning uchun doza ortiqcha — (hisoblangan doza).</p>

                <h3>Ko'rsatmalar</h3>
                <ul>
                    <li>Yoshi &gt;; 18 yil.</li>
                    <li>Kutilyapti, bu sezilarli nevrologik nuqson uzoq muddatli nogironlikka olib keladi.</li>
                    <li>Kontrast bo'lmagan kompyuter tomografiyasi, qon ketishini yoki yangidan shakllangan infarkt o'choqlarini ko'rsatmaydi.</li>
                    <li>Ishemik insultning o'tkir simptomlari aniq belgilanadi, t-PA kiritilishidan 3 soatdan kam bo'ladi (terapevtik oynada 3-4,5 soat ichida).</li>
                </ul>

                <h3>Qarshi ko'rsatmalar</h3>
                <ul>
                    <li>Sistolik AD &gt; 185 mm rt. st. yoki diastolik AD &gt; 110 mm rt. st. (meditsina aralashuvisiz pasaytirish mumkin bo'lmagan).</li>
                    <li>Tutqanoq kiritilganidan so'ng (t-PA kiritishni ko'rib chiqish mumkin, agar qon tomir okklyuziya KT-angiografiya orqali aniqlansa).</li>
                    <li>Oxirgi operatsiyalar/travmalar (15 kundan kam).</li>
                    <li>Yaqinda orqa miya yoki umurtqa pog'onasi jarrohligi, bosh jarohati yoki insult (3 oydan kam).</li>
                    <li>Tarixda intrakraniyal qon ketish, anevrizma, arteriovenoz malformatsiya yoki yangi o'sma.</li>
                    <li>Faol ichki qon ketish (22 kundan kam).</li>
                    <li>Trombositlar soni 100,000 dan kam, aktivatsiyalangan qisman tromboplastin vaqti 40 sekunddan ko'proq, geporin kiritish vaqti &gt; 15 yoki INR &gt; 1,7, ma'lum koagulopatiyalar.</li>
                    <li>Subaraknoid qon ketishiga shubha.</li>
                    <li>KT da bosh miya qon ketishini, subaraknoid qon ketishini yoki o'tkir infarktning 1/3 qismidan ko'proq qismi mavjudligi.</li>
                </ul>

                <h3>Ogohlantirish</h3>
                <ul>
                    <li>Glyukoza darajasi &gt; 50 mg/dl yoki &gt; 400 mg/dl.</li>
                    <li>Yuqori qon ketish xavfi bakterial endokardit yoki INO 1,7 dan yuqori bo'lgan bemorlarda sodir bo'lishi mumkin.</li>
                    <li>Minimal nevrologik nuqsoni va tez qaytishi bo'lgan bemorlarga kiritish xavfi foydasidan ko'proq bo'lishi mumkin.</li>
                </ul>

                <h3>Qo'shimcha ogohlantirishlar</h3>
                <ul>
                    <li>Yoshi &gt; 80 yil.</li>
                    <li>Diabet va insult tarixi.</li>
                    <li>Har qanday darajada antikoagulyantlarni qabul qilish.</li>
                    <li>NIHSS &gt; 25.</li>
                </ul>
            </div>
        </div>

    );
};



export default StrokeForm;






