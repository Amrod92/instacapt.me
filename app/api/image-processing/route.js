export async function POST(request) {
  // Simulate rate limit check
  const ip_address = request.headers.get("x-forwarded-for") ?? "";
  const success = true; // Simulating success
  const remaining = 50; // Example: 50 requests remaining
  const reset = Date.now() + 86400 * 1000; // Reset in 24 hours

  if (!success) {
    const now = Date.now();
    const retryAfter = Math.floor((reset - now) / 1000);
    return new Response("Too Many Requests", {
      status: 429,
      headers: {
        ["retry-after"]: `${retryAfter}`,
      },
    });
  }

  try {
    const data = await request.json();
    console.log("Received prompt:", data);

    // Simulate a dummy response from OpenAI
    const dummyCompletion = {
      choices: [
        {
          message: {
            role: "assistant",
            content: `Generated caption for: ${data.prompt} - Example caption 1`,
          },
        },
        {
          message: {
            role: "assistant",
            content: `Generated caption for: ${data.prompt} - Example caption 2`,
          },
        },
        {
          message: {
            role: "assistant",
            content: `Generated caption for: ${data.prompt} - Example caption 3`,
          },
        },
      ],
    };

    // Simulate remaining request count in headers
    return new Response(JSON.stringify(dummyCompletion.choices), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ["remaining-limit"]: `${remaining}`,
      },
    });
  } catch (error) {
    console.error("Error handling request:", error);
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
