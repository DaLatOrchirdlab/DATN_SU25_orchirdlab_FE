import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Report } from "../../types/Report";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";

interface Sample {
  id: string;
  name: string;
  description?: string;
  dob: string;
  statusEnum: string;
}

export default function ReportsDetails() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [report, setReport] = useState<Report | null>(null);
  const [sample, setSample] = useState<Sample | null>(null);
  const [images, setImages] = useState<string[]>([]);
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
        const imgRes = await axiosInstance.get<{
          value?: { data?: { url: string }[] };
        }>(`/api/images?pageNumber=1&pageSize=100&reportId=${id}`);
        const imgList = imgRes.data?.value?.data ?? [];
        setImages(imgList.map((img) => img.url));
      } catch (error) {
        console.error("Error fetching report details:", error);
        setReport(null);
        setSample(null);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };
    void fetchDetail();
  }, [id]);
  console.log("Images:", images);

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
          onClick={() =>
            void navigate(
              user?.roleID === 3 ? "/technician/reports" : "/reports"
            )
          }
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
            <div>
              <div className="font-semibold text-gray-700 mb-1">
                Thông tin thuộc tính
              </div>
              {report?.reportAttributes.map((attr, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="font-normal">
                    {attr.name}-({attr.measurementUnit}):
                  </span>
                  <span>
                    Yêu cầu: {attr.valueFrom} - {attr.valueTo}
                  </span>
                  <span className="ml-2">
                    Thu thập:{" "}
                    <span
                      className={
                        attr.value < attr.valueFrom || attr.value > attr.valueTo
                          ? "font-bold"
                          : "font-normal"
                      }
                    >
                      {attr.value}
                    </span>
                  </span>
                </div>
              ))}
            </div>
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
          {images.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-green-800 mb-2">
                Hình ảnh đính kèm
              </h3>
              <div className="flex gap-4 flex-wrap">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`report-img-${idx}`}
                    className="w-32 h-32 object-cover rounded border"
                  />
                ))}
              </div>
            </div>
          )}
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
          )}
        </div>
      </div>
    </main>
  );
}
