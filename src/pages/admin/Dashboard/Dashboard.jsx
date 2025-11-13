import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  Users,
  BedDouble,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useSelector } from "react-redux";
import DoctorsSlite from "./doctorsSlite/doctorsSlite";
import "./clinicDashboard.css";
import { useGetDashboardQuery } from "../../../context/dashboardApi";
import moment from "moment";

const Dashboard = () => {
  const { selectedMonth } = useSelector((state) => state.month);
  // const { data: dashboardData, isLoading } =
  //   useGetDashboardQuery(selectedMonth);
  const { data: dashboardData, isLoading } = useGetDashboardQuery(
    selectedMonth,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const data = dashboardData?.innerData || [];


  // Function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("uz-UZ", {
      style: "currency",
      currency: "UZS",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const kirim = data?.kirim_chiqimChart?.kirim || [];
  const chiqim = data?.kirim_chiqimChart?.chiqim || [];

  const chartData = kirim.map((k, i) => ({
    date: k.date,
    income: k.amount,
    expenses: chiqim[i]?.amount || 0,
  }));

  return (
    <div className="complex-root-container">
      <DoctorsSlite data={data?.doctorsInfo} isLoading={isLoading} />
      <div className="complex-main-wrapper">
        {/* Stats Cards */}
        <div className="complex-stats-grid">
          <div className="complex-stats-card complex-stats-card-blue">
            <div className="complex-stats-card-flex">
              <div>
                <p className="complex-stats-label">Jami Bemorlar</p>
                <p className="complex-stats-value">
                  {data?.bemorlarOqimi?.thisMonth?.toLocaleString() || 0}
                </p>
                <p
                  className={`complex-stats-trend-${data?.bemorlarOqimi?.prevMonth >= 0 ? "green" : "red"
                    }`}
                >
                  {data?.bemorlarOqimi?.prevMonth >= 0 ? "+" : ""}
                  {data?.bemorlarOqimi?.prevMonth}% o'tgan oyga nisbatan
                </p>
              </div>
              <Users className="complex-icon-blue" />
            </div>
          </div>

          <div className="complex-stats-card complex-stats-card-green">
            <div className="complex-stats-card-flex">
              <div>
                <p className="complex-stats-label">Yotqizilgan Bemorlar</p>
                <p className="complex-stats-value">
                  {data?.yotqizilganBemorlar?.thisMonth || 0}
                </p>
                <p
                  className={`complex-stats-trend-${data?.yotqizilganBemorlar?.percentChange >= 0
                      ? "green"
                      : "red"
                    }`}
                >
                  {data?.yotqizilganBemorlar?.percentChange >= 0 ? "+" : ""}
                  {data?.yotqizilganBemorlar?.percentChange}% o'tgan oyga
                  nisbatan
                </p>
              </div>
              <BedDouble className="complex-icon-green" />
            </div>
          </div>

          <div className="complex-stats-card complex-stats-card-purple">
            <div className="complex-stats-card-flex">
              <div>
                <p className="complex-stats-label">Jami Daromad</p>
                <p className="complex-stats-value complex-stats-value-income">
                  {formatCurrency(data?.kirim?.thisMonth || 0)}
                </p>
                <p
                  className={`complex-stats-trend-${data?.kirim?.percentChange >= 0 ? "green" : "red"
                    }`}
                >
                  {data?.kirim?.percentChange >= 0 ? "+" : ""}
                  {data?.kirim?.percentChange}% o'tgan oyga nisbatan
                </p>
              </div>
              <TrendingUp className="complex-icon-purple" />
            </div>
          </div>

          <div className="complex-stats-card complex-stats-card-red">
            <div className="complex-stats-card-flex">
              <div>
                <p className="complex-stats-label">Jami Xarajat</p>
                <p className="complex-stats-value complex-stats-value-income">
                  {formatCurrency(data?.chiqim?.thisMonth || 0)}
                </p>
                <p
                  className={`complex-stats-trend-${data?.chiqim?.percentChange >= 0 ? "green" : "red"
                    }`}
                >
                  {data?.chiqim?.percentChange >= 0 ? "+" : ""}
                  {data?.chiqim?.percentChange}% o'tgan oyga nisbatan
                </p>
              </div>
              <TrendingDown className="complex-icon-red" />
            </div>
          </div>
        </div>

        {/* Profit Card */}
        <div
          style={{
            background: data?.sofFoyda?.thisMonth > 0 ? "green" : "crimson",
          }}
          className="complex-profit-card"
        >
          <div className="complex-profit-flex">
            <div>
              <h2 className="complex-profit-title">Sof Foyda</h2>
              <p className="complex-profit-value">
                {formatCurrency(data?.sofFoyda?.thisMonth || 0)}
              </p>
              <p className="complex-profit-growth">
                <span className="complex-profit-growth-icon">
                  <TrendingUp className="complex-profit-icon" />
                  {data?.sofFoyda?.percentChange >= 0 ? "+" : ""}
                  {data?.sofFoyda?.percentChange}% o'sish
                </span>
              </p>
            </div>
            <DollarSign className="complex-profit-dollar-icon" />
          </div>
        </div>

        {/* Charts */}
        <div className="complex-charts-grid">
          {/* Line Chart */}
          <div className="complex-chart-container">
            <h3 className="complex-chart-title">Kunlik Daromad va Xarajat</h3>
            <ResponsiveContainer className="complex-chart-responsive">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  formatter={(value, name) => [
                    formatCurrency(value),
                    name === "income" ? "Daromad" : "Xarajat",
                  ]}
                  labelFormatter={(label) => `${label}-kun`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Daromad"
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Xarajat"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="complex-chart-container">
            <h3 className="complex-chart-title">Kunlik Bemorlar Soni</h3>
            <ResponsiveContainer className="complex-chart-responsive">
              <BarChart data={data?.kunlikOqim}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [value, "Bemorlar"]}
                  labelFormatter={(label) => `${label}-kun`}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Debit Credit Table */}
        <div className="complex-table-container">
          <h3 className="complex-table-title">Harajatlar</h3>
          <div className="complex-table-overflow">
            <table className="complex-table">
              <thead>
                <tr className="complex-table-header-row">
                  <th className="complex-table-header-cell">Sana</th>
                  <th className="complex-table-header-cell">Turi</th>
                  <th className="complex-table-header-cell">Miqdor</th>
                  <th className="complex-table-header-cell">Tavsif</th>
                  <th className="complex-table-header-cell">Kategoriya</th>
                </tr>
              </thead>
              <tbody className="complex-table-body">
                {data?.harajatlar?.map((item, index) => (
                  <tr key={index} className="complex-table-row">
                    <td className="complex-table-cell">
                      {moment(item?.createdAt).format("YYYY-MM-DD")}
                    </td>
                    <td className="complex-table-cell">
                      <span
                        className={`complex-table-cell-type-${item.type.toLowerCase()}`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="complex-table-cell complex-table-cell-amount">
                      {formatCurrency(item.amount)}
                    </td>
                    <td className="complex-table-cell complex-table-cell-description">
                      {item.description}
                    </td>
                    <td className="complex-table-cell">
                      <span
                        className={`complex-table-cell-category-${item.category.toLowerCase()}`}
                      >
                        {item.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="complex-table-summary">
            <div className="complex-summary-card-debit">
              <p className="complex-summary-label-debit">Jami Kirim</p>
              <p className="complex-summary-value complex-summary-value-debit">
                {formatCurrency(data?.kirim?.thisMonth || 0)}
              </p>
            </div>
            <div className="complex-summary-card-credit">
              <p className="complex-summary-label-credit">Jami chiqim</p>
              <p className="complex-summary-value complex-summary-value-credit">
                {formatCurrency(data?.chiqim?.thisMonth || 0)}
              </p>
            </div>
            <div className="complex-summary-card-balance">
              <p className="complex-summary-label-balance">Balans</p>
              <p className="complex-summary-value complex-summary-value-balance">
                {formatCurrency(data?.sofFoyda?.thisMonth || 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
