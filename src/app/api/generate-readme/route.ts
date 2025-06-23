import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY as string);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.7,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
  },
});

type FormData = {
  title: string;
  description: string;
  techStacks: string;
  features?: string;
  requirements?: string;
  license?: string;
};

export const runtime = "edge";

async function handleGeminiStream(result: any) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        const chunkText = await chunk.text();
        controller.enqueue(encoder.encode(chunkText));
      }
      controller.close();
    },
  });
  return stream;
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, techStacks, features, requirements, license } =
      await req.json();

    if (!title || !description || !techStacks) {
      return new Response(
        JSON.stringify({
          error: "Title, description, and tech stacks are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const prompt = `**Generate a comprehensive GitHub README.md** for:
    # ${title}
    ## Description
    ${description}
    ## Tech Stack: ${techStacks}
    ${features ? `## Key Features\n${features}` : ""}
    ${requirements ? `## Requirements\n${requirements}` : ""}
    ${license ? `## License\n${license}` : ""}
    
    Include these sections:
    1. Badges
    2. Features with emojis
    3. Installation with code blocks
    4. Usage examples
    5. Configuration
    6. Contributing
    7. License
    8. Screenshots placeholder
    9. Roadmap
    10. Support info
    Format professionally with proper Markdown.`;

    const result = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const stream = await handleGeminiStream(result);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Error generating README:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to generate README",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
