import React from "react";
import { useUpdateDoseTakenMutation } from "../../../context/storyApi";
import { Modal, Card, Badge, Progress, Divider, Button } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircleOutlined, ClockCircleOutlined, MedicineBoxOutlined, CalendarOutlined } from "@ant-design/icons";
import './MarkServices.css';

function PrescriptionModal({ isOpen, onClose, patientData }) {
    const [updateDoseTaken, { isLoading: isUpdating }] = useUpdateDoseTakenMutation();
    const [selectedDoses, setSelectedDoses] = React.useState({});

    // Calculate today's day relative to the prescription start date
    const today = (() => {
        const startDateStr = patientData?.storiesId?.retsept?.startDate;
        if (startDateStr) {
            const startDate = new Date(startDateStr);
            const currentDate = new Date("2025-07-06T09:22:00+05:00"); // Current date: July 6, 2025, 09:22 AM +05
            const timeDiff = currentDate - startDate;
            return Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1; // Days since start, starting from 1
        }
        return 1; // Fallback: Assume today is day 1
    })();

    const handleDoseChange = async (medicationIndex, doseId, doseTrackingIndex, checked) => {
        try {
            // Call the mutation to update the dose taken status
            await updateDoseTaken({
                storyId: patientData?.storiesId?._id,
                prescriptionIndex: medicationIndex,
                doseTrackingIndex,
                workerId: localStorage.getItem("workerId"),
            }).unwrap();

            // Update local state only after successful mutation
            setSelectedDoses(prev => ({
                ...prev,
                [`${medicationIndex}-${doseId}`]: checked,
            }));

            toast.success("Doza holati muvaffaqiyatli yangilandi");
        } catch (error) {
            toast.error("Doza holatini yangilashda xatolik yuz berdi");
            console.error("Mutation error:", error);
        }
    };

    const calculateProgress = (doseTracking, medicationIndex) => {
        const takenDoses = doseTracking.filter(dose =>
            selectedDoses[`${medicationIndex}-${dose._id}`] || dose.taken
        ).length;
        return doseTracking.length > 0 ? (takenDoses / doseTracking.length) * 100 : 0;
    };

    const getDayProgress = (doseTracking, day, medicationIndex) => {
        const dayDoses = doseTracking.filter(dose => dose.day === day);
        const takenDayDoses = dayDoses.filter(dose =>
            selectedDoses[`${medicationIndex}-${dose._id}`] || dose.taken
        ).length;
        return dayDoses.length > 0 ? (takenDayDoses / dayDoses.length) * 100 : 0;
    };

    const getUniqueDay = (doseTracking) => {
        return [...new Set(doseTracking.map(dose => dose.day))];
    };

    return (
        <>
            <ToastContainer />
            <Modal
                className="prescription-management-modal"
                open={isOpen}
                onCancel={onClose}
                width={900}
                footer={false}
                title={
                    <div className="modal-header-prescription-tracker">
                        <MedicineBoxOutlined className="header-icon-medication-tracker" />
                        <span className="header-title-prescription-manager">
                            Dori rejimi boshqaruvi
                        </span>
                    </div>
                }
            >
                <div className="prescription-container-advanced-management">
                    {patientData?.storiesId?.retsept?.prescription?.map((medication, medicationIndex) => {
                        const progress = calculateProgress(medication.doseTracking, medicationIndex);
                        const uniqueDays = getUniqueDay(medication.doseTracking);

                        return (
                            <Card
                                key={medicationIndex}
                                className="medication-card-interactive-tracker"
                                title={
                                    <div className="medication-header-comprehensive-display">
                                        <div className="medication-name-styled-container">
                                            <Badge
                                                count={medication.dosagePerDay}
                                                className="dosage-badge-circular-indicator"
                                                style={{ backgroundColor: '#52c41a' }}
                                            />
                                            <span className="medication-title-prominent-text">
                                                {medication.medicationName}
                                            </span>
                                        </div>
                                        <div className="medication-stats-summary-panel">
                                            <span className="duration-info-compact-display">
                                                <CalendarOutlined /> {medication.durationDays} kun
                                            </span>
                                            <Progress
                                                percent={Math.floor(progress)}
                                                size="small"
                                                className="medication-progress-visual-indicator"
                                                strokeColor={{
                                                    '0%': '#108ee9',
                                                    '100%': '#87d068',
                                                }}
                                            />
                                        </div>
                                    </div>
                                }
                                extra={
                                    <div className="medication-completion-status-display">
                                        {progress === 100 ? (
                                            <CheckCircleOutlined className="completion-icon-success-indicator" />
                                        ) : (
                                            <ClockCircleOutlined className="pending-icon-warning-indicator" />
                                        )}
                                    </div>
                                }
                            >
                                <div className="medication-description-informative-text">
                                    <p className="description-content-readable-format">
                                        <strong>Qo'shimcha ma'lumot:</strong> {medication.description}
                                    </p>
                                </div>

                                <Divider className="section-divider-visual-separator" />

                                <div className="daily-tracking-comprehensive-layout">
                                    {uniqueDays.map(day => {
                                        const dayDoses = medication.doseTracking.filter(dose => dose.day === day);
                                        const dayProgress = getDayProgress(medication.doseTracking, day, medicationIndex);

                                        return (
                                            <div key={day} className="day-section-organized-container">
                                                <div className="day-header-informative-display">
                                                    <div className="day-number-prominent-badge">
                                                        <Badge
                                                            count={day}
                                                            className="day-badge-circular-design"
                                                            style={{ backgroundColor: dayProgress === 100 ? '#52c41a' : '#1890ff' }}
                                                        />
                                                        <span className="day-label-descriptive-text">{day}-kun</span>
                                                    </div>
                                                    <Progress
                                                        percent={dayProgress}
                                                        size="small"
                                                        className="day-progress-visual-tracker"
                                                        showInfo={false}
                                                        strokeColor={dayProgress === 100 ? '#52c41a' : '#faad14'}
                                                    />
                                                </div>

                                                <div className="doses-grid-interactive-layout">
                                                    {dayDoses.map((dose, doseIndex) => {
                                                        const isChecked = selectedDoses[`${medicationIndex}-${dose._id}`] || dose.taken;
                                                        const isToday = dose.day === today;

                                                        return (
                                                            <div
                                                                key={dose._id}
                                                                className={`dose-item-interactive-checkbox ${isChecked ? 'dose-completed-visual-state' : 'dose-pending-visual-state'}`}
                                                            >
                                                                <Button
                                                                    type={isChecked ? 'primary' : 'default'}
                                                                    onClick={() => handleDoseChange(medicationIndex, dose._id, doseIndex, !isChecked)}
                                                                    className="dose-button-styled-control"
                                                                    disabled={!isToday || isUpdating}
                                                                >
                                                                    <div className="dose-info-comprehensive-details">
                                                                        <div style={{
                                                                            color: isChecked ? '#fff' : '#000'
                                                                        }} className="dose-number-identifier-text">
                                                                            {dose.doseNumber}-doza
                                                                        </div>
                                                                        <div className="dose-status-descriptive-label">
                                                                            {isChecked ? (
                                                                                <span className="status-completed-success-text">Qabul qildi</span>
                                                                            ) : (
                                                                                <span className="status-pending-warning-text">Kutilmoqda</span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </Button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </Modal>
        </>
    );
}

export default PrescriptionModal;

