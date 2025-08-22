import React from "react";
import {
  Calendar,
  FileText,
  Stethoscope,
  Upload,
  Scale,
  Heart,
  CheckCircle,
} from "lucide-react";
import { MdCall } from "react-icons/md";
import { IoMdMale } from "react-icons/io";
import "./style.css";

const ConsultationViewSkeleton = () => {
  return (
    <div className="consultation-container">
      <div className="consultation-header">
        <div className="detail-item-conat">
          <div className="skeleton-back-btn skeleton-shimmer"></div>
          <div className="patient-info-header">
            <div className="skeleton-avatar skeleton-shimmer"></div>
            <div>
              <div className="skeleton-text-large skeleton-shimmer"></div>
              <div className="skeleton-text-small skeleton-shimmer"></div>
            </div>
          </div>
        </div>
        <div className="detail-item-conat">
          <div className="detail-item-box">
            <div className="detail-item">
              <MdCall className="detail-icon" />
              <div>
                <div className="skeleton-label skeleton-shimmer"></div>
                <div className="skeleton-text skeleton-shimmer"></div>
              </div>
            </div>
            <div className="detail-item">
              <Calendar className="detail-icon" />
              <div>
                <div className="skeleton-label skeleton-shimmer"></div>
                <div className="skeleton-text skeleton-shimmer"></div>
              </div>
            </div>
          </div>
          <div className="detail-item-box">
            <div className="detail-item">
              {/* <IoLocationSharp className="detail-icon" /> */}
              <div>
                <div className="skeleton-label skeleton-shimmer"></div>
                <div className="skeleton-text skeleton-shimmer"></div>
              </div>
            </div>
            <div className="detail-item">
              <IoMdMale className="detail-icon" />
              <div>
                <div className="skeleton-label skeleton-shimmer"></div>
                <div className="skeleton-text skeleton-shimmer"></div>
              </div>
            </div>
          </div>
          <div className="detail-item">
            <div className="medical-info-container">
              <div className="bmi-info">
                <Scale size={17} color="#6b7280" aria-hidden="true" />
                <div className="skeleton-text skeleton-shimmer"></div>
              </div>
              <div className="blood-group-info">
                <Heart size={16} color="#dc2626" aria-hidden="true" />
                <div className="skeleton-text skeleton-shimmer"></div>
              </div>
              <div className="skeleton-text skeleton-shimmer"></div>
            </div>
          </div>
        </div>
        {/* <div className="history-list">
          {Array(3)
            .fill()
            .map((_, index) => (
              <div key={index} className="history-item">
                <Calendar className="history-icon" />
                <div className="skeleton-text skeleton-shimmer"></div>
              </div>
            ))}
        </div> */}
      </div>

      <div className="consultation-content">
        <div className="services-card_box">
          <div className="services-card">
            <div className="skeleton-title skeleton-shimmer"></div>
            <div className="services-list">
              {Array(3)
                .fill()
                .map((_, index) => (
                  <div key={index} className="serviceview-item">
                    <Stethoscope className="service-icon" />
                    <div className="skeleton-text skeleton-shimmer"></div>
                    <div className="skeleton-text-small skeleton-shimmer"></div>
                  </div>
                ))}
            </div>
          </div>
          <div className="file-upload-card">
            <div className="skeleton-title skeleton-shimmer"></div>
            <div className="upload-area">
              <div className="skeleton-upload skeleton-shimmer">
                <Upload className="upload-icon" />
                <span>Fayl yuklash</span>
              </div>
            </div>
          </div>
        </div>
        <div className="actions-card">
          <div className="skeleton-title skeleton-shimmer"></div>
          <div className="action-buttons">
            {Array(3)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="skeleton-button skeleton-shimmer"
                ></div>
              ))}
          </div>
        </div>
        <div className="prescription-card">
          <div className="skeleton-title skeleton-shimmer"></div>
          <div className="skeleton-textarea skeleton-shimmer"></div>
          <div className="skeleton-textarea skeleton-shimmer"></div>
          <div className="skeleton-textarea skeleton-shimmer"></div>
        </div>
        <div className="consultation-actions">
          <div className="skeleton-button-large skeleton-shimmer">
            <CheckCircle className="btn-icon" />
            Qabulni yakunlash
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationViewSkeleton;
