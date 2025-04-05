"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useMacroGoals } from "@/context/MacroGoalsContext";
import { useGroceryList } from "@/context/GroceryListContext";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";

export default function MealPlanner() {
  const { macroGoals } = useMacroGoals();
  const { groceryList } = useGroceryList();

  const [mealPlan, setMealPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasValidInputs =
    macroGoals &&
    macroGoals.calories > 0 &&
    groceryList.length > 0;

  const fetchMealPlan = async () => {
    if (!hasValidInputs) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const requestBody = {
      food_ids: groceryList.map(item => item.food_id),
      macro_targets: {
        calories: macroGoals.calories,
        protein: macroGoals.protein,
        fat: macroGoals.fat,
        carbohydrates: macroGoals.carbs,
      },
    };

    try {
      const response = await fetch("/api/meal_plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch meal plan.");
      }

      const data = await response.json();
      setMealPlan(data);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMealPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [macroGoals, groceryList]);

  const renderMealSection = (title: string, mealKey: string) => {
    const meal = mealPlan[mealKey];
    if (!meal) return null;

    return (
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">{title}: {meal.meal_name} ({meal.number_of_days} days)</h3>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {meal.ingredients.map((ingredient: any) => (
            <li key={ingredient.food_id}>
              {ingredient.description} — {ingredient.multiplier_factor * 100}g
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderGroceryList = () => {
    const groceries = mealPlan.grocery_quantity_list;
    if (!groceries) return null;

    return (
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">🛒 Grocery List</h3>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {groceries.map((item: any) => (
            <li key={item.food_id}>
              {item.description} — {item.multiplier_factor * 100}g
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Meal Plan</CardTitle>
        <CardDescription>Based on your macro goals.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {!hasValidInputs ? (
          <div className="text-gray-500">
            Please enter your macro goals and add items to your grocery list.
          </div>
        ) : isLoading ? (
          <div className="flex justify-center text-gray-500">
            <Loading />
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : mealPlan ? (
          <>
            <div className="flex flex-col gap-4">
              {renderMealSection("🍳 Breakfast 1", "breakfast_1")}
              {renderMealSection("🍳 Breakfast 2", "breakfast_2")}
              {renderMealSection("🥗 Lunch 1", "lunch_1")}
              {renderMealSection("🥗 Lunch 2", "lunch_2")}
              {renderMealSection("🍽️ Dinner 1", "dinner_1")}
              {renderMealSection("🍽️ Dinner 2", "dinner_2")}
              {renderGroceryList()}
            </div>
            <Button onClick={fetchMealPlan} variant="outline">
              Regenerate Meal Plan
            </Button>
          </>
        ) : (
          <div className="text-gray-500">No meal plan generated yet.</div>
        )}
      </CardContent>
    </Card>
  );
}
