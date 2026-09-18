import { useState, useEffect, useRef } from 'react'
import { Play, Activity, Smartphone, MessageSquare, Code2, RefreshCw } from 'lucide-react'
import './index.css'

function App() {
  const [scanning, setScanning] = useState(false)
  const [logs, setLogs] = useState([])
  const [knowledge, setKnowledge] = useState(null)
  const [activeScreen, setActiveScreen] = useState(null)
  
  // Chat state
  const [question, setQuestion] = useState('')
  const [chat, setChat] = useState([])
  const [asking, setAsking] = useState(false)
  
  const logRef = useRef(null)

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [logs])

  const startScan = async () => {
    setScanning(true)
    setLogs([])
    setKnowledge(null)
    setActiveScreen(null)
    setChat([])
    
    try {
      const eventSource = new EventSource('http://localhost:8000/api/scan')
      
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data)
        setLogs(prev => [...prev, data.status])
        
        if (data.done) {
          eventSource.close()
          setScanning(false)
          fetchKnowledge()
        }
      }
      
      eventSource.onerror = () => {
        eventSource.close()
        setScanning(false)
        setLogs(prev => [...prev, "Error connecting to autonomous explorer."])
      }
    } catch (err) {
      setScanning(false)
      setLogs(prev => [...prev, "Failed to start scan."])
    }
  }

  const fetchKnowledge = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/knowledge')
      if (res.ok) {
        const data = await res.json()
        setKnowledge(data)
        if (data.screens && data.screens.length > 0) {
          setActiveScreen(data.screens[0])
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  const askAgent = async (e) => {
    e.preventDefault()
    if (!question.trim()) return
    
    const q = question
    setQuestion('')
    setChat(prev => [...prev, { role: 'user', text: q }])
    setAsking(true)
    
    try {
      const res = await fetch('http://localhost:8000/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q })
      })
      const data = await res.json()
      setChat(prev => [...prev, { role: 'ai', text: data.answer }])
    } catch (err) {
      setChat(prev => [...prev, { role: 'ai', text: "Error connecting to AI Agent." }])
    } finally {
      setAsking(false)
    }
  }

  return (
    <div className="app-container">
      <header>
        <h1>AppMind</h1>
        <p>Autonomously explore and understand any Android app</p>
      </header>

      <div className="dashboard-grid">
        {/* Left Column - Controls & Status */}
        <div className="left-panel">
          <div className="card">
            <h2><Activity size={20} color="#c084fc" /> Autonomous Scan</h2>
            
            <button 
              className="btn-primary" 
              onClick={startScan}
              disabled={scanning}
            >
              {scanning ? <RefreshCw className="spinner" size={18} /> : <Play size={18} />}
              {scanning ? 'Scanning...' : 'START AUTONOMOUS SCAN'}
            </button>
            
            {logs.length > 0 && (
              <div className="status-log" ref={logRef}>
                {logs.map((log, i) => (
                  <div key={i} className="log-entry">> {log}</div>
                ))}
              </div>
            )}
            
            {knowledge && (
              <div className="stat-grid">
                <div className="stat-item">
                  <div className="stat-value">{knowledge.scan_metadata.screens_discovered}</div>
                  <div className="stat-label">Screens</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{knowledge.scan_metadata.elements_discovered}</div>
                  <div className="stat-label">Elements</div>
                </div>
              </div>
            )}
          </div>
          
          {knowledge && (
            <div className="card" style={{ marginTop: '1.5rem' }}>
              <h2><MessageSquare size={20} color="#6366f1" /> Ask App Agent</h2>
              <div className="chat-box">
                <div className="chat-messages">
                  {chat.length === 0 && (
                    <div style={{ color: '#94a3b8', textAlign: 'center', marginTop: '2rem' }}>
                      Ask me anything about how to use {knowledge.app.name}.
                    </div>
                  )}
                  {chat.map((msg, i) => (
                    <div key={i} className={`msg ${msg.role}`}>
                      {msg.text}
                    </div>
                  ))}
                  {asking && <div className="msg ai">Thinking...</div>}
                </div>
                <form className="chat-input" onSubmit={askAgent}>
                  <input 
                    type="text" 
                    placeholder="E.g., How do I change settings?" 
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    disabled={asking}
                  />
                  <button type="submit" disabled={asking}>Ask</button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Graph & Rebuild */}
        <div className="right-panel">
          {knowledge ? (
            <>
              <div className="card">
                <h2><Code2 size={20} color="#10b981" /> App Knowledge Graph</h2>
                <div className="graph-view" style={{ flexDirection: 'column', gap: '10px', padding: '20px' }}>
                   {knowledge.screens.map((screen, idx) => (
                     <div 
                        key={screen.screen_id} 
                        className={`node ${activeScreen?.screen_id === screen.screen_id ? 'active' : ''}`}
                        onClick={() => setActiveScreen(screen)}
                     >
                       {screen.name}
                     </div>
                   ))}
                   <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '1rem' }}>
                     Click a node to view its AI-generated profile and UI Rebuild.
                   </p>
                </div>
              </div>

              {activeScreen && (
                <div className="card screen-profile">
                  <h2><Smartphone size={20} /> Screen Profile: {activeScreen.name}</h2>
                  <div className="profile-grid">
                    <div>
                      <h4 style={{ color: '#c084fc', marginBottom: '0.5rem' }}>Purpose</h4>
                      <p style={{ marginBottom: '1rem' }}>{activeScreen.purpose}</p>
                      
                      <h4 style={{ color: '#c084fc', marginBottom: '0.5rem' }}>Elements Discovered</h4>
                      <div>
                        {activeScreen.elements.map((el, i) => (
                          <span key={i} className="pill">{el.label || el.type}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                       <h4 style={{ color: '#10b981', marginBottom: '0.5rem' }}>Rebuild Demo</h4>
                       <div className="rebuild-demo" style={{
                         backgroundColor: activeScreen.design?.background_color || '#fff',
                         fontFamily: activeScreen.design?.font_family || 'sans-serif',
                       }}>
                         <h3>{knowledge.app.name}</h3>
                         <div style={{ color: '#666', marginBottom: '2rem' }}>{activeScreen.name}</div>
                         
                         {activeScreen.elements.filter(e => e.interactive).map((el, i) => (
                           <button key={i} className="rebuild-btn" style={{
                             backgroundColor: activeScreen.design?.primary_color || '#6750A4',
                             borderRadius: activeScreen.design?.corner_style === 'rounded' ? '24px' : '4px'
                           }}>
                             {el.label || el.type}
                           </button>
                         ))}
                       </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
             <div className="card" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{ textAlign: 'center', color: '#64748b' }}>
                 <Activity size={48} style={{ margin: '0 auto', opacity: 0.5 }} />
                 <p style={{ marginTop: '1rem' }}>Run a scan to generate the App Knowledge Graph</p>
               </div>
             </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
