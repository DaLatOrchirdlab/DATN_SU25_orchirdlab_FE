import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';

type ExperimentStatus = 'Đang thực hiện' | 'Hoàn thành' | 'Thất bại';

interface ExperimentLogEntry {
  id: string;
  method: string;
  tissueCultureBatch: string;
  createdDate: string;
  status: ExperimentStatus;
  samples: number;
  stage: string;
}

const ExperimentLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ExperimentStatus | 'all'>('all');
  const [methodFilter, setMethodFilter] = useState<'all' | 'Cấy mô' | 'Lai ghép'>('all');
  const [stageFilter, setStageFilter] = useState<'all' | 'Giai đoạn 1' | 'Giai đoạn 2' | 'Giai đoạn 3'>('all');
  const [logs] = useState<ExperimentLogEntry[]>([
    {
      id: 'EXP001',
      method: 'Cấy mô',
      tissueCultureBatch: 'TC_BATCH_001',
      createdDate: '15/05/2025',
      status: 'Đang thực hiện',
      samples: 12,
      stage: 'Giai đoạn 1',
    },
    {
      id: 'EXP002',
      method: 'Lai ghép',
      tissueCultureBatch: 'TC_BATCH_002',
      createdDate: '12/05/2025',
      status: 'Hoàn thành',
      samples: 8,
      stage: 'Giai đoạn 3',
    },
    {
      id: 'EXP003',
      method: 'Growth Analysis',
      tissueCultureBatch: 'TC_BATCH_003',
      createdDate: '10/05/2025',
      status: 'Đang thực hiện',
      samples: 15,
      stage: 'Giai đoạn 2',
    },
    {
      id: 'EXP004',
      method: 'Disease Analysis',
      tissueCultureBatch: 'TC_BATCH_001',
      createdDate: '08/05/2025',
      status: 'Thất bại',
      samples: 5,
      stage: 'Giai đoạn 1',
    },
    {
      id: 'EXP005',
      method: 'Propagation',
      tissueCultureBatch: 'TC_BATCH_004',
      createdDate: '05/05/2025',
      status: 'Hoàn thành',
      samples: 3,
      stage: 'Giai đoạn 3',
    }
  ]);

  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [selectedLog, setSelectedLog] = useState<ExperimentLogEntry | null>(null);
  const navigate = useNavigate();

  const getStatusColor = (status: ExperimentStatus): string => {
    switch (status) {
      case 'Đang thực hiện': return 'bg-green-100 text-green-800';
      case 'Hoàn thành': return 'bg-purple-100 text-purple-800';
      case 'Thất bại': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusCount = (status: ExperimentStatus): number => {
    return logs.filter((log) => log.status === status).length;
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.tissueCultureBatch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || log.method === methodFilter;
    const matchesStage = stageFilter === 'all' || log.stage === stageFilter;
    return matchesSearch && matchesStatus && matchesMethod && matchesStage;
  });

  const handleClosePopup = () => {
    setShowDetailPopup(false);
    setSelectedLog(null);
  };

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-50 ">
      {/* Header với thống kê */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Nhật ký thí nghiệm</h1>
            <Link 
              to="/experiment-log/create/step-1"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Tạo nhật ký thí nghiệm mới
            </Link>
          </div>

          {/* Thống kê cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-green-600 text-sm font-medium">TỔNG THÍ NGHIỆM</div>
              <div className="text-2xl font-bold text-green-700">{getStatusCount('Đang thực hiện') + getStatusCount('Hoàn thành') + getStatusCount('Thất bại')}</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-blue-600 text-sm font-medium">ĐANG THỰC HIỆN</div>
              <div className="text-2xl font-bold text-blue-700">{getStatusCount('Đang thực hiện')}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-purple-600 text-sm font-medium">HOÀN THÀNH</div>
              <div className="text-2xl font-bold text-purple-700">{getStatusCount('Hoàn thành')}</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-red-600 text-sm font-medium">THẤT BẠI</div>
              <div className="text-2xl font-bold text-red-700">{getStatusCount('Thất bại')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-lg shadow">
          {/* Header và filters */}
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Danh sách nhật ký thí nghiệm</h2>
            <p className="text-gray-600 text-sm mb-4">Quản lý và theo dõi các thí nghiệm của bạn</p>
            
            <div className="flex gap-4 flex-wrap mb-4 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex-1 relative min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Tìm kiếm nhật ký thí nghiệm..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 min-w-[180px]">
                <Filter className="text-gray-400 w-4 h-4" />
                <select
                  className="border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as ExperimentStatus | "all")
                  }
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="Đang thực hiện">Đang thực hiện</option>
                  <option value="Hoàn thành">Hoàn thành</option>
                  <option value="Thất bại">Thất bại</option>
                </select>
              </div>
              <div className="flex items-center gap-2 min-w-[180px]">
                <span className="text-gray-600 text-sm">Phương pháp:</span>
                <select
                  className="border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  value={methodFilter}
                  onChange={e => setMethodFilter(e.target.value as 'all' | 'Cấy mô' | 'Lai ghép')}
                >
                  <option value="all">Tất cả</option>
                  <option value="Cấy mô">Cấy mô</option>
                  <option value="Lai ghép">Lai ghép</option>
                </select>
              </div>
              <div className="flex items-center gap-2 min-w-[180px]">
                <span className="text-gray-600 text-sm">Giai đoạn:</span>
                <select
                  className="border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  value={stageFilter}
                  onChange={e => setStageFilter(e.target.value as 'all' | 'Giai đoạn 1' | 'Giai đoạn 2' | 'Giai đoạn 3')}
                >
                  <option value="all">Tất cả</option>
                  <option value="Giai đoạn 1">Giai đoạn 1</option>
                  <option value="Giai đoạn 2">Giai đoạn 2</option>
                  <option value="Giai đoạn 3">Giai đoạn 3</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phương pháp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lô thí nghiệm</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng mẫu</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-green-50 cursor-pointer transition"
                    onClick={() => void navigate(`/experiment-log/${log.id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {log.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.tissueCultureBatch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.createdDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          log.status
                        )}`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.samples}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Hiển thị 1-5 của 23 kết quả
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Trang</span>
              <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                1
              </button>
              <button className="text-gray-500 hover:text-gray-700 px-3 py-1 rounded text-sm">
                2
              </button>
              <button className="text-gray-500 hover:text-gray-700 px-3 py-1 rounded text-sm">
                3
              </button>
              <span className="text-sm text-gray-500">Sau</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Popup */}
      {showDetailPopup && selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full overflow-hidden">
            <div className="bg-green-600 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Chi tiết Kế hoạch nuôi cấy - {selectedLog.id}
              </h2>
              <button
                onClick={handleClosePopup}
                className="text-white hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Thông tin cơ bản
                </h3>
                <p className="text-sm text-gray-700">
                  <strong>Phương pháp lai:</strong> {selectedLog.method}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Lô nuôi cấy:</strong> {selectedLog.tissueCultureBatch}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Ngày tạo:</strong> {selectedLog.createdDate}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Trạng thái:</strong>{" "}
                  <span
                    className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(
                      selectedLog.status
                    )}`}
                  >
                    {selectedLog.status}
                  </span>
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Mẫu:</strong> {selectedLog.samples}
                </p>
              </div>
              {/* Thêm các chi tiết khác nếu có */}
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Các giai đoạn
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
                  <li>{selectedLog.stage}</li>
                </ul>
              </div>
              {/* Sample Status section - for visual representation as in image */}
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Trạng thái mẫu
                </h3>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="bg-green-500 h-full rounded-full w-[70%]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
              <button
                onClick={handleClosePopup}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ExperimentLog;
