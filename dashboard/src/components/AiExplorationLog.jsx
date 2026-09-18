import React, { useState } from 'react'
import { 
  Smartphone, 
  Brain, 
  MousePointer, 
  Download, 
  Check, 
  ChevronDown 
} from 'lucide-react'

export default function AiExplorationLog({ logs = [] }) {
  const [filter, setFilter] = useState('all')

  const filteredLogs = logs.filter(log => {
    if (filter === 'decisions') return log.type === 'decision'
    if (filter === 'actions') return log.type === 'action'
    if (filter === 'screens') return log.type === 'screen'
    return true
  })

  const getLogIcon = (type) => {
    if (type === 'decision') return <Brain size={16} color="#c084fc" />
    if (type === 'action') return <MousePointer size={16} color="#38bdf8" />
    return <Smartphone size={16} color="#94a3b8" />
  }

  return (
    <div className="ai-log-card">
      <div className="log-header-row">
        <div>
          <div className="log-heading-title">AI Exploration Log</div>
          <div className="log-heading-sub">Real-time steps taken by the autonomous agent</div>
        </div>

        <div className="log-actions-bar">
          <div className="badge-complete-pill">
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e' }}></span>
            <span>Exploration complete</span>
          </div>

          <div className="badge-live-pill">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#38bdf8' }}></span>
            <span>Live</span>
          </div>

          <select 
            className="select-all-steps"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Steps</option>
            <option value="decisions">Decisions Only</option>
            <option value="actions">Actions Only</option>
            <option value="screens">Screens Only</option>
          </select>

          <button className="btn-icon-subtle" title="Export log">
            <Download size={14} />
          </button>
        </div>
      </div>

      <div className="log-table">
        {filteredLogs.map((log, idx) => (
          <div key={idx} className="log-row">
            <div className="log-timestamp">{log.time}</div>
            <div className="log-type-icon">
              {getLogIcon(log.type)}
            </div>
            <div className="log-main-content">
              <div className="log-main-title">{log.title}</div>
              <div className="log-main-desc">{log.desc}</div>
            </div>
            <div className={`log-badge-status ${log.statusType}`}>
              {log.status === 'Success' && <Check size={11} strokeWidth={3} />}
              <span>{log.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
