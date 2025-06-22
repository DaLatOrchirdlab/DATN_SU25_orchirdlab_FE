import React, { useState, useMemo } from "react";
import dayjs from "dayjs";
interface Report {
  id: string;
  taskName: string;
  author: string;
  date: string; // ISO date string
}
const reports: Report[] = [
  {
    id: "RPT001",
    taskName: "Nghiên cứu lai P. amabilis",
    author: "Trần Văn Hưng",
    date: "2025-06-20",
  },
  {
    id: "RPT002",
    taskName: "Theo dõi cây giống",
    author: "Nguyễn Thị Lan",
    date: "2025-06-18",
  },
  {
    id: "RPT003",
    taskName: "Theo dõi cây giống",
    author: "Nguyễn Thị Lan",
    date: "2025-06-18",
  },
  {
    id: "RPT004",
    taskName: "Theo dõi cây giống",
    author: "Nguyễn Thị Lan",
    date: "2025-06-18",
  },
  {
    id: "RPT005",
    taskName: "Theo dõi cây giống",
    author: "Nguyễn Thị Lan",
    date: "2025-06-18",
  },
  {
    id: "RPT006",
    taskName: "Theo dõi cây giống",
    author: "Nguyễn Thị Lan",
    date: "2025-06-18",
  },
  // ...thêm dữ liệu mẫu
];

const PAGE_SIZE = 5;

export default function ReportList() {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);

  // Lọc dữ liệu
  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchSearch =
        r.taskName.toLowerCase().includes(search.toLowerCase()) ||
        r.author.toLowerCase().includes(search.toLowerCase());
      // const matchFrom = fromDate
      //   ? dayjs(String(r.date)).isAfter(
      //       dayjs(String(fromDate)).subtract(1, "day")
      //     )
      //   : true;
      // const matchTo = toDate
      //   ? dayjs(String(r.date)).isBefore(dayjs(String(toDate)).add(1, "day"))
      //   : true;
      // return matchSearch && matchFrom && matchTo;
      return matchSearch;
    });
  }, [search, fromDate, toDate]);

  // Phân trang
  const totalPages = Math.ceil(filteredReports.length / PAGE_SIZE);
  const pagedReports = filteredReports.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100">
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-4 text-green-800">
          Quản lý báo cáo
        </h1>
        {/* Thanh tìm kiếm & filter */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-green-800"
                placeholder="Tìm kiếm theo tên task, người viết..."
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
        </div>
        {/* Bảng danh sách */}
        <div className="bg-white rounded shadow p-0 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-green-50 text-green-800 font-semibold">
                <th className="py-3 px-4">ID</th>
                <th className="px-4">Tên task</th>
                <th className="px-4">Người viết</th>
                <th className="px-4">Ngày viết</th>
                <th className="px-4">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {pagedReports.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    Không có báo cáo phù hợp.
                  </td>
                </tr>
              ) : (
                pagedReports.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="py-3 px-4">{r.id}</td>
                    <td className="px-4">{r.taskName}</td>
                    <td className="px-4">{r.author}</td>
                    <td className="px-4">
                      {dayjs(r.date).format("DD/MM/YYYY")}
                    </td>
                    <td className="px-4">
                      <a
                        href={`/reports/${r.id}`}
                        className="border cursor-pointer border-green-800 text-green-800 rounded-full px-4 py-1 hover:bg-green-800 hover:text-white transition"
                      >
                        Chi tiết
                      </a>
                    </td>
                  </tr>
                ))
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
      </div>
    </main>
  );
}
