import React from "react";
import Checkin from "../pages/doctors/checkin/Checkin";
import Registration from "../pages/reseption/register/Main";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import Workers from "../pages/admin/workers/Workers";
import ClinicManagements from "../pages/admin/setting/Setting";
import History from "../pages/reseption/history/Historys";
import Cabins from "../pages/reseption/Cabins/Cabins";
import Room from "../pages/reseption/Cabins/room/Room";
import PatientAddRoomForm from "../pages/reseption/Cabins/patientAddRoom/PatientAddRoomForm";
import Attendance from "../pages/reseption/attendance/Attendance";
import ExpenseManager from "../pages/reseption/expense/ExpenseManager";
// import CalculationLayout from "../components/analizCalculators/CalculationLayout";
import CalculationLayout from "../pages/doctors/analizCalculators/CalculationLayout";
import Service from "../pages/reseption/service/Service";
import NightShiftScheduler from "../pages/reseption/nightShift/NightShiftScheduler";
import ConsultationView from "../pages/doctors/checkin/ConsultationView";
import MedicalCalculators from "../pages/doctors/medicalCalculators/Main";
import RoomServices from "../pages/reseption/roomServices/RoomServices";
import ChooseService from "../pages/doctors/chooseService/ChooseService";
import Patients from "../pages/doctors/chooseService/Patients";
import WaitingList from "../pages/doctors/waitingList/WaitingList";
import Nurse from "../pages/nurse/Nurse";
import RoomNur from "../pages/nurse/room/RoomNur";

export const routes = [
  {
    path: "/doctor",
    element: <Checkin />,
    role: ["doctor", "director"],
    private: true,
  },
  {
    path: "/reception",
    element: <Registration />,
    role: ["reception", "director"],
    private: true,
  },
  {
    path: "/director",
    element: <Dashboard />,
    role: ["director"],
    private: true,
  },
  {
    path: "/workers",
    element: <Workers />,
    role: ["director"],
    private: true,
  },
  {
    path: "/setting",
    element: <ClinicManagements />,
    role: ["director"],
    private: true,
  },
  {
    path: "/history",
    element: <History />,
    role: ["reception", "doctor", "director"],
    private: true,
  },
  {
    path: "/choose-room-services",
    element: <ChooseService />,
    role: ["doctor"],
    private: true,
  },
  {
    path: "/patients",
    element: <Patients />,
    role: ["doctor"],
    private: true,
  },

  {
    path: "/cabins",
    element: <Cabins />,
    role: ["reception", "director"],
    private: true,
  },
  {
    path: "/patientsintheward",
    element: <Cabins />,
    role: ["doctor"],
    private: true,
  },
  {
    path: "/room/:id",
    element: <Room />,
    role: ["reception", "doctor", "director"],
    private: true,
  },
  {
    path: "/addpatient/:id",
    element: <PatientAddRoomForm />,
    role: ["reception", "director"],
    private: true,
  },
  {
    path: "/attendance",
    element: <Attendance />,
    role: ["reception", "director"],
    private: true,
  },
  {
    path: "/expense",
    element: <ExpenseManager />,
    role: ["reception", "director"],
    private: true,
  },
  {
    path: "/service",
    element: <Service />,
    role: ["reception", "director"],
    private: true,
  },
  {
    path: "/roomServices",
    element: <RoomServices />,
    role: ["reception", "director"],
    private: true,
  },

  {
    path: "/nightShift",
    element: <NightShiftScheduler />,
    role: ["reception", "director"],
    private: true,
  },
  {
    path: "/consultation/:userId",
    element: <ConsultationView />,
    role: ["doctor"],
    private: true,
  },
  {
    path: "/medical-calculators",
    element: <MedicalCalculators />,
    role: ["doctor", "director"],
    private: true,
  },
  {
    path: "/analis/calculation",
    element: <CalculationLayout />,
    role: ["doctor", "director"],
    private: true,
  },
  {
    path: "/waiting-list",
    element: <WaitingList />,
    role: ["doctor", "director", "reception"],
    private: true,
  },
  {
    path: "/nurse",
    element: <Nurse />,
    role: ["nurse", "doctor", "director", "reception"],
    private: true,
  },
  {
    path: "/nurseroom/:id",
    element: <RoomNur />,
    role: ["nurse", "doctor", "director", "reception"],
    private: true,
  },
];
