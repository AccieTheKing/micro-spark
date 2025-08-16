// app/api/chat/route.ts
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as unknown;
    const { query } = body as { query: string };

    if (!query) {
      return new Response(
        JSON.stringify({ error: "Query field is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    console.log("Received query:", query);

    // Call your backend Node.js API
    const response = await fetch("http://localhost:3001/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }

    const backendResponse = (await response.json()) as Record<string, unknown>;
    console.log("Backend response:", backendResponse);

    // Return the response from your backend
    return new Response(JSON.stringify(backendResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
