import React, { forwardRef } from "react";
import { useGetClinicsQuery } from "../../../context/clinicApi";

const ReceiptContent = forwardRef(
  ({ patient, services, total, componentRef }) => {
    const { data: clinics } = useGetClinicsQuery();

    const getSafe = (obj, path, defaultValue = "N/A") =>
      path.reduce(
        (xs, x) => (xs && xs[x] !== undefined ? xs[x] : defaultValue),
        obj
      );

    const clinicInfo = {
      name: getSafe(clinics, ["innerData", "clinicName"], "Unknown Clinic"),
      address: getSafe(clinics, ["innerData", "address"], "N/A"),
      contacts: getSafe(clinics, ["innerData", "phone"], ["N/A"]),
    };

    return (
      <div
        ref={componentRef}
        style={{
          width: "80mm",
          padding: "10px",
          fontFamily: "monospace",
          fontSize: "12px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <b style={{ textAlign: "center", fontSize: "18px" }}>
          {clinicInfo.name}
        </b>
        <p style={{ textAlign: "center" }}>{clinicInfo.address}</p>
        <p style={{ textAlign: "center" }}>Tel:{clinicInfo.contacts}</p>
        <b style={{ textAlign: "center", fontSize: "16px", margin: "12px 0" }}>
          To'lov cheki
        </b>
        <div>
          <div>
            <strong>Bemor:</strong> {patient.firstname} {patient.lastname}
          </div>
        </div>
        <hr />
        {services.map((s, i) => (
          <div
            key={s._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "4px 0",
            }}
          >
            <span>
              {i + 1}. {s.serviceId.name}
            </span>
            <span>{s.serviceId.price?.toLocaleString()} so'm</span>
          </div>
        ))}
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
          }}
        >
          <span>Umumiy:</span>
          <span>{total.toLocaleString()} so'm</span>
        </div>
        <hr style={{ margin: "12px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Sana:</strong> {new Date().toLocaleString()}
        </div>
        <div style={{ textAlign: "center", marginTop: "12px" }}>
          Rahmat! Sog'lik tilaymiz!
        </div>
      </div>
    );
  }
);

export default ReceiptContent;
