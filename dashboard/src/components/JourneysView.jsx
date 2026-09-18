import React, { useState, useEffect } from 'react'
import { 
  ArrowRight, 
  Play, 
  CreditCard, 
  User, 
  ShoppingBag, 
  ShoppingCart, 
  Clock, 
  Settings, 
  LogIn, 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft, 
  Send,
  CheckCircle2,
  FileText,
  Wifi,
  BatteryMedium
} from 'lucide-react'
import { DEMOSHOP_JOURNEYS } from '../data/demoShopData'

export default function JourneysView() {
  const [journeys, setJourneys] = useState(DEMOSHOP_JOURNEYS)
  const [selectedJourneyId, setSelectedJourneyId] = useState("j_01")
  const [activeStepIndex, setActiveStepIndex] = useState(2) // Default to step 3 ("Send Money") to match screenshot
  const [isPlaying, setIsPlaying] = useState(false)

  const currentJourney = journeys.find(j => j.id === selectedJourneyId) || journeys[0]
  const currentStep = currentJourney.steps[activeStepIndex] || currentJourney.steps[0]

  // Play journey animation
  const handlePlayJourney = () => {
    setIsPlaying(true)
    let idx = 0
    setActiveStepIndex(0)

    const interval = setInterval(() => {
      idx++
      if (idx < currentJourney.steps.length) {
        setActiveStepIndex(idx)
      } else {
        clearInterval(interval)
        setIsPlaying(false)
      }
    }, 1200)
  }

  const handlePrevStep = () => {
    setActiveStepIndex(prev => Math.max(0, prev - 1))
  }

  const handleNextStep = () => {
    setActiveStepIndex(prev => Math.min(currentJourney.steps.length - 1, prev + 1))
  }

  const getJourneyIcon = (iconName) => {
    switch (iconName) {
      case 'credit-card': return <CreditCard size={18} />
      case 'user': return <User size={18} />
      case 'shopping-bag': return <ShoppingBag size={18} />
      case 'shopping-cart': return <ShoppingCart size={18} />
      case 'clock': return <Clock size={18} />
      case 'settings': return <Settings size={18} />
      case 'log-in': return <LogIn size={18} />
      default: return <ArrowRight size={18} />
    }
  }

  // Mini Phone UI Renderer
  const renderMiniPhone = (phoneType, stepNum) => {
    switch (phoneType) {
      case 'home':
        return (
          <div className="mini-phone-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.55rem', fontWeight: 700 }}>
              <span>9:41</span>
              <span>DemoShop</span>
            </div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700 }}>Good morning!</div>
            <div style={{ background: '#4f46e5', color: '#fff', borderRadius: '6px', padding: '0.35rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.5rem', opacity: 0.8 }}>Total Balance</div>
              <div style={{ fontWeight: 800, fontSize: '0.75rem' }}>₹ 12,480.00</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3px' }}>
              <div style={{ flex: 1, background: '#e0e7ff', color: '#4338ca', padding: '2px', borderRadius: '4px', textAlign: 'center', fontSize: '0.48rem', fontWeight: 600 }}>Send</div>
              <div style={{ flex: 1, background: '#e0e7ff', color: '#4338ca', padding: '2px', borderRadius: '4px', textAlign: 'center', fontSize: '0.48rem', fontWeight: 600 }}>Bills</div>
              <div style={{ flex: 1, background: '#e0e7ff', color: '#4338ca', padding: '2px', borderRadius: '4px', textAlign: 'center', fontSize: '0.48rem', fontWeight: 600 }}>Accounts</div>
            </div>
            <div style={{ fontSize: '0.55rem', fontWeight: 700, marginTop: '2px' }}>Recent Activity</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.5rem' }}>
              <span>Amazon</span>
              <span style={{ fontWeight: 700 }}>-₹1,299</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.5rem' }}>
              <span>Spotify</span>
              <span style={{ fontWeight: 700 }}>-₹119</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.5rem' }}>
              <span>Zomato</span>
              <span style={{ fontWeight: 700 }}>-₹349</span>
            </div>
          </div>
        )
      case 'payments':
        return (
          <div className="mini-phone-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, fontSize: '0.65rem' }}>
              <span>←</span>
              <span>Payments</span>
            </div>
            <div style={{ background: '#f1f5f9', borderRadius: '4px', padding: '0.3rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ background: '#f472b6', color: '#fff', width: 14, height: 14, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem' }}>↗</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.55rem' }}>Send Money</div>
                <div style={{ color: '#64748b', fontSize: '0.45rem' }}>To friends, family or UPI</div>
              </div>
            </div>
            <div style={{ background: '#f1f5f9', borderRadius: '4px', padding: '0.3rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ background: '#fbbf24', color: '#fff', width: 14, height: 14, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem' }}>📄</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.55rem' }}>Pay Bills</div>
                <div style={{ color: '#64748b', fontSize: '0.45rem' }}>Electricity, DTH</div>
              </div>
            </div>
            <div style={{ background: '#f1f5f9', borderRadius: '4px', padding: '0.3rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ background: '#34d399', color: '#fff', width: 14, height: 14, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem' }}>📱</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.55rem' }}>Mobile Recharge</div>
                <div style={{ color: '#64748b', fontSize: '0.45rem' }}>Prepaid & Postpaid</div>
              </div>
            </div>
            <div style={{ background: '#f1f5f9', borderRadius: '4px', padding: '0.3rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ background: '#818cf8', color: '#fff', width: 14, height: 14, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem' }}>≡</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.55rem' }}>Transaction History</div>
                <div style={{ color: '#64748b', fontSize: '0.45rem' }}>View all transactions</div>
              </div>
            </div>
          </div>
        )
      case 'send_money':
        return (
          <div className="mini-phone-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, fontSize: '0.65rem' }}>
              <span>←</span>
              <span>Send Money</span>
            </div>
            <div style={{ fontSize: '0.5rem', fontWeight: 600, color: '#475569' }}>Recipient</div>
            <div style={{ border: '1px solid #cbd5e1', borderRadius: '4px', padding: '3px 4px', fontSize: '0.5rem', color: '#94a3b8' }}>
              Enter name, phone or UPI ID
            </div>
            <div style={{ fontSize: '0.5rem', fontWeight: 600, color: '#475569' }}>Amount</div>
            <div style={{ border: '1px solid #cbd5e1', borderRadius: '4px', padding: '3px 4px', fontSize: '0.6rem', fontWeight: 700, color: '#0f172a' }}>
              ₹ 0.00
            </div>
            <div style={{ fontSize: '0.5rem', fontWeight: 600, color: '#475569' }}>Note (optional)</div>
            <div style={{ border: '1px solid #cbd5e1', borderRadius: '4px', padding: '3px 4px', fontSize: '0.5rem', color: '#94a3b8' }}>
              Add a note
            </div>
            <div style={{ background: '#4f46e5', color: '#fff', padding: '4px', borderRadius: '6px', textAlign: 'center', fontWeight: 700, fontSize: '0.58rem', marginTop: 'auto' }}>
              Continue
            </div>
          </div>
        )
      case 'confirmation':
        return (
          <div className="mini-phone-content" style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, fontSize: '0.65rem', textAlign: 'left' }}>
              <span>←</span>
            </div>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', margin: '4px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Send size={14} />
            </div>
            <div style={{ fontWeight: 800, fontSize: '0.68rem', color: '#0f172a' }}>Confirm Transfer</div>
            <div style={{ fontSize: '0.5rem', color: '#64748b' }}>You are sending</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>₹ 1,000</div>
            <div style={{ fontSize: '0.52rem', fontWeight: 600, color: '#4f46e5' }}>to rahul@upi</div>
            <div style={{ background: '#f8fafc', padding: '3px', borderRadius: '4px', fontSize: '0.48rem', color: '#64748b', margin: '4px 0' }}>
              Note: Rent for September
            </div>
            <div style={{ background: '#4f46e5', color: '#fff', padding: '4px', borderRadius: '6px', textAlign: 'center', fontWeight: 700, fontSize: '0.58rem', marginTop: 'auto' }}>
              Continue
            </div>
          </div>
        )
      default:
        return (
          <div className="mini-phone-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>Step {stepNum}</div>
          </div>
        )
    }
  }

  return (
    <div className="journeys-page-layout">
      {/* 1. Left Column: Journey Selection Stack */}
      <div className="journey-sidebar-list">
        <div className="journey-sidebar-header">
          <div className="journey-sidebar-title">User Journeys</div>
          <div className="journey-sidebar-sub">Common user flows discovered by the AI agent</div>
        </div>

        <div className="journey-cards-stack">
          {journeys.map((j) => {
            const isSelected = j.id === selectedJourneyId
            return (
              <div
                key={j.id}
                className={`journey-selector-card ${isSelected ? 'active' : ''}`}
                onClick={() => {
                  setSelectedJourneyId(j.id)
                  setActiveStepIndex(0)
                }}
              >
                <div 
                  className="journey-icon-wrap"
                  style={{ background: j.iconBg, color: j.iconColor }}
                >
                  {getJourneyIcon(j.icon)}
                </div>
                <div>
                  <div className="journey-name-label">{j.name}</div>
                  <div className="journey-screens-label">{j.screensCount} screens</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 2. Center Column: Multi-Phone Flow + Journey Steps Timeline */}
      <div className="journey-center-col">
        {/* Top Flow Card */}
        <div className="journey-flow-card">
          <div className="journey-flow-header">
            <div className="journey-flow-title-wrap">
              <div className="journey-flow-icon-box">
                <ArrowRight size={20} />
              </div>
              <div>
                <div className="journey-flow-title">{currentJourney.title}</div>
                <div className="journey-flow-sub">{currentJourney.subtitle}</div>
              </div>
            </div>

            <button 
              className="btn-play-journey" 
              onClick={handlePlayJourney}
              disabled={isPlaying}
            >
              <Play size={14} fill="currentColor" />
              <span>{isPlaying ? 'Playing...' : 'Play Journey'}</span>
            </button>
          </div>

          {/* Horizontal Multi-Phone Row */}
          <div className="journey-phones-row">
            {currentJourney.steps.map((step, idx) => {
              const isActive = idx === activeStepIndex
              return (
                <React.Fragment key={idx}>
                  <div 
                    className={`mini-phone-step-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveStepIndex(idx)}
                  >
                    <div className="mini-phone-step-label-top">
                      {idx + 1}. {step.name}
                    </div>

                    <div className="mini-phone-frame">
                      <div className="mini-notch"></div>
                      {renderMiniPhone(step.phoneType, idx + 1)}
                    </div>

                    <div className="mini-phone-info-bottom">
                      <div className="mini-phone-name">{step.name}</div>
                      <div className="mini-phone-elements-count">{step.elementsCount} elements</div>
                      <div className="mini-phone-caption">{step.caption}</div>
                    </div>
                  </div>

                  {idx < currentJourney.steps.length - 1 && (
                    <div className="phone-arrow-divider">
                      <ArrowRight size={20} />
                    </div>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>

        {/* Bottom Steps Timeline Card */}
        <div className="journey-timeline-card">
          <div className="card-title-sm" style={{ color: '#fff', fontSize: '0.95rem' }}>
            Journey Steps
          </div>

          <div>
            {currentJourney.steps.map((step, idx) => (
              <div 
                key={idx} 
                className="timeline-step-row"
                style={{ cursor: 'pointer', opacity: idx === activeStepIndex ? 1 : 0.8 }}
                onClick={() => setActiveStepIndex(idx)}
              >
                <div className="timeline-circle-num">{idx + 1}</div>
                <div>
                  <div className="timeline-screen-title">{step.name}</div>
                  <div className="timeline-screen-count">{step.elementsCount} elements</div>
                </div>
                <div className="timeline-action-desc">
                  {step.actionSummary}
                </div>
                <div className="timeline-action-badge">
                  {step.actionBadge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Right Column: Step Details Panel */}
      <div className="screen-details-card">
        <div className="screen-details-header">
          <div className="details-title-row">
            <span className="details-title">Step Details</span>
            <span className="details-counter">{activeStepIndex + 1} / {currentJourney.steps.length}</span>
          </div>

          <div className="details-nav-arrows">
            <button 
              className="btn-icon-subtle" 
              onClick={handlePrevStep}
              disabled={activeStepIndex === 0}
              title="Previous step"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              className="btn-icon-subtle" 
              onClick={handleNextStep}
              disabled={activeStepIndex === currentJourney.steps.length - 1}
              title="Next step"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Realistic Phone Preview */}
        <div className="phone-preview-wrapper">
          <div className="realistic-phone">
            <div className="phone-status-bar">
              <span>9:41</span>
              <div className="phone-notch-island"></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Wifi size={11} />
                <BatteryMedium size={13} />
              </div>
            </div>

            {/* Custom preview for the selected step */}
            <div className="phone-app-content">
              <div className="phone-header-row">
                <ArrowLeft size={14} />
                <span style={{ flex: 1, textAlign: 'center', fontWeight: 700 }}>DemoShop</span>
              </div>

              <div className="phone-hero-section">
                <div className="phone-hero-icon">
                  <Send size={18} />
                </div>
                <div>
                  <div className="phone-hero-title">{currentStep.name}</div>
                  <div className="phone-hero-sub">Transfer money to another user</div>
                </div>
              </div>

              <div>
                <div className="phone-input-label">Recipient</div>
                <div className="phone-input-field">Enter name, phone or UPI ID</div>
              </div>

              <div>
                <div className="phone-input-label">Amount</div>
                <div className="phone-input-field" style={{ color: '#0f172a', fontWeight: 600 }}>₹ 0.00</div>
              </div>

              <div>
                <div className="phone-input-label">Note (optional)</div>
                <div className="phone-input-field">Add a note</div>
              </div>

              <button className="phone-action-btn-primary">
                Continue
              </button>
            </div>
          </div>
        </div>

        {/* Screen Banner */}
        <div className="screen-banner-row">
          <div className="screen-icon-square">
            <Send size={20} />
          </div>
          <div>
            <div className="screen-banner-name">{currentStep.name}</div>
            <div className="screen-banner-id">{currentStep.screen_id}</div>
          </div>
        </div>

        {/* Purpose */}
        <div>
          <div className="details-section-label">Purpose</div>
          <p className="purpose-content-text">
            {currentStep.purpose}
          </p>
        </div>

        {/* Elements Stack */}
        <div>
          <div className="details-section-label">Elements ({currentStep.elements.length})</div>
          <div className="elements-stack-list">
            {currentStep.elements.map((el, i) => {
              const isHighlighted = el.isPrimary || el.label.includes('Continue button')
              return (
                <div key={i} className={`element-row-item ${isHighlighted ? 'highlighted' : ''}`}>
                  <span className="element-icon-chip">{el.icon || 'T'}</span>
                  <span>{el.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <div className="details-section-label">Navigation</div>
          <div className="nav-direction-row">
            <div className="nav-direction-box">
              <div className="nav-direction-label">Previous</div>
              <button className="nav-btn-pill" disabled={currentStep.nav.prev === 'None'}>
                <ArrowLeft size={13} />
                <span>{currentStep.nav.prev}</span>
              </button>
            </div>

            <div className="nav-direction-box">
              <div className="nav-direction-label">Next</div>
              <button className="nav-btn-pill" disabled={currentStep.nav.next === 'None'}>
                <span>{currentStep.nav.next}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
