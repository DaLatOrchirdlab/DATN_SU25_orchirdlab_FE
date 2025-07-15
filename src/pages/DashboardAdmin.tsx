import React, { useEffect, useState } from "react";
import { FaEdit, FaKey, FaTrash, FaSearch, FaPlus } from "react-icons/fa";
import type { User, UserApiResponse } from "../types/Auth";
import axiosInstance from "../api/axiosInstance";

const roleOptions: { value: string; label: string }[] = [
  { value: "", label: "Tất cả vai trò" },
  { value: "Admin", label: "Admin" },
  { value: "Researcher", label: "Researcher" },
  { value: "Technician", label: "Technician" },
];
// const statusOptions: { value: string; label: string }[] = [
//   { value: "", label: "Tất cả trạng thái" },
//   { value: "active", label: "Hoạt động" },
//   { value: "inactive", label: "Không hoạt động" },
// ];
function getRoleName(roleID: number) {
  switch (roleID) {
    case 1:
      return "Admin";
    case 2:
      return "Researcher";
    case 3:
      return "Technician";
    default:
      return "Khác";
  }
}

const PAGE_SIZE = 5;

export default function DashboardAdmin() {
  const [search, setSearch] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `/api/user?pageNumber=${page}&pageSize=${PAGE_SIZE}`
        );
        const data = res.data as UserApiResponse;
        setUsers(data.data || []);
        setTotal(Number(data.totalCount) || 0);
        setTotalPages(Number(data.pageCount) || 1);
      } catch {
        setUsers([]);
        setTotal(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    void fetchUsers();
  }, [page]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.userName ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (user.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (user.email ?? "").toLowerCase().includes(search.toLowerCase());
    const matchesRole = !roleFilter || getRoleName(user.roleID) === roleFilter;
    // Nếu có status thực tế thì sửa lại dòng dưới
    const matchesStatus = !statusFilter || statusFilter === "active";
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Stats
  const active = users.length; // Nếu có status thực tế thì filter theo status
  const inactive = 0; // Nếu có status thực tế thì filter theo status
  const adminCount = users.filter((u) => u.roleID === 1).length;
  const researcherCount = users.filter((u) => u.roleID === 2).length;
  const technicianCount = users.filter((u) => u.roleID === 3).length;

  // Action handlers
  const handleEdit = (userId: string) => {
    alert(`Chỉnh sửa người dùng ${userId}`);
  };
  const handleDelete = (userId: string, fullName: string) => {
    if (window.confirm(`Bạn có chắc muốn xóa người dùng ${fullName} không?`)) {
      alert(`Xóa người dùng ${userId} thành công!`);
      // Thực hiện xóa người dùng ở đây
    }
  };
  const handleReset = () => {
    alert(
      "Chức năng reset mật khảu sẽ được triển khai trong phiên bản tiếp theo!"
    );
  };
  const handleAddUser = () => {
    alert(
      "Chức năng thêm người dùng sẽ được triển khai trong phiên bản tiếp theo!"
    );
  };

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Quản lý Người dùng
          </h1>
          {/* <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg">A</div>
            <div>
              <div className="font-semibold text-gray-900">Admin</div>
              <div className="text-xs text-gray-500">Quản trị viên</div>
            </div>
          </div> */}
        </div>
        {/* Controls */}
        <div className="px-6 py-4 flex flex-wrap gap-4 items-center bg-white">
          <div className="relative flex-1 min-w-[200px]">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:border-transparent"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="border border-gray-300 rounded-full px-4 py-2 text-sm"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            {roleOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* <select
            className="border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select> */}
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            onClick={handleAddUser}
            type="button"
          >
            <FaPlus /> Thêm người dùng
          </button>
        </div>
      </div>
      {/* Stats */}
      <div className="px-6 py-6 grid grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-green-600 text-sm font-medium">
            TỔNG NGƯỜI DÙNG
          </div>
          <div className="text-2xl font-bold text-green-700">{total}</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-purple-600 text-sm font-medium">ADMINS</div>
          <div className="text-2xl font-bold text-purple-700">{adminCount}</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-blue-600 text-sm font-medium">RESEARCHERS</div>
          <div className="text-2xl font-bold text-blue-700">
            {researcherCount}
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-green-600 text-sm font-medium">TECHNICIANS</div>
          <div className="text-2xl font-bold text-green-700">
            {technicianCount}
          </div>
        </div>
        {/* <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-yellow-600 text-sm font-medium">
            KHÔNG HOẠT ĐỘNG
          </div>
          <div className="text-2xl font-bold text-yellow-700">{inactive}</div>
        </div> */}
      </div>
      {/* Table */}
      <div className="px-6 pb-6">
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                {/* <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên người dùng
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Họ tên
                </th> */}
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số điện thoại
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                {/* <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th> */}
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: PAGE_SIZE }).map((_, idx) => (
                  // eslint-disable-next-line react-x/no-array-index-key
                  <tr key={idx} className="border-t animate-pulse">
                    <td className="py-3 px-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                    <td className="px-4">
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </td>
                    <td className="px-4">
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </td>
                    <td className="px-4">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </td>
                    <td className="px-4">
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </td>
                  </tr>
                ))
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-gray-400">
                    Không có người dùng nào phù hợp.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.id}
                    </td>
                    {/* <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {user.userName ?? "Chưa có tên đăng nhập"}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {user.name ?? "Chưa có họ tên"}
                    </td> */}
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {user.phoneNumber ?? "Chưa có số điện thoại"}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold role-badge ${
                          user.roleID === 1
                            ? "bg-purple-100 text-purple-700"
                            : user.roleID === 2
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {getRoleName(user.roleID)}
                      </span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {user.create_at}
                    </td>
                    {/* <td className="px-3 py-2 whitespace-nowrap text-sm">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold status-badge ${
                          user.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {user.status === "active"
                          ? "Hoạt động"
                          : "Không hoạt động"}
                      </span>
                    </td> */}
                    <td className="px-3 py-2 whitespace-nowrap text-sm flex gap-1">
                      <button
                        className="action-btn btn-edit bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white px-2 py-1 rounded transition"
                        title="Chỉnh sửa"
                        // onClick={() => handleEdit(user.id)}
                        onClick={() => alert(`Chỉnh sửa người dùng ${user.id}`)}
                        type="button"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="action-btn btn-reset bg-yellow-100 text-yellow-700 hover:bg-yellow-600 hover:text-white px-2 py-1 rounded transition"
                        title="Reset mật khẩu"
                        // onClick={() => handleReset(user.id, user.name)}
                        onClick={() => alert(`Reset mật khẩu cho ${user.name}`)}
                        type="button"
                      >
                        <FaKey />
                      </button>
                      <button
                        className="action-btn btn-delete bg-red-100 text-red-700 hover:bg-red-600 hover:text-white px-2 py-1 rounded transition"
                        title="Xóa"
                        // onClick={() => handleDelete(user.id, user.name)}
                        onClick={() => alert(`Xóa người dùng ${user.id}`)}
                        type="button"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-end mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              type="button"
              key={i + 1}
              className={`w-8 h-8 cursor-pointer rounded ${
                page === i + 1
                  ? "bg-green-800 text-white"
                  : "border border-green-800 text-green-800 hover:bg-green-800 hover:text-white"
              } transition`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
