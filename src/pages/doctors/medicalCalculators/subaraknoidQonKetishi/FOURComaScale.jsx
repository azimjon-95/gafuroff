import React, { useState } from "react";
import { Form, Radio, Button, notification, Typography } from "antd";

const { Item } = Form;
const { Text } = Typography;

const FOURComaScale = () => {
  const [result, setResult] = useState(0);
  const [form] = Form.useForm();

  const onValuesChange = (_, allValues) => {
    const { eye, motor, brainstem, respiration } = allValues;

    const totalScore =
      (parseInt(eye, 10) || 0) +
      (parseInt(motor, 10) || 0) +
      (parseInt(brainstem, 10) || 0) +
      (parseInt(respiration, 10) || 0);

    setResult(totalScore);

    notification.success({
      message: "Natija",
      description: `Sizning FOUR koma shkalasi bo'yicha umumiy bahoyingiz: ${totalScore}`,
    });
  };

  const getResultText = () => {
    if (result === 0) {
      return " 0. Smer bir marta ko'rilgan";
    } else if (result <= 4) {
      return `Sizning FOUR koma shkalasi bo'yicha bahoyingiz: ${result}. Yomon prognoz`;
    } else if (result <= 8) {
      return `Sizning FOUR koma shkalasi bo'yicha bahoyingiz: ${result}. O'rtacha prognoz`;
    } else if (result <= 12) {
      return `Sizning FOUR koma shkalasi bo'yicha bahoyingiz: ${result}. Yaxshi prognoz`;
    } else {
      return `Sizning FOUR koma shkalasi bo'yicha bahoyingiz: ${result}. Juda yaxshi prognoz`;
    }
  };
  const resetForm = () => {
    form.resetFields();
    setResult("");
  };
  return (
    <div className="calculator-container">
      <h2>FOUR Koma Shkalasi Bo'yicha Baholash</h2>
      <b style={{ fontSize: "14px", color: "gray" }}>
        TO'RT (Javob bermaslikning to'liq konturi) koma shkalasi Glazgo koma
        shkalasiga nisbatan afzalliklarga ega, xususan: u nevrologik holatni
        aniqroq tafsilotlaydi, qulflangan sindromni taniydi, miya sopi
        reflekslarini baholaydi, nafas olish tartibini baholaydi va miyaning
        turli bosqichlarini aniqlaydi. dislokatsiya (churrasi). <br />
        <br />
        FOUR koma shkalasi, shuningdek, Glasgow koma shkalasi darajasi past
        bo'lgan bemorlarning prognozi haqida qo'shimcha ma'lumot beradi.
        Kasalxonada o'lim ehtimoli eng past FOUR balli bo'lgan bemorlarda Glazgo
        koma shkalasi bo'yicha eng past ballga ega bo'lgan bemorlarga qaraganda
        yuqori. TO'RT Koma shkalasi ularning har biri uchun maksimal ball "4"
        bo'lgan 4 ta parametrni o'z ichiga oladi: ko'z reaktsiyalari (ko'zni
        ochish va kuzatish), vosita reaktsiyalari (og'riqqa javob berish va
        oddiy buyruqlarni bajarish), miya sopi reflekslari (ko'z qorachig'i,
        shox parda va yo'tal). ) va nafas olish shakllari (nafas olish ritmi va
        ventilyatordagi bemorlarda nafas olish urinishlari). TO'RT Koma shkalasi
        Mayo Shifoxonasida ishlab chiqilgan va 2005 yilda E. F. Wijdics va uning
        hamkasblari tomonidan kiritilgan. Ko'pgina tadqiqotlar neyrokritik
        parvarish sharoitida ushbu o'lchovning haqiqiyligini tasdiqladi.
      </b>
      <Form form={form} onValuesChange={onValuesChange} layout="vertical">
        <Item
          label="Ko'z reaktsiyalari (E)"
          name="eye"
          rules={[{ required: true, message: "Iltimos, birini tanlang!" }]}
        >
          <Radio.Group>
            <Radio value="4">
              Ko'zlar ochiq, kuzatadi va buyruqlarni bajaradi (4 ball)
            </Radio>
            <Radio value="3">Ko'zlar ochiq, kuzatmaydi (3 ball)</Radio>
            <Radio value="2">
              Ko'zlar yopiqligi, tovushga ochiladi, kuzatmaydi (2 ball)
            </Radio>
            <Radio value="1">
              Ko'zlar yopiqligi, og'riqqa ochiladi (1 ball)
            </Radio>
            <Radio value="0">
              Ko'zlar yopiqligi, og'riqqa ochilmaydi (0 ball)
            </Radio>
          </Radio.Group>
        </Item>

        <Item
          label="Dvigatel reaktsiyalari (M)"
          name="motor"
          rules={[{ required: true, message: "Iltimos, birini tanlang!" }]}
        >
          <Radio.Group>
            <Radio value="4">Buyruqlarni bajaradi (4 ball)</Radio>
            <Radio value="3">Og'riqni lokalizatsiya qiladi (3 ball)</Radio>
            <Radio value="2">Og'riqqa bukiluvchi javob (2 ball)</Radio>
            <Radio value="1">Og'riqqa ekstensiya pozasi (1 ball)</Radio>
            <Radio value="0">
              Og'riqqa javob yo'q yoki umumiy mioklonik epistatus (0 ball)
            </Radio>
          </Radio.Group>
        </Item>

        <Item
          label="Asosiy reflekslar (B)"
          name="brainstem"
          rules={[{ required: true, message: "Iltimos, birini tanlang!" }]}
        >
          <Radio.Group>
            <Radio value="4">
              Pupillal va korneal reflekslar saqlangan (4 ball)
            </Radio>
            <Radio value="3">
              Bitta pupilla kengaygan va yorug'likka javob bermaydi (3 ball)
            </Radio>
            <Radio value="2">Pupillal yoki korneal refleks yo'q (2 ball)</Radio>
            <Radio value="1">Pupillal va korneal refleks yo'q (1 ball)</Radio>
            <Radio value="0">
              Pupillal, korneal va yo'tal refleks yo'q (0 ball)
            </Radio>
          </Radio.Group>
        </Item>

        <Item
          label="Nafas olish patterni (R)"
          name="respiration"
          rules={[{ required: true, message: "Iltimos, birini tanlang!" }]}
        >
          <Radio.Group>
            <Radio value="4">
              Intubatsiya qilinmagan, muntazam nafas olish (4 ball)
            </Radio>
            <Radio value="3">
              Intubatsiya qilinmagan, Cheyne–Stokes nafas olish (3 ball)
            </Radio>
            <Radio value="2">
              Intubatsiya qilinmagan, nozik nafas olish (2 ball)
            </Radio>
            <Radio value="1">IVL apparatiga qarshi turadi (1 ball)</Radio>
            <Radio value="0">
              IVL apparati bilan to'liq sinxron yoki apnoe (0 ball)
            </Radio>
          </Radio.Group>
        </Item>

        <Item>
          <label>Natija: </label>
          <Text>{getResultText()}</Text>
        </Item>
        <Item>
          <Button
            type="default"
            onClick={resetForm}
            style={{ marginLeft: "10px" }}
          >
            Tozalash
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default FOURComaScale;
