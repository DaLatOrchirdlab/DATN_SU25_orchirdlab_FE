import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockMethods = [
  { id: "M1", name: "Nuôi cấy mô", stages: ["Giai đoạn 1", "Giai đoạn 2"] },
  { id: "M2", name: "Lai tạo", stages: ["Giai đoạn 1", "Giai đoạn 2", "Giai đoạn 3"] },
];

const TaskTemplateCreate: React.FC = () => {
  const [name, setName] = useState("");
  const [methodId, setMethodId] = useState("");
  const [stage, setStage] = useState("");
  const [description, setDescription] = useState("");
  const [materials, setMaterials] = useState([
    { name: "", quantity: 1, unit: "" },
  ]);
  const navigate = useNavigate();

  const selectedMethod = mockMethods.find(m => m.id === methodId);
  const stageOptions = selectedMethod ? selectedMethod.stages : [];

  const handleMaterialChange = (idx: number, field: string, value: string | number) => {
    setMaterials(prev => prev.map((mat, i) => i === idx ? { ...mat, [field]: value } : mat));
  };

  const handleAddMaterial = () => {
    setMaterials(prev => [...prev, { name: "", quantity: 1, unit: "" }]);
  };

  const handleRemoveMaterial = (idx: number) => {
    setMaterials(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gửi dữ liệu lên API ở đây nếu cần
    alert("Tạo mẫu nhiệm vụ thành công!");
    navigate("/task-templates");
  };

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white rounded-xl px-8 pt-8 pb-6 shadow-md max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-green-800">Tạo mẫu nhiệm vụ</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="font-medium mb-1.5 block">Tên nhiệm vụ mẫu *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label className="font-medium mb-1.5 block">Phương pháp *</label>
            <select
              value={methodId}
              onChange={e => { setMethodId(e.target.value); setStage(""); }}
              required
              className="w-full py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Chọn phương pháp...</option>
              {mockMethods.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="font-medium mb-1.5 block">Giai đoạn *</label>
            <select
              value={stage}
              onChange={e => setStage(e.target.value)}
              required
              disabled={!methodId}
              className="w-full py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Chọn giai đoạn...</option>
              {stageOptions.map((s, idx) => (
                <option key={idx} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="font-medium mb-1.5 block">Mô tả nhiệm vụ</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50 min-h-[60px] resize-y focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label className="font-medium mb-1.5 block">Nguyên vật liệu</label>
            <div className="space-y-2">
              {materials.map((mat, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Tên vật tư"
                    value={mat.name}
                    onChange={e => handleMaterialChange(idx, "name", e.target.value)}
                    className="flex-1 py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50"
                  />
                  <input
                    type="number"
                    min={1}
                    placeholder="Số lượng"
                    value={mat.quantity}
                    onChange={e => handleMaterialChange(idx, "quantity", Number(e.target.value))}
                    className="w-24 py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50"
                  />
                  <input
                    type="text"
                    placeholder="Đơn vị"
                    value={mat.unit}
                    onChange={e => handleMaterialChange(idx, "unit", e.target.value)}
                    className="w-20 py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50"
                  />
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600"
                    onClick={() => handleRemoveMaterial(idx)}
                    disabled={materials.length === 1}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-2 bg-green-700 text-white border-none py-1.5 px-3.5 rounded-md cursor-pointer text-sm hover:bg-green-800 transition-colors"
              onClick={handleAddMaterial}
            >
              + Thêm vật tư
            </button>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-green-700 text-white border-none py-2.5 px-8 rounded-lg text-base cursor-pointer hover:bg-green-800 transition-colors"
            >
              Lưu mẫu nhiệm vụ
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default TaskTemplateCreate; 