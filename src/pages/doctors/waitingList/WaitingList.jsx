import React, { useState, useRef } from "react";
import {
  useGetRedirectedPatientsQuery,
  useUpdateRedirectedPatientMutation,
} from "../../../context/storyApi";
import { Button, Table, Modal } from "antd";
import ModelCheck from "../../../components/check/modelCheck/ModelCheck";

function WaitingList() {
  const {
    data: redirectedPatients,
    isLoading,
    refetch,
  } = useGetRedirectedPatientsQuery();
  const [updateRedirectedPatient] = useUpdateRedirectedPatientMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState(null);
  const contentRef = useRef(null);

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

    const data = {
      storyId: selectedRecord?._id,
      paymentType: selectedPaymentType,
      payment_amount: getTotalPrice(selectedRecord?.services),
    };

    try {
      const response = await updateRedirectedPatient(data).unwrap();

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
            firstname: response?.innerData?.patient?.firstname || "N/A",
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

      setData(story);
      refetch(); // Refetch the table data
      setTimeout(() => {
        reactToPrintFn();
      }, 300);
    } catch (e) {
      console.error("Update failed:", e);
      setErrorMessage("To'lov ma'lumotlarini yangilashda xatolik yuz berdi.");
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
  // Calculate total price of services
  const getTotalPrice = (services) => {
    return services?.length
      ? services.reduce((total, service) => total + (service.price || 0), 0)
      : 0;
  };

  const columns = [
    {
      title: "Bemor",
      render: (record) => (
        <p>{record.patientId.firstname + " " + record.patientId.lastname}</p>
      ),
    },
    {
      title: "Doktor",
      render: (record) => (
        <p>
          {record.doctorId.firstName +
            " " +
            record.doctorId.lastName +
            " - " +
            record.doctorId.specialization}
        </p>
      ),
    },
    {
      title: "Xizmatlar",
      dataIndex: "services",
      render: (services) =>
        services && services.length > 0
          ? services.map((s) => (
              <div key={s._id}>
                {s.name} - {s.price} so'm
              </div>
            ))
          : "-",
    },
    {
      title: "Yo'naltirilgan sana",
      dataIndex: "createdAt",
      render: (date) => (date ? new Date(date).toLocaleString("uz-UZ") : "-"),
    },
    {
      title: "Aktiv qilish",
      render: (record) => (
        <Button type="primary" onClick={() => handleNAAlert(record)}>
          Aktiv qilish
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={redirectedPatients?.innerData || []}
        rowKey={(record) => record._id}
        loading={isLoading}
        pagination={false}
      />

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
    </div>
  );
}

export default WaitingList;
