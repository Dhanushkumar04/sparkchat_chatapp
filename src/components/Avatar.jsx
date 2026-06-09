import React, { useState } from 'react'

function Avatar({ src, name, size = 40 }) {
  const [hasError, setHasError] = useState(false)

  // Generate a beautiful, deterministic background color based on name hash
  const getBackgroundColor = (str) => {
    if (!str) return '#6366f1' // default indigo
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    
    // Curated premium/modern color palette (sleek and vibrant)
    const colors = [
      '#6366f1', // Indigo
      '#8b5cf6', // Violet
      '#ec4899', // Pink
      '#f43f5e', // Rose
      '#10b981', // Emerald
      '#06b6d4', // Cyan
      '#3b82f6', // Blue
      '#f59e0b', // Amber
      '#14b8a6', // Teal
      '#a855f7'  // Purple
    ]
    const index = Math.abs(hash) % colors.length
    return colors[index]
  }

  // Extract initials (up to 2 letters) from display name
  const getInitials = (str) => {
    if (!str) return '?'
    const cleanStr = str.trim()
    if (!cleanStr) return '?'
    
    const parts = cleanStr.split(/\s+/)
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return cleanStr.substring(0, Math.min(2, cleanStr.length)).toUpperCase()
  }

  const handleImageError = () => {
    setHasError(true)
  }

  const isPlaceholder = (url) => {
    if (!url) return true
    return (
      url.includes('placeholder.com') ||
      url.includes('via.placeholder') ||
      url === 'null' ||
      url === 'undefined'
    )
  }

  if (isPlaceholder(src) || hasError) {
    const displayName = name || 'Anonymous'
    const bgColor = getBackgroundColor(displayName)
    const initials = getInitials(displayName)
    
    return (
      <div 
        className="avatar-fallback" 
        style={{ 
          width: `${size}px`, 
          height: `${size}px`, 
          borderRadius: '50%', 
          backgroundColor: bgColor, 
          color: '#ffffff', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontWeight: '600', 
          fontSize: `${size * 0.4}px`,
          userSelect: 'none',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          border: '2px solid rgba(255, 255, 255, 0.15)',
          flexShrink: 0
        }}
        title={displayName}
      >
        {initials}
      </div>
    )
  }

  return (
    <img 
      src={src} 
      alt={name || 'User Avatar'} 
      className="avatar-img" 
      style={{ 
        width: `${size}px`, 
        height: `${size}px`, 
        borderRadius: '50%', 
        objectFit: 'cover',
        border: '2px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        flexShrink: 0
      }}
      referrerPolicy="no-referrer"
      onError={handleImageError}
    />
  )
}

export default Avatar
