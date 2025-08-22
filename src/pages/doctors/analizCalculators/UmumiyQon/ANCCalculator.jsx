import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

const { Text } = Typography;

function ANCCalculator() {
    const [wbc, setWBC] = useState('');
    const [neutrophils, setNeutrophils] = useState('');
    const [bands, setBands] = useState('');
    const [anc, setANC] = useState(null);

    const calculateANC = () => {
        if (!wbc || !neutrophils || !bands) {
            alert('Iltimos, barcha maydonlarni to‘ldiring.');
            return;
        }

        const ancValue = (wbc * (parseFloat(neutrophils) + parseFloat(bands))) / 100;
        setANC(ancValue.toFixed(2)); // Natijani ikki o'nlik raqamga to'g'rilash
    };

    return (
        <div className="calculator-container">
            <h2>Absolute Neutrophil Count (ANC) Kalkulyatori</h2>
            <Text>Bu kalkulyator yordamida bemorning oq qon hujayralari soni va neytrofiller foizidan Absolute Neutrophil Count (ANC) ni hisoblash mumkin.</Text>
            <Text strong style={{ display: 'block', marginTop: '20px' }}>Formula:</Text>
            <Text style={{ display: 'block', marginBottom: '20px' }}>
                ANC = WBC × (Neytrofiller % + Bandlar %) / 100
            </Text>

            <Text>WBC (Oq qon hujayralari soni, cells/µL):</Text>
            <Input
                className="input-field"
                type="number"
                value={wbc}
                onChange={(e) => setWBC(e.target.value)}
                placeholder="Masalan: 5000"
                style={{ marginBottom: '10px' }}
            />

            <Text>Neytrofiller (%):</Text>
            <Input
                className="input-field"
                type="number"
                value={neutrophils}
                onChange={(e) => setNeutrophils(e.target.value)}
                placeholder="Masalan: 60"
                style={{ marginBottom: '10px' }}
            />

            <Text>Bandlar (%):</Text>
            <Input
                className="input-field"
                type="number"
                value={bands}
                onChange={(e) => setBands(e.target.value)}
                placeholder="Masalan: 5"
                style={{ marginBottom: '10px' }}
            />

            <Button type="primary" onClick={calculateANC} style={{ marginTop: '10px' }}>
                Hisoblash
            </Button>

            {anc && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Absolute Neutrophil Count (ANC): {anc} cells/µL</h3>
                </div>
            )}
        </div>
    );
}

export default ANCCalculator;
