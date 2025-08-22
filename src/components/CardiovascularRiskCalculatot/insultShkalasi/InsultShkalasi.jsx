import React, { useState } from "react";
import { Radio, Form, Input } from 'antd';

const NIHSSForm = () => {
    const [form] = Form.useForm();
    const [res, setResult] = useState(0);

    const handleFinish = (values) => {
        const {
            levelOfConsciousness = 0,
            levelOfConsciousnessQuestions = 0,
            levelOfConsciousnessCommands = 0,
            eyeMovement = 0,
            vision = 0,
            facialNerveFunction = 0,
            leftArmStrength = 0,
            rightArmStrength = 0,
            leftLegStrength = 0,
            rightLegStrength = 0,
            ataxiaInLimbs = 0,
            sensitivity = 0,
            nutq = 0,
            dizartriya = 0,
            etiborsizlik = 0
        } = values || {};

        const total = [
            levelOfConsciousness,
            levelOfConsciousnessQuestions,
            levelOfConsciousnessCommands,
            eyeMovement,
            vision,
            facialNerveFunction,
            leftArmStrength,
            rightArmStrength,
            leftLegStrength,
            rightLegStrength,
            ataxiaInLimbs,
            sensitivity,
            nutq,
            dizartriya,
            etiborsizlik
        ].reduce((acc, val) => acc + parseInt(val || 0, 10), 0);

        setResult(total);
    };

    const { Item } = Form;
    return (
        <div className="calculator-container">
            <h2>Milliy sog'liqni saqlash instituti (NIHSS)qon tomir shkalasi</h2>
            <Form form={form} onValuesChange={handleFinish} layout="vertical">

                <p>Agar to'liq imkoni bo'lmasa (masalan, endotrakeal naycha, til to'sig'i yoki orotraxeal hududning shikastlanishi tufayli), javoblar va reaktsiyalarning umumiy darajasi baholanadi. 3 ball faqat bemor komada bo'lgan va og'riqli reaktsiyalarga javob bermasa yoki uning reaktsiyalari refleksli xarakterga ega bo'lgan haroratda foydalaniladi (o'yoq-qo'llarining kengayishi).</p>
                <Form.Item label="1a. Uroven' bodrstvovaniya" name="levelOfConsciousness">
                    <Radio.Group>
                        <Radio value="0">Yasnoe soznanie, zhivo reagiruet  <i className="ball"><b>0</b> ball</i></Radio><br />
                        <Radio value="1">Otlugenie i/yli somnolentnost'; mojno dobitsya otvetov i vypolneniya instruktsiy pri minimal'noy stimulatsii  <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value="2">Glubokoe otlugenie ili sopor, reagiruet tol'ko na sil'nye i bolevye vozdeystviya, no dvigeniya ne stereotipny  <i className="ball"><b>2</b> ball</i></Radio><br />
                        <Radio value="3">Atoniya, arefleksiya i areaktivnost' ili otvety na razdrazhiteli sostoit iz reflekotornykh necelenapravlennykh dvigeniy i/yli vegetativnykh reaksiy  <i className="ball"><b>3</b> ball</i></Radio><br />
                    </Radio.Group>
                </Form.Item>

                <p>Bemordan joriy oy va uning yoshini ko'rsatish so'raladi. Javoblar to'g'ri bo'lishi kerak, to'g'riga yaqin bo'lgan javobni sanab bo'lmaydi. Agar bemor savolga javob bermasa (afazi, hushyorlikning sezilarli darajada pasayishi), agar bemor mexanik to'siqlar (endotrakeal naycha, jag'ning shikastlanishi), og'ir dizartriya yoki boshqa muammolar tufayli gapira olmasa, 2 ball beriladi. afazi bilan bog'liq bo'lmagan holda, 1 ball beriladi, faqat birinchi javob baholanishi va tadqiqotchi bemorga hech qanday yordam bermasligi muhimdir.</p>
                <Form.Item label="1b. Uroven' bodrstvovaniya: otvety na voprosy" name="levelOfConsciousnessQuestions">
                    <Radio.Group>
                        <Radio value="0">Pravil'nyy otvet na oba voprosa  <i className="ball"><b>0</b> ball</i></Radio><br />
                        <Radio value="1">Pravil'nyy otvet na odin vopros  <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value="2">Ne otvetil na oba voprosa  <i className="ball"><b>2</b> ball</i></Radio><br />
                    </Radio.Group>
                </Form.Item>

                <p>Bemordan ko'zlarini ochish va keyin yumish, falaj bo'lmagan qo'lining mushtini siqish va ochish so'raladi. Agar to'siqlar mavjud bo'lsa (masalan, qo'lni ishlatib bo'lmaydi), bu buyruqni boshqa bir bosqichli buyruq bilan almashtiring. Agar aniq urinish amalga oshirilsa, lekin kuchsizligi sababli harakat tugallanmagan bo'lsa, natija hisoblanadi. Agar bemor buyruqqa javob bermasa, undan nima talab qilinishini ko'rsatishi va keyin natijani baholashi kerak (ikkalasi takrorlanadi, bittasi yoki hech biri). Faqat birinchi urinish gol bo'ladi.</p>
                <Form.Item label="1c. Uroven' bodrstvovaniya: vypolnenie komand" name="levelOfConsciousnessCommands">
                    <Radio.Group>
                        <Radio value="0">Vypolnil obe komandy  <i className="ball"><b>0</b> ball</i></Radio><br />
                        <Radio value="1">Vypolnil odnu komandу  <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value="2">Ne vypolnil ni odnoy iz komand  <i className="ball"><b>2</b> ball</i></Radio><br />
                    </Radio.Group>
                </Form.Item>

                <p>Tadqiqotchi barmog'ining harakatini kuzatish.</p>
                <Form.Item label="2. Dvigenie glaznykh yablok" name="eyeMovement">
                    <Radio.Group>
                        <Radio value="0">Norma  <i className="ball"><b>0</b> ball</i></Radio><br />
                        <Radio value="1">Chastichniy pаrez vzora; narusheniya dvigeniya odnogo ili oboikh glaz, no net tonicheskoy devyatsii glaznykh yablok i polnogo paralicha vzora  <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value="2">Tonicheskaya devyatsiya glaznykh yablok i/yli polnyy paralich vzora, kotoryy sokhranyaetsya pri proverke vestibulo-okulyarnogo refleksa  <i className="ball"><b>2</b> ball</i></Radio><br />
                    </Radio.Group>
                </Form.Item>

                <p>Vizuallar (yuqori va kuchlar kvadrantlar) qarama-qarshilik usuli yordamida, mustahkamlashlar sonini maydon yoki periferiyadan ko'zning markaziga qo'rqinchli o'tkir tekshiruv orqali tekshiriladi. Sizga yordamga ko'rsatilishi mumkin, ammo agar ular harakatlanuvchi barpolar yo'nalishiga qarasa, buni normal deb mumkin. Agar bir ko'z ko'rmasa yoki yo'qolsa, tekshiriladi. Agar aniq assiiya aniqlansa (shu individual kvadrantanopsiya) 1 ball beriladi. Agar bemor ko'r bo'lsa (har qanday sababga ko'ra), bu erda bir natija o'zida har ikki tomonning stimulyatsiyasi tekshiriladi va agar hemiignoring bo'lsa, 1 ball qo'yiladi va natija 11-bo'limda qo' qoidalar.</p>
                <Form.Item label="3. Polya zreniya" name="vision">
                    <Radio.Group>
                        <Radio value="0">Polya zreniya ne narusheny  <i className="ball"><b>0</b> ball</i></Radio><br />
                        <Radio value="1">Chastichnaya utorata  <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value="2">Slepota, vklyuchaya kortikal'nuyu  <i className="ball"><b>2</b> ball</i></Radio><br />
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="4. Narushenie funktsiy litsovogo nerva" name="facialNerveFunction">
                    <Radio.Group>
                        <Radio value="0">Normal'nye simmetrichnye dvizheniya mimicheskikh myshts  <i className="ball"><b>0</b> ball</i></Radio><br />
                        <Radio value="1">Legkiy pares mimicheskikh myshts, slageniya noso-gubnaya sklada, assimetrichnaya ulybka  <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value="2">Umeryennyi prosoparez, polnyy ili vyrazhenyy pares nizhney gruppy mimicheskikh myshts  <i className="ball"><b>2</b> ball</i></Radio><br />
                        <Radio value="3">Pares odnoy ili oboikh poloviny litsa, otsutstvie dvizheniy v verkhney i nizhney chasti litsa  <i className="ball"><b>3</b> ball</i></Radio><br />
                    </Radio.Group>
                </Form.Item>

                <p>Cho‘zilgan qo‘l kaftlarini pastga qaratib tanaga 90° (agar bemor o‘tirgan bo‘lsa) yoki 45° (agar bemor yotgan bo‘lsa) burchak ostida qo‘yiladi va bemordan uni shu holatda 10 soniya ushlab turish so‘raladi. Avval shol bo'lmagan qo'l baholanadi, keyin ikkinchisi. Afazi bilan siz boshlang'ich pozitsiyasini olishingiz va pantomimadan foydalanishingiz mumkin, ammo og'riqli stimullardan emas. Agar kuchni sinab ko'rishning iloji bo'lmasa (qo'l-oyoq yo'qolgan, elka bo'g'imida ankiloz, sinish), bu bo'lim UN (ingliz tilidan tekshirilmaydi) deb belgilanadi va sababi tushuntiriladi.</p>
                <Form.Item label="5a. Sila myshts levoy ruki" name="leftArmStrength">
                    <Radio.Group>
                        <Radio value="0">Ruka ne opuskayetsya v techenie 10 s  <i className="ball"><b>0</b> ball</i></Radio><br />
                        <Radio value="1">Ruka nachinaet opuskatsya do istecheniya 10 s, no ne kasayetsya krovaty ili drugoy poverkhnosti  <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value="2">Ruka uderzhivaetsya kakoe-to vremya, no v techenie 10 s kasayetsya gorizontal'noy poverkhnosti  <i className="ball"><b>2</b> ball</i></Radio><br />
                        <Radio value="3">Ruka srazu padaet, no v neyy est' dvizheniya  <i className="ball"><b>3</b> ball</i></Radio><br />
                        <Radio value="4">Dvizheniya v ruke otsutstvuyut, UN = issledovat' nevozmozhno  <i className="ball"><b>4</b> ball</i></Radio><br />
                    </Radio.Group>
                </Form.Item>

                <p>Cho‘zilgan qo‘l kaftlarini pastga qaratib tanaga 90° (agar bemor o‘tirgan bo‘lsa) yoki 45° (agar bemor yotgan bo‘lsa) burchak ostida qo‘yiladi va bemordan uni shu holatda 10 soniya ushlab turish so‘raladi. Avval shol bo'lmagan qo'l baholanadi, keyin ikkinchisi. Afazi bilan siz boshlang'ich pozitsiyasini olishingiz va pantomimadan foydalanishingiz mumkin, ammo og'riqli stimullardan emas. Agar kuchni sinab ko'rishning iloji bo'lmasa (qo'l-oyoq yo'qolgan, elka bo'g'imida ankiloz, sinish), bu bo'lim UN (ingliz tilidan tekshirilmaydi) deb belgilanadi va sababi tushuntiriladi.</p>
                <Form.Item label="5b. Sila myshts pravoy ruki" name="rightArmStrength">
                    <Radio.Group>
                        <Radio value="0">Ruka ne opuskayetsya v techenie 10 s  <i className="ball"><b>0</b> ball</i></Radio><br />
                        <Radio value="1">Ruka nachinaet opuskatsya do istecheniya 10 s, no ne kasayetsya krovaty ili drugoy poverkhnosti  <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value="2">Ruka uderzhivaetsya kakoe-to vremya, no v techenie 10 s kasayetsya gorizontal'noy poverkhnosti  <i className="ball"><b>2</b> ball</i></Radio><br />
                        <Radio value="3">Ruka srazu padaet, no v neyy est' dvizheniya  <i className="ball"><b>3</b> ball</i></Radio><br />
                        <Radio value="4">Dvizheniya v ruke otsutstvuyut, UN = issledovat' nevozmozhno  <i className="ball"><b>4</b> ball</i></Radio><br />
                    </Radio.Group>
                </Form.Item>

                <p>Har doim yotgan holatda tekshiriladi. Bemordan oyog'ini gorizontal yuzaga 30 ° burchak ostida ko'tarish va uni 5 soniya davomida bu holatda ushlab turish so'raladi. Afazi bilan siz boshlang'ich pozitsiyasini olishingiz va pantomimadan foydalanishingiz mumkin, ammo og'riqli stimullardan emas. Avval shol bo'lmagan oyoq baholanadi, keyin ikkinchisi. Agar kuchni o'rganishning iloji bo'lmasa (qo'l-oyoq yo'qolgan, elka bo'g'imida ankiloz, sinish) tegishli belgi qo'yiladi.</p>
                <Form.Item label="6a. Sila myshts levoy nogi" name="leftLegStrength">
                    <Radio.Group>
                        <Radio value="0">Noga ne opuskayetsya v techenie 5 s  <i className="ball"><b>0</b> ball</i></Radio><br />
                        <Radio value="1">Noga nachinaet opuskatsya do istecheniya 5 s, no ne kasayetsya krovaty  <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value="2">Noga uderzhivaetsya kakoe-to vremya, no v techenie 5 s kasayetsya krovaty  <i className="ball"><b>2</b> ball</i></Radio><br />
                        <Radio value="3">Noga srazu padaet, no v neyy est' dvizheniya  <i className="ball"><b>3</b> ball</i></Radio><br />
                        <Radio value="4">Dvizheniya v noge otsutstvuyut, UN = issledovat' nevozmozhno  <i className="ball"><b>4</b> ball</i></Radio><br />
                    </Radio.Group>
                </Form.Item>

                <p>Har doim yotgan holatda tekshiriladi. Bemordan oyog'ini gorizontal yuzaga 30 ° burchak ostida ko'tarish va uni 5 soniya davomida bu holatda ushlab turish so'raladi. Afazi bilan siz boshlang'ich pozitsiyasini olishingiz va pantomimadan foydalanishingiz mumkin, ammo og'riqli stimullardan emas. Avval shol bo'lmagan oyoq baholanadi, keyin ikkinchisi. Agar kuchni o'rganishning iloji bo'lmasa (qo'l-oyoq yo'qolgan, elka bo'g'imida ankiloz, sinish) tegishli belgi qo'yiladi.</p>
                <Form.Item label="6b. Sila myshts pravoy nogi" name="rightLegStrength">
                    <Radio.Group>
                        <Radio value="0">Noga ne opuskayetsya v techenie 5 s  <i className="ball"><b>0</b> ball</i></Radio><br />
                        <Radio value="1">Noga nachinaet opuskatsya do istecheniya 5 s, no ne kasayetsya krovaty  <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value="2">Noga uderzhivaetsya kakoe-to vremya, no v techenie 5 s kasayetsya krovaty  <i className="ball"><b>2</b> ball</i></Radio><br />
                        <Radio value="3">Noga srazu padaet, no v neyy est' dvizheniya  <i className="ball"><b>3</b> ball</i></Radio><br />
                        <Radio value="4">Dvizheniya v noge otsutstvuyut, UN = issledovat' nevozmozhno  <i className="ball"><b>4</b> ball</i></Radio><br />
                    </Radio.Group>
                </Form.Item>

                <p>Ushbu bo'lim bir tomondan serebellumning shikastlanish belgilarini aniqlashni o'z ichiga oladi. Tadqiqot ochiq ko'zlar bilan amalga oshiriladi. Vizual maydonlarning cheklanishi mavjud bo'lsa, o'rganish buzilishlar bo'lmagan hududda amalga oshiriladi. Barmoq-burun-oyoq va tizza-tovon sinovlari har ikki tomonda ham amalga oshiriladi. Ballar faqat ataksiyaning og'irligi parezning og'irligidan oshib ketganda beriladi. Agar bemorga kirish imkoni bo'lmasa yoki falaj bo'lsa, ataksiya yo'q. Agar bemor ko'rmasa, barmoq-burun tekshiruvi o'tkaziladi. Agar testni o'tkazish mumkin bo'lmasa (yo'qolgan oyoq-qo'l, ankiloz, sinish), bu bo'lim UN (ingliz tilidan tekshirilmaydi) deb belgilanadi va sababi tushuntiriladi.</p>
                <Form.Item label="7. Ataksiya v konechnostyakh" name="ataxiaInLimbs">
                    <Radio.Group>
                        <Radio value="0">Ataksii net  <i className="ball"><b>0</b> ball</i></Radio><br />
                        <Radio value="1">Ataksiya v odnoy konechnosti  <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value="2">Ataksiya v dvukh konechnostyakh, UN = issledovat' nevozmozhno  <i className="ball"><b>2</b> ball</i></Radio><br />
                    </Radio.Group>
                </Form.Item>

                <p>U tish pichog'i (tish pichog'i) va teginish yordamida tekshiriladi. Ong yoki afaziya buzilgan taqdirda, oyoq-qo'llarning tirnash xususiyati va tortib olinishi baholanadi. Faqat insultdan kelib chiqqan gipoesteziya (gemitip bo'yicha) baholanadi, shuning uchun tekshirish uchun tananing turli qismlarida (bilaklar va elkalar, sonlar, torso, yuz) in'ektsiyalarga reaktsiyani solishtirish kerak. 2 ball faqat tananing yarmida sezuvchanlikning qo'pol pasayishi shubhasiz bo'lgan hollarda beriladi, shuning uchun afazi yoki stupor darajasida ongni buzgan bemorlar 0 yoki 1 ball oladi. Ikki tomonlama hemigipesteziya sabab bo'lgan taqdirda. miya sopi insult bilan 2 ball beriladi, komadagi bemorlarga avtomatik ravishda 2 ball beriladi.</p>
                <Form.Item label="8. Chuvstvitel'nost'" name="sensitivity">
                    <Radio.Group>
                        <Radio value="0">Norma  <i className="ball"><b>0</b> ball</i></Radio><br />
                        <Radio value="1">Yengil yoki o'rtacha darajadagi hemigipesteziya; zararlangan tomonda bemor in'ektsiyalarni kamroq o'tkir yoki teginish kabi his qiladi  <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value="2">Jiddiy hemigipesteziya yoki hemianesteziya; bemor hech qanday ukol yoki teginish his qilmaydi  <i className="ball"><b>2</b> ball</i></Radio><br />
                    </Radio.Group>
                </Form.Item>

                <p>Murojaatli nutqni tushunishga oid ma'lumotlar oldingi bo'limlarni o'rganish jarayonida allaqachon olingan. Nutq ishlab chiqarishni o'rganish uchun bemordan rasmdagi voqealarni tasvirlash, ob'ektlarni nomlash va matnning bir qismini o'qish so'raladi. Agar nutqni tekshirishda ko'rish muammolari to'sqinlik qilsa, bemordan qo'liga qo'yilgan narsalarni nomlashni, iborani takrorlashni va hayotidagi voqea haqida gapirishni so'rang. Agar endotrakeal trubka o'rnatilgan bo'lsa, bemordan yozma topshiriqlarni bajarishni so'rash kerak. Komadagi bemorlar avtomatik ravishda 3. Agar ong buzilgan bo'lsa, ball tadqiqotchi tomonidan belgilanadi, ammo 3 faqat mutizm va oddiy buyruqlarni to'liq e'tiborsiz qoldirish uchun beriladi.</p>
                <Form.Item label="9. Nutq'" name="nutq">
                    <Radio.Group>
                        <Radio value="0">Norma  <i className="ball"><b>0</b> ball</i></Radio><br />
                        <Radio value="1">Yengil yoki o'rtacha afazi; nutq buzilgan yoki tushunish buzilgan, ammo bemor o'z fikrlarini bildirishi va tadqiqotchini tushunishi mumkin  <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value="2">Qattiq afazi; faqat parcha-parcha muloqot qilish mumkin, bemorning nutqini tushunish juda qiyin, bemorning fikriga ko'ra, tadqiqotchi rasmlarda nima ko'rsatilganligini tushunolmaydi  <i className="ball"><b>2</b> ball</i></Radio><br />
                        <Radio value="3">Mutizm, umumiy afaziya; bemor hech qanday tovush chiqarmaydi va murojaat qilingan nutqni umuman tushunmaydi  <i className="ball"><b>3</b> ball</i></Radio><br />
                    </Radio.Group>
                </Form.Item>

                <p>Bemorga aniq nimani baholamoqchi ekanligingizni aytishning hojati yo'q. Oddiy artikulyatsiya bilan bemor aniq gapiradi, u tovushlar va tilning murakkab birikmalarini talaffuz qilishda qiyinchiliklarga duch kelmaydi. Qattiq afaziyada alohida tovushlar va so'zlarning talaffuzi mutizm holatida baholanadi, agar kuchni o'rganish mumkin bo'lmasa (entubatsiya, yuz jarohati), tegishli belgi qo'yiladi.</p>
                <Form.Item label="10. Dizartriya'" name="dizartriya">
                    <Radio.Group>
                        <Radio value="0">Norma  <i className="ball"><b>0</b> ball</i></Radio><br />
                        <Radio value="1">Engil va o'rtacha darajadagi dizartriya; ba'zi tovushlar "loyqa", so'zlarni tushunish ba'zi qiyinchiliklarni keltirib chiqaradi  <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value="2">Og'ir dizartriya; so'zlar shunchalik buzilganki, ularni tushunish juda qiyin (sabab afaziya tufayli emas) yoki anartriya/mutizm qayd etilgan, BMT = tekshirib bo'lmaydi  <i className="ball"><b>2</b> ball</i></Radio><br />
                    </Radio.Group>
                </Form.Item>

                <p>Sensorli yarim johillik deganda, hemigipesteziya bo'lmaganda ikkala tomondan bir vaqtning o'zida stimullar qo'llanilganda, tananing yarmida (odatda chapda) idrok etishning buzilishi tushuniladi. Vizual hemiignoring, chap tomonlama hemianopsiya bo'lmaganda, vizual maydonning chap yarmida ob'ektlarni idrok etishning buzilishi sifatida tushuniladi. Qoida tariqasida, oldingi bo'limlardagi ma'lumotlar etarli. Agar ko'rishning buzilishi tufayli vizual hemiignoringni o'rganish mumkin bo'lmasa va og'riqli ogohlantirishlarni idrok etish buzilmasa, ball 0. Anosognoziya hemiignoratsiyani ko'rsatadi. Ushbu bo'limdagi reyting faqat yarim e'tiborsizlik mavjud bo'lganda beriladi, shuning uchun "o'rganish mumkin emas" xulosasi unga taalluqli emas.</p>
                <Form.Item label="11. E'tiborsizlik (e'tiborsizlik)" name="etiborsizlik">
                    <Radio.Group>
                        <Radio value="0">Norma  <i className="ball"><b>0</b> ball</i></Radio><br />
                        <Radio value="1">Bir turdagi qo'zg'atuvchining (vizual, hissiy, eshitish) yarim e'tiborsizligi belgilari aniqlandi.  <i className="ball"><b>1</b> ball</i></Radio><br />
                        <Radio value="2">Bir nechta turtki qo'zg'atuvchining yarim e'tiborsizligi belgilari aniqlandi; qo'lini tanimaydi yoki bo'shliqning faqat yarmini sezadi  <i className="ball"><b>2</b> ball</i></Radio><br />
                    </Radio.Group>
                </Form.Item>
                <Item>
                    <label>Natija: </label>
                    <Input
                        value={res}
                        readOnly
                    />
                </Item>
            </Form>
        </div>
    );
};

export default NIHSSForm;