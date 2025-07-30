import { useNavigate } from "react-router-dom";

export default function ReportsTechnician() {
  const navigate = useNavigate();
  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100">
      <h1>Reports for technician</h1>
      <button
        type="button"
        className="bg-green-800 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-950 transition cursor-pointer"
        onClick={() => void navigate("/reports/new")}
      >
        + Tạo báo cáo mới
      </button>
    </main>
  );
}
