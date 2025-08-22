import React, { useRef, useState } from 'react';
import { useGetAllTodaysQuery } from '../../../context/todaysApi';
import { useUpdateRedirectedPatientMutation } from '../../../context/storyApi';
import { Table, Spin, Button, Typography, Modal } from 'antd';
import { PrinterOutlined, WarningOutlined } from '@ant-design/icons';
import { useReactToPrint } from "react-to-print";
import { capitalizeFirstLetter } from '../../../hook/CapitalizeFirstLitter';
import ModelCheck from '../../../components/check/modelCheck/ModelCheck';

const { Title } = Typography;

const NewRegistrations = () => {
    const { data: allStories, isLoading: isLoadingAllStories, refetch } = useGetAllTodaysQuery();
    const [updateRedirectedPatient] = useUpdateRedirectedPatientMutation();
    const contentRef = useRef(null);
    const [data, setData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [selectedPaymentType, setSelectedPaymentType] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const reactToPrintFn = useReactToPrint({
        contentRef,
        pageStyle: `
      @page {
        size: 80mm auto;
        margin: 0;
      }
      @media print {
        body { margin: 0; }
        * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
      }
    `
    });

    const handleRowPrint = (record) => {
        if (!record || !record.patientId || !record.doctorId) {
            console.error('Invalid record:', record);
            return;
        }

        const story = {
            response: {
                doctor: {
                    specialization: record.doctorId?.specialization || 'N/A',
                    firstName: record.doctorId?.firstName || 'N/A',
                    lastName: record.doctorId?.lastName || 'N/A',
                    phone: record.doctorId?.phone || 'N/A'
                },
                patient: {
                    firstname: record.patientId?.firstname || 'N/A',
                    lastname: record.patientId?.lastname || 'N/A',
                    phone: record.patientId?.phone || 'N/A',
                    idNumber: record.patientId?.idNumber || 'N/A',
                    address: record.patientId?.address || 'N/A',
                    paymentType: record.paymentType || 'N/A',
                    order_number: record.order_number || 0
                },
                created: record.createdAt || new Date().toISOString(),
                order_number: record.order_number || 0
            },
            services: record.services?.map(service => ({
                name: service.name,
                price: service.price
            })) || []
        };

        setData(story);
        setTimeout(() => {
            reactToPrintFn();
        }, 300);
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

        const data = {
            storyId: selectedRecord?._id,
            paymentType: selectedPaymentType,
            payment_amount: getTotalPrice(selectedRecord?.services)
        };

        try {
            const response = await updateRedirectedPatient(data).unwrap();
            const story = {
                response: {
                    doctor: {
                        specialization: response?.innerData?.doctor?.specialization || 'N/A',
                        firstName: response?.innerData?.doctor?.firstName || 'N/A',
                        lastName: response?.innerData?.doctor?.lastName || 'N/A',
                        phone: response?.innerData?.doctor?.phone || 'N/A'
                    },
                    patient: {
                        firstname: response?.innerData?.patient?.firstname || 'N/A',
                        lastname: response?.innerData?.patient?.lastname || 'N/A',
                        phone: response?.innerData?.patient?.phone || 'N/A',
                        idNumber: response?.innerData?.patient?.idNumber || 'N/A',
                        address: response?.innerData?.patient?.address || 'N/A',
                        paymentType: response?.innerData?.paymentType || 'N/A',
                        order_number: response?.innerData?.patient?.order_number || 0
                    },
                    created: response?.innerData?.createdAt || new Date().toISOString(),
                    order_number: response?.innerData?.order_number || 0
                },
                services: response?.innerData?.services?.map(service => ({
                    name: service.name,
                    price: service.price
                })) || []
            };

            setData(story);
            refetch(); // Refetch the table data
            setTimeout(() => {
                reactToPrintFn();
            }, 300);
        } catch (e) {
            console.error('Update failed:', e);
            setErrorMessage('To\'lov ma\'lumotlarini yangilashda xatolik yuz berdi.');
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

    // Function to check if a row contains "N/A"
    const hasNAValue = (record) => {
        return (
            !record.order_number ||
            !record.patientId?.firstname ||
            !record.patientId?.lastname ||
            !record.doctorId?.specialization ||
            !record.services?.length ||
            !record.payment_amount ||
            !record.paymentType ||
            !record.createdAt
        );
    };

    // Calculate total price of services
    const getTotalPrice = (services) => {
        return services?.length
            ? services.reduce((total, service) => total + (service.price || 0), 0)
            : 0;
    };


    const columns = [
        {
            title: 'Navbati',
            dataIndex: 'order_number',
            key: 'order_number',
            align: 'center',
            width: 80,
            render: (orderNumber) => orderNumber || 'N/A',
        },
        {
            title: 'Bemor ismi',
            key: 'patient_name',
            render: (_, record) => `${record.patientId.firstname} ${record.patientId.lastname}`,
            width: 150,
        },
        {
            title: 'Qabul',
            dataIndex: ['doctorId', 'specialization'],
            key: 'specialization',
            render: (phone) => capitalizeFirstLetter(phone),
            width: 120,
        },
        {
            title: 'Xizmatlar',
            key: 'services',
            render: (_, record) => {
                const serviceNames = record?.services?.map(service => service.name).join(', ') || 'Xizmatlar yoʻq';
                return serviceNames;
            },
            width: 200,
        },
        {
            title: 'To\'lov summasi',
            dataIndex: 'payment_amount',
            key: 'payment_amount',
            render: (amount) => amount ? `${amount?.toLocaleString()} soʻm` : "N/A",
            width: 120,
        },
        {
            title: 'To\'lov turi',
            dataIndex: 'paymentType',
            key: 'paymentType',
            render: (paymentType) => capitalizeFirstLetter(paymentType) || "N/A",
            width: 100,
        },
        {
            title: 'Soat',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => {
                const d = new Date(date);
                const hours = String(d.getHours()).padStart(2, '0');
                const minutes = String(d.getMinutes()).padStart(2, '0');
                return `${hours}:${minutes}`;
            },
            width: 80,
        },
        {
            title: 'Amallar',
            key: 'actions',
            align: 'center',
            render: (_, record) => (
                hasNAValue(record) ? (
                    <Button
                        type="primary"
                        icon={<WarningOutlined />}
                        onClick={() => handleNAAlert(record)}
                        size="small"
                        className="no-print"
                        style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}
                    >
                        Eslatma
                    </Button>
                ) : (
                    <Button
                        type="primary"
                        icon={<PrinterOutlined />}
                        onClick={() => handleRowPrint(record)}
                        size="small"
                        className="no-print"
                        style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
                    >
                        Chop etish
                    </Button>
                )
            ),
            width: 120,
        },
    ];

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
        .highlight-row { background-color: #ffe6e6 !important; }
        .highlight-row td { border-color: #ff9999 !important; }
        .payment-type-button { margin: 5px; }
    `;

    const sortedData = allStories?.innerData
        ? [...allStories.innerData].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        : [];

    return (
        <div className="registration-container">
            <style>{tableStyles}</style>
            <Title level={4} className="registration-title">
                Qabulni kutyotgan bemorlar
            </Title>
            {isLoadingAllStories ? (
                <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />
            ) : (
                <Table
                    columns={columns}
                    dataSource={sortedData}
                    rowKey={(record) => record._id}
                    bordered
                    pagination={false}
                    size="small"
                    style={{ background: '#fff' }}
                    rowClassName={(record) => hasNAValue(record) ? 'highlight-row' : ''}
                />
            )}
            <div style={{ display: 'none' }}>
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
                <p style={{ color: "green" }}>Jami to'lov: {getTotalPrice(selectedRecord?.services).toLocaleString()} so'm</p>
                <div style={{ marginTop: '10px' }}>
                    <Button
                        type={selectedPaymentType === 'naqt' ? "primary" : "default"}
                        onClick={() => handlePaymentTypeSelect('naqt')}
                        className="payment-type-button"
                    >
                        Naqd
                    </Button>
                    <Button
                        type={selectedPaymentType === 'karta' ? "primary" : "default"}
                        onClick={() => handlePaymentTypeSelect('karta')}
                        className="payment-type-button"
                    >
                        Karta
                    </Button>
                </div>
                {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
            </Modal>
        </div>
    );
};

export default NewRegistrations;
