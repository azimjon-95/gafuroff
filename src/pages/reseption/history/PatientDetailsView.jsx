import React, { useState, useRef, useEffect } from "react";
import {
  User,
  Phone,
  MapPin,
  Calendar,
  Stethoscope,
  Heart,
  Activity,
  HeartPulse,
  FileText,
  Bed,
  ChevronDown,
  ChevronUp,
  Pill,
  FileImage,
  ArrowLeft,
  Download,
  TestTube,
  Calendar as CalendarIcon,
  Eye,
  Edit,
  File as FileIcon,
} from "lucide-react";
import moment from "moment";
import { Table, Tooltip, Checkbox, Button, Radio } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ReceiptPrint from "./ReceiptPrint";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";

import { useCreateExpenseMutation } from "../../../context/expenseApi";

const PatientDetailsView = ({
  patient,
  setSelectedPatient,
  patientServicesData,
  patientId,
  setViewHistory
}) => {
  const [createExpense] = useCreateExpenseMutation();
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedStories, setExpandedStories] = useState({});

  const [selectedRehab, setSelectedRehab] = useState({});
  const [showReceipt, setShowReceipt] = useState(false);
  const navigate = useNavigate();

  const tabs = [
    { id: "overview", label: "Umumiy ma'lumot", icon: User },
    { id: "visits", label: "Tashriflar", icon: Calendar },
    { id: "prescriptions", label: "Retseptlar", icon: Pill },
    { id: "lab-results", label: "Laboratoriya", icon: TestTube },
    { id: "ward-history", label: "Statsionar", icon: Bed },
    { id: "rehabilitation", label: "Reabilitatsiya", icon: HeartPulse },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("uz-UZ").format(amount) + " so'm";

  const getPatientAge = (year) => new Date().getFullYear() - parseInt(year);

  const getStatusColor = (status) =>
  ({
    normal: "#22c55e",
    high: "#ef4444",
    low: "#f59e0b",
  }[status] || "#6b7280");

  const toggleStory = (id) =>
    setExpandedStories((prev) => ({ ...prev, [id]: !prev[id] }));
  // File handling functions
  const getFileType = (filename) => {
    if (!filename) return "unknown";
    const ext = filename.toLowerCase().split(".").pop();
    if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext))
      return "image";
    if (["pdf"].includes(ext)) return "pdf";
    if (["doc", "docx"].includes(ext)) return "document";
    if (["txt"].includes(ext)) return "text";
    return "unknown";
  };
  const getFileIcon = (filename) => {
    const type = getFileType(filename);
    switch (type) {
      case "image":
        return <ImageIcon size={24} />;
      case "pdf":
        return <FileText size={24} />;
      case "document":
        return <FileText size={24} />;
      case "text":
        return <FileText size={24} />;
      default:
        return <FileIcon size={24} />;
    }
  };

  const handleViewFile = (file, storyId) => {
    if (file.url) {
      const baseUrl = "https://qarshi.richman.uz";
      const fileUrl = file.url.startsWith("http")
        ? file.url
        : `${baseUrl}/${file.url.replace(/\\/g, "/")}`;
      try {
        window.open(fileUrl, "_blank");
      } catch (error) {
        console.error("Error opening file:", error);
      }
    } else {
      console.error("File URL is not available");
    }
  };

  const handleDownloadFile = (file, storyId) => {
    // Create a blob with sample content
    const sampleContent = `Medical Document
Patient: ${patient.firstname} ${patient.lastname}
Document ID: ${file._id}
Doctor ID: ${storyId}
Date: ${new Date().toLocaleDateString()}

This is a sample medical document content.
In a real application, this would contain the actual file data.`;

    const blob = new Blob([sampleContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Document_${file._id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const uzbekMonthNames = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
  ];
  const uniqueDates = Array.from(
    new Set(
      patientServicesData?.services
        ?.flatMap((service) => service.dailyTracking || [])
        .map((tracking) => moment(tracking.date).startOf("day").toISOString())
    )
  ).sort();
  const groupedDates = uniqueDates.reduce((acc, date) => {
    const m = moment(date);
    const monthName = uzbekMonthNames[m.month()]; // 0-11 index
    const year = m.format("YYYY"); // faqat ikki raqamli yil: 25, 26

    const key = `${monthName}-${year}`; // Masalan: Iyul 25

    if (!acc[key]) acc[key] = [];
    acc[key].push(date);

    return acc;
  }, {});

  const getRoleName = (role) => {
    switch (role) {
      case "doctor":
        return "Doktor";
      case "reseption":
        return "Qabulchi";
      case "nurse":
        return "Hamshira";
      default:
        return "Noma'lum";
    }
  };

  const today = new Date();
  const getWorkerName = (dailyTracking, checkDate = today) => {
    const tracking = dailyTracking?.find((t) =>
      moment(t.date).startOf("day").isSame(moment(checkDate).startOf("day"))
    );

    if (!tracking?.workerId) return "Noma'lum";

    const { firstName, lastName, role } = tracking?.workerId;
    return `${firstName} ${lastName} [${getRoleName(role)}]`;
  };
  const isChecked = (dailyTracking, checkDate = today) => {
    return dailyTracking?.some(
      (tracking) =>
        moment(tracking.date).startOf("day").toISOString() ===
        moment(checkDate).startOf("day").toISOString()
    );
  };

  let role = localStorage.getItem("role") || "";

  const rehabilitationColumns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 40,
    },
    ...(role === "reception"
      ? [
        {
          title: "Tanlash",
          width: 40,
          render: (_, item) => (
            <Checkbox
              // checked={isChecked(item.dailyTracking)}
              onChange={(e) =>
                setSelectedRehab((prev) => ({
                  ...prev,
                  [item._id]: e.target.checked,
                }))
              }
            />
          ),
        },
      ]
      : []),
    {
      title: "Muolaja nomi",
      dataIndex: ["serviceId", "name"],
      key: "serviceName",
      render: (_, record) => record.serviceId?.name || "-",
    },
    {
      title: "Tana qismi",
      dataIndex: "part",
      key: "part",
      render: (text) => text?.trim() || "-",
    },
    {
      title: "Tavsiya Miqdori",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Olindi",
      dataIndex: "dailyTracking",
      key: "doneCount",
      render: (dailyTracking) => dailyTracking?.length || 0,
    },
    // Oy nomi bo'yicha guruhlangan dynamic sanalar
    ...Object.entries(groupedDates).map(([monthName, dates]) => ({
      title: monthName, // Subheader
      children: dates.map((date) => ({
        title: moment(date).format("DD"), // Quyida chiqadigan sana (kun)
        dataIndex: "dailyTracking",
        render: (_, r) => {
          const isServiceChecked = isChecked(r.dailyTracking, moment(date));
          const workerName = getWorkerName(r.dailyTracking, moment(date));
          return (
            <span className="table-cell">
              {isServiceChecked ? (
                <Tooltip title={`Belgilagan: ${workerName}`}>
                  <CheckCircleOutlined
                    style={{ color: "#52c41a", fontSize: 18 }}
                  />
                </Tooltip>
              ) : (
                <CloseCircleOutlined
                  style={{ color: "#ff4d4f", fontSize: 18 }}
                />
              )}
            </span>
          );
        },
      })),
    })),
  ];

  // const [showReceipt, setShowReceipt] = useState(false);
  const [shouldPrint, setShouldPrint] = useState(false); // <- trigger
  const componentRef = useRef(null);
  const [paymentType, setPaymentType] = useState("naqt");

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    pageStyle: `
         @page {
           size: 80mm auto;
           margin: 0;
         }
         @media print {
           body { margin: 0; }
           * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
         }
       `,
    onPrintError: () => {
      toast.error("Chop etishda xatolik yuz berdi. Iltimos, qayta urining.");
    },
  });

  useEffect(() => {
    if (showReceipt && shouldPrint) {
      handlePrint();
      setShouldPrint(false); // faqat 1 marta chaqilsin
    }
  }, [showReceipt, shouldPrint]);

  const handleRehabilitationSave = async () => {
    try {
      const selectedServices = (patientServicesData?.services || []).filter(
        (service) => selectedRehab[service._id]
      );

      const totalAmount = selectedServices.reduce((sum, service) => {
        const price = service?.serviceId?.price || 0;
        return sum + price;
      }, 0);

      let expensesData = {
        name: "Bemor to'lovi",
        amount: totalAmount,
        type: "kirim",
        category: "Reabilitatsiya xizmatlari",
        description: "Reabilitatsiya xizmatlari",
        paymentType: paymentType,
        relevantId: patientServicesData._id,
      };

      await createExpense(expensesData);

      setShowReceipt(totalAmount);
      setShouldPrint(true); // Keyingi useEffectda print bo'ladi
    } catch (err) {
      console.log(err);
    }
  };

  const groupByAnalysis = (results) => {
    return results.reduce((acc, item) => {
      // key nomidan guruh nomini ajratib olish ("-"gacha bo‘lgan qism)
      const groupName = item.key.split("-")[0];
      if (!acc[groupName]) {
        acc[groupName] = [];
      }
      acc[groupName].push(item);
      return acc;
    }, {});
  };

  return (
    <div className="patient-details">
      <div className="patient-details-header">
        <button
          onClick={() => {
            patientId ?
              setViewHistory(false)
              :
              setSelectedPatient(null)
          }
          }
          className="back-button"
        >
          <ArrowLeft size={20} /> Orqaga
        </button>
        <div className="patient-title">
          <div className="patient-avatar-large">
            <User size={32} />
          </div>
          <div>
            <h2>
              {patient.firstname} {patient.lastname}
            </h2>
            <p>
              ID: {patient.idNumber} • {getPatientAge(patient.year)} yosh
            </p>
          </div>
        </div>
        <div className="vital-signs-quick">
          <div className="vital-item">
            <HeartPulse size={16} />
            <span>{patient.vitalSigns?.heartRate || "N/A"} BPM</span>
          </div>
          <div className="vital-item">
            <Activity size={16} />
            <span>{patient?.bloodGroup || "N/A"}</span>
          </div>
        </div>
      </div>

      <div className="tabs-navigation">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`tab-button ${activeTab === id ? "active" : ""}`}
          >
            <Icon size={18} /> {label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === "overview" && (
          <div className="overview-content">
            <div className="overview-grid">
              <div className="overview-card">
                <h3>
                  <User size={20} /> Shaxsiy ma'lumotlar
                </h3>
                <div className="info-grid">
                  <div className="info-item">
                    <Phone size={16} />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="info-item">
                    <MapPin size={16} />
                    <span>{patient.address}</span>
                  </div>
                  <div className="info-item">
                    <Calendar size={16} />
                    <span>{patient.year}-yil tug'ilgan</span>
                  </div>
                  <div className="info-item">
                    <Heart size={16} />
                    <span>Qon guruhi: {patient.bloodGroup}</span>
                  </div>
                </div>
              </div>

              {/* <div className="overview-card">
                <h3>
                  <FileImage size={20} /> Tibbiy hujjatlar (Rengin, Uzi, Analiz)
                </h3>

                <div className="files-grid">
                  {patient.stories?.flatMap((story, inx) =>
                    console.log(story.files)
                    // story.files?.map((file) => (
                    //   <div key={inx} className="file-card">
                    //     <div className="file-icon">
                    //       <FileImage size={24} />
                    //     </div>
                    //     <div className="file-info">
                    //       <div className="file-name">Hujjat: {file?.filename}</div>

                    //       <div className="file-details">
                    //         <div>
                    //           Yuklagan Shifokor: {story.doctorId.firstName}{" "}
                    //           {story.doctorId.lastName}
                    //         </div>
                    //         <div>Sana: {formatDate(story.createdAt)}</div>
                    //       </div>
                    //     </div>
                    //     <div className="file-actions">
                    //       <button
                    //         className="file-action-btn"
                    //         onClick={() => handleViewFile(file, story.doctorId)}
                    //       >
                    //         <Eye size={16} />
                    //       </button>
                    //       <button
                    //         className="file-action-btn"
                    //         onClick={() => handleDownloadFile(file, story.doctorId)}
                    //       >
                    //         <Download size={16} />
                    //       </button>
                    //     </div>
                    //   </div>
                    // ))
                  ) || <p>Hujjatlar mavjud emas</p>}
                </div>

              </div> */}
              <div className="overview-card">
                <h3>
                  <FileImage size={20} /> Tibbiy hujjatlar (Rengin, Uzi, Analiz)
                </h3>
                <div className="files-grid">
                  {patient.stories?.flatMap((story, storyIndex) =>
                    story.files?.map((file, fileIndex) => (
                      <div
                        key={`${storyIndex}-${fileIndex}`}
                        className="file-card"
                      >
                        <div className="file-icon">
                          {getFileIcon(file.filename)}
                        </div>
                        <div className="file-info">
                          <div className="file-name">
                            Hujjat: {file.filename}
                          </div>
                          <div className="file-details">
                            <div>
                              Yuklagan Shifokor: {story.doctorId.firstName}{" "}
                              {story.doctorId.lastName}
                            </div>
                            <div>Sana: {formatDate(story.createdAt)}</div>
                          </div>
                        </div>
                        <div className="file-actions">
                          <button
                            className="file-action-btn"
                            onClick={() =>
                              handleViewFile(file, story.doctorId._id)
                            }
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="file-action-btn"
                            onClick={() =>
                              handleDownloadFile(file, story.doctorId._id)
                            }
                          >
                            <Download size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  ) || <p>Hujjatlar mavjud emas</p>}
                </div>
              </div>

              <div className="overview-card">
                <h3>
                  <Stethoscope size={20} /> Tibbiy ma'lumotlar
                </h3>
                <div className="medical-info-grid">
                  <div className="medical-info-item">
                    <span className="label">BMI:</span>
                    <span className="value">{patient.bmi}</span>
                  </div>
                  <div className="medical-info-item">
                    <span className="label">Bo'yi:</span>
                    <span className="value">{patient.height} sm</span>
                  </div>
                  <div className="medical-info-item">
                    <span className="label">Vazni:</span>
                    <span className="value">{patient.weight} kg</span>
                  </div>
                  <div className="medical-info-item">
                    <span className="label">Oxirgi tashrif:</span>
                    <span className="value">
                      {moment(patient.lastVisit).format("DD.MM.YYYY")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "visits" && (
          <div className="visits-content">
            <div className="section-header">
              <h3>
                <Calendar size={20} /> Tashriflar tarixi
              </h3>
            </div>
            <div className="visits-list">
              {patient.stories?.map((visit) => (
                <div key={visit._id} className="visit-card">
                  <div className="visit-header">
                    <div className="visit-date">
                      <CalendarIcon size={16} />
                      {formatDate(visit.createdAt)}
                    </div>
                    <span
                      className={`visit-status ${visit.payment_status ? "completed" : "pending"
                        }`}
                    >
                      {visit.payment_status ? "Tugallangan" : "Kutilmoqda"}
                    </span>
                  </div>
                  <div className="visit-details">
                    <div className="visit-row">
                      <strong>Shifokor:</strong>Shifokor:{" "}
                      {visit?.doctorId.firstName} {visit?.doctorId.lastName}
                    </div>
                    <div className="visit-row">
                      <strong>Shikoyatlar:</strong> {visit.description || "N/A"}
                    </div>
                    <div className="visit-row">
                      <strong>Xizmatlar:</strong>{" "}
                      {visit.services.map((s) => s.name).join(", ")}
                    </div>
                    <div className="visit-row">
                      <strong>To'lov summasi:</strong>{" "}
                      {formatCurrency(visit.payment_amount)}
                    </div>
                    <div className="visit-row">
                      <strong>To'lov turi:</strong> {visit.paymentType}
                    </div>
                    {visit.endTime && (
                      <div className="visit-row">
                        <strong>Tugash vaqti:</strong>{" "}
                        {formatDate(visit.endTime)}
                      </div>
                    )}
                  </div>
                </div>
              )) || <p>Tashriflar mavjud emas</p>}
            </div>
          </div>
        )}

        {activeTab === "prescriptions" && (
          <div className="prescriptions-content">
            <div className="section-header">
              <h3>
                <Pill size={20} /> Retseptlar
              </h3>
            </div>
            <div className="prescriptions-list">
              {patient.stories?.map(
                (story, inx) =>
                  story.retsept?.prescription && (
                    <div key={inx} className="prescription-card">
                      <div className="prescription-header">
                        <div className="prescription-date">
                          <Calendar size={16} />
                          {formatDate(story.createdAt)}
                        </div>
                        <span
                          className={`prescription-status ${story.payment_status ? "active" : "expired"
                            }`}
                        >
                          {story.payment_status ? "Faol" : "Tugagan"}
                        </span>
                      </div>
                      <div className="prescription-doctor">
                        <strong>Shifokor:</strong> Shifokor:{" "}
                        {story.doctorId.firstName} {story.doctorId.lastName}
                      </div>
                      <div className="medications-list">
                        <div className="medication-item">
                          {
                            <div className="medication-name">
                              <div className="medication-header">
                                <Pill size={18} className="pill-icon" />
                                <span>Dori vositalari</span>
                              </div>
                              {story?.retsept?.prescription?.map(
                                (value, inx) => (
                                  <div key={inx} className="medication-card">
                                    <div className="med-name">
                                      {value.medicationName}
                                    </div>
                                    <div className="med-dosage">
                                      {value.dosagePerDay} × 1 / kun
                                    </div>
                                    <div className="med-duration">
                                      Davomiylik: {value.durationDays} kun
                                    </div>
                                    {value.description && (
                                      <div className="med-description">
                                        {value.description}
                                      </div>
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          }
                          <div className="medication-details">
                            <div>
                              <strong>Tavsiyalar:</strong>{" "}
                              {story.retsept.recommendations || "N/A"}
                            </div>
                            <div>
                              <strong>Tashxis:</strong>{" "}
                              {story.retsept.diagnosis || "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              ) || <p>Retseptlar mavjud emas</p>}
            </div>
          </div>
        )}

        {activeTab === "lab-results" && (
          <div className="lab-results-content">
            <div className="section-header">
              <h3>
                <TestTube size={20} /> Laboratoriya natijalari
              </h3>
            </div>
            <div className="lab-results-list">
              {patient.stories?.flatMap((story, inx) =>
                story.laboratory?.map((lab, lidx) => {
                  const grouped = groupByAnalysis(lab.results);

                  return (
                    <div key={lidx} className="lab-result-card">
                      <div className="lab-result-header">
                        <div className="lab-info">

                          <div className="lab-meta">
                            <span>
                              <Calendar size={14} /> {formatDate(lab.createdAt)}
                            </span>
                            <span>
                              <User size={14} /> Shifokor:{" "}
                              {story.doctorId?.firstName} {story.doctorId?.lastName}
                            </span>
                          </div>
                        </div>
                        <span className={`lab-status ${lab.status}`}>
                          {lab.status === "wait" ? "Kutilmoqda" : "Tugallangan"}
                        </span>
                      </div>

                      {/* Guruhlab chiqarish */}
                      {Object.entries(grouped).map(([groupName, items]) => (
                        <div key={groupName} className="lab-results-group">
                          <h5 className="group-title">{groupName}</h5>
                          <div className="lab-results-table">
                            {items.map((result, ridx) => (
                              <div key={ridx} className="result-row">
                                <span className="result-name">{result.name}</span>
                                <span
                                  className="result-value"
                                  style={{ color: getStatusColor("normal") }}
                                >
                                  {result.result} {result.siBirlik}
                                </span>
                                <span className="result-normal">{result.norma}</span>
                                <span className="result-status normal">Normal</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })
              ) || <p>Laboratoriya natijalari mavjud emas</p>}
            </div>

          </div>
        )}

        {activeTab === "ward-history" && (
          <div className="ward-history-content">
            <div className="section-header">
              <h3>
                <Bed size={20} /> Statsionar tarixi
              </h3>
            </div>
            <div className="ward-history-list">
              {patient.roomStories?.map((room) => (
                <div key={room._id} className="ward-card">
                  <div className="ward-header">
                    <div className="ward-info">
                      <h4>Xona: {room.roomId.roomNumber}</h4>
                      <span className="ward-department">Bo'lim N/A</span>
                    </div>
                    <span
                      className={`ward-status ${room.active ? "active" : "completed"
                        }`}
                    >
                      <Bed size={14} />
                      {room.active ? "Faol" : "Tugagan"}
                    </span>
                  </div>
                  <div className="ward-details">
                    <div className="ward-row">
                      <strong>Yotqizilgan:</strong> {room.startDay}
                    </div>
                    <div className="ward-row">
                      <strong>Chiqarilgan:</strong> {room.endDay}
                    </div>
                    <div className="ward-row">
                      <strong>Shifokor:</strong> Shifokor:{" "}
                      {room.doctorId?.firstName} {room.doctorId?.lastName}
                    </div>
                    <div className="ward-financial">
                      <div className="financial-item">
                        <span>Kunlar soni:</span>
                        <span>{room.paidDays.length} kun</span>
                      </div>
                      <div className="financial-item">
                        <span>Jami summa:</span>
                        <span>
                          {formatCurrency(
                            room.paidDays.reduce(
                              (sum, day) => sum + day.price,
                              0
                            )
                          )}
                        </span>
                      </div>
                      <div className="financial-item">
                        <span>To'lovlar soni:</span>
                        <span>{room.payments.length}</span>
                      </div>
                    </div>
                    <div className="ward-actions">
                      <button className="action-btn">
                        <Eye size={16} /> Batafsil
                      </button>
                      {room.active && (
                        <button className="action-btn">
                          <Edit size={16} /> Tahrirlash
                        </button>
                      )}
                    </div>
                  </div>
                  <button
                    className="expand-button"
                    onClick={() => toggleStory(room._id)}
                  >
                    {expandedStories[room._id] ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                    {expandedStories[room._id] ? "Yashirish" : "Ko'proq"}
                  </button>
                  {expandedStories[room._id] && (
                    <div className="ward-expanded-content">
                      <div className="ward-row">
                        <strong>Qo'shimcha ma'lumot:</strong>
                        <span>N/A</span>
                      </div>
                    </div>
                  )}
                </div>
              )) || <p>Statsionar tarixi mavjud emas</p>}
            </div>
          </div>
        )}

        {activeTab === "rehabilitation" && (
          <div className="rehabilitation-content">
            <div className="section-header">
              <h3>
                <HeartPulse size={20} /> Reabilitatsiya tarixi
              </h3>
            </div>
            <div className="rehabilitation-list">
              <Table
                dataSource={patientServicesData?.services || []}
                columns={rehabilitationColumns}
                rowKey={(record) => record._id}
                size="small"
                pagination={false}
              />
              {role === "reception" && (
                <div>
                  <div style={{ marginTop: "10px" }}>
                    <label htmlFor="paymentType">To'lov turi: </label> <br />
                    <Radio.Group
                      className="payment-type-select"
                      value={paymentType}
                      onChange={(e) => setPaymentType(e.target.value)}
                      style={{ marginTop: "8px" }}
                    >
                      <Radio value="naqt">Naqd</Radio>
                      <Radio value="karta">Karta</Radio>
                    </Radio.Group>
                  </div>
                  <Button
                    style={{ marginTop: "10px" }}
                    type="primary"
                    onClick={handleRehabilitationSave}
                  >
                    Saqlash
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ display: "none" }}>
          <ReceiptPrint
            patient={patient}
            services={(patientServicesData?.services || []).filter(
              (service) => selectedRehab[service._id]
            )}
            componentRef={componentRef}
            total={showReceipt}
            onClose={() => setShowReceipt(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsView;
