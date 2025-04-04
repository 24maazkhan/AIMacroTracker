import json

def generate_meal_planner_prompt(grocery_list, macro_targets):
    prompt = f"""
Below is a list of available grocery items along with their nutritional information per 100g. Each food item includes values for protein, fat, carbohydrates, energy (kcal), sugars, and dietary fiber. Also provided are the daily macro targets that must be met as closely as possible.

Grocery List (each food item is for a 100g serving):
{json.dumps(grocery_list.to_dict(), indent=2)}

Daily Macro Targets:
{json.dumps(macro_targets, indent=2)}

Task:
Using the above grocery list and daily macro targets, please generate a weekly meal plan that includes 6 different meal options:
- 2 breakfast options
- 2 lunch options
- 2 dinner options

For each meal option, assign a key (e.g., "breakfast_1", "lunch_2", etc.) and specify:
- "meal_name": a descriptive name for the meal (e.g., "Hearty Oatmeal Breakfast")
- "number_of_days": either 3 or 4 (depending on how many days that option will be served during the week)
- "ingredients": an array of objects, each containing "food_id" and a "multiplier_factor" (where each multiplier factor represents how many 100g portions to use)

Also, provide a "grocery_quantity_list" that aggregates the total multiplier_factor needed for each food_id over the entire week.

Important:
- Basic pantry items such as spices, salt, and oil should not be factored into the meal plan calculations.
- Please output your answer in the following exact JSON structure:

{{
  "breakfast_1": {{
    "meal_name": <string>,
    "number_of_days": <3 or 4>,
    "ingredients": [
      {{ "food_id": <id>, "multiplier_factor": <multiplier> }},
      ...
    ]
  }},
  "breakfast_2": {{ ... }},
  "lunch_1": {{ ... }},
  "lunch_2": {{ ... }},
  "dinner_1": {{ ... }},
  "dinner_2": {{ ... }},
  "grocery_quantity_list": [
    {{ "food_id": <id>, "multiplier_factor": <total_multiplier> }},
    ...
  ]
}}

Note: Wherever you see <...>, please assume that the structure continues in the same format as shown above.
Please return only raw JSON. Do not wrap it in triple backticks or add any extra commentary.

Ensure that when these meals are combined over the week, the total nutritional intake meets or closely approximates the daily macro targets provided. Assume that each multiplier factor represents a 100g serving of that food item.
"""
    return prompt
