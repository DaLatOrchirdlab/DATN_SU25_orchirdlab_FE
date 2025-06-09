import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import CreateTaskStepper from "../Step/CreateTaskStepper";

interface Task {
  name: string;
  value: string;
  unit: string;
  material: string;
}

const CreateTaskContainer: React.FC = () => {
  // State cho các trường form
  const [taskName, setTaskName] = useState<string>("");
  const [method, setMethod] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([
    { name: "", value: "", unit: "", material: "" }
  ]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const navigate = useNavigate();

  // Thêm task con
  const handleAddTask = (): void => {
    setTasks([...tasks, { name: "", value: "", unit: "", material: "" }]);
  };

  // Xóa task con
  const handleRemoveTask = (idx: number): void => {
    setTasks(tasks.filter((_, i) => i !== idx));
  };

  // Cập nhật task con
  const handleTaskChange = (idx: number, field: keyof Task, value: string): void => {
    const newTasks = [...tasks];
    newTasks[idx][field] = value;
    setTasks(newTasks);
  };

  // Submit (chuyển sang bước 2)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Có thể validate hoặc lưu dữ liệu vào context/store nếu cần
    void navigate("/create-task/step2");
  };

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100 flex flex-col items-center py-10">
      <CreateTaskStepper currentStep={1} />
      {/* Form */}
      <form className="bg-white rounded-2xl px-8 pt-8 pb-6 shadow-lg max-w-4xl w-full mx-auto" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-6">Thông tin nhiệm vụ mới</h2>
        
        <div className="flex gap-6">
          <div className="flex flex-col mb-4 flex-1">
            <label className="font-medium mb-1.5">Tên nhiệm vụ *</label>
            <input
              type="text"
              value={taskName}
              onChange={e => setTaskName(e.target.value)}
              required
              placeholder="Nhập tên nhiệm vụ..."
              className="py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col mb-4 flex-1">
            <label className="font-medium mb-1.5">Chọn phương pháp *</label>
            <input
              type="text"
              value={method}
              onChange={e => setMethod(e.target.value)}
              required
              placeholder="Chọn method..."
              className="py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex flex-col mb-4 flex-1">
          <label className="font-medium mb-1.5">Mô tả task</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Mô tả ngắn gọn về nhiệm vụ..."
            className="py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50 min-h-[60px] resize-y focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-col mb-4 flex-1">
          <label className="font-medium mb-1.5">Chi tiết task</label>
          <button 
            type="button" 
            className="my-2 bg-green-700 text-white border-none py-1.5 px-3.5 rounded-md cursor-pointer text-sm hover:bg-green-800 transition-colors w-fit"
            onClick={handleAddTask}
          >
            + Thêm bước task
          </button>
          {tasks.map((task, idx) => (
            <div className="flex gap-2 mb-2 items-center" key={idx}>
              <input
                type="text"
                placeholder="Tên"
                value={task.name}
                onChange={e => handleTaskChange(idx, "name", e.target.value)}
                className="flex-1 py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Nhập giá trị..."
                value={task.value}
                onChange={e => handleTaskChange(idx, "value", e.target.value)}
                className="flex-1 py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Đơn vị"
                value={task.unit}
                onChange={e => handleTaskChange(idx, "unit", e.target.value)}
                className="flex-1 py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button 
                type="button" 
                className="bg-red-500 text-white border-none rounded-full w-7 h-7 cursor-pointer text-base flex items-center justify-center hover:bg-red-600 transition-colors"
                onClick={() => handleRemoveTask(idx)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-6">
          <div className="flex flex-col mb-4 flex-1">
            <label className="font-medium mb-1.5">Ngày bắt đầu *</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              required
              className="py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent min-w-0"
            />
          </div>
          <div className="flex flex-col mb-4 flex-1">
            <label className="font-medium mb-1.5">Ngày kết thúc *</label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              required
              className="py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent min-w-0"
            />
          </div>
          <div className="flex flex-col mb-4 flex-1">
            <label className="font-medium mb-1.5">Ngày tạo</label>
            <input 
              type="text" 
              value={new Date().toLocaleDateString()} 
              disabled 
              className="py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-200 text-gray-500 cursor-not-allowed min-w-0"
            />
          </div>
          <div className="flex flex-col mb-4 flex-1">
            <label className="font-medium mb-1.5">Tạo bởi</label>
            <input 
              type="text" 
              value="Nguyễn Văn A" 
              disabled 
              className="py-2 px-3 border border-gray-300 rounded-md text-base bg-gray-200 text-gray-500 cursor-not-allowed min-w-0"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button 
            type="submit" 
            className="bg-green-700 text-white border-none py-2.5 px-8 rounded-lg text-base cursor-pointer hover:bg-green-800 transition-colors"
          >
            Next
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateTaskContainer;