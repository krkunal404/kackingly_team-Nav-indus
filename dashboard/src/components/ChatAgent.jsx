import React, { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react'

export default function ChatAgent({ appName }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: `Hello! I'm your AppMind In-App Agent. Once an app is scanned, you can ask me anything about how to navigate, perform actions, or find features.`
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const handleSend = async (e) => {
    e?.preventDefault()
    if (!input.trim() || loading) return

    const userText = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userText }])
    setLoading(true)

    try {
      const res = await fetch('http://localhost:8000/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userText })
      })

      if (res.ok) {
        const data = await res.json()
        setMessages(prev => [...prev, { role: 'ai', text: data.answer || "I couldn't find an answer for that." }])
      } else {
        const err = await res.json().catch(() => ({}))
        setMessages(prev => [
          ...prev, 
          { role: 'ai', text: err.detail || "Please run an autonomous scan first so I can inspect the app." }
        ])
      }
    } catch (error) {
      setMessages(prev => [
        ...prev, 
        { role: 'ai', text: "Unable to reach the AI agent backend. Please ensure python main.py is running." }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating Action Button */}
      <div className="chat-fab-wrapper">
        <button 
          className="chat-fab"
          onClick={() => setIsOpen(!isOpen)}
          title="Ask In-App Agent"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>

      {/* Slide-Up Chat Panel */}
      {isOpen && (
        <div className="chat-slide-panel">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-agent-avatar">
                <Bot size={18} />
              </div>
              <div>
                <div className="chat-title">AppMind In-App Agent</div>
                <div className="chat-subtitle">Connected to Knowledge Pack</div>
              </div>
            </div>
            <button className="btn-close" onClick={() => setIsOpen(false)}>
              <X size={14} />
            </button>
          </div>

          <div className="chat-messages-container">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-bubble ${msg.role}`}>
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="chat-bubble ai chat-typing-dots">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-bar" onSubmit={handleSend}>
            <input
              type="text"
              className="chat-input"
              placeholder="E.g., How do I buy shoes or open settings?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" className="btn-chat-send" disabled={loading || !input.trim()}>
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
