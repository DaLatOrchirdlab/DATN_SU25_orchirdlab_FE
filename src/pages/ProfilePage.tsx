import React, { useState } from "react";

interface UserProfile {
  fullName: string;
  username: string;
  email: string;
  role: string;
  department: string;
  passwordHash: string; // Placeholder for password
  phoneNumber: string;
  joinDate: string;
}

const mockUserProfile: UserProfile = {
  fullName: "Nguyễn Văn A",
  username: "nguyen.van.a",
  email: "nguyen.van.a@dalatorchid.com",
  role: "Researcher",
  department: "Research & Development",
  passwordHash: "123456",
  phoneNumber: "+84 123 456 789",
  joinDate: "January 15, 2024",
};

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSave = () => {
    // In a real application, you'd send this data to a backend API
    console.log("Saving profile changes:", profile);
    setIsEditing(false);
    alert("Thông tin hồ sơ đã được cập nhật!");
  };

  const handleCancel = () => {
    setProfile(mockUserProfile); // Revert to original mock data
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
              NA
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium text-gray-900">Ảnh hồ sơ</h3>
              <p className="text-gray-600 text-sm">Tải lên ảnh đại diện mới</p>
              <button className="mt-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                Change Photo
              </button>
            </div>
            <div className="ml-auto flex flex-col items-end">
              <span className="text-sm text-gray-500">Vai trò</span>
              <span className="text-base font-semibold text-green-700 bg-green-50 px-4 py-1 rounded-full border border-green-200 mt-1">
                {profile.role}
              </span>
            </div>
          </div>

          {/* Profile Information Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tên đầy đủ
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={profile.fullName}
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
                value={profile.username}
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
                value={profile.email}
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
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phòng ban
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={profile.department}
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
                value={profile.phoneNumber}
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
                Ngày tham gia
              </label>
              <input
                type="text"
                id="joinDate"
                name="joinDate"
                value={profile.joinDate}
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
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Lưu thay đổi
                </button>
              </>
            ) : (
              <button
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
};

export default ProfilePage;
