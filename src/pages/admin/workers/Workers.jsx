import React, { useState } from "react";
import {
  Tabs,
  Button,
  Table,
  Popconfirm,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
} from "antd";
import { useSelector } from "react-redux";
import ReactSelect from "react-select";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import {
  useGetWorkersQuery,
  useAddWorkerMutation,
  useUpdateWorkerMutation,
  useDeleteWorkerMutation,
} from "../../../context/doctorApi";
import { NumberFormat } from "../../../hook/NumberFormat";
import { capitalizeFirstLetter } from "../../../hook/CapitalizeFirstLitter";
import WorkerForm from "./WorkerForm";
import { specializationOptions } from "../../../utils/specializationOptions";
import LoadingTik from "../../../components/loading/LoadingTik";
import "./style.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Option } = Select;

const Workers = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null);
  const [updateForm] = Form.useForm();
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { data: workers, isLoading, error } = useGetWorkersQuery();
  const [addWorker] = useAddWorkerMutation();
  const [updateWorker] = useUpdateWorkerMutation();
  const [deleteWorker] = useDeleteWorkerMutation();
  const { searchQuery } = useSelector((state) => state.search);

  const [selectedServices, setSelectedServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (services) => {
    setSelectedServices(services);
    setIsModalOpen(true);
  };

  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  // Group workers by role for separate tabs
  const transformedWorkers = workers?.innerData?.map((worker) => ({
    ...worker,
    key: worker._id,
  }));

  const filterWorkersByRole = (role) => {
    return transformedWorkers?.filter((worker) => {
      if (!searchQuery) return worker.role === role;
      const query = searchQuery.toLowerCase();
      return (
        worker.role === role &&
        (worker.firstName?.toLowerCase().includes(query) ||
          worker.lastName?.toLowerCase().includes(query) ||
          worker.address?.toLowerCase().includes(query) ||
          worker.login?.toLowerCase().includes(query) ||
          worker.specialization?.toLowerCase().includes(query) ||
          worker.salary_per_month?.toString().includes(query) ||
          worker.admission_price?.toString().includes(query) ||
          worker.percentage_from_admissions?.toString().includes(query) ||
          worker.phone?.toLowerCase().includes(query))
      );
    });
  };

  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const submitData = {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        login: data.login,
        password: data.password,
        role: data.role,
        permissions: [data.role, ...(data.permissions || [])],
        salary_type: data.salary_type,
        salary_per_month:
          data.salary_type === "fixed" ? Number(data.salary_per_month) || 0 : 0,
        percentage_from_admissions:
          data.salary_type === "percentage"
            ? Number(data.percentage_from_admissions) || 0
            : 0,
        specialization: data.specialization || "",
        admission_price: Number(data.admissionPrice) || 0,
        phone: data.phone,
        birthday: data.birthday,
        idCardNumber: data.idCardNumber || null,
        ...(data.roomId !== null &&
          data.roomId !== undefined && { roomId: data.roomId }),
      };

      await addWorker(submitData).unwrap();
      toast.success("Xodim muvaffaqiyatli qo'shildi");
      setActiveTab("1");
      setIsSubmitting(false);
    } catch (err) {
      setSubmitError(err.data?.message || "Ro'yxatdan o'tishda xato yuz berdi");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!isValidObjectId(id)) {
      toast.error("Noto'g'ri ID formati");
      return;
    }
    try {
      await deleteWorker(id).unwrap();
      toast.success("Xodim muvaffaqiyatli o'chirildi");
    } catch (err) {
      toast.error("O'chirishda xato yuz berdi");
    }
  };

  const handleUpdate = (worker) => {
    setEditingWorker(worker);
    updateForm.setFieldsValue({
      ...worker,
      admissionPrice: worker.admission_price || 0,
      salary_type: worker.salary_type || "fixed",
      percentage_from_admissions: worker.percentage_from_admissions || 0,
      birthday: worker.birthday ? moment(worker.birthday) : null,
      specialization: worker.specialization || "",
    });
    setIsModalVisible(true);
  };

  const handleUpdateSubmit = async (values) => {
    if (!isValidObjectId(editingWorker.key)) {
      toast.error("Noto'g'ri ID formati");
      return;
    }
    try {
      const submitData = {
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        login: values.login,
        role: values.role,
        permissions: [values.role],
        salary_type: values.salary_type,
        salary_per_month:
          values.salary_type === "fixed" ? Number(values.salaryFrom) || 0 : 0,
        percentage_from_admissions:
          values.salary_type === "percentage"
            ? Number(values.percentage_from_admissions) || 0
            : 0,
        admission_price: Number(values.salary) || 0,
        phone: values.phone,
        birthday: values.birthday
          ? moment(values.birthday).format("YYYY-MM-DD")
          : null,
        specialization: values.role === "doctor" ? values.specialization : "",
        idCardNumber: values.idCardNumber || null,
      };

      if (values.password) {
        submitData.password = values.password;
      }

      await updateWorker({ id: editingWorker.key, ...submitData }).unwrap();
      toast.success("Xodim muvaffaqiyatli yangilandi");
      setIsModalVisible(false);
      updateForm.resetFields();
      setEditingWorker(null);
    } catch (err) {
      toast.error(err.data?.message || "Yangilashda xato yuz berdi");
    }
  };

  const columns = [
    { title: "Ism", dataIndex: "firstName", key: "firstName" },
    { title: "Familiya", dataIndex: "lastName", key: "lastName" },
    { title: "Manzil", dataIndex: "address", key: "address" },
    {
      title: "Lavozim",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        switch (role) {
          case "reception":
            return "Qabulxona";
          case "director":
            return "Direktor";
          case "doctor":
            return "Doktor";
          case "nurse":
            return "Hamshira";
          case "cleaner":
            return "Farrosh";
          default:
            return role;
        }
      },
    },
    ...(activeTab !== "1" && activeTab !== "3" && activeTab !== "4"
      ? [
          {
            title: "Mutaxassislik",
            dataIndex: "specialization",
            key: "specialization",
            render: (specialization) =>
              capitalizeFirstLetter(specialization || "-"),
          },
        ]
      : []),
    {
      title: "Oylik maosh / %",
      key: "salary_per_month",
      render: (_, salary) =>
        salary?.salary_type === "fixed" ? (
          <span style={{ textWrap: "nowrap" }}>
            {NumberFormat(salary?.salary_per_month || 0)} so'm
          </span>
        ) : (
          <span style={{ textWrap: "nowrap" }}>
            {salary?.percentage_from_admissions}%
          </span>
        ),
    },
    ...(activeTab !== "1" && activeTab !== "3" && activeTab !== "4"
      ? [
          {
            title: "Qabul narxi",
            render: (record) => {
              const services = record?.servicesId?.services;

              return services && services.length > 0 ? (
                <Button
                  type="primary"
                  size="small"
                  onClick={() => showModal(services)}
                >
                  Ko‘rish
                </Button>
              ) : (
                <Button
                  className="btn-tn"
                  onClick={() => {
                    window.location.href = "/service";
                  }}
                >
                  Hizmatlarni tanlang
                </Button>
              );
            },
          },
        ]
      : []),
    {
      title: "Xona raqami",
      dataIndex: "roomId",
      key: "roomId",
      align: "center",
      render: (_, roomId) =>
        roomId?.roomId ? (
          roomId?.roomId?.roomNumber
        ) : (
          <button
            style={{
              background: "none",
              border: "none",
              color: "#1890ff",
              cursor: "pointer",
              padding: 0,
              fontSize: "14px",
              textDecoration: "underline",
            }}
            onClick={() => {
              navigate("/cabins?2");
            }}
          >
            Xona tanlash
          </button>
        ),
    },
    { title: "Login", dataIndex: "login", key: "login" },
    { title: "Telefon", dataIndex: "phone", key: "phone" },
    {
      title: "Tug'ilgan sana",
      dataIndex: "birthday",
      key: "birthday",
      render: (birthday) =>
        birthday ? moment(birthday).format("YYYY-MM-DD") : "-",
    },
    { title: "NFS raqami", dataIndex: "idCardNumber", key: "idCardNumber" },
    {
      title: "Amallar",
      key: "actions",
      render: (_, record) => (
        <span style={{ display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleUpdate(record)}
          />
          <Popconfirm
            title="O'chirishni tasdiqlaysizmi?"
            onConfirm={() => handleDelete(record.key)}
            okText="Ha"
            cancelText="Yo'q"
          >
            <Button danger size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab="Qabulxona" key="1">
          {error && (
            <p>Xatolik: {error.message || "Ma'lumotlarni olishda xato"}</p>
          )}
          {isLoading ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LoadingTik />
            </div>
          ) : (
            <Table
              bordered
              size="small"
              columns={columns}
              dataSource={filterWorkersByRole("reception")}
              pagination={false}
              rowKey={(record) => record._id}
            />
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Doktorlar" key="2">
          <Modal
            title="Qabuldagi xizmatlar"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            {selectedServices.map((service, index) => (
              <div key={index}>
                {service.name}: {NumberFormat(service.price || 0)} so'm
              </div>
            ))}
          </Modal>

          {error && (
            <p>Xatolik: {error.message || "Ma'lumotlarni olishda xato"}</p>
          )}
          {isLoading ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LoadingTik />
            </div>
          ) : (
            <Table
              bordered
              size="small"
              columns={columns}
              dataSource={filterWorkersByRole("doctor")}
              pagination={false}
              rowKey={(record) => record._id}
            />
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Hamshiralar" key="3">
          {error && (
            <p>Xatolik: {error.message || "Ma'lumotlarni olishda xato"}</p>
          )}
          {isLoading ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LoadingTik />
            </div>
          ) : (
            <Table
              bordered
              size="small"
              columns={columns}
              dataSource={filterWorkersByRole("nurse")}
              pagination={false}
              rowKey={(record) => record._id}
            />
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Farroshlar" key="4">
          {error && (
            <p>Xatolik: {error.message || "Ma'lumotlarni olishda xato"}</p>
          )}
          {isLoading ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LoadingTik />
            </div>
          ) : (
            <Table
              bordered
              size="small"
              columns={columns}
              dataSource={filterWorkersByRole("cleaner")}
              pagination={false}
              rowKey={(record) => record._id}
            />
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Yangi xodim qo'shish" key="5">
          <WorkerForm
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        </Tabs.TabPane>
      </Tabs>

      <Modal
        title="Xodimni yangilash"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          updateForm.resetFields();
          setEditingWorker(null);
        }}
        footer={null}
        className="worker-update-modal"
      >
        <Form
          form={updateForm}
          layout="vertical"
          onFinish={handleUpdateSubmit}
          className="worker-update-form"
        >
          <div className="form-row">
            <Form.Item
              label="Ism"
              name="firstName"
              rules={[
                { required: true, message: "Ism kiritish shart" },
                {
                  minLength: 2,
                  message: "Ism 2-50 ta belgi oralig‘ida bo‘lishi kerak",
                },
                {
                  maxLength: 50,
                  message: "Ism 2-50 ta belgi oralig‘ida bo‘lishi kerak",
                },
              ]}
              className="form-item"
            >
              <Input placeholder="Ismni kiriting" />
            </Form.Item>
            <Form.Item
              label="Familiya"
              name="lastName"
              rules={[
                { required: true, message: "Familiya kiritish shart" },
                {
                  minLength: 2,
                  message: "Familiya 2-50 ta belgi oralig‘ida bo‘lishi kerak",
                },
                {
                  maxLength: 50,
                  message: "Familiya 2-50 ta belgi oralig‘ida bo‘lishi kerak",
                },
              ]}
              className="form-item"
            >
              <Input placeholder="Familiyani kiriting" />
            </Form.Item>
          </div>
          <div className="form-row">
            <Form.Item
              label="Manzil"
              name="address"
              rules={[
                { required: true, message: "Manzil kiritish shart" },
                {
                  minLength: 2,
                  message: "Manzil 2-100 ta belgi oralig‘ida bo‘lishi kerak",
                },
                {
                  maxLength: 100,
                  message: "Manzil 2-100 ta belgi oralig‘ida bo‘lishi kerak",
                },
              ]}
              className="form-item"
            >
              <Input placeholder="Manzilni kiriting" />
            </Form.Item>
            <Form.Item
              label="Telefon"
              name="phone"
              rules={[
                { required: true, message: "Telefon raqam kiritish shart" },
                { minLength: 7, message: "Telefon raqam noto‘g‘ri" },
                { maxLength: 15, message: "Telefon raqam noto‘g‘ri" },
                {
                  pattern: /^\+?\d{7,15}$/,
                  message: "Telefon raqam noto‘g‘ri",
                },
              ]}
              className="form-item"
            >
              <Input placeholder="Telefon raqamni kiriting" />
            </Form.Item>
          </div>
          <div className="form-row">
            <Form.Item
              label="Tug'ilgan sana"
              name="birthday"
              className="form-item"
              rules={[
                {
                  validator: async (_, value) =>
                    !value ||
                    moment(value, "YYYY-MM-DD", true).isValid() ||
                    "Tug‘ilgan sana noto‘g‘ri formatda (YYYY-MM-DD)",
                },
              ]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                placeholder="Tug'ilgan sanani tanlang"
                className="form-input"
              />
            </Form.Item>
            <Form.Item
              label="Login"
              name="login"
              rules={[
                { required: true, message: "Login kiritish shart" },
                {
                  minLength: 4,
                  message:
                    "Login 4-20 ta belgidan iborat, faqat harflar va raqamlar",
                },
                {
                  maxLength: 20,
                  message:
                    "Login 4-20 ta belgidan iborat, faqat harflar va raqamlar",
                },
                {
                  pattern: /^[a-zA-Z0-9]+$/,
                  message:
                    "Login 4-20 ta belgidan iborat, faqat harflar va raqamlar",
                },
              ]}
              className="form-item"
            >
              <Input placeholder="Loginni kiriting" />
            </Form.Item>
          </div>
          <div className="form-row">
            <Form.Item
              label="Parol"
              name="password"
              rules={[
                {
                  minLength: 6,
                  message: "Parol 6-50 ta belgi oralig‘ida bo‘lishi kerak",
                },
                {
                  maxLength: 50,
                  message: "Parol 6-50 ta belgi oralig‘ida bo‘lishi kerak",
                },
              ]}
              className="form-item"
            >
              <Input placeholder="Parolni kiriting (o'zgartirish uchun)" />
            </Form.Item>
          </div>
          <div className="form-row">
            <Form.Item
              label="Lavozim"
              name="role"
              rules={[{ required: true, message: "Rol noto‘g‘ri" }]}
              className="form-item"
            >
              <Select placeholder="Lavozimni tanlang">
                <Option value="reception">Qabulxona</Option>
                <Option value="director">Direktor</Option>
                <Option value="doctor">Doktor</Option>
                <Option value="nurse">Hamshira</Option>
                <Option value="cleaner">Farrosh</Option>
              </Select>
            </Form.Item>
            {updateForm.getFieldValue("role") === "doctor" && (
              <Form.Item
                label="Mutaxassislik"
                name="specialization"
                rules={[{ required: true, message: "Yo‘nalish noto‘g‘ri" }]}
                className="form-item"
              >
                <ReactSelect
                  options={specializationOptions}
                  placeholder="Mutaxassislikni tanlang"
                  isSearchable
                  onChange={(option) =>
                    updateForm.setFieldsValue({
                      specialization: option ? option.value : "",
                    })
                  }
                  value={specializationOptions.find(
                    (option) =>
                      option.value ===
                      updateForm.getFieldValue("specialization")
                  )}
                />
              </Form.Item>
            )}
          </div>
          <div className="form-row">
            <Form.Item
              label="Oylik turi"
              name="salary_type"
              rules={[
                {
                  required: true,
                  message: "Maosh turi noto‘g‘ri (fixed yoki percentage)",
                },
              ]}
              className="form-item"
            >
              <div className="role-buttons">
                {["fixed", "percentage"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      updateForm.setFieldsValue({ salary_type: type });
                      if (type === "fixed") {
                        updateForm.setFieldsValue({
                          percentage_from_admissions: 0,
                        });
                      } else {
                        updateForm.setFieldsValue({ salaryFrom: 0 });
                      }
                    }}
                    className={`role-button ${
                      updateForm.getFieldValue("salary_type") === type
                        ? "active"
                        : ""
                    }`}
                  >
                    {type === "fixed" ? "Belgilangan" : "Foizli"}
                  </button>
                ))}
              </div>
            </Form.Item>
            {updateForm.getFieldValue("salary_type") === "fixed" && (
              <Form.Item
                label="Oylik maosh"
                name="salaryFrom"
                rules={[
                  {
                    validator: async (_, value) =>
                      (Number(value) >= 0 && !isNaN(value)) ||
                      "Oylik maosh 0 dan katta son bo‘lishi kerak",
                  },
                ]}
                className="form-item"
              >
                <Input
                  type="number"
                  placeholder="Oylik maoshni kiriting"
                  min="0"
                />
              </Form.Item>
            )}
          </div>
          <Form.Item
            label="NFS raqam"
            name="idCardNumber"
            rules={[
              {
                validator: async (_, value) =>
                  (Number(value) >= 0 && !isNaN(value)) ||
                  "Oylik maosh 0 dan katta son bo‘lishi kerak",
              },
            ]}
            className="form-item"
          >
            <Input type="number" placeholder="NFS kodi" min="0" />
          </Form.Item>
          <div className="form-row">
            {updateForm.getFieldValue("salary_type") === "percentage" && (
              <Form.Item
                label="Qabul foizi (%)"
                name="percentage_from_admissions"
                rules={[
                  {
                    validator: async (_, value) =>
                      (Number(value) >= 0 &&
                        Number(value) <= 100 &&
                        !isNaN(value)) ||
                      "Foiz noto‘g‘ri (0 dan katta son)",
                  },
                ]}
                className="form-item"
              >
                <Input
                  type="number"
                  placeholder="Qabul foizini kiriting (0-100)"
                  min="0"
                  max="100"
                />
              </Form.Item>
            )}

            {updateForm.getFieldValue("role") === "doctor" && (
              <Form.Item
                label="Qabul narxi"
                name="salary"
                rules={[
                  {
                    validator: async (_, value) =>
                      (Number(value) >= 0 && !isNaN(value)) ||
                      "Qabul narxi noto‘g‘ri",
                  },
                ]}
                className="form-item"
              >
                <Input
                  type="number"
                  placeholder="Qabul narxini kiriting"
                  min="0"
                />
              </Form.Item>
            )}
          </div>
          <Form.Item className="form-submit">
            <Button type="primary" htmlType="submit" block>
              Yangilash
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Workers;
