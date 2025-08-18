"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Search, MoreVertical } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Message {
  id: string
  content: string
  sender_id: string
  receiver_id: string
  created_at: string
  sender_name: string
  receiver_name: string
}

interface Conversation {
  id: string
  other_user_id: string
  other_user_name: string
  last_message: string
  last_message_time: string
  unread_count: number
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    checkUser()
    fetchConversations()
  }, [])

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUser(user)
    setLoading(false)
  }

  const fetchConversations = async () => {
    // Mock data for demonstration
    const mockConversations: Conversation[] = [
      {
        id: "1",
        other_user_id: "user1",
        other_user_name: "Rajesh Kumar",
        last_message: "Is the car still available?",
        last_message_time: "2 hours ago",
        unread_count: 2,
      },
      {
        id: "2",
        other_user_id: "user2",
        other_user_name: "Priya Sharma",
        last_message: "Thanks for the quick response!",
        last_message_time: "1 day ago",
        unread_count: 0,
      },
      {
        id: "3",
        other_user_id: "user3",
        other_user_name: "Amit Singh",
        last_message: "Can we meet tomorrow?",
        last_message_time: "3 days ago",
        unread_count: 1,
      },
    ]
    setConversations(mockConversations)
  }

  const fetchMessages = async (conversationId: string) => {
    // Mock messages for demonstration
    const mockMessages: Message[] = [
      {
        id: "1",
        content: "Hi, I'm interested in your Honda City listing",
        sender_id: "user1",
        receiver_id: "current_user",
        created_at: "2024-01-15T10:00:00Z",
        sender_name: "Rajesh Kumar",
        receiver_name: "You",
      },
      {
        id: "2",
        content: "Hello! Yes, it's still available. Would you like to schedule a viewing?",
        sender_id: "current_user",
        receiver_id: "user1",
        created_at: "2024-01-15T10:05:00Z",
        sender_name: "You",
        receiver_name: "Rajesh Kumar",
      },
      {
        id: "3",
        content: "That would be great! Is tomorrow evening good for you?",
        sender_id: "user1",
        receiver_id: "current_user",
        created_at: "2024-01-15T10:10:00Z",
        sender_name: "Rajesh Kumar",
        receiver_name: "You",
      },
    ]
    setMessages(mockMessages)
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return

    // Mock sending message
    const newMsg: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender_id: "current_user",
      receiver_id: "user1",
      created_at: new Date().toISOString(),
      sender_name: "You",
      receiver_name: "Rajesh Kumar",
    }

    setMessages((prev) => [...prev, newMsg])
    setNewMessage("")
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.other_user_name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Please Login</h2>
              <p className="text-gray-600 mb-6">You need to be logged in to access your messages.</p>
              <Button asChild>
                <a href="/auth/login">Login</a>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Messages</h1>
          <p className="text-gray-600">Communicate with buyers and sellers</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Conversations</span>
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </CardTitle>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => {
                      setSelectedConversation(conversation.id)
                      fetchMessages(conversation.id)
                    }}
                    className={`p-4 cursor-pointer hover:bg-gray-50 border-b ${
                      selectedConversation === conversation.id ? "bg-blue-50 border-blue-200" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage
                          src={`/placeholder-40x40.png?height=40&width=40&text=${conversation.other_user_name.charAt(0)}`}
                        />
                        <AvatarFallback>{conversation.other_user_name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate">{conversation.other_user_name}</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{conversation.last_message_time}</span>
                            {conversation.unread_count > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {conversation.unread_count}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.last_message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2">
            {selectedConversation ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40&text=R" />
                      <AvatarFallback>R</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">Rajesh Kumar</CardTitle>
                      <p className="text-sm text-gray-500">Online</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0 flex flex-col h-96">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender_id === "current_user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender_id === "current_user"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender_id === "current_user" ? "text-blue-100" : "text-gray-500"
                            }`}
                          >
                            {new Date(message.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={sendMessage} size="sm">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center text-gray-500">
                  <p className="text-lg font-medium mb-2">Select a conversation</p>
                  <p className="text-sm">Choose a conversation from the left to start messaging</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
