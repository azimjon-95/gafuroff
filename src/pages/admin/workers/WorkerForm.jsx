import React, { useMemo, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { Select, Input, DatePicker } from "antd";
import ReactSelect from "react-select";
import moment from "moment";
import { specializationOptions } from "../../../utils/specializationOptions";
import { useGetRoomsQuery } from "../../../context/roomApi";
import "./style.css";

const { Option } = Select;

// Constants
const ROLES = {
  RECEPTION: "reception",
  DIRECTOR: "director",
  DOCTOR: "doctor",
  NURSE: "nurse",
  CLEANER: "cleaner",
};

const SALARY_TYPES = {
  FIXED: "fixed",
  PERCENTAGE: "percentage",
};

const ROLE_LABELS = {
  [ROLES.RECEPTION]: "Qabulxona",
  [ROLES.DIRECTOR]: "Direktor",
  [ROLES.DOCTOR]: "Doktor",
  [ROLES.NURSE]: "Hamshira",
  [ROLES.CLEANER]: "Farrosh",
};

const SALARY_TYPE_LABELS = {
  [SALARY_TYPES.FIXED]: "Belgilangan",
  [SALARY_TYPES.PERCENTAGE]: "Foizli",
};

const VALIDATION_RULES = {
  firstName: {
    required: "Ism kiritish shart",
    minLength: {
      value: 2,
      message: "Ism 2-50 ta belgi oralig'ida bo'lishi kerak",
    },
    maxLength: {
      value: 50,
      message: "Ism 2-50 ta belgi oralig'ida bo'lishi kerak",
    },
  },
  lastName: {
    required: "Familiya kiritish shart",
    minLength: {
      value: 2,
      message: "Familiya 2-50 ta belgi oralig'ida bo'lishi kerak",
    },
    maxLength: {
      value: 50,
      message: "Familiya 2-50 ta belgi oralig'ida bo'lishi kerak",
    },
  },
  address: {
    required: "Manzil kiritish shart",
    minLength: {
      value: 2,
      message: "Manzil 2-100 ta belgi oralig'ida bo'lishi kerak",
    },
    maxLength: {
      value: 100,
      message: "Manzil 2-100 ta belgi oralig'ida bo'lishi kerak",
    },
  },
  phone: {
    required: "Telefon raqam kiritish shart",
    minLength: { value: 7, message: "Telefon raqam noto'g'ri" },
    maxLength: { value: 15, message: "Telefon raqam noto'g'ri" },
    pattern: { value: /^\+?\d{7,15}$/, message: "Telefon raqam noto'g'ri" },
  },
  login: {
    required: "Login kiritish shart",
    minLength: {
      value: 4,
      message: "Login 4-20 ta belgidan iborat, faqat harflar va raqamlar",
    },
    maxLength: {
      value: 20,
      message: "Login 4-20 ta belgidan iborat, faqat harflar va raqamlar",
    },
    pattern: {
      value: /^[a-zA-Z0-9]+$/,
      message: "Login 4-20 ta belgidan iborat, faqat harflar va raqamlar",
    },
  },
  password: {
    required: "Parol kiritish shart",
    minLength: {
      value: 6,
      message: "Parol 6-50 ta belgi oralig'ida bo'lishi kerak",
    },
    maxLength: {
      value: 50,
      message: "Parol 6-50 ta belgi oralig'ida bo'lishi kerak",
    },
  },
  idCardNumber: {
    required: "raqamni kiriting",
    minLength: {
      value: 6,
      message: "raqam 6-50 ta belgi oralig'ida bo'lishi kerak",
    },
    maxLength: {
      value: 50,
      message: "raqam 6-50 ta belgi oralig'ida bo'lishi kerak",
    },
  },
};

// Components
const FormInput = ({
  register,
  name,
  rules,
  placeholder,
  type = "text",
  className = "form-input",
  ...props
}) => (
  <input
    {...register(name, rules)}
    placeholder={placeholder}
    className={className}
    type={type}
    {...props}
  />
);

const ErrorMessage = ({ error }) =>
  error && <p className="error-message">{error.message}</p>;

const RoleButtons = ({ selectedRole, onRoleSelect }) => (
  <div className="role-buttons">
    {Object.entries(ROLE_LABELS).map(([role, label]) => (
      <button
        key={role}
        type="button"
        onClick={() => onRoleSelect(role)}
        className={`role-button ${selectedRole === role ? "active" : ""}`}
      >
        {label}
      </button>
    ))}
  </div>
);

const SalaryTypeButtons = ({ selectedType, onTypeSelect }) => (
  <div className="role-buttons">
    {Object.entries(SALARY_TYPE_LABELS).map(([type, label]) => (
      <button
        key={type}
        type="button"
        onClick={() => onTypeSelect(type)}
        className={`role-button ${selectedType === type ? "active" : ""}`}
      >
        {label}
      </button>
    ))}
  </div>
);

const WorkerForm = ({
  onSubmit,
  initialValues = {},
  isSubmitting,
  submitError,
}) => {
  const defaultValues = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      address: "",
      login: "",
      password: "",
      confirmPassword: "",
      role: ROLES.RECEPTION,
      salary_type: SALARY_TYPES.FIXED,
      salary_per_month: 0,
      percentage_from_admissions: 0,
      specialization: "",
      admissionPrice: 0,
      phone: "",
      birthday: null,
      roomId: null,
      permissions: [],
      ...initialValues,
    }),
    [initialValues]
  );

  const { data: roomsData } = useGetRoomsQuery();
  const rooms = useMemo(
    () =>
      roomsData?.innerData?.filter((i) => i.roomType === "vrach_kabineti") ||
      [],
    [roomsData]
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    control,
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const [password, role, salaryType, confirmPassword] = watch([
    "password",
    "role",
    "salary_type",
    "confirmPassword",
  ]);

  const confirmPasswordBorderClass = useMemo(
    () =>
      !confirmPassword
        ? "form-input"
        : password === confirmPassword
        ? "form-input border-green"
        : "form-input border-red",
    [password, confirmPassword]
  );

  const showAdmissionFields = useMemo(
    () =>
      ![ROLES.NURSE, ROLES.CLEANER, ROLES.DIRECTOR, ROLES.RECEPTION].includes(
        role
      ),
    [role]
  );

  const selectedSpecialization = useMemo(
    () =>
      specializationOptions.find(
        (option) => option.value === watch("specialization")
      ),
    [watch]
  );

  const handleRoleSelect = useCallback(
    (selectedRole) => {
      setValue("role", selectedRole);
      if (selectedRole !== ROLES.DOCTOR) setValue("specialization", "");
    },
    [setValue]
  );

  const handleSalaryTypeSelect = useCallback(
    (selectedType) => {
      setValue("salary_type", selectedType);
      setValue(
        selectedType === SALARY_TYPES.FIXED
          ? "percentage_from_admissions"
          : "salary_per_month",
        0
      );
    },
    [setValue]
  );

  const handleDateChange = useCallback(
    (date) => (date ? date.format("YYYY-MM-DD") : null),
    []
  );

  const handleSpecializationChange = useCallback(
    (option) => (option ? option.value : ""),
    []
  );

  const validateConfirmPassword = useCallback(
    (value) => value === password || "Parollar mos kelmadi",
    [password]
  );
  const validateRole = useCallback(
    (value) => Object.values(ROLES).includes(value) || "Rol noto'g'ri",
    []
  );
  const validateSalaryType = useCallback(
    (value) =>
      Object.values(SALARY_TYPES).includes(value) || "Maosh turi noto'g'ri",
    []
  );
  const validateSalary = useCallback(
    (value) =>
      (value >= 0 && !isNaN(value)) ||
      "Oylik maosh 0 dan katta son bo'lishi kerak",
    []
  );
  const validatePercentage = useCallback(
    (value) =>
      (value >= 0 && value <= 100 && !isNaN(value)) || "Foiz noto'g'ri (0-100)",
    []
  );
  const validateAdmissionPrice = useCallback(
    (value) => (value >= 0 && !isNaN(value)) || "Qabul narxi noto'g'ri",
    []
  );
  const validateBirthday = useCallback(
    (value) =>
      !value ||
      moment(value, "YYYY-MM-DD", true).isValid() ||
      "Tug'ilgan sana noto'g'ri formatda",
    []
  );

  return (
    <div className="form-card">
      {submitError && <p className="error-message">{submitError}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group-box">
          <div className="form-group">
            <label>Lavozim</label>
            <RoleButtons selectedRole={role} onRoleSelect={handleRoleSelect} />
            <input
              type="hidden"
              {...register("role", {
                required: "Rol noto'g'ri",
                validate: validateRole,
              })}
            />
            <ErrorMessage error={errors.role} />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">Ism</label>
            <FormInput
              register={register}
              name="firstName"
              rules={VALIDATION_RULES.firstName}
              placeholder="Ismni kiriting"
            />
            <ErrorMessage error={errors.firstName} />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Familiya</label>
            <FormInput
              register={register}
              name="lastName"
              rules={VALIDATION_RULES.lastName}
              placeholder="Familiyani kiriting"
            />
            <ErrorMessage error={errors.lastName} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="address">Manzil</label>
            <FormInput
              register={register}
              name="address"
              rules={VALIDATION_RULES.address}
              placeholder="Manzilni kiriting"
            />
            <ErrorMessage error={errors.address} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telefon</label>
            <FormInput
              register={register}
              name="phone"
              rules={VALIDATION_RULES.phone}
              placeholder="Telefon raqamni kiriting"
            />
            <ErrorMessage error={errors.phone} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="birthday">Tug'ilgan sana</label>
            <Controller
              name="birthday"
              control={control}
              rules={{ validate: validateBirthday }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  format="YYYY-MM-DD"
                  placeholder="Tug'ilgan sanani tanlang"
                  className="form-input"
                  onChange={(date) => field.onChange(handleDateChange(date))}
                  value={field.value ? moment(field.value) : null}
                />
              )}
            />
            <ErrorMessage error={errors.birthday} />
          </div>
          {/* {role === ROLES.DOCTOR && ( */}
          <div className="form-group">
            <label htmlFor="idCardNumber">NFS Karta raqami</label>
            <Controller
              name="idCardNumber"
              control={control}
              rules={VALIDATION_RULES.idCardNumber}
              render={({ field }) => (
                <Input
                  size="large"
                  {...field}
                  placeholder="raqamni kiriting"
                  className="form-input"
                />
              )}
            />
            <ErrorMessage error={errors.idCardNumber} />
          </div>
          {/* )} */}
        </div>

        <div className="form-group-box">
          <div className="form-group">
            <label htmlFor="login">Login</label>
            <FormInput
              register={register}
              name="login"
              rules={VALIDATION_RULES.login}
              placeholder="Loginni kiriting"
            />
            <ErrorMessage error={errors.login} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Parol</label>
            <Controller
              name="password"
              control={control}
              rules={VALIDATION_RULES.password}
              render={({ field }) => (
                // <Input.Password
                <Input
                  {...field}
                  placeholder="Parolni kiriting"
                  className="form-input"
                />
              )}
            />
            <ErrorMessage error={errors.password} />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Parolni tasdiqlash</label>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Parolni tasdiqlash shart",
                validate: validateConfirmPassword,
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Parolni qayta kiriting"
                  className={confirmPasswordBorderClass}
                />
              )}
            />
            <ErrorMessage error={errors.confirmPassword} />
          </div>
        </div>

        {role === ROLES.DOCTOR && (
          <div style={{ display: "flex", gap: "15px" }}>
            <div className="form-group">
              <label htmlFor="specialization">Mutaxassislik</label>
              <Controller
                name="specialization"
                control={control}
                rules={{ required: "Mutaxassislik tanlash shart" }}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    options={specializationOptions}
                    placeholder="Mutaxassislikni tanlang"
                    isSearchable
                    onChange={(option) =>
                      field.onChange(handleSpecializationChange(option))
                    }
                    value={selectedSpecialization}
                  />
                )}
              />
              <ErrorMessage error={errors.specialization} />
            </div>
            <div className="form-group">
              <label htmlFor="roomId">Xona raqami</label>
              <Controller
                name="roomId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Xona raqami"
                    style={{ width: "100%", height: "39px" }}
                  >
                    {rooms.map((room) => (
                      <Option key={room._id} value={room._id}>
                        {room.roomNumber}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            </div>
          </div>
        )}

        <div className="form-group-box">
          <div className="form-group">
            <label htmlFor="salary_type">Oylik turi</label>
            <Controller
              name="salary_type"
              control={control}
              rules={{
                required: "Maosh turi tanlash shart",
                validate: validateSalaryType,
              }}
              render={({ field }) => (
                <SalaryTypeButtons
                  selectedType={field.value}
                  onTypeSelect={(type) => {
                    field.onChange(type);
                    handleSalaryTypeSelect(type);
                  }}
                />
              )}
            />
            <ErrorMessage error={errors.salary_type} />
          </div>
          {salaryType === SALARY_TYPES.FIXED && (
            <div className="form-group">
              <label htmlFor="salary_per_month">Oylik maosh</label>
              <FormInput
                register={register}
                name="salary_per_month"
                rules={{ validate: validateSalary }}
                placeholder="Oylik maoshni kiriting"
                type="number"
                min="0"
              />
              <ErrorMessage error={errors.salary_per_month} />
            </div>
          )}
          {salaryType === SALARY_TYPES.PERCENTAGE && (
            <div className="form-group">
              <label htmlFor="percentage_from_admissions">
                Qabul foizi (%)
              </label>
              <FormInput
                register={register}
                name="percentage_from_admissions"
                rules={{ validate: validatePercentage }}
                placeholder="Qabul foizini kiriting (0-100)"
                type="number"
                min="0"
                max="100"
              />
              <ErrorMessage error={errors.percentage_from_admissions} />
            </div>
          )}
          {showAdmissionFields && (
            <div className="form-group">
              <label htmlFor="admissionPrice">Qabul narxi</label>
              <FormInput
                register={register}
                name="admissionPrice"
                rules={{ validate: validateAdmissionPrice }}
                placeholder="Qabul narxini kiriting"
                type="number"
                min="0"
              />
              <ErrorMessage error={errors.admissionPrice} />
            </div>
          )}
        </div>
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? "Yuborilmoqda..." : "Ro'yxatga olish"}
        </button>
      </form>
    </div>
  );
};

export default WorkerForm;
