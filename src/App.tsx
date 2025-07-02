import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Method from "./pages/method/Method";
import Tasks from "./pages/Tasks";
import ExperimentLog from "./pages/ExperimentLog";
import Seedlings from "./pages/seedling/Seedlings";
import Reports from "./pages/reports/Reports";
import ReportsDetails from "./pages/reports/ReportsDetails";
import ReportsFollowUpDetails from "./pages/reports/ReportsFollowUpDetails";
import SeedlingDetail from "./pages/seedling/SeedlingDetail";

import { SeedlingFormProvider } from "./context/SeedlingFormContext";
import CreateTaskContainer from "./pages/CreateTask/Form/CreateTaskContainer";
import SelectCageContainer from "./pages/CreateTask/Form/SelectCageContainer";
import SelectTechnicianContainer from "./pages/CreateTask/Form/SelectTechnicianContainer";
import ConfirmTaskContainer from "./pages/CreateTask/Form/ConfirmTaskContainer";
import TaskDetailPage from "./pages/CreateTask/TaskDetailPage";
import EditTask from "./pages/CreateTask/EditTask";
import CreateExperimentStep1 from "./pages/CreateExperimentLog/Form/CreateExperimentStep1";
import CreateExperimentStep2 from "./pages/CreateExperimentLog/Form/CreateExperimentStep2";
import CreateExperimentStep3 from "./pages/CreateExperimentLog/Form/CreateExperimentStep3";
import { ExperimentLogFormProvider } from "./context/ExperimentLogFormContext";
import ProfilePage from "./pages/ProfilePage";
import MethodDetail from "./pages/method/MethodDetail";
import MethodCreate from "./pages/method/MethodCreate";
import SeedlingDetailsForm from "./pages/seedling/SeedlingDetailsForm";
import SeedlingCharacteristicsForm from "./pages/seedling/SeedlingCharacteristicsForm";
import SeedlingSummary from "./pages/seedling/SeedlingSummary";
import ExperimentLogDetail from "./pages/ExperimentLogDetail";
import SidebarAdmin from "./components/SidebarAdmin";
import { useEffect, useState } from "react";
import Login from "./pages/landing/Login";
import DashboardAdmin from './pages/DashboardAdmin';

function getUserRole() {
  try {
    const user = JSON.parse(localStorage.getItem("user_profile") ?? "null") as { role?: string } | null;
    return user?.role ?? null;
  } catch {
    return null;
  }
}

function AppLayout() {
  const [role, setRole] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setRole(getUserRole());
  }, []);

  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <div className="flex bg-gray-100 ">
      {role === "Admin" ? <SidebarAdmin /> : <Sidebar />}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-8">
          <Routes>
            <Route
              path="/"
              element={
                role === "Admin"
                  ? <Navigate to="/dashboard" replace />
                  : role
                    ? <Navigate to="/method" replace />
                    : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/dashboard"
              element={
                role === "Admin"
                  ? <DashboardAdmin />
                  : <Navigate to="/method" replace />
              }
            />
            <Route path="/method" element={<Method />} />
            <Route path="/method/:id" element={<MethodDetail />} />
            <Route path="/method/new" element={<MethodCreate />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/experiment-log" element={<ExperimentLog />} />
            <Route path="/seedlings" element={<Seedlings />} />
            <Route path="/seedlings/:id" element={<SeedlingDetail />} />
            <Route
              path="/seedlings/new/*"
              element={
                <SeedlingFormProvider>
                  <Routes>
                    <Route path="" element={<SeedlingDetailsForm />} />
                    <Route
                      path="characteristics"
                      element={<SeedlingCharacteristicsForm />}
                    />
                    <Route path="summary" element={<SeedlingSummary />} />
                  </Routes>
                </SeedlingFormProvider>
              }
            />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/:id" element={<ReportsDetails />} />
            <Route
              path="/reports/:id/follow-up"
              element={<ReportsFollowUpDetails />}
            />
            <Route
              path="/create-task"
              element={<Navigate to="/create-task/step-1" replace />}
            />
            <Route
              path="/create-task/step-1"
              element={<CreateTaskContainer />}
            />
            <Route
              path="/create-task/step-2"
              element={<SelectCageContainer />}
            />
            <Route
              path="/create-task/step-3"
              element={<SelectTechnicianContainer />}
            />
            <Route
              path="/create-task/step-4"
              element={<ConfirmTaskContainer />}
            />
            <Route path="/tasks/:id" element={<TaskDetailPage />} />
            <Route path="/tasks/:id/edit" element={<EditTask />} />

            {/* Experiment Log Creation Routes */}
            <Route
              path="/experiment-log/create/*"
              element={
                <ExperimentLogFormProvider>
                  <Routes>
                    <Route path="step-1" element={<CreateExperimentStep1 />} />
                    <Route path="step-2" element={<CreateExperimentStep2 />} />
                    <Route path="step-3" element={<CreateExperimentStep3 />} />
                    <Route path="/" element={<Navigate to="step-1" replace />} />
                  </Routes>
                </ExperimentLogFormProvider>
              }
            />

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/experiment-log/:id" element={<ExperimentLogDetail />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
