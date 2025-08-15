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
import ReportsDetails from "./pages/reports/ReportsDetails";
import ReportsFollowUpDetails from "./pages/reports/ReportsFollowUpDetails";
import SeedlingDetail from "./pages/seedling/SeedlingDetail";

import { SeedlingFormProvider } from "./context/SeedlingFormContext";
import CreateTaskContainer from "./pages/CreateTask/Form/CreateTaskContainer";
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
import Element from "./pages/element/Element";
import SeedlingDetailsForm from "./pages/seedling/SeedlingDetailsForm";
import SeedlingCharacteristicsForm from "./pages/seedling/SeedlingCharacteristicsForm";
import SeedlingSummary from "./pages/seedling/SeedlingSummary";
import ExperimentLogDetail from "./pages/ExperimentLogDetail";
import SidebarAdmin from "./components/SidebarAdmin";
import Login from "./pages/landing/Login";
import DashboardAdmin from "./pages/DashboardAdmin";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import { CreateTaskProvider } from "./context/CreateTaskContext";
import TaskTemplateList from "./pages/TaskTemplateList";
import TaskTemplateCreate from "./pages/TaskTemplateCreate";
import TaskTemplateDetail from "./pages/TaskTemplateDetail";
import { SnackbarProvider } from "notistack";
import ReportsCreate from "./pages/reports/technician/ReportsCreate";
import ReportList from "./pages/reports/Reports";
import ReportsTechnician from "./pages/reports/technician/Reports";
import SidebarTechnician from "./components/SidebarTechinician";
import ListTask from "./pages/technician/task/listTask";
import TechDetailTask from "./pages/technician/task/TechDetailTask";
// Import admin pages
import AdminTasks from "./pages/AdminTasks";
import AdminTaskDetail from "./pages/AdminTaskDetail";
import AdminExperimentLog from "./pages/AdminExperimentLog";
import AdminExperimentLogDetail from "./pages/AdminExperimentLogDetail";
import AdminLabRoomList from "./pages/AdminLabRoomList";
import AdminLabRoomCreate from "./pages/AdminLabRoomCreate";
import AdminLabRoomDetail from "./pages/AdminLabRoomDetail";
import AdminSeedlings from "./pages/seedling/adminRole/AdminSeedlings";
import AdminSeedlingDetail from "./pages/seedling/adminRole/AdminSeedlingDetail";
import AdminMethodDetail from "./pages/method/adminRole/AdminMethodDetail";
import AdminMethod from "./pages/method/adminRole/AdminMethod";
import AdminReport from "./pages/reports/adminRole/AdminReports";
import AdminReportsDetails from "./pages/reports/adminRole/AdminReportsDetails";
import AdminElement from "./pages/element/adminRole/AdminElement";

function AppLayout() {
  const { user, isAuthReady } = useAuth();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isUnauthorizedPage = location.pathname === "/unauthorized";
  // const role = user?.roleID === 1 ? "admin" : user ? "User" : null;
  let sidebar = <Sidebar />;
  if (user?.roleID === 1) sidebar = <SidebarAdmin />;
  else if (user?.roleID === 3) sidebar = <SidebarTechnician />;

  console.log("Current user role:", user?.roleID);

  if (!isAuthReady) {
    return <div>Đang tải...</div>;
  }

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  if (isUnauthorizedPage) {
    return <Unauthorized />;
  }

  return (
    <div className="flex bg-gray-100 ">
      {sidebar}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-8">
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRole={1}>
                  <DashboardAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/method"
              element={
                <ProtectedRoute requiredRole={2}>
                  <Method />
                </ProtectedRoute>
              }
            />
            <Route
              path="/method/:id"
              element={
                <ProtectedRoute requiredRole={2}>
                  <MethodDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/method/new"
              element={
                <ProtectedRoute requiredRole={2}>
                  <MethodCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/element"
              element={
                <ProtectedRoute requiredRole={2}>
                  <Element />
                </ProtectedRoute>
              }
            />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/experiment-log" element={<ExperimentLog />} />
            <Route
              path="/seedlings"
              element={
                <ProtectedRoute requiredRole={2}>
                  <Seedlings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/seedlings/:id"
              element={
                <ProtectedRoute requiredRole={2}>
                  <SeedlingDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/seedlings/new/*"
              element={
                <ProtectedRoute requiredRole={2}>
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
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute requiredRole={2}>
                  <ReportList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/technician/tasks"
              element={
                <ProtectedRoute requiredRole={3}>
                  <ListTask />
                </ProtectedRoute>
              }
            />
            <Route
              path="/technician/reports"
              element={
                <ProtectedRoute requiredRole={3}>
                  <ReportsTechnician />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports/:id"
              element={
                <ProtectedRoute requiredRole={[2, 3]}>
                  <ReportsDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports/:id/follow-up"
              element={
                <ProtectedRoute requiredRole={2}>
                  <ReportsFollowUpDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports/new"
              element={
                <ProtectedRoute requiredRole={3}>
                  <ReportsCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-task/*"
              element={
                <CreateTaskProvider>
                  <Routes>
                    <Route path="" element={<CreateTaskContainer />} />
                    <Route path="step-1" element={<CreateTaskContainer />} />
                    <Route
                      path="step-2"
                      element={<SelectTechnicianContainer />}
                    />
                    <Route path="step-3" element={<ConfirmTaskContainer />} />
                  </Routes>
                </CreateTaskProvider>
              }
            />
            <Route path="/tasks/:id" element={<TaskDetailPage />} />
            <Route
              path="/technician/tasks/:id"
              element={
                <ProtectedRoute requiredRole={3}>
                  <TechDetailTask />
                </ProtectedRoute>
              }
            />
            <Route path="/tasks/:id/edit" element={<EditTask />} />
            <Route path="/task-templates" element={<TaskTemplateList />} />
            <Route
              path="/task-templates/new"
              element={<TaskTemplateCreate />}
            />
            <Route
              path="/task-templates/:id"
              element={<TaskTemplateDetail />}
            />
            {/* Experiment Log Creation Routes */}
            <Route
              path="/experiment-log/create/*"
              element={
                <ExperimentLogFormProvider>
                  <Routes>
                    <Route path="step-1" element={<CreateExperimentStep1 />} />
                    <Route path="step-2" element={<CreateExperimentStep2 />} />
                    <Route path="step-3" element={<CreateExperimentStep3 />} />
                    <Route
                      path="/"
                      element={<Navigate to="step-1" replace />}
                    />
                  </Routes>
                </ExperimentLogFormProvider>
              }
            />

            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/experiment-log/:id"
              element={<ExperimentLogDetail />}
            />

            {/* Admin Routes */}
            <Route
              path="/admin/tasks"
              element={
                <ProtectedRoute requiredRole={1}>
                  <AdminTasks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tasks/:id"
              element={
                <ProtectedRoute requiredRole={1}>
                  <AdminTaskDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/experiment-log"
              element={
                <ProtectedRoute requiredRole={1}>
                  <AdminExperimentLog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/experiment-log/:id"
              element={
                <ProtectedRoute requiredRole={1}>
                  <AdminExperimentLogDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/labroom"
              element={
                <ProtectedRoute requiredRole={1}>
                  <AdminLabRoomList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/labroom/new"
              element={
                <ProtectedRoute requiredRole={1}>
                  <AdminLabRoomCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/labroom/:id"
              element={
                <ProtectedRoute requiredRole={1}>
                  <AdminLabRoomDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/seedling"
              element={
                <ProtectedRoute requiredRole={1}>
                  <AdminSeedlings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/seedling/:id"
              element={
                <ProtectedRoute requiredRole={1}>
                  <AdminSeedlingDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/method"
              element={
                <ProtectedRoute requiredRole={1}>
                  <AdminMethod />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/method/:id"
              element={
                <ProtectedRoute requiredRole={1}>
                  <AdminMethodDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/report"
              element={
                <ProtectedRoute requiredRole={1}>
                  <AdminReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/report/:id"
              element={
                <ProtectedRoute requiredRole={1}>
                  <AdminReportsDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/element"
              element={
                <ProtectedRoute requiredRole={1}>
                  <AdminElement />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Router>
          <Routes>
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/*" element={<AppLayout />} />
          </Routes>
        </Router>
      </SnackbarProvider>
    </AuthProvider>
  );
}

export default App;
