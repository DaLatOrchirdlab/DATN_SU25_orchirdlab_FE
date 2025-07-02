import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Info, Check } from "lucide-react";
import ExperimentSteps from "../Step/ExperimentSteps";
import { useExperimentLogForm } from "../../../context/ExperimentLogFormContext";

// Mock Data
interface Plant {
  id: string;
  name: string;
  type: "cha" | "mẹ";
}

const mockPlants: Plant[] = [
  {
    id: "015ac088-432e-429c-9714-ae47e599cd2c",
    name: "Seedling-4",
    type: "mẹ",
  },
  { id: "051b7baf-8b01-4e7d-a43f-ae27dcbd006c", name: "TEST 3", type: "mẹ" },
  {
    id: "0bcfc802-d32c-47be-876d-5c24b48cc0c5",
    name: "Seedling-1",
    type: "mẹ",
  },
  {
    id: "0ca0f52d-bcfe-4771-90ca-247b1c911e74",
    name: "Seedling-9",
    type: "cha",
  },
  {
    id: "0e5ccf9f-6b54-4f82-812f-d5829b13276b",
    name: "Seedling-8",
    type: "cha",
  },
  {
    id: "13936d9e-87e1-4ef4-8718-dd33a15d0214",
    name: "Seedling-2",
    type: "cha",
  },
];

const CreateExperimentStep2 = () => {
  const navigate = useNavigate();
  const { form, setForm } = useExperimentLogForm();
  const { methodName } = form;

  // State cho chọn cây mẹ/cha
  const [selectedMother, setSelectedMother] = useState<Plant | null>(null);
  const [selectedFather, setSelectedFather] = useState<Plant | null>(null);

  // Khi methodName thay đổi, reset chọn
  useEffect(() => {
    setSelectedMother(null);
    setSelectedFather(null);
  }, [methodName]);

  // Cập nhật context khi chọn cây
  useEffect(() => {
    if (methodName === "Subculturing") {
      if (selectedMother) {
        setForm((prev) => ({
          ...prev,
          motherID: selectedMother.id,
          motherName: selectedMother.name,
          hybridization: [selectedMother.id],
          hybridizationNames: [selectedMother.name],
        }));
      }
    } else if (methodName === "Sterilization") {
      if (selectedMother && selectedFather) {
        setForm((prev) => ({
          ...prev,
          motherID: selectedMother.id,
          motherName: selectedMother.name,
          hybridization: [selectedFather.id, selectedMother.id],
          hybridizationNames: [selectedFather.name, selectedMother.name],
        }));
      }
    }
  }, [selectedMother, selectedFather, methodName, setForm]);

  // Điều kiện next
  const isNextDisabled =
    methodName === "Subculturing"
      ? !selectedMother
      : !(selectedMother && selectedFather);

  const handleNext = () => {
    if (!isNextDisabled) {
      void navigate("/experiment-log/create/step-3");
    }
  };

  if (!methodName) return null;

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-50 p-8">
      <ExperimentSteps currentStep={2} />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">
              Tạo Experiment Log Mới
            </h1>
            <p className="text-gray-600 mt-1">
              Bước 2: Chọn cây giống cho phương pháp "{methodName}"
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                {methodName === "Subculturing" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Chọn 1 cây mẹ
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockPlants
                        .filter((p) => p.type === "mẹ")
                        .map((plant) => (
                          <div
                            key={plant.id}
                            className={`border-2 rounded-lg p-4 cursor-pointer flex items-center gap-4 transition-all ${
                              selectedMother?.id === plant.id
                                ? "border-green-600 bg-green-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => setSelectedMother(plant)}
                          >
                            <div
                              className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center ${
                                selectedMother?.id === plant.id
                                  ? "bg-green-600 border-green-600"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedMother?.id === plant.id && (
                                <Check className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{plant.name}</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                {methodName === "Sterilization" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Chọn 1 cây cha
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {mockPlants
                          .filter((p) => p.type === "cha")
                          .map((plant) => (
                            <div
                              key={plant.id}
                              className={`border-2 rounded-lg p-4 cursor-pointer flex items-center gap-4 transition-all ${
                                selectedFather?.id === plant.id
                                  ? "border-green-600 bg-green-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                              onClick={() => setSelectedFather(plant)}
                            >
                              <div
                                className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center ${
                                  selectedFather?.id === plant.id
                                    ? "bg-green-600 border-green-600"
                                    : "border-gray-300"
                                }`}
                              >
                                {selectedFather?.id === plant.id && (
                                  <Check className="w-4 h-4 text-white" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium">{plant.name}</div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Chọn 1 cây mẹ
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {mockPlants
                          .filter((p) => p.type === "mẹ")
                          .map((plant) => (
                            <div
                              key={plant.id}
                              className={`border-2 rounded-lg p-4 cursor-pointer flex items-center gap-4 transition-all ${
                                selectedMother?.id === plant.id
                                  ? "border-green-600 bg-green-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                              onClick={() => setSelectedMother(plant)}
                            >
                              <div
                                className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center ${
                                  selectedMother?.id === plant.id
                                    ? "bg-green-600 border-green-600"
                                    : "border-gray-300"
                                }`}
                              >
                                {selectedMother?.id === plant.id && (
                                  <Check className="w-4 h-4 text-white" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium">{plant.name}</div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Sidebar */}
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                    <Info size={16} />
                    Tóm tắt lựa chọn
                  </h3>
                  <div className="text-sm text-green-700 space-y-2">
                    <div>
                      <strong>Lô cấy:</strong> {form.batchName ?? "Chưa chọn"}
                    </div>
                    <div>
                      <strong>Phương pháp:</strong>{" "}
                      {form.methodName ?? "Chưa chọn"}
                    </div>
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-medium text-orange-800 mb-2">
                    Cây đã chọn
                  </h3>
                  <div className="text-sm text-orange-700 space-y-1">
                    {methodName === "Subculturing" &&
                      (selectedMother ? (
                        <div>• {selectedMother.name}</div>
                      ) : (
                        "Chưa chọn cây mẹ."
                      ))}
                    {methodName === "Sterilization" && (
                      <>
                        <div>
                          <strong>Cha:</strong>{" "}
                          {selectedFather?.name ?? "Chưa chọn"}
                        </div>
                        <div>
                          <strong>Mẹ:</strong>{" "}
                          {selectedMother?.name ?? "Chưa chọn"}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer buttons */}
          <div className="px-6 py-4 bg-gray-50 border-t flex justify-between">
            <Link
              to="/experiment-log/create/step-1"
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2 rounded-lg"
            >
              <ArrowLeft className="w-4 h-4" /> Quay lại
            </Link>
            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                isNextDisabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              Tiếp tục <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateExperimentStep2;
