import requests
import json

def test_advanced_search(query):
    url = "http://127.0.0.1:8000/advanced_search"
    params = {"query": query}
    response = requests.get(url, params=params)
    print("Status Code:", response.status_code)
    try:
        data = response.json()
        print("Response JSON:")
        print(json.dumps(data, indent=2))
    except Exception as e:
        print("Error parsing response:", e)

if __name__ == "__main__":
    # Change the query as needed for testing.
    test_advanced_search("english muffin")
