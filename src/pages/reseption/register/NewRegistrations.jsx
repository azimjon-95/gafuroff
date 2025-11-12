import React, { useRef, useState, useMemo, useEffect } from "react";
import {
  useGetAllTodaysQuery,
  useDeleteUnconfirmedAppointmentsMutation,
} from "../../../context/todaysApi";
import {
  useUpdateRedirectedPatientMutation,
  useDeleteStoryMutation,
  useUpdateStoryServicesMutation,
} from "../../../context/storyApi";
import {
  Table,
  Spin,
  Button,
  Typography,
  Modal,
  Select,
  Popconfirm,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { MdDeleteSweep } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import moment from "moment";
import "moment-timezone";
import ToastContainer from "./toast/ToastContainer"; // Import custom ToastContainer
import { useReactToPrint } from "react-to-print";
import { capitalizeFirstLetter } from "../../../hook/CapitalizeFirstLitter";
import ModelCheck from "../../../components/check/modelCheck/ModelCheck";
import "./registration.css";
import { useDispatch } from "react-redux";
import { todaysApi } from "../../../context/todaysApi";
import { useGetPotsentsLengthQuery } from "../../../context/doctorApi";

const { Title } = Typography;
const { Option } = Select;

const NewRegistrations = () => {


  const [viewStatus, setViewStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedSpecialization, setSelectedSpecialization] = useState("Barchasi");
  const {
    data: allStories,
    isLoading: isLoadingAllStories,
    refetch,
    error
  } = useGetAllTodaysQuery({
    date: selectedDate ? selectedDate.format("YYYY-MM-DD") : undefined,
    view: viewStatus,
  });

  const filteredData = allStories?.innerData?.stories.filter((i) => {
    if (selectedSpecialization === "Barchasi") return true;
    return i.doctorId.specialization.includes(selectedSpecialization);
  }) || [];

  const counts = allStories?.innerData?.counts || {
    all: 0,
    korilgan: 0,
    korilmagan: 0,
  };


  const viewOptions = [
    { value: "all", label: `Barchasi – ${counts.all}` },
    { value: "true", label: `Ko‘rilganlar – ${counts.korilgan}` },
    { value: "false", label: `Ko‘rilmaganlar – ${counts.korilmagan}` },
  ];

  const [updateRedirectedPatient] = useUpdateRedirectedPatientMutation();
  const [deleteStory] = useDeleteStoryMutation();
  const [updateStoryServices] = useUpdateStoryServicesMutation();
  const dispatch = useDispatch();
  const contentRef = useRef(null);
  const [data, setData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [dateInput, setDateInput] = useState(moment().format("DD-MM-YYYY"));
  const [deleteUnconfirmedAppointments, { isLoading: isDeleting }] =
    useDeleteUnconfirmedAppointmentsMutation();

  const [editService, setEditService] = useState(null);
  const [selectedServiceDoctor, setSelectedServiceDoctor] = useState(null);
  const [newService, setNewService] = useState(null);
  const { data: doctors } = useGetPotsentsLengthQuery();

  let doctorsService =
    doctors?.innerData?.find(
      (i) => i._id === selectedServiceDoctor?.doctorId?._id
    )?.services || [];

  const reactToPrintFn = useReactToPrint({
    contentRef,
    pageStyle: `
      @page { size: 80mm auto; margin: 0; }
      @media print {
        body { margin: 0; }
        * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
      }
    `,
  });

  // ✅ Data yangilansa avtomatik print qilinsin
  useEffect(() => {
    if (data) {
      reactToPrintFn();
    }
  }, [data, reactToPrintFn]);

  const hasNAValue = useMemo(
    () => (record) =>
      !record?.order_number ||
      !record?.patientId?.firstname ||
      !record?.patientId?.lastname ||
      !record?.doctorId?.specialization ||
      !record?.services?.length ||
      !record?.payment_amount ||
      !record?.paymentType ||
      !record?.createdAt,
    []
  );

  const getTotalPrice = useMemo(
    () => (services) =>
      services?.length
        ? services.reduce((total, service) => total + (service.price || 0), 0)
        : 0,
    []
  );

  const handleRowPrint = (record) => {
    if (!record?.patientId || !record?.doctorId) {
      setErrorMessage(
        "Noto‘g‘ri ma’lumotlar: Bemor yoki shifokor ma’lumotlari topilmadi."
      );
      return;
    }

    const story = {
      createdAt: record.createdAt,
      response: {
        doctor: {
          specialization: record.doctorId?.specialization || "N/A",
          firstName: record.doctorId?.firstName || "N/A",
          lastName: record.doctorId?.lastName || "N/A",
          phone: record.doctorId?.phone || "N/A",
        },
        patient: {
          firstname: record.patientId?.firstname || "N/A",
          lastname: record.patientId?.lastname || "N/A",
          phone: record.patientId?.phone || "N/A",
          idNumber: record.patientId?.idNumber || "N/A",
          address: record.patientId?.address || "N/A",
          paymentType: record.paymentType || "N/A",
          order_number: record.order_number || 0,
        },
        created: record.createdAt || new Date().toISOString(),
        order_number: record.order_number || 0,
      },
      services:
        record.services?.map((service) => ({
          name: service.name,
          price: service.price,
        })) || [],
    };

    setData(story); // ✅ faqat state yangilanadi
  };

  const handleNAAlert = (record) => {
    setSelectedRecord(record);
    setSelectedPaymentType(null);
    setErrorMessage(null);
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    if (!selectedPaymentType) {
      setErrorMessage("Iltimos, to'lov turini tanlang (Naqt yoki Karta).");
      return;
    }

    const dataToSend = {
      storyId: selectedRecord?._id,
      paymentType: selectedPaymentType,
      payment_amount: getTotalPrice(selectedRecord?.services),
    };

    try {
      const response = await updateRedirectedPatient(dataToSend).unwrap();
      const story = {
        response: {
          doctor: {
            specialization:
              response?.innerData?.doctor?.specialization || "N/A",
            firstName: response?.innerData?.doctor?.firstName || "N/A",
            lastName: response?.innerData?.doctor?.lastName || "N/A",
            phone: response?.innerData?.doctor?.phone || "N/A",
          },
          patient: {
            firstname: response?.innerData?.patient?.tablefirstname || "N/A",
            lastname: response?.innerData?.patient?.lastname || "N/A",
            phone: response?.innerData?.patient?.phone || "N/A",
            idNumber: response?.innerData?.patient?.idNumber || "N/A",
            address: response?.innerData?.patient?.address || "N/A",
            paymentType: response?.innerData?.paymentType || "N/A",
            order_number: response?.innerData?.patient?.order_number || 0,
          },
          created: response?.innerData?.createdAt || new Date().toISOString(),
          order_number: response?.innerData?.order_number || 0,
        },
        services:
          response?.innerData?.services?.map((service) => ({
            name: service.name,
            price: service.price,
          })) || [],
      };

      setData(story); // ✅ data o‘zgargach print avtomatik bo‘ladi
      await refetch();
    } catch (e) {
      setErrorMessage("To‘lov ma’lumotlarini yangilashda xatolik yuz berdi.");
      return;
    }

    setIsModalVisible(false);
    setSelectedRecord(null);
    setSelectedPaymentType(null);
    setErrorMessage(null);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
    setSelectedPaymentType(null);
    setErrorMessage(null);
  };

  const handlePaymentTypeSelect = (type) => {
    setSelectedPaymentType(type);
    setErrorMessage(null);
  };

  const specializations = useMemo(() => {
    const specs = new Set(
      allStories?.innerData?.stories?.map((record) => record.doctorId?.specialization)
        .filter(Boolean)
    );
    return ["Barchasi", ...specs];
  }, [allStories]);

  const columns = useMemo(() => {
    const baseColumns = [
      {
        title: "Navbati",
        dataIndex: "order_number",
        key: "order_number",
        align: "center",
        width: 80,
        render: (orderNumber) => orderNumber || "N/A",
      },
      {
        title: "Bemor ismi",
        key: "patient_name",
        render: (_, record) =>
          `${record.patientId?.firstname || "N/A"} ${record.patientId?.lastname || "N/A"
          }`,
        width: 150,
      },
      {
        title: "Qabul",
        dataIndex: ["doctorId", "specialization"],
        key: "specialization",
        render: (phone) => capitalizeFirstLetter(phone || "N/A"),
        width: 120,
      },
      {
        title: "Xizmatlar",
        key: "services",
        render: (_, record) => {
          const names =
            record?.services?.map((service) => service.name).join(", ") ||
            "Xizmatlar yoʻq";
          const short = names.length > 30 ? names.slice(0, 30) + "..." : names;
          return <span title={names}>{short}</span>;
        },
        width: 200,
      },
      {
        title: "To'lov summasi",
        dataIndex: "payment_amount",
        key: "payment_amount",
        render: (amount) =>
          amount ? `${amount.toLocaleString()} soʻm` : "N/A",
        width: 120,
      },
      {
        title: "To'lov turi",
        dataIndex: "paymentType",
        key: "paymentType",
        render: (paymentType) => capitalizeFirstLetter(paymentType || "N/A"),
        width: 100,
      },
      {
        title: "Soat",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (date, record) => {
          // console.log(date, record.patientId?.firstname);

          const d = new Date(date);
          const hours = String(d.getHours()).padStart(2, "0");
          const minutes = String(d.getMinutes()).padStart(2, "0");
          // return `${hours}:${minutes}`;
          // asia tashkent
          return (
            moment
              .tz(date, "Asia/Tashkent")
              // .subtract(3, "hours")
              .format("HH:mm")
          );
        },
        width: 80,
      },
      // navbatni bekor qilish
      {
        title: "Amallar",
        render: (_, record) => {
          return (
            <div
              style={{ display: "flex", justifyContent: "center", gap: "5px" }}
            >
              <Button
                type="primary"
                size="small"
                icon={<EditOutlined />}
                onClick={() => {
                  setEditService(record?.services);
                  setSelectedServiceDoctor(record);
                }}
              />
              <Popconfirm
                title="Haqiqatdan ham o'chirmoqchimisiz?"
                onConfirm={async () => {
                  await deleteStory(record._id);
                  dispatch(
                    todaysApi.util.invalidateTags([
                      { type: "Stories", id: "LIST" },
                    ])
                  );
                  await refetch();
                  window.toast.success(
                    "Muvaffaqiyat",
                    `${record.patientId?.firstname} ${record.patientId?.lastname} navbatini o'chirildi.`
                  );
                }} // ✅ callback bo‘lishi kerak
              >
                <Button danger size="small" icon={<DeleteOutlined />} />
              </Popconfirm>
            </div>
          );
        },
      },
    ];

    if (moment().isSame(selectedDate, "day")) {
      baseColumns.push({
        title: "Faollashtirish",
        key: "actions",
        align: "center",
        render: (_, record) =>
          hasNAValue(record) ? (
            <Button
              type="primary"
              onClick={() => handleNAAlert(record)}
              size="small"
              className="no-print"
              style={{ backgroundColor: "green", borderColor: "#beff4d" }}
            >
              <GiCheckMark />
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => handleRowPrint(record)}
              size="small"
              className="no-print"
              style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
            >
              <PrinterOutlined />
            </Button>
          ),
        width: 120,
      });
    }

    return baseColumns;
  }, [selectedDate, hasNAValue]);

  const tableStyles = `
    @media print {
      .no-print { display: none; }
      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1px solid #ddd; padding: 6px; }
      th { background-color: #f2f2f2; }
    }
    .ant-table-tbody > tr > td { padding: 8px !important; font-size: 12px !important; }
    .ant-table-thead > tr > th { padding: 8px !important; font-size: 12px !important; }
    .ant-table-row { height: auto !important; }
    .ant-table-cell { vertical-align: middle !important; }
    .highlight-row { background-color: #fff7cc !important; }
    .highlight-row td { border-color: #ffd633 !important; }
    .payment-type-button { margin: 5px; }
    .filter-container { display: flex; gap: 16px; margin-bottom: 16px; }
    .date-input { width: 120px; padding: 4px; font-size: 12px; }
  `;

  const handleDeleteUnconfirmed = async () => {
    try {
      const response = await deleteUnconfirmedAppointments().unwrap();
      if (response?.state) {
        window.toast.success(
          "Muvaffaqiyat",
          `${response.deletedCount} ta tasdiqlanmagan uchrashuv oʻchirildi.`
        );
      } else {
        window.toast.error(
          "Tasdiqlanmagan uchrashuvlarni oʻchirishda xatolik."
        );
      }
    } catch (error) {
      console.error("Delete unconfirmed appointments error:", error);
      window.toast.error(
        error?.data?.message || "Oʻchirishda xatolik yuz berdi."
      );
    }
  };

  const updateServises = async () => {
    try {
      const response = await updateStoryServices({
        id: selectedServiceDoctor?._id,
        data: editService,
      }).unwrap();
      if (response?.state) {
        setEditService(null);
        dispatch(
          todaysApi.util.invalidateTags([{ type: "Stories", id: "LIST" }])
        );
        window.toast.success(
          "Muvaffaqiyat",
          "Xizmatlar muvaffaqiyatli yangilandi."
        );
      }
    } catch (error) {
      window.toast.error(
        error?.data?.message || "Yangilashda xatolik yuz berdi."
      );
    }
  };

  return (
    <div className="registration-container">
      <style>{tableStyles}</style>
      <Title level={5} className="registration-title">
        Qabulni kutyotgan bemorlar
      </Title>
      <div className="filter-container">
        <div>
          <Select
            placeholder="Qabul bo'yicha filtr"
            style={{ width: 165 }}
            onChange={setSelectedSpecialization}
            value={selectedSpecialization}
            allowClear
          >
            {specializations.map((spec) => (
              <Option key={spec} value={spec}>
                {capitalizeFirstLetter(spec)}
              </Option>
            ))}
          </Select>
          <Select
            style={{ width: 160 }}
            value={viewStatus}
            onChange={setViewStatus}
            options={viewOptions}
          />
          <input
            style={{ width: 125 }}
            type="date"
            value={moment(dateInput, "DD-MM-YYYY").format("YYYY-MM-DD")}
            onChange={(e) => {
              const value = e.target.value;
              setDateInput(moment(value, "YYYY-MM-DD").format("DD-MM-YYYY"));
              setSelectedDate(moment(value, "YYYY-MM-DD"));
            }}
            className="date-inputtab"
          />

        </div>

        <Popconfirm
          title="Belgilangann vaqtda doktor qabuliga kelmagan bemorlarni o‘chirishni tasdiqlaysizmi?"
          description="Bugungi kunda belgilangan vaqtda qabulga kelmagan, tasdiqlanmagan uchrashuvlar butunlay o‘chiriladi. Ushbu amalni qaytarib bo‘lmaydi!"
          okText="Ha"
          cancelText="Yoʻq"
          onConfirm={handleDeleteUnconfirmed}
          okButtonProps={{ loading: isDeleting }}
          overlayStyle={{ width: 400 }}
        >
          <Button
            type="danger"
            loading={isDeleting} // ✅ Ant Design Buttonda ishlaydi
            style={{ fontSize: "20px" }}
            className="no-print"
            icon={<MdDeleteSweep />}
          />
        </Popconfirm>
      </div>

      {isLoadingAllStories ? (
        <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
      ) : (
        <Table
          columns={columns}
          dataSource={error?.status === 404 ? [] : filteredData}
          rowKey={(record) => record._id}
          bordered
          pagination={false}
          size="small"
          style={{ background: "#fff" }}
          rowClassName={(record) => (hasNAValue(record) ? "highlight-row" : "")}
        />
      )}

      <div style={{ display: "none" }}>
        <ModelCheck data={data} contentRef={contentRef} />
      </div>

      <Modal
        title="To'lov holati"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Ha"
        cancelText="Yo'q"
        centered
      >
        <p>To'lov amalga oshirilmoqdami?</p>
        <p style={{ color: "green" }}>
          Jami to'lov:{" "}
          {getTotalPrice(selectedRecord?.services).toLocaleString()} so'm
        </p>
        <div style={{ marginTop: "10px" }}>
          <Button
            type={selectedPaymentType === "naqt" ? "primary" : "default"}
            onClick={() => handlePaymentTypeSelect("naqt")}
            className="payment-type-button"
          >
            Naqd
          </Button>
          <Button
            type={selectedPaymentType === "karta" ? "primary" : "default"}
            onClick={() => handlePaymentTypeSelect("karta")}
            className="payment-type-button"
          >
            Karta
          </Button>
        </div>
        {errorMessage && (
          <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
        )}
      </Modal>

      <Modal
        title="Xizmatlarni tahrirlash"
        open={editService}
        onOk={() => updateServises()}
        onCancel={() => setEditService(false)}
        okText="Saqlash"
        cancelText="Yo'q"
        centered
      >
        <Table
          columns={[
            {
              title: "Xizmat nomi",
              dataIndex: "name",
            },
            {
              title: "Xizmat narxi",
              dataIndex: "price",
              render: (value) => value.toLocaleString(),
            },
            {
              title: "amallar",
              render: (_, record) => (
                <div>
                  <Button
                    danger
                    onClick={() =>
                      setEditService((prev) =>
                        prev.filter((item) => item.name !== record.name)
                      )
                    }
                    icon={<DeleteOutlined />}
                  ></Button>
                </div>
              ),
            },
          ]}
          pagination={false}
          dataSource={editService}
          rowKey={(record) => record._id}
          bordered
        />
        <Button
          onClick={() => setNewService(true)}
          style={{ marginTop: "10px" }}
          type="primary"
          icon={<PlusOutlined />}
        >
          Yangi xizmat qo'shish
        </Button>

        <Modal
          open={newService}
          onCancel={() => setNewService(false)}
          onOk={() => setNewService(false)}
          title="Yangi xizmat qo'shish"
        >
          <Table
            columns={[
              {
                title: "Xizmat nomi",
                dataIndex: "name",
              },
              {
                title: "Xizmat narxi",
                dataIndex: "price",
                render: (value) => value.toLocaleString(),
              },

              {
                title: "amallar",
                render: (_, record) => (
                  <div>
                    <Button
                      disabled={editService.some(
                        (item) => item.name === record.name
                      )}
                      type="primary"
                      onClick={() => {
                        setEditService([...editService, record]);
                      }}
                      icon={<PlusOutlined />}
                    ></Button>
                  </div>
                ),
              },
            ]}
            pagination={false}
            dataSource={doctorsService}
            rowKey={(record) => record._id}
            bordered
          />
        </Modal>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default NewRegistrations;
