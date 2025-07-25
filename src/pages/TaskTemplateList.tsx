import React from "react";
import { useNavigate } from "react-router-dom";

const mockTemplates = [
  { id: "TPL001", name: "Cấy mô - Giai đoạn 1", method: "Nuôi cấy mô", stage: "Giai đoạn 1" },
  { id: "TPL002", name: "Lai tạo - Giai đoạn 2", method: "Lai tạo", stage: "Giai đoạn 2" },
];

const TaskTemplateList: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-800">Danh sách mẫu nhiệm vụ</h1>
          <button
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
            onClick={() => navigate("/task-templates/new")}
          >
            + Tạo mẫu nhiệm vụ
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-green-50 text-green-800 font-semibold">
              <th className="py-3 px-4">Tên nhiệm vụ mẫu</th>
              <th className="px-4">Phương pháp</th>
              <th className="px-4">Giai đoạn</th>
            </tr>
          </thead>
          <tbody>
            {mockTemplates.map((tpl) => (
              <tr
                key={tpl.id}
                className="border-t hover:bg-green-50 cursor-pointer transition"
                onClick={() => { void navigate(`/task-templates/${tpl.id}`); }}
              >
                <td className="py-3 px-4">{tpl.name}</td>
                <td className="px-4">{tpl.method}</td>
                <td className="px-4">{tpl.stage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default TaskTemplateList; 