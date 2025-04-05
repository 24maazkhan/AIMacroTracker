"use client"

import React from "react"
import Search from "@/components/Search"
import GroceryList from "@/components/GroceryList"
import MacroSetter from "./components/MacroSetter"

export default function Home() {
  return (
  <>
    <Search />
    <GroceryList/>
    <MacroSetter/>
  </>

  );
}
