import React from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { FaUsers } from "react-icons/fa6";
import { TbFilePercent } from "react-icons/tb";
import { GiTakeMyMoney } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import "./style.css"; // Importing styles for the component
import { FaBed } from "react-icons/fa";
const NumberFormat = (value) => {
  if (!value) return "0";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function DoctorsSlite({ data, isLoading }) {
  // const navigate = useNavigate();

  return (
    <div className="carousel">
      {!isLoading ? (
        data?.map((value, inx) => (
          <Link
            // to={`/doctorSinglePage/${value.idNumber}/${value.specialization}`}
            key={inx}
            className="card"
            style={{
              minWidth: value?.firstName.length >= 11 ? "180px" : "150px",
            }}
          >
            <div className="card-inner">
              <FaUserDoctor className="card_icon" />
              <span className="doctorname">
                {value?.firstName
                  ? value?.firstName?.toUpperCase() +
                    "." +
                    value?.lastName[0]?.toUpperCase()
                  : ""}
              </span>
              <b>{value?.specialization}</b>
            </div>
            <div className="allInfoTotal">
              <div className="CountDay-M">
                <FaBed />
                {value?.periodCount}
              </div>
              <div className="CountDay-M">
                <LiaMoneyBillWaveSolid /> {NumberFormat(value?.totalPrice)}
              </div>
              <div className="CountDay-M">
                <FaUsers />
                {" " + NumberFormat(value?.clientLength)}
              </div>
              <div className="CountDay-M">
                {value?.percent ? (
                  <div className="CountDay-Box">
                    <div className="CountDay-M">
                      <TbFilePercent /> {value?.percent}%
                    </div>
                    <div className="CountDay-M">
                      <GiTakeMyMoney /> {" " + NumberFormat(value?.ownPrice)}
                    </div>
                  </div>
                ) : (
                  <div className="CountDay-M">
                    <GiTakeMyMoney /> {NumberFormat(value.salary)} so'm
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <>
          {/* Skeleton loading placeholders when no doctors are available */}
          {[...Array(4)].map((_, index) => (
            <div className="cardSkl" key={index}>
              <div className="headerSkl">
                <div className="imgSkl"></div>
                <div className="details">
                  <span className="nameSkl"></span>
                  <span className="about"></span>
                </div>
              </div>
              <div className="description">
                <div className="lineSkl line-1"></div>
                <div className="lineSkl line-2"></div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default DoctorsSlite;
