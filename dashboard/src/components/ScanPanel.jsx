import React from 'react'
import { 
  Play, 
  RefreshCw, 
  Smartphone, 
  Check, 
  FolderSync, 
  Tv, 
  MessageSquare, 
  GitFork, 
  Target 
} from 'lucide-react'

export default function ScanPanel({ scanning, onStartScan, appData, scanFinished = true }) {
  const screensCount = appData?.screensCount || 8
  const elementsCount = appData?.elementsCount || 47
  const journeysCount = appData?.journeysCount || 12
  const actionsCount = appData?.actionsCount || 31

  return (
    <aside className="sidebar-col">
      {/* Target App Card */}
      <div className="ui-card">
        <div className="card-title-sm">Target App</div>
        <div className="app-target-header">
          <div className="android-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-4.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 2.23 12.95 2 12 2c-.96 0-1.86.23-2.66.63L7.85 1.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 4.26 6 6.01 6 8h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/>
            </svg>
          </div>
          <div>
            <div className="app-name-text">{appData?.name || 'DemoShop'}</div>
            <div className="app-version-sub">{appData?.version || 'v1.0.0'} | {screensCount} screens (estimated)</div>
          </div>
        </div>

        <button className="btn-change-apk" onClick={() => alert('DemoShop.apk is currently mounted for autonomous exploration.')}>
          <FolderSync size={13} />
          <span>Change APK</span>
        </button>

        <button 
          className="btn-start-scan" 
          onClick={onStartScan}
          disabled={scanning}
        >
          {scanning ? (
            <>
              <RefreshCw size={16} className="spinner" />
              <span>Scanning App...</span>
            </>
          ) : (
            <>
              <Play size={16} fill="currentColor" />
              <span>Start Autonomous Scan</span>
            </>
          )}
        </button>

        {scanFinished && (
          <div className="scan-complete-box">
            <div className="check-circle-green" style={{ marginTop: '2px' }}>
              <Check size={11} strokeWidth={3} />
            </div>
            <div>
              <div className="scan-complete-title">Scan Complete</div>
              <div className="scan-complete-desc">
                Exploration finished successfully<br />
                {screensCount} screens discovered
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Knowledge Discovered 2x2 Grid */}
      <div className="ui-card">
        <div className="card-title-sm">Knowledge Discovered</div>
        <div className="stat-2x2-grid">
          <div className="stat-item-box">
            <div className="stat-icon-wrap" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
              <Tv size={16} />
            </div>
            <div>
              <div className="stat-num-val">{screensCount}</div>
              <div className="stat-label-sub">Screens</div>
            </div>
          </div>

          <div className="stat-item-box">
            <div className="stat-icon-wrap" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
              <MessageSquare size={16} />
            </div>
            <div>
              <div className="stat-num-val">{elementsCount}</div>
              <div className="stat-label-sub">Elements</div>
            </div>
          </div>

          <div className="stat-item-box">
            <div className="stat-icon-wrap" style={{ background: 'rgba(20, 184, 166, 0.15)', color: '#2dd4bf' }}>
              <GitFork size={16} />
            </div>
            <div>
              <div className="stat-num-val">{journeysCount}</div>
              <div className="stat-label-sub">Journeys</div>
            </div>
          </div>

          <div className="stat-item-box">
            <div className="stat-icon-wrap" style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#facc15' }}>
              <Target size={16} />
            </div>
            <div>
              <div className="stat-num-val">{actionsCount}</div>
              <div className="stat-label-sub">Actions</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Explorer Status checklist */}
      <div className="ui-card">
        <div className="card-title-sm">AI Explorer Status</div>
        <div className="status-check-list">
          <div className="status-check-row">
            <div className="check-circle-green">
              <Check size={11} strokeWidth={3} />
            </div>
            <span>Connected to emulator</span>
          </div>

          <div className="status-check-row">
            <div className="check-circle-green">
              <Check size={11} strokeWidth={3} />
            </div>
            <span>App launched</span>
          </div>

          <div className="status-check-row">
            <div className="check-circle-green">
              <Check size={11} strokeWidth={3} />
            </div>
            <span>Exploration complete</span>
          </div>

          <div className="status-check-row">
            <div className="check-circle-green">
              <Check size={11} strokeWidth={3} />
            </div>
            <span>Knowledge pack generated</span>
          </div>
        </div>
      </div>

      {/* Quote card */}
      <div className="quote-box">
        "From unknown apps to actionable knowledge."
        <div className="quote-author">AppMind</div>
      </div>
    </aside>
  )
}
