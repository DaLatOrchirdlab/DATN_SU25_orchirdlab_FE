import { useState } from "react";
import { useNavigate } from "react-router-dom";

const methodTypes = [
  { label: "Tất cả", value: "" },
  { label: "Nhân giống vô tính", value: "vo_tinh" },
  { label: "Nhân giống hữu tính", value: "huu_tinh" },
];

const methods = [
  {
    id: 1,
    name: "Nhân giống từ lá",
    type: "Nhân giống vô tính",
  },
  {
    id: 2,
    name: "Nhân giống từ chồi",
    type: "Nhân giống vô tính",
  },
  {
    id: 3,
    name: "Nhân giống từ thân",
    type: "Nhân giống vô tính",
  },
  {
    id: 4,
    name: "Thụ phấn chéo",
    type: "Nhân giống hữu tính",
  },
  {
    id: 5,
    name: "Lấy phấn cây này thụ phấn cho cây kia",
    type: "Nhân giống hữu tính",
  },
];

const PAGE_SIZE = 5;

export default function Method() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [page, setPage] = useState(1);

  const filtered = methods.filter(
    (m) =>
      (filterType === "" ||
        (filterType === "vo_tinh" && m.type === "Nhân giống vô tính") ||
        (filterType === "huu_tinh" && m.type === "Nhân giống hữu tính")) &&
      (m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.type.toLowerCase().includes(search.toLowerCase()))
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-green-800">
          Quản lý phương pháp cấy lan
        </h1>
        <button
          type="button"
          className="bg-green-800 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-950 transition cursor-pointer"
          onClick={() => navigate("/method/new")} // Nếu có trang thêm mới
        >
          + Thêm mới
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-green-800"
              placeholder="Tìm kiếm theo tên hoặc loại phương pháp..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.6 10.6z"
                />
              </svg>
            </span>
          </div>
        </div>
        <select
          className="border border-green-800 rounded-full px-4 py-2 font-medium text-green-800 focus:outline-none"
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setPage(1);
          }}
        >
          {methodTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
      <div className="bg-white rounded shadow p-0 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-green-50 text-green-800 font-semibold">
              <th className="py-3 px-4">ID</th>
              <th className="px-4">Tên phương pháp</th>
              <th className="px-4">Loại</th>
              <th className="px-4">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((m) => (
              <tr key={m.id} className="border-t hover:bg-green-50">
                <td className="py-3 px-4">{m.id}</td>
                <td className="px-4">{m.name}</td>
                <td className="px-4">{m.type}</td>
                <td className="px-4">
                  <button
                    type="button"
                    className="border cursor-pointer border-green-800 text-green-800 rounded-full px-4 py-1 hover:bg-green-800 hover:text-white transition"
                    onClick={() => navigate(`/method/${m.id}`)} // Nếu có trang chi tiết
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-400">
                  Không có phương pháp nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-end mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            type="button"
            key={i + 1}
            className={`w-8 h-8 cursor-pointer rounded ${
              page === i + 1
                ? "bg-green-800 text-white"
                : "border border-green-800 text-green-800 hover:bg-green-800 hover:text-white"
            } transition`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </main>
  );
}
