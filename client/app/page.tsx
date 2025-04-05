"use client"

import React from "react"
import Search from "@/components/Search"
import GroceryList from "@/components/GroceryList"
import MacroSetter from "./components/MacroSetter"
import MealPlanner from "./components/MealPlanner"

export default function Home() {
  return (
  <>
    <Search />
    <GroceryList/>
    <MacroSetter/>
    <MealPlanner/>
  </>

  );
}
