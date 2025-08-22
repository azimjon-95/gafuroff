import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const FecalSodiumCalculator = () => {
    const [fecalSodium, setFecalSodium] = useState('');
    const [output, setOutput] = useState(null);

    const calculateFecalSodium = () => {
        if (fecalSodium) {
            // Natriy kontsentratsiyasi (mg/g) ni hisoblash
            const sodiumValue = parseFloat(fecalSodium).toFixed(2);
            setOutput(`Najosatda natriy miqdori: ${sodiumValue} mg/g`);
        }
    };

    return (
        <div>
            <h1>Najosatda Natriy Kalkulyatori</h1>
            <h2>Formulasi: Natriy (mg/g) = Najosatdagi natriy miqdori</h2>
            <div>
                <label>
                    Najosatdagi natriy miqdori (mg/g):
                    <input
                        type="number"
                        placeholder="Natriy miqdorini kiriting (mg/g)"
                        value={fecalSodium}
                        onChange={(e) => setFecalSodium(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={calculateFecalSodium}>Hisoblash</button>
            {output && (
                <h3>{output}</h3>
            )}
        </div>
    );
};

export default FecalSodiumCalculator;

