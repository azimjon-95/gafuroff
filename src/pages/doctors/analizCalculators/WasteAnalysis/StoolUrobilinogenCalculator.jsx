import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const StoolUrobilinogenCalculator = () => {
    const [urobilinogen, setUrobilinogen] = useState('');
    const [output, setOutput] = useState(null);

    const calculateUrobilinogen = () => {
        if (urobilinogen) {
            // Urobilinogen kontsentratsiyasi (mg/g) ni hisoblash
            const urobilinogenValue = parseFloat(urobilinogen).toFixed(2);
            setOutput(`Najosatda urobilinogen miqdori: ${urobilinogenValue} mg/g`);
        }
    };

    return (
        <div>
            <h1>Najosatda Urobilinogen Kalkulyatori</h1>
            <h2>Formulasi: Urobilinogen (mg/g) = Najosatdagi urobilinogen miqdori</h2>
            <div>
                <label>
                    Najosatdagi urobilinogen miqdori (mg/g):
                    <input
                        type="number"
                        placeholder="Najosatda urobilinogen miqdorini kiriting"
                        value={urobilinogen}
                        onChange={(e) => setUrobilinogen(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={calculateUrobilinogen}>Hisoblash</button>
            {output && (
                <h3>{output}</h3>
            )}
        </div>
    );
};

export default StoolUrobilinogenCalculator;

