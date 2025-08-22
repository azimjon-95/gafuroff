import React from 'react';
import { useGetClinicsQuery } from '../../../context/clinicApi';
import { capitalizeFirstLetter } from '../../../hook/CapitalizeFirstLitter';
import moment from 'moment';
import './style.css';

// Utility function to format currency
const formatCurrency = (amount, locale = 'uz-UZ', currency = 'UZS') =>
  Number(amount)?.toLocaleString(locale, { style: 'currency', currency }) || "0 so'm";


// Utility function to get current date and time in Uzbekistan (UZT, UTC+5)
const getCurrentUzbekistanDateTime = () => {
  const now = moment().utcOffset('+05:00'); // Set Uzbekistan timezone (UTC+5)
  return {
    date: now.format('YYYY.MM.DD'),
    time: now.format('HH:mm')
  };
};

// Utility function to safely access nested properties
const getSafe = (obj, path, defaultValue = 'N/A') =>
  path.reduce((xs, x) => (xs && xs[x] !== undefined ? xs[x] : defaultValue), obj);

function ModelCheck({ contentRef, data: story }) {
  const { data: clinics } = useGetClinicsQuery();

  // Fallback clinic info with safe access
  const clinicInfo = {
    name: getSafe(clinics, ['innerData', 'clinicName'], 'Unknown Clinic'),
    address: getSafe(clinics, ['innerData', 'address'], 'N/A'),
    contacts: getSafe(clinics, ['innerData', 'phone'], ['N/A']),
    time: `${getSafe(clinics, ['innerData', 'work_schedule', 'start_time'], 'N/A')} - ${getSafe(clinics, ['innerData', 'work_schedule', 'end_time'], 'N/A')}`,
  };


  // Get selected services and calculate total amount
  const selectedServices = story?.services || [];
  const serviceDetails = selectedServices.map((service) => ({
    name: service.name || 'Unknown Service',
    price: service.price || 0,
  }));

  const totalAmount = serviceDetails.reduce((sum, service) => sum + (service.price || 0), 0);
  // Get current date and time in Uzbekistan
  const { date: currentDate, time: currentTime } = getCurrentUzbekistanDateTime();
  return (
    <div ref={contentRef} className="receipt-container-component">
      <div className="header-information-section">
        <h1 className="clinic-name-title">{clinicInfo.name}</h1>
        <p className="subtitle-description-text">Shifoxona markazi</p>
        <p className="bold-subtitle-emphasis-text">Har doim siz bilan!</p>
      </div>

      {/* Contact Info */}
      <div className="contact-details-section">
        <div className="contact-information-block">
          <strong>Manzil:</strong><br />{clinicInfo.address}
        </div>
        <div className="contact-information-block">
          <strong>Tel:</strong> {clinicInfo.contacts}
        </div>
        <div className="contact-information-block">
          <strong>Qabul vaqti:</strong><br />{clinicInfo.time}
        </div>
      </div>

      {/* Patient & Service Details */}
      <div className="patient-service-details-section">
        <div className="information-row-container">
          <span className="information-label-text">Mutaxassis:</span>
          <span className="information-value-text">{capitalizeFirstLetter(getSafe(story, ['response', 'doctor', 'specialization'], 'N/A'))}</span>
        </div>
        <div className="information-row-container">
          <span className="information-label-text">Doktor:</span>
          <span className="information-value-text">
            {getSafe(story, ['response', 'doctor', 'firstName'], 'N/A')} {getSafe(story, ['response', 'doctor', 'firstName'], 'N/A')}
          </span>
        </div>
        <div className="information-row-container">
          <span className="information-label-text">Telefon:</span>
          <span className="information-value-text">{getSafe(story, ['response', 'doctor', 'phone'], 'N/A')}</span>
        </div>
        <br />
        <div className="information-row-container">
          <span className="information-label-text">Bemor:</span>
          <span className="information-value-text">
            {getSafe(story, ['response', 'patient', 'firstname'], 'N/A')} {getSafe(story, ['response', 'patient', 'lastname'], 'N/A')}
          </span>
        </div>
        <div className="information-row-container">
          <span className="information-label-text">Sana/Vaqt:</span>
          <span className="information-value-text">
            {currentDate} {currentTime}
          </span>
        </div>
      </div>

      {/* Payment Info */}
      <div className="payment-information-section">
        {serviceDetails.length > 0 ? (
          serviceDetails.map((service, index) => (
            <div key={index} className="information-row-container">
              <span className="information-label-text">{service.name}:</span>
              <span className="information-value-text">{formatCurrency(service.price)}</span>
            </div>
          ))
        ) : (
          <div className="information-row-container">
            <span className="information-label-text">Xizmatlar:</span>
            <span className="information-value-text">Hech qanday xizmat tanlanmadi</span>
          </div>
        )}
        <div className="total-amount-row">
          <span>JAMI:</span>
          <span>{formatCurrency(totalAmount)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-content-section">
        <div className="order-number-display">{getSafe(story, ['response', 'patient', 'order_number'], 'N/A')}</div>
        <div className="footer-content-text"><strong>Sizning navbatingiz!</strong></div>
        <div className="footer-content-text">Rahmat! Sog'lik tilaymiz!</div>
      </div>
    </div>
  );
}

export default ModelCheck;