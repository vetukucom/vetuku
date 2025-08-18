import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@groq-sdk"

const groq = createClient({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { title, description, category, improvementType } = await request.json()

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
    }

    let prompt = ""

    switch (improvementType) {
      case "title":
        prompt = `Improve this classified ad title for the Indian market:
        Current Title: "${title}"
        Category: ${category}
        
        Requirements:
        - Make it more compelling and clickable
        - Keep under 60 characters
        - Include key selling points
        - Use Indian English
        - Make it SEO-friendly
        
        Return only the improved title, nothing else.`
        break

      case "description":
        prompt = `Improve this classified ad description for the Indian market:
        Title: "${title}"
        Current Description: "${description}"
        Category: ${category}
        
        Requirements:
        - Make it more persuasive and detailed
        - 200-350 words
        - Better structure and formatting
        - Include more selling points
        - Add trust signals
        - Use Indian English and local context
        - Include strong call-to-action
        
        Return only the improved description, nothing else.`
        break

      case "seo":
        prompt = `Optimize this classified ad for better search visibility in India:
        Title: "${title}"
        Description: "${description}"
        Category: ${category}
        
        Provide:
        1. SEO-optimized title (under 60 chars)
        2. SEO-optimized description with relevant keywords
        3. 8-10 relevant tags for Indian market
        
        Format as JSON with keys: title, description, tags`
        break

      default:
        return NextResponse.json({ error: "Invalid improvement type" }, { status: 400 })
    }

    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-70b-versatile",
      temperature: 0.7,
      max_tokens: improvementType === "seo" ? 800 : 500,
    })

    const content = response.choices[0]?.message?.content?.trim() || ""

    if (improvementType === "seo") {
      try {
        const parsed = JSON.parse(content)
        return NextResponse.json(parsed)
      } catch {
        return NextResponse.json({ error: "Failed to parse SEO optimization" }, { status: 500 })
      }
    }

    return NextResponse.json({
      [improvementType]: content,
    })
  } catch (error) {
    console.error("AI improvement error:", error)
    return NextResponse.json({ error: "Failed to improve ad content" }, { status: 500 })
  }
}
