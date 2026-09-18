import React from 'react'
import { Cpu, Moon, Download } from 'lucide-react'

export default function Header({ onDownloadPack }) {
  return (
    <header className="top-nav">
      <div className="brand-section">
        <div className="brand-icon-box">
          <Cpu size={22} color="#fff" />
        </div>
        <div>
          <div className="brand-title">AppMind</div>
          <div className="brand-subtitle">Zero-Touch Android App Understanding</div>
        </div>
      </div>

      <div className="top-actions">
        <button className="btn-icon-subtle" title="Toggle dark theme">
          <Moon size={16} />
        </button>
        <button className="btn-download-pack" onClick={onDownloadPack}>
          <Download size={14} />
          <span>Download Knowledge Pack</span>
        </button>
      </div>
    </header>
  )
}
