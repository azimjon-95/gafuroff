import React, { useEffect } from "react";
import { useGetRoomStoriesForDoctorQuery } from "../../../context/roomApi";
import { useGetRoomServicesQuery } from "../../../context/roomServicesApi";
import {
  useAssignRoomServicesMutation,
  useGetPatientServicesQuery,
  useUpdateChoosedServicesMutation,
} from "../../../context/choosedRoomServicesApi";
import { Button, Table, Modal, Input, Checkbox } from "antd";
import { toast } from "react-toastify";

function ChooseService() {
  const { data } = useGetRoomStoriesForDoctorQuery();
  const result = data?.innerData || [];

  const { data: roomServices } = useGetRoomServicesQuery();
  const roomServicesData = roomServices?.innerData || [];

  const [assignRoomServices] = useAssignRoomServicesMutation();
  const [updateChoosedServices] = useUpdateChoosedServicesMutation();

  const [selectedPatient, setSelectedPatient] = React.useState(null);
  const [selectedServices, setSelectedServices] = React.useState({});
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Fetch existing services for the selected patient
  const { data: patientServicesData, error } = useGetPatientServicesQuery(
    selectedPatient?._id,
    {
      skip: !selectedPatient,
    }
  );


  // Pre-populate selectedServices with existing data
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

  const showModal = (record) => {
    setSelectedPatient(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
    setSelectedServices({});
  };

  const handleOk = async () => {
    const servicesArray = Object.entries(selectedServices)
      .filter(([_, val]) => val.selected && val.part && val.quantity > 0)
      .map(([serviceId, val]) => ({
        serviceId,
        part: val.part,
        quantity: Number(val.quantity),
        dailyTracking: val.dailyTracking || [],
      }));

    if (!servicesArray.length) {
      return toast.warning(
        "Hech qanday xizmat tanlanmadi yoki maydonlar to‘ldirilmagan"
      );
    }

    if (!selectedPatient?._id || !selectedPatient?.patientId?._id) {
      return toast.error("Bemor yoki xona ma'lumotlari topilmadi");
    }

    const payload = {
      roomStoryId: selectedPatient._id,
      patientId: selectedPatient.patientId._id,
      services: servicesArray,
    };

    try {
      let response;
      if (patientServicesData?.innerData?._id) {
        response = await updateChoosedServices(payload).unwrap();
        toast.success("Xizmatlar muvaffaqiyatli yangilandi");
      } else {
        response = await assignRoomServices(payload).unwrap();
        toast.success("Xizmatlar muvaffaqiyatli biriktirildi");
      }


      // Check if response.innerData.services exists
      if (!response?.innerData?.services || !Array.isArray(response.innerData.services)) {
        throw new Error("Invalid response: services array is missing or not an array");
      }

      setIsModalOpen(false);
      const updatedServices = {};
      response.innerData.services.forEach((service) => {
        updatedServices[service.serviceId._id] = {
          selected: true,
          part: service.part,
          quantity: service.quantity,
          dailyTracking: service.dailyTracking || [],
        };
      });
      setSelectedServices(updatedServices);
    } catch (err) {
      console.error("Error saving services:", err);
      toast.error(`Xizmatlarni saqlashda xato: ${err.message || err.data?.message || "Noma'lum xato"}`);
    }
  };

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

  const columns = [
    {
      title: "Bemor",
      render: (_, record) =>
        record?.patientId?.firstname + " " + record?.patientId?.lastname,
    },
    {
      title: "Mas'ul doktor",
      render: (_, record) =>
        record?.doctorId?.firstName + " " + record?.doctorId?.lastName,
    },
    {
      title: "Xona raqami",
      render: (_, record) => record?.roomId?.roomNumber,
    },
    {
      title: "Xizmat qo'shish",
      render: (_, record) => (
        <Button type="primary" onClick={() => showModal(record)}>
          Tanlash/Tahrirlash
        </Button>
      ),
    },
  ];

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

  return (
    <div className="choose-service">
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={result}
        pagination={false}
        size="small"
      />

      <Modal
        width={1000}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title={
          selectedPatient
            ? `${selectedPatient.patientId.firstname} ${selectedPatient.patientId.lastname}`
            : "Xizmat tanlash"
        }
      >
        <Table
          rowKey={(record) => record._id}
          columns={columns2}
          dataSource={roomServicesData}
          pagination={false}
          size="small"
        />
      </Modal>
    </div>
  );
}

export default ChooseService;