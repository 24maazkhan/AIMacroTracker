"use client";

import React from "react";
import Search from "@/components/Search";
import GroceryList from "@/components/GroceryList";
import MacroSetter from "@/components/MacroSetter";
import MealPlanner from "@/components/MealPlanner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default function Home() {
  return (
    <Card className="w-full max-w-7xl mx-auto p-6">
      <CardHeader>
        <CardTitle className="text-2xl">MacroPlanner Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side: Inputs */}
        <div className="flex flex-col gap-8">
          <Search />
          <GroceryList />
        </div>

        {/* Right side: Settings + Output */}
        <div className="flex flex-col gap-8">
          <MacroSetter />
          <MealPlanner />
        </div>
      </CardContent>
    </Card>
  );
}
