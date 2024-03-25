import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import RoleSelection from "./components/RoleSelection";

function App() {
  const [role, setRole] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleSelection setRole={setRole} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
