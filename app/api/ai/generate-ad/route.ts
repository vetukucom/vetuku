import { type NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { category, keywords, productType, condition, location } = await request.json()

    if (!category || !keywords) {
      return NextResponse.json({ error: "Category and keywords are required" }, { status: 400 })
    }

    // Generate title
    const titlePrompt = `Generate a compelling, SEO-friendly title for a classified ad in India. 
    Category: ${category}
    Keywords: ${keywords}
    Product Type: ${productType || ""}
    Condition: ${condition || ""}
    Location: ${location || ""}
    
    Requirements:
    - Maximum 60 characters
    - Include key selling points
    - Make it attractive to Indian buyers
    - Include condition if specified
    - Be specific and descriptive
    
    Return only the title, nothing else.`

    const titleResponse = await groq.chat.completions.create({
      messages: [{ role: "user", content: titlePrompt }],
      model: "llama-3.1-70b-versatile",
      temperature: 0.7,
      max_tokens: 100,
    })

    const title = titleResponse.choices[0]?.message?.content?.trim() || ""

    // Generate description
    const descriptionPrompt = `Generate a detailed, persuasive description for a classified ad in India.
    Category: ${category}
    Keywords: ${keywords}
    Product Type: ${productType || ""}
    Condition: ${condition || ""}
    Location: ${location || ""}
    Title: ${title}
    
    Requirements:
    - 150-300 words
    - Highlight key features and benefits
    - Include condition details if specified
    - Mention location context
    - Use Indian English and local terms
    - Include call-to-action
    - Be honest and trustworthy
    - Format with proper paragraphs
    
    Return only the description, nothing else.`

    const descriptionResponse = await groq.chat.completions.create({
      messages: [{ role: "user", content: descriptionPrompt }],
      model: "llama-3.1-70b-versatile",
      temperature: 0.8,
      max_tokens: 500,
    })

    const description = descriptionResponse.choices[0]?.message?.content?.trim() || ""

    // Generate relevant tags
    const tagsPrompt = `Generate 5-8 relevant tags for this classified ad in India:
    Category: ${category}
    Keywords: ${keywords}
    Product Type: ${productType || ""}
    
    Requirements:
    - Single words or short phrases
    - Relevant to Indian market
    - Include brand names if applicable
    - Include condition/quality terms
    - Include category-specific terms
    
    Return as comma-separated values only.`

    const tagsResponse = await groq.chat.completions.create({
      messages: [{ role: "user", content: tagsPrompt }],
      model: "llama-3.1-70b-versatile",
      temperature: 0.6,
      max_tokens: 100,
    })

    const tagsString = tagsResponse.choices[0]?.message?.content?.trim() || ""
    const tags = tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)

    return NextResponse.json({
      title,
      description,
      tags,
    })
  } catch (error) {
    console.error("AI generation error:", error)
    return NextResponse.json({ error: "Failed to generate ad content" }, { status: 500 })
  }
}
