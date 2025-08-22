import React from "react";
import { Table, Checkbox, Tooltip } from "antd";
import { capitalizeFirstLetter } from "../../hook/CapitalizeFirstLitter";
import moment from "moment";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import {
  useGetRoomServicesStoryQuery,
  useMarkTreatmentDoneByStoryIdMutation,
} from "../../context/choosedRoomServicesApi";
import { toast } from "react-toastify";

function MarkServices({ patientId }) {
  const { data, refetch } = useGetRoomServicesStoryQuery(patientId);
  const [markTreatment] = useMarkTreatmentDoneByStoryIdMutation();
  const workerId = localStorage.getItem("workerId");

  const services = data?.innerData?.services || [];
  const today = moment().startOf("day").toDate();

  const uniqueDates = Array.from(
    new Set(
      services
        .flatMap((service) => service.dailyTracking || [])
        .map((tracking) => moment(tracking.date).startOf("day").toISOString())
    )
  ).sort();

  const isChecked = (dailyTracking, checkDate = today) => {
    return dailyTracking?.some(
      (tracking) =>
        moment(tracking.date).startOf("day").toISOString() ===
        moment(checkDate).startOf("day").toISOString()
    );
  };

  const getRoleName = (role) => {
    switch (role) {
      case "doctor":
        return "Doktor";
      case "reseption":
        return "Qabulchi";
      case "nurse":
        return "Hamshira";
      default:
        return "Noma'lum";
    }
  };

  const getWorkerName = (dailyTracking, checkDate = today) => {
    const tracking = dailyTracking?.find((t) =>
      moment(t.date).startOf("day").isSame(moment(checkDate).startOf("day"))
    );

    if (!tracking?.workerId) return "Noma'lum";

    const { firstName, lastName, role } = tracking?.workerId;
    return `${capitalizeFirstLetter(firstName)} ${lastName} [${getRoleName(
      role
    )}]`;
  };

  const handleToggle = async (id, serviceId, checked) => {
    try {
      if (checked) {
        await markTreatment({
          patientId,
          serviceId,
          date: today,
          workerId,
          id,
        }).unwrap();
        toast.success("Bugungi muolaja belgilandi");
      } else {
        await markTreatment({
          patientId,
          serviceId,
          date: today,
          workerId,
          action: "remove",
          id,
        }).unwrap();
        toast.success("Bugungi muolaja o'chirildi");
      }
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Xatolik yuz berdi");
    }
  };

  // O'zbekcha oy nomlari
  const uzbekMonthNames = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
  ];

  // Oy bo'yicha uniqueDates massivini guruhlash
  const groupedDates = uniqueDates.reduce((acc, date) => {
    const m = moment(date);
    const monthName = uzbekMonthNames[m.month()]; // 0-11 index
    const year = m.format("YYYY"); // faqat ikki raqamli yil: 25, 26

    const key = `${monthName}-${year}`; // Masalan: Iyul 25

    if (!acc[key]) acc[key] = [];
    acc[key].push(date);

    return acc;
  }, {});

  const columns = [
    {
      title: "Muolaja",
      render: (_, r) => (
        <span className="table-cell">{r?.serviceId?.name}</span>
      ),
    },
    {
      title: "Soxa",
      dataIndex: "part",
      render: (part) => <span className="table-cell">{part}</span>,
    },
    {
      title: "Miqdori",
      dataIndex: "quantity",
      render: (quantity) => <span className="table-cell">{quantity}</span>,
    },
    {
      title: "Olindi",
      dataIndex: "dailyTracking",
      render: (dailyTracking) => (
        <span className="table-cell">{dailyTracking?.length || 0}</span>
      ),
    },

    // Oy nomi bo'yicha guruhlangan dynamic sanalar
    ...Object.entries(groupedDates).map(([monthName, dates]) => ({
      title: monthName, // Subheader
      children: dates.map((date) => ({
        title: moment(date).format("DD"), // Quyida chiqadigan sana (kun)
        dataIndex: "dailyTracking",
        render: (_, r) => {
          const isServiceChecked = isChecked(r.dailyTracking, moment(date));
          const workerName = getWorkerName(r.dailyTracking, moment(date));
          return (
            <span className="table-cell">
              {isServiceChecked ? (
                <Tooltip title={`Belgilagan: ${workerName}`}>
                  <CheckCircleOutlined
                    style={{ color: "#52c41a", fontSize: 18 }}
                  />
                </Tooltip>
              ) : (
                <CloseCircleOutlined
                  style={{ color: "#ff4d4f", fontSize: 18 }}
                />
              )}
            </span>
          );
        },
      })),
    })),
    {
      title: "Bugun belgilash",
      render: (_, r) => {


        const isServiceChecked = isChecked(r.dailyTracking);
        return (
          <span className="table-cell">
            <Checkbox
              checked={isServiceChecked}
              onChange={(e) =>
                handleToggle(r._id, r.serviceId._id, e.target.checked)
              }
            />
          </span>
        );
      },
    },
  ];

  return (
    <Table
      rowKey={(r) => r.serviceId._id}
      dataSource={services}
      columns={columns}
      pagination={false}
      size="small"
      className="mark-services-table"
    />
  );
}

export default MarkServices;
