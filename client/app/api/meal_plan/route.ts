import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { groceryList } = await request.json();
    const URL = "http://127.0.0.1:8000/meal_plan";
    const response = await fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ groceryList })
    });
    if (!response.ok) {0
        return NextResponse.json({ error: "Failed to fetch data"}, { status: 500});
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200});
}