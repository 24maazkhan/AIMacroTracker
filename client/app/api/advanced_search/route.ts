import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new globalThis.URL(request.url);
  const query = url.searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
  }

  const apiURL = `http://127.0.0.1:8000/advanced_search?query=${encodeURIComponent(query)}`;

  const response = await fetch(apiURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }

  const data: { food_id: number; description: string }[] = await response.json();
  return NextResponse.json(data, { status: 200 });
}
