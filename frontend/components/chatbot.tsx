'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, ArrowLeft, Mic, MicOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useHealth } from '@/lib/health-context'
import { generateChatResponse } from '@/lib/chatbot'
import type { ChatMessage } from '@/lib/types'

export function Chatbot() {
  const { healthData, setCurrentStep } = useHealth()
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your CycleIQ health assistant. I'm here to help you understand your health data and provide personalized insights. How can I help you today?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([
    "Tell me about my PCOS risk",
    "How is my iron level?",
    "Give me health tips"
  ])
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (messageText?: string) => {
    const text = messageText || inputValue.trim()
    if (!text) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    const response = generateChatResponse(text, healthData)

    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, assistantMessage])
    setIsTyping(false)
    
    if (response.suggestions) {
      setSuggestions(response.suggestions)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[var(--mint)] to-[var(--lavender)] border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setCurrentStep(5)}
                className="hover:bg-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="w-12 h-12 rounded-xl bg-white/30 backdrop-blur-sm flex items-center justify-center">
                <Bot className="w-7 h-7 text-[var(--mint-dark)]" />
              </div>
              <div>
                <CardTitle className="text-lg">CycleIQ Assistant</CardTitle>
                <p className="text-sm text-muted-foreground">Your AI Health Co-Pilot</p>
              </div>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-emerald-700">Online</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Messages */}
          <ScrollArea className="h-[500px] p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--mint)] to-[var(--lavender)] flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-[var(--mint-dark)]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-[var(--mint-dark)] to-[var(--lavender-dark)] text-white rounded-br-md'
                        : 'bg-muted/50 rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-[var(--coral)]/20 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-[var(--coral)]" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--mint)] to-[var(--lavender)] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-[var(--mint-dark)]" />
                  </div>
                  <div className="bg-muted/50 p-4 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="px-4 py-3 border-t bg-muted/30">
              <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(suggestion)}
                    className="px-3 py-1.5 text-xs rounded-full bg-white border border-border hover:border-[var(--mint-dark)] hover:bg-[var(--mint)]/20 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t bg-white/50">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about your health..."
                  className="pr-12 h-12 bg-white/80 rounded-xl"
                />
              </div>
              <Button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isTyping}
                className="h-12 w-12 rounded-xl bg-gradient-to-r from-[var(--mint-dark)] to-[var(--lavender-dark)] hover:opacity-90"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground mt-3">
              CycleIQ Assistant provides general health information. Always consult a healthcare professional for medical advice.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
