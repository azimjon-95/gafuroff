import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import '../BioKimyoviy/style.css';


const { Text } = Typography;

const MCVCalculator = () => {
    const [hematocrit, setHematocrit] = useState('');
    const [rbcCount, setRBCCount] = useState('');
    const [mcv, setMCV] = useState(null);

    const calculateMCV = () => {
        if (!hematocrit || !rbcCount) {
            alert('Iltimos, barcha maydonlarni to‘ldiring.');
            return;
        }

        const calculatedMCV = (parseFloat(hematocrit) / parseFloat(rbcCount)) * 10;
        setMCV(calculatedMCV.toFixed(2)); // Natijani ikki o'nlik raqamga to'g'rilash
    };

    return (
        <div className="calculator-container" style={{ padding: '20px' }}>
            <h2>Mean Corpuscular Volume (MCV) Kalkulyatori</h2>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                Formula: MCV (fL) = (Gematokrit (%) / Qizil qon hujayralari soni (million/µL)) × 10
            </Text>
            <Text>
                Ushbu kalkulyator yordamida siz gematokrit va qizil qon hujayralari sonini kiritib, MCV ni hisoblash imkoniyatiga ega bo'lasiz. MCV — qizil qon hujayralarining o'rtacha hajmini o'lchaydigan ko'rsatkichdir.
            </Text>

            <Input
                className="input-field"
                placeholder="Gematokrit (%)"
                type="number"
                value={hematocrit}
                onChange={(e) => setHematocrit(e.target.value)}
            />
            <Input
                className="input-field"
                placeholder="Qizil qon hujayralari soni (million/µL)"
                type="number"
                value={rbcCount}
                onChange={(e) => setRBCCount(e.target.value)}
            />
            <Button type="primary" onClick={calculateMCV} style={{ marginTop: '10px' }}>
                Hisoblash
            </Button>
            {mcv !== null && (
                <Text style={{ display: 'block', marginTop: '10px' }}>
                    O'rtacha qizil qon hujayralar hajmi: <strong>{mcv} fL</strong>
                </Text>
            )}
        </div>
    );
};

export default MCVCalculator;

