import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Task {
  id: string;
  name: string;
  experiment: string;
  method: string;
  deadline: string;
  status: "Đang thực hiện" | "Chưa bắt đầu" | "Hoàn thành" | "Tạm dừng";
  progress: number;
  actions: string;
}

export default function Tasks() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [methodFilter, setMethodFilter] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("Tất cả");
  const tasksPerPage = 4; // Số lượng task mỗi trang

  // Sample data
  const tasks: Task[] = [
    {
      id: "EXP001",
      name: "Nghiên cứu lai P. amabilis",
      experiment: "EXP001",
      method: "Nuôi cấy mô",
      deadline: "20/06/2025",
      status: "Đang thực hiện",
      progress: 80,
      actions: "🔧📊",
    },
    {
      id: "EXP002",
      name: "Phân tích mẫu lai F1",
      experiment: "EXP002",
      method: "Thử nghiệm",
      deadline: "15/07/2025",
      status: "Chưa bắt đầu",
      progress: 20,
      actions: "🔧📊",
    },
    {
      id: "EXP003",
      name: "Báo cáo kết quả lai tạo",
      experiment: "EXP003",
      method: "Phân tích ADN",
      deadline: "28/05/2025",
      status: "Hoàn thành",
      progress: 100,
      actions: "🔧📊",
    },
    {
      id: "EXP004",
      name: "Theo dõi phát triển mầu",
      experiment: "EXP004",
      method: "Quan sát",
      deadline: "10/08/2025",
      status: "Tạm dừng",
      progress: 30,
      actions: "🔧📊",
    },
  ];

  // Lọc dữ liệu theo filter và search
  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      statusFilter === "Tất cả" || task.status === statusFilter;
    const methodMatch =
      methodFilter === "Tất cả" || task.method === methodFilter;
    const nameMatch =
      searchTerm === "" ||
      task.name.toLowerCase().includes(searchTerm.toLowerCase());

    let timeMatch = true;
    if (timeFilter !== "Tất cả") {
      const [day, month, year] = task.deadline.split("/").map(Number);
      const taskDeadline = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (timeFilter === "Hôm nay") {
        timeMatch = taskDeadline.toDateString() === today.toDateString();
      } else if (timeFilter === "7 ngày qua") {
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        timeMatch = taskDeadline >= sevenDaysAgo && taskDeadline <= today;
      } else if (timeFilter === "30 ngày qua") {
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        timeMatch = taskDeadline >= thirtyDaysAgo && taskDeadline <= today;
      }
    }

    return statusMatch && methodMatch && nameMatch && timeMatch;
  });

  // Logic phân trang
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleCreateTask = () => {
    void navigate("/create-task");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đang thực hiện":
        return "bg-green-100 text-green-800";
      case "Chưa bắt đầu":
        return "bg-orange-100 text-orange-800";
      case "Hoàn thành":
        return "bg-green-100 text-green-800";
      case "Tạm dừng":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <main className="ml-64 mt-16 min-h-screen bg-gray-100 p-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Quản lý nghiên cứu lai tạo
            </h1>
            <p className="text-gray-600 mt-1">
              Theo dõi và quản lý các nhiệm vụ nghiên cứu lai tạo và kết quả thí
              nghiệm
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCreateTask}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              + Tạo nhiệm vụ nghiên cứu
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
              Xuất báo cáo
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-4 gap-6">
          <div className="rounded-lg border border-gray-200 bg-white px-6 py-4 flex flex-col justify-between min-w-[180px]">
            <span className="text-sm text-gray-600 mb-1">
              Nhiệm vụ đang thực hiện
            </span>
            <span className="text-2xl font-semibold text-green-700">12</span>
            <span className="text-xs text-green-600 mt-1">+2 nhiệm vụ mới</span>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white px-6 py-4 flex flex-col justify-between min-w-[180px]">
            <span className="text-sm text-gray-600 mb-1">
              Nhật ký thí nghiệm
            </span>
            <span className="text-2xl font-semibold text-blue-700">8</span>
            <span className="text-xs text-blue-600 mt-1">Đang theo dõi</span>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white px-6 py-4 flex flex-col justify-between min-w-[180px]">
            <span className="text-sm text-gray-600 mb-1">Mẫu được tạo</span>
            <span className="text-2xl font-semibold text-green-700">24</span>
            <span className="text-xs text-green-600 mt-1">Từ 8 thí nghiệm</span>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white px-6 py-4 flex flex-col justify-between min-w-[180px]">
            <span className="text-sm text-gray-600 mb-1">Báo cáo</span>
            <span className="text-2xl font-semibold text-purple-700">15</span>
            <span className="text-xs text-gray-500 mt-1">Hoàn thành</span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">
                Trạng thái nhiệm vụ:
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              >
                <option>Tất cả</option>
                <option>Đang thực hiện</option>
                <option>Chưa bắt đầu</option>
                <option>Hoàn thành</option>
                <option>Tạm dừng</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Thời gian:</span>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              >
                <option>Tất cả</option>
                <option>Hôm nay</option>
                <option>7 ngày qua</option>
                <option>30 ngày qua</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Phương pháp:</span>
              <select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              >
                <option>Tất cả</option>
                <option>Nuôi cấy mô</option>
                <option>Thử nghiệm</option>
                <option>Phân tích ADN</option>
                <option>Quan sát</option>
              </select>
            </div>

            <div className="flex-1 ml-auto">
              <input
                type="text"
                placeholder="Tìm kiếm nhiệm vụ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">
                  Tên nhiệm vụ
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Thí nghiệm
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Phương pháp
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Deadline
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Trạng thái
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Tiến độ
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((task) => (
                <tr key={task.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-gray-900">{task.name}</td>
                  <td className="p-4 text-gray-600">{task.experiment}</td>
                  <td className="p-4 text-gray-600">{task.method}</td>
                  <td className="p-4 text-gray-600">{task.deadline}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(
                            task.progress
                          )}`}
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">
                        {task.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => void navigate(`/tasks/${task.id}`)}
                        className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => void navigate(`/tasks/${task.id}/edit`)}
                        className="text-green-600 hover:bg-green-50 p-1 rounded"
                      >
                        ✏️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>
            Hiện thị {indexOfFirstTask + 1} -{" "}
            {Math.min(indexOfLastTask, filteredTasks.length)} trong tổng số{" "}
            {filteredTasks.length} task nghiên cứu
          </span>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === number
                      ? "bg-green-700 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {number}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
