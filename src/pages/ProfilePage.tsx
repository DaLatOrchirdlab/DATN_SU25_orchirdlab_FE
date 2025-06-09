import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
  fullName: 'Nguyễn Văn A',
  username: 'nguyen.van.a',
  email: 'nguyen.van.a@dalatorchid.com',
  role: 'Researcher',
  department: 'Research & Development',
  passwordHash: '123456',
  phoneNumber: '+84 123 456 789',
  joinDate: 'January 15, 2024',
};

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({ ...prevProfile, [name]: value }));
  };

  const handleSave = () => {
    // In a real application, you'd send this data to a backend API
    console.log('Saving profile changes:', profile);
    setIsEditing(false);
    alert('Thông tin hồ sơ đã được cập nhật!');
  };

  const handleCancel = () => {
    setProfile(mockUserProfile); // Revert to original mock data
    setIsEditing(false);
  };

  return (
    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile Settings</h2>
          <p className="text-gray-600 text-sm mb-6">Manage your personal information and account settings</p>

          {/* Profile Picture */}
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-2xl font-bold">NA</div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Profile Picture</h3>
              <p className="text-gray-600 text-sm">Upload a new profile picture</p>
              <button className="mt-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">Change Photo</button>
            </div>
          </div>

          {/* Profile Information Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border ${isEditing ? 'border-gray-300 focus:ring-green-500 focus:border-green-500' : 'border-transparent bg-gray-100'} rounded-lg px-3 py-2 transition-colors`}
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={profile.username}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border ${isEditing ? 'border-gray-300 focus:ring-green-500 focus:border-green-500' : 'border-transparent bg-gray-100'} rounded-lg px-3 py-2 transition-colors`}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border ${isEditing ? 'border-gray-300 focus:ring-green-500 focus:border-green-500' : 'border-transparent bg-gray-100'} rounded-lg px-3 py-2 transition-colors`}
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              {isEditing ? (
                <select
                  id="role"
                  name="role"
                  value={profile.role}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white"
                >
                  <option value="Researcher">Researcher</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                </select>
              ) : (
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={profile.role}
                  readOnly
                  className="w-full border border-transparent bg-gray-100 rounded-lg px-3 py-2"
                />
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative flex items-center w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="passwordHash"
                  value={profile.passwordHash}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full border ${isEditing ? 'border-gray-300 focus:ring-green-500 focus:border-green-500' : 'border-transparent bg-gray-100'} rounded-lg px-3 py-2 pr-10 transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                value={profile.department}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border ${isEditing ? 'border-gray-300 focus:ring-green-500 focus:border-green-500' : 'border-transparent bg-gray-100'} rounded-lg px-3 py-2 transition-colors`}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border ${isEditing ? 'border-gray-300 focus:ring-green-500 focus:border-green-500' : 'border-transparent bg-gray-100'} rounded-lg px-3 py-2 transition-colors`}
              />
            </div>
            <div>
              <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
              <input
                type="text"
                id="joinDate"
                name="joinDate"
                value={profile.joinDate}
                readOnly
                className="w-full border border-transparent bg-gray-100 rounded-lg px-3 py-2"
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
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Security Settings Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Security Settings</h2>
          <p className="text-gray-600 text-sm">Two-factor authentication, login history, and security preferences</p>
          {/* Add more security settings content here if needed */}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage; 