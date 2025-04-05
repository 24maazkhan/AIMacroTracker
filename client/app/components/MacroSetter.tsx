"use client";

import React, { useState } from "react";
import { calculateMacros } from "@/lib/calculateMacros";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMacroGoals } from "@/context/MacroGoalsContext";

export default function MacroSetter() {
  const [calories, setCalories] = useState<number | "">("");
  const [protein, setProtein] = useState<number | "">("");
  const [fat, setFat] = useState<number | "">("");
  const [carbs, setCarbs] = useState<number | "">("");

  const [confirmation, setConfirmation] = useState(false);

  const handleNumberInput = (value: string, setter: (val: number | "") => void) => {
    const numberValue = Number(value);
    if (numberValue < 0) return; // Prevent negatives
    setter(numberValue === 0 ? "" : numberValue);
  };

  const { setMacroGoals } = useMacroGoals();

  const handleSubmit = () => {
    try {
      const finalMacros = calculateMacros({
        calories: calories as number,
        protein: protein || undefined,
        fat: fat || undefined,
        carbs: carbs || undefined,
      });

      setMacroGoals(finalMacros);
      setConfirmation(true);

      console.log("Final macro goals:", finalMacros);

      setTimeout(() => {
        setConfirmation(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Macro Goals</CardTitle>
        <CardDescription>
          Set your desired daily intake goals.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            Calories
            <input
              type="number"
              value={calories}
              onChange={(e) => handleNumberInput(e.target.value, setCalories)}
              placeholder="e.g., 2000-2500"
              className="mt-1 w-full border rounded-md px-3 py-2"
              required
            />
          </label>
          <label className="text-sm font-medium">
            Protein (g) (optional)
            <input
              type="number"
              value={protein}
              onChange={(e) => handleNumberInput(e.target.value, setProtein)}
              placeholder="Optional"
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium">
            Fat (g) (optional)
            <input
              type="number"
              value={fat}
              onChange={(e) => handleNumberInput(e.target.value, setFat)}
              placeholder="Optional"
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium">
            Carbohydrates (g) (optional)
            <input
              type="number"
              value={carbs}
              onChange={(e) => handleNumberInput(e.target.value, setCarbs)}
              placeholder="Optional"
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleSubmit}>Save Goals</Button>
          {confirmation && <span className="text-green-600 text-sm">Goals saved ✅</span>}
        </div>
      </CardContent>
    </Card>
  );
}
