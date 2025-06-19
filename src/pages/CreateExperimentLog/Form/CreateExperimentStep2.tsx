import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExperimentSteps from '../Step/ExperimentSteps';
import { seedlings } from '../../Seedlings'; // Import seedlings data

interface Seedling {
  id: number;
  name: string;
  parent: string;
  parent1: string;
  dateOfBirth: string;
  createdAt: string;
  createdBy: string;
}

const CreateExperimentStep2 = () => {
  const navigate = useNavigate();
  // Lấy phương pháp từ localStorage (giả định đã lưu ở bước 1)
  const method = localStorage.getItem('experiment_method') ?? 'Cấy mô';

  // State cho lai ghép
  const [selectedFather, setSelectedFather] = useState<Seedling | null>(null);
  const [selectedMother, setSelectedMother] = useState<Seedling | null>(null);
  // State cho cấy mô
  const [selectedSeedlings, setSelectedSeedlings] = useState<Seedling[]>([]);

  // Filter out unique parent and parent1 for display as father and mother plants
  const fatherPlants = seedlings.filter((s: Seedling, index: number, self: Seedling[]) => 
    index === self.findIndex((t: Seedling) => (t.parent === s.parent))
  );
  const motherPlants = seedlings.filter((s: Seedling, index: number, self: Seedling[]) => 
    index === self.findIndex((t: Seedling) => (t.parent1 === s.parent1))
  );

  const handleNext = () => {
    if ((method === 'Lai ghép' && selectedFather && selectedMother) || (method === 'Cấy mô' && selectedSeedlings.length > 0)) {
      if (method === 'Lai ghép') {
        localStorage.setItem('experiment_father_id', selectedFather!.id.toString());
        localStorage.setItem('experiment_mother_id', selectedMother!.id.toString());
      } else {
        localStorage.setItem('experiment_seedling_ids', JSON.stringify(selectedSeedlings.map(s => s.id)));
      }
      void navigate('/experiment-log/create/step-3');
    }
  };

  const handleBack = () => {
    void navigate('/experiment-log/create/step-1');
  };

  // Xử lý chọn nhiều cây cho cấy mô
  const handleToggleSeedling = (seedling: Seedling) => {
    setSelectedSeedlings((prev) => {
      if (prev.find((s) => s.id === seedling.id)) {
        return prev.filter((s) => s.id !== seedling.id);
      } else {
        return [...prev, seedling];
      }
    });
  };

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-50 p-8">
      <ExperimentSteps currentStep={2} />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Tạo nhật ký thí nghiệm mới</h1>
            <p className="text-gray-600 mt-1">Bước 2: {method === 'Lai ghép' ? 'Chọn cây bố và cây mẹ cho quá trình lai tạo' : 'Chọn cây giống để nuôi cấy mô'}</p>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {method === 'Lai ghép' ? (
              <>
                {/* Chọn cây bố */}
                <div className="lg:col-span-1 space-y-4">
                  <h2 className="text-lg font-semibold text-gray-800">Chọn Cây Bố</h2>
                  {fatherPlants.map((plant: Seedling) => (
                    <div
                      key={plant.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer ${selectedFather?.id === plant.id ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                      onClick={() => setSelectedFather(plant)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-lg">{plant.parent}</span>
                        <input
                          type="radio"
                          checked={selectedFather?.id === plant.id}
                          readOnly
                          className="w-4 h-4 text-green-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Chọn cây mẹ */}
                <div className="lg:col-span-1 space-y-4">
                  <h2 className="text-lg font-semibold text-gray-800">Chọn Cây Mẹ</h2>
                  {motherPlants.map((plant: Seedling) => (
                    <div
                      key={plant.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer ${selectedMother?.id === plant.id ? 'border-pink-600 bg-pink-50' : 'border-gray-200 hover:border-gray-300'}`}
                      onClick={() => setSelectedMother(plant)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-lg">{plant.parent1}</span>
                        <input
                          type="radio"
                          checked={selectedMother?.id === plant.id}
                          readOnly
                          className="w-4 h-4 text-pink-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Dự đoán lai tạo & Hướng dẫn */}
                <div className="lg:col-span-1 space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-medium text-yellow-800 mb-2">Dự đoán Lai Tạo</h3>
                    {selectedFather && selectedMother ? (
                      <div className="text-sm text-yellow-700 space-y-1">
                        <div><strong>Bố:</strong> {selectedFather.parent}</div>
                        <div><strong>Mẹ:</strong> {selectedMother.parent1}</div>
                        <div><strong>Đặc điểm có thể:</strong></div>
                        <ul className="list-disc list-inside ml-4">
                          <li>Màu hoa: Trắng hồng + Tím</li>
                          <li>Chiều cao: 25-30cm</li>
                          <li>Kháng bệnh: Cao (Tốt)</li>
                          <li>Thời gian lai tạo: 6-8 tháng</li>
                        </ul>
                      </div>
                    ) : (
                      <p className="text-sm text-yellow-700">Chọn 1 cây bố và 1 cây mẹ để xem dự đoán.</p>
                    )}
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-800 mb-2">Hướng Dẫn</h3>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Chọn 1 cây bố và 1 cây mẹ</li>
                      <li>• Click vào tên cây để xem chi tiết</li>
                      <li>• Dự đoán lai tạo</li>
                      <li>• Click Tiếp tục để sang bước tiếp theo</li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Chọn nhiều cây giống */}
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-lg font-semibold text-gray-800">Chọn cây giống để nuôi cấy mô (có thể chọn nhiều)</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {seedlings.map((plant: Seedling) => (
                      <div
                        key={plant.id}
                        className={`border-2 rounded-lg p-4 cursor-pointer flex items-center gap-4 ${selectedSeedlings.find((s) => s.id === plant.id) ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                        onClick={() => handleToggleSeedling(plant)}
                      >
                        <input
                          type="checkbox"
                          checked={!!selectedSeedlings.find((s) => s.id === plant.id)}
                          readOnly
                          className="w-4 h-4 text-green-600"
                        />
                        <span className="font-medium text-lg">{plant.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Hướng dẫn */}
                <div className="lg:col-span-1 space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-800 mb-2">Hướng Dẫn</h3>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Chọn 1 hoặc nhiều cây giống để nuôi cấy mô</li>
                      <li>• Click vào tên cây để xem chi tiết</li>
                      <li>• Click Tiếp tục để sang bước tiếp theo</li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Chi tiết cây bố & mẹ hoặc cây giống đã chọn */}
          {method === 'Lai ghép' && (selectedFather ?? selectedMother) && (
            <div className="p-6 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedFather && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">Chi Tiết Cây Bố: {selectedFather.parent}</h3>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div><strong>Tên cây con:</strong> {selectedFather.name}</div>
                    <div><strong>Ngày sinh:</strong> {selectedFather.dateOfBirth}</div>
                    <div><strong>Ngày tạo:</strong> {selectedFather.createdAt}</div>
                    <div><strong>Tạo bởi:</strong> {selectedFather.createdBy}</div>
                  </div>
                </div>
              )}
              {selectedMother && (
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h3 className="font-medium text-pink-800 mb-2">Chi Tiết Cây Mẹ: {selectedMother.parent1}</h3>
                  <div className="text-sm text-pink-700 space-y-1">
                    <div><strong>Tên cây con:</strong> {selectedMother.name}</div>
                    <div><strong>Ngày sinh:</strong> {selectedMother.dateOfBirth}</div>
                    <div><strong>Ngày tạo:</strong> {selectedMother.createdAt}</div>
                    <div><strong>Tạo bởi:</strong> {selectedMother.createdBy}</div>
                  </div>
                </div>
              )}
            </div>
          )}
          {method === 'Cấy mô' && selectedSeedlings.length > 0 && (
            <div className="p-6 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedSeedlings.map((plant) => (
                <div key={plant.id} className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">Chi Tiết Cây: {plant.name}</h3>
                  <div className="text-sm text-green-700 space-y-1">
                    <div><strong>Ngày sinh:</strong> {plant.dateOfBirth}</div>
                    <div><strong>Ngày tạo:</strong> {plant.createdAt}</div>
                    <div><strong>Tạo bởi:</strong> {plant.createdBy}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer buttons */}
          <div className="p-6 border-t flex justify-between items-center">
            <button 
              onClick={handleBack}
              className="min-w-[90px] px-5 py-2 rounded-lg border-none text-base font-semibold cursor-pointer transition-colors duration-200 bg-gray-300 text-gray-800 hover:bg-gray-400"
            >
              ← Quay lại
            </button>
            <button
              onClick={handleNext}
              disabled={method === 'Lai ghép' ? !selectedFather || !selectedMother : selectedSeedlings.length === 0}
              className={`min-w-[90px] px-5 py-2 rounded-lg text-base font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${
                (method === 'Lai ghép' ? selectedFather && selectedMother : selectedSeedlings.length > 0)
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Tiếp tục →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateExperimentStep2; 