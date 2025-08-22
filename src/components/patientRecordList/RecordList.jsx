import React from "react";
import { useGetClinicsQuery } from "../../context/clinicApi";
import { useGetDoctorByIdQuery } from "../../context/doctorApi";
import { PhoneNumberFormat } from "../../hook/NumberFormat";
import Logo from "./4.png";
import "./style.css";
import moment from "moment";

function RecordList({ componentRef, records, selectedPatient, data }) {
  const patcent = records?.patientId || {};

  const { data: clinicData } = useGetClinicsQuery();
  const clinic = clinicData?.innerData || {};

  const workerId = localStorage.getItem("workerId");
  const { data: doctor } = useGetDoctorByIdQuery(workerId, {
    skip: !workerId,
  });

  const BaxodirShifoLogo = ({
    width = 300,
    height = 120,
    color = "#000",
    className = "",
  }) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 300 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Medical Cross Background */}
        <rect x="20" y="20" width="25" height="10" fill={color} rx="2" />
        <rect x="27.5" y="12.5" width="10" height="25" fill={color} rx="2" />

        {/* Heartbeat Line - next to CLINIC */}
        <path
          d="M45 62 L55 62 L58 55 L62 68 L65 52 L68 72 L72 62 L97 62"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Main Text - BAXODIR-SHIFO */}
        <text
          x="150"
          y="35"
          fill={color}
          fontSize="24"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
        >
          BAXODIR-SHIFO
        </text>

        {/* Subtitle - CLINIC */}
        <text
          x="130"
          y="65"
          fill={color}
          fontSize="18"
          fontWeight="600"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          letterSpacing="2px"
        >
          CLINIC
        </text>

        <path
          d="M163 62 L195 62 L198 55 L202 68 L205 52 L208 72 L212 62 L222 62"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div ref={componentRef} className="prescription-document-masterpiece">
      {/* Decorative corner elements */}
      <div className="ornamental-corner-topleft"></div>
      <div className="ornamental-corner-topright"></div>
      <div className="ornamental-corner-bottomleft"></div>
      <div className="ornamental-corner-bottomright"></div>

      {/* Background watermark */}
      <div className="watermark-medical-backdrop">
        <img src={Logo} alt="Watermark Logo" />
      </div>

      {/* Header Section */}
      <div className="header-institutional-prestigious">
        <div className="ministry-information-left">
          <div className="government-seal-container">
            <div className="uzbekistan-emblem-stylized">🇺🇿</div>
          </div>
          <div className="official-text-hierarchy">
            <p className="republic-title-primary">Ўзбекиcтон Республикаси</p>
            <p className="ministry-title-secondary">
              Соғлиқни Сақлаш Вазирлиги
            </p>
            <p className="regional-title-tertiary">
              Тошкент шаҳри Соғлиқни
            </p>
            <p className="department-title-quaternary">сақлаш Бошқармаси</p>
          </div>
        </div>

        <div className="central-logo-box">
          <div className="central-logo-magnificent">
            <img height={300} src={Logo} alt="Clinic Logo" />
          </div>
        </div>

        <div className="clinic-information-right">
          <div className="address-contact-wrapper">
            <div className="clinic-address-formatted">
              <p className="address-text-professional">
                <span className="location-marker">📍</span>
                {clinic?.address || "Address not available"}
                <br />"{clinic?.address || "N/A"}" Мед Центр мчж га
                <br />
                қарашли даволаш маскани
              </p>
            </div>
            <div className="contact-phone-styled">
              <span className="phone-icon">📞</span>
              <p className="phone-number-formatted">
                +998 {PhoneNumberFormat(clinic?.phone) || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Recommendations Section */}
      <div className="medical-recommendations-detailed">
        <h2 className="section-title-prominent">Tashxis va davolash</h2>
        <div className="prescription-lines-containerone">
          <p className="section-title-pashxis">
            {data?.diagnosis || "Tashxis topilmadi"}
          </p>
        </div>

        <h2 className="section-title-prominent">
          Retsept va dori-darmonlar 💊
        </h2>
        <div className="prescription-lines-container">
          {Array.isArray(data?.prescriptions) &&
            data?.prescriptions.length > 0 ? (
            data?.prescriptions.map((item, index) => (
              <div key={index} className="prescription-item">
                <div className="prescription-line">
                  <h4>
                    {index + 1}. {item.medicationName || "Nomaʼlum dori"}
                  </h4>
                  <p>
                    <strong>Kuniga:</strong> {item.dosagePerDay} marta
                  </p>{" "}
                  |
                  <p>
                    <strong>Davomiyligi:</strong> {item.durationDays} kun
                  </p>
                </div>
                {item.description && (
                  <p>
                    <strong>Tavsif:</strong> {item.description}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>

        <h2 className="section-title-prominent">Tavsiylar</h2>
        <div className="prescription-lines-containerone">
          <p className="section-title-pashxis">
            {data?.recommendations || "Tavsiya topilmadi"}
          </p>
        </div>
      </div>

      {/* Patient Data Section */}
      <div className="patient-data-comprehensive">
        <div className="information-grid-sophisticated">
          <div className="data-field-container">
            <span className="field-label-professional">Бемор:</span>
            <div className="field-value-underlined">
              {selectedPatient?.patientId?.name || "N/A"}
            </div>
          </div>
          <div className="data-field-container">
            <span className="field-label-professional">Yoshi:</span>
            <div className="field-value-underlined">
              {selectedPatient?.patientId?.age || "N/A"}
            </div>
          </div>
          <div className="data-field-container">
            <span className="field-label-professional">Сана:</span>
            <div className="field-value-underlined">
              {moment().format("YYYY-MM-DD")}
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Information Footer */}
      <div className="physician-signature-section">
        <div className="doctor-credentials-left">
          <div className="doctor-info-card">
            <div className="doctor-avatar-placeholder">👨‍⚕️</div>
            <div className="doctor-details-formatted">
              <p className="doctor-specialization">
                {doctor?.innerData?.specialization ||
                  "Specialization not available"}{" "}
                shifokori
              </p>
              <p className="doctor-name-prominent">
                {`${doctor?.innerData?.firstName || ""} ${doctor?.innerData?.lastName || ""
                  }`.trim() || "N/A"}
              </p>
              <p className="doctor-contact-info">
                📱 +998 {PhoneNumberFormat(doctor?.innerData?.phone) || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="signature-space-right">
          <div className="signature-line-elegant">
            <div className="signature-placeholder-line"></div>
            <p className="signature-label">Шифокор имзоси:</p>
          </div>
        </div>
      </div>

      {/* Footer Notice */}
      <div className="prescription-footer-notice">
        <p className="validity-notice">
          ⚠️ Ушбу рецепт 30 кун муддатга амал қилади
        </p>
      </div>
    </div>
  );
}

export default RecordList;
