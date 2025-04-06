import json

def generate_meal_planner_prompt(grocery_list, macro_targets):
    prompt = f"""
Below is a list of available grocery items along with their nutritional information per 100g. Each food item includes values for protein, fat, carbohydrates, energy (kcal), sugars, and dietary fiber. Also provided are the daily macro targets that must be strictly met or slightly exceeded.

Grocery List (each food item is for a 100g serving):
{json.dumps(grocery_list.to_dict(), indent=2)}

Daily Macro Targets (per day):
{json.dumps(macro_targets, indent=2)}

Task:
Using the above grocery list and daily macro targets, please generate a weekly meal plan that includes exactly 6 different meal options:
- 2 breakfast options
- 2 lunch options
- 2 dinner options

For each meal option, assign a key (e.g., "breakfast_1", "lunch_2", etc.) and specify:
- "meal_name": a descriptive name for the meal (e.g., "Hearty Oatmeal Breakfast")
- "number_of_days": either 3 or 4 (depending on how many days that option will be served during the week)
- "ingredients": an array of objects, each containing "food_id", "description", and "multiplier_factor". The "multiplier_factor" for each ingredient should represent the quantity (in 100g servings) required for one serving of that meal.

Also, provide a "grocery_quantity_list" that aggregates the total multiplier_factor needed for each food item over the entire week. For each food item in this list, the multiplier_factor should be calculated as the sum across all meal options of (multiplier_factor for that ingredient * number_of_days for that meal).

Important:
- ✅ Before finalizing your output, you must carefully calculate and confirm:
  - The total daily intake (calories, protein, fat, carbohydrates) across all meals served each day **meets or exceeds the daily macro targets**.
  - The weekly grocery_quantity_list accurately reflects the aggregation of ingredients across the week's plan.
- ✅ Always ensure your meal plan hits at least the daily macro targets. **It is acceptable and even preferable to slightly exceed the targets to ensure adequacy, but never fall below.**
- ✅ Always produce a meal plan, even if you need to repeat ingredients or increase quantities to meet the targets.
- ✅ Double-check all internal calculations before providing the final JSON output.

Additional notes:
- Basic pantry items such as spices, salt, and oil should not be factored into the meal plan calculations.
- Please output your answer in the following exact JSON structure:

{{
  "breakfast_1": {{
    "meal_name": <string>,
    "number_of_days": <3 or 4>,
    "ingredients": [
      {{ "food_id": <id>, "description": <string>, "multiplier_factor": <multiplier> }},
      ...
    ]
  }},
  "breakfast_2": {{ ... }},
  "lunch_1": {{ ... }},
  "lunch_2": {{ ... }},
  "dinner_1": {{ ... }},
  "dinner_2": {{ ... }},
  "grocery_quantity_list": [
    {{ "food_id": <id>, "description": <string>, "multiplier_factor": <total_multiplier> }},
    ...
  ]
}}

Note: Wherever you see <...>, assume the structure continues in the same format.
Please return only raw JSON. Do not wrap it in triple backticks or add any extra commentary.

Finally, ensure that when these meals are combined over the week, the total nutritional intake **meets or exceeds** the daily macro targets provided. If necessary, adjust ingredient quantities or increase portions to achieve this goal.
"""
    return prompt
