import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Board from "./Board";

const RoleContext = createContext();

export const KanbanBoard = ({ role }) => {
  return (
    <RoleContext.Provider value={role}>
      <div className="h-screen w-full bg-neutral-900 text-neutral-50">
        <Board role={role} />
      </div>
    </RoleContext.Provider>
  );
};
