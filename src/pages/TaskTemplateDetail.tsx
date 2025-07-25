import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const mockTemplates = [
  {
    id: "TPL001",
    name: "Cấy mô - Giai đoạn 1",
    method: "Nuôi cấy mô",
    stage: "Giai đoạn 1",
    description: "Chuẩn bị mẫu và môi trường cấy.",
    materials: [
      { name: "Agar", quantity: 10, unit: "g" },
      { name: "Nước cất", quantity: 1000, unit: "ml" },
    ],
  },
  {
    id: "TPL002",
    name: "Lai tạo - Giai đoạn 2",
    method: "Lai tạo",
    stage: "Giai đoạn 2",
    description: "Tiến hành lai tạo giống mới.",
    materials: [
      { name: "Ống nghiệm", quantity: 20, unit: "cái" },
    ],
  },
];

const TaskTemplateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const template = mockTemplates.find(tpl => tpl.id === id);

  if (!template) {
    return (
      <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100 flex flex-col items-center py-10">
        <div className="bg-white rounded-xl px-8 pt-8 pb-6 shadow-md max-w-2xl w-full text-center">
          <h2 className="text-2xl font-bold mb-6 text-red-700">Không tìm thấy mẫu nhiệm vụ</h2>
          <button
            className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
            onClick={() => { void navigate("/task-templates"); }}
          >
            Quay lại danh sách
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white rounded-xl px-8 pt-8 pb-6 shadow-md max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-green-800">Chi tiết mẫu nhiệm vụ</h2>
        <div className="mb-4">
          <b>Tên nhiệm vụ mẫu:</b> {template.name}
        </div>
        <div className="mb-4">
          <b>Phương pháp:</b> {template.method}
        </div>
        <div className="mb-4">
          <b>Giai đoạn:</b> {template.stage}
        </div>
        <div className="mb-4">
          <b>Mô tả:</b> {template.description}
        </div>
        <div className="mb-4">
          <b>Nguyên vật liệu:</b>
          <ul className="list-disc ml-6 mt-2">
            {template.materials.map((mat, idx) => (
              <li key={idx}>
                {mat.name} - {mat.quantity} {mat.unit}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
            onClick={() => { void navigate("/task-templates"); }}
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    </main>
  );
};

export default TaskTemplateDetail; 