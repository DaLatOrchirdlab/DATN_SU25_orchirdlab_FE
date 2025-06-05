import React, { useState } from "react";
import SidebarComponent from "../../../../Navigation/sidebarComponent";
import CreateTaskStepper from "../../CreateTaskStep/createTaskStepper";
import TopbarComponent from "../../../../Navigation/topbarComponent";
import "./createTaskContainer.css";

const CreateTaskContainer = () => {
  // State cho các trường form
  const [taskName, setTaskName] = useState("");
  const [method, setMethod] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([
    { name: "", value: "", unit: "", material: "" }
  ]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [note, setNote] = useState("");

  // Thêm task con
  const handleAddTask = () => {
    setTasks([...tasks, { name: "", value: "", unit: "", material: "" }]);
  };

  // Xóa task con
  const handleRemoveTask = (idx) => {
    setTasks(tasks.filter((_, i) => i !== idx));
  };

  // Cập nhật task con
  const handleTaskChange = (idx, field, value) => {
    const newTasks = [...tasks];
    newTasks[idx][field] = value;
    setTasks(newTasks);
  };

  // Submit (chưa xử lý API)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý submit ở đây
    alert("Đã gửi!");
  };

  return (
    <div>
      <TopbarComponent />
   
    <div className="create-task-layout">
      <div style={{ paddingTop: 56 }}>
      <SidebarComponent />
      </div>
      
      <main className="create-task-main">
      <CreateTaskStepper currentStep={1} />

        {/* Form */}
        <form className="create-task-form" onSubmit={handleSubmit}>
          <h2>Thông tin nhiệm vụ mới</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Tên nhiệm vụ *</label>
              <input
                type="text"
                value={taskName}
                onChange={e => setTaskName(e.target.value)}
                required
                placeholder="Nhập tên nhiệm vụ..."
              />
            </div>
            <div className="form-group">
              <label>Chọn phương pháp *</label>
              <input
                type="text"
                value={method}
                onChange={e => setMethod(e.target.value)}
                required
                placeholder="Chọn method..."
              />
            </div>
          </div>
          <div className="form-group">
            <label>Mô tả task</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Mô tả ngắn gọn về nhiệm vụ..."
            />
          </div>

          <div className="form-group">
            <label>Chi tiết task</label>
            <button type="button" className="add-task-btn" onClick={handleAddTask}>
              + Thêm bước task
            </button>
            {tasks.map((task, idx) => (
              <div className="task-detail-row" key={idx}>
                <input
                  type="text"
                  placeholder="Tên"
                  value={task.name}
                  onChange={e => handleTaskChange(idx, "name", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Nhập giá trị..."
                  value={task.value}
                  onChange={e => handleTaskChange(idx, "value", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Đơn vị"
                  value={task.unit}
                  onChange={e => handleTaskChange(idx, "unit", e.target.value)}
                />
                {/* <input
                  type="text"
                  placeholder="Chọn nguyên liệu..."
                  value={task.material}
                  onChange={e => handleTaskChange(idx, "material", e.target.value)}
                /> */}
                <button type="button" className="remove-task-btn" onClick={() => handleRemoveTask(idx)}>
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Ngày bắt đầu *</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Ngày kết thúc *</label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Ngày tạo</label>
              <input type="text" value={new Date().toLocaleDateString()} disabled />
            </div>
            <div className="form-group">
              <label>Tạo bởi</label>
              <input type="text" value="Nguyễn Văn A" disabled />
            </div>
          </div>

          {/* <div className="form-group">
            <label>Chi tiết cách thực hiện</label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Ghi chú về các bước thực hiện, thiết bị, lưu ý quan trọng..."
            />
          </div> */}

          <div className="form-actions">
            <button type="submit" className="next-btn">Next</button>
          </div>
        </form>
      </main>
    </div>
 </div>
  );
};

export default CreateTaskContainer;