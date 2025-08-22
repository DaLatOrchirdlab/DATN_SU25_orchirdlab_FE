import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axiosInstance from "../api/axiosInstance";

interface LabRoomItem {
  id: string;
  name: string;
  description: string;
  status: boolean;
}

interface ApiListResponse<T> {
  value?: {
    totalCount?: number;
    pageCount?: number;
    pageSize?: number;
    pageNumber?: number;
    data?: T[];
  };
}

function isApiListResponse<T>(obj: unknown): obj is ApiListResponse<T> {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "value" in obj &&
    typeof (obj as { value: unknown }).value === "object"
  );
}

const AdminLabRoomList: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [items, setItems] = useState<LabRoomItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        const res = await axiosInstance.get("/api/labroom?pageNumber=1&pageSize=100");
        if (isApiListResponse<LabRoomItem>(res.data)) {
          const data = Array.isArray(res.data.value?.data)
            ? (res.data.value?.data as LabRoomItem[])
            : [];
          setItems(data);
        } else {
          setError("Dữ liệu không đúng định dạng");
        }
      } catch (err) {
        console.error("Error fetching phòng thực nghiệm:", err);
        setError("Không thể tải danh sách phòng thí nghiệm");
        enqueueSnackbar("Lỗi khi tải dữ liệu", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [enqueueSnackbar]);

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-800">Danh sách phòng thực nghiệm</h1>
          <button
            onClick={() => void navigate("/admin/labroom/new")}
            className="px-4 py-2 rounded bg-green-700 text-white hover:bg-green-800"
            type="button"
          >
            Tạo phòng thực nghiệm
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Đang tải danh sách...</div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-green-50 text-green-800 font-semibold">
                <th className="py-3 px-4 text-left">Tên</th>
                <th className="px-4 text-left">Mô tả</th>
                <th className="px-4 text-left">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-500">
                    Không có phòng thực nghiệm nào
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item.id}
                    className={`border-t transition cursor-pointer ${
                      item.status ? "hover:bg-green-50" : "bg-gray-100"
                    }`}
                    onClick={() => {
                      if (!item.status) {
                        enqueueSnackbar(
                          "Phòng thực nghiệm này đã ngừng hoạt động nên không thể xem chi tiết",
                          { variant: "warning" }
                        );
                        return;
                      }
                      navigate(`/admin/labroom/${item.id}`);
                    }}
                  >
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="px-4">{item.description}</td>
                    <td className="px-4">
                      {item.status ? (
                        <span className="text-green-600 font-semibold">Đang hoạt động</span>
                      ) : (
                        <span className="text-red-500 font-semibold">Ngừng hoạt động</span>
                      )}
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

export default AdminLabRoomList;
