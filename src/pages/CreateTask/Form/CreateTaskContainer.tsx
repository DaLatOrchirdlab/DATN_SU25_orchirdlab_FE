import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateTaskStepper from "../Step/CreateTaskStepper";
import { useCreateTask } from "../../../context/CreateTaskContext";
import type { Attribute, ExperimentLog, Stage, Sample, Element } from "../../../context/CreateTaskContext";
import axiosInstance from "../../../api/axiosInstance";
import { useSnackbar } from 'notistack';

const CreateTaskContainer: React.FC = () => {
  const [name, setName] = useState("");
  const [experimentLogs, setExperimentLogs] = useState<ExperimentLog[]>([]);
  const [selectedEL, setSelectedEL] = useState<string>("");
  const [stages, setStages] = useState<Stage[]>([]);
  const [selectedStage, setSelectedStage] = useState<string>("");
  const [samples, setSamples] = useState<Sample[]>([]);
  const [selectedSample, setSelectedSample] = useState<string>("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [elements, setElements] = useState<Element[]>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([{
    elementId: "",
    elementName: "",
    measurementUnit: "",
    value: 0,
    description: ""
  }]);
  const [loadingEL, setLoadingEL] = useState(false);
  const [loadingStage, setLoadingStage] = useState(false);
  const [loadingSample, setLoadingSample] = useState(false);
  const [loadingElements, setLoadingElements] = useState(false);
  const navigate = useNavigate();
  const { setState } = useCreateTask();
  const { enqueueSnackbar } = useSnackbar();

  // Fetch elements
  useEffect(() => {
    setLoadingElements(true);
    axiosInstance.get("/api/element?pageNumber=1&pageSize=100")
      .then(res => {
        interface ApiElement { id: string; name: string; description: string; }
        const data = Array.isArray(res.data?.value?.data) ? res.data.value.data as ApiElement[] : [];
        setElements(data.map((el) => ({ 
          id: el.id, 
          name: el.name, 
          description: el.description 
        })));
      })
      .catch(() => {
        setElements([]);
        enqueueSnackbar('Không thể tải danh sách nguyên vật liệu!', { variant: 'error' });
      })
      .finally(() => setLoadingElements(false));
  }, [enqueueSnackbar]);

  // Fetch experiment logs (EL)
  useEffect(() => {
    setLoadingEL(true);
    axiosInstance.get("/api/experimentlog?pageNumber=1&pageSize=100")
      .then(res => {
        interface ApiExperimentLog { id: string; name: string; }
        const data = Array.isArray(res.data?.value?.data) ? res.data.value.data as ApiExperimentLog[] : [];
        setExperimentLogs(data.map((el) => ({ id: el.id, name: el.name })));
      })
      .catch(() => {
        setExperimentLogs([]);
        enqueueSnackbar('Không thể tải danh sách nhật ký thí nghiệm!', { variant: 'error' });
      })
      .finally(() => setLoadingEL(false));
  }, [enqueueSnackbar]);

  // Fetch stages when EL changes
  useEffect(() => {
    if (!selectedEL) {
      setStages([]);
      setSelectedStage("");
      setSamples([]);
      setSelectedSample("");
      return;
    }
    setLoadingStage(true);
    axiosInstance.get(`/api/experimentlog/${selectedEL}`)
      .then(res => {
        interface ApiStage { id: string; name: string; }
        const stagesData = Array.isArray(res.data?.value?.stages) ? res.data.value.stages as ApiStage[] : [];
        setStages(stagesData.map((s) => ({ id: s.id, name: s.name })));
      })
      .catch(() => {
        setStages([]);
        enqueueSnackbar('Không thể tải danh sách giai đoạn!', { variant: 'error' });
      })
      .finally(() => setLoadingStage(false));
  }, [selectedEL, enqueueSnackbar]);

  // Fetch samples when EL changes
  useEffect(() => {
    if (!selectedEL) {
      setSamples([]);
      setSelectedSample("");
      return;
    }
    setLoadingSample(true);
    axiosInstance.get(`/api/sample?pageNo=1&pageSize=100&experimentLogId=${selectedEL}`)
      .then(res => {
        interface ApiSample { id: string; name: string; }
        const data = Array.isArray(res.data?.value?.data) ? res.data.value.data as ApiSample[] : [];
        setSamples(data.map((s) => ({ id: s.id, name: s.name })));
      })
      .catch(() => {
        setSamples([]);
        enqueueSnackbar('Không thể tải danh sách mẫu thí nghiệm!', { variant: 'error' });
      })
      .finally(() => setLoadingSample(false));
  }, [selectedEL, enqueueSnackbar]);

  // Attribute handlers
  const handleAttributeChange = (idx: number, field: keyof Attribute, value: string | number) => {
    setAttributes(prev => prev.map((attr, i) => {
      if (i === idx) {
        if (field === "elementId") {
          // Khi chọn element, tự động cập nhật tên và đơn vị
          const selectedElement = elements.find(el => el.id === value);
          return {
            ...attr,
            elementId: value as string,
            elementName: selectedElement?.name || "",
            measurementUnit: selectedElement?.description || ""
          };
        }
        return { ...attr, [field]: value };
      }
      return attr;
    }));
  };

  const handleAddAttribute = () => {
    setAttributes(prev => ([...prev, { 
      elementId: "", 
      elementName: "",
      measurementUnit: "", 
      value: 0, 
      description: "" 
    }]));
  };

  const handleRemoveAttribute = (idx: number) => {
    setAttributes(prev => prev.filter((_, i) => i !== idx));
  };

  // Submit (Next)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setState(prev => ({
      ...prev,
      name,
      experimentLog: experimentLogs.find(el => el.id === selectedEL) ?? null,
      stage: stages.find(s => s.id === selectedStage) ?? null,
      sample: samples.find(s => s.id === selectedSample) ?? null,
      description,
      start_date: startDate,
      end_date: endDate,
      attribute: attributes,
    }));
    void navigate("/create-task/step-2");
  };

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100 flex flex-col items-center py-10">
      <CreateTaskStepper currentStep={1} />
      <form className="bg-white rounded-2xl px-8 pt-8 pb-6 shadow-lg max-w-4xl w-full mx-auto" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-6">Tạo nhiệm vụ</h2>
        <div className="flex flex-col mb-4 flex-1">
          <label className="font-medium mb-1.5">Tên nhiệm vụ *</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col mb-4 flex-1">
          <label className="font-medium mb-1.5">Chọn nhật ký thí nghiệm *</label>
          <select
            value={selectedEL}
            onChange={e => setSelectedEL(e.target.value)}
            required
            className="py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Chọn nhật ký thí nghiệm...</option>
            {experimentLogs.map(el => (
              <option key={el.id} value={el.id}>{el.name}</option>
            ))}
          </select>
          {loadingEL && <span className="text-xs text-gray-400">Đang tải...</span>}
        </div>
        {/* Always show stage dropdown after EL is selected */}
        {selectedEL && (
          <div className="flex flex-col mb-4 flex-1">
            <label className="font-medium mb-1.5">Chọn giai đoạn *</label>
            <select
              value={selectedStage}
              onChange={e => setSelectedStage(e.target.value)}
              required
              className="py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Chọn giai đoạn...</option>
              {stages.length > 0 ? (
                stages.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))
              ) : (
                <option value="" disabled>Không có giai đoạn nào</option>
              )}
            </select>
            {loadingStage && <span className="text-xs text-gray-400">Đang tải...</span>}
          </div>
        )}
        {samples.length > 0 && (
          <div className="flex flex-col mb-4 flex-1">
            <label className="font-medium mb-1.5">Chọn mẫu thí nghiệm *</label>
            <select
              value={selectedSample}
              onChange={e => setSelectedSample(e.target.value)}
              required
              className="py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Chọn mẫu thí nghiệm...</option>
              {samples.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            {loadingSample && <span className="text-xs text-gray-400">Đang tải...</span>}
          </div>
        )}
        <div className="flex flex-col mb-4 flex-1">
          <label className="font-medium mb-1.5">Mô tả nhiệm vụ</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50 min-h-[60px] resize-y"
          />
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col mb-4 flex-1">
            <label className="font-medium mb-1.5">Ngày bắt đầu *</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              required
              className="py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50"
            />
          </div>
          <div className="flex flex-col mb-4 flex-1">
            <label className="font-medium mb-1.5">Ngày kết thúc *</label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              required
              className="py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50"
            />
          </div>
        </div>
        <div className="flex flex-col mb-4 flex-1">
          <label className="font-medium mb-1.5">Nguyên vật liệu</label>
          {loadingElements && <span className="text-xs text-gray-400 mb-2">Đang tải danh sách nguyên vật liệu...</span>}
          <div className="space-y-2">
            {attributes.map((attr, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <select
                  value={attr.elementId}
                  onChange={e => handleAttributeChange(idx, "elementId", e.target.value)}
                  className="flex-1 py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Chọn nguyên vật liệu...</option>
                  {elements.map(element => (
                    <option key={element.id} value={element.id}>{element.name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Đơn vị"
                  value={attr.measurementUnit}
                  readOnly
                  className="w-32 py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-200 cursor-not-allowed"
                />
                <input
                  type="number"
                  placeholder="Số lượng"
                  value={attr.value}
                  onChange={e => handleAttributeChange(idx, "value", Number(e.target.value))}
                  className="w-24 py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  placeholder="Mô tả"
                  value={attr.description}
                  onChange={e => handleAttributeChange(idx, "description", e.target.value)}
                  className="flex-1 py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAttribute(idx)}
                  className="text-red-500 px-2 text-lg font-bold hover:text-red-700"
                  disabled={attributes.length === 1}
                >
                  -
                </button>
                {idx === attributes.length - 1 && (
                  <button
                    type="button"
                    onClick={handleAddAttribute}
                    className="text-green-600 px-2 text-lg font-bold hover:text-green-800"
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-green-700 text-white border-none py-2.5 px-8 rounded-lg text-base cursor-pointer hover:bg-green-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={
              !name || 
              !selectedEL || 
              !selectedStage || 
              !selectedSample || 
              !startDate || 
              !endDate || 
              attributes.some(a => !a.elementId || !a.value) ||
              loadingElements
            }
          >
            Next
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateTaskContainer;