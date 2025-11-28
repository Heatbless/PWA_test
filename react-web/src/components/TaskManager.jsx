import React, { useState, useEffect } from 'react'
import { Plus, Check, Trash2, CheckSquare, Download } from 'lucide-react'
import localforage from 'localforage'

// Configure localforage for offline storage
localforage.config({
  name: 'ReactPWATasks',
  storeName: 'tasks'
})

function TaskManager({ isOnline }) {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  // Load tasks from local storage on mount
  useEffect(() => {
    loadTasks()
  }, [])

  // Listen for install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      console.log('PWA install prompt triggered')
      e.preventDefault()
      setDeferredPrompt(e)
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      console.log('PWA was installed')
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
    
    // Check if already installed
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      console.log('PWA is running in standalone mode')
    }
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const loadTasks = async () => {
    try {
      const storedTasks = await localforage.getItem('taskList')
      if (storedTasks) {
        setTasks(storedTasks)
      }
    } catch (error) {
      console.error('Error loading tasks:', error)
    }
  }

  const saveTasks = async (updatedTasks) => {
    try {
      await localforage.setItem('taskList', updatedTasks)
      setTasks(updatedTasks)
    } catch (error) {
      console.error('Error saving tasks:', error)
    }
  }

  const addTask = async (e) => {
    e.preventDefault()
    if (inputValue.trim() === '') return

    const newTask = {
      id: Date.now(),
      title: inputValue.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    }

    const updatedTasks = [...tasks, newTask]
    await saveTasks(updatedTasks)
    setInputValue('')

    // Show notification if supported
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Task Added', {
        body: `New task: ${newTask.title}`,
        icon: '/pwa-192x192.png'
      })
    }
  }

  const toggleTask = async (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
    await saveTasks(updatedTasks)
  }

  const deleteTask = async (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId)
    await saveTasks(updatedTasks)
  }

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      console.log(`User response to the install prompt: ${outcome}`)
      setDeferredPrompt(null)
    }
  }

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        new Notification('Notifications Enabled', {
          body: 'You will now receive task notifications!',
          icon: '/pwa-192x192.png'
        })
      }
    }
  }

  return (
    <main className="task-manager">
      <div className="container">
        {/* Task Input Section */}
        <section className="task-input-section">
          <form onSubmit={addTask} className="task-input-form">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add a new task..."
              className="task-input"
              disabled={!isOnline && tasks.length === 0}
            />
            <button 
              type="submit" 
              className="add-button"
              disabled={inputValue.trim() === ''}
            >
              <Plus size={20} />
              Add Task
            </button>
          </form>
        </section>

        {/* Tasks List Section */}
        <section className="tasks-section">
          <div className="tasks-header">
            <h2>Your Tasks ({tasks.length})</h2>
          </div>
          
          {tasks.length === 0 ? (
            <div className="empty-state">
              <CheckSquare className="empty-state-icon" />
              <h3>No tasks yet</h3>
              <p>Add your first task to get started!</p>
            </div>
          ) : (
            <div className="tasks-list">
              {tasks.map(task => (
                <div key={task.id} className="task-item">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="task-checkbox"
                  />
                  <div className="task-content">
                    <div className={`task-title ${task.completed ? 'completed' : ''}`}>
                      {task.title}
                    </div>
                    <div className="task-date">
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="task-actions">
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="delete-button"
                      title="Delete task"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Install PWA Button */}
        {deferredPrompt && (
          <button onClick={handleInstall} className="install-button">
            <Download size={20} />
            Install as App
          </button>
        )}
        
        {/* PWA Status Indicator */}
        <div style={{ 
          position: 'fixed', 
          top: '10px', 
          right: '10px', 
          background: 'rgba(0,0,0,0.8)', 
          color: 'white', 
          padding: '8px 12px', 
          borderRadius: '20px', 
          fontSize: '12px',
          zIndex: 1000
        }}>
          {window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches 
            ? '📱 Running as App' 
            : '🌐 Running in Browser'
          }
        </div>

        {/* Mobile PWA Install Instructions */}
        {!deferredPrompt && !window.matchMedia('(display-mode: standalone)').matches && (
          <div style={{
            position: 'fixed',
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#2196f3',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            textAlign: 'center',
            maxWidth: '90%',
            zIndex: 1000
          }}>
            📱 <strong>Install as App:</strong><br/>
            iOS: Safari → Share → Add to Home Screen<br/>
            Android: Chrome → Menu → Add to Home screen
          </div>
        )}

        {/* Notification Permission Button (hidden, triggered automatically) */}
        {tasks.length === 1 && 'Notification' in window && Notification.permission === 'default' && (
          <button 
            onClick={requestNotificationPermission}
            style={{ display: 'none' }}
          >
            Enable Notifications
          </button>
        )}
      </div>
    </main>
  )
}

export default TaskManager