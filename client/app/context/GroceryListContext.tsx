"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { FoodItem } from "@/lib/types";

type GroceryListContextType = {
  groceryList: FoodItem[];
  addItem: (item: FoodItem) => void;
  removeItem: (foodId: number) => void;
};

const GroceryListContext = createContext<GroceryListContextType | undefined>(undefined);

export function GroceryListProvider({ children }: { children: ReactNode }) {
  const [groceryList, setGroceryList] = useState<FoodItem[]>([]);

  const addItem = (item: FoodItem) => {
    setGroceryList((prevList) => {
      const alreadyExists = prevList.some(
        (existingItem) => existingItem.food_id === item.food_id
      );
      if (alreadyExists) return prevList;
      return [...prevList, item];
    });
  };

  const removeItem = (foodId: number) => {
    setGroceryList((prevList) =>
      prevList.filter((item) => item.food_id !== foodId)
    );
  };

  return (
    <GroceryListContext.Provider value={{ groceryList, addItem, removeItem }}>
      {children}
    </GroceryListContext.Provider>
  );
}

export function useGroceryList() {
  const context = useContext(GroceryListContext);
  if (!context) {
    throw new Error("useGroceryList must be used within a GroceryListProvider");
  }
  return context;
}
