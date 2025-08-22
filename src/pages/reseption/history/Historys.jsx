import React, { useState, useMemo } from "react";
import {
  User,
  Calendar,
  Stethoscope,
  CreditCard,
  Heart,
  Activity,
  Filter,
} from "lucide-react";
import { useSelector } from "react-redux";
import PatientDetailsView from "./PatientDetailsView";
import { useGetAllPatientsStoryQuery } from "../../../context/storyApi";
import "./history.css";
import moment from "moment";
import {
  useGetPatientServicesByPatientIdQuery,
  useGetRoomServicesStoryQuery,
} from "../../../context/choosedRoomServicesApi";

const MedicalDashboard = ({ patientId, setViewHistory }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const { searchQuery: searchTerm } = useSelector((state) => state.search);
  const { data, error, isLoading } = useGetAllPatientsStoryQuery();

  // Find the patient by patientId from props if provided
  const initialPatient = useMemo(() => {
    if (!patientId || !data?.success || !data?.data) return null;
    return data.data.find((patient) => patient._id === patientId) || null;
  }, [data, patientId]);

  // Set selected patient only if patientId is provided and found
  useMemo(() => {
    if (initialPatient) {
      setSelectedPatient(initialPatient);
    }
  }, [initialPatient]);

  const { data: patientServicesData } = useGetPatientServicesByPatientIdQuery(
    selectedPatient?.stories?.[0]?.patientId?._id || "",
    {
      skip: !selectedPatient,
    }
  );

  const { data: roomServicesData } = useGetRoomServicesStoryQuery(
    selectedPatient?.stories?.[selectedPatient?.stories?.length - 1]?._id || "",
    "ew",
    {
      skip: !selectedPatient,
    }
  );

  // Process and optimize the API data
  const patientsData = useMemo(() => {
    if (!data?.success || !data?.data) return [];

    return data.data.map((patient) => {
      const unpaidStoriesAmount = (patient.stories || [])
        .filter((story) => !story.payment_status)
        .reduce((sum, story) => sum + (story.payment_amount || 0), 0);

      const unpaidRoomDaysAmount = (patient.roomStories || [])
        .flatMap((room) => room.paidDays || [])
        .filter((day) => !day.isPaid)
        .reduce((sum, day) => sum + (day.price || 0), 0);

      const totalUnpaidAmount = unpaidStoriesAmount + unpaidRoomDaysAmount;

      const hasActiveRoomStory = (patient.roomStories || []).some(
        (room) => room.active
      );
      const hasUnpaidStories = (patient.stories || []).some(
        (story) => !story.payment_status
      );
      const hasUnpaidRoomDays = (patient.roomStories || []).some((room) =>
        (room.paidDays || []).some((day) => !day.isPaid)
      );

      const lastStoryDate =
        patient.stories?.length > 0
          ? patient.stories[patient.stories.length - 1].createdAt
          : null;
      const lastRoomDate =
        patient.roomStories?.length > 0
          ? patient.roomStories[patient.roomStories.length - 1].createdAt
          : null;
      const lastVisit = lastStoryDate || lastRoomDate || patient.createdAt;

      return {
        ...patient,
        fullName: `${patient.firstname || ""} ${patient.lastname || ""}`.trim(),
        hasActiveRoomStory,
        hasUnpaidRoomDays,
        hasUnpaidStories,
        lastVisit,
        totalUnpaidAmount,
        treating:
          patient.treating ||
          hasActiveRoomStory ||
          (hasUnpaidStories &&
            new Date(lastVisit) >
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
        debtor:
          patient.debtor ||
          hasUnpaidRoomDays ||
          hasUnpaidStories ||
          totalUnpaidAmount > 0,
      };
    });
  }, [data]);

  const filteredPatients = useMemo(() => {
    if (!patientsData.length) return [];

    return patientsData.filter((patient) => {
      const matchesSearch =
        patient.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.idNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm) ||
        patient.fullName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        filterStatus === "all" ||
        (filterStatus === "treating" && patient.treating) ||
        (filterStatus === "debtor" && patient.debtor) ||
        (filterStatus === "completed" && !patient.treating && !patient.debtor);

      return matchesSearch && matchesFilter;
    });
  }, [patientsData, searchTerm, filterStatus]);

  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return "0 so'm";
    return new Intl.NumberFormat("uz-UZ").format(amount) + " so'm";
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="history-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="history-dashboard">
        <div className="error-container">
          <div className="error-message">
            Xatolik yuz berdi: {error.message || "Ma'lumotlarni yuklashda xatolik"}
          </div>
        </div>
      </div>
    );
  }

  // If patientId is provided but no patient is found, show error
  if (patientId && !selectedPatient) {
    return (
      <div className="history-dashboard">
        <div className="error-container">
          <div className="error-message">
            Bemor topilmadi: ID {patientId}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="history-dashboard">
      {!selectedPatient ? (
        <div className="patients-list-view">
          <div className="medical-header">
            <div className="header-content">
              <div className="header-title">
                <Activity style={{ color: "#fff" }} className="header-icon" />
                <div>
                  <h1>Tibbiy Hujjatlar Tizimi</h1>
                  <p>Bemorlar tarixi va ma'lumotlar bazasi</p>
                  <div className="filter-container">
                    <Filter className="filter-icon" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="filter-select"
                    >
                      <option value="all">
                        Barcha bemorlar ({patientsData.length})
                      </option>
                      <option value="treating">
                        Davolanmoqda (
                        {patientsData.filter((p) => p.treating).length})
                      </option>
                      <option value="debtor">
                        Qarzdorlar (
                        {patientsData.filter((p) => p.debtor).length})
                      </option>
                      <option value="completed">
                        Tugallangan (
                        {
                          patientsData.filter((p) => !p.treating && !p.debtor)
                            .length
                        }
                        )
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="header-stats">
                <div className="stat-cardhis">
                  <User className="stat-icon" />
                  <div>
                    <span className="stat-number">{patientsData.length}</span>
                    <span className="stat-label">Jami bemorlar</span>
                  </div>
                </div>
                <div className="stat-cardhis">
                  <Heart className="stat-icon treating" />
                  <div>
                    <span className="stat-number">
                      {patientsData.filter((p) => p.treating).length}
                    </span>
                    <span className="stat-label">Davolanmoqda</span>
                  </div>
                </div>
                <div className="stat-cardhis">
                  <CreditCard className="stat-icon debtor" />
                  <div>
                    <span className="stat-number">
                      {patientsData.filter((p) => p.debtor).length}
                    </span>
                    <span className="stat-label">Qarzdorlar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="patients-list">
            {filteredPatients.length === 0 ? (
              <div className="no-patients">
                <p>Hech qanday bemor topilmadi</p>
              </div>
            ) : (
              filteredPatients.map((patient) => (
                <div
                  key={patient._id}
                  className={`patient-card ${patient.treating ? "treating" : ""} ${patient.debtor ? "debtor" : ""
                    }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="patient-avatar">
                    {patient.avatar ? (
                      <img src={patient.avatar} alt="Avatar" />
                    ) : (
                      <User size={24} />
                    )}
                  </div>
                  <div className="patient-infohis">
                    <h3>
                      {patient.firstname} {patient.lastname}
                    </h3>
                    <p>ID: {patient.idNumber}</p>
                    <p>Tel: {patient.phone}</p>
                    <p>Manzil: {patient.address}</p>
                    <p>
                      Yosh: {patient.year || "N/A"} yil{" "}
                      {patient.year
                        ? `(${new Date().getFullYear() - parseInt(patient.year)} yoshda)`
                        : ""}
                    </p>
                    <p>
                      Jins:{" "}
                      {patient.gender === "erkak"
                        ? "Erkak"
                        : patient.gender === "ayol"
                          ? "Ayol"
                          : patient.gender === "male"
                            ? "Erkak"
                            : patient.gender === "female"
                              ? "Ayol"
                              : "N/A"}
                    </p>
                    {patient.totalUnpaidAmount > 0 && (
                      <p className="unpaid-amount">
                        To'lanmagan: {formatCurrency(patient.totalUnpaidAmount)}
                      </p>
                    )}
                  </div>
                  <div className="patient-status">
                    {patient.treating && (
                      <span className="status treating">
                        <Stethoscope size={16} />
                        Davolanmoqda
                      </span>
                    )}
                    {patient.debtor && (
                      <span className="status debtor">
                        <CreditCard size={16} />
                        Qarzdor
                      </span>
                    )}
                    <span className="visit-info">
                      Oxirgi tashrif: {moment(patient.lastVisit).format("DD.MM.YYYY")}
                    </span>
                    <div
                      style={{ display: "flex", gap: "20px" }}
                      className="patient-stats"
                    >
                      <span>Tarixlar: {patient.stories?.length || 0}</span>
                      <span>Xona tarixi: {patient.roomStories?.length || 0}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <PatientDetailsView
          setViewHistory={setViewHistory}
          patientId={patientId}
          patient={selectedPatient}
          patientServicesData={
            patientServicesData?.innerData || roomServicesData?.innerData || []
          }
          setSelectedPatient={setSelectedPatient}
        />
      )}
    </div>
  );
};

export default MedicalDashboard;