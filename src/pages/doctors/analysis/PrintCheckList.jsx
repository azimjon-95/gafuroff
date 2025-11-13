import React, { useEffect, useState } from "react";
import moment from "moment";
import "./css/printStyle.css";

const PrintCheckList = ({ ref, data, result }) => {
  const [patientData, setPatientData] = useState({});
  console.log("PrintCheckList data:", data);
  console.log("PrintCheckList result:", result);

  useEffect(() => {
    if (data) {
      setPatientData(data);
    }
  }, [data]);
  const fallbackId = React.useMemo(
    () => Math.floor(Math.random() * 1000000),
    []
  );

  const { innerData } = result || {};
  const { results = [] } = innerData || {};

  const formatToDDMMYYYY = (dateString) => {
    if (!dateString) return "_______________";
    return moment(dateString).format("DD.MM.YYYY");
  };

  const doctorName =
    localStorage.getItem("admin_fullname") || localStorage.getItem("doctor");

  const formattedDate = formatToDDMMYYYY(moment().format("YYYY-MM-DD"));

  const clinicData = {
    name: "Медицинский центр",
    address: "Тошкент шаҳри",
    phone: "+998 (90) 123-45-67",
  };

  const groupAnalyses = (results) => {
    const groups = {};
    const analysisMapping = {
      1: "Biokimyoviy Tahlil",
      2: "Umumiy Tahlil",
      3: "Eritrotsitlar",
      4: "Siydik Tahlili",
      5: "Chokmas Tahlili",
    };

    results.forEach((item) => {
      const groupName = analysisMapping[item.analis] || "Boshqa";
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(item);
    });

    return groups;
  };

  const analysisGroups = groupAnalyses(results);
  console.log(patientData);
  return (
    <div ref={ref} className="lib-laboratory-report">
      {/* Header */}
      <header className="lib-report-header">
        <div className="lib-clinic-info">
          <h1 className="lib-clinic-name">{clinicData?.name}</h1>
          <p className="lib-clinic-address">{clinicData?.address}</p>
          <p className="lib-clinic-phone">{clinicData?.phone}</p>
        </div>
        <div className="lib-lab-title">
          <h2 className="lib-main-title">ЛАБОРАТОРИЯ</h2>
          <div className="lib-lab-subtitle">Тиббий текширув натижалари</div>
        </div>
      </header>

      <div className="lib-divider"></div>

      {/* Patient Information */}
      <section className="lib-patient-info">
        <h3 className="lib-section-header">Бемор маълумотлари</h3>
        <div className="lib-info-grid">
          <div className="lib-info-item">
            <span className="lib-label">Бемор:</span>
            <span className="lib-value">{patientData?.patientId?.name}</span>
          </div>
          <div className="lib-info-item">
            <span className="lib-label">Туғилган сана:</span>
            <span className="lib-value">{patientData?.patientId?.age}</span>
          </div>
          <div className="lib-info-item">
            <span className="lib-label">Сана:</span>
            <span className="lib-value">{formattedDate}</span>
          </div>
          <div className="lib-info-item">
            <span className="lib-label">Амбулатория №:</span>
            <span className="lib-value">{patientData?._id || fallbackId}</span>
          </div>
        </div>
      </section>

      {/* Doctor Information */}
      <section className="lib-doctor-info">
        <div className="lib-doctor-grid">
          <div className="lib-doctor-item">
            <span className="lib-label">Лаборант:</span>
            <span className="lib-value">{doctorName}</span>
          </div>
          <div className="lib-doctor-item">
            <span className="lib-label">Имзо:</span>
            <span className="lib-signature-line">_______________</span>
          </div>
        </div>
      </section>

      {/* Analysis Results */}
      <main className="lib-analysis-results">
        {Object.entries(analysisGroups || {}).map(([tabTitle, data], index) =>
          data && data.length ? (
            <div key={index} className="lib-analysis-section">
              <h3 className="lib-section-title">{tabTitle}</h3>
              <div className="lib-table-container">
                <table className="lib-results-table">
                  <thead>
                    <tr className="lib-table-header">
                      <th className="lib-col-number">№</th>
                      <th className="lib-col-parameter">Параметрлар</th>
                      <th className="lib-col-result">Натижа</th>
                      <th className="lib-col-norm">Норма</th>
                      <th className="lib-col-unit">Бирлик</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, inx) => (
                      <tr key={inx} className="lib-result-row">
                        <td className="lib-number">{inx + 1}</td>
                        <td className="lib-parameter">{item?.name || "___"}</td>
                        <td className="lib-result">{item?.result || "___"}</td>
                        <td className="lib-norm">{item?.norma || "___"}</td>
                        <td className="lib-unit">{item?.siBirlik || "___"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null
        )}
      </main>

      {/* Footer */}
      <footer className="lib-report-footer">
        <div className="lib-footer-info">
          <p className="lib-footer-note">
            Натижалар фақат текширилган параметрлар учун берилган
          </p>
          <p className="lib-print-date">Чоп этилган: {formattedDate}</p>
        </div>
      </footer>
    </div>
  );
};

export default PrintCheckList;
