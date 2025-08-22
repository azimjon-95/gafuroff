import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import {
  User,
  Calendar,
  FileText,
  Stethoscope,
  Upload,
  Scale,
  Heart,
  CheckCircle,
} from "lucide-react";
import {
  useGetTodaysStoryVisitQuery,
  useRedirectPatientMutation,
  useVisitPatientMutation,
} from "../../../context/storyApi";
import { capitalizeFirstLetter } from "../../../hook/CapitalizeFirstLitter";
import { MdCall } from "react-icons/md";
import { useDispatch } from "react-redux";
import { GrPowerCycle } from "react-icons/gr";
import { storyApi } from "../../../context/storyApi";
import { useGetDoctorsQuery } from "../../../context/doctorApi";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import ConsultationViewSkeleton from "./skeleton/ConsultationViewSkeleton";
import RecordList from "../../../components/patientRecordList/RecordList";
import { ToastContainer, toast } from "react-toastify";
import ServiceModal from "./skeleton/ServiceModal";
import Analysis from "../analysis/Analysis";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Table,
  Row,
  Col,
  Modal,
  Checkbox,
  List,
} from "antd";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { useGetRoomServicesQuery } from "../../../context/roomServicesApi";
import ReabilitationPrintList from "../../../components/patientRecordList/ReabilitationPrintList";
import {
  useAssignRoomServicesMutation,
  useGetPatientServicesByPatientIdQuery,
} from "../../../context/choosedRoomServicesApi";
import MedicalDashboard from "../../reseption/history/Historys";

const ConsultationView = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const workerId = localStorage.getItem("workerId");
  const [viewHistory, setViewHistory] = useState(false);
  const specialization = localStorage.getItem("specialization");
  const { data, isLoading, isError } = useGetTodaysStoryVisitQuery({
    workerId,
    userId,
  });

  const { data: patientServicesData } = useGetPatientServicesByPatientIdQuery(
    userId,
    {
      skip: !userId,
    }
  );

  useEffect(() => {
    if (patientServicesData?.innerData?.services) {
      const preSelected = {};
      patientServicesData.innerData.services.forEach((service) => {
        preSelected[service.serviceId._id] = {
          selected: true,
          part: service.part,
          quantity: service.quantity,
          dailyTracking: service.dailyTracking || [],
        };
      });
      setSelectedServices(preSelected);
    } else {
      setSelectedServices({});
    }
  }, [patientServicesData]);

  const dispatch = useDispatch();
  const selectedPatient = data?.innerData || [];

  const [isChange, setIsChange] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [sendData, setSendData] = useState(null);
  const [visitPatient] = useVisitPatientMutation();
  const [redirectPatient] = useRedirectPatientMutation();
  const [assignRoomServices] = useAssignRoomServicesMutation();
  const [prescriptions, setPrescriptions] = useState([]);
  const [form] = Form.useForm();

  // State for description modal
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);

  //isModalOpen2
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  // List of common prescription descriptions
  const commonDescriptions = [
    "Ertalab 1 ta, kechqurun 1 ta, ovqatdan oldin",
    "Kuniga 2 marta, ovqatdan keyin",
    "Ertalab 1 ta, ovqat bilan birga",
    "Kechqurun 1 ta, ovqatdan keyin",
    "Kuniga 3 marta, har 8 soatda",
    "Ertalab va kechqurun, ovqatdan 30 daqiqa oldin",
    "Kuniga 1 marta, kechqurun",
    "Ovqatdan keyin 2 ta, kuniga 1 marta",

    // qo‘shimcha 10 ta
    "Kuniga 3 marta, ovqatdan keyin",
    "Har 6 soatda 1 ta",
    "Ertalab och qoringa 1 ta",
    "Kechasi uxlashdan oldin 1 ta",
    "Kuniga 2 marta, yarim stakan suv bilan",
    "Kuniga 1 marta, ertalab och qoringa",
    "Og‘riq bo‘lsa, 1 ta, lekin kuniga 3 martadan ko‘p emas",
    "Har 12 soatda 1 ta",
    "Ovqatdan keyin 1 ta, kuniga 2 marta",
    "Kuniga 4 marta, har 6 soatda",
  ];



  // Modal state for doctor selection
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctorServices, setSelectedDoctorServices] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDoctorName, setSelectedDoctorName] = useState("");

  const {
    data: doctors,
    refetch,
    isLoading: workersLoading,
  } = useGetDoctorsQuery(selectedPatient?.patientId?._id);
  const [diagnosis, setDiagnosis] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: roomServices } = useGetRoomServicesQuery();
  const roomServicesData = roomServices?.innerData || [];

  const [selectedServices, setSelectedServices] = useState({});
  const [selectedReabilitationServices, setSelectedRehabilitationServices] =
    useState([]);

  const contentRef = useRef(null);
  const reabPrintRef = useRef(null);

  const handleReabPrint = useReactToPrint({
    contentRef: reabPrintRef,
    documentTitle: "Reabilitatsiya Xizmatlari",
    pageStyle: `
    @page { size: A4; margin: 20mm; }
    body { font-family: Arial, sans-serif; }
  `,
  });

  const getBMIStatus = (bmi) => {
    if (!bmi) return "";
    if (bmi < 18.5) return "underweight";
    if (bmi < 25) return "normal";
    if (bmi < 30) return "overweight";
    return "obese";
  };

  const getBMIColor = (bmi) => {
    if (!bmi) return "#6b7280";
    if (bmi < 18.5) return "#3b82f6";
    if (bmi < 25) return "#10b981";
    if (bmi < 30) return "#f59e0b";
    return "#ef4444";
  };

  const reactToPrintFn = useReactToPrint({
    contentRef: contentRef,
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

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
      toast.success(`${files.length} fayl muvaffaqiyatli yuklandi!`);
    } else {
      toast.warn("Hech qanday fayl tanlanmadi.");
    }
  };

  const addPrescription = (values) => {
    setPrescriptions((prev) => [
      ...prev,
      {
        medicationName: values.medicationName,
        dosagePerDay: values.dosagePerDay,
        description: values.description,
        durationDays: values.durationDays,
      },
    ]);
    form.resetFields();
    toast.success("Retsept qo‘shildi!");
  };

  const handleCompleteConsultation = async () => {
    setIsSubmitting(true);
    const consultationData = {
      diagnosis,
      prescriptions,
      recommendations,
      description,
    };

    try {
      const data = await visitPatient({
        id: userId,
        consultationData,
        files: uploadedFiles,
        workerId,
      }).unwrap();
      setSendData(data);
      toast.success("Qabul muvaffaqiyatli yakunlandi!");
      setTimeout(() => {
        dispatch(
          storyApi.util.invalidateTags([
            { type: "DoctorStories", id: workerId },
          ])
        );
        navigate(-1);
      }, 1000);
      reactToPrintFn();
    } catch (error) {
      toast.error(
        "Qabulni saqlashda xatolik yuz berdi. Iltimos, qayta urining."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendToLab = (doctor) => {
    if (!doctor?.servicesId?.services) {
      toast.warn("Bu doktor uchun xizmatlar mavjud emas.");
      return;
    }
    setSelectedDoctor(doctor);
    setSelectedDoctorServices(doctor.servicesId.services);
    setSelectedDoctorName(`${doctor.firstName} ${doctor.lastName}`);
    setIsModalOpen(true);
  };

  const handleModalConfirm = async (selectedServices) => {
    if (selectedServices.length === 0) {
      toast.warn("Kamida bitta xizmat tanlang.");
      return;
    }

    try {
      await redirectPatient({
        storyId: userId,
        newDoctorId: selectedDoctor?._id,
        services: selectedServices.map((service) => ({
          name: service.name,
          price: service.price,
        })),
      }).unwrap();
      refetch();
      toast.success("Bemor muvaffaqiyatli yo‘naltirildi!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error(
        "Bemor yo‘naltirishda xatolik yuz berdi. Iltimos, qayta urining."
      );
    }
  };

  const handleClick = () => {
    setIsChange(!isChange);
    setTimeout(() => setIsRotating(false), 500);
  };

  const buttonColors = [
    "#4caf50",
    "#2196f3",
    "#ff9800",
    "#e91e63",
    "#9c27b0",
    "#795548",
    "#607d8b",
  ];

  const handleCompleteAnalis = async () => {
    const consultationData = {
      diagnosis: "",
      prescriptions: [],
      recommendations: "",
      description: "",
    };

    try {
      await visitPatient({
        id: userId,
        consultationData,
        files: uploadedFiles,
        workerId,
      }).unwrap();
      setTimeout(() => {
        dispatch(
          storyApi.util.invalidateTags([
            { type: "DoctorStories", id: workerId },
          ])
        );
        navigate(-1);
      }, 1000);
    } catch (error) {
      toast.error(
        "Tahlilni saqlashda xatolik yuz berdi. Iltimos, qayta urining."
      );
    }
  };

  const prescriptionColumns = [
    {
      title: "Dori nomi",
      dataIndex: "medicationName",
    },
    {
      title: "Kuniga necha marta",
      dataIndex: "dosagePerDay",
    },
    {
      title: "Tavsif",
      dataIndex: "description",
    },
    {
      title: "Necha kun",
      dataIndex: "durationDays",
    },
  ];

  if (isLoading || workersLoading) {
    return <ConsultationViewSkeleton />;
  }

  if (isError) {
    toast.error("Ma'lumotlarni yuklashda xatolik yuz berdi.");
  }

  const columns2 = [
    {
      title: "Holat",
      render: (_, record) => (
        <Checkbox
          onChange={(e) => toggleService(record._id, e.target.checked)}
          checked={selectedServices[record._id]?.selected || false}
        />
      ),
    },
    {
      title: "Xizmat nomi",
      dataIndex: "name",
    },
    {
      title: "Narx",
      dataIndex: "price",
    },
    {
      title: "Soxa",
      render: (_, record) => (
        <Input
          value={selectedServices[record._id]?.part || ""}
          onChange={(e) => updateField(record._id, "part", e.target.value)}
          disabled={!selectedServices[record._id]?.selected}
        />
      ),
    },
    {
      title: "Miqdori",
      render: (_, record) => (
        <Input
          type="number"
          min={1}
          value={selectedServices[record._id]?.quantity || ""}
          onChange={(e) => updateField(record._id, "quantity", e.target.value)}
          disabled={!selectedServices[record._id]?.selected}
        />
      ),
    },
  ];

  const toggleService = (serviceId, checked) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        selected: checked,
        part: prev[serviceId]?.part || "",
        quantity: prev[serviceId]?.quantity || "",
        dailyTracking: prev[serviceId]?.dailyTracking || [],
      },
    }));
  };

  const updateField = (serviceId, field, value) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        [field]: value,
        dailyTracking: prev[serviceId]?.dailyTracking || [],
      },
    }));
  };

  const showModal = () => setIsModalOpen2(true);

  const handleCancel = () => {
    setIsModalOpen2(false);
    setSelectedServices({});
  };

  const handleOk = async () => {
    const servicesArray = Object.entries(selectedServices)
      .filter(([_, val]) => val.selected && val.part && val.quantity > 0)
      .map(([serviceId, val]) => ({
        serviceId,
        part: val.part,
        quantity: Number(val.quantity),
        dailyTracking: [],
      }));

    setSelectedRehabilitationServices(servicesArray);
    setIsModalOpen2(false);
    const payload = {
      patientId: userId,
      services: servicesArray,
    };

    try {
      await assignRoomServices(payload).unwrap();
    } catch (error) {
      console.error("Error:", error);
    }

    setTimeout(() => {
      handleReabPrint();
    }, 1000);
  };

  // Handler for opening description modal
  const showDescriptionModal = () => {
    setIsDescriptionModalOpen(true);
  };

  // Handler for selecting a description from the modal
  const handleDescriptionSelect = (description) => {
    form.setFieldsValue({ description: description }); // Set the description in the form
    setDescription(description); // Update the local state to reflect in the UI
    setIsDescriptionModalOpen(false); // Close the modal
    toast.success("Tavsif tanlandi!");
  };

  return (
    <div className="consultation-container">
      {viewHistory && (
        <div className="consultation-containerhisbox">
          <MedicalDashboard
            setViewHistory={setViewHistory}
            patientId={data?.innerData?.patientId?._id}
          />
        </div>
      )}
      <div className="consultation-header">
        <div className="detail-item-conat">
          <button className="back-btn" onClick={() => navigate(-1)}>
            Qaytish
          </button>
          <div className="patient-info-header">
            <User className="patient-avatar" />
            <div>
              <h2>{selectedPatient?.patientId?.name}</h2>
              <p>Navbat raqami: #{selectedPatient?.order_number}</p>
            </div>
          </div>
        </div>
        <div className="detail-item-conat">
          <button
            className="detail-btn"
            onClick={() => setViewHistory(true)}
          >
            Tarix
          </button>
          <div className="detail-item-box">
            <div className="detail-item">
              <MdCall className="detail-icon" />
              <div>
                <label>Tel</label>
                <span>{selectedPatient?.patientId?.phone}</span>
              </div>
            </div>
            <div className="detail-item">
              <Calendar className="detail-icon" />
              <div>
                <label>Yosh</label>
                <span>{selectedPatient?.patientId?.age}</span>
              </div>
            </div>
          </div>
          <div className="detail-item-box">
            <div className="detail-item">
              <IoLocationSharp className="detail-icon" />
              <div>
                <label>Manzil</label>
                <span>{selectedPatient?.patientId?.address}</span>
              </div>
            </div>
            <div className="detail-item">
              {selectedPatient?.patientId?.gender === "erkak" ? (
                <IoMdMale className="detail-icon" />
              ) : (
                <IoMdFemale className="detail-icon" />
              )}
              <div>
                <label>Jinnsi</label>
                <span>
                  {capitalizeFirstLetter(selectedPatient?.patientId?.gender)}
                </span>
              </div>
            </div>
          </div>
          <div style={{ padding: "15px" }} className="detail-item">
            <div style={{ gap: "7px" }} className="medical-info-container">
              <div className="bmi-info">
                <Scale size={17} color="#6b7280" aria-hidden="true" />
                <span
                  className={`bmi-value bmi-${getBMIStatus(
                    selectedPatient?.patientId?.bmi
                  )}`}
                  style={{
                    color: getBMIColor(selectedPatient?.patientId?.bmi),
                    fontSize: "14px",
                  }}
                >
                  BMI: {selectedPatient?.patientId?.bmi || "Nomalum"}
                </span>
              </div>
              <div className="blood-group-info">
                <Heart size={16} color="#dc2626" aria-hidden="true" />
                <span
                  style={{ fontSize: "14px" }}
                  className="blood-group-value"
                >
                  {selectedPatient?.patientId?.bloodGroup || "Nomalum"}
                </span>
              </div>
              <div style={{ fontSize: "14px" }} className="physical-stats">
                {selectedPatient?.patientId?.height || "Nomalum "}sm,{" "}
                {selectedPatient?.patientId?.weight || "Nomalum "}kg
              </div>
            </div>
          </div>
        </div>

        <div className="history-list">
          {selectedPatient?.visitHistory?.map((visit, index) => (
            <div key={index} className="history-item">
              <Calendar className="history-icon" />
              <div>
                <span className="history-date">{visit.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="consultation-content">
        <div className="services-card_box">
          <div className="services-card">
            <h3>Xizmatlar</h3>
            <div className="services-list">
              {selectedPatient?.services?.map((service, index) => (
                <div key={index} className="serviceview-item">
                  <Stethoscope className="service-icon" />
                  <span>{service.name}</span>
                  <span className="serviceivera">
                    {service.price.toLocaleString()} so'm
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="file-upload-card">
            <h3>Natijalarni yuklash</h3>
            <div className="upload-area">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="file-input"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="upload-label">
                <Upload className="upload-icon" />
                Fayl yuklash
              </label>
            </div>
            {uploadedFiles?.length > 0 && (
              <div className="uploaded-files">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="uploaded-file">
                    <FileText className="file-icon" />
                    <span>{file.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="actions-card">
          <h3>
            {isChange ? "Qo‘shimcha tekshiruvlar" : "Bemor shikoyati"}
            <button onClick={handleClick}>
              <GrPowerCycle className={isRotating ? "rotate-icon" : ""} />
            </button>
          </h3>
          {isChange ? (
            <div className="action-buttons">
              {doctors?.innerData?.map((doctor, index) => {
                const color = buttonColors[index % buttonColors.length];
                return (
                  <button
                    key={index}
                    className="action-btn lab-btn"
                    onClick={() => handleSendToLab(doctor)}
                    style={{ backgroundColor: color }}
                  >
                    <FileText className="action-icon" />
                    {capitalizeFirstLetter(doctor?.specialization)}ga yuborish
                  </button>
                );
              })}
            </div>
          ) : (
            <div>
              {selectedPatient?.description === "" ? (
                <textarea
                  className="recommendations-input"
                  placeholder="Masalan: Nafas qisishi, yurak urishi tezlashuvi..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    width: "100%",
                    height: "130px",
                    resize: "none",
                  }}
                />
              ) : (
                <p>{selectedPatient?.description}</p>
              )}
            </div>
          )}
        </div>
      </div>
      {specialization === "laborant" ? (
        <>
          <Analysis
            data={selectedPatient}
            handleCompleteAnalis={handleCompleteAnalis}
            userId={userId}
          />
        </>
      ) : (
        <>
          <br />
          <div className="prescription-card">
            <h3>Tashxis va davolash</h3>
            <input
              className="diagnosis-input"
              placeholder="Tashxis yozing..."
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              style={{
                width: "100%",
                height: "42px",
                resize: "none",
                marginBottom: "16px",
                padding: "8px",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
              }}
            />
            <Form
              form={form}
              onFinish={addPrescription}
              layout="vertical"
              style={{ marginBottom: "16px" }}
            >
              <Row gutter={16} wrap>
                <Col flex="1">
                  <Form.Item
                    name="medicationName"
                    label="Dori nomi"
                    rules={[
                      { required: true, message: "Dori nomini kiriting" },
                    ]}
                  >
                    <Input
                      placeholder="Dori nomini kiriting"
                      style={{ height: "42px", borderRadius: "4px" }}
                    />
                  </Form.Item>
                </Col>
                <Col flex="1">
                  <Form.Item
                    name="dosagePerDay"
                    label="Kuniga necha marta"
                    rules={[{ required: true, message: "Dozani kiriting" }]}
                  >
                    <InputNumber
                      min={1}
                      placeholder="Kuniga necha marta"
                      style={{
                        width: "100%",
                        height: "42px",
                        borderRadius: "4px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col flex="1">
                  <Form.Item
                    name="description"
                    label="Tavsif"
                    rules={[{ required: true, message: "Tavsifni kiriting" }]}
                  >
                    <div className="tavsifselectBox">
                      <Input.TextArea
                        placeholder="Masalan: Ertalab 1 ta, kechqurun 1 ta, ovqatdan oldin"
                        rows={1}
                        style={{
                          borderRadius: "4px",
                          resize: "none",
                          height: "80px",
                          flex: 1,
                        }}
                        onClick={showDescriptionModal}
                        value={description} // Bind to local state for display
                        onChange={(e) => {
                          setDescription(e.target.value); // Update local state
                          form.setFieldsValue({ description: e.target.value }); // Sync form
                        }}
                      />
                      {isDescriptionModalOpen && (
                        <div className="custom-modal">
                          <div className="custom-modal-header">
                            <span>Tavsif tanlash</span>
                            <div className="">
                              <button
                                className="custom-modal-close-btn"
                                onClick={() => setIsDescriptionModalOpen(false)}
                              >
                                <span className="close-icon">×</span>
                              </button>
                            </div>
                          </div>
                          <div className="custom-modal-body">
                            <List
                              bordered
                              dataSource={commonDescriptions}
                              renderItem={(item) => (
                                <List.Item
                                  className="custom-modal-list-item"
                                  onClick={() => handleDescriptionSelect(item)}
                                >
                                  {item}
                                </List.Item>
                              )}
                            />
                          </div>

                        </div>
                      )}
                    </div>
                  </Form.Item>
                </Col>
                <Col flex="1">
                  <Form.Item
                    name="durationDays"
                    label="Necha kun"
                    rules={[
                      { required: true, message: "Davomiylikni kiriting" },
                    ]}
                  >
                    <InputNumber
                      min={1}
                      placeholder="Necha kun davomida"
                      style={{
                        width: "100%",
                        height: "42px",
                        borderRadius: "4px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col flex="none">
                  <Form.Item label=" " colon={false}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ height: "42px", borderRadius: "4px" }}
                    >
                      Qo‘shish
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            {prescriptions.length > 0 && (
              <Table
                rowKey={(record) => record._id}
                columns={prescriptionColumns}
                dataSource={prescriptions}
                pagination={false}
                size="small"
                style={{ marginTop: "16px" }}
              />
            )}
            <textarea
              className="recommendations-input"
              placeholder="Tavsiylar..."
              value={recommendations}
              onChange={(e) => setRecommendations(e.target.value)}
              style={{
                width: "100%",
                height: "80px",
                marginTop: prescriptions.length > 0 ? "30px" : 0,
                resize: "none",
                padding: "8px",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
            <Button
              className="reabilitatsiya-btn"
              type="primary"
              onClick={() => showModal(true)}
            >
              Reabilitatsiya
            </Button>
            <button
              className="complete-btn"
              onClick={handleCompleteConsultation}
              disabled={isSubmitting}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                backgroundColor: "#1890ff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              <CheckCircle className="btn-icon" />
              {isSubmitting ? "Yuborilmoqda..." : "Qabulni yakunlash"}
            </button>
          </div>
        </>
      )}



      <Modal
        width={1000}
        open={isModalOpen2}
        onOk={handleOk}
        onCancel={handleCancel}
        title={"Reabilitatsiya xizmatlari"}
      >
        <Table
          rowKey={(record) => record._id}
          columns={columns2}
          dataSource={roomServicesData}
          pagination={false}
          size="small"
        />
      </Modal>

      <div style={{ display: "none" }}>
        <RecordList
          componentRef={contentRef}
          records={sendData}
          selectedPatient={selectedPatient}
          data={{ diagnosis, prescriptions, recommendations }}
        />
      </div>

      <div style={{ display: "none" }}>
        <ReabilitationPrintList
          ref={reabPrintRef}
          patient={selectedPatient?.patientId}
          services={selectedReabilitationServices.map((item) => ({
            serviceName: roomServicesData.find(
              (service) => service._id === item.serviceId
            )?.name,
            serviceId: item.serviceId,
            part: item.part,
            quantity: item.quantity,
          }))}
          doctor={localStorage.getItem("admin_fullname")}
        />
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        services={selectedDoctorServices}
        onConfirm={handleModalConfirm}
        doctorName={selectedDoctorName}
      />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ConsultationView;