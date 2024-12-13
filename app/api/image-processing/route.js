import { OpenAI } from "openai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "86400 s"),
  analytics: true,
});

export async function POST(request) {
  const ip_address = request.headers.get("x-forwarded-for") ?? "";
  const { success, reset, remaining } = await ratelimit.limit(ip_address);

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
    console.log(data);
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-4o-mini",
    //   n: 3, // Request 3 results
    //   messages: [
    //     {
    //       role: "user",
    //       content: [
    //         { type: "text", text: data.prompt },
    //         {
    //           type: "image_url",
    //           image_url: {
    //             url: data.image_url,
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // });

    // Return all 3 completions
    const results = completion.choices.map((choice) => choice.message);

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ["remaining-limit"]: `${remaining}`,
      },
    });
  } catch (error) {
    // Handle insufficient quota specifically
    if (error.status === 429 && error.error?.type === "insufficient_quota") {
      return new Response(
        JSON.stringify({
          error: "Quota exceeded. Please check your plan and billing details.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // General error response
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
