import { OpenAI } from "openai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "86400 s"), // Limit to 5 requests per day
    analytics: true,
});

export async function POST(request) {
    const ip_address = request.headers.get("x-forwarded-for") ?? "";

    const {success, remaining, reset} = await ratelimit.limit(ip_address);

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
        const prompt = data.prompt;
        const user_image = data.image_url
        const nVariants = data.generate_variants || 1; // Default to 1 variants if not specified

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              {type: "text", text: prompt},
              {
                type: "image_url",
                image_url: {
                  url: user_image,
                },
              },
            ],
          },
        ],
        n: nVariants, // Number of variants to generate
      });

        const results = completion.choices.map((choice) => choice.message);

        return new Response(JSON.stringify(results), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                ["remaining-limit"]: `${remaining}`,
            },
        });
    } catch (error) {
        console.error("Error calling OpenAI API:", error);

        // Handle OpenAI-specific errors
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

        return new Response(JSON.stringify({error: "An error occurred"}), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}