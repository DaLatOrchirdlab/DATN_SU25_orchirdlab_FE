<<<<<<< Updated upstream
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Report } from "../../types/Report";
import axiosInstance from "../../api/axiosInstance";

interface Sample {
  id: string;
  name: string;
  description?: string;
  dob: string;
  statusEnum: string;
=======
import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

interface ReportDetail {
  id: string;
  name: string;
  description: string;
  sample: string;
  technician: string | null;
  status: boolean;
  images?: string[];
  content?: string;
  followUpId?: string;
  createdAt?: string;
  // Thêm các trường khác nếu API trả về
>>>>>>> Stashed changes
}

export default function ReportsDetails() {
  const navigate = useNavigate();
<<<<<<< Updated upstream
  const { id } = useParams();
  const [report, setReport] = useState<Report | null>(null);
  const [sample, setSample] = useState<Sample | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `https://net-api.orchid-lab.systems/api/report/${id}?id=${id}`
        );
        const data = res.data as { value: Report };
        setReport(data.value || null);

        if (data.value?.sample) {
          const sampleRes = await axiosInstance.get(
            `/api/sample/${data.value.sample}?id=${data.value.sample}`
          );
          const sampleData = sampleRes.data as { value: Sample };
          setSample(sampleData.value || null);
        } else {
          setSample(null);
        }
      } catch (error) {
        console.error("Error fetching report details:", error);
        setReport(null);
        setSample(null);
      } finally {
        setLoading(false);
      }
    };
    void fetchDetail();
  }, [id]);

  console.log("Report", report);

  if (loading) {
    return (
      <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100 flex items-center justify-center">
        <div className="text-lg text-gray-500">Đang tải dữ liệu...</div>
      </main>
    );
  }

  return (
    <main className="ml-64 mt-10 min-h-[calc(100vh-64px)] bg-gray-100">
      <div className="max-w-5xl mx-auto py-8">
        <button
          type="button"
          className="border cursor-pointer border-green-800 text-green-800 rounded px-4 py-1 mb-6 hover:bg-green-800 hover:text-white transition"
          onClick={() => void navigate("/reports")}
        >
          &larr; Trở về
        </button>
        <h1 className="text-3xl font-bold mb-6 text-green-900">
          Chi tiết báo cáo
        </h1>
        <div className="bg-white rounded-xl shadow p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="font-semibold text-gray-700 mb-1">Tên task</div>
              <div className="text-lg">{report?.name}</div>
            </div>
            <div>
              <div className="font-semibold text-gray-700 mb-1">Người viết</div>
              <div>{report?.technician}</div>
            </div>
            <div>
              <div className="font-semibold text-gray-700 mb-1">Trạng thái</div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  report?.status === true
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {report?.status}
              </span>
            </div>
            {/* <div>
              <div className="font-semibold text-gray-700 mb-1">Ngày tạo</div>
              <div>{report?.createdAt ? new Date(report.createdAt).toLocaleString() : ""}</div>
            </div> */}
          </div>
          <div className="mb-6">
            <h3 className="font-semibold text-green-800 mb-2">
              Nội dung báo cáo
            </h3>
            <div className="bg-gray-50 p-4 rounded text-gray-800 whitespace-pre-line">
              {report?.description}
            </div>
          </div>
          {/* Hình ảnh đính kèm nếu có */}
          {/* {report?.images && report.images.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-green-800 mb-2">Hình ảnh đính kèm</h3>
              <div className="flex gap-4 flex-wrap">
                {report.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`report-img-${idx}`}
                    className="w-32 h-32 object-cover rounded border"
                  />
                ))}
              </div>
            </div>
          )} */}
        </div>
        {/* Thông tin mẫu vật */}
        <div className="bg-white rounded-xl shadow p-8">
          <h2 className="text-xl font-bold text-green-900 mb-4">
            Thông tin mẫu vật
          </h2>
          {sample ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="font-semibold text-gray-700 mb-1">
                  Tên mẫu vật
                </div>
                <div className="text-lg">{sample.name}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-1">
                  ID mẫu vật
                </div>
                <div>{sample.id}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-1">Ngày tạo</div>
                <div>
                  {sample.dob ? new Date(sample.dob).toLocaleDateString() : ""}
                </div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-1">
                  Trạng thái
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    sample.statusEnum === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {sample.statusEnum}
                </span>
              </div>
              <div className="md:col-span-2">
                <div className="font-semibold text-gray-700 mb-1">Mô tả</div>
                <div className="bg-gray-50 p-3 rounded text-gray-800 whitespace-pre-line">
                  {sample.description ?? (
                    <span className="text-gray-400">Không có mô tả</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-500">
              Không tìm thấy thông tin mẫu vật.
            </div>
=======
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<ReportDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    axiosInstance
      .get(`/api/report/${id}`, { params: { id } })
      .then((res) => {
        const data: unknown = res.data;
        let detail: ReportDetail | null = null;
        if (data && typeof data === 'object') {
          if ('value' in data && typeof (data as { value?: unknown }).value === 'object') {
            detail = (data as { value: ReportDetail }).value;
          } else {
            detail = data as ReportDetail;
          }
        }
        setReport(detail);
      })
      .catch(() => {
        setError("Không thể tải chi tiết báo cáo.");
        setReport(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100"><div className="p-8">Đang tải dữ liệu...</div></main>;
  }
  if (error) {
    return <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100"><div className="p-8 text-red-500">{error}</div></main>;
  }
  if (!report) {
    return <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100"><div className="p-8">Không tìm thấy báo cáo.</div></main>;
  }

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Chi tiết báo cáo</h1>
      <div className="bg-white rounded shadow p-6">
        {/* Hình ảnh đính kèm */}
        {report.images && report.images.length > 0 && (
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
        )}
        {/* Thông tin cơ bản */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <b>Tên báo cáo:</b> {report.name}
          </div>
          <div>
            <b>Mẫu:</b> {report.sample}
          </div>
          <div>
            <b>Kỹ thuật viên:</b> {report.technician ?? "-"}
          </div>
          <div>
            <b>Trạng thái:</b> {report.status ? "Hoạt động" : "Ẩn"}
          </div>
          <div>
            <b>Mô tả:</b> {report.description}
          </div>
          {report.createdAt && (
            <div>
              <b>Ngày tạo:</b> {new Date(report.createdAt).toLocaleDateString("vi-VN")}
            </div>
          )}
        </div>
        {/* Nội dung chi tiết */}
        {report.content && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Nội dung báo cáo</h3>
            <div className="bg-gray-50 p-4 rounded">{report.content}</div>
          </div>
        )}
        {/* Nút báo cáo thêm */}
        <div className="flex gap-4">
          {report.followUpId && (
            <button
              className="bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700 transition"
              onClick={() => { void navigate(`/reports/${report.followUpId}/follow-up`); }}
            >
              Xem báo cáo follow-up
            </button>
>>>>>>> Stashed changes
          )}
        </div>
      </div>
    </main>
  );
}

