import React, { useState } from 'react';
import './style.css';
import jsPDF from 'jspdf';

const CardioRiskCalculator = () => {
    const [formData, setFormData] = useState({
        population: 'С очень высоким риском',
        sex: 'мужчина',
        age: '',
        systolicBP: '',
        cholesterol: '',
        smoking: 'не курит',
    });

    const [risk, setRisk] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for the risk calculation logic
        const calculatedRisk = calculateRisk(formData);
        setRisk(calculatedRisk);
    };

    const calculateRisk = (data) => {
        // Placeholder for risk calculation logic
        return (Math.random() * 10).toFixed(2); // Example: Random risk percentage
    };

    const handleReset = () => {
        setFormData({
            population: 'С очень высоким риском',
            sex: 'мужчина',
            age: '',
            systolicBP: '',
            cholesterol: '',
            smoking: 'не курит',
        });
        setRisk(null);
    };

    const handleDownload = () => {
        const doc = new jsPDF();

        doc.text('Калькулятор SCORE2, SCORE2-OP', 10, 10);
        doc.text(`Популяция: ${formData.population}`, 10, 20);
        doc.text(`Пол: ${formData.sex}`, 10, 30);
        doc.text(`Возраст: ${formData.age} лет`, 10, 40);
        doc.text(`Систолическое АД: ${formData.systolicBP} мм рт.ст.`, 10, 50);
        doc.text(`Холестерин: ${formData.cholesterol} ммоль/л`, 10, 60);
        doc.text(`Курение: ${formData.smoking}`, 10, 70);
        if (risk !== null) {
            doc.text(`Ваш риск на 10 лет: ${risk}%`, 10, 80);
        } else {
            doc.text('Риск не рассчитан', 10, 80);
        }

        doc.save('cardio-risk-assessment.pdf');
    };

    return (
        <div className="calculator-container">
            <h1>Калькулятор SCORE2, SCORE2-OP</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Популяция:
                    <select name="population" value={formData.population} onChange={handleChange}>
                        <option value="С очень высоким риском">С очень высоким риском</option>
                        <option value="Другой риск">Другой риск</option>
                    </select>
                </label>
                <div className="radio-group">
                    <label className={`radio ${formData.sex === 'мужчина' ? 'active' : ''}`}>
                        мужчина
                        <input type="radio" name="sex" value="мужчина" checked={formData.sex === 'мужчина'} onChange={handleChange} />
                    </label>
                    <label className={`radio ${formData.sex === 'женщина' ? 'active' : ''}`}>
                        женщина
                        <input type="radio" name="sex" value="женщина" checked={formData.sex === 'женщина'} onChange={handleChange} />
                    </label>
                </div>
                <label>
                    Возраст:
                    <input type="number" name="age" value={formData.age} onChange={handleChange} />
                </label>
                <label>
                    Систолическое АД:
                    <input type="number" name="systolicBP" value={formData.systolicBP} onChange={handleChange} />
                </label>
                <label>
                    Холестерин:
                    <input type="number" name="cholesterol" value={formData.cholesterol} onChange={handleChange} />
                </label>
                <div className="radio-group">
                    <label className={`radio ${formData.smoking === 'не курит' ? 'active' : ''}`}>
                        не курит
                        <input type="radio" name="smoking" value="не курит" checked={formData.smoking === 'не курит'} onChange={handleChange} />
                    </label>
                    <label className={`radio ${formData.smoking === 'курит' ? 'active' : ''}`}>
                        курит
                        <input type="radio" name="smoking" value="курит" checked={formData.smoking === 'курит'} onChange={handleChange} />
                    </label>
                </div>
                <div className="button-group">
                    <button type="submit">Рассчитать</button>
                    <button type="button" onClick={handleReset}>Очистить</button>
                    <button type="button" onClick={handleDownload}>Скачать</button>
                </div>
            </form>
            {risk !== null && (
                <div className="result">
                    <h2>Ваш риск на 10 лет: {risk}%</h2>
                </div>
            )}
        </div>
    );
};

export default CardioRiskCalculator;
