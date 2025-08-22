import React, { useState } from 'react';
import './style.css'

const ASCVDCalculator = () => {
    // State lar
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [race, setRace] = useState('');
    const [totalCholesterol, setTotalCholesterol] = useState('');
    const [hdlCholesterol, setHDLCholesterol] = useState('');
    const [systolicBP, setSystolicBP] = useState('');
    const [result, setResult] = useState('');
    const [isDiabetic, setIsDiabetic] = useState(false);

    // ASCVD riskni hisoblash funksiyasi
    const calculateRisk = () => {
        // Hisoblash uchun formulalar va shartlar kiritiladi
        const risk = age * totalCholesterol - hdlCholesterol + systolicBP +
            (gender === 'male' ? 50 : 0) +  // Masalan: Jinsga bog'liq shartlar
            (isDiabetic ? 20 : 0);            // Masalan: Diabet bo'lsa qo'shiladigan risk
        // Natija qaytariladi
        return risk;
    };

    // Formani jo'natish funksiyasi
    const handleSubmit = (e) => {
        e.preventDefault();
        const risk = calculateRisk();
        setResult(risk);
    };

    const resetForm = () => {
        setHDLCholesterol("");
        setTotalCholesterol("");
        setGender('erkak');
        setSystolicBP("");
        setRace('');
        setAge('');
    };

    return (
        <div className="calculator-container">
            <h2>ASCVS Kalkulyatori</h2>
            <form onSubmit={handleSubmit}>
                {/* Form elementlari va ularning o'zgaruvchilari */}
                <div className="form-group">
                    <label>Yosh:</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Jins:</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="male">Erkak</option>
                        <option value="female">Ayol</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Turkumi:</label>
                    <select value={race} onChange={(e) => setRace(e.target.value)}>
                        <option value="white">Oq</option>
                        <option value="black">Qora</option>
                        <option value="asian">Shark</option>
                        <option value="other">Boshqa</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Umumiy holesterol:</label>
                    <input type="number" value={totalCholesterol} onChange={(e) => setTotalCholesterol(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>HDL holesterol:</label>
                    <input type="number" value={hdlCholesterol} onChange={(e) => setHDLCholesterol(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Sistolik QV:</label>
                    <input type="number" value={systolicBP} onChange={(e) => setSystolicBP(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Diabet:</label>
                    <input type="checkbox" checked={isDiabetic} onChange={(e) => setIsDiabetic(e.target.checked)} />
                </div>
                <div className="form-group">
                    <label>ASCVS riski: </label>
                    <input type="text" value={result} readOnly />
                </div>
                <div className="button-group">
                    <button type="submit" className="calculate-button">Hisoblash</button>
                    <button type="button" className="reset-button" onClick={resetForm}>Tozalash</button>
                </div>
            </form>
        </div>
    );
};

export default ASCVDCalculator;
