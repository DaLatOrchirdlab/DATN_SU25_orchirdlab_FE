import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
import ExperimentSteps from "../Step/ExperimentSteps";
import { useExperimentLogForm } from '../../../context/ExperimentLogFormContext';

interface Batch {
  id: string;
}

function hasValueWithData<T>(obj: unknown, itemGuard: (item: unknown) => item is T): obj is { value: { data: T[] } } {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'value' in obj &&
    typeof (obj as { value: unknown }).value === 'object' &&
    (obj as { value: { data?: unknown[] } }).value !== null &&
    'data' in (obj as { value: { data?: unknown[] } }).value &&
    Array.isArray((obj as { value: { data?: unknown[] } }).value.data) &&
    (obj as { value: { data: unknown[] } }).value.data.every(itemGuard)
  );
}

function isBatch(item: unknown): item is Batch {
  return typeof item === 'object' && item !== null && 'id' in item && typeof (item as { id: unknown }).id === 'string';
}

function isMethod(item: unknown): item is { id: string; name: string; description: string } {
  return (
    typeof item === 'object' && item !== null &&
    'id' in item && typeof (item as { id: unknown }).id === 'string' &&
    'name' in item && typeof (item as { name: unknown }).name === 'string' &&
    'description' in item && typeof (item as { description: unknown }).description === 'string'
  );
}

const CreateExperimentStep1 = () => {
  const navigate = useNavigate();
  const { form, setForm } = useExperimentLogForm();
  
  // Local state initialized from context
  const [selectedBatch, setSelectedBatch] = useState(form.tissueCultureBatchID ?? "");
  const [selectedMethod, setSelectedMethod] = useState(form.methodID ?? "");

  const [batches, setBatches] = useState<Batch[]>([]);
  const [loadingBatch, setLoadingBatch] = useState(true);
  const [batchError, setBatchError] = useState<string | null>(null);

  const [methods, setMethods] = useState<{ id: string; name: string; description: string }[]>([]);

  // Fetch batches from API
  useEffect(() => {
    setLoadingBatch(true);
    setBatchError(null);
    fetch('https://net-api.orchid-lab.systems/api/tissue-culture-batch?pageNumber=1&pageSize=10')
      .then(async (res) => {
        if (!res.ok) throw new Error('Lỗi khi lấy danh sách batch');
        const data: unknown = await res.json();
        let arr: Batch[] = [];
        if (hasValueWithData<Batch>(data, isBatch)) {
          arr = data.value.data;
        }
        setBatches(arr);
      })
      .catch(() => {
        setBatchError('Không thể tải danh sách batch.');
        setBatches([]);
      })
      .finally(() => setLoadingBatch(false));
  }, []);

  // Fetch methods from API
  useEffect(() => {
    fetch('https://net-api.orchid-lab.systems/api/method?pageNumber=1&pageSize=10')
      .then(async (res) => {
        if (!res.ok) throw new Error('Lỗi khi lấy danh sách phương pháp');
        const data: unknown = await res.json();
        let arr: { id: string; name: string; description: string }[] = [];
        if (hasValueWithData<{ id: string; name: string; description: string }>(data, isMethod)) {
          arr = data.value.data;
        }
        setMethods(arr);
      })
      .catch(() => setMethods([]));
  }, []);

  // Update context when local state changes
  useEffect(() => {
    const methodObj = methods.find(m => m.id === selectedMethod);
    const batchObj = batches.find(b => b.id === selectedBatch);
    setForm(prev => ({
      ...prev,
      tissueCultureBatchID: selectedBatch,
      batchName: batchObj?.id ?? '',
      methodID: methodObj?.id ?? '',
      methodName: methodObj?.name ?? '',
    }));
  }, [selectedBatch, selectedMethod, batches, setForm, methods]);


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
                        disabled={loadingBatch}
                      >
                        <option value="">Chọn tissue culture batch</option>
                        {batches.map((batch) => (
                          <option key={batch.id} value={batch.id}>
                            {batch.id}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                    {loadingBatch && <div className="text-xs text-gray-400 mt-1">Đang tải danh sách batch...</div>}
                    {batchError && <div className="text-xs text-red-500 mt-1">{batchError}</div>}
                  </div>
                  {/* Method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phương pháp <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={selectedMethod}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                      >
                        <option value="">Chọn phương pháp</option>
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
                      <h3 className="font-medium text-gray-900 mb-2">Chi Tiết Method: {methods.find(m => String(m.id) === selectedMethod)?.name}</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div>
                          <strong>Mô tả:</strong>
                          <p>{methods.find(m => String(m.id) === selectedMethod)?.description}</p>
                        </div>
                        <div>
                          <strong>Các giai đoạn:</strong>
                          <ul className="list-disc list-inside ml-4 space-y-1">
                            {selectedMethod === '1' ? ( // '1' là Cấy mô
                              <>
                                <li>Giai đoạn 1: Khử trùng mẫu vật</li>
                                <li>Giai đoạn 2: Cấy mô lên môi trường nuôi cấy</li>
                                <li>Giai đoạn 3: Theo dõi và chuyển cấy</li>
                                <li>Giai đoạn 4: Tạo rễ và thích nghi</li>
                              </>
                            ) : ( // '2' là Lai ghép
                              <>
                                <li>Giai đoạn 1: Lai tạo bố mẹ</li>
                                <li>Giai đoạn 2: Kiểm tra sinh trưởng</li>
                                <li>Giai đoạn 3: Thu hoạch</li>
                              </>
                            )}
                          </ul>
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
                      <li>• Chọn lô thí nghiệm có trạng thái phù hợp</li>
                      <li>• Chọn phương pháp phù hợp với loại thí nghiệm</li>
                      <li>• Kiểm tra số lượng mẫu có sẵn</li>
                      <li>• Chú ý đến đặc tính của từng phương pháp</li>
                      <li>• Bước 2: Nhập mẫu cây</li>
                      <li>• Bước 3: Xem lại & tạo nhật ký</li>
                    </ul>
                  </div>
                  {/* Batch Info */}
                  {selectedBatch && batches.find(b => b.id === selectedBatch) && (
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h3 className="font-medium text-orange-800 mb-2">
                        Thông tin lô nuôi cấy
                      </h3>
                      <div className="text-sm text-orange-700 space-y-1">
                        <div>
                          <strong>ID:</strong> {batches.find(b => b.id === selectedBatch)?.id ?? '---'}
                        </div>
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
                    !selectedBatch || !selectedMethod
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  Tiếp tục <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateExperimentStep1;
