import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

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

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Thông tin hồ sơ đã được cập nhật!");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Cài đặt hồ sơ
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Quản lý thông tin cá nhân và cài đặt tài khoản của bạn
          </p>

          {/* Profile Picture and Role */}
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-2xl font-bold">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="User Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span>{user?.name?.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium text-gray-900">Ảnh hồ sơ</h3>
              <p className="text-gray-600 text-sm">Tải lên ảnh đại diện mới</p>
              <button
                type="button"
                className="mt-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
              >
                Change Photo
              </button>
            </div>
            <div className="ml-auto flex flex-col items-end">
              <span className="text-sm text-gray-500">Vai trò</span>
              <span className="text-base font-semibold text-green-700 bg-green-50 px-4 py-1 rounded-full border border-green-200 mt-1">
                {getRoleName(user?.roleID ?? 0)}
              </span>
            </div>
          </div>

          {/* Profile Information Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tên đầy đủ
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={user?.name ?? ""}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border ${
                  isEditing
                    ? "border-gray-300 focus:ring-green-500 focus:border-green-500"
                    : "border-transparent bg-gray-100"
                } rounded-lg px-3 py-2 transition-colors`}
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tên người dùng
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={user?.userName ?? ""}
                readOnly
                className="w-full border border-transparent bg-gray-100 rounded-lg px-3 py-2 text-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user?.email ?? ""}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border ${
                  isEditing
                    ? "border-gray-300 focus:ring-green-500 focus:border-green-500"
                    : "border-transparent bg-gray-100"
                } rounded-lg px-3 py-2 transition-colors`}
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Số điện thoại
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={user?.phoneNumber ?? ""}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border ${
                  isEditing
                    ? "border-gray-300 focus:ring-green-500 focus:border-green-500"
                    : "border-transparent bg-gray-100"
                } rounded-lg px-3 py-2 transition-colors`}
              />
            </div>
            <div>
              <label
                htmlFor="joinDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Ngày được tạo
              </label>
              <input
                type="text"
                id="joinDate"
                name="joinDate"
                value={user?.create_at ?? ""}
                readOnly
                className="w-full border border-transparent bg-gray-100 rounded-lg px-3 py-2 text-gray-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Lưu thay đổi
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Chỉnh sửa hồ sơ
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
