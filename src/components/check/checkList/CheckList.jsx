import React from "react";
import "./style.css";
import { NumberFormat } from "../../../hook/NumberFormat";

const CheckList = React.forwardRef(({
  componentRef,
  firstname,
  lastname,
  payState,
  doctorLastName,
  doctorSpecialization,
  Hours,
  todaysTime,
  doctorPhone,
  filterarxiv,
  doctorsData,
  queueNumber,
  paySum,
  clinicInfo,
}, ref) => {
  return (
    <div ref={ref} className="print-container">
      <center id="top">
        <div className="logo">
          <h1>{clinicInfo?.name}</h1>
          <p>Shifoxona markazi</p>
        </div>
        <div className="info">
          <h2 className="item-h2">Har doim siz bilan!</h2>
        </div>
      </center>

      <div id="mid">
        <div className="info">
          <h2 style={{ textAlign: "center" }} className="item-h2">
            Aloqa uchun ma'lumot
          </h2>
          <p className="text_p">
            Manzil: {clinicInfo?.address}
            <br />
            Telefon: {clinicInfo?.contacts[0]}
            <br />
          </p>
        </div>
      </div>

      {filterarxiv === true ? (
        <div id="bot">
          <div id="table">
            <div className="tabletitle">
              <div className="item_check"></div>
              <div className="Hours"></div>
              <div className="Rate"></div>
            </div>

            <div className="service">
              <div className="tableitem">
                <p className="itemtext">Xonaning nomeri :</p>
              </div>
              <div className="tableitem">
                <p className="itemtext">{doctorLastName}</p>
              </div>
            </div>

            <div className="service">
              <div className="tableitem">
                <p className="itemtext">Davolanish kuni :</p>
              </div>
              <div className="tableitem">
                <p className="itemtext">{payState} kun</p>
              </div>
            </div>

            <div className="service">
              <div className="tableitem">
                <p className="itemtext">1 kunlik narxi :</p>
              </div>
              <div className="tableitem">
                <p className="itemtext">{NumberFormat(doctorPhone)} so'm</p>
              </div>
            </div>

            <div className="service">
              <div className="tableitem">
                <p className="itemtext">Bemor:</p>
              </div>
              <div className="tableitem">
                <p className="itemtext">
                  {firstname} {lastname}
                </p>
              </div>
            </div>

            <div className="service">
              <div className="tableitem">
                <p className="itemtext text_p">Sana :</p>
              </div>
              <div className="tableitem">
                <p className="itemtext text_p">
                  {Hours} {todaysTime}
                </p>
              </div>
            </div>

            <div className="tabletitle">
              <div className="tableitem">
                <p>To'landi: </p>
              </div>
              <div className="payment">
                <p className="item-h1">
                  {NumberFormat(doctorSpecialization)} so'm
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div id="bot">
          <div id="table">
            <div className="tabletitle">
              <div className="item_check"></div>
              <div className="Hours"></div>
              <div className="Rate"></div>
            </div>

            {doctorsData?.map((i, inx) => (
              <div key={inx} className="service">
                <div className="tableitem">
                  <p className="itemtext">{i.specialization}</p>
                </div>
                <div className="tableitem">
                  <p className="itemtext">
                    {i.lastName} {i.firstName}
                  </p>
                </div>
              </div>
            ))}

            <div className="service">
              <div className="tableitem">
                <p className="itemtext">Doktor Tel :</p>
              </div>
              <div className="tableitem">
                {doctorsData?.map((i, inx) => (
                  <p key={inx} className="itemtext">
                    +998{i.phone}
                  </p>
                ))}
              </div>
            </div>

            <div className="service">
              <div className="tableitem">
                <p className="itemtext">Qabul :</p>
              </div>
              <div className="tableitem">
                <p className="itemtext">{NumberFormat(paySum)} so'm</p>
              </div>
            </div>

            <div className="service">
              <div className="tableitem">
                <p className="itemtext text_p">Bemor:</p>
              </div>
              <div className="tableitem">
                <p className="itemtext text_p">
                  {firstname} {lastname}
                </p>
              </div>
            </div>

            <div className="service">
              <div className="tableitem">
                <p className="itemtext text_p">Sana :</p>
              </div>
              <div className="tableitem">
                <p className="itemtext text_p">
                  {Hours} {todaysTime}
                </p>
              </div>
            </div>

            <div className="service">
              <div className="tableitem">
                <p className="itemtext text_p">Jami:</p>
              </div>
              <div className="tableitem">
                <p className="itemtext text_p">
                  {NumberFormat(paySum)} so'm
                </p>
              </div>
            </div>
          </div>

          <div id="legalcopy">
            <h1>{queueNumber}</h1>
            <p>Sizning navbatingiz!</p>
          </div>
        </div>
      )}
    </div>
  );
});

CheckList.displayName = 'CheckList';

export default CheckList;