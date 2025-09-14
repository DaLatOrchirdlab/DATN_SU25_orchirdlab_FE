import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import type { Report, ReportApiResponse } from "../../../types/Report";
import type { Sample, SampleApiResponse } from "../../../types/Sample";

const PAGE_SIZE = 5;

export default function ReportsTechnician() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Report[]>([]);
  const [samples, setSamples] = useState<Sample[]>([]);

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const res = await axiosInstance.get(
          "https://net-api.orchid-lab.systems/api/sample?pageNo=1&pageSize=123"
        );
        const json = res.data as SampleApiResponse;
        setSamples(json.value.data || []);
      } catch {
        setSamples([]);
      }
    };
    void fetchSamples();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("pageNumber", String(page));
        params.append("pageSize", String(PAGE_SIZE));
        if (user?.id) {
          params.append("technicianId", String(user.id));
        }
        const res = await axiosInstance.get(
          `https://net-api.orchid-lab.systems/api/report?${params.toString()}`
        );
        const json = res.data as ReportApiResponse;
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
  }, [page, user?.id]);

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-green-800">
          Báo cáo đã viết
        </h1>
        <button
          type="button"
          className="bg-green-800 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-950 transition cursor-pointer"
          onClick={() => void navigate("/reports/new")}
        >
          + Tạo báo cáo mới
        </button>
      </div>
      <div className="bg-white rounded shadow p-0 overflow-x-auto">
        <table className="w-full text-left table-fixed min-w-[600px]">
          <thead>
            <tr className="bg-green-50 text-green-800 font-semibold">
              <th className="py-3 px-4 w-1/4">Tên</th>
              <th className="px-4 w-1/2">Mẫu cây</th>
              <th className="px-4 w-1/4">Trạng thái</th>
              <th className="px-4 w-1/4">Hành động</th>
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
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-gray-400">
                  Không tìm thấy báo cáo
                </td>
              </tr>
            ) : (
              data.map((s) => (
                <tr key={s.id} className="border-t hover:bg-green-50">
                  <td className="py-3 px-4">{s.name}</td>
                  <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis">
                    {samples.find((sample) => sample.id === s.sample)?.name ??
                      s.sample}
                  </td>
                  <td className="px-4">
  <span
    className={`px-2 py-1 rounded-full text-xs font-semibold ${
      s.status === "Seen"
        ? "bg-green-100 text-green-800"
        : "bg-yellow-100 text-yellow-800"
    }`}
  >
    {s.status === "Seen" ? "Đã xem" : "Chưa xem"}
  </span>
</td>
                  <td className="px-4 flex gap-2 mt-2">
                    <button
                      type="button"
                      className="border cursor-pointer border-green-800 text-green-800 rounded-full px-4 py-1 hover:bg-green-800 hover:text-white transition"
                      onClick={() => void navigate(`/reports/${s.id}`)}
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
      <div className="flex flex-col sm:flex-row gap-4 mt-6 mb-2">
        <div className="bg-green-100 rounded p-4 w-1/4">
          <div className="font-semibold text-green-800">
            Tổng báo cáo đã viết
          </div>
          <div className="text-2xl font-bold text-green-800">{total}</div>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex flex-wrap justify-end mt-4 gap-2">
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
