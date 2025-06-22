import { useParams, useNavigate } from "react-router-dom";

export default function SeedlingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real app, fetch data by id
  const seedling = {
    name: "Dendrobium Mix",
    parent: "Dendrobium Nobile",
    parent1: "Dendrobium Biggibum",
    description:
      "A beautiful hybrid orchid seedling with promising characteristics inherited from both parent species. Shows excellent growth potential with vibrant coloration and strong root development.",
    dateOfBirth: "January 15, 2024",
    createdAt: "January 16, 2024 - 10:30 AM",
    createdBy: "John Smith",
    status: "ACTIVE & HEALTHY",
    growth: {
      stage: "Juvenile",
      height: "8.5 cm",
      leafCount: "6 leaves",
      root: "Excellent",
      bloom: "2-3 years",
      lastWatered: "May 28, 2024",
      nextCare: "June 1, 2024",
    },
  };

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100">
      <button
        type="button"
        className="border cursor-pointer border-green-800 text-green-800 rounded px-4 py-1 mb-4 hover:bg-green-800 hover:text-white transition"
        onClick={() => navigate("/seedlings")}
      >
        &larr; Trở về
      </button>
      <h1 className="text-3xl font-bold text-green-800 mb-1">
        {seedling.name}
      </h1>
      <div className="text-gray-500 mb-4">Thông tin chi tiết</div>
      <div className="bg-white rounded shadow p-6 flex gap-8">
        <div className="flex-1">
          <div className="mb-2">
            <span className="font-semibold">Tên:</span> {seedling.name}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Cây bố:</span> {seedling.parent}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Cây mẹ:</span> {seedling.parent1}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Miêu tả:</span>{" "}
            {seedling.description}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Ngày sinh:</span>{" "}
            {seedling.dateOfBirth}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Ngày tạo:</span>{" "}
            {seedling.createdAt}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Tạo bởi:</span> {seedling.createdBy}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Trạng thái:</span>{" "}
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
              {seedling.status}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-8">
        <button
          type="button"
          className="border cursor-pointer border-green-800 text-green-800 px-8 py-2 rounded font-semibold hover:bg-green-800 hover:text-white transition"
        >
          Sửa
        </button>
        <button
          type="button"
          className="border cursor-pointer border-green-800 text-green-800 px-8 py-2 rounded font-semibold hover:bg-green-800 hover:text-white transition"
        >
          Xóa
        </button>
      </div>
    </main>
  );
}
