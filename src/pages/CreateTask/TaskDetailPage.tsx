import React from "react";
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
  status: string;
  progress: number;
}

const TaskDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // Dữ liệu mẫu - thực tế sẽ fetch từ API dựa trên id
  const taskData: TaskData = {
    id: id ?? "EXP001",
    taskName: "Nghiên cứu lai P. amabilis",
    method: "Nuôi cấy mô",
    description: "Thực hiện lai tạo giữa các dòng P. amabilis để tạo ra giống mới có độ bền cao. Nghiên cứu khả năng sinh trưởng và kháng bệnh.",
    tasks: [
      { name: "Chuẩn bị môi trường nuôi cấy", value: "100", unit: "ml" },
      { name: "Nuôi cấy mô", value: "50", unit: "mẫu" },
      { name: "Theo dõi sinh trưởng", value: "30", unit: "ngày" }
    ],
    startDate: "15/05/2025",
    endDate: "20/06/2025",
    createdDate: "10/05/2025",
    createdBy: "Nguyễn Văn A",
    selectedCage: { id: 1, name: "Lồng A1 - Biến thể kép" },
    selectedTech: { id: 1, name: "Trần Văn Kang", info: "Kỹ thuật viên chính - 5 năm" },
    status: "Đang thực hiện",
    progress: 80
  };

  const handleBack = (): void => {
    void navigate("/tasks");
  };

  const handleEdit = (): void => {
    void navigate(`/tasks/${id}/edit`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đang thực hiện': return 'bg-green-100 text-green-800';
      case 'Chưa bắt đầu': return 'bg-orange-100 text-orange-800';
      case 'Hoàn thành': return 'bg-green-100 text-green-800';
      case 'Tạm dừng': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="bg-white rounded-xl px-8 pt-8 pb-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] w-full max-w-[900px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Chi tiết Task: {taskData.id}</h2>
          <div className="flex gap-3">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Chỉnh sửa
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Cập nhật trạng thái
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Xóa task
            </button>
          </div>
        </div>

        {/* Status and Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <label className="font-medium mb-1.5">Trạng thái</label>
            <span className={`px-3 py-2 rounded-md text-sm font-medium w-fit ${getStatusColor(taskData.status)}`}>
              {taskData.status}
            </span>
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1.5">Tiến độ</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getProgressColor(taskData.progress)}`}
                  style={{ width: `${taskData.progress}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 min-w-[40px]">{taskData.progress}%</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <label className="font-medium mb-1.5">Tên nhiệm vụ</label>
            <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
              {taskData.taskName}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1.5">Phương pháp</label>
            <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
              {taskData.method}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col mb-6">
          <label className="font-medium mb-1.5">Mô tả task</label>
          <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 min-h-[80px]">
            {taskData.description}
          </div>
        </div>
        
        <div className="flex flex-col mb-6">
          <label className="font-medium mb-1.5">Chi tiết task</label>
          {taskData.tasks.map((task, idx) => (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2" key={idx}>
              <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                {task.name}
              </div>
              <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                {task.value}
              </div>
              <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                {task.unit}
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <label className="font-medium mb-1.5">Ngày bắt đầu</label>
            <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
              {taskData.startDate}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1.5">Ngày kết thúc</label>
            <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
              {taskData.endDate}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1.5">Ngày tạo</label>
            <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
              {taskData.createdDate}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1.5">Tạo bởi</label>
            <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
              {taskData.createdBy}
            </div>
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
        
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            className="min-w-[90px] px-5 py-2 rounded-lg border-none text-base font-semibold cursor-pointer transition-colors duration-200 bg-gray-300 text-gray-800 hover:bg-gray-400"
            onClick={handleBack}
          >
            Quay lại
          </button>
        </div>
      </div>
    </main>
  );
};

export default TaskDetailPage;