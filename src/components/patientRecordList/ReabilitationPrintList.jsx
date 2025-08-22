// import React from "react";
// import moment from "moment";
// import "./print.css";

// const ReabilitationPrintList = React.forwardRef(
//   ({ patient, services = [], doctor }, ref) => {
//     return (
//       <div ref={ref} className="a4-reabilitation-sheet" style={{ padding: 20 }}>
//         <h2 style={{ textAlign: "center", marginTop: 0, marginBottom: 20 }}>
//           Reabilitatsiya xizmatlari ro‘yxati
//         </h2>
//         <div style={{ marginBottom: 20 }}>
//           <strong>Bemor:</strong> {patient?.name} <br />
//         </div>
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr>
//               <th style={{ border: "1px solid #222" }}>#</th>
//               <th style={{ border: "1px solid #222" }}>Xizmat</th>
//               <th style={{ border: "1px solid #222" }}>Tana qismi</th>
//               <th style={{ border: "1px solid #222" }}>Miqdori</th>
//             </tr>
//           </thead>
//           <tbody>
//             {services.map((item, idx) => (
//               <tr key={idx}>
//                 <td style={{ border: "1px solid #222" }}>{idx + 1}</td>
//                 <td style={{ border: "1px solid #222" }}>{item.serviceName}</td>
//                 <td style={{ border: "1px solid #222" }}>{item.part}</td>
//                 <td style={{ border: "1px solid #222" }}>{item.quantity}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div
//           style={{
//             marginTop: 50,
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <p>
//             <strong>Shifokor:</strong> {doctor}
//           </p>
//           <p>
//             <strong>Sana:</strong> {moment().format("YYYY-MM-DD")}
//           </p>
//         </div>
//       </div>
//     );
//   }
// );

// export default ReabilitationPrintList;

import React from "react";
import moment from "moment";
import "./print.css";

const ReabilitationPrintList = React.forwardRef(
  ({ patient, services = [], doctor }, ref) => {
    return (
      <div ref={ref} className="a4-reabilitation-sheet" style={{ padding: 20 }}>
        <h2 style={{ textAlign: "center", marginTop: 0, marginBottom: 20 }}>
          Reabilitatsiya xizmatlari ro'yxati
        </h2>
        <div style={{ marginBottom: 20 }}>
          <strong>Bemor:</strong> {patient?.name || "Noma'lum"} <br />
        </div>

        {services.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: 20,
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid #222",
                    padding: "8px",
                    textAlign: "left",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  #
                </th>
                <th
                  style={{
                    border: "1px solid #222",
                    padding: "8px",
                    textAlign: "left",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  Xizmat
                </th>
                <th
                  style={{
                    border: "1px solid #222",
                    padding: "8px",
                    textAlign: "left",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  Tana qismi
                </th>
                <th
                  style={{
                    border: "1px solid #222",
                    padding: "8px",
                    textAlign: "left",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  Miqdori
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((item, idx) => (
                <tr key={idx}>
                  <td
                    style={{
                      border: "1px solid #222",
                      padding: "8px",
                    }}
                  >
                    {idx + 1}
                  </td>
                  <td
                    style={{
                      border: "1px solid #222",
                      padding: "8px",
                    }}
                  >
                    {item.serviceName || "Noma'lum xizmat"}
                  </td>
                  <td
                    style={{
                      border: "1px solid #222",
                      padding: "8px",
                    }}
                  >
                    {item.part || "-"}
                  </td>
                  <td
                    style={{
                      border: "1px solid #222",
                      padding: "8px",
                    }}
                  >
                    {item.quantity || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center", color: "#666", marginBottom: 20 }}>
            Hech qanday xizmat tanlanmagan
          </p>
        )}

        <div
          style={{
            marginTop: 50,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p>
            <strong>Shifokor:</strong> {doctor || "Noma'lum"}
          </p>
          <p>
            <strong>Sana:</strong> {moment().format("DD.MM.YYYY")}
          </p>
        </div>

        <div style={{ marginTop: 30, textAlign: "center" }}>
          <p>________________________</p>
          <p style={{ fontSize: "12px", color: "#666" }}>Shifokor imzosi</p>
        </div>
      </div>
    );
  }
);

ReabilitationPrintList.displayName = "ReabilitationPrintList";

export default ReabilitationPrintList;
