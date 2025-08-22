import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const { Text } = Typography;

const UrineAlbumin = () => {
    const [urineAlbumin, setUrineAlbumin] = useState(''); // Siydik albomin
    const [urineCreatinine, setUrineCreatinine] = useState(''); // Siydik kreatinin
    const [result, setResult] = useState(null); // Natija

    const calculateACR = () => {
        // ACR hisoblash
        if (urineCreatinine !== '0' && urineCreatinine !== '') {
            const ratio = urineAlbumin / urineCreatinine; // ACR hisoblash
            setResult(ratio);
        } else {
            setResult("Kreatinin nolga teng bo'lishi mumkin emas.");
        }
    };

    return (
        <div className="calculator-container" >

            <h2>Urine Albumin/Creatinine Ratio (ACR) Kalkulyatori</h2>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                Ushbu kalkulyator siydikdagi albomin va kreatinin nisbati (ACR) ni hisoblash uchun mo'ljallangan. ACR siydikdagi protein miqdorini baholashda muhim ahamiyatga ega bo'lib, bu sog'liq holatini aniqlashda yordam beradi.
            </Text>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                Formula: ACR = Siydik Albomin / Siydik Kreatinin
            </Text>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                MDRD formulasi quyidagicha ko‘rinadi:
                <br />
                <strong>eGFR = 186 × (Kreatinin^(-1.154)) × (Yosh^(-0.203)) × (0.742, agar ayol bo'lsa) × (1.210, agar qora tanli bo'lsa)</strong>
            </Text>

            <label htmlFor="urineAlbumin">Siydik Albomin darajasi (mg/dL)</label>
            <Input
                id="urineAlbumin"
                placeholder="Siydik Albomin darajasi (mg/dL)"
                type="number"
                value={urineAlbumin}
                onChange={(e) => setUrineAlbumin(e.target.value)}
                className="input-field" // CSS klassi
            />
            <label htmlFor="urineCreatinine">Siydik Kreatinin darajasi (mg/dL)</label>
            <Input
                id="urineCreatinine"
                placeholder="Siydik Kreatinin darajasi (mg/dL)"
                type="number"
                value={urineCreatinine}
                onChange={(e) => setUrineCreatinine(e.target.value)}
                className="input-field" // CSS klassi
            />
            <Button type="primary" onClick={calculateACR} style={{ marginTop: '10px' }}>
                Hisoblash
            </Button>
            {result !== null && (
                <Text style={{ display: 'block', marginTop: '10px' }}>
                    Urine Albumin/Creatinine Ratio (ACR): <strong>{result.toFixed(2)}</strong>
                </Text>
            )}
        </div>
    );
};

export default UrineAlbumin;
