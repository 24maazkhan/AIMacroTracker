"use client";

import React from "react";
import { useGroceryList } from "@/context/GroceryListContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GroceryList() {
  const { groceryList, removeItem } = useGroceryList();

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Grocery List</CardTitle>
        <CardDescription>Your selected items will appear here.</CardDescription>
      </CardHeader>
      <CardContent
        className="flex flex-col gap-2 overflow-y-auto"
        style={{ maxHeight: "12rem" }}
      >
        {groceryList.length > 0 ? (
          groceryList.map((item) => (
            <div
              key={item.food_id}
              className="border rounded-md p-3 hover:bg-gray-100 transition flex items-center justify-between"
            >
              <div className="flex flex-col">
                <span className="font-medium">{item.description}</span>
              </div>
              <Button
                variant="destructive"
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={() => removeItem(item.food_id)}
              >
                Remove
              </Button>
            </div>
          ))
        ) : (
          <div className="text-gray-500">Your grocery list is empty.</div>
        )}
      </CardContent>
    </Card>
  );
}
