"use client"

import React, { useState } from "react"
import Loading from "@/components/Loading"
import { Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FoodItem } from "@/lib/types"

export default function Search() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<FoodItem[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    setHasSearched(true)
    setIsLoading(true)

    try {
      const response = await fetch(`/api/advanced_search?query=${encodeURIComponent(query)}`)

      if (!response.ok) {
        console.error("Search API error")
        setResults([])
        return
      }

      const data: FoodItem[] = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Search error:", error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Food Search</CardTitle>
        <CardDescription>
          Search for foods to add to your shopping list.
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
                  <Button
                    variant="default"
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => console.log("Add clicked for:", result)}
                  >
                    Add
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No results found.</div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
