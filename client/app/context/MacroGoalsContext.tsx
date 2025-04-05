"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type MacroGoals = {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
};

type MacroGoalsContextType = {
  macroGoals: MacroGoals | null;
  setMacroGoals: (goals: MacroGoals) => void;
};

const MacroGoalsContext = createContext<MacroGoalsContextType | undefined>(undefined);

export function MacroGoalsProvider({ children }: { children: ReactNode }) {
  const [macroGoals, setMacroGoals] = useState<MacroGoals | null>(null);

  return (
    <MacroGoalsContext.Provider value={{ macroGoals, setMacroGoals }}>
      {children}
    </MacroGoalsContext.Provider>
  );
}

export function useMacroGoals() {
  const context = useContext(MacroGoalsContext);
  if (!context) {
    throw new Error("useMacroGoals must be used within a MacroGoalsProvider");
  }
  return context;
}
