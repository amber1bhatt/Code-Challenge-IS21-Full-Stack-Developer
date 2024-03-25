import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import RoleSelection from "./components/RoleSelection";
import { KanbanBoard } from "./components/KanbanBoard";

function App() {
  const [role, setRole] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleSelection setRole={setRole} />} />
          <Route
            path="/kanban-board"
            element={role ? <KanbanBoard role={role} /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
