import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  FaMoneyBillWave,
  FaList,
  FaPlusCircle,
  FaTimes,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import "./ExpenseManager.css";
import {
  useGetExpensesQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} from "../../../context/expenseApi";
import { chiqimOptions, kirimOptions } from "../../../utils/categories";
import { Select as AntdSelect } from "antd";
const { Option } = AntdSelect;

// Notification Component
const Notification = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000); // Auto-dismiss after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
      <button
        className="notificationClose"
        onClick={() => {
          setVisible(false);
          onClose();
        }}
      >
        <FaTimes />
      </button>
    </div>
  );
};

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h3 className="modalTitle">Ogohlantirish</h3>
        <p className="modalMessage">{message}</p>
        <div className="modalButtons">
          <button className="modalButton confirm" onClick={onConfirm}>
            Tasdiqlash
          </button>
          <button className="modalButton cancel" onClick={onClose}>
            Bekor Qilish
          </button>
        </div>
      </div>
    </div>
  );
};

const ExpenseManager = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    type: "chiqim",
    category: "",
    description: "",
    paymentType: "naqt",
  });
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const categoryOptions =
    formData.type === "kirim" ? kirimOptions : chiqimOptions;

  const [createExpense, { isLoading: isCreating }] = useCreateExpenseMutation();
  const [updateExpense, { isLoading: isUpdating }] = useUpdateExpenseMutation();
  const [deleteExpense, { isLoading: isDeleting }] = useDeleteExpenseMutation();
  const {
    data: expenses,
    refetch,
    isLoading: isFetching,
  } = useGetExpensesQuery();
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  useEffect(() => {
    setFilteredExpenses(expenses?.innerData);
  }, [expenses]);

  const handleInputChange = (e, field, value) => {
    if (field) {
      setFormData({ ...formData, [field]: value });
    } else {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: name === "amount" ? Number(value) : value,
      });
    }
  };

  const handleCategoryChange = (selectedOption) => {
    setFormData({
      ...formData,
      category: selectedOption ? selectedOption.value : "",
    });
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.amount <= 0) {
      setError("Miqdori 0 dan katta bo‘lishi kerak!");
      return;
    }
    if (!formData.type) {
      setError("Turi tanlanmagan!");
      return;
    }
    if (!formData.paymentType) {
      setError("To‘lov turi tanlanmagan!");
      return;
    }
    setError("");
    try {
      if (editingExpenseId) {
        await updateExpense({
          id: editingExpenseId,
          expense: formData,
        }).unwrap();
        showNotification("Xarajat muvaffaqiyatli yangilandi!", "success");
      } else {
        await createExpense(formData).unwrap();
        showNotification("Xarajat muvaffaqiyatli yaratildi!", "success");
      }
      setFormData({
        name: "",
        amount: "",
        type: "chiqim",
        category: "",
        description: "",
        paymentType: "naqt",
      });
      setEditingExpenseId(null);
      refetch();
    } catch (error) {
      setError(
        editingExpenseId
          ? "Xarajat yangilashda xatolik: " + error.message
          : "Xarajat yaratishda xatolik: " + error.message
      );
    }
  };

  const handleEdit = (expense) => {
    setFormData({
      name: expense.name,
      amount: expense.amount,
      type: expense.type,
      category: expense.category,
      description: expense.description || "",
      paymentType: expense.paymentType,
    });
    setEditingExpenseId(expense._id);
  };

  const handleDeleteClick = (id) => {
    setExpenseToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Optimistic update
      setFilteredExpenses((prev) =>
        prev.filter((expense) => expense._id !== expenseToDelete)
      );
      await deleteExpense(expenseToDelete).unwrap();
      showNotification("Xarajat muvaffaqiyatli o‘chirildi!", "success");
    } catch (error) {
      setError("Xarajat o‘chirishda xatolik: " + error.message);
      // Revert optimistic update
      refetch();
    } finally {
      setShowDeleteModal(false);
      setExpenseToDelete(null);
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      name: "",
      amount: "",
      type: "chiqim",
      category: "",
      description: "",
      paymentType: "naqt",
    });
    setEditingExpenseId(null);
    setError("");
  };
  console.log(filteredExpenses);

  return (
    <div className="xarajatBoshqaruvKonteyner">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        message="Bu xarajatni o‘chirishni tasdiqlaysizmi?"
      />
      <div className="xarajatGridTartibi">
        {/* Forma */}
        <div className="formaBlokiKonteyner">
          <h2 className="formaSarlavhaMatni">
            <FaPlusCircle className="ikonaElementi" />
            {editingExpenseId
              ? "Xarajatni Tahrirlash"
              : "Yangi Xarajat Qo‘shish"}
          </h2>
          <form onSubmit={handleSubmit} className="xarajatFormasi">
            <div className="formaGuruhiflexBox">
              <div className="formaGuruhiBlok">
                <label className="formaYorligiMatn">Turi</label>
                <div>
                  <button
                    type="button"
                    className={`selectionButton ${
                      formData.type === "kirim" ? "active" : ""
                    }`}
                    onClick={() => handleInputChange(null, "type", "kirim")}
                  >
                    Kirim (Daromad)
                  </button>
                  <button
                    type="button"
                    className={`selectionButton ${
                      formData.type === "chiqim" ? "active" : ""
                    }`}
                    onClick={() => handleInputChange(null, "type", "chiqim")}
                  >
                    Chiqim (Xarajat)
                  </button>
                </div>
              </div>

              <div className="formaGuruhiBlok">
                <label className="formaYorligiMatn">To‘lov Turi</label>
                <div>
                  <button
                    type="button"
                    className={`selectionButton ${
                      formData.paymentType === "naqt" ? "active" : ""
                    }`}
                    onClick={() =>
                      handleInputChange(null, "paymentType", "naqt")
                    }
                  >
                    Naqd
                  </button>
                  <button
                    type="button"
                    className={`selectionButton ${
                      formData.paymentType === "karta" ? "active" : ""
                    }`}
                    onClick={() =>
                      handleInputChange(null, "paymentType", "karta")
                    }
                  >
                    Karta
                  </button>
                </div>
              </div>
            </div>

            <div className="formaGuruhiBlok">
              <label className="formaYorligiMatn">Nomi</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="formaKiritishMaydoni"
                placeholder="Xarajat nomini kiriting"
              />
            </div>
            <div className="formaGuruhiBlok">
              <label className="formaYorligiMatn">Miqdori</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
                min="1"
                className="formaKiritishMaydoni"
                placeholder="Miqdorni kiriting"
              />
              {error && (
                <p className="xatoMatni" style={{ color: "red" }}>
                  {error}
                </p>
              )}
            </div>

            <div className="formaGuruhiBlok">
              <label className="formaYorligiMatn">Kategoriya</label>
              <Select
                options={categoryOptions}
                onChange={handleCategoryChange}
                placeholder="Kategoriyani tanlang"
                className="formaTanlovKonteyner"
                classNamePrefix="react-select"
                value={categoryOptions.find(
                  (option) => option.value === formData.category
                )}
              />
            </div>
            <div className="formaGuruhiBlok">
              <label className="formaYorligiMatn">Tavsif</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="formaMatnMaydoni"
                placeholder="Tavsifni kiriting"
              />
            </div>

            <div className="formaTugmalarGuruhi">
              <button
                type="submit"
                disabled={isCreating || isUpdating}
                className="formaTugmaElementi"
              >
                <FaMoneyBillWave className="ikonaElementi" />
                {isCreating || isUpdating
                  ? "Yuklanmoqda..."
                  : editingExpenseId
                  ? "Yangilash"
                  : "Xarajat Yaratish"}
              </button>
              {editingExpenseId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="formaTugmaElementi bekorQilish"
                >
                  <FaTimes className="ikonaElementi" /> Bekor Qilish
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Jadval */}
        <div className="jadvalBlokiKonteyner">
          <h2
            className="jadvalSarlavhaMatni"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <div>
              <FaList className="ikonaElementi" /> Xarajatlar Ro‘yxati
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              {/* 1-select: Kirim/Chiqim */}
              <AntdSelect
                defaultValue="all"
                style={{ width: 180 }}
                onChange={(value) => {
                  if (value === "all") {
                    setFilteredExpenses(expenses?.innerData);
                  } else {
                    setFilteredExpenses(
                      expenses?.innerData?.filter((exp) => exp.type === value)
                    );
                  }
                }}
              >
                <Option value="all">Barchasi</Option>
                <Option value="kirim">Kirim (Daromad)</Option>
                <Option value="chiqim">Chiqim (Xarajat)</Option>
              </AntdSelect>

              {/* 2-select: Kategoriya bo‘yicha */}
              <AntdSelect
                defaultValue="all"
                style={{ width: 180 }}
                onChange={(value) => {
                  if (value === "all") {
                    setFilteredExpenses(expenses?.innerData);
                  } else {
                    setFilteredExpenses(
                      expenses?.innerData?.filter(
                        (exp) => exp.category === value
                      )
                    );
                  }
                }}
              >
                <Option value="all">Barchasi</Option>
                {[
                  ...new Set(filteredExpenses?.map((exp) => exp.category)), // unique kategoriya
                ].map((cat, idx) => (
                  <Option key={idx} value={cat}>
                    {cat}
                  </Option>
                ))}
              </AntdSelect>
            </div>
          </h2>
          {isFetching ? (
            <p className="yuklashMatni">Xarajatlar yuklanmoqda...</p>
          ) : (
            <div className="jadvalOralganKonteyner">
              <table className="xarajatJadvali">
                <thead className="jadvalSarlavhaQatori">
                  <tr>
                    <th className="jadvalUyasigi">Turi</th>
                    <th className="jadvalUyasigi">Nomi</th>
                    <th className="jadvalUyasigi">Miqdori</th>
                    <th className="jadvalUyasigi">Kategoriya</th>
                    <th className="jadvalUyasigi">To‘lov</th>
                    <th className="jadvalUyasigi">Sana</th>
                    <th className="jadvalUyasigi">Amallar</th>
                  </tr>
                </thead>
                <tbody className="jadvalTanaQismi">
                  {filteredExpenses && filteredExpenses?.length > 0 ? (
                    filteredExpenses?.map((expense) => (
                      <tr key={expense._id} className="jadvalQatorElementi">
                        <td className="jadvalUyasigiMatn">
                          {expense.type === "kirim" ? (
                            <span
                              style={{
                                color: "green",
                                display: "flex",
                                alignItems: "center",
                                gap: 5,
                              }}
                            >
                              <AiOutlineCaretDown />
                            </span>
                          ) : (
                            <span
                              style={{
                                color: "red",
                                display: "flex",
                                alignItems: "center",
                                gap: 5,
                              }}
                            >
                              <AiOutlineCaretUp />
                            </span>
                          )}
                        </td>
                        <td className="jadvalUyasigiMatn">{expense.name}</td>
                        <td className="jadvalUyasigiMatn">{expense.amount}</td>
                        <td className="jadvalUyasigiMatn">
                          {expense.category}
                        </td>
                        <td className="jadvalUyasigiMatn">
                          {expense.paymentType}
                        </td>
                        <td className="jadvalUyasigiMatn">
                          {new Date(expense.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <span className="jadvalUyasigiactions">
                            <button
                              onClick={() => handleEdit(expense)}
                              className="amalTugmasi tahrirlash"
                              disabled={isDeleting}
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(expense._id)}
                              className="amalTugmasi ochirish"
                              disabled={isDeleting}
                            >
                              <FaTrash />
                            </button>
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="maLumatYoqUyasigi">
                        Xarajatlar topilmadi.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseManager;
