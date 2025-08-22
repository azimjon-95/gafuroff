import {
  FaStethoscope,
  FaClipboardList,
  FaUserMd,
  FaHospitalUser,
  FaCog,
  FaNotesMedical,
  FaHistory,
  FaBed,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaPlus,
} from "react-icons/fa";
import { FaCalculator } from "react-icons/fa6";
import { FaHeartbeat } from "react-icons/fa";
import { BiTestTube } from "react-icons/bi";
// yoki kerak bo‘lsa boshqa iconlar ham:
import { Moon } from "lucide-react";
import { MdOutlineMedicalServices, MdDashboard } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";

export const menuItems = {
  doctor: [
    {
      icon: <FaStethoscope size={20} />,
      path: "/doctor",
      label: "Shifokor Qabuli",
    },
    {
      icon: <FaBed size={20} />, // Changed to FaBed for treatment/cabins
      path: "/patientsintheward",
      label: "Davolanish",
    },
    {
      icon: <FaHistory size={20} />, // Changed to FaHistory for history
      path: "/history",
      label: "Tarix",
    },
    {
      icon: <FaPlus size={20} />, // Changed to FaHistory for history
      path: "/choose-room-services",
      label: "Davolanish xizmatlarini belgilash",
    },
    {
      icon: <FaPlus size={20} />, // Changed to FaHistory for history
      path: "/patients",
      label: "Davolash",
    },
    {
      path: "/medical-calculators",
      label: "Kardio & Nevrologiya Kalkulyatorlari",
      icon: <FaHeartbeat size={20} />,
    },
    {
      path: "/analis/calculation",
      label: "Laboratoriya Kalkulyatorlari",
      icon: <BiTestTube size={20} />,
    },
    // {
    //   path: "/waiting-list",
    //   label: "Yo'naltirilgan bemorlar",
    //   icon: <FaRegClock size={20} />,
    // },
  ],
  reception: [
    {
      icon: <FaHospitalUser size={20} />,
      path: "/reception",
      label: "Ro'yxatga olish",
    },
    {
      icon: <FaMoneyBillWave />,
      path: "/expense",
      label: "Harajatlar",
    },
    {
      icon: <FaHistory size={20} />, // Changed to FaHistory for medical history
      path: "/history",
      label: "Tarix",
    },
    {
      icon: <FaBed size={20} />, // Changed to FaBed for treatment/cabins
      path: "/cabins",
      label: "Davolanish",
    },
    {
      icon: <FaCalendarCheck size={20} />, // Changed to FaCalendarCheck for attendance
      path: "/attendance",
      label: "Davomat",
    },
    {
      icon: <MdOutlineMedicalServices size={20} />, // Changed to FaCalendarCheck for attendance
      path: "/service",
      label: "Xizmatlar",
    },
    {
      icon: <Moon size={20} />, // Changed to FaCalendarCheck for attendance
      path: "/nightShift",
      label: "Smena Boshqaruvi",
    },
    // {
    //   icon: <FaHistory size={20} />, // Changed to FaHistory for history
    //   path: "/history",
    //   label: "Tarix",
    // },
    {
      icon: <FaCalculator size={20} />,
      path: "/roomServices",
      label: "Xonalar xizmatlari",
    },
    {
      path: "/waiting-list",
      label: "Yo'naltirilgan bemorlar",
      icon: <FaRegClock size={20} />,
    },
  ],
  director: [
    {
      icon: <MdDashboard size={20} />,
      path: "/director",
      label: "Boshqaruv paneli",
    },
    {
      icon: <BsPeopleFill size={20} />,
      path: "/workers",
      label: "Xodimlar",
    },
    {
      icon: <FaCog size={20} />,
      path: "/setting",
      label: "Sozlamalar",
    },
    // {
    //   icon: <FaNotesMedical size={20} />, // Changed to FaNotesMedical for reception department
    //   label: "Qabul bo‘limi",
    //   children: [
    //     {
    //       icon: <FaClipboardList size={20} />,
    //       path: "/reception",
    //       label: "Ro'yxatdan o'tkazish",
    //     },
    //     {
    //       icon: <FaMoneyBillWave />,
    //       path: "/expense",
    //       label: "Harajatlar",
    //     },
    //     {
    //       icon: <FaHistory size={20} />, // Changed to FaHistory for history
    //       path: "/history",
    //       label: "Tarix",
    //     },
    //     {
    //       icon: <FaBed size={20} />, // Changed to FaBed for treatment/cabins
    //       path: "/cabins",
    //       label: "Davolanish",
    //     },
    //     {
    //       icon: <FaCalendarCheck size={20} />, // Changed to FaCalendarCheck for attendance
    //       path: "/attendance",
    //       label: "Davomat",
    //     },
    //     {
    //       icon: <MdOutlineMedicalServices size={20} />, // Changed to FaCalendarCheck for attendance
    //       path: "/service",
    //       label: "Xizmatlar",
    //     },
    //     {
    //       icon: <Moon size={20} />, // Changed to FaCalendarCheck for attendance
    //       path: "/nightShift",
    //       label: "Smena Boshqaruvi",
    //     },
    //   ],
    // },
    {
      icon: <FaPlus size={20} />, // Changed to FaHistory for history
      path: "/roomServices",
      label: "Davolanish xizmatlari",
    },
    {
      path: "/medical-calculators",
      label: "Kardio & Nevrologiya Kalkulyatorlari",
      icon: <FaHeartbeat size={20} />,
    },
    {
      path: "/analis/calculation",
      label: "Laboratoriya Kalkulyatorlari",
      icon: <BiTestTube size={20} />,
    },
    // {
    //   path: "/waiting-list",
    //   label: "Yo'naltirilgan bemorlar",
    //   icon: <FaRegClock size={20} />,
    // },
  ],
};
