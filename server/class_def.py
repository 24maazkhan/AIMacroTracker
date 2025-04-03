import pandas as pd

# Read CSV
nutrient_names_df = pd.read_csv("nutrient_name.csv", encoding="ISO-8859-1")

class FoodItem:
    def __init__(self, food_id, description):
        self.food_id = food_id
        self.description = description

    def __repr__(self):
        return f"FoodID: {self.food_id}, Description: {self.description}"
    
class TrackableNutritionalInfo:
    def __init__(self, food_id, food_description):
        self.food_id = food_id
        self.food_description = food_description
        self.protein = None
        self.total_fat = None
        self.total_carbohydrate = None
        self.energy_kilocalories = None
        self.total_sugars = None
        self.total_dietary_fiber = None
        self.calcium = None
        self.iron = None
        self.magnesium = None
        self.potassium = None
        self.sodium = None
        self.alpha_tocopherol = None
        self.vitamin_d = None
        self.vitamin_c = None
        self.total_folacin = None
        self.vitamin_b12 = None
        self.vitamin_k = None
        self.total_trans_fatty_acids = None
        self.total_saturated_fatty_acids = None
        self.retinol_activity_equivalents = None

    def __repr__(self):
        return (f"Nutritional Information for FoodID {self.food_id}:\n"
                f"Description: {self.food_description}\n"
                f"Protein: {self.protein} g\n"
                f"Total Fat: {self.total_fat} g\n"
                f"Carbohydrates: {self.total_carbohydrate} g\n"
                f"Energy: {self.energy_kilocalories} kcal\n"
                f"Sugars: {self.total_sugars} g\n"
                f"Dietary Fiber: {self.total_dietary_fiber} g\n"
                f"Calcium: {self.calcium} mg\n"
                f"Iron: {self.iron} mg\n"
                f"Magnesium: {self.magnesium} mg\n"
                f"Potassium: {self.potassium} mg\n"
                f"Sodium: {self.sodium} mg\n"
                f"Vitamin E: {self.alpha_tocopherol} mg\n"
                f"Vitamin C: {self.vitamin_c} mg\n"
                f"Vitamin D: {self.vitamin_d} IU\n"
                f"Folate: {self.total_folacin} µg\n"
                f"Vitamin B12: {self.vitamin_b12} µg\n"
                f"Vitamin K: {self.vitamin_k} g\n"
                f"Trans Fats: {self.total_trans_fatty_acids} g\n"
                f"Saturated Fats: {self.total_saturated_fatty_acids} g\n"
                f"Vitamin A: {self.retinol_activity_equivalents} µg")

class NutrientUnits:
    def __init__(self):
        self.protein = "g"
        self.total_fat = "g"
        self.total_carbohydrate = "g"
        self.energy_kilocalories = "kcal"
        self.total_sugars = "g"
        self.total_dietary_fiber = "g"
        self.calcium = "mg"
        self.iron = "mg"
        self.magnesium = "mg"
        self.potassium = "mg"
        self.sodium = "mg"
        self.alpha_tocopherol = "mg"  # Vitamin E
        self.vitamin_d = "IU"
        self.vitamin_c = "mg"
        self.total_folacin = "µg" # Folate
        self.vitamin_b12 = "µg"
        self.vitamin_k = "g"
        self.total_trans_fatty_acids = "g"
        self.total_saturated_fatty_acids = "g"
        self.retinol_activity_equivalents = "µg"  # Vitamin A