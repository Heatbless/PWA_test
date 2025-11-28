import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import TaskManager from './components/TaskManager'
import Header from './components/Header'
import OfflineBanner from './components/OfflineBanner'
import { registerSW } from 'virtual:pwa-register'

// Register service worker
if ('serviceWorker' in navigator) {
  registerSW({
    onNeedRefresh() {
      console.log('New content available, please refresh.')
    },
    onOfflineReady() {
      console.log('App ready to work offline.')
    },
  })
}

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine)
    }

    window.addEventListener('online', handleOnlineStatusChange)
    window.addEventListener('offline', handleOnlineStatusChange)

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange)
      window.removeEventListener('offline', handleOnlineStatusChange)
    }
  }, [])

  return (
    <Router>
      <div className="App">
        <Header isOnline={isOnline} />
        {!isOnline && <OfflineBanner />}
        <Routes>
          <Route path="/" element={<TaskManager isOnline={isOnline} />} />
          <Route path="/tasks" element={<TaskManager isOnline={isOnline} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App