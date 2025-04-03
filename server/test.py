from advanced_search import advanced_search
from get_nutritional_info import get_nutritional_info

test_food_id = 4066

result = get_nutritional_info(test_food_id)

if result:
    print(result)
else:
    print("No nutritional data found for the given FoodID.")
