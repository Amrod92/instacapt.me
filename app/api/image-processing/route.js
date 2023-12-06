import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
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

    console.log(gpt_vision_response.choices[0].message);

    return new Response(
      JSON.stringify(gpt_vision_response.choices[0].message),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
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
