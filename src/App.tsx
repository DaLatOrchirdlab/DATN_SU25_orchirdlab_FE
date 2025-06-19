import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Method from "./pages/Method";
import Tasks from "./pages/Tasks";
import ExperimentLog from "./pages/ExperimentLog";
import Seedlings from "./pages/Seedlings";
import Reports from "./pages/Reports";
import SeedlingDetail from "./pages/SeedlingDetail";
import SeedlingDetailsForm from "./pages/SeedlingDetailsForm";
import SeedlingCharacteristicsForm from "./pages/SeedlingCharacteristicsForm";
import SeedlingSummary from "./pages/SeedlingSummary";
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
import ProfilePage from "./pages/ProfilePage";
import ExperimentLogDetail from './pages/ExperimentLogDetail';

function App() {
  return (
    <Router>
      <div className="flex bg-gray-100 ">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <main className="flex-1 p-8">
            <Routes>
              <Route path="/" element={<Navigate to="/method" replace />} />
              <Route path="/method" element={<Method />} />
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
              <Route path="/create-task" element={<Navigate to="/create-task/step-1" replace />} />
              <Route path="/create-task/step-1" element={<CreateTaskContainer />} />
              <Route path="/create-task/step-2" element={<SelectCageContainer />} />
              <Route path="/create-task/step-3" element={<SelectTechnicianContainer />} />
              <Route path="/create-task/step-4" element={<ConfirmTaskContainer />} />
              <Route path="/tasks/:id" element={<TaskDetailPage />} />
              <Route path="/tasks/:id/edit" element={<EditTask />} />

              {/* Experiment Log Creation Routes */}
              <Route path="/experiment-log/create" element={<Navigate to="/experiment-log/create/step-1" replace />} />
              <Route path="/experiment-log/create/step-1" element={<CreateExperimentStep1 />} />
              <Route path="/experiment-log/create/step-2" element={<CreateExperimentStep2 />} />
              <Route path="/experiment-log/create/step-3" element={<CreateExperimentStep3 />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/experiment-log/:id" element={<ExperimentLogDetail />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
