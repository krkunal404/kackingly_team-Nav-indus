import React, { useState, useMemo } from 'react'
import {
  BookOpen,
  CheckSquare,
  Sparkles,
  Copy,
  Check,
  ChevronRight,
  ChevronDown,
  Terminal,
  Layers,
  Map,
  Zap,
  Download,
  ExternalLink,
  ArrowRight,
  Code2,
  FileText,
  Shield,
  Play,
  AlertTriangle,
  Info,
  Hash,
  Circle,
  CheckCircle2,
  Star,
  TrendingUp,
  Users,
  Smartphone,
  Navigation,
  LayoutGrid,
  Search,
  Settings,
} from 'lucide-react'

// ── Static rich data for DemoShop documentation ──────────────────────────────
const SCREEN_ICONS = {
  screen_01: { icon: <LayoutGrid size={16} />, color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
  screen_02: { icon: <Shield size={16} />, color: '#0284c7', bg: 'rgba(2,132,199,0.15)' },
  screen_03: { icon: <Navigation size={16} />, color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
  screen_04: { icon: <FileText size={16} />, color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  screen_05: { icon: <Zap size={16} />, color: '#06b6d4', bg: 'rgba(6,182,212,0.15)' },
  screen_06: { icon: <Users size={16} />, color: '#22c55e', bg: 'rgba(34,197,94,0.15)' },
  screen_07: { icon: <CheckCircle2 size={16} />, color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
  screen_08: { icon: <Settings size={16} />, color: '#6366f1', bg: 'rgba(99,102,241,0.15)' },
}

const QA_MATRIX = [
  { id: 'tc_01', from: 'Home', action: 'tap "Payments"', to: 'Payments Hub', status: 'pass', risk: 'low' },
  { id: 'tc_02', from: 'Payments Hub', action: 'tap "Send Money"', to: 'Send Money', status: 'pass', risk: 'high' },
  { id: 'tc_03', from: 'Send Money', action: 'fill recipient + tap "Continue"', to: 'Confirmation', status: 'pass', risk: 'high' },
  { id: 'tc_04', from: 'Confirmation', action: 'tap "Confirm"', to: 'Receipt', status: 'pass', risk: 'high' },
  { id: 'tc_05', from: 'Home', action: 'tap "Accounts"', to: 'Accounts', status: 'pass', risk: 'low' },
  { id: 'tc_06', from: 'Home', action: 'tap "Profile"', to: 'Profile', status: 'pass', risk: 'low' },
  { id: 'tc_07', from: 'Profile', action: 'tap "Settings"', to: 'Settings', status: 'pass', risk: 'medium' },
  { id: 'tc_08', from: 'Send Money', action: 'empty recipient + tap "Continue"', to: 'Send Money (error)', status: 'pass', risk: 'medium' },
]

const ONBOARDING_SCREENS = [
  {
    step: '01',
    name: 'Welcome & Login',
    icon: <Star size={22} />,
    color: '#6366f1',
    bg: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))',
    border: 'rgba(99,102,241,0.3)',
    purpose: 'First impression. Users authenticate via phone number or email to access their personalised financial dashboard.',
    tips: ['Auto-fills OTP from SMS', 'Biometric login supported', 'Guest preview available'],
    elements: ['Phone/Email input', 'OTP verification', 'Biometric CTA'],
  },
  {
    step: '02',
    name: 'Home Dashboard',
    icon: <TrendingUp size={22} />,
    color: '#3b82f6',
    bg: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.1))',
    border: 'rgba(59,130,246,0.3)',
    purpose: 'Central hub showing live balance, quick action cards (Send, Pay Bills, Recharge) and recent transaction feed.',
    tips: ['Pull-to-refresh updates balance', 'Long-press transactions for details', 'Swipe left for accounts sidebar'],
    elements: ['Balance card', 'Quick actions row', 'Recent activity list'],
  },
  {
    step: '03',
    name: 'Payments Hub',
    icon: <Zap size={22} />,
    color: '#8b5cf6',
    bg: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.1))',
    border: 'rgba(139,92,246,0.3)',
    purpose: 'Payments gateway — routes users to Send Money, Pay Bills, Mobile Recharge, and full Transaction History.',
    tips: ['Recent contacts auto-populated', 'Saved payees load instantly', 'Bill due dates badge shown'],
    elements: ['Send Money card', 'Pay Bills card', 'Recharge card', 'History button'],
  },
]

const SDK_CODE = `// AppMind SDK — Inject Knowledge Pack into RevRag Agent
import { AppMindAgent } from '@revrag/appmind-sdk'

const agent = new AppMindAgent({
  knowledgePack: demoshop_knowledge_pack,
  appId: 'com.demoshop.fintech',
})

// Query the discovered knowledge
const screen = agent.getScreen('Send Money')
console.log(screen.purpose)    // "Transfer funds to any UPI ID..."
console.log(screen.elements)   // [{type: "input", label: "Recipient"}, ...]

// AI-powered user guidance
const help = await agent.guide('How do I send money?')
// → "Tap Payments → Send Money → Enter recipient..."
`

export default function DocsExportView({ knowledge }) {
  const [subTab, setSubTab] = useState('guide')
  const [copied, setCopied] = useState(false)
  const [codeCopied, setCodeCopied] = useState(false)
  const [expandedSection, setExpandedSection] = useState('flows')

  const screens = knowledge?.screens || []
  const journeys = knowledge?.journeys || []
  const appName = knowledge?.app?.name || 'DemoShop'
  const appVersion = knowledge?.app?.version || 'v1.0.0'

  const userGuideMarkdown = useMemo(() => {
    let md = `# ${appName} (${appVersion}) — AI-Generated User Guide\n\n`
    md += `> Generated automatically by AppMind from autonomous screen exploration.\n\n`
    md += `## App Overview\n\n`
    md += `**${appName}** is a fintech application with ${screens.length} screens, `
    md += `47 interactive elements, and 12 discovered user journeys.\n\n`
    screens.forEach((s, i) => {
      md += `## Screen ${i + 1}: ${s.name}\n\n`
      md += `**Purpose:** ${s.purpose}\n\n`
      if (s.elements?.length > 0) {
        md += `**Elements:** ${s.elements.map(e => e.label).join(', ')}\n\n`
      }
      if (s.actions?.length > 0) {
        md += `**Actions:**\n`
        s.actions.forEach(a => { md += `- ${a.label} → ${a.intent}\n` })
        md += '\n'
      }
    })
    return md
  }, [appName, appVersion, screens])

  const handleCopy = async (text, setter) => {
    try {
      await navigator.clipboard.writeText(text)
      setter(true)
      setTimeout(() => setter(false), 2000)
    } catch (_) {}
  }

  const tabs = [
    { id: 'guide', label: 'User Guide', icon: <BookOpen size={14} /> },
    { id: 'qa', label: 'QA Matrix', icon: <CheckSquare size={14} /> },
    { id: 'onboarding', label: 'Onboarding', icon: <Sparkles size={14} /> },
    { id: 'sdk', label: 'SDK Integration', icon: <Code2 size={14} /> },
  ]

  const sections = [
    {
      id: 'flows',
      label: 'Core User Flows',
      icon: <Navigation size={14} />,
      count: 3,
      items: [
        { name: 'Send Money Flow', steps: 4, risk: 'critical', desc: 'Home → Payments → Send Money → Confirmation → Receipt' },
        { name: 'Account Overview', steps: 2, risk: 'low', desc: 'Home → Accounts → Account Detail' },
        { name: 'Profile & Settings', steps: 2, risk: 'medium', desc: 'Home → Profile → Settings' },
      ]
    },
    {
      id: 'screens',
      label: 'Screens Reference',
      icon: <Smartphone size={14} />,
      count: screens.length || 8,
      items: screens.slice(0, 4).map(s => ({ name: s.name, steps: s.elementsCount, risk: 'low', desc: s.purpose }))
    },
  ]

  return (
    <div className="docs-workspace">
      {/* ── Docs Workspace Header ───────────────────────────── */}
      <div className="docs-workspace-header">
        <div className="docs-header-left">
          <div className="docs-app-badge">
            <div className="docs-app-icon">
              <Smartphone size={16} />
            </div>
            <div>
              <div className="docs-app-name">{appName}</div>
              <div className="docs-app-meta">{appVersion} · com.demoshop.fintech · Scan Complete</div>
            </div>
          </div>
        </div>

        <div className="docs-header-stats">
          {[
            { val: screens.length || 8, label: 'Screens', color: '#6366f1' },
            { val: 47, label: 'Elements', color: '#06b6d4' },
            { val: 12, label: 'Journeys', color: '#22c55e' },
            { val: 31, label: 'Actions', color: '#f59e0b' },
          ].map(s => (
            <div key={s.label} className="docs-stat-pill">
              <span className="docs-stat-val" style={{ color: s.color }}>{s.val}</span>
              <span className="docs-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="docs-header-actions">
          <button
            className="docs-btn-secondary"
            onClick={() => handleCopy(userGuideMarkdown, setCopied)}
          >
            {copied ? <Check size={13} color="#34d399" /> : <Copy size={13} />}
            <span>{copied ? 'Copied!' : 'Export MD'}</span>
          </button>
          <button className="docs-btn-primary">
            <Download size={13} />
            <span>Download Pack</span>
          </button>
        </div>
      </div>

      {/* ── Main Docs Layout ────────────────────────────────── */}
      <div className="docs-main-layout">
        {/* Left: Navigation Sidebar */}
        <div className="docs-nav-sidebar">
          <div className="docs-nav-search">
            <Search size={13} />
            <input placeholder="Search docs..." className="docs-search-input" />
          </div>

          <div className="docs-nav-section-label">Documentation</div>
          {tabs.map(t => (
            <button
              key={t.id}
              className={`docs-nav-item ${subTab === t.id ? 'active' : ''}`}
              onClick={() => setSubTab(t.id)}
            >
              <span className="docs-nav-item-icon">{t.icon}</span>
              <span>{t.label}</span>
              {subTab === t.id && <ChevronRight size={12} style={{ marginLeft: 'auto', opacity: 0.5 }} />}
            </button>
          ))}

          <div className="docs-nav-divider" />
          <div className="docs-nav-section-label">Reference</div>

          {sections.map(sec => (
            <div key={sec.id}>
              <button
                className="docs-nav-item expandable"
                onClick={() => setExpandedSection(expandedSection === sec.id ? null : sec.id)}
              >
                <span className="docs-nav-item-icon">{sec.icon}</span>
                <span>{sec.label}</span>
                <span className="docs-nav-count">{sec.count}</span>
                <ChevronDown
                  size={12}
                  style={{
                    marginLeft: '4px',
                    transition: 'transform 0.2s',
                    transform: expandedSection === sec.id ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                />
              </button>
              {expandedSection === sec.id && (
                <div className="docs-nav-subitems">
                  {sec.items.map((item, i) => (
                    <div key={i} className="docs-nav-subitem">
                      <Circle size={6} style={{ flexShrink: 0 }} />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="docs-nav-divider" />
          <div className="docs-ai-badge">
            <Sparkles size={12} />
            <span>AI-generated from autonomous scan</span>
          </div>
        </div>

        {/* Right: Content Area */}
        <div className="docs-content-area">

          {/* ── USER GUIDE TAB ── */}
          {subTab === 'guide' && (
            <div className="docs-tab-content">
              <div className="docs-content-hero">
                <div className="docs-content-hero-icon">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h1 className="docs-content-title">{appName} — User Navigation Guide</h1>
                  <p className="docs-content-subtitle">
                    Autonomously compiled from {screens.length || 8} explored screens · {journeys.length || 12} verified paths
                  </p>
                </div>
                <div className="docs-ai-stamp">
                  <Sparkles size={11} />
                  AI Generated
                </div>
              </div>

              {/* App Overview Card */}
              <div className="docs-info-banner">
                <Info size={15} style={{ flexShrink: 0, color: '#6366f1' }} />
                <div>
                  <strong>About this document</strong> — AppMind autonomously explored DemoShop by navigating every reachable screen,
                  cataloguing UI elements, and mapping interaction paths. This guide was synthesised without any manual input.
                </div>
              </div>

              {/* Screens Documentation */}
              <div className="docs-screen-list">
                {(screens.length > 0 ? screens : [
                  { screen_id: 'screen_01', name: 'Home', purpose: 'Central dashboard for balance, navigation, and quick actions.', elements: [{label:'Balance Card'},{label:'Accounts btn'},{label:'Payments btn'}], actions: [{label:'tap "Payments"', intent:'Navigate to Payments'}] },
                  { screen_id: 'screen_02', name: 'Accounts', purpose: 'Lists all linked accounts and credit cards.', elements: [{label:'Back button'},{label:'Account Cards'}], actions: [{label:'tap Account', intent:'View account details'}] },
                  { screen_id: 'screen_03', name: 'Payments Hub', purpose: 'Routes to Send Money, Pay Bills, Recharge and History.', elements: [{label:'Send Money'},{label:'Pay Bills'},{label:'Recharge'}], actions: [{label:'tap "Send Money"', intent:'Open Send Money flow'}] },
                  { screen_id: 'screen_04', name: 'Transaction History', purpose: 'Filtered, searchable list of all past transactions.', elements: [{label:'Search bar'},{label:'Filter chips'},{label:'Transaction rows'}], actions: [{label:'tap transaction', intent:'View receipt'}] },
                  { screen_id: 'screen_05', name: 'Send Money', purpose: 'Form to transfer funds to a UPI ID or contact.', elements: [{label:'Recipient field'},{label:'Amount field'},{label:'Continue button'}], actions: [{label:'fill + tap "Continue"', intent:'Proceed to confirmation'}] },
                  { screen_id: 'screen_06', name: 'Profile', purpose: 'User identity, linked accounts, and app settings gateway.', elements: [{label:'Avatar'},{label:'Name'},{label:'Settings link'}], actions: [{label:'tap "Settings"', intent:'Open settings'}] },
                  { screen_id: 'screen_07', name: 'Confirmation', purpose: 'Review and confirm a pending transfer before execution.', elements: [{label:'Recipient name'},{label:'Amount'},{label:'Confirm button'}], actions: [{label:'tap "Confirm"', intent:'Execute transfer'}] },
                  { screen_id: 'screen_08', name: 'Settings', purpose: 'App preferences, notification controls, and security options.', elements: [{label:'Notification toggle'},{label:'Biometric toggle'},{label:'Logout'}], actions: [{label:'tap "Logout"', intent:'Sign out'}] },
                ]).map((screen, idx) => {
                  const meta = SCREEN_ICONS[screen.screen_id] || { icon: <FileText size={16} />, color: '#6366f1', bg: 'rgba(99,102,241,0.15)' }
                  return (
                    <div key={screen.screen_id || idx} className="docs-screen-card">
                      <div className="docs-screen-card-header">
                        <div className="docs-screen-index-icon" style={{ background: meta.bg, color: meta.color }}>
                          {meta.icon}
                        </div>
                        <div className="docs-screen-card-title">
                          <span className="docs-screen-name">{screen.name}</span>
                          <span className="docs-screen-id-pill">{screen.screen_id || `screen_0${idx+1}`}</span>
                        </div>
                        <div className="docs-screen-el-count">{screen.elementsCount || screen.elements?.length || 0} elements</div>
                      </div>

                      <p className="docs-screen-purpose">{screen.purpose}</p>

                      {screen.elements?.length > 0 && (
                        <div className="docs-screen-el-row">
                          {screen.elements.slice(0, 5).map((el, i) => (
                            <span key={i} className="docs-element-chip">{el.label || el.type}</span>
                          ))}
                        </div>
                      )}

                      {screen.actions?.length > 0 && (
                        <div className="docs-screen-actions">
                          {screen.actions.map((a, i) => (
                            <div key={i} className="docs-action-row">
                              <span className="docs-action-trigger">{a.label}</span>
                              <ArrowRight size={11} style={{ color: '#6366f1', flexShrink: 0 }} />
                              <span className="docs-action-intent">{a.intent}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── QA MATRIX TAB ── */}
          {subTab === 'qa' && (
            <div className="docs-tab-content">
              <div className="docs-content-hero">
                <div className="docs-content-hero-icon" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(6,182,212,0.15))' }}>
                  <CheckSquare size={20} style={{ color: '#22c55e' }} />
                </div>
                <div>
                  <h1 className="docs-content-title">QA Verification Matrix</h1>
                  <p className="docs-content-subtitle">
                    {QA_MATRIX.length} test cases auto-generated from discovered navigation paths
                  </p>
                </div>
                <div className="docs-ai-stamp" style={{ background: 'rgba(34,197,94,0.1)', borderColor: 'rgba(34,197,94,0.3)', color: '#22c55e' }}>
                  <CheckCircle2 size={11} />
                  8 / 8 Verified
                </div>
              </div>

              {/* Summary Chips */}
              <div className="docs-qa-summary">
                {[
                  { label: 'Total Cases', val: 8, color: '#6366f1' },
                  { label: 'High Risk', val: 3, color: '#f59e0b' },
                  { label: 'Passed', val: 8, color: '#22c55e' },
                  { label: 'Coverage', val: '100%', color: '#06b6d4' },
                ].map(s => (
                  <div key={s.label} className="docs-qa-summary-card">
                    <div className="docs-qa-summary-val" style={{ color: s.color }}>{s.val}</div>
                    <div className="docs-qa-summary-label">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="docs-info-banner" style={{ borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.05)' }}>
                <AlertTriangle size={15} style={{ flexShrink: 0, color: '#f59e0b' }} />
                <div>
                  <strong>High-risk cases</strong> — Payment flows (tc_02, tc_03, tc_04) involve real money transfers.
                  These require regression testing after every release.
                </div>
              </div>

              {/* QA Table */}
              <div className="docs-qa-table-wrap">
                <table className="docs-qa-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Source Screen</th>
                      <th>Autonomous Action</th>
                      <th>Target Screen</th>
                      <th>Risk</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {QA_MATRIX.map(row => (
                      <tr key={row.id}>
                        <td className="docs-qa-id">{row.id}</td>
                        <td className="docs-qa-screen">{row.from}</td>
                        <td>
                          <span className="docs-qa-action-code">{row.action}</span>
                        </td>
                        <td className="docs-qa-screen docs-qa-target">{row.to}</td>
                        <td>
                          <span className={`docs-risk-badge docs-risk-${row.risk}`}>
                            {row.risk === 'high' ? <AlertTriangle size={10} /> : row.risk === 'medium' ? <Info size={10} /> : <CheckCircle2 size={10} />}
                            {row.risk}
                          </span>
                        </td>
                        <td>
                          <span className="docs-status-pass">
                            <Check size={11} />
                            Pass
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── ONBOARDING TAB ── */}
          {subTab === 'onboarding' && (
            <div className="docs-tab-content">
              <div className="docs-content-hero">
                <div className="docs-content-hero-icon" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.15))' }}>
                  <Sparkles size={20} style={{ color: '#a855f7' }} />
                </div>
                <div>
                  <h1 className="docs-content-title">Onboarding Flow Preview</h1>
                  <p className="docs-content-subtitle">
                    3-step onboarding sequence auto-extracted from first-run screens
                  </p>
                </div>
                <div className="docs-ai-stamp" style={{ background: 'rgba(168,85,247,0.1)', borderColor: 'rgba(168,85,247,0.3)', color: '#a855f7' }}>
                  <Sparkles size={11} />
                  Auto-extracted
                </div>
              </div>

              {/* Step progress bar */}
              <div className="docs-onboarding-progress">
                {ONBOARDING_SCREENS.map((s, i) => (
                  <React.Fragment key={i}>
                    <div className="docs-ob-progress-step">
                      <div className="docs-ob-progress-dot active">{s.step}</div>
                      <span>{s.name}</span>
                    </div>
                    {i < ONBOARDING_SCREENS.length - 1 && (
                      <div className="docs-ob-progress-line" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Onboarding Cards */}
              <div className="docs-onboarding-cards">
                {ONBOARDING_SCREENS.map((screen, i) => (
                  <div
                    key={i}
                    className="docs-ob-card"
                    style={{ background: screen.bg, borderColor: screen.border }}
                  >
                    <div className="docs-ob-card-top">
                      <div className="docs-ob-step-num" style={{ color: screen.color }}>{screen.step}</div>
                      <div className="docs-ob-icon" style={{ color: screen.color, background: `${screen.color}22` }}>
                        {screen.icon}
                      </div>
                    </div>

                    <h3 className="docs-ob-name">{screen.name}</h3>
                    <p className="docs-ob-purpose">{screen.purpose}</p>

                    <div className="docs-ob-elements">
                      {screen.elements.map((el, j) => (
                        <div key={j} className="docs-ob-el-item">
                          <div className="docs-ob-el-dot" style={{ background: screen.color }} />
                          <span>{el}</span>
                        </div>
                      ))}
                    </div>

                    <div className="docs-ob-tips">
                      <div className="docs-ob-tips-label">
                        <Zap size={11} style={{ color: screen.color }} />
                        AI Tips
                      </div>
                      {screen.tips.map((tip, j) => (
                        <div key={j} className="docs-ob-tip-row">
                          <ChevronRight size={10} style={{ color: screen.color, flexShrink: 0 }} />
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Preview Strip */}
              <div className="docs-ob-preview-strip">
                <div className="docs-ob-strip-label">
                  <Play size={13} style={{ color: '#6366f1' }} />
                  Live Carousel Preview
                </div>
                <div className="docs-ob-phones-row">
                  {ONBOARDING_SCREENS.map((s, i) => (
                    <div key={i} className="docs-ob-mini-phone">
                      <div className="docs-ob-mini-notch" />
                      <div className="docs-ob-mini-body">
                        <div className="docs-ob-mini-icon" style={{ color: s.color }}>
                          {s.icon}
                        </div>
                        <div className="docs-ob-mini-name">{s.name}</div>
                        <div className="docs-ob-mini-dots">
                          {ONBOARDING_SCREENS.map((_, j) => (
                            <div key={j} className={`docs-ob-dot ${j === i ? 'active' : ''}`} style={j === i ? { background: s.color } : {}} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── SDK INTEGRATION TAB ── */}
          {subTab === 'sdk' && (
            <div className="docs-tab-content">
              <div className="docs-content-hero">
                <div className="docs-content-hero-icon" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(59,130,246,0.15))' }}>
                  <Code2 size={20} style={{ color: '#06b6d4' }} />
                </div>
                <div>
                  <h1 className="docs-content-title">SDK Integration Guide</h1>
                  <p className="docs-content-subtitle">
                    Inject this Knowledge Pack into your RevRag in-app agent
                  </p>
                </div>
                <div className="docs-ai-stamp" style={{ background: 'rgba(6,182,212,0.1)', borderColor: 'rgba(6,182,212,0.3)', color: '#06b6d4' }}>
                  <Terminal size={11} />
                  Developer
                </div>
              </div>

              {/* Install */}
              <div className="docs-sdk-section">
                <div className="docs-sdk-section-label">
                  <Hash size={14} style={{ color: '#6366f1' }} />
                  Installation
                </div>
                <div className="docs-code-block">
                  <div className="docs-code-header">
                    <span className="docs-code-lang">bash</span>
                    <button className="docs-code-copy" onClick={() => handleCopy('npm install @revrag/appmind-sdk', setCodeCopied)}>
                      {codeCopied ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
                    </button>
                  </div>
                  <pre className="docs-code-pre">
                    <code><span className="tok-comment"># Install the AppMind SDK</span>{'\n'}<span className="tok-cmd">npm install</span> <span className="tok-str">@revrag/appmind-sdk</span></code>
                  </pre>
                </div>
              </div>

              {/* Code sample */}
              <div className="docs-sdk-section">
                <div className="docs-sdk-section-label">
                  <Hash size={14} style={{ color: '#6366f1' }} />
                  Quick Start
                </div>
                <div className="docs-code-block">
                  <div className="docs-code-header">
                    <span className="docs-code-lang">javascript</span>
                    <button className="docs-code-copy" onClick={() => handleCopy(SDK_CODE, setCodeCopied)}>
                      {codeCopied ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
                    </button>
                  </div>
                  <pre className="docs-code-pre">
                    <code>{SDK_CODE}</code>
                  </pre>
                </div>
              </div>

              {/* Knowledge Pack Schema */}
              <div className="docs-sdk-section">
                <div className="docs-sdk-section-label">
                  <Hash size={14} style={{ color: '#6366f1' }} />
                  Knowledge Pack Schema
                </div>
                <div className="docs-schema-grid">
                  {[
                    { key: 'app', type: 'AppMetadata', desc: 'Name, version, package ID, and scan stats', color: '#6366f1' },
                    { key: 'screens[]', type: 'Screen[]', desc: 'All discovered screens with elements and actions', color: '#3b82f6' },
                    { key: 'journeys[]', type: 'Journey[]', desc: 'Common multi-step user flows and paths', color: '#8b5cf6' },
                    { key: 'design_system', type: 'DesignSystem', desc: 'Extracted colours, fonts, and component tokens', color: '#06b6d4' },
                    { key: 'navigation_graph', type: 'Graph', desc: 'Node–edge graph of screen connectivity', color: '#22c55e' },
                    { key: 'scan_metadata', type: 'ScanStats', desc: 'Timestamps, coverage metrics, and agent decisions', color: '#f59e0b' },
                  ].map(f => (
                    <div key={f.key} className="docs-schema-row">
                      <code className="docs-schema-key">{f.key}</code>
                      <span className="docs-schema-type" style={{ color: f.color }}>{f.type}</span>
                      <span className="docs-schema-desc">{f.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature list */}
              <div className="docs-sdk-features">
                {[
                  { icon: <Layers size={16} />, title: 'Screen-aware Guidance', desc: 'Agent knows every screen purpose and element', color: '#6366f1' },
                  { icon: <Map size={16} />, title: 'Navigation Graph', desc: 'Understands how screens connect and which actions move between them', color: '#06b6d4' },
                  { icon: <Zap size={16} />, title: 'Zero Configuration', desc: 'Drop in the knowledge pack — no manual annotation required', color: '#22c55e' },
                  { icon: <Shield size={16} />, title: 'Auto-updating', desc: 'Re-scan the app after updates to refresh the knowledge pack instantly', color: '#f59e0b' },
                ].map(f => (
                  <div key={f.title} className="docs-sdk-feature-card">
                    <div className="docs-sdk-feature-icon" style={{ color: f.color, background: `${f.color}18` }}>
                      {f.icon}
                    </div>
                    <div>
                      <div className="docs-sdk-feature-title">{f.title}</div>
                      <div className="docs-sdk-feature-desc">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
