from advanced_search import advanced_search
from grocery_class import GroceryList

grocery_list = GroceryList()
grocery_list.append(food_id=4066, multiplier_factor=2)
grocery_list.append(food_id=5, multiplier_factor=1)

# Get a specific item by food_id
item = grocery_list[4066]  # This will return the item with food_id 1
if item:
    print(item['food_item'])  # Print food item details
else:
    print("Food item not found")
item2 = grocery_list[5]
print("\n")
if item2:
    print(item2['food_item'])  # Print food item details
else:
    print("Food item not found")
# Delete an item by food_id
grocery_list.delete(5)  # This will remove the item with food_id 1
print("\n")
# Print the grocery list summary
print(grocery_list)

