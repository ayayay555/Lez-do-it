import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { targetPath, files, formData, selectedTheme } = await req.json();

    if (!targetPath) return NextResponse.json({ error: "Build path missing." }, { status: 400 });

    const themeDirectives: Record<string, string> = {
      "Tech-Chic / Studio": "Warm ivory background (#F9F9F7), deep charcoal text, vibrant indigo accents (#4F46E5). Soft shadows, rounded borders (1.5rem). Typography: Bold Serif/Display font for headers, clean sans-serif for body. Feel: Premium, agency, modern.",
      "Cyberpunk / Industrial": "Pitch black background (#040404), pure white text, neon accents (electric yellow or bright cyan). Brutalist grids, harsh visible borders, zero border radius (0rem). Typography: Monospace fonts (Space Mono/IBM Plex) for everything. Feel: Raw, developer, high-tech.",
      "Brutalist / Editorial": "Off-white or light gray background, stark black text, bright red or blue primary accents. Massive, overlapping typography, tight letter spacing, high contrast, sharp edges (no rounded corners). Typography: Very heavy sans-serif. Feel: Magazine, bold, unignorable.",
      "Friendly SaaS / Playful": "Soft pastel background (light lavender or mint), soft dark text, playful bright accents (coral, peach). 'Squircle' shapes, very rounded borders (2rem+), floating floating elements with large soft shadows. Typography: Rounded, friendly sans-serifs (Quicksand/Nunito style). Feel: Approachable, consumer-friendly, easy."
    };

    const activeThemeDNA = themeDirectives[selectedTheme] || themeDirectives["Tech-Chic / Studio"];

    const generateSystemPrompt = `
You are a Lead Frontend Architect at Consultly.io Studio. 
Your task is to generate a standalone 'index.html' for a high-converting business funnel based on the client's strategy questionnaire.

DESIGN DNA (${selectedTheme || "Default"}):
${activeThemeDNA}
- Technical: Output pure HTML. Include Tailwind CSS via CDN. Configure Tailwind colors and fonts in a script tag to match this DNA perfectly. Use Lucide CDN for icons if needed.
- Constraints: Do NOT output generic "AI slop". Make bold, decisive aesthetic choices based on this theme.

CONTENT ARCHITECTURE:
1. Hero: Bold hook, persuasive sub-headline, and a primary CTA.
2. Problem: Empathetically define the pain point.
3. Solution: Introduce the 'One Big Solution' based on their answers.
4. Trust: Testimonial/Social proof clusters or objection handling.
5. Offer: Clear pricing or next step.
6. Footer: Professional closure.

If images were provided, use them as './assets/FILENAME'.
Output ONLY the raw HTML starting with \`<!DOCTYPE html>\`. No markdown blocks. No explanations.
`;

    // Ensure directory exists
    const assetsDir = path.join(targetPath, "assets");
    await fs.mkdir(assetsDir, { recursive: true });

    // Write image files
    const fileNames = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const filePath = path.join(assetsDir, file.name);
        await fs.writeFile(filePath, Buffer.from(file.content, "base64"));
        fileNames.push(file.name);
      }
    }

    // Format questionnaire answers into a prompt
    const strategyContext = Object.entries(formData)
      .map(([question, answer]) => `Q: ${question}\nA: ${answer}`)
      .join("\n\n");

    const prompt = `
SYSTEM DIRECTIVE:
${generateSystemPrompt}

STRATEGY QUESTIONNAIRE RESULTS:
${strategyContext}

MEDIA ASSETS AVAILABLE (use as ./assets/filename):
${fileNames.length > 0 ? fileNames.join(", ") : "No specific images provided. Use CSS styling instead."}

Forge the final index.html now.
    `;

    // Verify API Key existence
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is missing in .env file.");
    }

    // Call the Google Generative AI API with the authorized Gemini 3 model
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let finalHtml = response.text().trim();

    // Clean markdown formatting if present
    if (finalHtml.startsWith("```html")) finalHtml = finalHtml.replace(/^```html\s*/, "").replace(/\s*```$/, "");
    else if (finalHtml.startsWith("```")) finalHtml = finalHtml.replace(/^```\s*/, "").replace(/\s*```$/, "");

    await fs.writeFile(path.join(targetPath, "index.html"), finalHtml, "utf-8");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("====== ASSEMBLY ERROR LOG ======");
    console.error(error);
    console.error("Stack trace:", error.stack);
    console.error("================================");
    return NextResponse.json({ error: error.message || "An unexpected error occurred during generation." }, { status: 500 });
  }
}
