import React from "react";
import { Form, Input, Button, Row, Table, Modal, Col } from "antd";
import {
  useCreateRoomServicesMutation,
  useDeleteRoomServicesMutation,
  useGetRoomServicesQuery,
  useUpdateRoomServicesMutation,
} from "../../../context/roomServicesApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const { Item: FormItem } = Form;

function RoomServices() {
  const { data } = useGetRoomServicesQuery();
  const [createRoomServices] = useCreateRoomServicesMutation();
  const [updateRoomServices] = useUpdateRoomServicesMutation();
  const [deleteRoomServices] = useDeleteRoomServicesMutation();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      values.price = Number(values.price);
      await createRoomServices(values);
      toast.success("Muvaffaqiyatli qo`shildi");
    } catch (error) {
      toast.error("Xatolik yuz berdi");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRoomServices(id);
      toast.success("Muvaffaqiyatli o`chirildi");
    } catch (error) {
      toast.error("Xatolik yuz berdi");
    }
  };

  const handleUpdate = async (values) => {
    values.price = Number(values.price);
    try {
      await updateRoomServices({ id: isModalOpen._id, data: values });
      toast.success(" Muvaffaqiyatli o`zgartirildi");
    } catch (error) {
      toast.error("Xatolik yuz berdi");
    }
  };

  const columns = [
    {
      title: "Nomi",
      dataIndex: "name",
    },
    {
      title: "Narxi",
      dataIndex: "price",
    },
    {
      title: "Qo'shilgan sana",
      dataIndex: "sana",
      render: (_, record) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "Amallar",
      dataIndex: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            onClick={() => {
              setIsModalOpen(record);
              form.setFieldsValue(record);
            }}
          >
            Yangilash
          </Button>
          <Button
            danger
            onClick={() => {
              handleDelete(record._id);
            }}
          >
            O'chirish
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <ToastContainer />
      <Modal
        title="Edit"
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
          form.submit();
        }}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form onFinish={handleUpdate} form={form} layout="horizontal">
          <FormItem label="name" name="name">
            <Input />
          </FormItem>
          <FormItem label="price" name="price">
            <Input type="number" />
          </FormItem>
        </Form>
      </Modal>

      <Form onFinish={onFinish} layout="horizontal">
        <Row gutter={16}>
          <Col>
            <FormItem label="Nomi" name="name">
              <Input />
            </FormItem>
          </Col>
          <Col>
            <FormItem label="Narxi" name="price">
              <Input type="number" />
            </FormItem>
          </Col>

          <Button type="primary" htmlType="submit">
            Saqlash
          </Button>
        </Row>
      </Form>
      <Table rowKey={(record) => record._id} columns={columns} dataSource={data?.innerData || []} />
    </div>
  );
}

export default RoomServices;
