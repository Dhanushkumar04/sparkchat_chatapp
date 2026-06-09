import React from 'react'
import Avatar from './Avatar'

function ChatMessage({ text, name, logo, email, date, user }) {
  const isCurrentUser = email === user?.email

  // Format firebase timestamp safely
  const formatTime = (firebaseTimestamp) => {
    if (!firebaseTimestamp) return 'Just now'
    
    try {
      let d
      if (typeof firebaseTimestamp.toDate === 'function') {
        d = firebaseTimestamp.toDate()
      } else if (firebaseTimestamp.seconds) {
        d = new Date(firebaseTimestamp.seconds * 1000)
      } else {
        d = new Date(firebaseTimestamp)
      }

      if (isNaN(d.getTime())) return 'Just now'

      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } catch (e) {
      return 'Just now'
    }
  }

  const timeStr = formatTime(date)

  return (
    <div className={`message-row ${isCurrentUser ? 'message-row-right' : 'message-row-left'}`}>
      {/* User Avatar */}
      <Avatar src={logo} name={name} size={38} />

      {/* Message Info + Bubble */}
      <div className="message-content-wrapper">
        <div className="message-info-header">
          <span className="message-info-name">{isCurrentUser ? 'You' : name}</span>
          <span className="message-info-time">{timeStr}</span>
        </div>
        <div className={`message-bubble ${isCurrentUser ? 'message-user' : 'message-other'}`}>
          {text}
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
