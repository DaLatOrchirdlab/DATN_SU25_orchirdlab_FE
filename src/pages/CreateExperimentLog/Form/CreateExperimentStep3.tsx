import React from "react";
import { useNavigate } from "react-router-dom";
import ExperimentSteps from "../Step/ExperimentSteps";

interface BatchDetails {
  id: string;
  name: string;
}

interface MethodDetails {
  id: string;
  name: string;
}

interface PlantDetails {
  id: string;
  name: string;
}

interface ExperimentLogData {
  batch: BatchDetails;
  method: MethodDetails;
  fatherPlant: PlantDetails | null;
  motherPlant: PlantDetails | null;
  samples: number; // Example, could be passed from step 1
  createdDate: string;
}

const CreateExperimentStep3 = () => {
  const navigate = useNavigate();

  // Dữ liệu mẫu - thực tế sẽ lấy từ context hoặc state được truyền qua
  const experimentData: ExperimentLogData = {
    batch: { id: "batch-001", name: "Batch-001 (Room A1)" },
    method: { id: "tissue-culture", name: "Tissue Culture Method" },
    fatherPlant: { id: "Dendrobium_Nobile_A1", name: "Dendrobium Nobile A1" },
    motherPlant: { id: "Phalaenopsis_Royal_M2", name: "Phalaenopsis Royal M2" },
    samples: 10, // Example data
    createdDate: "05/08/2023",
  };

  const handleCreateLog = () => {
    // Xử lý tạo Experiment Log ở đây
    alert("Kế hoạch nuôi cấy đã được tạo!");
    void navigate("/experiment-log");
  };

  const handleBack = () => {
    void navigate("/experiment-log/create/step-2");
  };

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-50 p-8">
      <ExperimentSteps currentStep={3} />

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">
              Tạo Kế hoạch nuôi cấy Mới
            </h1>
            <p className="text-gray-600 mt-1">
              Bước 3: Review thông tin và hoàn thành
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Batch và Method */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">
                  Tissue Culture Batch
                </h3>
                <p className="text-sm text-gray-700">
                  {experimentData.batch.name}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Method</h3>
                <p className="text-sm text-gray-700">
                  {experimentData.method.name}
                </p>
              </div>

              {/* Selected Plants */}
              {experimentData.fatherPlant && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">Cây Bố</h3>
                  <p className="text-sm text-blue-700">
                    {experimentData.fatherPlant.name}
                  </p>
                </div>
              )}
              {experimentData.motherPlant && (
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h3 className="font-medium text-pink-800 mb-2">Cây Mẹ</h3>
                  <p className="text-sm text-pink-700">
                    {experimentData.motherPlant.name}
                  </p>
                </div>
              )}
            </div>

            {/* Tóm tắt thông tin */}
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2">
                  Tóm Tắt Thông Tin
                </h3>
                <div className="text-sm text-green-700 space-y-1">
                  <div>
                    <strong>Lô nuôi cấy:</strong> {experimentData.batch.name}
                  </div>
                  <div>
                    <strong>Phương pháp lai:</strong>{" "}
                    {experimentData.method.name}
                  </div>
                  <div>
                    <strong>Lai tạo:</strong> {experimentData.fatherPlant?.name}{" "}
                    x {experimentData.motherPlant?.name}
                  </div>
                  <div>
                    <strong>Mẫu:</strong> {experimentData.samples} mẫu
                  </div>
                  <div>
                    <strong>Ngày tạo:</strong> {experimentData.createdDate}
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-medium text-yellow-800 mb-2">
                  Dự kiến Kết Quả
                </h3>
                <div className="text-sm text-yellow-700 space-y-1">
                  <div>• Màu hoa: Trắng hồng + Tím</div>
                  <div>• Chiều cao: 25-30cm</div>
                  <div>• Kháng bệnh: Cao (Tốt)</div>
                  <div>• Thời gian ra hoa: 6-8 tháng</div>
                  <div>• Tỷ lệ thành công: 75%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="p-6 border-t flex justify-between items-center">
            <button
              onClick={handleBack}
              className="min-w-[90px] px-5 py-2 rounded-lg border-none text-base font-semibold cursor-pointer transition-colors duration-200 bg-gray-300 text-gray-800 hover:bg-gray-400"
            >
              ← Trở về
            </button>
            <button
              onClick={handleCreateLog}
              className="min-w-[90px] px-5 py-2 rounded-lg text-base font-semibold transition-colors duration-200 bg-green-600 hover:bg-green-700 text-white"
            >
              Tạo
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateExperimentStep3;
