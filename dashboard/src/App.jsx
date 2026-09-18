import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import ScanPanel from './components/ScanPanel'
import TabBar from './components/TabBar'
import AppMapView from './components/AppMapView'
import ScreenSidebar from './components/ScreenSidebar'
import AiExplorationLog from './components/AiExplorationLog'
import JourneysView from './components/JourneysView'
import DesignSystemView from './components/DesignSystemView'
import DocsExportView from './components/DocsExportView'
import ChatAgent from './components/ChatAgent'
import ErrorBoundary from './components/ErrorBoundary'
import { 
  DEMOSHOP_APP, 
  DEMOSHOP_SCREENS, 
  INITIAL_AI_LOGS, 
  DEMOSHOP_JOURNEYS, 
  DEMOSHOP_DESIGN 
} from './data/demoShopData'
import './index.css'

export default function App() {
  const [activeTab, setActiveTab] = useState('map')
  const [screens, setScreens] = useState(DEMOSHOP_SCREENS)
  // Default to Home screen
  const [activeScreen, setActiveScreen] = useState(DEMOSHOP_SCREENS[0])
  const [logs, setLogs] = useState(INITIAL_AI_LOGS)
  const [scanning, setScanning] = useState(false)
  const [scanFinished, setScanFinished] = useState(true)

  // Current active screen index for "X of 6"
  const currentIndex = screens.findIndex(s => s.screen_id === activeScreen?.screen_id) + 1 || 1

  const handleNextScreen = () => {
    const cur = screens.findIndex(s => s.screen_id === activeScreen?.screen_id)
    const nextIdx = (cur + 1) % screens.length
    setActiveScreen(screens[nextIdx])
  }

  const handlePrevScreen = () => {
    const cur = screens.findIndex(s => s.screen_id === activeScreen?.screen_id)
    const prevIdx = (cur - 1 + screens.length) % screens.length
    setActiveScreen(screens[prevIdx])
  }

  const handleNavigateToScreenName = (name) => {
    if (!name) return
    const target = screens.find(s => s.name.toLowerCase() === name.toLowerCase())
    if (target) {
      setActiveScreen(target)
    }
  }

  // Interactive scan simulation
  const handleStartScan = () => {
    setScanning(true)
    setScanFinished(false)
    setLogs([])

    const simulatedSteps = [
      {
        time: "10:15:01",
        type: "screen",
        title: "Launched Android APK: DemoShop.apk",
        desc: "Attached accessibility tree observer via ADB emulator",
        status: "Success",
        statusType: "success"
      },
      {
        time: "10:15:03",
        type: "screen",
        title: "Captured screen: Home",
        desc: "Found 6 interactive elements. Fingerprint generated: fp_home_9a7e",
        status: "Success",
        statusType: "success"
      },
      {
        time: "10:15:05",
        type: "decision",
        title: "AI Decision",
        desc: '"Home has 3 primary navigation paths: Accounts, Payments, Profile. Prioritizing Payments flow."',
        status: "Reasoned",
        statusType: "reasoned"
      },
      {
        time: "10:15:07",
        type: "action",
        title: 'Performed action: tap "Payments"',
        desc: "Injected tap event into resource-id: nav_payments",
        status: "Success",
        statusType: "success"
      },
      {
        time: "10:15:09",
        type: "screen",
        title: "Navigated to: Payments",
        desc: "Found 5 interactive elements (Send Money, Pay Bills, Scan QR)",
        status: "Success",
        statusType: "success"
      },
      {
        time: "10:15:11",
        type: "decision",
        title: "AI Decision",
        desc: '"Send Money is a critical user transactional journey. Exploring form elements."',
        status: "Reasoned",
        statusType: "reasoned"
      },
      {
        time: "10:15:13",
        type: "action",
        title: 'Performed action: tap "Send Money"',
        desc: "Dispatched click on Send Money card",
        status: "Success",
        statusType: "success"
      },
      {
        time: "10:15:16",
        type: "screen",
        title: "Navigated to: Send Money",
        desc: "Found 8 elements (recipient, amount, note, continue). Passed form gate.",
        status: "Success",
        statusType: "success"
      },
      {
        time: "10:15:19",
        type: "action",
        title: 'Performed action: tap "Continue"',
        desc: "Triggered payment confirmation dialog",
        status: "Success",
        statusType: "success"
      },
      {
        time: "10:15:22",
        type: "screen",
        title: "Navigated to: Confirmation",
        desc: "Receipt generated. All 8 screens mapped with 47 UI elements.",
        status: "Success",
        statusType: "success"
      }
    ]

    let step = 0
    const interval = setInterval(() => {
      if (step < simulatedSteps.length) {
        setLogs(prev => [...prev, simulatedSteps[step]])
        step++
      } else {
        clearInterval(interval)
        setScanning(false)
        setScanFinished(true)
      }
    }, 600)
  }

  // Download Knowledge Pack JSON
  const handleDownloadKnowledgePack = () => {
    const knowledgePack = {
      app: DEMOSHOP_APP,
      screens: screens,
      journeys: DEMOSHOP_JOURNEYS,
      design_system: DEMOSHOP_DESIGN,
      scan_metadata: {
        screens_discovered: 8,
        elements_discovered: 47,
        journeys_mapped: 12,
        actions_extracted: 31
      }
    }

    const blob = new Blob([JSON.stringify(knowledgePack, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `DemoShop_Knowledge_Pack.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="app-wrapper">
      {/* Top Bar */}
      <Header onDownloadPack={handleDownloadKnowledgePack} />

      {/* Main Grid: Left Sidebar + Center/Right Area */}
      <div className="main-dashboard-grid">
        {/* Left Column: Sidebar with Target App, Stats & Explorer Status */}
        <ScanPanel 
          scanning={scanning} 
          onStartScan={handleStartScan} 
          appData={DEMOSHOP_APP}
          scanFinished={scanFinished}
        />

        {/* Center + Right Section */}
        <div className="center-right-col" style={{ gridColumn: 'span 2' }}>
          {/* Top Tabs */}
          <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

          <ErrorBoundary>
            {/* Tab 1: Application Map & Screen Details */}
            {activeTab === 'map' && (
              <>
                <div className="map-details-split">
                  {/* Center: Interactive Graph Map */}
                  <AppMapView 
                    screens={screens} 
                    activeScreen={activeScreen} 
                    onSelectScreen={setActiveScreen} 
                  />

                  {/* Right: Screen Details with Realistic Phone Preview */}
                  <ScreenSidebar 
                    screen={activeScreen}
                    totalScreens={screens.length}
                    currentIndex={currentIndex}
                    onNext={handleNextScreen}
                    onPrev={handlePrevScreen}
                    onNavigateToScreen={handleNavigateToScreenName}
                  />
                </div>

                {/* Bottom: AI Exploration Log */}
                <AiExplorationLog logs={logs} />
              </>
            )}

            {/* Tab 2: User Journeys */}
            {activeTab === 'journeys' && (
              <JourneysView />
            )}

            {/* Tab 3: Design System */}
            {activeTab === 'design' && (
              <DesignSystemView 
                knowledge={{ design_system: DEMOSHOP_DESIGN, screens: screens }} 
              />
            )}

            {/* Tab 4: Docs & Onboarding Generator */}
            {activeTab === 'docs' && (
              <DocsExportView 
                knowledge={{ app: DEMOSHOP_APP, screens: screens, journeys: DEMOSHOP_JOURNEYS }} 
              />
            )}

          </ErrorBoundary>
        </div>
      </div>

      {/* Floating In-App Agent FAB */}
      <ChatAgent appName="FMovies" />
    </div>
  )
}
