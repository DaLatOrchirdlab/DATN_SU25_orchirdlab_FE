import React, { useState } from 'react';
import { FaEdit, FaKey, FaTrash, FaSearch, FaPlus } from 'react-icons/fa';

interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'Admin' | 'Researcher' | 'Technician';
  createdAt: string;
  status: 'active' | 'inactive';
}

const initialUsers: User[] = [
  {
    id: 'U001',
    username: 'admin',
    fullName: 'Nguyễn Văn Admin',
    email: 'admin@orchidlab.com',
    phone: '0123456789',
    role: 'Admin',
    createdAt: '15/01/2024',
    status: 'active',
  },
  {
    id: 'U002',
    username: 'researcher01',
    fullName: 'Trần Thị Nghiên Cứu',
    email: 'researcher@orchidlab.com',
    phone: '0987654321',
    role: 'Researcher',
    createdAt: '20/01/2024',
    status: 'active',
  },
  {
    id: 'U003',
    username: 'tech01',
    fullName: 'Lê Văn Kỹ Thuật',
    email: 'tech01@orchidlab.com',
    phone: '0456789123',
    role: 'Technician',
    createdAt: '25/01/2024',
    status: 'active',
  },
  {
    id: 'U004',
    username: 'researcher02',
    fullName: 'Phạm Minh Khoa',
    email: 'khoa.pm@orchidlab.com',
    phone: '0789123456',
    role: 'Researcher',
    createdAt: '01/02/2024',
    status: 'inactive',
  },
  {
    id: 'U005',
    username: 'tech02',
    fullName: 'Hoàng Thị Lab',
    email: 'lab.ht@orchidlab.com',
    phone: '0321654987',
    role: 'Technician',
    createdAt: '10/02/2024',
    status: 'active',
  },
];

const roleOptions: { value: string; label: string }[] = [
  { value: '', label: 'Tất cả vai trò' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Researcher', label: 'Researcher' },
  { value: 'Technician', label: 'Technician' },
];
const statusOptions: { value: string; label: string }[] = [
  { value: '', label: 'Tất cả trạng thái' },
  { value: 'active', label: 'Hoạt động' },
  { value: 'inactive', label: 'Không hoạt động' },
];

const DashboardAdmin: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [users, setUsers] = useState<User[]>(initialUsers);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesStatus = !statusFilter || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Stats
  const total: number = users.length;
  const active: number = users.filter((u) => u.status === 'active').length;
  const inactive: number = users.filter((u) => u.status === 'inactive').length;
  const adminCount: number = users.filter((u) => u.role === 'Admin').length;

  // Action handlers
  const handleEdit = (userId: string) => {
    alert(`Chỉnh sửa người dùng ${userId}`);
  };
  const handleDelete = (userId: string, fullName: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa người dùng "${fullName}" (${userId})?`)) {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      alert('Đã xóa người dùng thành công!');
    }
  };
  const handleReset = (userId: string, fullName: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn reset mật khẩu cho "${fullName}" (${userId})?`)) {
      alert('Đã reset mật khẩu thành công! Mật khẩu mới: 123456');
    }
  };
  const handleAddUser = () => {
    alert('Chức năng thêm người dùng sẽ được triển khai trong phiên bản tiếp theo!');
  };

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Người dùng</h1>
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            {roleOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <select
            className="border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
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
          <div className="text-green-600 text-sm font-medium">TỔNG NGƯỜI DÙNG</div>
          <div className="text-2xl font-bold text-green-700">{total}</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-blue-600 text-sm font-medium">ĐANG HOẠT ĐỘNG</div>
          <div className="text-2xl font-bold text-blue-700">{active}</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-yellow-600 text-sm font-medium">KHÔNG HOẠT ĐỘNG</div>
          <div className="text-2xl font-bold text-yellow-700">{inactive}</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-purple-600 text-sm font-medium">QUẢN TRỊ VIÊN</div>
          <div className="text-2xl font-bold text-purple-700">{adminCount}</div>
        </div>
      </div>
      {/* Table */}
      <div className="px-6 pb-6">
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên người dùng</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ tên</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số điện thoại</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vai trò</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-gray-400">Không có người dùng nào phù hợp.</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{user.username}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{user.fullName}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold role-badge ${
                        user.role === 'Admin'
                          ? 'bg-purple-100 text-purple-700'
                          : user.role === 'Researcher'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{user.createdAt}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold status-badge ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                      </span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm flex gap-1">
                      <button
                        className="action-btn btn-edit bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white px-2 py-1 rounded transition"
                        title="Chỉnh sửa"
                        onClick={() => handleEdit(user.id)}
                        type="button"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="action-btn btn-reset bg-yellow-100 text-yellow-700 hover:bg-yellow-600 hover:text-white px-2 py-1 rounded transition"
                        title="Reset mật khẩu"
                        onClick={() => handleReset(user.id, user.fullName)}
                        type="button"
                      >
                        <FaKey />
                      </button>
                      <button
                        className="action-btn btn-delete bg-red-100 text-red-700 hover:bg-red-600 hover:text-white px-2 py-1 rounded transition"
                        title="Xóa"
                        onClick={() => handleDelete(user.id, user.fullName)}
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
      </div>
    </main>
  );
};

export default DashboardAdmin; 