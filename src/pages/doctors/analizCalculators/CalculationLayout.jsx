import React, { useState, useEffect } from "react";
import { FaVial, FaSearch, FaTimes } from "react-icons/fa";
import { GiDroplets, GiKidneys, GiStomach } from "react-icons/gi";
import './style.css';

//=========================Biohimik=qon=taxlili==================================
import BMICalculator from "./BioKimyoviy/BMICalculator";
import HASBLEDCalculator from "./BioKimyoviy/HASBLEDCalculator";
import ApacheIICalculator from "./BioKimyoviy/ApacheIICalculator";
import AAGradientCalculator from "./BioKimyoviy/AAGradientCalculator";
import AnionGapCalculator from "./BioKimyoviy/AnionGapCalculator";
import BSACalculator from "./BioKimyoviy/BSACalculator";
import BicarbonateDeficitCalculator from "./BioKimyoviy/BicarbonateDeficitCalculator";
import CHA2DS2VAScCalculator from "./BioKimyoviy/CHA2DS2VAScCalculator";
import CalvertCalculator from "./BioKimyoviy/CalvertCalculator";
import ChildPughCalculator from "./BioKimyoviy/ChildPughCalculator";
import CorrectedCalciumCalculator from "./BioKimyoviy/CorrectedCalciumCalculator";
import CorrectedPhenytoinCalculator from "./BioKimyoviy/CorrectedPhenytoinCalculator";
import CorrectedSodiumCalculator from "./BioKimyoviy/CorrectedSodiumCalculator";
import CreatinineClearanceCalculator from "./BioKimyoviy/CreatinineClearanceCalculator";
import DdimerAdjustedForAgeCalculator from "./BioKimyoviy/DdimerAdjustedForAgeCalculator";
import FENaCalculator from "./BioKimyoviy/FENaCalculator";
import GICalculator from "./BioKimyoviy/GICalculator";
import MAPCalculator from "./BioKimyoviy/MAPCalculator";
import MDRDCalculator from "./BioKimyoviy/MDRDCalculator";
import OICalculator from "./BioKimyoviy/OICalculator";
import ParklandCalculator from "./BioKimyoviy/ParklandCalculator";
import SodiumDeficitCalculator from "./BioKimyoviy/SodiumDeficitCalculator";
import TIBCCalculator from "./BioKimyoviy/TIBCCalculator";
import TransferrinSaturationCalculator from "./BioKimyoviy/TransferrinSaturationCalculator";
import UrineAnionGapCalculator from "./BioKimyoviy/UrineAnionGapCalculator.jsx";
import VasopressorDoseCalculator from "./BioKimyoviy/VasopressorDoseCalculator";
import WaterDeficitCalculator from "./BioKimyoviy/WaterDeficitCalculator";
import WestNomogramCalculator from "./BioKimyoviy/WestNomogramCalculator";
import LDLCholesterolCalculator from "./BioKimyoviy/calculateLDL";
import EgfrCalculator from "./BioKimyoviy/eGFRCalculator";
import QSOFACalculator from "./BioKimyoviy/qSOFACalculator";

//==========================Umumiy=qon=taxlili=================================
import ANCCalculator from "./UmumiyQon/ANCCalculator";
import MCHCCalculator from "./UmumiyQon/MCHCCalculator";
import MCHCalculator from "./UmumiyQon/MCHCalculator";
import MCVCalculator from "./UmumiyQon/MCVCalculator";
import NLRCalculator from "./UmumiyQon/NLRCalculator";
import PLRCalculator from "./UmumiyQon/PLRCalculator";
import RDWCalculator from "./UmumiyQon/RDWCalculator";
import RPICalculator from "./UmumiyQon/RPICalculator";

//==========================Peshob=taxlili=================================
import CalciumCalculator from "./Urinalysis/CalciumCalculator";
import CalciumOxalateSaturation from "./Urinalysis/CalciumOxalateSaturation";
import CholineExcretionCalculator from "./Urinalysis/CholineExcretionCalculator";
import CreatinineClearance from "./Urinalysis/CreatinineClearance";
import CystatinCCalculator from "./Urinalysis/CystatinCCalculator";
import FENaCalculatorUrine from "./Urinalysis/FENaCalculator";
import FEUreaCalculator from "./Urinalysis/FEUreaCalculator";
import MagnesiumCreatinineRatioCalculator from "./Urinalysis/MagnesiumCreatinineRatioCalculator";
import MicroalbuminuriaCalculation from "./Urinalysis/MicroalbuminuriaCalculation";
import NitrateNitriteTestCalculator from "./Urinalysis/NitrateNitriteTestCalculator";
import PotassiumCreatinineRatioCalculator from "./Urinalysis/PotassiumCreatinineRatioCalculator";
import ProteinExcretionCalculator from "./Urinalysis/ProteinExcretionCalculator";
import SodiumExcretionCalculator from "./Urinalysis/SodiumExcretionCalculator";
import UricAcidCalculator from "./Urinalysis/UricAcidCalculator";
import UrineAlbumin from "./Urinalysis/UrineAlbumin";
import UrineAnionGap from "./Urinalysis/UrineAnionGap";
import UrineOutputCalculator from "./Urinalysis/UrineOutputCalculator";
import UrineOsmolality from "./Urinalysis/UrineOsmolality";
import UrineProtein from "./Urinalysis/UrineProtein";
import UrineSpecificGravity from "./Urinalysis/UrineSpecificGravity";
import UUNCalculator from "./Urinalysis/UUNCalculator";

//==========================Axlat=taxlili=================================
import FecalCalprotectinCalculator from "./WasteAnalysis/FecalCalprotectinCalculator";
import FecalChlorideCalculator from "./WasteAnalysis/FecalChlorideCalculator";
import FecalElastaseCalculator from "./WasteAnalysis/FecalElastaseCalculator";
import FecalFatCalculator from "./WasteAnalysis/FecalFatCalculator";
import FecalLactoferrinCalculator from "./WasteAnalysis/FecalLactoferrinCalculator";
import FecalLeukocytesCalculator from "./WasteAnalysis/FecalLeukocytesCalculator";
import FecalMagnesiumCalculator from "./WasteAnalysis/FecalMagnesiumCalculator";
import FecalOsmolalityCalculator from "./WasteAnalysis/FecalOsmolalityCalculator";
import FecalPHCalculator from "./WasteAnalysis/FecalPHCalculator";
import FecalPotassiumCalculator from "./WasteAnalysis/FecalPotassiumCalculator";
import FecalProteinLossCalculator from "./WasteAnalysis/FecalProteinLossCalculator";
import FecalReducingSugarsCalculator from "./WasteAnalysis/FecalReducingSugarsCalculator";
import FecalSodiumCalculator from "./WasteAnalysis/FecalSodiumCalculator";
import FOBTCalculator from "./WasteAnalysis/FOBTCalculator";
import StoolOsmoticGapCalculator from "./WasteAnalysis/StoolOsmoticGapCalculator";
import StoolReducingSubstancesCalculator from "./WasteAnalysis/StoolReducingSubstancesCalculator";
import StoolUrobilinogenCalculator from "./WasteAnalysis/StoolUrobilinogenCalculator";



const items2 = [
    {
        key: "sub1",
        icon: <FaVial />,
        label: "Biohimik Qon Tahlil",
        children: [
            {
                key: "1",
                label: "BMI Kalkulyator",
                component: <BMICalculator />
            },
            {
                key: "2",
                label: "HAS-BLED",
                component: <HASBLEDCalculator />,
            },
            {
                key: "3",
                label: "APACHE II",
                component: <ApacheIICalculator />,
            },
            {
                key: "4",
                label: "AA Gradus",
                component: <AAGradientCalculator />
            },
            {
                key: "5",
                label: "Anion Gap",
                component: <AnionGapCalculator />,
            },
            {
                key: "6",
                label: "BSA (Tana Yuzasi)",
                component: <BSACalculator />,
            },
            {
                key: "7",
                label: "Bikarbonat Yetishmovchiligi",
                component: <BicarbonateDeficitCalculator />
            },
            {
                key: "8",
                label: "CHA2DS2-VASc",
                component: <CHA2DS2VAScCalculator />,
            },
            {
                key: '9',
                label: 'Calvert Formula',
                component: <CalvertCalculator />
            },
            {
                key: '10',
                label: 'Child-Pugh',
                component: <ChildPughCalculator />
            },
            {
                key: '11',
                label: 'Korreksiya Qilingan Kalsiy',
                component: <CorrectedCalciumCalculator />
            },
            {
                key: '12',
                label: 'Korreksiya Qilingan Fenitoin',
                component: <CorrectedPhenytoinCalculator />
            },
            {
                key: '13',
                label: 'Korreksiya Qilingan Natriy',
                component: <CorrectedSodiumCalculator />
            },
            {
                key: '14',
                label: 'Kreatinin Klirensi',
                component: <CreatinineClearanceCalculator />
            },
            {
                key: '15',
                label: 'D-dimer (Yoshga Mos)',
                component: <DdimerAdjustedForAgeCalculator />
            },
            {
                key: '16',
                label: 'Natriy Fraksiya Ajralishi',
                component: <FENaCalculator />
            },
            {
                key: '17',
                label: 'Fraksiya Exkresiyasi (Mochevina)',
                component: <FEUreaCalculator />
            },
            {
                key: '18',
                label: 'Glisemik Indeks',
                component: <GICalculator />
            },
            {
                key: '19',
                label: 'MAP (O‘rtacha Arterial Bosim)',
                component: <MAPCalculator />
            },
            {
                key: '20',
                label: 'Buyrak Filtratsiyasi',
                component: <MDRDCalculator />
            },
            {
                key: '21',
                label: 'Kislorod Yetkazib Berish',
                component: <OICalculator />
            },
            {
                key: '22',
                label: 'Parkland Formula',
                component: <ParklandCalculator />
            },
            {
                key: '23',
                label: 'Natriy Yetishmovchiligi (Giponatriemiya)',
                component: <SodiumDeficitCalculator />
            },
            {
                key: '24',
                label: 'TIBC',
                component: <TIBCCalculator />
            },
            {
                key: '25',
                label: 'Transferrin Saturatsiyasi',
                component: <TransferrinSaturationCalculator />
            },
            {
                key: '26',
                label: 'Mochadagi Anion Gap',
                component: <UrineAnionGapCalculator />
            },
            {
                key: '27',
                label: 'Vazopressor Dozasi',
                component: <VasopressorDoseCalculator />
            },
            {
                key: '28',
                label: 'Suyuqlik Yetishmovchiligi (Gipernatriemiya)',
                component: <WaterDeficitCalculator />
            },
            {
                key: '29',
                label: 'West Nomogram',
                component: <WestNomogramCalculator />
            },
            {
                key: '30',
                label: 'LDL Xolesterin',
                component: <LDLCholesterolCalculator />
            },
            {
                key: '31',
                label: 'eGFR (Buyrak Filtratsiyasi)',
                component: <EgfrCalculator />
            },
            {
                key: '32',
                label: 'qSOFA',
                component: <QSOFACalculator />
            },
        ],
    },
    {
        key: "sub2",
        icon: <GiDroplets />,
        label: "Umumiy Qon Tahlil",
        children: [
            {
                key: "33",
                label: "Neutrofillar Soni",
                component: <ANCCalculator />,
            },
            {
                key: "34",
                label: "O‘rtacha Gemoglobin Kontsentratsiyasi",
                component: <MCHCCalculator />,
            },
            {
                key: "35",
                label: "O‘rtacha Gemoglobin Miqdori",
                component: <MCHCalculator />,
            },
            {
                key: "36",
                label: "O‘rtacha Eritrotsit Hajmi",
                component: <MCVCalculator />,
            },
            {
                key: "37",
                label: "Neutrofil/Limfotsit Nisbati",
                component: <NLRCalculator />,
            },
            {
                key: "38",
                label: "Trombosit/Limfotsit Nisbati",
                component: <PLRCalculator />,
            },
            {
                key: "39",
                label: "Eritrotsitlar Kengligi",
                component: <RDWCalculator />,
            },
            {
                key: "40",
                label: "Retikulosit Ishlab Chiqarish Indeksi",
                component: <RPICalculator />,
            },
        ],
    },
    {
        key: "sub3",
        icon: <GiKidneys />,
        label: "Peshob Tahlili",
        children: [
            {
                key: "41",
                label: "Kalsiy/Kreatinin Nisbati",
                component: <CalciumCalculator />
            },
            {
                key: "42",
                label: "Kalsiy Oksalat To‘yinganlik",
                component: <CalciumOxalateSaturation />
            },
            {
                key: "43",
                label: "Xolin Chiqarilishi",
                component: <CholineExcretionCalculator />
            },
            {
                key: "44",
                label: "Kreatinin Klirensi",
                component: <CreatinineClearance />
            },
            {
                key: "45",
                label: "Cystatin C",
                component: <CystatinCCalculator />
            },
            {
                key: "46",
                label: "Natriyning Fraksion Ajralishi",
                component: <FENaCalculatorUrine />
            },
            {
                key: "47",
                label: "Magniy/Kreatinin Nisbati",
                component: <MagnesiumCreatinineRatioCalculator />
            },
            {
                key: "48",
                label: "Microalbuminuriya",
                component: <MicroalbuminuriaCalculation />
            },
            {
                key: "49",
                label: "Nitrat/Nitrit Testi",
                component: <NitrateNitriteTestCalculator />
            },
            {
                key: "50",
                label: "Kaliy/Kreatinin Nisbati",
                component: <PotassiumCreatinineRatioCalculator />
            },
            {
                key: "51",
                label: "Oqsil Chiqarilishi",
                component: <ProteinExcretionCalculator />
            },
            {
                key: "52",
                label: "Natriy Chiqarilishi",
                component: <SodiumExcretionCalculator />
            },
            {
                key: "53",
                label: "Urik Kislota",
                component: <UricAcidCalculator />
            },
            {
                key: "54",
                label: "Albumin",
                component: <UrineAlbumin />
            },
            {
                key: "55",
                label: "Anion Bo‘shliq",
                component: <UrineAnionGap />
            },
            {
                key: "56",
                label: "Peshob Hajmi",
                component: <UrineOutputCalculator />
            },
            {
                key: "57",
                label: "Osmolyarlik",
                component: <UrineOsmolality />
            },
            {
                key: "58",
                label: "Oqsil/Kreatinin Nisbati",
                component: <UrineProtein />
            },
            {
                key: "59",
                label: "Xususiy Og‘irlik",
                component: <UrineSpecificGravity />
            },
            {
                key: "60",
                label: "Urea Azoti",
                component: <UUNCalculator />
            },
        ],
    },
    {
        key: "sub4",
        icon: <GiStomach />,  // Axlat tahliliga mos keluvchi ikon
        label: "Najosat Tahlili",
        children: [
            {
                key: "61",
                label: "Kalprotektin",
                component: <FecalCalprotectinCalculator />,
            },
            {
                key: "62",
                label: "Xlorid",
                component: <FecalChlorideCalculator />,
            },
            {
                key: "63",
                label: "Elastaza",
                component: <FecalElastaseCalculator />,
            },
            {
                key: "64",
                label: "Yog‘",
                component: <FecalFatCalculator />,
            },
            {
                key: "65",
                label: "Laktoferrin",
                component: <FecalLactoferrinCalculator />,
            },
            {
                key: "66",
                label: "Leykotsitlar",
                component: <FecalLeukocytesCalculator />,
            },
            {
                key: "67",
                label: "Magniy",
                component: <FecalMagnesiumCalculator />,
            },
            {
                key: "68",
                label: "Osmolyarlik",
                component: <FecalOsmolalityCalculator />,
            },
            {
                key: "69",
                label: "pH",
                component: <FecalPHCalculator />,
            },
            {
                key: "70",
                label: "Kaliy",
                component: <FecalPotassiumCalculator />,
            },
            {
                key: "71",
                label: "Oqsil Yo'qotish",
                component: <FecalProteinLossCalculator />,
            },
            {
                key: "72",
                label: "Qaytariluvchi Shakarlar",
                component: <FecalReducingSugarsCalculator />,
            },
            {
                key: "73",
                label: "Natriy",
                component: <FecalSodiumCalculator />,
            },
            {
                key: "74",
                label: "Yashirin Qon Testi (FOBT)",
                component: <FOBTCalculator />,
            },
            {
                key: "75",
                label: "Osmotik Bo‘shliq",
                component: <StoolOsmoticGapCalculator />,
            },
            {
                key: "76",
                label: "Qaytariluvchi Moddalar",
                component: <StoolReducingSubstancesCalculator />,
            },
            {
                key: "77",
                label: "Urobilinogen",
                component: <StoolUrobilinogenCalculator />,
            },
        ],
    }

];


const CalculationLayout = () => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedKey, setSelectedKey] = useState("1");
    const [siderWidth, setSiderWidth] = useState(300);
    const [isResizing, setIsResizing] = useState(false);
    const [expandedSections, setExpandedSections] = useState([""]);

    const [selectedComponent, setSelectedComponent] = useState(
        items2
            .flatMap((item) => item.children)
            .find((child) => child.key === "1")?.component
    );

    const handleMenuClick = (item) => {
        setSelectedKey(item.key);
        setSelectedComponent(item.component);
    };

    const handleSectionToggle = (sectionKey) => {
        setExpandedSections(prev =>
            prev.includes(sectionKey)
                ? prev.filter(key => key !== sectionKey)
                : [...prev, sectionKey]
        );
    };

    const getSectionClass = (sectionKey) => {
        switch (sectionKey) {
            case 'sub1': return 'bloodChemistrySection';
            case 'sub2': return 'generalBloodSection';
            case 'sub3': return 'urinalysisSection';
            case 'sub4': return 'stoolAnalysisSection';
            default: return '';
        }
    };

    const filteredComponents = items2
        .flatMap(item => item.children)
        .filter(child => child.label.toLowerCase().includes(searchValue.toLowerCase()));

    const handleReset = () => {
        setSearchValue('');
    };

    const handleMouseDown = (e) => {
        setIsResizing(true);
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (isResizing) {
            const newWidth = e.clientX;
            if (newWidth > 500) {
                setSiderWidth(500);
            } else if (newWidth < 250) {
                setSiderWidth(250);
            } else {
                setSiderWidth(newWidth);
            }
        }
    };

    const handleMouseUp = () => {
        setIsResizing(false);
    };

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    return (
        <div className="medicalLabCalculationContainer">
            <div style={{ display: 'flex', height: '100vh' }}>
                {/* Sidebar */}
                <div
                    className="medicalLabSidebarWrapper"
                    style={{ width: siderWidth, minWidth: '250px', maxWidth: '500px' }}
                >
                    {/* Search Container */}
                    <div className="medicalSearchContainer">
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                placeholder="Kalkulyatorlarni qidirish..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 40px 12px 16px',
                                    border: '2px solid #e2e8f0',
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    transition: 'border-color 0.3s ease',
                                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                            />
                            <div style={{
                                position: 'absolute',
                                right: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <FaSearch style={{ color: '#64748b', fontSize: '14px' }} />
                                {searchValue && (
                                    <FaTimes
                                        style={{
                                            color: '#ef4444',
                                            fontSize: '14px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={handleReset}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Menu Container */}
                    <div className="laboratoryMenuContainer">
                        {items2.map((section) => (
                            <div key={section.key}>
                                {/* Section Header */}
                                <div
                                    className={`medicalSectionHeader ${getSectionClass(section.key)}`}
                                    onClick={() => handleSectionToggle(section.key)}
                                >
                                    <div className="medicalSectionIcon">
                                        {section.icon}
                                    </div>
                                    <div className="medicalSectionTitle">
                                        {section.label}
                                    </div>
                                    <div style={{
                                        marginLeft: 'auto',
                                        fontSize: '12px',
                                        transform: expandedSections.includes(section.key) ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s ease'
                                    }}>
                                        ▼
                                    </div>
                                </div>

                                {/* Calculator Items */}
                                {expandedSections.includes(section.key) && (
                                    <div className="medicalCalculatorItemsContainer">
                                        {section.children.map((item) => (
                                            <div
                                                key={item.key}
                                                className={`medicalCalculatorItem ${selectedKey === item.key ? 'selectedCalculatorItem' : ''
                                                    }`}
                                                onClick={() => handleMenuClick(item)}
                                            >
                                                <div className="calculatorItemText">
                                                    {item.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Resize Handle */}
                    <div
                        className="sidebarResizeHandle"
                        onMouseDown={handleMouseDown}
                        style={{ cursor: isResizing ? 'ew-resize' : 'ew-resize' }}
                    />
                </div>

                {/* Main Content Area */}
                <div className="medicalContentArea" style={{ flex: 1 }}>
                    <div style={{ padding: '20px', height: '100%' }}>
                        {searchValue ? (
                            filteredComponents.length > 0 ? (
                                <div>
                                    <h3 style={{
                                        marginBottom: '20px',
                                        color: '#1e293b',
                                        fontSize: '20px',
                                        fontWeight: '600'
                                    }}>
                                        Qidiruv natijalari: "{searchValue}"
                                    </h3>
                                    {filteredComponents.map(item => (
                                        <div key={item.key} style={{ marginBottom: '20px' }}>
                                            {item.component}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="noResultsMessage">
                                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                                    <h3>Hech qanday natija topilmadi</h3>
                                    <p>"{searchValue}" bo'yicha hech qanday kalkulyator topilmadi.</p>
                                    <button
                                        onClick={handleReset}
                                        style={{
                                            padding: '10px 20px',
                                            background: '#3b82f6',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            marginTop: '12px'
                                        }}
                                    >
                                        Qidiruvni tozalash
                                    </button>
                                </div>
                            )
                        ) : (
                            selectedComponent
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CalculationLayout;
