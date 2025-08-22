import React, { useState } from 'react';
import '../BioKimyoviy/style.css'; // CSS faylini import qilish

function RDWCalculator() {
    const [standardDeviation, setStandardDeviation] = useState('');
    const [meanCellVolume, setMeanCellVolume] = useState('');
    const [rdw, setRDW] = useState(null);

    const calculateRDW = () => {
        if (!standardDeviation || !meanCellVolume) {
            alert('Iltimos, barcha maydonlarni to‘ldiring.');
            return;
        }

        const calculatedRDW = (parseFloat(standardDeviation) / parseFloat(meanCellVolume)) * 100;
        setRDW(calculatedRDW.toFixed(2)); // Natijani ikki o'nlik raqamga to'g'rilash
    };

    return (
        <div className="calculator-container">
            <h2>Red Cell Distribution Width (RDW) Kalkulyatori</h2>
            <p style={{ color: 'gray', marginBottom: '10px' }}>
                Formula: RDW = (Standart og'ish (femtolitr) / O'rtacha qizil qon hujayralari hajmi (MCV) (femtolitr)) * 100
            </p>
            <p>
                Ushbu kalkulyator yordamida siz standart og'ish va o'rtacha qizil qon hujayralari hajmini kiritib, RDW ni hisoblash imkoniyatiga ega bo'lasiz. RDW qonning turli hajmdagi qizil qon hujayralarining nisbati bo'lib, anemiya va boshqa qon kasalliklarini baholashda muhim ko'rsatkich hisoblanadi.
            </p>

            <label htmlFor="standardDeviation" >
                Standart og'ish (femtolitr):

                <input
                    id="standardDeviation"
                    className="input-field"
                    type="number"
                    value={standardDeviation}
                    onChange={(e) => setStandardDeviation(e.target.value)}
                    placeholder="Masalan: 15"
                />
            </label>
            <label htmlFor="meanCellVolume" >
                O'rtacha qizil qon hujayralari hajmi (MCV) (femtolitr):

                <input
                    id="meanCellVolume"
                    className="input-field"
                    type="number"
                    value={meanCellVolume}
                    onChange={(e) => setMeanCellVolume(e.target.value)}
                    placeholder="Masalan: 90"
                />
            </label>
            <button onClick={calculateRDW}>Hisoblash</button>

            {rdw !== null && (
                <h3>Qizil qon hujayralari taqsimoti kengligi (RDW): {rdw}%</h3>
            )}
        </div>
    );
}

export default RDWCalculator;
