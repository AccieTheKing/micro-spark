// app/api/chat/route.ts
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as unknown;

    const { query } = body as { query: string };

    if (!query) {
      console.log("No query provided, returning 400");
      return new Response(
        JSON.stringify({ error: "Query field is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Call your backend Node.js API
    const ollamaHost = process.env.OLLAMA_HOST;
    const ollamaModel = process.env.OLLAMA_MODEL;

    const url = `${ollamaHost}`;

    console.log("Calling URL:", url);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
          model: ollamaModel,
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response body:", errorText);
        throw new Error(`Backend API error: ${response.status} - ${errorText}`);
      }

      const backendResponse = (await response.json()) as Record<
        string,
        unknown
      >;
      console.log("Backend response:", backendResponse);

      // Return the response from your backend
      return new Response(JSON.stringify(backendResponse), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      });
    } catch (fetchError) {
      console.error("Fetch error:", fetchError);
      throw fetchError;
    }
  } catch (error) {
    console.error("=== CHAT API ERROR ===");
    console.error("Error type:", typeof error);
    console.error(
      "Error message:",
      error instanceof Error ? error.message : String(error),
    );
    console.error("Full error:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to process chat request",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
