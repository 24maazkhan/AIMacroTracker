import openai
import json
from config import openai_api_key
from mealplanner_util.openai_prompt import generate_meal_planner_prompt

def clean_response(raw):
    if raw.startswith("```"):
        lines = raw.splitlines()
        if lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].startswith("```"):
            lines = lines[:-1]
        return "\n".join(lines).strip()
    return raw.strip()

async def get_meal_plan(grocery_list, macro_targets):
    client = openai.AsyncClient(api_key=openai_api_key)
    
    # Generate the prompt from the provided grocery list and macro targets
    prompt = generate_meal_planner_prompt(grocery_list, macro_targets)
    print("Generated Prompt:\n", prompt)
    
    # Call the OpenAI API using the async client
    response = await client.chat.completions.create(
        model="gpt-4-turbo-2024-04-09",
        messages=[
            {"role": "system", "content": "You are an assistant that generates weekly meal plans in JSON format."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.4,
    )
    
    # Extract the output content from the API response
    output = response.choices[0].message.content
    print("\nMeal Plan Response:")
    print(output)
    
    # Clean and parse the JSON response
    cleaned_output = clean_response(output)
    try:
        meal_plan = json.loads(cleaned_output)
    #    print("\nParsed Meal Plan:")
    #    print(json.dumps(meal_plan, indent=2))
    except json.JSONDecodeError as e:
        print("❌ Failed to parse the cleaned response as JSON.")
        print("Error:", e)
        meal_plan = None
    
    await client.close()
    return meal_plan
