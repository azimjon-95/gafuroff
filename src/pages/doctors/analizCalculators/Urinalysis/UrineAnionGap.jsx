import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const { Text } = Typography;

const UrineAnionGap = () => {
    const [sodium, setSodium] = useState(''); // Natriy
    const [chloride, setChloride] = useState(''); // Xlorid
    const [bicarbonate, setBicarbonate] = useState(''); // Bikarbonat
    const [result, setResult] = useState(null); // Natija

    const calculateUAG = () => {
        const uag = Number(sodium) - (Number(chloride) + Number(bicarbonate)); // UAG hisoblash
        setResult(uag);
    };

    return (
        <div className="calculator-container" >
            <h2>Urine Anion Gap (UAG) Kalkulyatori</h2>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                Ushbu kalkulyator siydikdagi anionlar orasidagi nisbati (UAG) ni hisoblash uchun mo'ljallangan.
                UAG siydikning anion tarkibini baholashda muhim ahamiyatga ega bo'lib, bu sog'liq holatini aniqlashda yordam beradi.
            </Text>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                Formula: UAG = Na⁺ - (Cl⁻ + HCO₃⁻)
            </Text>

            <label htmlFor="sodium">Natriy (Na⁺) darajasi (mmol/L)
                <Input
                    id="sodium"
                    placeholder="Natriy (Na⁺) darajasi (mmol/L)"
                    type="number"
                    value={sodium}
                    onChange={(e) => setSodium(e.target.value)}
                    className="input-field" // CSS klassi
                /></label>
            <label htmlFor="chloride">Xlorid (Cl⁻) darajasi (mmol/L)
                <Input
                    id="chloride"
                    placeholder="Xlorid (Cl⁻) darajasi (mmol/L)"
                    type="number"
                    value={chloride}
                    onChange={(e) => setChloride(e.target.value)}
                    className="input-field" // CSS klassi
                /></label>
            <label htmlFor="bicarbonate">Bikarbonat (HCO₃⁻) darajasi (mmol/L)
                <Input
                    id="bicarbonate"
                    placeholder="Bikarbonat (HCO₃⁻) darajasi (mmol/L)"
                    type="number"
                    value={bicarbonate}
                    onChange={(e) => setBicarbonate(e.target.value)}
                    className="input-field" // CSS klassi
                /></label>
            <Button type="primary" onClick={calculateUAG} style={{ marginTop: '10px' }}>
                Hisoblash
            </Button>
            {result !== null && (
                <Text style={{ display: 'block', marginTop: '10px' }}>
                    Urine Anion Gap: <strong>{result.toFixed(2)}</strong> mmol/L
                </Text>
            )}

        </div>
    );
};

export default UrineAnionGap;
