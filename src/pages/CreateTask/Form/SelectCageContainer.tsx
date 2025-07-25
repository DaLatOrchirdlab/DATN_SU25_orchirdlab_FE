import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateTaskStepper from "../Step/CreateTaskStepper";
import { useCreateTask } from "../../../context/CreateTaskContext";

interface CageDetails {
  size: string;
  temp: string;
  humidity: string;
  light: string;
  devices: string[];
}

interface Cage {
  id: number;
  name: string;
  status: string;
  area: string;
  details: CageDetails;
}

const cagesData: Cage[] = [
  {
    id: 1,
    name: "Lồng A1 - Sinh trưởng",
    status: "Hoạt động",
    area: "25m²",
    details: {
      size: "5m x 5m x 3m",
      temp: "20-28°C",
      humidity: "70-85%",
      light: "LED 12h/ngày",
      devices: [
        "Hệ thống tưới tự động",
        "Máy điều hòa nhiệt độ",
        "Cảm biến độ ẩm",
        "Camera giám sát"
      ]
    }
  },
  {
    id: 2,
    name: "Lồng B2 - Nhân giống",
    status: "Bảo trì",
    area: "30m²",
    details: {
      size: "6m x 5m x 3m",
      temp: "22-26°C",
      humidity: "65-80%",
      light: "LED 10h/ngày",
      devices: ["Hệ thống tưới tự động"]
    }
  },
  {
    id: 3,
    name: "Lồng C3 - Thử nghiệm",
    status: "Sẵn sàng",
    area: "20m²",
    details: {
      size: "4m x 5m x 3m",
      temp: "21-27°C",
      humidity: "68-82%",
      light: "LED 11h/ngày",
      devices: ["Cảm biến độ ẩm"]
    }
  },
  {
    id: 4,
    name: "Lồng D4 - Quan sát",
    status: "Hoạt động",
    area: "18m²",
    details: {
      size: "3m x 6m x 3m",
      temp: "20-25°C",
      humidity: "70-80%",
      light: "LED 12h/ngày",
      devices: ["Camera giám sát"]
    }
  }
];

const SelectCageContainer: React.FC = () => {
  const [selectedCage, setSelectedCage] = useState<number | null>(null);
  const navigate = useNavigate();
  const { setState } = useCreateTask();

  const handleSelectCage = (id: number): void => {
    setSelectedCage(id);
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (selectedCage !== null) {
      const cageObj = cagesData.find(c => c.id === selectedCage);
      setState(prev => ({ ...prev, cage: cageObj ? { id: cageObj.id, name: cageObj.name } : null }));
      void navigate("/create-task/step-3");
    }
  };

  const handleBack = (): void => {
    void navigate("/create-task/step-1");
  };

  const getStatusStyles = (status: string): string => {
    switch (status) {
      case "Hoạt động":
        return "bg-green-50 text-green-700 border border-green-400";
      case "Bảo trì":
        return "bg-yellow-50 text-yellow-600 border border-yellow-400";
      case "Sẵn sàng":
        return "bg-blue-50 text-blue-700 border border-blue-400";
      default:
        return "bg-gray-50 text-gray-600 border border-gray-400";
    }
  };

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100 flex flex-col items-center py-10">
      <CreateTaskStepper currentStep={2} />
      <div className="bg-white rounded-xl px-8 pt-8 pb-6 shadow-md max-w-4xl mx-auto mt-8">
        <h2 className="text-xl font-semibold mb-6">Chọn lồng thực hiện</h2>

        <div className="flex flex-col gap-4 my-6 mb-8">
          {cagesData.map((cage) => (
            <div
              key={cage.id}
              className={`border-2 rounded-lg p-4 px-6 cursor-pointer transition-all duration-200 relative ${
                selectedCage === cage.id
                  ? "border-green-600 bg-green-50 shadow-md shadow-green-100"
                  : "border-gray-300 bg-gray-50 hover:border-blue-500 hover:bg-blue-50"
              }`}
              onClick={() => handleSelectCage(cage.id)}
            >
              <div className="flex items-center gap-3 mb-2">
                <input
                  type="radio"
                  checked={selectedCage === cage.id}
                  readOnly
                  className="w-4 h-4 text-green-600"
                />
                <span className="font-semibold text-lg flex-1">{cage.name}</span>
                <span className={`px-3 py-1 rounded-xl text-sm font-medium ml-2 ${getStatusStyles(cage.status)}`}>
                  {cage.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 gap-x-8 text-sm mt-1">
                <div className="min-w-[180px]">
                  <b>Diện tích:</b> {cage.area}
                </div>
                <div className="min-w-[180px]">
                  <b>Kích thước:</b> {cage.details.size}
                </div>
                <div className="min-w-[180px]">
                  <b>Nhiệt độ:</b> {cage.details.temp}
                </div>
                <div className="min-w-[180px]">
                  <b>Độ ẩm:</b> {cage.details.humidity}
                </div>
                <div className="min-w-[180px]">
                  <b>Ánh sáng:</b> {cage.details.light}
                </div>
                <div className="min-w-[180px]">
                  <b>Thiết bị:</b>
                  <ul className="ml-4 mt-1">
                    {cage.details.devices.map((device, idx) => (
                      <li key={idx} className="list-disc">{device}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button 
            type="button" 
            className="min-w-[90px] py-2 px-5 rounded-lg border-none text-base font-semibold cursor-pointer transition-colors bg-gray-300 text-gray-700 hover:bg-gray-400"
            onClick={handleBack}
          >
            Back
          </button>
          <button 
            type="submit" 
            className={`min-w-[90px] py-2 px-5 rounded-lg border-none text-base font-semibold transition-colors ${
              selectedCage === null
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-600 text-white cursor-pointer hover:bg-green-700"
            }`}
            disabled={selectedCage === null}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
};

export default SelectCageContainer;