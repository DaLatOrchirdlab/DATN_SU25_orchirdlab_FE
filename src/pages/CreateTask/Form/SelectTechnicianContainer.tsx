import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateTaskStepper from "../Step/CreateTaskStepper";

interface TechnicianDetails {
  email: string;
  phone: string;
  degree: string;
  position: string;
  currentTask: string;
  skills: string[];
}

interface Technician {
  id: number;
  name: string;
  initials: string;
  color: string;
  specialty: string;
  experience: number;
  status: "Có thể" | "Bận" | "Sẵn sàng";
  workload: number;
  details: TechnicianDetails | null;
}

const techniciansData: Technician[] = [
  {
    id: 1,
    name: "Trần Văn Hưng",
    initials: "TH",
    color: "#4cafef",
    specialty: "Nuôi cấy mô",
    experience: 5,
    status: "Có thể",
    workload: 60,
    details: {
      email: "hung.tv@orchidlab.com",
      phone: "0901234567",
      degree: "Cử nhân Sinh học",
      position: "Kỹ thuật viên cao cấp",
      currentTask: "Task #001: Lai tạo Cattleya (Hoàn thành 80%)",
      skills: [
        "Nuôi cấy mô lan",
        "Lai tạo giống",
        "Phân tích gen",
        "Quản lý phòng lab"
      ]
    }
  },
  {
    id: 2,
    name: "Nguyễn Thị Lan",
    initials: "NL",
    color: "#b39ddb",
    specialty: "Chăm sóc cây",
    experience: 3,
    status: "Bận",
    workload: 90,
    details: null
  },
  {
    id: 3,
    name: "Phạm Văn Dũng",
    initials: "PD",
    color: "#ffab91",
    specialty: "Thí nghiệm",
    experience: 7,
    status: "Có thể",
    workload: 40,
    details: null
  },
  {
    id: 4,
    name: "Lê Thị Hoa",
    initials: "LH",
    color: "#b0bec5",
    specialty: "Phân tích dữ liệu",
    experience: 4,
    status: "Sẵn sàng",
    workload: 30,
    details: null
  }
];

const SelectTechnicianContainer: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleSelectTech = (id: number): void => {
    setSelectedTech(id);
  };

  const handleNext = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (selectedTech !== null) {
      void navigate("/create-task/step-4");
    }
  };

  const handleBack = (): void => {
    void navigate("/create-task/step-2");
  };

  const getStatusStyles = (status: string): string => {
    switch (status) {
      case "Có thể":
        return "bg-green-50 text-green-700 border border-green-700";
      case "Bận":
        return "bg-yellow-50 text-yellow-600 border border-yellow-400";
      case "Sẵn sàng":
        return "bg-blue-50 text-blue-600 border border-blue-600";
      default:
        return "bg-gray-50 text-gray-600 border border-gray-300";
    }
  };

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100 flex flex-col items-center py-10">
      <CreateTaskStepper currentStep={3} />
      <form 
        className="bg-white rounded-xl px-8 pt-8 pb-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] max-w-[900px] mx-auto mt-8" 
        onSubmit={handleNext}
      >
        <h2 className="text-2xl font-semibold mb-6">Chọn kỹ thuật viên</h2>
        
        <div className="flex flex-col gap-[18px] my-6 mb-8">
          {techniciansData.map((tech) => (
            <div
              key={tech.id}
              className={`border-[1.5px] rounded-[10px] py-[18px] px-6 cursor-pointer transition-all duration-200 relative ${
                selectedTech === tech.id
                  ? "border-2 border-green-700 bg-green-50 shadow-[0_2px_8px_rgba(56,142,60,0.08)]"
                  : "border-gray-300 bg-[#fafbfc] hover:border-2 hover:border-blue-600 hover:bg-[#f1f8ff]"
              }`}
              onClick={() => handleSelectTech(tech.id)}
            >
              <div className="flex items-center gap-[14px] mb-2">
                <div
                  className="w-[38px] h-[38px] rounded-full flex items-center justify-center font-bold text-[1.1rem] text-white mr-2"
                  style={{ backgroundColor: tech.color }}
                >
                  {tech.initials}
                </div>
                
                <div className="flex-1 flex flex-col">
                  <span className="font-semibold text-[1.08rem]">{tech.name}</span>
                  <span className="text-[0.97em] text-gray-600">
                    Chuyên môn: {tech.specialty} | Kinh nghiệm: {tech.experience} năm
                  </span>
                </div>
                
                <span className={`px-3 py-0.5 rounded-xl text-[0.95em] font-medium ml-2 min-w-[70px] text-center ${getStatusStyles(tech.status)}`}>
                  {tech.status}
                </span>
                
                <div className="flex flex-col items-end min-w-[110px] ml-3">
                  <span className="text-[0.95em] text-gray-800 mb-0.5">Tải công việc</span>
                  <div className="w-20 h-2 bg-gray-300 rounded-md overflow-hidden my-0.5">
                    <div 
                      className="h-full bg-green-700 rounded-md transition-all duration-300"
                      style={{ width: `${tech.workload}%` }}
                    ></div>
                  </div>
                  <span className="text-[0.95em] text-gray-800">{tech.workload}%</span>
                </div>
                
                <input
                  type="radio"
                  checked={selectedTech === tech.id}
                  className="ml-4 w-[18px] h-[18px]"
                />
              </div>
              
              {selectedTech === tech.id && tech.details && (
                <div className="flex gap-8 bg-gray-100 rounded-lg py-4 px-6 mt-[10px] text-[0.98em]">
                  <div className="min-w-[220px] space-y-1">
                    <div><strong>Email:</strong> {tech.details.email}</div>
                    <div><strong>SDT:</strong> {tech.details.phone}</div>
                    <div><strong>Bằng cấp:</strong> {tech.details.degree}</div>
                    <div><strong>Vị trí:</strong> {tech.details.position}</div>
                    <div><strong>Nhiệm vụ hiện tại:</strong> {tech.details.currentTask}</div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-2"><strong>Kỹ năng chuyên môn:</strong></div>
                    <ul className="list-disc pl-[18px] m-0 space-y-0">
                      {tech.details.skills.map((skill, idx) => (
                        <li key={idx}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            className="min-w-[90px] px-5 py-2 rounded-lg border-none text-base font-semibold cursor-pointer transition-colors duration-200 bg-gray-300 text-gray-800 hover:bg-gray-400"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="submit"
            className={`min-w-[90px] px-5 py-2 rounded-lg border-none text-base font-semibold transition-colors duration-200 ${
              selectedTech === null
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-700 text-white cursor-pointer hover:bg-green-800"
            }`}
            disabled={selectedTech === null}
          >
            Next
          </button>
        </div>
      </form>
    </main>
  );
};

export default SelectTechnicianContainer;