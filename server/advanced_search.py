import pandas as pd
from class_def import FoodItem

# Load the CSV with the correct encoding
df = pd.read_csv("food_name.csv", encoding="ISO-8859-1")

def advanced_search(query):
    # Filter the DataFrame Based On Words in Query case insensitively
    words = query.lower().split()
    results = df[df["FoodDescription"].str.lower().apply(lambda x: all(word in x for word in words))]
    # Return Food Items List
    food_items = [FoodItem(food_id=row["FoodID"], description=row["FoodDescription"]) for _, row in results.iterrows()]
    return food_items

food = advanced_search("tomato ripe")
print(food)