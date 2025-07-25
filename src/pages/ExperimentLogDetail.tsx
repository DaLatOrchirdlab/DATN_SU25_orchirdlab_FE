import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Sample {
  id: string;
  name: string;
  description?: string;
  dob?: string;
  status?: boolean;
}
interface StageDTO {
  name: string;
  description?: string;
  dateOfProcessing?: number | string;
}
interface Hybridization {
  isMother: boolean;
  seedling: { name: string };
}
interface ExperimentLogDetailType {
  id: string;
  methodName: string;
  description?: string;
  tissueCultureBatchName: string;
  createdDate?: string;
  status?: string;
  samples?: Sample[];
  stages?: StageDTO[];
  hybridizations?: Hybridization[];
  // Các trường khác nếu cần
}

function isExperimentLogDetail(obj: unknown): obj is ExperimentLogDetailType {
  if (typeof obj !== 'object' || obj === null) return false;
  const o = obj as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.methodName === 'string' &&
    typeof o.tissueCultureBatchName === 'string'
  );
}

const ExperimentLogDetail = () => {
  const { id } = useParams();
  const [log, setLog] = useState<ExperimentLogDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState(1);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetch(`https://net-api.orchid-lab.systems/api/experimentlog/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Lỗi khi lấy dữ liệu chi tiết nhật ký thí nghiệm');
        const data: unknown = await res.json();
        const logData = (data as { value?: unknown }).value ?? data;
        if (isExperimentLogDetail(logData)) {
          setLog(logData);
        } else {
          setError('Dữ liệu trả về không hợp lệ.');
        }
      })
      .catch(() => setError('Không thể tải chi tiết nhật ký thí nghiệm.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="ml-64 mt-16 p-8 text-gray-500">Đang tải dữ liệu...</div>;
  if (error) return <div className="ml-64 mt-16 p-8 text-red-500">{error}</div>;
  if (!log) return <div className="ml-64 mt-16 p-8">Không tìm thấy nhật ký thí nghiệm!</div>;

  const stages = log.stages && log.stages.length > 0
    ? log.stages.map((s, idx) => s.name ?? `Giai đoạn ${idx + 1}`)
    : ['Giai đoạn 1', 'Giai đoạn 2', 'Giai đoạn 3'];

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-4">Chi tiết nhật ký thí nghiệm - {log.id}</h1>
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <p><b>Phương pháp:</b> {log.methodName}</p>
            <p><b>Lô thí nghiệm:</b> {log.tissueCultureBatchName}</p>
            <p><b>Trạng thái:</b> {log.status}</p>
            <p><b>Số lượng mẫu:</b> {Array.isArray(log.samples) ? log.samples.length : 0}</p>
            {log.description && <p><b>Mô tả:</b> {log.description}</p>}
          </div>
        </div>
        {/* Cây giống đã chọn */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Cây giống đã chọn</h2>
          <div className="text-green-800 text-base">
            {log.methodName === 'Subculturing' && (
              Array.isArray(log.hybridizations) && log.hybridizations.length > 0
                ? <>• {log.hybridizations[0].seedling?.name ?? 'Chưa chọn'}</>
                : 'Chưa chọn cây giống.'
            )}
            {log.methodName === 'Sterilization' && (
              Array.isArray(log.hybridizations) && log.hybridizations.length > 0 ? (
                <>
                  <div><b>Cây giống 1:</b> {log.hybridizations[0]?.seedling?.name ?? 'Chưa chọn'}</div>
                  <div><b>Cây giống 2:</b> {log.hybridizations[1]?.seedling?.name ?? 'Chưa chọn'}</div>
                </>
              ) : 'Chưa chọn cây giống.'
            )}
          </div>
        </div>
        {/* Timeline các giai đoạn */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Tiến trình các giai đoạn</h2>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              onClick={() => window.location.href = `/create-task?experimentLogId=${log.id}`}
            >
              Tạo Task mới
            </button>
          </div>
          <div className="flex flex-col gap-0 relative ml-6">
            {stages.map((stage, idx) => (
              <div key={idx} className="flex items-center mb-2 relative group cursor-pointer" onClick={() => setSelectedStage(idx + 1)}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 border-2 ${selectedStage > idx + 1 ? 'bg-green-500 border-green-500' : selectedStage === idx + 1 ? 'bg-yellow-400 border-yellow-400' : 'bg-gray-200 border-gray-300'}`}>
                  <span className="text-white font-bold text-xs">{idx + 1}</span>
                </div>
                {idx < stages.length - 1 && (
                  <div className="absolute left-1/2 top-6 w-0.5 h-8 bg-gray-300 -translate-x-1/2 z-0"></div>
                )}
                <span className={`ml-4 text-base ${selectedStage === idx + 1 ? 'font-bold text-green-700' : 'text-gray-700'}`}>{stage}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded border text-sm">
            <b>Chi tiết {stages[selectedStage - 1]}</b>
            <div className="mt-2">
              {log.stages?.[selectedStage - 1]?.description
                ? log.stages[selectedStage - 1]?.description
                : 'Nội dung chi tiết về giai đoạn này sẽ hiển thị ở đây...'}
            </div>
          </div>
        </div>
        {/* Bảng sample */}
        <div>
          <h2 className="font-semibold mb-2">Danh sách mẫu cây</h2>
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 border">ID</th>
                  <th className="px-3 py-2 border">Tên mẫu</th>
                  <th className="px-3 py-2 border">Mô tả</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(log.samples) && log.samples.length > 0 ? (
                  log.samples.map((s) => (
                    <tr key={s.id}>
                      <td className="px-3 py-2 border text-center">{s.id}</td>
                      <td className="px-3 py-2 border">{s.name}</td>
                      <td className="px-3 py-2 border">{s.description}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-4 text-gray-500">Không có mẫu cây nào.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExperimentLogDetail;