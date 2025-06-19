import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const mockLogs = [
  {
    id: 'EXP001',
    method: 'Cấy mô',
    batch: 'TC_BATCH_001',
    createdDate: '15/05/2025',
    status: 'Đang thực hiện',
    stage: 2,
    samples: 12,
    parentPlants: [],
    originPlant: { name: 'Cây gốc C', health: 'Tốt' },
    sampleList: Array.from({ length: 12 }, (_, i) => ({
      stt: i + 1,
      name: `Sample ${i + 1}`,
      health: i % 3 === 0 ? 'Tốt' : i % 3 === 1 ? 'Trung bình' : 'Yếu',
    })),
  },
  {
    id: 'EXP002',
    method: 'Lai ghép',
    batch: 'TC_BATCH_002',
    createdDate: '16/05/2025',
    status: 'Đang thực hiện',
    stage: 1,
    samples: 10,
    parentPlants: [
      { type: 'Bố', name: 'Cây bố A', health: 'Tốt' },
      { type: 'Mẹ', name: 'Cây mẹ B', health: 'Tốt' },
    ],
    originPlant: null,
    sampleList: Array.from({ length: 10 }, (_, i) => ({
      stt: i + 1,
      name: `Sample ${i + 1}`,
      health: i % 2 === 0 ? 'Tốt' : 'Yếu',
    })),
  },
];

const stages = [
  'Giai đoạn 1: Khử trùng, cấy chuyển, nuôi cấy',
  'Giai đoạn 2: Kiểm tra sinh trưởng',
  'Giai đoạn 3: Thu hoạch',
];

const ExperimentLogDetail = () => {
  const { id } = useParams();
  const log = mockLogs.find(l => l.id === id);
  const [currentStage, setCurrentStage] = useState(log?.stage ?? 1);
  const [selectedStage, setSelectedStage] = useState(log?.stage ?? 1);

  if (!log) return <div className="ml-64 mt-16 p-8">Không tìm thấy nhật ký thí nghiệm!</div>;

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-4">Chi tiết nhật ký thí nghiệm - {log.id}</h1>
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <p><b>Phương pháp:</b> {log.method}</p>
            <p><b>Lô thí nghiệm:</b> {log.batch}</p>
            <p><b>Ngày tạo:</b> {log.createdDate}</p>
            <p><b>Trạng thái:</b> <span className="px-2 py-1 rounded bg-green-100 text-green-800 text-xs font-semibold">{log.status}</span></p>
            <p><b>Số lượng mẫu:</b> {log.samples}</p>
          </div>
          <div>
            {log.method === 'Lai ghép' ? (
              <>
                <p><b>Cây bố:</b> {log.parentPlants?.[0]?.name} ({log.parentPlants?.[0]?.health})</p>
                <p><b>Cây mẹ:</b> {log.parentPlants?.[1]?.name} ({log.parentPlants?.[1]?.health})</p>
              </>
            ) : log.method === 'Cấy mô' ? (
              <p><b>Cây gốc:</b> {log.originPlant?.name} ({log.originPlant?.health})</p>
            ) : null}
          </div>
        </div>
        {/* Timeline các giai đoạn */}
        <div className="mb-8">
          <h2 className="font-semibold mb-2">Tiến trình các giai đoạn</h2>
          <div className="flex flex-col gap-0 relative ml-6">
            {stages.map((stage, idx) => (
              <div key={idx} className="flex items-center mb-2 relative group cursor-pointer" onClick={() => setSelectedStage(idx + 1)}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 border-2 ${currentStage > idx + 1 ? 'bg-green-500 border-green-500' : currentStage === idx + 1 ? 'bg-yellow-400 border-yellow-400' : 'bg-gray-200 border-gray-300'}`}>
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
            <div className="mt-2">Nội dung chi tiết về giai đoạn này sẽ hiển thị ở đây...</div>
          </div>
          {currentStage < 3 && (
            <button onClick={() => setCurrentStage(currentStage + 1)} className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Chuyển sang {stages[currentStage]}</button>
          )}
        </div>
        {/* Bảng sample */}
        <div>
          <h2 className="font-semibold mb-2">Danh sách mẫu cây</h2>
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 border">STT</th>
                  <th className="px-3 py-2 border">Tên mẫu</th>
                  <th className="px-3 py-2 border">Tình trạng sức khỏe</th>
                </tr>
              </thead>
              <tbody>
                {log.sampleList.map((s) => (
                  <tr key={s.stt}>
                    <td className="px-3 py-2 border text-center">{s.stt}</td>
                    <td className="px-3 py-2 border">{s.name}</td>
                    <td className="px-3 py-2 border">{s.health}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExperimentLogDetail; 