import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import '../BioKimyoviy/style.css';

const { Text } = Typography;

const NLRCalculator = () => {
    const [neutrophilCount, setNeutrophilCount] = useState('');
    const [lymphocyteCount, setLymphocyteCount] = useState('');
    const [nlr, setNLR] = useState(null);

    const calculateNLR = () => {
        if (!neutrophilCount || !lymphocyteCount) {
            alert('Iltimos, barcha maydonlarni to‘ldiring.');
            return;
        }

        const calculatedNLR = parseFloat(neutrophilCount) / parseFloat(lymphocyteCount);
        setNLR(calculatedNLR.toFixed(2)); // Natijani ikki o'nlik raqamga to'g'rilash
    };

    return (
        <div className="calculator-container" style={{ padding: '20px' }}>
            <h2>Neutrophil-to-Lymphocyte Ratio (NLR) Kalkulyatori</h2>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                Formula: NLR = Neytrofillar soni (ming/µL) / Limfotsitlar soni (ming/µL)
            </Text>
            <Text>
                Ushbu kalkulyator yordamida siz neyrofillar va limfotsitlar sonini kiritib, NLR ni hisoblash imkoniyatiga ega bo'lasiz. NLR — qonni tekshirishda muhim ko'rsatkichdir, u immun tizimining holatini baholashda yordam beradi.
            </Text>

            <Input
                className="input-field"
                placeholder="Neytrofillar soni (ming/µL)"
                type="number"
                value={neutrophilCount}
                onChange={(e) => setNeutrophilCount(e.target.value)}
            />
            <Input
                className="input-field"
                placeholder="Limfotsitlar soni (ming/µL)"
                type="number"
                value={lymphocyteCount}
                onChange={(e) => setLymphocyteCount(e.target.value)}
            />
            <Button type="primary" onClick={calculateNLR} style={{ marginTop: '10px' }}>
                Hisoblash
            </Button>
            {nlr !== null && (
                <Text style={{ display: 'block', marginTop: '10px' }}>
                    Neytrofillar-limfotsitlar nisbati: <strong>{nlr}</strong>
                </Text>
            )}
        </div>
    );
};

export default NLRCalculator;
