import React, { useState } from 'react';
import { Checkbox, Button } from 'antd'; // Ant Design komponentlarini import qilish
import './style.css'; // CSS faylini import qilish

function HASBLEDCalculator() {
    const [highBloodPressure, setHighBloodPressure] = useState(false);
    const [abnormalFunction, setAbnormalFunction] = useState(false);
    const [bleedingHistory, setBleedingHistory] = useState(false);
    const [labileINR, setLabileINR] = useState(false);
    const [elderly, setElderly] = useState(false);
    const [drugAlcohol, setDrugAlcohol] = useState(false);
    const [score, setScore] = useState(null);

    const calculateScore = () => {
        let totalScore = 0;

        if (highBloodPressure) totalScore += 1;
        if (abnormalFunction) totalScore += 1;
        if (bleedingHistory) totalScore += 1;
        if (labileINR) totalScore += 1;
        if (elderly) totalScore += 1;
        if (drugAlcohol) totalScore += 1;

        setScore(totalScore);
    };

    return (
        <div className="calculator-container">
            <h2 className="calculator-title">HAS-BLED Kalkulyatori</h2>

            <p className="calculator-description">
                Ushbu kalkulyator HAS-BLED ballini hisoblash uchun ishlatiladi. HAS-BLED bu qon ketish xavfini baholashga yordam beruvchi vosita hisoblanadi. Kalkulyator quyidagi mezonlarga asoslanadi:
                <ul>
                    <li>Yuqori qon bosimi</li>
                    <li>Jigar yoki buyrak funksiyasining anomaliyasi</li>
                    <li>Qon ketish tarixi</li>
                    <li>Labile INR (Muvozanatsiz xalqaro normallashtirilgan nisbat)</li>
                    <li>Keksalar (65 yosh va katta)</li>
                    <li>Dori yoki alkogol iste'moli</li>
                </ul>
                <strong>Formula: HAS-BLED balli = Yuqoridagi mezonlarga mos kelgan belgilar soni</strong>
            </p>

            <div className="checkbox-group">
                <Checkbox checked={highBloodPressure} onChange={() => setHighBloodPressure(!highBloodPressure)}>
                    Yuqori qon bosimi
                </Checkbox>
                <Checkbox checked={abnormalFunction} onChange={() => setAbnormalFunction(!abnormalFunction)}>
                    Jigar yoki buyrak funksiyasining anomaliyasi
                </Checkbox>
                <Checkbox checked={bleedingHistory} onChange={() => setBleedingHistory(!bleedingHistory)}>
                    Qon ketish tarixi
                </Checkbox>
                <Checkbox checked={labileINR} onChange={() => setLabileINR(!labileINR)}>
                    Labile INR
                </Checkbox>
                <Checkbox checked={elderly} onChange={() => setElderly(!elderly)}>
                    Keksalar (65 yosh va katta)
                </Checkbox>
                <Checkbox checked={drugAlcohol} onChange={() => setDrugAlcohol(!drugAlcohol)}>
                    Dori yoki alkogol iste'moli
                </Checkbox>
            </div>

            <Button type="primary" onClick={calculateScore} className="calculate-button">
                Hisoblash
            </Button>

            {score !== null && (
                <div className="result">
                    <h3>HAS-BLED balli: {score}</h3>
                </div>
            )}
        </div>
    );
}

export default HASBLEDCalculator;
