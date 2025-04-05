"use client";

import React, { useState } from "react";
import Loading from "@/components/Loading";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGroceryList } from "@/context/GroceryListContext";

type FoodItem = {
  food_id: number;
  description: string;
};

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FoodItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addedItems, setAddedItems] = useState<Record<number, boolean>>({});

  const { addItem } = useGroceryList();

  const handleSearch = async () => {
    setHasSearched(true);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/advanced_search?query=${encodeURIComponent(query)}`);

      if (!response.ok) {
        console.error("Search API error");
        setResults([]);
        return;
      }

      const data: FoodItem[] = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = (item: FoodItem) => {
    console.log("Add clicked for:", item);
    addItem(item);

    setAddedItems((prev) => ({
      ...prev,
      [item.food_id]: true,
    }));

    setTimeout(() => {
      setAddedItems((prev) => ({
        ...prev,
        [item.food_id]: false,
      }));
    }, 2000);
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Food Search</CardTitle>
        <CardDescription>
          Search for your grocery list foods.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a food item..."
            className="flex-grow border rounded-md px-3 py-2"
          />
          <Button onClick={handleSearch} disabled={!query || isLoading}>
            {isLoading ? <Loading /> : "Search"}
          </Button>
        </div>

        {hasSearched && (
          <div
            className="flex flex-col gap-2 overflow-y-auto"
            style={{ maxHeight: "12rem" }}
          >
            {isLoading ? (
              <div className="flex justify-center text-gray-500">
                <Loading />
              </div>
            ) : results.length > 0 ? (
              results.map((result) => (
                <div
                  key={result.food_id}
                  className="border rounded-md p-3 hover:bg-gray-100 transition flex items-center justify-between"
                >
                  <span>{result.description}</span>
                  {addedItems[result.food_id] ? (
                    <span className="text-green-600 text-sm">Added ✅</span>
                  ) : (
                    <Button
                      variant="default"
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => handleAdd(result)}
                    >
                      Add
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <div className="text-gray-500">No results found.</div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
