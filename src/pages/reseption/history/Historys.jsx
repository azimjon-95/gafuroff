// Frontend: Updated MedicalDashboard with Skeleton Loader
import React, { useState, useMemo, useEffect } from "react";
import {
  User,
  CreditCard,
  Heart,
  Activity,
} from "lucide-react";
import { useSelector } from "react-redux";
import { PhoneNumberFormat } from "../../../hook/NumberFormat";
import { capitalizeFirstLetter } from "../../../hook/CapitalizeFirstLitter";
import PatientDetailsView from "./PatientDetailsView";
import { useGetAllPatientsStoryQuery } from "../../../context/storyApi";
import HistorySkeleton from "./skeleton/Skeleton"; // Import skeleton komponent
import "./history.css";
import "./skeleton/style.css"; // Import skeleton styles
import moment from "moment";

const MedicalDashboard = ({ patientId, setViewHistory }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const { searchQuery: searchTerm } = useSelector((state) => state.search);

  // Date range state - default to current month (1st to last day)
  const now = moment();
  const [startDate, setStartDate] = useState(now.startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(now.endOf('month').format('YYYY-MM-DD'));

  console.log(startDate, endDate);
  // Single query with params including dates
  const { data, error, isLoading } = useGetAllPatientsStoryQuery(
    { searchTerm, filterStatus, startDate, endDate },
    { skip: false }
  );

  // Update initial dates if needed (e.g., on mount)
  useEffect(() => {
    // Default set if not provided
    if (!startDate || !endDate) {
      const currentNow = moment();
      setStartDate(currentNow.startOf('month').format('YYYY-MM-DD'));
      setEndDate(currentNow.endOf('month').format('YYYY-MM-DD'));
    }
  }, []);

  const initialPatient = useMemo(() => {
    if (!patientId || !data?.success || !data?.data) return null;
    return data.data.find((patient) => patient._id === patientId) || null;
  }, [data, patientId]);

  useMemo(() => {
    if (initialPatient) {
      setSelectedPatient(initialPatient);
    }
  }, [initialPatient]);

  const patientsData = useMemo(() => {
    return data?.success ? data.data : [];
  }, [data]);

  const filteredPatients = patientsData;

  const stats = useMemo(() => data?.stats || {}, [data]);

  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return "0 so'm";
    return new Intl.NumberFormat("uz-UZ").format(amount) + " so'm";
  };

  // Handle date change - refetch will happen via query params
  const handleDateChange = (type, value) => {
    if (type === 'start') {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  // Show skeleton loader while loading
  if (isLoading) {
    return (
      <div className="history-dashboard">
        <HistorySkeleton />
      </div>
    );
  }

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
                </div>
              </div>
              <div className="header-stats">
                <div className="stat-cardhis">
                  <User className="stat-icon" />
                  <div>
                    <span className="stat-number">{stats.total || 0}</span>
                    <span className="stat-label">Jami bemorlar</span>
                  </div>
                </div>
                <div className="stat-cardhis">
                  <Heart className="stat-icon treating" />
                  <div>
                    <span className="stat-number">{stats.treating || 0}</span>
                    <span className="stat-label">Davolanmoqda</span>
                  </div>
                </div>
                <div className="stat-cardhis">
                  <CreditCard className="stat-icon debtor" />
                  <div>
                    <span className="stat-number">{stats.qarzdorlar || 0}</span>
                    <span className="stat-label">Qarzdorlar</span>
                  </div>
                </div>
                <div className="stat-cardhisFil">
                  <div className="date-range-container">
                    <input
                      type="text"
                      placeholder="Boshlanish sanasi (YYYY-MM-DD)"
                      value={startDate}
                      onChange={(e) => handleDateChange('start', e.target.value)}
                      className="date-input"
                    />
                    <input
                      type="text"
                      placeholder="Tugash sanasi (YYYY-MM-DD)"
                      value={endDate}
                      onChange={(e) => handleDateChange('end', e.target.value)}
                      className="date-input"
                    />
                  </div>
                  <div className="filter-container">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="filter-select"
                    >
                      <option value="all">
                        Barcha bemorlar ({stats.total || 0})
                      </option>
                      <option value="treating">
                        Davolanmoqda ({stats.treating || 0})
                      </option>
                      <option value="debtor">
                        Qarzdorlar ({stats.debtors || 0})
                      </option>
                      <option value="completed">
                        Tugallangan ({stats.completed || 0})
                      </option>
                    </select>
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
              <div className="patients-table-wrapper">
                <table className="patients-table">
                  <thead>
                    <tr>
                      <th>Ism</th>
                      <th>ID</th>
                      <th>Tel</th>
                      <th>Manzil</th>
                      <th>Yosh</th>
                      <th>Jins</th>
                      <th>To'lanmagan</th>
                      <th>Oxirgi tashrif</th>
                      <th>Tarixlar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(filteredPatients?.slice().reverse() || []).map((patient) => (
                      <tr
                        key={patient._id}
                        className={`patient-row ${patient.treating ? "treating" : ""} ${patient.debtor ? "debtor" : ""}`}
                        onClick={() => setSelectedPatient(patient)}
                      >
                        <td>
                          <div className="patient-avatar"></div>
                          {capitalizeFirstLetter(patient.firstname)} {capitalizeFirstLetter(patient.lastname)}
                        </td>
                        <td>{patient.idNumber}</td>
                        <td>{PhoneNumberFormat(patient.phone)}</td>
                        <td>{patient.address}</td>
                        <td>
                          {patient.year
                            ? `${patient.year} yil (${new Date().getFullYear() - parseInt(patient.year)} yosh)`
                            : "N/A"}
                        </td>
                        <td>
                          {patient.gender === "erkak" || patient.gender === "male"
                            ? "Erkak"
                            : patient.gender === "ayol" || patient.gender === "female"
                              ? "Ayol"
                              : "N/A"}
                        </td>
                        <td>
                          <span className={patient.totalUnpaidAmount > 0 ? "unpaid-amount" : ""}>
                            {patient.totalUnpaidAmount > 0 ? formatCurrency(patient.totalUnpaidAmount) : "-"}
                          </span>
                        </td>
                        <td>{moment(patient.lastVisit).format("DD.MM.YYYY")}</td>
                        <td>{patient.stories?.length || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        <PatientDetailsView
          setViewHistory={setViewHistory}
          patientId={patientId}
          patient={selectedPatient}
          patientServicesData={
            selectedPatient?.choosedRoomServices ||
            selectedPatient?.stories?.[selectedPatient.stories.length - 1]?.roomServices || []
          }
          setSelectedPatient={setSelectedPatient}
        />
      )}
    </div>
  );
};

export default MedicalDashboard;