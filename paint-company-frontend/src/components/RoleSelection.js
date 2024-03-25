import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoleSelection = ({ setRole }) => {
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setRole(role);
    navigate("/kanban-board");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="role-selection flex flex-col items-center">
        <h2 className="mb-4 text-xl font-bold">Select Your Role</h2>
        <div className="role-options flex flex-col gap-3">
          <button
            className="flex items-center justify-center w-32 h-10 rounded bg-blue-50 text-sm text-neutral-950 transition-colors hover:bg-blue-300"
            onClick={() => handleRoleSelection("John")}
          >
            John
          </button>
          <button
            className="flex items-center justify-center w-32 h-10 rounded bg-purple-50 text-sm text-neutral-950 transition-colors hover:bg-purple-300"
            onClick={() => handleRoleSelection("Jane")}
          >
            Jane
          </button>
          <button
            className="flex items-center justify-center w-32 h-10 rounded bg-green-50 text-sm text-neutral-950 transition-colors hover:bg-green-300"
            onClick={() => handleRoleSelection("Adam")}
          >
            Adam
          </button>
          <button
            className="flex items-center justify-center w-32 h-10 rounded bg-orange-50 text-sm text-neutral-950 transition-colors hover:bg-orange-300"
            onClick={() => handleRoleSelection("GeneralPainter")}
          >
            General Painter
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
