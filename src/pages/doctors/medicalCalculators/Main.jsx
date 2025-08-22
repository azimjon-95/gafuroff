import React, { useState } from "react";
import { PiSealQuestionBold } from "react-icons/pi";
import { Layout, Menu, theme } from "antd";
import { FaHeartbeat } from "react-icons/fa";
import { GiBrainLeak } from "react-icons/gi";
import { MdBloodtype } from "react-icons/md";
import { GiBrainFreeze } from "react-icons/gi";
import { PiAddressBook } from "react-icons/pi";
import {
  FaChevronDown,
  FaChevronRight,
  FaStethoscope
} from 'react-icons/fa';
import {
  MdCalculate,
  MdLocalHospital
} from 'react-icons/md';

import MIDASScale from "./boshOgrigi/MIDASScale";
import FunctionalIndependenceForm from "./ichkiMiyaQonquyilishi/functionalIndependence/FunctionalIndependenceForm";
import HemorrhageVolumeCalculator from "./ichkiMiyaQonquyilishi/hemorrhageVolumeCalculator/HemorrhageVolumeCalculator";
import RasseyannyySkleroz from "./rasseyannyySkleroz/RasseyannyySkleroz";
import HuntHessScale from "./subaraknoidQonKetishi/HessShkalasi";
import FOURComaScale from "./subaraknoidQonKetishi/FOURComaScale";
import GlasgowComaScale from "./subaraknoidQonKetishi/GlasgowComaScale";
import RASSScale from "./subaraknoidQonKetishi/rassCale";

import ABCD2Calculator from "../../../components/CardiovascularRiskCalculatot/abcd2/ABCD2Calculator";
import ASCVDCalculator from "../../../components/CardiovascularRiskCalculatot/ascvdc/Ascvdc";
import CHA2DS2VAScCalculator from "../../../components/CardiovascularRiskCalculatot/cha2ds2/VASC";
import HASBLEDCalculator from "../../../components/CardiovascularRiskCalculatot/has-bled/Has-bled";
import RankinScaleForm from "../../../components/CardiovascularRiskCalculatot/rankinScaleForm/RankinScaleForm";
import ScoreScaleFormWrapper from "../../../components/CardiovascularRiskCalculatot/score/Score";
import StrokeForm from "../../../components/CardiovascularRiskCalculatot/strokeForm/StrokeForm";
import NIHSSForm from "../../../components/CardiovascularRiskCalculatot/insultShkalasi/InsultShkalasi";
import CreatinineClearanceCalculator from "../../../components/CardiovascularRiskCalculatot/clearance/Clearance";
import './style.css';


const menuItems = [
  {
    key: "sub1",
    icon: <FaHeartbeat />,
    label: "Ishemik insult / yurak-qon tomir kasalliklarining oldini olish",
    children: [
      { key: "1", label: "Qon tomir shkalasi", component: <NIHSSForm /> },
      {
        key: "2",
        label: "CHA2DS2-VASC shkalasi",
        component: <CHA2DS2VAScCalculator />,
      },
      {
        key: "3",
        label: "HAS-BLED shkalasi",
        component: <HASBLEDCalculator />,
      },
      { key: "4", label: "ABCD2 shkalasi", component: <ABCD2Calculator /> },
      {
        key: "5",
        label: "GFR va kreatinin klirensi",
        component: <CreatinineClearanceCalculator />,
      },
      {
        key: "6",
        label: "Rt-PA dozasini hisoblash",
        component: <StrokeForm />,
      },
      { key: "7", label: "Rankin shkalasi", component: <RankinScaleForm /> },
      {
        key: "8",
        label: "SCORE shkalasi",
        component: <ScoreScaleFormWrapper />,
      },
      // { key: '8.5', label: 'SCORE 2-OP shkalasi', component: <CardioRiskCalculator /> },
    ],
  },
  {
    key: "sub2",
    icon: <GiBrainLeak />,
    label: "Miyaga qon ketishi",
    children: [
      {
        key: "9",
        label: "Ichki miya qon ketishdan",
        component: <FunctionalIndependenceForm />,
      },
      {
        key: "10",
        label: "Ichki Parenximatoz",
        component: <HemorrhageVolumeCalculator />,
      },
    ],
  },
  {
    key: "sub3",
    icon: <MdBloodtype />,
    label: "Subaraknoid qon ketishi",
    children: [
      { key: "11", label: "Hant-Hess Shkalasi ", component: <HuntHessScale /> },
    ],
  },
  {
    key: "sub4",
    icon: <GiBrainFreeze />,
    label: "Ong darajasi",
    children: [
      {
        key: "12",
        label: "Glazgo koma shkalasi",
        component: <GlasgowComaScale />,
      },
      { key: "13", label: "FOUR koma shkalasi", component: <FOURComaScale /> },
      { key: "14", label: "RASS shkalasi ", component: <RASSScale /> },
    ],
  },
  {
    key: "sub5",
    icon: <PiAddressBook />,
    label: "Bosh og'rig'i",
    children: [
      { key: "15", label: "MIDASS shkalasi", component: <MIDASScale /> },
    ],
  },
  {
    key: "sub6",
    icon: <PiSealQuestionBold />,
    label: "Ko'p skleroz",
    children: [
      { key: "16", label: "EDSS shkalasi", component: <RasseyannyySkleroz /> },
      { key: "114", label: "Component B5", component: <ASCVDCalculator /> },
    ],
  },
];


const MedicalCalculators = () => {
  const [openSections, setOpenSections] = useState({ cardio: true });
  const [selectedItem, setSelectedItem] = useState('nihss');
  const [activeComponent, setActiveComponent] = useState(
    menuItems[0].children[0].component
  );

  const toggleSection = (sectionKey) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const selectItem = (itemKey, component) => {
    setSelectedItem(itemKey);
    setActiveComponent(component);
  };

  return (
    <div className="medical-layoutcalc">
      <div className="medical-sidebarcalc">
        <div className="sidebar-headercalc">
          <div className="header-iconcalc">
            <MdLocalHospital />
          </div>
          <h1>Tibbiy Kalkulyatorlar</h1>
          <div className="header-pulse"></div>
        </div>

        <div className="sidebar-menucalc">
          {menuItems.map((section) => (
            <div key={section.key} className="menu-sectioncalc">
              <div
                className={`section-headercalc ${openSections[section.key] ? 'active' : ''}`}
                onClick={() => toggleSection(section.key)}
                style={{ background: section.gradient }}
              >
                <div className="section-icon">
                  {section.icon}
                </div>
                <span className="section-label">{section.label}</span>
                <div className="section-toggle">
                  {openSections[section.key] ? <FaChevronDown /> : <FaChevronRight />}
                </div>
              </div>

              {openSections[section.key] && (
                <div className="section-children">
                  {section.children.map((child) => (
                    <div
                      key={child.key}
                      className={`menu-item ${selectedItem === child.key ? 'selected' : ''}`}
                      onClick={() => selectItem(child.key, child.component)}
                    >
                      <div className="item-icon">
                        <MdCalculate />
                      </div>
                      <span className="item-label">{child.label}</span>
                      <div className="item-indicator"></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="medical-content">
        {activeComponent}
      </div>
    </div>
  );
};


export default MedicalCalculators;
