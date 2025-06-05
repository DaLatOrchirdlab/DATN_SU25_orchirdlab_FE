import React from 'react';
import { 
  Home, 
  Search, 
  FileText, 
  BarChart3, 
  CheckSquare, 
  TestTube, 
  Settings, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';
import './sidebarComponent.css';
const SidebarComponent = () => {
  const menuItems = [
    { icon: Home, label: 'Hybridization Management', active: false },
    { icon: Search, label: 'Researching', active: false },
    { icon: FileText, label: 'Experiment Log', active: false },
    { icon: BarChart3, label: 'Research Reports', active: false },
    { icon: CheckSquare, label: 'Tasks', active: true },
    { icon: TestTube, label: 'Method', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  const bottomItems = [
    { icon: HelpCircle, label: 'Help' },
    { icon: LogOut, label: 'Logout' },
  ];

  return (
    <div className="sidebar">
        {/* 
        <div className="sidebar-logo">
          <h2>DataOrchidLab Logo</h2>
        </div> */}

        {/* Menu Items */}
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`sidebar-menu-item ${item.active ? 'active' : ''}`}
                >
                  <item.icon className="sidebar-icon" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Items */}
        <div className="sidebar-bottom">
          <ul className="sidebar-bottom-menu">
            {bottomItems.map((item, index) => (
              <li key={index}>
                <a href="#" className="sidebar-menu-item">
                  <item.icon className="sidebar-icon" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
};

export default SidebarComponent;