import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Method, MethodApiResponse } from "../../types/Method";

const methodTypes = [
  { label: "Tất cả", value: "" },
  { label: "Nhân giống vô tính", value: "vo_tinh" },
  { label: "Nhân giống hữu tính", value: "huu_tinh" },
];

const PAGE_SIZE = 2;

export default function Method() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [data, setData] = useState<Method[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://net-api.orchid-lab.systems/api/method?pageNumber=${page}&pageSize=${PAGE_SIZE}`
        );
        const json = (await res.json()) as MethodApiResponse;
        setData(json.value.data || []);
        setTotal(json.value.totalCount || 0);
        setTotalPages(json.value.pageCount || 1);
      } catch {
        setData([]);
        setTotal(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    void fetchData();
  }, [page]);

  const filtered = data.filter(
    (m) =>
      (filterType === "" ||
        (filterType === "vo_tinh" && m.name === "Subculturing") ||
        (filterType === "huu_tinh" && m.name === "Sterilization")) &&
      (m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.type.toLowerCase().includes(search.toLowerCase()))
  );
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
          onClick={() => void navigate("/method/new")} // Nếu có trang thêm mới
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
        <table className="w-full text-left table-fixed">
          <thead>
            <tr className="bg-green-50 text-green-800 font-semibold">
              <th className="py-3 px-4">Tên phương pháp</th>
              <th className="px-4">Loại</th>
              <th className="px-4">Trạng thái</th>
              <th className="px-4">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: PAGE_SIZE }).map((_, idx) => (
                // eslint-disable-next-line react-x/no-array-index-key
                <tr key={`skeleton-${idx}`} className="border-t animate-pulse">
                  <td colSpan={5} className="py-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                  </td>
                </tr>
              ))
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              paginated.map((m) => (
                <tr key={m.id} className="border-t hover:bg-green-50">
                  <td className="py-3 px-4">{m.name}</td>
                  <td className="px-4">{m.type}</td>
                  <td className="px-4">
                    {m.status == true ? "Active" : "Inactive"}
                  </td>
                  <td className="px-4">
                    <button
                      type="button"
                      className="border cursor-pointer border-green-800 text-green-800 rounded-full px-4 py-1 hover:bg-green-800 hover:text-white transition"
                      onClick={() => void navigate(`/method/${m.id}`)} // Nếu có trang chi tiết
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))
            )}

            {/* {paginated.map((m) => (
              <tr key={m.id} className="border-t hover:bg-green-50">
                <td className="py-3 px-4">{m.id}</td>
                <td className="px-4">{m.name}</td>
                <td className="px-4">{m.type}</td>
                <td className="px-4">
                  <button
                    type="button"
                    className="border cursor-pointer border-green-800 text-green-800 rounded-full px-4 py-1 hover:bg-green-800 hover:text-white transition"
                    onClick={() => void navigate(`/method/${m.id}`)} // Nếu có trang chi tiết
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
            )} */}
          </tbody>
        </table>
      </div>
      {/* Summary cards */}
      <div className="flex gap-4 mt-6 mb-2">
        <div className="bg-green-100 rounded p-4 w-1/4">
          <div className="font-semibold text-green-800">
            Tổng số phương pháp
          </div>
          <div className="text-2xl font-bold text-green-800">{total}</div>
        </div>
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
