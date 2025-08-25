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
    const controller = new AbortController();
    const timeoutMs = parseInt(process.env.API_TIMEOUT ?? "60000");
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    let response: Response;
    try {
      const ollamaHost = process.env.OLLAMA_HOST ?? "ragxollama";
      const ollamaPort = process.env.OLLAMA_PORT ?? "3001";
      const ollamaModel = process.env.OLLAMA_MODEL ?? "llama3.2:1b";

      response = await fetch(`http://${ollamaHost}:${ollamaPort}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
          model: ollamaModel, // Specify the model to use
        }),
        signal: controller.signal,
        keepalive: true,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Backend API error: ${response.status}`);
      }
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(
          "Request timeout: Backend API took too long to respond",
        );
      }
      throw error;
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
