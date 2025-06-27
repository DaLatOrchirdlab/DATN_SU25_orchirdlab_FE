import { NavLink } from "react-router-dom";
import { FaTachometerAlt } from "react-icons/fa";

export default function SidebarAdmin() {
  return (
    <aside className="w-64 h-screen fixed top-0 left-0 z-30 shadow flex flex-col bg-green-800">
      <div className="h-16 flex items-center justify-center font-bold text-xl text-white border-b border-white/40">
        OrchidLab
      </div>
      <nav className="flex-1 py-4 text-white">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 hover:bg-white/10 transition ${
              isActive ? "bg-white/20 font-semibold" : ""
            }`
          }
        >
          <span className="text-lg"><FaTachometerAlt /></span>
          <span>Dashboard</span>
        </NavLink>
      </nav>
    </aside>
  );
} 