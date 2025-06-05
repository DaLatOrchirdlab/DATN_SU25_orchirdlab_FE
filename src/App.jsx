import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateTaskContainer from "./Components/Researcher/CreateTask/FormCreateTask/Step1/createTaskContainer";


function App() {
  return (
    <Router>
      <Routes>
        {/* các route khác */}
        <Route path="/create-task" element={<CreateTaskContainer />} />
      </Routes>
    </Router>
  );
}

export default App;