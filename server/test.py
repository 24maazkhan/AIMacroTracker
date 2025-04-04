import asyncio
from grocery_class import GroceryList
from mealplanner import get_meal_plan

async def main():
    # Build your grocery list
    grocery_list = GroceryList()
    grocery_list.append(food_id=4066)
    grocery_list.append(food_id=125)
    grocery_list.append(food_id=502435)
    grocery_list.append(food_id=5841)
    grocery_list.append(food_id=5284)
    grocery_list.append(food_id=2140)
    grocery_list.append(food_id=4471)
    grocery_list.append(food_id=502484)
    grocery_list.append(food_id=119)
    grocery_list.append(food_id=2460)

    # Define macro targets
    macro_targets = {
        "calories": 2100,
        "protein": 150,
        "fat": 70,
        "carbohydrates": 250
    }

    # Get the meal plan using the asynchronous function
    meal_plan = await get_meal_plan(grocery_list, macro_targets)
    print("\nFinal Meal Plan Object:")
    print(meal_plan)

# Run the async main function
asyncio.run(main())
