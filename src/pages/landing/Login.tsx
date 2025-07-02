import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  fullName: string;
  username: string;
  email: string;
  role: 'Admin' | 'Researcher' | 'Technician';
  department: string;
  password: string;
  phoneNumber: string;
  joinDate: string;
}

const mockUsers: UserProfile[] = [
  {
    fullName: 'Nguyễn Văn Quản trị',
    username: 'admin',
    email: 'admin@dalatorchid.com',
    role: 'Admin',
    department: 'Quản trị hệ thống',
    password: 'admin123',
    phoneNumber: '+84 111 222 333',
    joinDate: '2023-01-01',
  },
  {
    fullName: 'Nguyễn Văn Nghiên cứu',
    username: 'hai',
    email: 'researcher@dalatorchid.com',
    role: 'Researcher',
    department: 'Research & Development',
    password: '123456',
    phoneNumber: '+84 123 456 789',
    joinDate: '2024-01-15',
  },
  {
    fullName: 'Nguyễn Văn Kỹ thuật',
    username: 'technician',
    email: 'technician@dalatorchid.com',
    role: 'Technician',
    department: 'Kỹ thuật',
    password: 'tech123',
    phoneNumber: '+84 987 654 321',
    joinDate: '2023-06-10',
  },
];

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      localStorage.setItem('user_profile', JSON.stringify(user));
      setError('');
      if (user.role === 'Admin') {
        void navigate('/dashboard');
      } else {
        void navigate('/method');
      }
    } else {
      setError('Sai tên đăng nhập hoặc mật khẩu!');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#e6e2ea]">
      <div className="w-[900px] h-[520px] bg-white rounded-[40px] shadow-xl flex overflow-hidden border border-gray-300 relative">
        {/* Left: Login Form */}
        <div className="w-1/2 bg-[#d8eddb] flex flex-col justify-center px-12 py-10">
          <h1 className="text-4xl font-bold text-green-800 mb-8 leading-tight">
            DaLatOrchid<br />Lab
          </h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              className="rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <input
              type="password"
              placeholder="Password"
              className="rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
            <button
              type="submit"
              className="mt-4 bg-green-800 hover:bg-green-900 text-white font-semibold rounded-lg py-3 text-base shadow transition-colors"
            >
              Login
            </button>
          </form>
        </div>
        {/* Right: Image */}
        <div className="w-1/2 h-full relative">
          <img
            src="/login-lab.jpg"
            alt="Lab Illustration"
            className="object-cover w-full h-full rounded-tr-[40px] rounded-br-[40px]"
          />
          {/* Overlay for rounded shadow */}
          <div className="absolute inset-0 rounded-tr-[40px] rounded-br-[40px] shadow-xl pointer-events-none" />
        </div>
        {/* Outer border radius shadow */}
        <div className="absolute -bottom-4 -right-4 w-[900px] h-[520px] bg-transparent rounded-[40px] shadow-lg -z-10" />
      </div>
    </div>
  );
};

export default Login;
