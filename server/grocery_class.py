from get_nutritional_info import get_nutritional_info

class GroceryList:
    def __init__(self):
        self.items = []  # List to store dictionaries with "food_item" and "food_id"

    def append(self, food_id):
        # Get the FoodItemNutrition object (with multiplier already applied as 1)
        food_item_nutrition = get_nutritional_info(food_id, multiplier=1)
        # Store the object along with food_id
        self.items.append({
            "food_item": food_item_nutrition,
            "food_id": food_id
        })

    def total_macros(self):
        # Simply sum the values since they are already multiplied
        total_protein = sum(item["food_item"].protein for item in self.items if item["food_item"].protein is not None)
        total_fat = sum(item["food_item"].total_fat for item in self.items if item["food_item"].total_fat is not None)
        total_carbohydrates = sum(item["food_item"].total_carbohydrate for item in self.items if item["food_item"].total_carbohydrate is not None)
        total_energy = sum(item["food_item"].energy_kilocalories for item in self.items if item["food_item"].energy_kilocalories is not None)
        total_sugars = sum(item["food_item"].total_sugars for item in self.items if item["food_item"].total_sugars is not None)
        total_fiber = sum(item["food_item"].total_dietary_fiber for item in self.items if item["food_item"].total_dietary_fiber is not None)

        return {
            "total_protein": total_protein,
            "total_fat": total_fat,
            "total_carbohydrates": total_carbohydrates,
            "total_energy_kcal": total_energy,
            "total_sugars": total_sugars,
            "total_dietary_fiber": total_fiber
        }

    def __getitem__(self, food_id):
        # Return the first item with the matching food_id (or None if not found)
        for item in self.items:
            if item["food_id"] == food_id:
                return item
        return None

    def delete(self, food_id):
        # Remove items that match the given food_id
        self.items = [item for item in self.items if item["food_id"] != food_id]

    def __repr__(self):
        total_macros = self.total_macros()
        return (f"Grocery List Summary:\n"
                f"Total Protein: {total_macros['total_protein']} g\n"
                f"Total Fat: {total_macros['total_fat']} g\n"
                f"Total Carbohydrates: {total_macros['total_carbohydrates']} g\n"
                f"Total Energy: {total_macros['total_energy_kcal']} kcal\n"
                f"Total Sugars: {total_macros['total_sugars']} g\n"
                f"Total Dietary Fiber: {total_macros['total_dietary_fiber']} g")

    def to_dict(self):
        # Convert each food item to a dictionary using its own to_dict() method.
        return {
            "items": [
                {"food_id": item["food_id"], **item["food_item"].to_dict()}
                for item in self.items
            ]
        }
