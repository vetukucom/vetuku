"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, RefreshCw, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AIAdGeneratorProps {
  categories: Array<{ id: string; name: string; slug: string }>
  onGenerated: (data: { title: string; description: string; tags: string[] }) => void
}

export default function AIAdGenerator({ categories, onGenerated }: AIAdGeneratorProps) {
  const [loading, setLoading] = useState(false)
  const [improving, setImproving] = useState(false)
  const [formData, setFormData] = useState({
    category: "",
    keywords: "",
    productType: "",
    condition: "",
    location: "",
  })
  const [generatedContent, setGeneratedContent] = useState({
    title: "",
    description: "",
    tags: [] as string[],
  })
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!formData.category || !formData.keywords) {
      toast({
        title: "Missing Information",
        description: "Please select a category and enter keywords.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/ai/generate-ad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to generate ad")
      }

      const data = await response.json()
      setGeneratedContent(data)
      onGenerated(data)

      toast({
        title: "Ad Generated!",
        description: "Your AI-powered ad content is ready.",
      })
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Please try again with different keywords.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImprove = async (type: "title" | "description" | "seo") => {
    if (!generatedContent.title || !generatedContent.description) {
      toast({
        title: "No Content to Improve",
        description: "Please generate content first.",
        variant: "destructive",
      })
      return
    }

    setImproving(true)
    try {
      const response = await fetch("/api/ai/improve-ad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: generatedContent.title,
          description: generatedContent.description,
          category: categories.find((c) => c.id === formData.category)?.name,
          improvementType: type,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to improve ad")
      }

      const data = await response.json()

      if (type === "seo") {
        setGeneratedContent(data)
        onGenerated(data)
      } else {
        const updatedContent = { ...generatedContent, [type]: data[type] }
        setGeneratedContent(updatedContent)
        onGenerated(updatedContent)
      }

      toast({
        title: "Content Improved!",
        description: `Your ${type} has been enhanced.`,
      })
    } catch (error) {
      toast({
        title: "Improvement Failed",
        description: "Please try again.",
        variant: "destructive",
      })
    } finally {
      setImproving(false)
    }
  }

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
      toast({
        title: "Copied!",
        description: "Content copied to clipboard.",
      })
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please copy manually.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
            AI Ad Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="keywords">Keywords *</Label>
              <Input
                id="keywords"
                placeholder="e.g., iPhone 13, excellent condition, blue"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="productType">Product Type</Label>
              <Input
                id="productType"
                placeholder="e.g., Smartphone, Laptop, Car"
                value={formData.productType}
                onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="condition">Condition</Label>
              <Select
                value={formData.condition}
                onValueChange={(value) => setFormData({ ...formData, condition: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Condition</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="likeNew">Like New</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Mumbai, Delhi, Bangalore"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          <Button onClick={handleGenerate} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Ad with AI
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Content */}
      {generatedContent.title && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Title */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Title</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleImprove("title")} disabled={improving}>
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Improve
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedContent.title, "title")}>
                    {copiedField === "title" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="font-medium">{generatedContent.title}</p>
                <p className="text-xs text-gray-500 mt-1">{generatedContent.title.length} characters</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Description</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleImprove("description")} disabled={improving}>
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Improve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(generatedContent.description, "description")}
                  >
                    {copiedField === "description" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="whitespace-pre-wrap">{generatedContent.description}</p>
                <p className="text-xs text-gray-500 mt-2">{generatedContent.description.length} characters</p>
              </div>
            </div>

            {/* Tags */}
            {generatedContent.tags.length > 0 && (
              <div>
                <Label>Suggested Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {generatedContent.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* SEO Optimization */}
            <div className="pt-4 border-t">
              <Button variant="outline" onClick={() => handleImprove("seo")} disabled={improving} className="w-full">
                {improving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    SEO Optimize All Content
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
