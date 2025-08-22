import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Stethoscope,
  User,
  CheckCircle,
  Users,
  Activity,
  AlertCircle,
  Heart,
  Scale,
  Plus,
  X,
  Save,
} from "lucide-react";
import { useGetStoriesByDoctorQuery } from "../../../context/storyApi";
import { useUpdateBmiPotsentsMutation } from "../../../context/clientApi";
import LoadingSkeleton from "./skeleton/LoadingSkeleton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import socket from "../../../socket";
import moment from "moment";

// Constants for table headers
const TABLE_HEADERS = [
  "№",
  "Sana",
  "Bemorning ismi",
  "Yoshi",
  "Tashrif",
  "Tibbiy ma'lumot",
  "Tarix",
  "Amal",
];

// Utility function to calculate BMI
const calculateBMI = (height, weight) => {
  if (!height || !weight) return null;
  return parseFloat((weight / Math.pow(height / 100, 2)).toFixed(1));
};

// Utility function to get BMI status
const getBMIStatus = (bmi) => {
  if (!bmi) return "";
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
};

// Utility function to get BMI color
const getBMIColor = (bmi) => {
  if (!bmi) return "#6b7280";
  if (bmi < 18.5) return "#3b82f6";
  if (bmi < 25) return "#10b981";
  if (bmi < 30) return "#f59e0b";
  return "#ef4444";
};

const Checkin = () => {
  const navigate = useNavigate();
  const workerId = localStorage.getItem("workerId");
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetStoriesByDoctorQuery(workerId, {
      skip: !workerId,
    });

  useEffect(() => {
    socket.on("new_story", (newPatient) => {
      refetch();
    });
  }, [refetch]);

  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    bloodGroup: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [updateBmiPotsents] = useUpdateBmiPotsentsMutation();

  // Memoized BMI calculation
  const bmi = useMemo(
    () => calculateBMI(formData.height, formData.weight),
    [formData.height, formData.weight]
  );

  // Handle patient consultation navigation
  const handleConsultPatient = useCallback(
    (patient) => {
      navigate(`/consultation/${patient?._id}`);
    },
    [navigate]
  );

  // Handle opening the medical info modal
  const handleAddMedicalInfo = useCallback((patient) => {
    setSelectedPatient(patient);
    setFormData({
      height: patient.height || "",
      weight: patient.weight || "",
      bloodGroup: patient.bloodGroup || "",
    });
    setShowModal(true);
  }, []);

  // Handle form input changes
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  // Validate form inputs
  const validateForm = useCallback(() => {
    const errors = {};
    if (!formData.height || formData.height <= 0)
      errors.height = "Bo'y kiriting (musbat son)";
    if (!formData.weight || formData.weight <= 0)
      errors.weight = "Vazn kiriting (musbat son)";
    if (!formData.bloodGroup) errors.bloodGroup = "Qon guruhini tanlang";
    return errors;
  }, [formData]);

  // Handle saving medical info
  const handleSaveMedicalInfo = useCallback(async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Iltimos, barcha maydonlarni to'g'ri to'ldiring", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const data = {
        height: parseFloat(formData.height) || null,
        weight: parseFloat(formData.weight) || null,
        bloodGroup: formData.bloodGroup || null,
      };

      await updateBmiPotsents({
        id: selectedPatient?.patientId?._id,
        data,
      }).unwrap();
      toast.success("Bemor ma'lumotlari muvaffaqiyatli saqlandi!", {
        position: "top-right",
        autoClose: 3000,
      });
      setShowModal(false);
      setSelectedPatient(null);
      setFormData({ height: "", weight: "", bloodGroup: "" });
      refetch();
    } catch (err) {
      toast.error(
        `Xatolik yuz berdi: ${
          err?.data?.message || "Ma'lumotlarni saqlashda xato"
        }`,
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
    }
  }, [formData, bmi, selectedPatient, updateBmiPotsents, refetch]);

  // Memoized sorted patients
  const sortedPatients = useMemo(() => {
    return (
      data?.innerData?.patients
        ?.slice()
        .sort((a, b) => a.order_number - b.order_number) || []
    );
  }, [data]);

  if (isLoading) {
    return (
      <div className="doctor-appointment-system">
        <LoadingSkeleton count={5} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="doctor-appointment-system error-container">
        <AlertCircle className="error-icon" size={48} />
        <p>
          Xatolik yuz berdi:{" "}
          {error?.data?.message ||
            error?.message ||
            "Maʼlumotlarni yuklashda xato"}
        </p>
        <button
          onClick={() => {
            refetch();
            toast.info("Ma'lumotlar qayta yuklanmoqda...", {
              position: "top-right",
              autoClose: 2000,
            });
          }}
          className="retry-btn"
          disabled={isFetching}
          aria-label="Qayta urinish"
        >
          {isFetching ? "Yuklanmoqda..." : "Qayta urinish"}
        </button>
      </div>
    );
  }

  return (
    <div className="doctor-appointment-system">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="queues-container">
        <div className="queues-container-box">
          <div className="queues-header">
            <div className="header-info">
              <Stethoscope className="header-icon" aria-hidden="true" />
              <div>
                <h1>Doktor Paneli</h1>
                <p>
                  Bugungi navbat:{" "}
                  {data?.innerData?.todayUnviewedCount +
                    data?.innerData?.todayViewedCount || 0}{" "}
                  bemor
                </p>
              </div>
            </div>
          </div>

          <div className="queues-container-section">
            <div className="stat-card">
              <Users className="stat-icon waiting" aria-hidden="true" />
              <div>
                <h3>{data?.innerData?.todayUnviewedCount || 0}</h3>
                <p>Kutayotgan</p>
              </div>
            </div>
            <div className="stat-card">
              <CheckCircle className="stat-icon completed" aria-hidden="true" />
              <div>
                <h3>{data?.innerData?.todayViewedCount || 0}</h3>
                <p>Qabul qilingan</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="dates-info">
              <Calendar className="date-icon" aria-hidden="true" />
              <span>{new Date().toLocaleDateString("uz-UZ")}</span>
            </div>
          </div>
        </div>

        <div className="tables-container">
          <table>
            <thead>
              <tr>
                {TABLE_HEADERS.map((header) => (
                  <th key={header} className="table-header">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedPatients.map((patient) => (
                <tr
                  key={patient._id}
                  className={`patient-row ${patient.view ? "completed" : ""}`}
                >
                  <td className="order-number">{patient.order_number}</td>
                  {/* <td>{moment(patient.createdAt).format("DD-MM-YYYY")}</td> */}
                  <td>
                    {moment(patient.createdAt).isSame(moment(), "day") ? (
                      <p style={{ color: "green", fontWeight: "bold" }}>
                        Bugun
                      </p>
                    ) : (
                      moment(patient.createdAt).format("DD-MM-YYYY")
                    )}
                  </td>
                  <td>
                    <div className="patient-name">
                      {/* <User className="patient-icon" aria-hidden="true" /> */}
                      <div>
                        <strong>{patient.patientId.name}</strong>
                        <br />
                        <small>{patient.patientId.phone}</small>
                      </div>
                    </div>
                  </td>
                  <td>{patient.patientId.age} yosh</td>
                  <td>
                    <div className="kaldata">
                      {patient?.services?.map((val, inx) => (
                        <div key={inx}>{val.name}</div>
                      ))}
                    </div>
                  </td>
                  <td className="medical-info">
                    {patient?.patientId?.height &&
                    patient?.patientId?.weight &&
                    patient?.patientId?.bmi &&
                    patient?.patientId?.bloodGroup ? (
                      <div className="medical-info-container">
                        <div className="bmi-info">
                          <Scale size={12} color="#6b7280" aria-hidden="true" />
                          <span
                            className={`bmi-value bmi-${getBMIStatus(
                              patient?.patientId?.bmi
                            )}`}
                            style={{
                              color: getBMIColor(patient?.patientId?.bmi),
                            }}
                          >
                            BMI: {patient?.patientId?.bmi}
                          </span>
                        </div>
                        <div className="blood-group-info">
                          <Heart size={12} color="#dc2626" aria-hidden="true" />
                          <span className="blood-group-value">
                            {patient?.patientId?.bloodGroup}
                          </span>
                        </div>
                        <div className="physical-stats">
                          {patient?.patientId?.height}cm,{" "}
                          {patient?.patientId?.weight}kg
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddMedicalInfo(patient)}
                        className="add-medical-btn"
                        aria-label={`Tibbiy ma'lumot qo'shish ${patient.patientId.name}`}
                      >
                        <Plus size={14} aria-hidden="true" />
                        Qo'shish
                      </button>
                    )}
                  </td>
                  <td>
                    <div className="history-count">
                      <Activity className="history-icon" aria-hidden="true" />
                      <span>{patient.visitHistory.length} marta</span>
                    </div>
                  </td>
                  <td>
                    <button
                      className="consult-btn"
                      onClick={() => handleConsultPatient(patient)}
                      aria-label={`Qabul qilish ${patient.patientId.name}`}
                    >
                      <Stethoscope className="btn-icon" aria-hidden="true" />
                      Qabul qilish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-labelledby="modal-title"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h3 id="modal-title" className="modal-title">
                Tibbiy Ma'lumot Qo'shish
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="modal-close-btn"
                aria-label="Modalni yopish"
              >
                <X size={20} color="#6b7280" aria-hidden="true" />
              </button>
            </div>

            <div className="modal-patient-info">
              <p className="patient-info-text">
                <strong>{selectedPatient?.patientId.name}</strong> uchun tibbiy
                ma'lumot
              </p>
            </div>

            <div className="modal-form">
              <div className="form-group">
                <label htmlFor="height" className="form-label">
                  Bo'y (sm)
                </label>
                <input
                  id="height"
                  name="height"
                  type="number"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="Masalan: 175"
                  className="form-input"
                  aria-invalid={!!formErrors.height}
                  aria-describedby={
                    formErrors.height ? "height-error" : undefined
                  }
                />
                {formErrors.height && (
                  <span id="height-error" className="form-error">
                    {formErrors.height}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="weight" className="form-label">
                  Vazn (kg)
                </label>
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="Masalan: 70"
                  className="form-input"
                  aria-invalid={!!formErrors.weight}
                  aria-describedby={
                    formErrors.weight ? "weight-error" : undefined
                  }
                />
                {formErrors.weight && (
                  <span id="weight-error" className="form-error">
                    {formErrors.weight}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="bloodGroup" className="form-label">
                  Qon guruhi
                </label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="form-select"
                  aria-invalid={!!formErrors.bloodGroup}
                  aria-describedby={
                    formErrors.bloodGroup ? "bloodGroup-error" : undefined
                  }
                >
                  <option value="">Qon guruhini tanlang</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    )
                  )}
                </select>
                {formErrors.bloodGroup && (
                  <span id="bloodGroup-error" className="form-error">
                    {formErrors.bloodGroup}
                  </span>
                )}
              </div>

              {bmi && (
                <div className="bmi-preview">
                  <div className="bmi-preview-text">
                    <strong>BMI:</strong> {bmi}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button
                onClick={() => setShowModal(false)}
                className="modal-cancel-btn"
                aria-label="Bekor qilish"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleSaveMedicalInfo}
                disabled={
                  !formData.height || !formData.weight || !formData.bloodGroup
                }
                className="modal-save-btn"
                aria-label="Ma'lumotlarni saqlash"
              >
                <Save size={14} aria-hidden="true" />
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkin;
