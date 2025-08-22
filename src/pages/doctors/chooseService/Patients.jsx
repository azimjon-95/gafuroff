import React from "react";
import { useGetRoomStoriesQuery } from "../../../context/roomApi";
import { Table, Button, Modal } from "antd";
import { capitalizeFirstLetter } from '../../../hook/CapitalizeFirstLitter';
import { MedicineBoxOutlined } from "@ant-design/icons";
import MarkServices from "./MarkServices";
import PrescriptionModal from "./PrescriptionModal";
import './MarkServices.css';

function Patients() {
  const { data } = useGetRoomStoriesQuery();
  const roomStories = data?.innerData || [];
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = React.useState(false);
  const [selectedPatient, setSelectedPatient] = React.useState(null);

  const columns = [
    {
      title: "Bemor",
      render: (_, record) =>
        record?.patientId?.firstname + " " + record?.patientId?.lastname,
    },
    {
      title: "Mas'ul doktor",
      render: (_, record) =>
        capitalizeFirstLetter(record?.doctorId?.firstName) + " " + record?.doctorId?.lastName + " | " + capitalizeFirstLetter(record?.doctorId?.specialization),
    },
    {
      title: "Xona raqami",
      render: (_, record) => record?.roomId?.roomNumber,
    },
    {
      title: "Qavati",
      render: (_, record) => record?.roomId?.floor,
    },
    {
      title: "Ko'rish",
      render: (_, record) => (
        <div className="action-buttons-container-modern-layout">
          <Button
            type="primary"
            className="view-button-primary-action"
            onClick={() => setIsModalOpen(record)}
          >
            Davolash
          </Button>
          <Button
            type="default"
            className="prescription-button-secondary-action"
            icon={<MedicineBoxOutlined />}
            onClick={() => {
              setSelectedPatient(record);
              setIsPrescriptionModalOpen(true);
            }}
          >
            Dori/ukol rejalari
          </Button>
        </div>
      )
    },
  ];

  return (
    <div className="patients-management-container">
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={roomStories}
        pagination={false}
        className="patients-table-modern-design"
      />

      <Modal
        width={800}
        title={
          isModalOpen?.patientId?.firstname +
          " " +
          isModalOpen?.patientId?.lastname
        }
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <MarkServices patientId={isModalOpen?._id} />
      </Modal>

      <PrescriptionModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        patientData={selectedPatient}
      />
    </div>
  );
}

export default Patients;