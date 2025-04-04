import pandas as pd
from mealplanner_util.get_nutritional_info import get_nutritional_info
# Read CSV
nutrient_names_df = pd.read_csv("nutrient_name.csv", encoding="ISO-8859-1")

class FoodItem:
    def __init__(self, food_id, description):
        self.food_id = food_id
        self.description = description

    def __repr__(self):
        return f"FoodID: {self.food_id}, Description: {self.description}"
    
class FoodItemNutrition:
    def __init__(self, food_id, food_description):
        self.food_id = food_id
        self.food_description = food_description
        self.protein = 0
        self.total_fat = 0
        self.total_carbohydrate = 0
        self.energy_kilocalories = 0
        self.total_sugars = 0
        self.total_dietary_fiber = 0
        self.nutrient_units = NutrientUnits()  # Store the units here

    def apply_multiplier(self, multiplier):
        self.protein *= multiplier
        self.total_fat *= multiplier
        self.total_carbohydrate *= multiplier
        self.energy_kilocalories *= multiplier
        self.total_sugars *= multiplier
        self.total_dietary_fiber *= multiplier

    def __repr__(self):
        return (f"Nutritional Information for FoodID {self.food_id}:\n"
                f"Description: {self.food_description}\n"
                f"Protein: {self.protein} {self.nutrient_units.protein}\n"
                f"Total Fat: {self.total_fat} {self.nutrient_units.total_fat}\n"
                f"Carbohydrates: {self.total_carbohydrate} {self.nutrient_units.total_carbohydrate}\n"
                f"Energy: {self.energy_kilocalories} {self.nutrient_units.energy_kilocalories}\n"
                f"Sugars: {self.total_sugars} {self.nutrient_units.total_sugars}\n"
                f"Dietary Fiber: {self.total_dietary_fiber} {self.nutrient_units.total_dietary_fiber}")

    def to_dict(self):
        # Convert the FoodItemNutrition object to a dictionary
        return {
            "food_id": self.food_id,
            "description": self.food_description,
            "protein": self.protein,
            "total_fat": self.total_fat,
            "total_carbohydrate": self.total_carbohydrate,
            "energy_kilocalories": self.energy_kilocalories,
            "total_sugars": self.total_sugars,
            "total_dietary_fiber": self.total_dietary_fiber
        }

class NutrientUnits:
    def __init__(self):
        self.protein = "g"
        self.total_fat = "g"
        self.total_carbohydrate = "g"
        self.energy_kilocalories = "kcal"
        self.total_sugars = "g"
        self.total_dietary_fiber = "g"

