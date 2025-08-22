import React, { useState } from 'react';
import { Form, Checkbox, Input, Button } from 'antd';



const CHA2DS2VAScCalculator = () => {
    const [scores, setScores] = useState({
        heartFailure: false,
        hypertension: false,
        diabetes: false,
        stroke: false,
        vascularDisease: false,
        age65to74: false,
        age75orOlder: false,
        female: false,
        male: false,
    });

    const handleChange = (event) => {
        const { name, checked } = event.target;
        setScores(prevScores => ({
            ...prevScores,
            [name]: checked,
        }));
    };

    const calculateScore = () => {
        const {
            heartFailure,
            hypertension,
            diabetes,
            stroke,
            vascularDisease,
            age65to74,
            age75orOlder,
            female,
            male
        } = scores;

        let score = 0;

        if (heartFailure) score += 1;
        if (hypertension) score += 1;
        if (diabetes) score += 1;
        if (stroke) score += 2;
        if (vascularDisease) score += 1;
        if (age65to74) score += 1;
        if (age75orOlder) score += 2;
        if (female) score += 1;
        if (male) score += 0;

        return score;
    };

    const calculatePercentage = () => {
        const maxScore = scores.female ? 9 : 10;  // Maksimal ball
        const score = calculateScore();
        return (score / maxScore) * 10;
    };

    // Formani tozalash funksiyasi
    const resetForm = () => {
        setScores(false)
    };

    return (
        <div className="calculator-container">
            <h2>CHA2DS2-VASC shkalasi (atriyal fibrilatsiyali bemorlarda insult va tizimli tromboemboliya xavfini baholash)</h2>
            <Form>
                <b>Klinik ko'rsatkichlar</b>
                <Form.Item>
                    <Checkbox name="heartFailure" checked={scores.heartFailure} onChange={handleChange}>
                        Yurak yetishmovchiligi/chap qorincha disfunksiyasi <i className="ball"> <b>1</b> ball</i><br />
                    </Checkbox>
                </Form.Item>
                <Form.Item>
                    <Checkbox name="hypertension" checked={scores.hypertension} onChange={handleChange}>
                        Arterial gipertenziya <i className="ball"><b>1</b> ball</i><br />
                    </Checkbox>
                </Form.Item>
                <Form.Item>
                    <Checkbox name="diabetes" checked={scores.diabetes} onChange={handleChange}>
                        Qandli diabet <i className="ball"><b>1</b> ball</i><br />
                    </Checkbox>
                </Form.Item>
                <Form.Item>
                    <Checkbox name="stroke" checked={scores.stroke} onChange={handleChange}>
                        Insult/TIA/tromboemboliyalar <i className="ball"><b>2</b> ball</i><br />
                    </Checkbox>
                </Form.Item>
                <Form.Item>
                    <Checkbox name="vascularDisease" checked={scores.vascularDisease} onChange={handleChange}>
                        Tomir kasalliklari (miokard infarkti, periferik arteriyalar aterosklerozi yoki aorta blyashka) <i className="ball"><b>1</b> ball</i><br />
                    </Checkbox>
                </Form.Item>
                <b>Yoshi</b>
                <Form.Item>
                    <Checkbox name="age65to74" checked={scores.age65to74} onChange={handleChange}>
                        Yoshi 65-74 <i className="ball"><b>1</b> ball</i><br />
                    </Checkbox>
                </Form.Item>
                <Form.Item>
                    <Checkbox name="age75orOlder" checked={scores.age75orOlder} onChange={handleChange}>
                        Yoshi ≥75 <i className="ball"><b>2</b> ball</i><br />
                    </Checkbox>
                </Form.Item>
                <b>Jinsi</b>
                <Form.Item>
                    <Checkbox name="male" checked={scores.male} onChange={handleChange}>
                        Erkak <i className="ball"><b>0</b> ball</i><br />
                    </Checkbox>
                </Form.Item>
                <Form.Item>
                    <Checkbox name="female" checked={scores.female} onChange={handleChange}>
                        Ayol <i className="ball"><b>1</b> ball</i><br />
                    </Checkbox>
                </Form.Item>
                <Form.Item>
                    <label>Umumiy Ball:{calculateScore()}</label>
                    <Input
                        value={calculatePercentage() && "Bir yil ichida insultni rivojlanish xavfi: " + calculatePercentage().toFixed(2) + "%"}
                        readOnly
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Hisoblash</Button>
                    <Button type="default" onClick={resetForm} style={{ marginLeft: '10px' }}>Tozalash</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CHA2DS2VAScCalculator;
