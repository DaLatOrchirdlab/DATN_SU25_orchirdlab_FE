import React from "react";
import { useNavigate } from "react-router-dom";
import CreateTaskStepper from "../Step/CreateTaskStepper";

interface TaskDetail {
  name: string;
  value: string;
  unit: string;
}

interface SelectedCage {
  id: number;
  name: string;
}

interface SelectedTech {
  id: number;
  name: string;
  info: string;
}

interface TaskData {
  taskName: string;
  method: string;
  description: string;
  tasks: TaskDetail[];
  startDate: string;
  endDate: string;
  createdDate: string;
  createdBy: string;
  selectedCage: SelectedCage;
  selectedTech: SelectedTech;
}

const ConfirmTaskContainer: React.FC = () => {
  const navigate = useNavigate();
  
  // Dữ liệu mẫu, thực tế sẽ lấy từ context hoặc props
  const taskData: TaskData = {
    taskName: "",
    method: "",
    description: "",
    tasks: [
      { name: "", value: "", unit: "" }
    ],
    startDate: "",
    endDate: "",
    createdDate: new Date().toLocaleDateString(),
    createdBy: "Nguyễn Văn A",
    selectedCage: { id: 1, name: "Lồng A1 - Biến thể kép" },
    selectedTech: { id: 1, name: "Trần Văn Kang", info: "Kỹ thuật viên chính - 5 năm" }
  };

  const handleBack = (): void => {
    void navigate("/create-task/step-3");
  };

  const handleCreate = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Xử lý tạo task ở đây
    alert("Task đã được tạo!");
    void navigate("/tasks"); // Navigate to tasks list after creation
  };

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100 flex flex-col items-center py-10 px-4">
      <CreateTaskStepper currentStep={4} />
      <form 
        className="bg-white rounded-xl px-8 pt-8 pb-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] w-full max-w-[900px] mx-auto mt-8" 
        onSubmit={handleCreate}
      >
        <h2 className="text-2xl font-semibold mb-6">Thông tin nhiệm vụ mới</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <label className="font-medium mb-1.5">Tên nhiệm vụ *</label>
            <input 
              type="text" 
              value={taskData.taskName} 
              disabled 
              className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1.5">Chọn phương pháp *</label>
            <input 
              type="text" 
              value={taskData.method} 
              disabled 
              className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
            />
          </div>
        </div>
        
        <div className="flex flex-col mb-6">
          <label className="font-medium mb-1.5">Mô tả task</label>
          <textarea 
            value={taskData.description} 
            disabled 
            className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 min-h-[80px] resize-none"
          />
        </div>
        
        <div className="flex flex-col mb-6">
          <label className="font-medium mb-1.5">Chi tiết task</label>
          {taskData.tasks.map((task, idx) => (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2" key={idx}>
              <input 
                type="text" 
                value={task.name} 
                disabled 
                className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
              />
              <input 
                type="text" 
                value={task.value} 
                disabled 
                className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
              />
              <input 
                type="text" 
                value={task.unit} 
                disabled 
                className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
              />
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <label className="font-medium mb-1.5">Ngày bắt đầu *</label>
            <input 
              type="text" 
              value={taskData.startDate} 
              disabled 
              className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1.5">Ngày kết thúc *</label>
            <input 
              type="text" 
              value={taskData.endDate} 
              disabled 
              className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1.5">Ngày tạo</label>
            <input 
              type="text" 
              value={taskData.createdDate} 
              disabled 
              className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1.5">Tạo bởi</label>
            <input 
              type="text" 
              value={taskData.createdBy} 
              disabled 
              className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 w-full"
            />
          </div>
        </div>
        
        <div className="flex flex-col mb-6">
          <label className="font-medium mb-1.5">Lồng đã chọn</label>
          <div className="bg-green-50 border-[1.5px] border-green-700 rounded-lg py-2.5 px-[18px] font-semibold flex items-center mt-1 min-h-[40px]">
            {taskData.selectedCage.name}
          </div>
        </div>
        
        <div className="flex flex-col mb-8">
          <label className="font-medium mb-1.5">Kỹ thuật viên được giao</label>
          <div className="bg-green-50 border-[1.5px] border-green-700 rounded-lg py-2.5 px-[18px] font-semibold flex items-center mt-1 min-h-[40px]">
            <span className="w-8 h-8 rounded-full bg-[#4cafef] text-white flex items-center justify-center font-bold text-[1.05rem] mr-2.5 flex-shrink-0">
              TV
            </span>
            <span className="flex-1">{taskData.selectedTech.name}</span>
            <span className="text-[0.98em] text-green-700 ml-2.5 flex-shrink-0">
              {taskData.selectedTech.info}
            </span>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            className="min-w-[90px] px-5 py-2 rounded-lg border-none text-base font-semibold cursor-pointer transition-colors duration-200 bg-gray-300 text-gray-800 hover:bg-gray-400"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="submit"
            className="min-w-[90px] px-5 py-2 rounded-lg border-none text-base font-semibold cursor-pointer transition-colors duration-200 bg-green-700 text-white hover:bg-green-800"
          >
            Create
          </button>
        </div>
      </form>
    </main>
  );
};

export default ConfirmTaskContainer;