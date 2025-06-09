import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  id: string;
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

const EditTask: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // State để quản lý dữ liệu có thể chỉnh sửa
  const [taskData, setTaskData] = useState<TaskData>({
    id: id ?? "EXP001",
    taskName: "Nghiên cứu lai P. amabilis",
    method: "Nuôi cấy mô",
    description: "Thực hiện lai tạo giữa các dòng P. amabilis để tạo ra giống mới có độ bền cao. Nghiên cứu khả năng sinh trưởng và kháng bệnh.",
    tasks: [
      { name: "Chuẩn bị môi trường nuôi cấy", value: "100", unit: "ml" },
      { name: "Nuôi cấy mô", value: "50", unit: "mẫu" },
      { name: "Theo dõi sinh trưởng", value: "30", unit: "ngày" }
    ],
    startDate: "2025-05-15",
    endDate: "2025-06-20",
    createdDate: "10/05/2025",
    createdBy: "Nguyễn Văn A",
    selectedCage: { id: 1, name: "Lồng A1 - Biến thể kép" },
    selectedTech: { id: 1, name: "Trần Văn Kang", info: "Kỹ thuật viên chính - 5 năm" }
  });

  const handleCancel = (): void => {
    void navigate(`/tasks/${id}`);
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Xử lý cập nhật task ở đây
    alert("Task đã được cập nhật!");
    void navigate(`/tasks/${id}`);
  };

  const handleInputChange = (field: keyof TaskData, value: string): void => {
    setTaskData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTaskDetailChange = (index: number, field: keyof TaskDetail, value: string): void => {
    const updatedTasks = [...taskData.tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      [field]: value
    };
    setTaskData(prev => ({
      ...prev,
      tasks: updatedTasks
    }));
  };

  const addTaskDetail = (): void => {
    setTaskData(prev => ({
      ...prev,
      tasks: [...prev.tasks, { name: "", value: "", unit: "" }]
    }));
  };

  const removeTaskDetail = (index: number): void => {
    if (taskData.tasks.length > 1) {
      const updatedTasks = taskData.tasks.filter((_, i) => i !== index);
      setTaskData(prev => ({
        ...prev,
        tasks: updatedTasks
      }));
    }
  };

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100 flex flex-col items-center py-10 px-4">
      <form 
        className="bg-white rounded-xl px-8 pt-8 pb-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] w-full max-w-[900px] mx-auto" 
        onSubmit={handleUpdate}
      >
        <h2 className="text-2xl font-semibold mb-6">Chỉnh sửa nhiệm vụ: {taskData.id}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <label className="font-medium mb-1.5">Tên nhiệm vụ *</label>
            <input 
              type="text" 
              value={taskData.taskName}
              onChange={(e) => handleInputChange('taskName', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1.5">Chọn phương pháp *</label>
            <select 
              value={taskData.method}
              onChange={(e) => handleInputChange('method', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="Nuôi cấy mô">Nuôi cấy mô</option>
              <option value="Thử nghiệm">Thử nghiệm</option>
              <option value="Phân tích ADN">Phân tích ADN</option>
              <option value="Quan sát">Quan sát</option>
            </select>
          </div>
        </div>
        
        <div className="flex flex-col mb-6">
          <label className="font-medium mb-1.5">Mô tả task</label>
          <textarea 
            value={taskData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent min-h-[80px] resize-none"
          />
        </div>
        
        <div className="flex flex-col mb-6">
          <div className="flex justify-between items-center mb-1.5">
            <label className="font-medium">Chi tiết task</label>
            <button
              type="button"
              onClick={addTaskDetail}
              className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
            >
              + Thêm chi tiết
            </button>
          </div>
          {taskData.tasks.map((task, idx) => (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2 relative" key={idx}>
              <input 
                type="text" 
                value={task.name}
                onChange={(e) => handleTaskDetailChange(idx, 'name', e.target.value)}
                placeholder="Tên công việc"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input 
                type="text" 
                value={task.value}
                onChange={(e) => handleTaskDetailChange(idx, 'value', e.target.value)}
                placeholder="Giá trị"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={task.unit}
                  onChange={(e) => handleTaskDetailChange(idx, 'unit', e.target.value)}
                  placeholder="Đơn vị"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {taskData.tasks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTaskDetail(idx)}
                    className="px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <label className="font-medium mb-1.5">Ngày bắt đầu *</label>
            <input 
              type="date" 
              value={taskData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1.5">Ngày kết thúc *</label>
            <input 
              type="date" 
              value={taskData.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full"
              required
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
          <label className="font-medium mb-1.5">Lồng đã chọn (không thể thay đổi)</label>
          <div className="bg-green-50 border-[1.5px] border-green-700 rounded-lg py-2.5 px-[18px] font-semibold flex items-center mt-1 min-h-[40px]">
            {taskData.selectedCage.name}
          </div>
        </div>
        
        <div className="flex flex-col mb-8">
          <label className="font-medium mb-1.5">Kỹ thuật viên được giao (không thể thay đổi)</label>
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
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="min-w-[90px] px-5 py-2 rounded-lg border-none text-base font-semibold cursor-pointer transition-colors duration-200 bg-green-700 text-white hover:bg-green-800"
          >
            Update
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditTask;