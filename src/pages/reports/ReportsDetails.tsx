import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const mockReport = {
  id: "RPT001",
  taskName: "Nghiên cứu lai P. amabilis",
  experimentLog: "EXP001",
  stage: "Giai đoạn 2: Cấy mô",
  author: "Trần Văn Hưng",
  date: "20/06/2025",
  images: ["/public/vite.svg", "/src/assets/react.svg"],
  content:
    "Báo cáo: cập nhật tiến độ và kết quả... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  followUpId: "RPT002", // Nếu có báo cáo follow-up
};

export default function ReportsDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Thực tế sẽ fetch theo id
  const report = mockReport;

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Chi tiết báo cáo</h1>
      <div className="bg-white rounded shadow p-6">
        {/* Hình ảnh đính kèm */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Hình ảnh đính kèm</h3>
          <div className="flex gap-4">
            {report.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`report-img-${idx}`}
                className="w-32 h-32 object-cover rounded"
              />
            ))}
          </div>
        </div>
        {/* Thông tin cơ bản */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <b>Tên task:</b> {report.taskName}
          </div>
          <div>
            <b>Kế hoạch nuôi cấy:</b> {report.experimentLog}
          </div>
          <div>
            <b>Giai đoạn:</b> {report.stage}
          </div>
          <div>
            <b>Người viết:</b> {report.author}
          </div>
          <div>
            <b>Ngày gửi:</b> {report.date}
          </div>
        </div>
        {/* Nội dung chi tiết */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Nội dung báo cáo</h3>
          <div className="bg-gray-50 p-4 rounded">{report.content}</div>
        </div>
        {/* Nút báo cáo thêm */}
        <div className="flex gap-4">
          {report.followUpId && (
            <button
              className="bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700 transition"
              onClick={() =>
                navigate(`/reports/${report.followUpId}/follow-up`)
              }
            >
              Xem báo cáo follow-up
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
