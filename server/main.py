from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import List, Dict, Any
from mealplanner_util.grocery_class import GroceryList
from advanced_search import advanced_search
from mealplanner import get_meal_plan 

app = FastAPI()

class MealPlanRequest(BaseModel):
    food_ids: List[int]
    macro_targets: Dict[str, float]

@app.post("/meal_plan")
async def create_meal_plan(request: MealPlanRequest) -> Any:

    #Expects a JSON body with:
    # food_ids: A list of food ID integers.
    # macro_targets: A dictionary with targeted macros (e.g., calories, protein, fat, carbohydrates).

    grocery_list = GroceryList()
    for food_id in request.food_ids:
        grocery_list.append(food_id=food_id)
    
    # Generate Meal Plan
    meal_plan = await get_meal_plan(grocery_list, request.macro_targets)
    if meal_plan is None:
        raise HTTPException(status_code=500, detail="Meal plan generation failed")
    
    return meal_plan

@app.get("/advanced_search")
def search_food(query: str = Query(..., description="Search query for food items")) -> List[Dict[str, Any]]:
    # Perform Advanced Search on Food Items CSV
    # Query parameter: string
    # Returns a list of food items with their food_id and description
    try:
        results = advanced_search(query)
        # Convert each FoodItem object into a dictionary for JSON serialization
        return [{"food_id": item.food_id, "description": item.description} for item in results]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)