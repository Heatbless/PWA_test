import React from 'react'
import { CloudOff } from 'lucide-react'

function OfflineBanner() {
  return (
    <div className="offline-banner">
      <CloudOff size={20} />
      <span>You're currently offline. Changes will sync when you're back online.</span>
    </div>
  )
}

export default OfflineBanner