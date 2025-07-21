import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Seedling, SeedlingApiResponse } from "../../types/Seedling";
import axiosInstance from "../../api/axiosInstance";

const PAGE_SIZE = 5;

export default function Seedlings() {
  const navigate = useNavigate();
  const [data, setData] = useState<Seedling[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [byMother, setByMother] = useState("");
  const [byFather, setByFather] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          pageNumber: String(page),
          pageSize: String(PAGE_SIZE),
          ...(searchTerm ? { searchTerm } : {}),
          ...(byMother ? { byMother } : {}),
          ...(byFather ? { byFather } : {}),
        });
        const res = await axiosInstance.get(
          `https://net-api.orchid-lab.systems/api/seedling?${params}`
        );
        const json = res.data as SeedlingApiResponse;
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
  }, [page, searchTerm, byMother, byFather]);

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-green-800">Cây giống hoa lan</h1>
        <button
          type="button"
          onClick={() => void navigate("/seedlings/new")}
          className="bg-green-800 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-950 transition cursor-pointer"
        >
          + Thêm cây giống
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-green-800"
              placeholder="Tìm kiếm theo tên, cây bố mẹ, mô tả..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
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
        <input
          type="text"
          placeholder="Lọc theo mẹ"
          className="border rounded px-3 py-2"
          value={byMother}
          onChange={(e) => {
            setByMother(e.target.value);
            setPage(1);
          }}
        />
        <input
          type="text"
          placeholder="Lọc theo bố"
          className="border rounded px-3 py-2"
          value={byFather}
          onChange={(e) => {
            setByFather(e.target.value);
            setPage(1);
          }}
        />
      </div>
      <div className="bg-white rounded shadow p-0 overflow-x-auto">
        <table className="w-full text-left table-fixed">
          <thead>
            <tr className="bg-green-50 text-green-800 font-semibold">
              <th className="py-3 px-4">Tên</th>
              <th className="px-4">Cây giống 1</th>
              <th className="px-4">Cây giống 2</th>
              <th className="px-4">Ngày sinh</th>
              <th className="px-4">Ngày tạo</th>
              <th className="px-4">Tạo bởi</th>
              <th className="px-4">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: PAGE_SIZE }).map((_, idx) => (
                // eslint-disable-next-line react-x/no-array-index-key
                <tr key={idx} className="border-t animate-pulse">
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </td>
                  <td className="px-4">
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </td>
                  <td className="px-4">
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </td>
                  <td className="px-4">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </td>
                  <td className="px-4">
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </td>
                  <td className="px-4">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </td>
                  <td className="px-4">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-gray-400">
                  Không tìm thấy cây giống.
                </td>
              </tr>
            ) : (
              data.map((s) => (
                <tr key={s.id} className="border-t hover:bg-green-50">
                  <td className="py-3 px-4">{s.localName}</td>
                  <td className="px-4">{s.father}</td>
                  <td className="px-4">{s.mother}</td>
                  <td className="px-4">{s.doB}</td>
                  <td className="px-4">
                    {s.create_date
                      ? new Date(s.create_date).toLocaleString()
                      : ""}
                  </td>
                  <td className="px-4">{s.create_by}</td>
                  <td className="px-4 flex gap-2 mt-2">
                    <button
                      type="button"
                      className="border cursor-pointer border-green-800 text-green-800 rounded-full px-4 py-1 hover:bg-green-800 hover:text-white transition"
                      onClick={() => void navigate(`/seedlings/${s.id}`)}
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Summary cards */}
      <div className="flex gap-4 mt-6 mb-2">
        <div className="bg-green-100 rounded p-4 w-1/4">
          <div className="font-semibold text-green-800">Tổng số cây giống</div>
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
