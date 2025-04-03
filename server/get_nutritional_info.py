import mysql.connector
import pandas as pd
from config import host, user, password, database, port
from class_def import FoodItemNutrition

def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host=host,
            port=port,
            user=user, 
            password=password,
            database=database
        )
        return conn
    except mysql.connector.Error as err:
        print(f"Error establishing database connection: {err}")
        return None

# Load food description data
df_food = pd.read_csv("food_name.csv", encoding="ISO-8859-1")

def get_nutritional_info(food_id):
    conn = get_db_connection()
    try:
        cursor = conn.cursor()

        # Define NutrientID Mappings to Class
        nutrient_mapping = {
            203: "protein",
            204: "total_fat",
            205: "total_carbohydrate",
            208: "energy_kilocalories",
            269: "total_sugars",
            291: "total_dietary_fiber",
            301: "calcium",
            303: "iron",
            304: "magnesium",
            306: "potassium",
            307: "sodium",
            323: "alpha_tocopherol",
            324: "vitamin_d",
            401: "vitamin_c",
            417: "total_folacin",
            418: "vitamin_b12",
            430: "vitamin_k",
            605: "total_trans_fatty_acids",
            606: "total_saturated_fatty_acids",
            814: "retinol_activity_equivalents"
        }

        # Query For Nutrient Values
        query = f"""
            SELECT NutrientID, NutrientValue
            FROM nutrient_amount
            WHERE FoodID = %s AND NutrientID IN ({','.join(['%s'] * len(nutrient_mapping))})
        """
        cursor.execute(query, (food_id, *nutrient_mapping.keys()))
        results = cursor.fetchall()

        # Retrieve Food Description
        food_desc_row = df_food[df_food["FoodID"] == food_id]
        if not food_desc_row.empty:
            food_description = food_desc_row.iloc[0]["FoodDescription"]
        else:
            food_description = "Unknown Food"

        # Initialize Object
        nutritional_info = FoodItemNutrition(food_id, food_description)

        # Populate Object with Nutrient Values
        for nutrient_id, nutrient_value in results:
            attribute_name = nutrient_mapping.get(nutrient_id)
            if attribute_name:
                setattr(nutritional_info, attribute_name, nutrient_value)

        return nutritional_info

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None
    finally:
        if conn:
            conn.close()