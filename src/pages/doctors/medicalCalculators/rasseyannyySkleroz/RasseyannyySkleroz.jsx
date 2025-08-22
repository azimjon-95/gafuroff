import React, { useState } from "react";
import { Radio, Form } from 'antd';
const { Item } = Form;

function RasseyannyySkleroz() {
    const [res, setResult] = useState(0);
    const [form] = Form.useForm();

    const calculateEDSS = (values) => {
        const {
            visual = 0,
            brainstem = 0,
            pyramidal = 0,
            cerebellar = 0,
            sensory = 0,
            bladder = 0,
            cerebral = 0,
            ambulation = 0
        } = values || {};

        const total = [
            visual,
            brainstem,
            pyramidal,
            cerebellar,
            sensory,
            bladder,
            cerebral,
            ambulation
        ].reduce((acc, val) => acc + parseInt(val || 0, 10), 0);

        setResult(total);
    };

    return (
        <div className="calculator-container">
            <h2>EDSS Kalkulyator</h2>

            <Form
                layout="vertical"
                form={form}
                initialValues={{ visual: [] }}
                onValuesChange={calculateEDSS}

            >
                <b style={{ fontSize: "14px", color: 'gray' }}>Kengaytirilgan Kurtzke nogironlik shkalasi (EDSS) ko'p sklerozda nogironlikni aniqlash uchun ishlatiladi. EDSS ilgari nogironlik bo'yicha nogironlik shkalasini almashtirdi, u ko'p sklerozli bemorlarni quyi toifalarga ajratish uchun ishlatilgan.</b>
                <Item label="Ko'rish funktsiyasi" name="visual">
                    <Radio.Group>
                        <Radio value={0}>Norma <i className="ball"><b>0</b> ball</i></Radio><br />
                        <Radio value={1}>Blednost diska va/yo kichik skotoma va/yo ko'rish o'tkirligi 20/20 dan past (1,0), lekin 20/30 dan yuqori (0,67) <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value={2}>Kattaroq skotoma yoki maksimal ko'rish o'tkirligi 20/30 dan 20/59 gacha (0,67-0,34) <i className="ball"><b>2</b> ball </i></Radio><br />
                        <Radio value={3}>Kattaroq skotoma yoki o'rtacha ko'rish maydoni torayishi yoki maksimal ko'rish o'tkirligi 20/60 dan 20/99 gacha (0,33-0,2) <i className="ball"><b>3</b> ball</i></Radio><br />
                        <Radio value={4}>Yuqorida ko'rsatilganlarga qo'shimcha ravishda eng yaxshi ko'radigan ko'zingiz 20/60 dan yuqori emas (0,3) <i className="ball"><b>4</b> ball</i></Radio><br />
                        <Radio value={5}>Yuqorida ko'rsatilganlarga qo'shimcha ravishda eng yaxshi ko'radigan ko'zingiz 20/60 dan yuqori emas (0,3) <i className="ball"><b>5</b> ball</i></Radio><br />
                        <Radio value={6}>Eng yaxshi ko'radigan ko'zingiz 20/60 dan yuqori emas (0,3) <i className="ball"><b>6</b> ball</i></Radio><br />
                    </Radio.Group>
                </Item>
                <Item label="Shtov funktsiyasi" name="brainstem">
                    <Radio.Group>
                        <Radio value={0}>Norma <i className="ball"><b>0</b> ball</i></Radio><br />
                        <Radio value={1}>Faqat belgilar <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value={2}>O'rtacha nistagm yoki boshqa yengil buzilishlar <i className="ball"><b>2</b> ball</i></Radio><br />
                        <Radio value={3}>Aniq nistagm yoki oskiloskopiya yoki aniq ko'z harakatlari zaifligi yoki boshqa o'rtacha buzilishlar <i className="ball"><b>3</b> ball</i></Radio><br />
                        <Radio value={4}>Aniq disartriya yoki boshqa aniq buzilishlar <i className="ball"><b>4</b> ball</i></Radio><br />
                        <Radio value={5}>Gapira yoki yuta olmaydi <i className="ball"><b>5</b> ball</i></Radio><br />
                    </Radio.Group>
                </Item><br />

                <Item label="Piramidal funktsiya" name="pyramidal">
                    <Radio.Group>
                        <Radio value={0}>Norma <i className="ball"><b>0</b> ball</i></Radio><br />
                        <Radio value={1}>Alomatlar lekin nogironlik yo'q <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value={2}>Minimal nogironlik: bemor yurishda charchaganlikni bildiradi va/yoki bitta yoki ikkita mushak guruhida IV daraja buzilish <i className="ball"><b>2</b> ball</i></Radio><br />
                        <Radio value={3}>O'rtacha yoki yengil paraparez yoki gemiparez yoki bir yoki ikkita mushakda III daraja buzilish <i className="ball"><b>3</b> ball</i></Radio><br />
                        <Radio value={4}>Ikki oyoqda og'ir paraparez yoki gemiparez yoki uch yoki to'rtta a'zoda o'rtacha tetraparez <i className="ball"><b>4</b> ball</i></Radio><br />
                        <Radio value={5}>Ikki oyoqda paraplegiya yoki bir a'zoda monoplegiya yoki uch yoki to'rtta a'zoda og'ir tetraparez <i className="ball"><b>5</b> ball</i></Radio><br />
                        <Radio value={6}>Barcha a'zolarda tetraplegiya <i className="ball"><b>6</b> ball</i></Radio><br />
                    </Radio.Group>
                </Item><br />

                <Item label="Mo'jachek funktsiyasi" name="cerebellar">
                    <Radio.Group>
                        <Radio value={0}>Norma <i className="ball"><b>0</b> ball</i></Radio><br />
                        <Radio value={1}>Nogironliksiz alomatlar <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value={2}>Yengil ataksiya <i className="ball"><b>2</b> ball</i></Radio><br />
                        <Radio value={3}>O'rtacha tanadagi ataksiya yoki a'zolardagi ataksiya yoki yurishda o'rtacha yoki aniq ataksiya <i className="ball"><b>3</b> ball</i></Radio><br />
                        <Radio value={4}>Barcha a'zolardagi yoki tanadagi aniq ataksiya <i className="ball"><b>4</b> ball</i></Radio><br />
                        <Radio value={5}>Ataksiya tufayli koordinatsiyalangan harakatlarni bajara olmaydi <i className="ball"><b>5</b> ball</i></Radio><br />
                    </Radio.Group>
                </Item><br />

                <Item label="Sensorni hissiyot funksiyasi" name="sensory">
                    <Radio.Group>
                        <Radio value={0}>Norma <i className="ball"><b>0</b> ball</i></Radio><br />
                        <Radio value={1}>Yalqov yetishmaydigan hissiyotlar faqat biror bir yoki ikkita qo'zida (vibratsion, ikkiraumli yoki haroratni sezish) <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value={2}>Biror bir yoki ikkita qo'zida taxtalam, og'riq, kasalliklar yoki bir yoki ikkita qo'zida vibratsiyon hissiyotining ortiqcha kamayishi <i className="ball"><b>2</b> ball</i></Radio><br />
                        <Radio value={3}>Biror bir yoki ikkita qo'zida taxtalam, og'riq, kasalliklar, va ya qo'zining hamma qismidagi vibratsiyon hissiyotining tezda yo'qolishi <i className="ball"><b>3</b> ball</i></Radio><br />
                        <Radio value={4}>Biror bir yoki ikkita qo'zida taxtalam, og'riq, kasalliklar, yoki proprioqsepsiyani kamaytirib yoki birlashgan holatda kuchli hissiyot yo'qligi <i className="ball"><b>4</b> ball</i></Radio><br />
                        <Radio value={5}>Biror bir yoki ikkita qo'zida hissiyotning (tezda to'la) yo'qligi yoki ostida tasir qilingan tarkibiy hissiyotlarning (taxtalam yoki og'riq) kamayishi <i className="ball"><b>5</b> ball</i></Radio><br />
                        <Radio value={6}>Hissiyotning past ko'pligi ostida yoki ostida to'la ravishda yo'qolishi (qo'zingizda yoki qo'zingiz ostida hissiyot yo'qligi) <i className="ball"><b>6</b> ball</i></Radio><br />
                    </Radio.Group>
                </Item><br />

                <Item label="Tazoq funktsiyasi" name="bladder">
                    <Radio.Group>
                        <Radio value={0}>Norma <i className="ball"><b>0</b> ball</i></Radio><br />
                        <Radio value={1}>Miqdori o'rtacha, ishoralar (qon yoki og'izdan) va/yoki to'siqni kechiktirishda ishoralar mavjud <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value={2}>Miqdori o'rtacha, ishoralar (qon yoki og'izdan) va/yoki to'siqni kechiktirishda ishoralar mavjud, va ya ishoni boshlashda yoki to'siq kechiktirishda ishora yo'qolishi <i className="ball"><b>2</b> ball</i></Radio><br />
                        <Radio value={3}>Chastaya idrorni to'xtatish va o'zaro bog'langan olib tashlash kerak bo'lgan klinik va ruhaviy tibbiyotlar mavjud <i className="ball"><b>3</b> ball</i></Radio><br />
                        <Radio value={4}>So'g'liqni saqlash uchun pasttali kateterizatsiya zarurati mavjud <i className="ball"><b>4</b> ball</i></Radio><br />
                        <Radio value={5}>Urinish va yoki to'siqni kechiktirishda ishoralar, xarakatni boshlashda, va yoki so'nggi o'sha faoliyatda, to'siqni kechiktirish jarayonida ishora yo'qolishi <i className="ball"><b>5</b> ball</i></Radio><br />
                        <Radio value={6}>Og'ir kasallik va tazoq funktsiyasining yo'qolishi <i className="ball"><b>6</b> ball</i></Radio><br />
                    </Radio.Group>
                </Item><br />

                <Item label="Mozgov funktsiyasi" name="cerebral">
                    <Radio.Group>
                        <Radio value={0}>Norma <i className="ball"><b>0</b> ball</i></Radio><br />
                        <Radio value={1}>Faqat ruh holatlar (EDSS balliga ta'sir qilmaydi) / kichik charchaganlik; faqat intellekt pasayishi belgilari <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value={2}>Kichik intellektning pasayishi/umuman yoki o'zgina charchaganlik <i className="ball"><b>2</b> ball</i></Radio><br />
                        <Radio value={3}>O'rtacha intellektning pasayishi <i className="ball"><b>3</b> ball</i></Radio><br />
                        <Radio value={4}>Aybiy intellektning pasayishi <i className="ball"><b>4</b> ball</i></Radio><br />
                        <Radio value={5}>Dementsiya <i className="ball"><b>5</b> ball</i></Radio><br />
                    </Radio.Group>
                </Item><br />

                <Item label="Ambulatsiya" name="ambulation">
                    <Radio.Group>
                        <Radio value={0}>O'zaro qurilmaning harakati cheklanmagan <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value={1}>To'liq shaxsiy harakat <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value={2}>≥ 300 metr, lekin &lt; 500 metr, yordam va qo'llab-quvvat o'rtasida (EDSS 4,5 yoki 5,0) <i className="ball"><b>2</b> ball</i></Radio><br />
                        <Radio value={3}>≥ 200 metr, lekin &lt; 300 metr, yordam va qo'llab-quvvat o'rtasida (EDSS 5,0) <i className="ball"><b>3</b> ball</i></Radio><br />
                        <Radio value={4}>≥ 100 metr, lekin &lt; 200 metr, yordam va qo'llab-quvvat o'rtasida (EDSS 5,5) <i className="ball"><b>4</b> ball</i></Radio><br />
                        <Radio value={5}>&lt; 100 metr harakat qilish qo'llab-quvvatsiz (EDSS 6,0) <i className="ball"><b>5</b> ball</i></Radio><br />
                        <Radio value={6}>Yonbosh qo'llab-quvvat, ≥ 50 metr (EDSS 6,0) <i className="ball"><b>6</b> ball</i></Radio><br />
                        <Radio value={7}>Ikki tomonlama qo'llab-quvvat, ≥ 120 metr (EDSS 6,0) <i className="ball"><b>7</b> ball</i></Radio><br />
                        <Radio value={8}>Yonbosh qo'llab-quvvat, &lt; 50 metr (EDSS 6,5) <i className="ball"><b>8</b> ball</i></Radio><br />
                        <Radio value={9}>Ikki tomonlama qo'llab-quvvat, ≥ 5 metr, lekin &lt; 120 metr (EDSS 6,5) <i className="ball"><b>9</b> ball</i></Radio><br />
                        <Radio value={10}>Hatto 5 metrdan ham yurish quvvati yo'q; o'z yo'li bilan harakatlanish uchun invalidlar kiyimida bog'langan; yordam talab qilinmaydi; kun davomida invalidlar kiyimida harakatlanish faoliyati 12 soat (EDSS 7,0) <i className="ball"><b>10</b> ball</i></Radio><br />
                        <Radio value={11}>Faqat bir nechta qadam bosha bo'lishi mumkin; faqat invalidlar kiyimida harakatlanish mumkin; harakatlanishda yordam talab qilinadi; kun davomida invalidlar kiyimida bo'lishi mumkin emas (EDSS 7,5) <i className="ball"><b>11</b> ball</i></Radio><br />
                        <Radio value={12}>Ustiga bog'langan yoki stulga bog'langan yoki invalidlar kiyimida harakatlanadi; kun davomida bog'ida bo'lishi mumkin; asosiy o'zini xizmat qilish funksiyalari saqlangan; qo'l bilan faol foydalanadi (EDSS 8,0) <i className="ball"><b>12</b> ball</i></Radio><br />
                        <Radio value={13}>Kun davomida krovatga bog'langan; qisqacha qo'llash mumkin; o'zini xizmat qilish qismlanishda saqlangan (EDSS 8,5) <i className="ball"><b>13</b> ball</i></Radio><br />
                        <Radio value={14}>Kasalga bog'langan, bechora; aloqaga kirish va ovqatlanish mumkin (EDSS 9,0) <i className="ball"><b>14</b> ball</i></Radio><br />
                        <Radio value={15}>To'liq kasalga, bechora; aloqaga kirish yoki ovqatlanish imkoniyati yo'q (EDSS 9,5) <i className="ball"><b>15</b> ball</i></Radio><br />
                    </Radio.Group>
                </Item>
                <h2>Jami EDSS balli: {res}</h2>
                {res >= 2.0 ? <div><h2>2-guruh: {res}</h2></div> : <div><h2>1-guruh: {res}</h2></div>}

            </Form>
        </div >
    )
}

export default RasseyannyySkleroz;
