import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import ExperimentSteps from '../Step/ExperimentSteps';

const CreateExperimentStep1 = () => {
  const navigate = useNavigate();
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');

  const batches = [
    { id: 'batch-001', name: 'Batch-001 (Room A1)', status: 'Active', samples: 12 },
    { id: 'batch-002', name: 'Batch-002 (Room B2)', status: 'Active', samples: 8 },
    { id: 'batch-003', name: 'Batch-003 (Room C3)', status: 'Completed', samples: 15 }
  ];

  const methods = [
    {
      id: 'tissue-culture',
      name: 'Tissue Culture Method',
      description: 'Phương pháp nuôi cấy mô thực vật trong môi trường vô trung để tạo ra các cây con từ mô xúc.'
    },
    {
      id: 'hybridization',
      name: 'Hybridization Method',
      description: 'Phương pháp lai tạo giữa các giống khác nhau để tạo ra các dòng mới có tính trạng mong muốn.'
    }
  ];

  const handleNext = () => {
    if (selectedBatch && selectedMethod) {
      void navigate('/experiment-log/create/step-2');
    }
  };

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-50 p-8">
      <ExperimentSteps currentStep={1} />
      
      <div className="px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold text-gray-900">Tạo Experiment Log Mới</h1>
              <p className="text-gray-600 mt-1">Bước 1: Chọn Tissue Culture Batch và Method</p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form chính */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Tissue Culture Batch */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tissue Culture Batch <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={selectedBatch}
                        onChange={(e) => setSelectedBatch(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                      >
                        <option value="">Chọn tissue culture batch</option>
                        {batches.map((batch) => (
                          <option key={batch.id} value={batch.id}>
                            {batch.name} - {batch.samples} samples
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Method <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={selectedMethod}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                      >
                        <option value="">Tissue Culture Method</option>
                        {methods.map((method) => (
                          <option key={method.id} value={method.id}>
                            {method.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Chi Tiết Method */}
                  {selectedMethod && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Chi Tiết Method: Tissue Culture Method</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div>
                          <strong>Mô tả:</strong>
                          <p>Phương pháp nuôi cấy mô thực vật trong môi trường vô trung để tạo ra các cây con từ mô xúc.</p>
                        </div>
                        <div>
                          <strong>Các Giai Đoạn:</strong>
                          <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>Giai đoạn 1: Khử trùng mẫu vật</li>
                            <li>Giai đoạn 2: Cấy mô lên môi trường nuôi cấy</li>
                            <li>Giai đoạn 3: Theo dõi và chuyển cấy</li>
                            <li>Giai đoạn 4: Tạo rễ và thích nghi</li>
                          </ul>
                        </div>
                        <div>
                          <strong>Yếu Tố Cần Thiết:</strong>
                          <p>Môi trường MS, NAA, BAP, Agar, Đường sucrose</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar thông tin */}
                <div className="space-y-4">
                  {/* Hướng dẫn */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-800 mb-2">Hướng Dẫn Bước 1</h3>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Chọn batch có trạng thái Active</li>
                      <li>• Chọn method phù hợp với loại thí nghiệm</li>
                      <li>• Kiểm tra số lượng mẫu có sẵn</li>
                      <li>• Chú ý đến đặc tính của từng method</li>
                      <li>• Bước 2: Nhập samples</li>
                      <li>• Bước 3: Review & tạo log</li>
                    </ul>
                  </div>

                  {/* Batch Info */}
                  {selectedBatch && (
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h3 className="font-medium text-orange-800 mb-2">Batch Info</h3>
                      <div className="text-sm text-orange-700 space-y-1">
                        <div><strong>Name:</strong> Batch-001</div>
                        <div><strong>Location:</strong> Room A1</div>
                        <div><strong>Status:</strong> Active</div>
                        <div><strong>Created:</strong> 15/05/2025</div>
                        <div><strong>Samples:</strong> 12 available</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="px-6 py-4 bg-gray-50 border-t flex justify-between">
              <Link 
                to="/experiment-log"
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Hủy
              </Link>
              <div className="flex gap-4">
                <button
                  onClick={handleNext}
                  disabled={!selectedBatch || !selectedMethod}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    selectedBatch && selectedMethod
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm text-gray-500">
                * Trường bắt buộc
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateExperimentStep1;