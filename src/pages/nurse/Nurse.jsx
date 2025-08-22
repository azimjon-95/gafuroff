import React, { useState, useEffect, useMemo, useCallback } from "react";
import { MdOutlineBedroomChild, MdLocalHospital } from "react-icons/md";
import { FaUsers, FaUserNurse, FaBroom, FaHospital } from "react-icons/fa";
import { FiEye, FiUser } from "react-icons/fi";
import { TbElevator } from "react-icons/tb";
import { RiNurseFill } from "react-icons/ri";
import { BiHealth } from "react-icons/bi";
import Door from "../../assets/door.png";
import "./style.css";
import "./tabStyle.css";
import { useGetRoomsQuery } from "../../context/roomApi";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, Table, Tabs } from "antd";
import { useGetUnassignedPatientsQuery } from "../../context/choosedRoomServicesApi";
import { data } from "react-router-dom";
import MarkServices from "./MarkServices";
const { TabPane } = Tabs;

const Nurse = () => {
  const [tableHeight, setTableHeight] = useState(600);
  const { data: rooms, isLoading, error: fetchError } = useGetRoomsQuery();
  const { data: unassignedPatients } = useGetUnassignedPatientsQuery();

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const height = Math.max(window.innerHeight - 170);
      setTableHeight(height);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getBedStatusColor = (status) => {
    switch (status) {
      case "bo'sh":
        return "#10b981"; // emerald
      case "band":
        return "#f59e0b"; // amber
      case "toza emas":
        return "#ef4444"; // red
      case "toza":
        return "#10b981"; // emerald
      default:
        return "#6b7280"; // gray
    }
  };
  1;

  if (isLoading) {
    return (
      <div className="hospital-loading-wrapper">
        <div className="hospital-loading-spinner">
          <FaHospital className="hospital-loading-icon" />
          <p>Xonalar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  const openModal = (e) => {
    setSelectedPatient(e);
    setOpen(true);
  };

  const patients = [
    {
      title: "Ismi",
      dataIndex: ["patientId patientId firstname"],
      render: (_, item) => item.patientId.patientId.firstname,
    },
    {
      title: "Familiya",
      dataIndex: ["patientId patientId lastname"],
      render: (_, item) => item.patientId.patientId.lastname,
    },
    {
      title: "Telefon",
      dataIndex: ["patientId patientId phone"],
      render: (_, item) => item.patientId.patientId.phone,
    },
    {
      title: "Davolash",
      render: (_, record) => (
        <Button onClick={() => openModal(record)} type="primary">
          Davolash
        </Button>
      ),
    },
  ];

  return (
    <div className="hospital-table-container">
      <Tabs>
        <TabPane tab="Davolanish Bo'limidagilar" key="1">
          <div
            className="hospital-table-wrapper"
            style={{ maxHeight: `${tableHeight}px` }}
          >
            <table className="hospital-rooms-table">
              <thead className="hospital-table-header">
                <tr>
                  <th className="room-number-header">
                    <FaHospital />
                    Xona Nomeri
                  </th>
                  <th className="floor-header">
                    <TbElevator />
                    Qavat
                  </th>
                  <th className="capacity-header">
                    <MdOutlineBedroomChild />
                    Xona Sig'imi
                  </th>
                  <th className="patients-header">
                    <FaUsers />
                    Bemorlar Soni
                  </th>
                  <th className="supervision-header">
                    <RiNurseFill />
                    Hamshira
                  </th>
                  <th className="supervision-header">
                    <RiNurseFill />
                    Orastabon
                  </th>
                  <th className="actions-header">
                    <BiHealth />
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="hospital-table-body">
                {rooms?.innerData?.map((room, index) => (
                  <tr
                    key={room._id}
                    className={`hospital-room-row ${index % 2 === 0 ? "even-row" : "odd-row"
                      }`}
                  >
                    {/* Room Number */}
                    <td className="room-number-cell">
                      <div className="room-door-container">
                        <img
                          src={Door}
                          alt="Door"
                          className="room-door-image"
                        />
                        <div className="room-number-badge">
                          <strong>{room.roomNumber}</strong>
                        </div>
                      </div>
                    </td>

                    {/* Floor */}
                    <td className="floor-cell">
                      <div className="floor-info">
                        <TbElevator className="floor-icon" />
                        <div className="floor-details">
                          <span className="floor-label">Qavat</span>
                          <span className="floor-number">{room?.floor}</span>
                        </div>
                      </div>
                    </td>

                    {/* Room Capacity */}
                    <td className="capacity-cell">
                      <div className="capacity-info">
                        <div className="bed-status-container">
                          {room?.beds?.map((bed, bedIndex) => (
                            <div
                              key={bedIndex}
                              className="bed-status-indicator"
                              style={{
                                backgroundColor: getBedStatusColor(bed.status),
                              }}
                              title={bed.status}
                            />
                          ))}
                        </div>
                        <div className="capacity-details">
                          <MdOutlineBedroomChild className="capacity-icon" />
                          <span>{room?.usersNumber} o'rin</span>
                        </div>
                      </div>
                    </td>

                    {/* Patients Count */}
                    <td className="patients-cell">
                      <div className="patients-info">
                        {room.capacity.length === room.usersNumber ? (
                          <div className="room-status busy-room">
                            <FiUser />
                            Xonada joy yo'q
                          </div>
                        ) : room.capacity.length === 0 ? (
                          <div className="room-status empty-room">
                            <MdOutlineBedroomChild />
                            Bo'sh xona
                          </div>
                        ) : (
                          <div className="room-status occupied-room">
                            <FaUsers />
                            {room.capacity.length} bemor
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Supervision */}
                    <td className="supervision-cell">
                      <div className="supervision-info">
                        {room.nurse ? (
                          <div className="staff-info nurse-info">
                            <FaUserNurse className="staff-icon" />
                            <div className="staff-details">
                              <span className="staff-name">
                                {room.nurse.firstName} {room.nurse.lastName}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="staff-info no-staff">
                            <FaUserNurse className="staff-icon inactive" />
                            <div className="staff-details">
                              <span className="staff-name">Tanlanmagan</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    {/* Supervision */}
                    <td className="supervision-cell">
                      <div className="supervision-info">
                        {room.cleaner ? (
                          <div className="staff-info cleaner-info">
                            <FaBroom className="staff-icon" />
                            <div className="staff-details">
                              <span className="staff-name">
                                {room.cleaner.firstName} {room.cleaner.lastName}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="staff-info no-staff">
                            <FaBroom className="staff-icon inactive" />
                            <div className="staff-details">
                              <span className="staff-name">Tanlanmagan</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="actions-cell">
                      <a
                        href={`/nurseroom/${room._id}`}
                        className={`room-view-button ${room.capacity.length === 0 ? "disabled" : ""
                          }`}
                        style={{
                          pointerEvents:
                            room.capacity.length === 0 ? "none" : "auto",
                        }}
                      >
                        <FiEye className="view-icon" />
                        <span>Ko'rish</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {rooms?.innerData?.length === 0 && (
              <div className="no-rooms-message">
                <MdLocalHospital className="no-rooms-icon" />
                <h3>Xonalar topilmadi</h3>
                <p>Hozircha ko'rsatish uchun xonalar mavjud emas</p>
              </div>
            )}
          </div>
        </TabPane>
        <TabPane tab="Davolanmaydiganlar" key="2">
          <Table
            columns={patients}
            dataSource={unassignedPatients?.innerData || []}
            rowKey={(record) => record._id}
          />
          <Modal
            footer={null}
            title={`${selectedPatient?.patientId?.patientId?.firstname +
              " " +
              selectedPatient?.patientId?.patientId?.lastname
              }ga muolaja Belgilash `}
            open={open}
            onCancel={() => setOpen(false)}
            width={1000}
          >
            <MarkServices patientId={selectedPatient?.patientId?._id} />
          </Modal>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Nurse;
