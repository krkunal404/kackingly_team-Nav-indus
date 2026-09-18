import React from 'react'
import { BookOpen, GitFork, Palette, FileText } from 'lucide-react'

export default function TabBar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'map', label: 'App Map', icon: BookOpen },
    { id: 'journeys', label: 'User Journeys', icon: GitFork },
    { id: 'design', label: 'Design System', icon: Palette },
    { id: 'docs', label: 'Docs & Onboarding', icon: FileText },
  ]

  return (
    <nav className="nav-tab-pills">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            className={`nav-tab-btn ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <Icon size={15} />
            <span>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
