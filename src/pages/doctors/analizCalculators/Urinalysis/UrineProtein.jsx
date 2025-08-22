import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish


const { Text } = Typography;

const UrineProtein = () => {
    const [urineProtein, setUrineProtein] = useState(''); // Siydik Oqsil darajasi
    const [urineCreatinine, setUrineCreatinine] = useState(''); // Siydik Kreatinin darajasi
    const [result, setResult] = useState(null); // Natija

    const calculateUPrCr = () => {
        // Agar kreatinin nolga teng bo'lmasa
        if (urineCreatinine !== '0' && urineCreatinine !== '') {
            const ratio = parseFloat(urineProtein) / parseFloat(urineCreatinine);
            setResult(ratio);
        } else {
            setResult("Kreatinin nolga teng bo'lishi mumkin emas.");
        }
    };

    return (
        <div className="calculator-container" >
            <h2>Urine Protein/Creatinine Ratio (UPr/Cr) Kalkulyatori</h2>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                Ushbu kalkulyator siydikdagi oqsil va kreatinin nisbatini hisoblash uchun mo'ljallangan.
                Bu nisbat siydikdagi oqsilning miqdorini aniqlashda muhimdir.
            </Text>
            <Text type="secondary" style={{ display: 'block', marginBottom: '10px' }}>
                Formula: UPr/Cr = Siydik Oqsil / Siydik Kreatinin
            </Text>

            <label htmlFor="urineProtein">Siydik Oqsil darajasi (g/L)
                <Input
                    id="urineProtein"
                    placeholder="Siydik Oqsil darajasi (g/L)"
                    type="number"
                    value={urineProtein}
                    onChange={(e) => setUrineProtein(e.target.value)}
                    className="input-field" // CSS klassi
                /></label>
            <label htmlFor="urineCreatinine">Siydik Kreatinin darajasi (mg/dL)
                <Input
                    id="urineCreatinine"
                    placeholder="Siydik Kreatinin darajasi (mg/dL)"
                    type="number"
                    value={urineCreatinine}
                    onChange={(e) => setUrineCreatinine(e.target.value)}
                    className="input-field" // CSS klassi
                /></label>
            <Button type="primary" onClick={calculateUPrCr} style={{ marginTop: '10px' }}>
                Hisoblash
            </Button>
            {result !== null && (
                <Text style={{ display: 'block', marginTop: '10px' }}>
                    Urine Protein/Creatinine Ratio (UPr/Cr): <strong>{result.toFixed(2)}</strong>
                </Text>
            )}
        </div>
    );
};

export default UrineProtein;
