import requests
import json

url = "http://127.0.0.1:8000/meal_plan"

data = {
    "food_ids": [4066, 125, 502435, 5841, 5284, 2140, 4471, 502484, 119, 2460],
    "macro_targets": {
        "calories": 2100,
        "protein": 150,
        "fat": 70,
        "carbohydrates": 250
    }
}

# Send the POST request
response = requests.post(url, json=data)
print("Status Code:", response.status_code)
try:
    data = response.json()
    print("Response JSON:")
    print(json.dumps(data, indent=2))
except Exception as e:
    print("Error parsing response:", e)
