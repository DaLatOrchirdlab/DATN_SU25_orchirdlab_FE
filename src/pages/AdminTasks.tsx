import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useSnackbar } from 'notistack';

interface Task {
  id: string;
  name: string;
  researcher: string;
  end_date: string;
  status: StatusType;
}

type StatusType =
  | "Assigned"
  | "Taken"
  | "InProcess"
  | "DoneInTime"
  | "DoneInLate"
  | "Cancel";

interface ApiTaskResponse {
  value?: {
    data?: Task[];
    totalCount?: number;
  };
}

function isApiTaskResponse(obj: unknown): obj is ApiTaskResponse {
  return (
    typeof obj === 'object' && obj !== null &&
    'value' in obj &&
    typeof (obj as { value: unknown }).value === 'object'
  );
}

const STATUS_LABELS: Record<StatusType, string> = {
  Assigned: "Đã giao",
  Taken: "Đã nhận",
  InProcess: "Đang thực hiện",
  DoneInTime: "Hoàn thành đúng hạn",
  DoneInLate: "Hoàn thành trễ hạn",
  Cancel: "Bị hủy",
};

const STATUS_COLORS: Record<StatusType, string> = {
  Assigned: "bg-blue-100 text-blue-800",
  Taken: "bg-purple-100 text-purple-800",
  InProcess: "bg-yellow-100 text-yellow-800",
  DoneInTime: "bg-green-100 text-green-800",
  DoneInLate: "bg-orange-100 text-orange-800",
  Cancel: "bg-red-100 text-red-800",
};

const AdminTasks: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axiosInstance.get('/api/tasks?pageNo=1&pageSize=100');
        
        if (isApiTaskResponse(response.data)) {
          const data = Array.isArray(response.data.value?.data) ? response.data.value.data : [];
          setTasks(data);
        } else {
          setError('Dữ liệu không đúng định dạng');
        }
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Không thể tải danh sách nhiệm vụ');
        enqueueSnackbar('Lỗi khi tải dữ liệu', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [enqueueSnackbar]);

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-800">Danh sách nhiệm vụ</h1>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Đang tải danh sách nhiệm vụ...</div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-green-50 text-green-800 font-semibold">
                <th className="py-3 px-4 text-left">Tên nhiệm vụ</th>
                <th className="px-4 text-left">Người tạo</th>
                <th className="px-4 text-left">Thời hạn</th>
                <th className="px-4 text-left">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    Không có nhiệm vụ nào
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-t hover:bg-green-50 transition cursor-pointer"
                    onClick={() => void navigate(`/admin/tasks/${task.id}`)}
                  >
                    <td className="py-3 px-4">{task.name}</td>
                    <td className="px-4">{task.researcher}</td>
                    <td className="px-4">
                      {task.end_date ? new Date(task.end_date).toLocaleDateString() : ''}
                    </td>
                    <td className="px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[task.status]}`}>
                        {STATUS_LABELS[task.status]}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
};

export default AdminTasks;
