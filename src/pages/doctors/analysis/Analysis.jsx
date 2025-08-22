import React, { useRef, useEffect, useState, useCallback } from "react";
import { Button, Tabs, Popover, Spin } from "antd";
import { useReactToPrint } from 'react-to-print';
import { CheckOutlined, ReloadOutlined } from "@ant-design/icons";
import { useForm, Controller, useWatch } from "react-hook-form";
import { biokimyoviyTaxliliData } from "../../../utils/analisData";
import PrintCheckList from '../analysis/PrintCheckList';
import { useSubmitAnalisMutation } from "../../../context/storyApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./css/style.css";


const BioKimyoviy = ({ userId, data, handleCompleteAnalis }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("0");
  const [completedFields, setCompletedFields] = useState(new Set());
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [result, setResult] = useState(null)
  const [submitAnalis, { isLoading: isSubmittingApi }] = useSubmitAnalisMutation();
  const contentRef = useRef(null);

  const mainform = useRef();
  const analysisGroups = biokimyoviyTaxliliData.reduce((acc, group) => {
    acc[group.label] = group.options.map((option, index) => ({
      key: `${group.label}-${index}`,
      name: option.name,
      analis: option.analis?.toString() || "",
      norma: option.norma || "-",
      siBirlik: option.siBirlik || "-",
      result: "",
      groupName: group.label,
    }));
    return acc;
  }, {});

  const reactToPrintFn = useReactToPrint({
    contentRef: contentRef,
    pageStyle: `
      @page {
        size: 80mm auto;
        margin: 0;
      }
      @media print {
        body { margin: 0; }
        * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
      }
    `,
    onPrintError: () => {
      toast.error('Chop etishda xatolik yuz berdi. Iltimos, qayta urining.');
    }
  });

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      extraTreatment: Object.values(analysisGroups)
        .flat()
        .reduce((acc, cur) => {
          acc["result" + cur.key] = cur.result || "";
          return acc;
        }, {}),
    },
  });

  const watchedFormData = useWatch({ control });

  useEffect(() => {
    const completed = new Set();
    Object.entries(watchedFormData).forEach(([key, value]) => {
      if (value) {
        completed.add(key);
      }
    });
    setCompletedFields(completed);
    setHasUnsavedChanges(completed.size > 0);
  }, [watchedFormData]);

  const prepareDataForSubmission = useCallback(
    (formData) => {
      const results = [];
      Object.entries(formData).forEach(([fieldKey, value]) => {
        const resultKey = fieldKey.replace("result", "");
        Object.entries(analysisGroups).forEach(([groupName, items]) => {
          const item = items.find((item) => item.key === resultKey);
          if (item && value && value.trim() !== "") {
            results.push({
              key: item.key,
              name: item.name,
              result: value.trim(),
              norma: item.norma,
              siBirlik: item.siBirlik,
              analis: item.analis,
            });
          }
        });
      });

      if (results.length === 0) {
        toast.warn('Kamida bitta natija kiritilishi kerak.');
        throw new Error('No results provided');
      }

      return {
        storyId: userId,
        results,
        status: "done"
      };
    },
    [analysisGroups, userId]
  );

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const preparedData = prepareDataForSubmission(formData);
      const result = await submitAnalis(preparedData).unwrap();
      setResult(result);
      await handleCompleteAnalis();
      toast.success("Ma'lumotlar muvaffaqiyatli saqlandi!");

      reactToPrintFn();
      setPopoverVisible(false);
    } catch (error) {
      toast.error("Ma'lumotlarni saqlashda xatolik yuz berdi. Qayta urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOk = () => {
    handleSubmit(onSubmit)();
  };

  const handleCancel = () => {
    setPopoverVisible(false);
  };

  const handleReset = () => {
    reset();
    setCompletedFields(new Set());
    setHasUnsavedChanges(false);
    toast.info("Barcha maydonlar muvaffaqiyatli tozalandi!");
  };

  const popoverContent = (
    <div>
      <p style={{ marginBottom: "12px", fontWeight: "500" }}>
        Natijalarni chop etib berdingizmi?
      </p>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button
          type="primary"
          size="small"
          onClick={handleOk}
          loading={isSubmitting || isSubmittingApi}
        >
          HA
        </Button>
        <Button size="small" onClick={handleCancel}>
          YO'Q
        </Button>
      </div>
    </div>
  );

  const operations = (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Button
        icon={<ReloadOutlined />}
        size="small"
        onClick={handleReset}
        title="Tozalash"
        danger
      >
        Tozalash
      </Button>
      <Popover
        content={popoverContent}
        trigger="click"
        open={popoverVisible}
        onOpenChange={setPopoverVisible}
      >
        <Button
          shape="round"
          icon={<CheckOutlined />}
          className="BtnPrimary"
          type="primary"
          disabled={completedFields.size === 0}
          loading={isSubmitting || isSubmittingApi}
        >
          Yakunlash
        </Button>
      </Popover>
    </div>
  );

  return (
    <>
      <Spin spinning={isSubmitting || isSubmittingApi} tip="Ma'lumotlar saqlanmoqda...">
        <Tabs
          className="BioKimyoviy"
          tabBarExtraContent={operations}
          activeKey={activeTab}
          onChange={setActiveTab}
        >
          {Object.entries(analysisGroups).map(([tabTitle, data], index) =>
            data.length ? (
              <Tabs.TabPane
                tab={
                  <span>
                    {tabTitle}
                    {data.some((item) =>
                      completedFields.has("result" + item.key)
                    ) && (
                        <CheckOutlined
                          style={{ marginLeft: "8px", color: "#52c41a" }}
                        />
                      )}
                  </span>
                }
                key={index.toString()}
              >
                <form
                  ref={mainform}
                  id="mainForm"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="table-container">
                    <table className="tableAnalis">
                      <thead>
                        <tr>
                          <th>Ko'rsatkich</th>
                          <th>Natija</th>
                          <th>Norma</th>
                          <th>SI birlik</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, inx) => (
                          <tr
                            key={inx}
                            className={
                              completedFields.has("result" + item.key)
                                ? "completed-row"
                                : ""
                            }
                          >
                            <td>
                              <div style={{ display: "flex", alignItems: "center" }}>
                                {item.name}
                                {completedFields.has("result" + item.key) && (
                                  <CheckOutlined
                                    style={{
                                      marginLeft: "8px",
                                      color: "#52c41a",
                                      fontSize: "12px",
                                    }}
                                  />
                                )}
                              </div>
                            </td>
                            <td>
                              <Controller
                                name={"result" + item.key}
                                control={control}
                                render={({ field }) => (
                                  <input
                                    {...field}
                                    placeholder="Natijani kiriting..."
                                    className={`resInp ${completedFields.has("result" + item.key)
                                      ? "completed"
                                      : ""
                                      }`}
                                    type="text"
                                  />
                                )}
                              />
                            </td>
                            <td>
                              <span className="norma-value">{item.norma}</span>
                            </td>
                            <td>
                              <span className="unit-value">{item.siBirlik}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </form>
              </Tabs.TabPane>
            ) : null
          )}
        </Tabs>

        <div style={{ display: "none" }}>
          <PrintCheckList ref={contentRef} data={data} result={result} />
        </div>
      </Spin>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default BioKimyoviy;


