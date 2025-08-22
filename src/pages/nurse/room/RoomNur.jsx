import React, { useMemo, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRoomByIdQuery } from "../../../context/roomApi";
import PrescriptionModal from "../../doctors/chooseService/PrescriptionModal";

import "./style.css";
import MarkServices from "../../doctors/chooseService/MarkServices";

// Constants
const ROOM_CATEGORIES = {
  pollux: "Polyuks",
  luxury: "Lyuks",
  econom: "Oddiy",
};

// Helper Functions
const capitalizeFirstLetter = (str) =>
  str ? `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}` : "";
const formatPhone = (phone) =>
  phone
    ? `+998 ${phone
      .replace(/\D/g, "")
      .match(/(\d{2})(\d{3})(\d{2})(\d{2})/)
      ?.slice(1)
      .join(" ") || phone
    }`
    : "N/A";

const calculateRoomPayment = (record) =>
  record?.paidDays?.reduce((sum, day) => sum + (day?.price || 0), 0) || 0;

// Custom Table Component
const CustomTable = ({ columns, dataSource, loading, rowKey }) => {
  if (loading) {
    return (
      <div className="table-loading-container">
        <div className="table-loading-spinner"></div>
        <p>Ma'lumotlar yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="custom-table-wrapper">
      <div className="custom-table-container">
        <table className="custom-table">
          <thead className="custom-table-header">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="custom-table-header-cell">
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="custom-table-body">
            {dataSource.map((record, rowIndex) => (
              <tr key={record[rowKey] || rowIndex} className="custom-table-row">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="custom-table-cell">
                    {col.render
                      ? col.render(record[col.dataIndex], record)
                      : record[col.dataIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Custom Modal Component
const CustomModal = ({ title, open, onCancel, children, width = 1000 }) => {
  if (!open) return null;

  return (
    <div className="custom-modal-overlay" onClick={onCancel}>
      <div
        className="custom-modal-container"
        style={{ width: `${width}px` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="custom-modal-header">
          <h3 className="custom-modal-title">{title}</h3>
          <button className="custom-modal-close-btn" onClick={onCancel}>
            <span className="close-icon">×</span>
          </button>
        </div>
        <div className="custom-modal-content">{children}</div>
      </div>
    </div>
  );
};

// Custom Button Component
const CustomButton = ({
  children,
  onClick,
  className,
  disabled,
  type = "default",
  size = "medium",
}) => {
  const buttonClass = `custom-btn custom-btn-${type} custom-btn-${size} ${className || ""
    }`;

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

function RoomNur() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: roomData,
    isLoading: isLoadingRoom,
    error: roomError,
  } = useGetRoomByIdQuery(id);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] =
    React.useState(false);
  const [selectedPatientStory, setSelectedPatientStory] = React.useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const getCategoryLabel = useCallback(
    (category) => ROOM_CATEGORIES[category] || category,
    []
  );

  const patients = useMemo(
    () =>
      roomData?.innerData?.capacity?.map((item) => ({
        _id: item._id,
        clientID: item.patientId?.idNumber || "N/A",
        clientMongooseId: item.patientId?._id,
        clientFullname: `${item.patientId?.firstname || ""} ${item.patientId?.lastname || ""
          }`.trim(),
        clientPhone: item.patientId?.phone,
        startDay: item.startDay,
        payForRoom: item.roomId?.pricePerDay || 0,
        paidDays: item.paidDays || [],
        clientPayForRoomPrice: calculateRoomPayment(item),
        roomNumber: item.roomId?.roomNumber,
        doctorId: item.doctorId,
        storiesId: item.storiesId,
        active: item.active,
        endDay: item.endDay,
      })) || [],
    [roomData?.innerData?.capacity]
  );

  const confirmExitRoom = useCallback((record) => {
    setSelectedPatient(record);
    setIsModalVisible(true);
  }, []);

  const confirmExitStory = useCallback((record) => {
    setSelectedPatientStory(record);
    setIsPrescriptionModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalVisible(false);
    setSelectedPatient(null);
  }, []);

  const calculateDebt = useCallback((record) => {
    if (!record?.paidDays || !record?.payForRoom) return 0;
    return record.paidDays
      .filter((day) => !day.isPaid)
      .reduce((sum, day) => sum + (record.payForRoom - (day.price || 0)), 0);
  }, []);

  const columns = useMemo(
    () => [
      {
        title: "Bemor",
        dataIndex: "clientFullname",
        render: (text) => capitalizeFirstLetter(text) || "N/A",
      },
      {
        title: "Telefon raqami",
        dataIndex: "clientPhone",
        render: (phone) => formatPhone(phone),
      },
      {
        title: "Boshlanish sanasi",
        dataIndex: "startDay",
        render: (date) => date || "N/A",
      },
      {
        title: "Davolanish kuni",
        dataIndex: "paidDays",
        render: (days) => `${days?.length || 0} kun`,
      },
      {
        title: "Doktor",
        dataIndex: "doctorId",
        render: (doctorId) =>
          doctorId
            ? `${doctorId.firstName || ""} ${doctorId.lastName || ""}, ${doctorId.specialization || ""
              }`.trim()
            : "N/A",
      },
      {
        title: "Muolaja belgilash",
        render: (_, record) => {

          return (
            <div className="CustomButton-box">
              <CustomButton
                onClick={() => confirmExitRoom(record)}
                className={"btn-warning"}
                type={"warning"}
                size="small"
              >
                Belgilash
              </CustomButton>
              {record?.storiesId === undefined ? (
                "Retsept topilmadi"
              ) : (

                <CustomButton
                  onClick={() => confirmExitStory(record)}
                  className={"custom-btn-warning-vin"}
                  type={"warning"}
                  size="small"
                >
                  Belgilash
                </CustomButton>
              )}
            </div>
          );
        },
      },
    ],
    [confirmExitRoom, calculateDebt]
  );

  const roomInfo = roomData?.innerData || {};
  const roomDetails = useMemo(
    () => [
      { label: "Xona raqami", value: roomInfo.roomNumber },
      { label: "Qavat", value: roomInfo.floor },
      { label: "Kategoriya", value: getCategoryLabel(roomInfo.category) },
      { label: "Bemorlar soni", value: roomInfo.usersNumber },
      { label: "Sig'imi", value: roomInfo.capacity?.length || 0 },
    ],
    [roomInfo, getCategoryLabel]
  );

  if (isLoadingRoom)
    return (
      <div className="room-management-wrapper">
        <div className="room-loading-state">
          <div className="loading-animation"></div>
          <p>Ma'lumotlar yuklanmoqda...</p>
        </div>
      </div>
    );

  if (roomError)
    return (
      <div className="room-management-wrapper">
        <div className="room-error-container">
          <CustomButton onClick={() => navigate(-1)} type="primary">
            Orqaga
          </CustomButton>
          <div className="error-message">
            <p>Xatolik yuz berdi: {roomError.message || "Noma'lum xatolik"}</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="room-management-wrapper">
      <div className="room-details-panel">
        <CustomButton
          onClick={() => navigate(-1)}
          type="primary"
          className="back-navigation-btn"
        >
          Orqaga
        </CustomButton>

        {roomDetails.map((item, index) => (
          <div key={index} className="room-info-item">
            <span className="room-info-label">{item.label}:</span>
            <span className="room-info-value">{item.value || "N/A"}</span>
          </div>
        ))}
      </div>

      <div className="patients-section">
        <h2 className="section-title">Bemorlar ro'yxati</h2>
        <CustomTable
          columns={columns}
          dataSource={patients}
          loading={isLoadingRoom}
          rowKey="_id"
        />
      </div>

      <CustomModal
        title={`${selectedPatient?.clientFullname}ga | Muolaja Belgilash `}
        open={isModalVisible}
        onCancel={handleModalClose}
      >
        <MarkServices patientId={selectedPatient?._id} />
      </CustomModal>

      <PrescriptionModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        patientData={selectedPatientStory}
      />
    </div>
  );
}

export default RoomNur;
