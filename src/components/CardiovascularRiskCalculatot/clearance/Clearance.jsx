import React, { useState } from 'react';
import './style.css';

const CreatinineCalculator = () => {
    const [gender, setGender] = useState('');
    const [creatinine, setCreatinine] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [unit, setUnit] = useState('umol/L');
    const [results, setResults] = useState(null);

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const handleCreatinineChange = (e) => {
        setCreatinine(e.target.value);
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    };

    const handleHeightChange = (e) => {
        setHeight(e.target.value);
    };

    const handleUnitChange = (e) => {
        setUnit(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const convertCreatinine = (creatinine, unit) => {
            if (unit === 'umol/L') {
                return creatinine / 88.4; // Convert umol/L to mg/dL
            }
            return creatinine;
        };

        const cr = convertCreatinine(parseFloat(creatinine), unit);
        const ageNum = parseFloat(age);
        const weightNum = parseFloat(weight);

        let crCl = (140 - ageNum) * weightNum / (cr * 72);
        if (gender === 'Ayol') {
            crCl *= 0.85;
        }

        let gfr = 175 * Math.pow(cr, -1.154) * Math.pow(ageNum, -0.203);
        if (gender === 'Ayol') {
            gfr *= 0.742;
        }

        setResults({
            crCl: crCl.toFixed(2),
            gfr: gfr.toFixed(2)
        });
    };
    return (
        <div className="calculator-container">
            <h2>SKF va kreatinin klirensi kalkulyatori</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        Jins:
                        <input type="radio" value="Erkak" checked={gender === 'Erkak'} onChange={handleGenderChange} /> Erkak
                        <input type="radio" value="Ayol" checked={gender === 'Ayol'} onChange={handleGenderChange} /> Ayol
                    </label>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }} className="form-group">
                    <label>   Kreatinin:</label>
                    <input type="number" value={creatinine} onChange={handleCreatinineChange} />

                    <select style={{ height: "35px" }} value={unit} onChange={handleUnitChange}>
                        <option value="umol/L">umol/L</option>
                        <option value="mg/dL">mg/dL</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>
                        Yosh (yosh):
                        <input type="number" value={age} onChange={handleAgeChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Vazn (kg):
                        <input type="number" value={weight} onChange={handleWeightChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Bo'y (sm):
                        <input type="number" value={height} onChange={handleHeightChange} />
                    </label>
                </div>
                {results && (
                    <div className="results">
                        <h3>Natijalar:</h3>
                        <p>Kreatinin klirensi (CrCl): {results.crCl} mL/min</p>
                        <p>GFR: {results.gfr} mL/min/1.73m²</p>
                    </div>
                )}
                <button type="submit" className="calculate-button">Hisoblash</button>
            </form>
            <table className="results-table">
                <thead>
                    <tr>
                        <th>Bosqich XBP</th>
                        <th>Ta'rif</th>
                        <th>SKF (ml/min / 1.73 m²)</th>
                        <th>Taktika</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>I</td>
                        <td>Normal yoki yuqori SKF bilan buyrak shikastlanish belgilari.</td>
                        <td>&gt; 90</td>
                        <td>Nefrolog kuzatuvi: asosiy kasallikni aniqlash va davolash, yurak-qon tomir asoratlarini kamaytirish.</td>
                    </tr>
                    <tr>
                        <td>II</td>
                        <td>SKFning boshlang'ich pasayishi bilan buyrak shikastlanish belgilari.</td>
                        <td>89-60</td>
                        <td>XBP rivojlanish tezligini baholash, diagnostika va davolash.</td>
                    </tr>
                    <tr>
                        <td>III</td>
                        <td>O'rtacha SKFning pasayishi.</td>
                        <td>59-30</td>
                        <td>Profilaktika, aniqlash va asoratlarni davolash.</td>
                    </tr>
                    <tr>
                        <td>IV</td>
                        <td>SKFning sezilarli pasayishi.</td>
                        <td>29-15</td>
                        <td>O'rinbosar davolashga tayyorgarlik (usulni tanlash).</td>
                    </tr>
                    <tr>
                        <td>V</td>
                        <td>Terminal buyrak yetishmovchiligi.</td>
                        <td>&lt; 15</td>
                        <td>O'rinbosar buyrak davolashni boshlash.</td>
                    </tr>
                </tbody>
            </table>
        </div >
    );
};

export default CreatinineCalculator;

