import { OpenAI } from 'openai';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '86400 s'),
  analytics: true,
});

export async function POST(request) {
  const ip_address = request.headers.get('x-forwarded-for') ?? '';
  const { success, reset, remaining } = await ratelimit.limit(ip_address);

  if (!success) {
    const now = Date.now();
    const retryAfter = Math.floor((reset - now) / 1000);
    return new Response('Too Many Requests', {
      status: 429,
      headers: {
        ['retry-after']: `${retryAfter}`,
      },
    });
  }
  try {
    const data = await request.json();
    console.log(data.prompt);
    const gpt_vision_response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      max_tokens: 150,
      messages: [
        {
          role: 'system',
          content: data.prompt,
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: data.prompt },
            {
              type: 'image_url',
              image_url: data.image_url,
            },
          ],
        },
      ],
    });

    return new Response(
      JSON.stringify(gpt_vision_response.choices[0].message),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ['remaning-limit']: `${remaining}`,
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
