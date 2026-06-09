import React, { useEffect, useState, useRef } from 'react'
import ChatMessage from './ChatMessage'
import Avatar from './Avatar'
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../config/firebase'
import { serverTimestamp } from "firebase/firestore"

function Chat({ user, onSignOut }) {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const messageRef = collection(db, "messages")
  const messagesEndRef = useRef(null)

  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior })
  }

  const handleSubmit = async () => {
    if (!text.trim()) return

    const messageText = text
    setText("") // Clear input immediately for better responsiveness

    try {
      await addDoc(messageRef, {
        text: messageText,
        email: user.email,
        logo: user.photoURL || "", // Empty string represents null, will trigger Avatar fallback initials
        name: user.displayName || "Anonymous",
        date: serverTimestamp()
      })
      setTimeout(() => scrollToBottom("smooth"), 100)
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  // Handle Enter keypress in input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  useEffect(() => {
    const q = query(messageRef, orderBy("date", "asc"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newMessages = querySnapshot.docs.map((doc) => doc.data())
      setMessages(newMessages)
      // Initial scroll to bottom (instant), subsequent scrolls smooth
      setTimeout(() => scrollToBottom("smooth"), 150)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="chat-app-layout">
      {/* Sidebar - Desktop only */}
      <aside className="chat-sidebar">
        <div>
          <div className="sidebar-header">
            <div className="app-brand">
              <span className="app-brand-logo">⚡</span>
              <span className="app-brand-title">SparkChat</span>
            </div>
          </div>
          <div className="sidebar-content">
            <h3 className="sidebar-section-title">Channels</h3>
            <nav className="channel-list">
              <div className="channel-item active">
                <span className="channel-hash">#</span> general-chat
              </div>
              <div className="channel-item">
                <span className="channel-hash">#</span> random
              </div>
              <div className="channel-item">
                <span className="channel-hash">#</span> announcements
              </div>
            </nav>
          </div>
        </div>

        {/* User profile section in sidebar footer */}
        <div className="sidebar-user">
          <div className="user-profile-info">
            <Avatar src={user.photoURL} name={user.displayName} size={38} />
            <div className="user-details">
              <span className="user-name-label">{user.displayName || "Anonymous"}</span>
              <span className="user-status-label">
                <span className="status-dot-pulse"></span>
                online
              </span>
            </div>
          </div>
          <button className="btn-logout" onClick={onSignOut} title="Sign Out">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="chat-container">
        {/* Chat Header Bar */}
        <header className="chat-header-bar">
          <div className="chat-header-info">
            <span className="chat-header-title"># general-chat</span>
            <span className="chat-header-status">
              • {messages.length} messages
            </span>
          </div>
          {/* Mobile Log Out - Shown when sidebar is hidden */}
          <div className="mobile-logout-wrapper">
            <button className="btn-logout" onClick={onSignOut}>
              Logout
            </button>
          </div>
        </header>

        {/* Messages Box */}
        <div className="chat-box">
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} user={user} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input container */}
        <div className="chat-input-container-wrapper">
          <div className="chat-input-container">
            <input 
              type="text" 
              className="chat-input"
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
            />
            <button  
              className="chat-send-btn" 
              onClick={handleSubmit}
              aria-label="Send message"
            >
              <svg 
                stroke="currentColor" 
                fill="none" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                height="1em" 
                width="1em" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Chat
