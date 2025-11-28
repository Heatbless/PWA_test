import React from 'react'
import { Wifi, WifiOff } from 'lucide-react'

function Header({ isOnline }) {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1>React PWA Tasks</h1>
          <div className={`status-indicator ${isOnline ? 'status-online' : 'status-offline'}`}>
            {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
            <span>{isOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header