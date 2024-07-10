import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const api_key = process.env.AI_API_KEY as string;

const gemini = new GoogleGenerativeAI(api_key);
const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

type FormData = {
  title: string;
  description: string;
  techStacks: string;
};

export async function POST(req: NextRequest, res: NextResponse) {
  const { title, description, techStacks } = await req.json();

  //   const screenshots = req.files as Express.Multer.File[];

  // Example prompt with screenshots information included
  const prompt = `Generate a GitHub README with the following details:
      Title: ${title}
      Description: ${description}
      Tech Stacks: ${techStacks}
      
      Please provide an installation guide, usage instructions, and other relevant details based on the provided tech stacks.`;

  try {
    const result = await model.generateContent(prompt);

    const readme = result.response.text().trim();
    console.log(readme);
    return Response.json({ readme, status: 2000 });
  } catch (error) {
    console.error("Error generating README:", error);
    Response.json({ error: "Error generating README" });
  }
}
