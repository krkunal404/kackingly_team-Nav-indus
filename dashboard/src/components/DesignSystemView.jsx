import React, { useState } from 'react'
import {
  Palette,
  Sun,
  Moon,
  Type,
  Square,
  Sliders,
  Layers,
  Smartphone,
  Sparkles,
  LayoutGrid,
  Circle,
  ChevronRight,
  Eye,
  Minus,
  AlignLeft,
} from 'lucide-react'

// ── Rich DemoShop design data ─────────────────────────────────────────────────
const COLOR_PALETTE = [
  { name: 'Primary',    hex: '#4F46E5', role: 'Buttons, CTAs, Active states',         usage: 42 },
  { name: 'Secondary',  hex: '#0284C7', role: 'Links, Highlights, Badges',             usage: 18 },
  { name: 'Accent',     hex: '#9333EA', role: 'Gradients, Premium badges',              usage: 11 },
  { name: 'Success',    hex: '#22C55E', role: 'Confirmation, Verified states',          usage: 9  },
  { name: 'Warning',    hex: '#F59E0B', role: 'Alerts, Pending, Attention',             usage: 7  },
  { name: 'Error',      hex: '#EF4444', role: 'Destructive actions, Validation errors', usage: 5  },
  { name: 'Background', hex: '#0F172A', role: 'Page/canvas base',                       usage: 0  },
  { name: 'Surface',    hex: '#1E293B', role: 'Cards, Panels, Sheets',                  usage: 0  },
  { name: 'Card',       hex: '#334155', role: 'Elevated card surfaces',                 usage: 0  },
  { name: 'Text Primary',   hex: '#F8FAFC', role: 'Headings, body copy',               usage: 0  },
  { name: 'Text Secondary', hex: '#94A3B8', role: 'Captions, labels',                  usage: 0  },
  { name: 'Border',         hex: '#475569', role: 'Dividers, outlines',                 usage: 0  },
]

const TYPE_SCALE = [
  { name: 'Heading 1', size: '24px', weight: 'Bold (700)',     sample: 'Welcome Back',    color: '#0F172A' },
  { name: 'Heading 2', size: '20px', weight: 'Semibold (600)', sample: 'My Accounts',      color: '#0F172A' },
  { name: 'Heading 3', size: '18px', weight: 'Medium (500)',   sample: 'Send Money',       color: '#1E293B' },
  { name: 'Body',      size: '14px', weight: 'Regular (400)',  sample: 'Transfer funds to any UPI ID', color: '#334155' },
  { name: 'Caption',   size: '12px', weight: 'Regular (400)',  sample: 'Transaction on 18 Sep, 10:15 AM', color: '#647488' },
  { name: 'Button',    size: '14px', weight: 'Medium (500)',   sample: 'Continue',         color: '#FFFFFF' },
]

const SPACING_SCALE = [4, 8, 12, 16, 24, 32]

const RADIUS_SCALE = [
  { label: 'Small',  val: '4px',    sample: 4   },
  { label: 'Medium', val: '8px',    sample: 8   },
  { label: 'Card',   val: '12px',   sample: 12  },
  { label: 'Large',  val: '16px',   sample: 16  },
  { label: 'XL',     val: '20px',   sample: 20  },
  { label: 'Full',   val: '9999px', sample: 999 },
]

const COMPONENTS = [
  {
    label: 'Primary Button',
    count: 16,
    preview: (
      <div style={{ background: '#4F46E5', color: '#fff', padding: '6px 16px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, textAlign: 'center' }}>
        Continue
      </div>
    )
  },
  {
    label: 'Secondary Button',
    count: 6,
    preview: (
      <div style={{ border: '1px solid #4F46E5', color: '#4F46E5', padding: '6px 16px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, textAlign: 'center', background: 'transparent' }}>
        View Details
      </div>
    )
  },
  {
    label: 'Input Field',
    count: 11,
    preview: (
      <div style={{ border: '1px solid #334155', borderRadius: '8px', padding: '5px 10px', fontSize: '0.72rem', color: '#94A3B8', background: '#1E293B' }}>
        Enter amount...
      </div>
    )
  },
  {
    label: 'Card',
    count: 9,
    preview: (
      <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '12px', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem' }}>
        <span style={{ fontWeight: 600, color: '#fff' }}>Amazon</span>
        <span style={{ color: '#EF4444', fontWeight: 700 }}>−₹1,299</span>
      </div>
    )
  },
  {
    label: 'Bottom Navigation',
    count: 3,
    preview: (
      <div style={{ display: 'flex', justifyContent: 'space-around', background: '#0F172A', borderTop: '1px solid #334155', padding: '4px 0', borderRadius: '0 0 8px 8px' }}>
        {['Home','Pay','Shop','Profile'].map(l => (
          <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: l === 'Home' ? '#4F46E5' : '#475569' }} />
            <span style={{ fontSize: '0.45rem', color: l === 'Home' ? '#4F46E5' : '#94A3B8' }}>{l}</span>
          </div>
        ))}
      </div>
    )
  },
  {
    label: 'List Item',
    count: 12,
    preview: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 6px', background: '#1E293B', borderRadius: '6px' }}>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', color: '#fff', fontWeight: 700 }}>S</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.6rem', fontWeight: 600, color: '#fff' }}>Send Money</div>
          <div style={{ fontSize: '0.5rem', color: '#94A3B8' }}>To friends, family or UPI</div>
        </div>
        <ChevronRight size={10} color="#475569" />
      </div>
    )
  },
  {
    label: 'Icon Button',
    count: 8,
    preview: (
      <div style={{ display: 'flex', gap: 6 }}>
        {['↗','📄','📱','≡'].map((ic, i) => (
          <div key={i} style={{ width: 28, height: 28, borderRadius: 8, background: ['#4F46E5','#F59E0B','#22C55E','#9333EA'][i] + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', border: `1px solid ${['#4F46E5','#F59E0B','#22C55E','#9333EA'][i]}44` }}>
            {ic}
          </div>
        ))}
      </div>
    )
  },
  {
    label: 'Balance Card',
    count: 2,
    preview: (
      <div style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', borderRadius: '10px', padding: '6px 10px', color: '#fff' }}>
        <div style={{ fontSize: '0.5rem', opacity: 0.75 }}>Total Balance</div>
        <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>₹ 12,480.00</div>
      </div>
    )
  },
]

const CHARACTERISTICS = [
  { label: 'Visual Style',     value: 'Modern, Minimal'       },
  { label: 'Design Language',  value: 'Material Design 3'     },
  { label: 'Layout Style',     value: 'Card-based'            },
  { label: 'Navigation',       value: 'Bottom Navigation'     },
  { label: 'Corner Radius',    value: '12px (medium)'         },
  { label: 'Elevation',        value: 'Subtle (2–8px)'        },
  { label: 'Tone of Voice',    value: 'Friendly, Professional'},
  { label: 'Target Audience',  value: 'General Consumers'     },
]

const SCREEN_VARIANTS = [
  { name: 'Home',         color: '#4F46E5', el: 'Cards, Buttons'   },
  { name: 'Accounts',     color: '#0284C7', el: 'Lists, Cards'     },
  { name: 'Payments',     color: '#9333EA', el: 'Buttons, Forms'   },
  { name: 'Acct. Detail', color: '#0284C7', el: 'Labels, Charts'   },
  { name: 'Send Money',   color: '#4F46E5', el: 'Forms, Buttons'   },
  { name: 'Confirmation', color: '#22C55E', el: 'Forms, Buttons'   },
  { name: 'Profile',      color: '#EC4899', el: 'Forms, Cards'     },
  { name: 'Edit Profile', color: '#F59E0B', el: 'Forms, Buttons'   },
]

const SUB_TABS = [
  { id: 'overview',    label: 'Overview',    icon: <LayoutGrid size={13} /> },
  { id: 'colors',      label: 'Colors',      icon: <Palette size={13} />    },
  { id: 'typography',  label: 'Typography',  icon: <Type size={13} />       },
  { id: 'components',  label: 'Components',  icon: <Square size={13} />     },
  { id: 'spacing',     label: 'Spacing',     icon: <Sliders size={13} />    },
  { id: 'screens',     label: 'Screens',     icon: <Smartphone size={13} /> },
]

export default function DesignSystemView({ knowledge }) {
  const [subTab, setSubTab] = useState('overview')
  const [themeMode, setThemeMode] = useState('light')

  const designSystem = knowledge?.design_system || {}
  const screens = knowledge?.screens || []

  return (
    <div className="ds-workspace">

      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="ds-page-header">
        <div className="ds-page-header-left">
          <div>
            <h1 className="ds-page-title">Design System</h1>
            <p className="ds-page-sub">Visual language extracted from {screens.length || 8} screens of DemoShop</p>
          </div>
          <div className="ds-ai-badge">
            <Sparkles size={11} />
            AI Generated
            <span className="ds-ai-badge-sep">·</span>
            Based on AI analysis of screenshots and UI tree
          </div>
        </div>

        {/* Sub-tab bar */}
        <div className="ds-sub-tabs">
          {SUB_TABS.map(t => (
            <button
              key={t.id}
              className={`ds-sub-tab ${subTab === t.id ? 'active' : ''}`}
              onClick={() => setSubTab(t.id)}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── OVERVIEW TAB ─────────────────────────────────────── */}
      {subTab === 'overview' && (
        <div className="ds-overview-grid">

          {/* Color Palette */}
          <div className="ds-card ds-color-palette-card">
            <div className="ds-card-header">
              <Palette size={16} style={{ color: '#818cf8' }} />
              <span>Color Palette</span>
              <span className="ds-card-sub">Primary colors and semantic tokens extracted from the app</span>
            </div>
            <div className="ds-palette-swatches">
              {COLOR_PALETTE.slice(0, 6).map(c => (
                <div key={c.hex} className="ds-swatch-item">
                  <div className="ds-swatch-block" style={{ background: c.hex }} />
                  <div className="ds-swatch-name">{c.name}</div>
                  <div className="ds-swatch-hex">{c.hex}</div>
                </div>
              ))}
            </div>
            <div className="ds-palette-swatches ds-palette-neutral">
              {COLOR_PALETTE.slice(6).map(c => (
                <div key={c.hex} className="ds-swatch-item">
                  <div className="ds-swatch-block ds-swatch-neutral" style={{ background: c.hex }} />
                  <div className="ds-swatch-name">{c.name}</div>
                  <div className="ds-swatch-hex">{c.hex}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Theme Preview */}
          <div className="ds-card ds-theme-preview-card">
            <div className="ds-card-header">
              <Eye size={16} style={{ color: '#f59e0b' }} />
              <span>Theme Preview</span>
              <span className="ds-card-sub">Detected UI theme and variations</span>
            </div>

            <div className="ds-theme-toggle-row">
              <button
                className={`ds-theme-toggle-btn ${themeMode === 'light' ? 'active-light' : ''}`}
                onClick={() => setThemeMode('light')}
              >
                <Sun size={12} /> Light
              </button>
              <button
                className={`ds-theme-toggle-btn ${themeMode === 'dark' ? 'active-dark' : ''}`}
                onClick={() => setThemeMode('dark')}
              >
                <Moon size={12} /> Dark
              </button>
            </div>

            <div className="ds-mini-app-preview" style={{ background: themeMode === 'dark' ? '#0f172a' : '#f8fafc', border: `1px solid ${themeMode === 'dark' ? '#1e293b' : '#e2e8f0'}` }}>
              <div className="ds-preview-status-bar" style={{ background: themeMode === 'dark' ? '#0f172a' : '#fff', borderBottom: `1px solid ${themeMode === 'dark' ? '#1e293b' : '#e2e8f0'}` }}>
                <span style={{ color: themeMode === 'dark' ? '#94a3b8' : '#64748b', fontSize: '0.55rem' }}>9:41</span>
                <span style={{ color: themeMode === 'dark' ? '#fff' : '#0f172a', fontSize: '0.6rem', fontWeight: 700 }}>DemoShop</span>
                <span style={{ color: themeMode === 'dark' ? '#94a3b8' : '#64748b', fontSize: '0.55rem' }}>100%</span>
              </div>
              <div className="ds-preview-body" style={{ background: themeMode === 'dark' ? '#0f172a' : '#f8fafc' }}>
                <div style={{ background: themeMode === 'dark' ? 'linear-gradient(135deg,#4F46E5,#7C3AED)' : 'linear-gradient(135deg,#4F46E5,#7C3AED)', borderRadius: 8, padding: '6px 8px', color: '#fff', marginBottom: 4 }}>
                  <div style={{ fontSize: '0.45rem', opacity: 0.75 }}>Good morning!</div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800 }}>₹ 12,480.00</div>
                </div>
                <div style={{ display: 'flex', gap: 3, marginBottom: 4 }}>
                  {['Send','Bills','Recharge'].map(l => (
                    <div key={l} style={{ flex: 1, background: themeMode === 'dark' ? '#1e293b' : '#e0e7ff', color: themeMode === 'dark' ? '#818cf8' : '#4338ca', borderRadius: 4, padding: '3px 2px', textAlign: 'center', fontSize: '0.42rem', fontWeight: 600 }}>{l}</div>
                  ))}
                </div>
                <div style={{ background: themeMode === 'dark' ? '#1e293b' : '#fff', borderRadius: 6, padding: '4px 6px', border: `1px solid ${themeMode === 'dark' ? '#334155' : '#e2e8f0'}` }}>
                  <div style={{ fontSize: '0.45rem', fontWeight: 700, color: themeMode === 'dark' ? '#fff' : '#0f172a', marginBottom: 2 }}>Special offers</div>
                  <div style={{ height: 3, background: '#4F46E5', borderRadius: 2, width: '70%' }} />
                </div>
              </div>
              <div className="ds-preview-bottom-nav" style={{ background: themeMode === 'dark' ? '#0f172a' : '#fff', borderTop: `1px solid ${themeMode === 'dark' ? '#1e293b' : '#e2e8f0'}` }}>
                {['Home','Pay','Shop','Profile'].map((l, i) => (
                  <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: i === 0 ? '#4F46E5' : themeMode === 'dark' ? '#475569' : '#cbd5e1' }} />
                    <span style={{ fontSize: '0.4rem', color: i === 0 ? '#4F46E5' : themeMode === 'dark' ? '#94a3b8' : '#64748b' }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Design Characteristics */}
          <div className="ds-card ds-characteristics-card">
            <div className="ds-card-header">
              <Sparkles size={16} style={{ color: '#a855f7' }} />
              <span>Design Characteristics</span>
              <span className="ds-card-sub">AI inferred design characteristics</span>
            </div>
            <div className="ds-chars-list">
              {CHARACTERISTICS.map(c => (
                <div key={c.label} className="ds-char-row">
                  <span className="ds-char-label">{c.label}</span>
                  <span className="ds-char-value">{c.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="ds-card ds-typography-card">
            <div className="ds-card-header">
              <Type size={16} style={{ color: '#06b6d4' }} />
              <span>Typography</span>
              <span className="ds-card-sub">Fonts and text styles used across the app</span>
            </div>
            <div className="ds-font-family-badge">
              <span className="ds-font-family-name">Inter</span>
              <span className="ds-font-family-sub">Primary font family</span>
            </div>
            <div className="ds-type-scale">
              {TYPE_SCALE.map(t => (
                <div key={t.name} className="ds-type-row">
                  <div className="ds-type-meta">
                    <span className="ds-type-name">{t.name}</span>
                    <span className="ds-type-size">{t.size}</span>
                    <span className="ds-type-weight">{t.weight}</span>
                    <span className="ds-type-color-dot" style={{ background: t.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="ds-font-preview">
              The quick brown fox jumps over the lazy dog.
            </div>
          </div>

          {/* Spacing */}
          <div className="ds-card ds-spacing-card">
            <div className="ds-card-header">
              <Sliders size={16} style={{ color: '#34d399' }} />
              <span>Spacing Scale</span>
              <span className="ds-card-sub">Common spacing values detected</span>
            </div>
            <div className="ds-spacing-row">
              {SPACING_SCALE.map(px => (
                <div key={px} className="ds-spacing-item">
                  <div className="ds-spacing-bar-wrap">
                    <div className="ds-spacing-bar" style={{ height: `${Math.min(px * 1.8, 56)}px`, background: 'linear-gradient(to top, #6366f1, #818cf8)' }} />
                  </div>
                  <span className="ds-spacing-val">{px}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Border Radius */}
          <div className="ds-card ds-radius-card">
            <div className="ds-card-header">
              <Square size={16} style={{ color: '#f472b6' }} />
              <span>Border Radius</span>
              <span className="ds-card-sub">Corner radius values across components</span>
            </div>
            <div className="ds-radius-grid">
              {RADIUS_SCALE.map(r => (
                <div key={r.label} className="ds-radius-item">
                  <span className="ds-radius-label">{r.label}</span>
                  <span className="ds-radius-val">{r.val}</span>
                  <div className="ds-radius-sample" style={{ borderRadius: Math.min(r.sample, 9999) }} />
                </div>
              ))}
            </div>
          </div>

          {/* Component Library */}
          <div className="ds-card ds-components-card">
            <div className="ds-card-header">
              <Layers size={16} style={{ color: '#38bdf8' }} />
              <span>Component Library</span>
              <span className="ds-card-sub">Common UI components found in the app</span>
              <button className="ds-view-all-btn">View All</button>
            </div>
            <div className="ds-components-grid">
              {COMPONENTS.map(c => (
                <div key={c.label} className="ds-component-item">
                  <div className="ds-component-preview">{c.preview}</div>
                  <div className="ds-component-label">{c.label}</div>
                  <div className="ds-component-count">{c.count} instances</div>
                </div>
              ))}
            </div>
          </div>

          {/* Per-screen variants */}
          <div className="ds-card ds-screen-variants-card">
            <div className="ds-card-header">
              <Smartphone size={16} style={{ color: '#fb923c' }} />
              <span>Per-Screen Design Variations</span>
              <span className="ds-card-sub">Color accents and key components for each screen</span>
            </div>
            <div className="ds-screen-variants-row">
              {SCREEN_VARIANTS.map(s => (
                <div key={s.name} className="ds-screen-variant-chip">
                  <div className="ds-variant-dot" style={{ background: s.color }} />
                  <div>
                    <div className="ds-variant-name">{s.name}</div>
                    <div className="ds-variant-hex" style={{ color: s.color }}>{s.color}</div>
                    <div className="ds-variant-el">{s.el}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── COLORS TAB ───────────────────────────────────────── */}
      {subTab === 'colors' && (
        <div className="ds-tab-content">
          <div className="ds-card">
            <div className="ds-card-header">
              <Palette size={16} style={{ color: '#818cf8' }} />
              <span>Full Color Palette</span>
            </div>
            <div className="ds-colors-full-grid">
              {COLOR_PALETTE.map(c => (
                <div key={c.hex} className="ds-color-full-card">
                  <div className="ds-color-full-swatch" style={{ background: c.hex }} />
                  <div className="ds-color-full-info">
                    <div className="ds-color-full-name">{c.name}</div>
                    <div className="ds-color-full-hex">{c.hex}</div>
                    <div className="ds-color-full-role">{c.role}</div>
                    {c.usage > 0 && (
                      <div className="ds-color-usage-bar-wrap">
                        <div className="ds-color-usage-bar" style={{ width: `${c.usage * 2}%`, background: c.hex }} />
                        <span className="ds-color-usage-pct">{c.usage}%</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TYPOGRAPHY TAB ───────────────────────────────────── */}
      {subTab === 'typography' && (
        <div className="ds-tab-content">
          <div className="ds-card">
            <div className="ds-card-header">
              <Type size={16} style={{ color: '#06b6d4' }} />
              <span>Type Scale — Inter Font Family</span>
            </div>
            <div className="ds-type-full-list">
              {TYPE_SCALE.map(t => (
                <div key={t.name} className="ds-type-full-row">
                  <div className="ds-type-full-meta">
                    <span className="ds-type-full-name">{t.name}</span>
                    <div className="ds-type-full-specs">
                      <span>{t.size}</span>
                      <Minus size={10} style={{ opacity: 0.3 }} />
                      <span>{t.weight}</span>
                    </div>
                  </div>
                  <div
                    className="ds-type-full-sample"
                    style={{ fontSize: t.size, fontWeight: t.weight.includes('Bold') ? 700 : t.weight.includes('Semibold') ? 600 : t.weight.includes('Medium') ? 500 : 400 }}
                  >
                    {t.sample}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── COMPONENTS TAB ───────────────────────────────────── */}
      {subTab === 'components' && (
        <div className="ds-tab-content">
          <div className="ds-card">
            <div className="ds-card-header">
              <Layers size={16} style={{ color: '#38bdf8' }} />
              <span>Component Library — {COMPONENTS.length} components discovered</span>
            </div>
            <div className="ds-comp-full-grid">
              {COMPONENTS.map(c => (
                <div key={c.label} className="ds-comp-full-card">
                  <div className="ds-comp-full-preview">{c.preview}</div>
                  <div className="ds-comp-full-footer">
                    <span className="ds-comp-full-label">{c.label}</span>
                    <span className="ds-comp-full-count">{c.count} instances</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SPACING TAB ──────────────────────────────────────── */}
      {subTab === 'spacing' && (
        <div className="ds-tab-content">
          <div className="ds-card">
            <div className="ds-card-header">
              <Sliders size={16} style={{ color: '#34d399' }} />
              <span>Spacing & Radius System</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <div className="ds-section-mini-label">Spacing Scale (8px base grid)</div>
                <div className="ds-spacing-full-row">
                  {SPACING_SCALE.map(px => (
                    <div key={px} className="ds-spacing-full-item">
                      <div className="ds-spacing-full-block" style={{ width: px * 2.5, height: px * 2.5, background: 'rgba(99,102,241,0.25)', border: '1px solid rgba(99,102,241,0.5)', borderRadius: 4 }} />
                      <span className="ds-spacing-val">{px}px</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="ds-section-mini-label">Border Radius Scale</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {RADIUS_SCALE.map(r => (
                    <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ width: 60, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.label}</span>
                      <span style={{ width: 52, fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>{r.val}</span>
                      <div style={{ width: 40, height: 24, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)', borderRadius: Math.min(r.sample, 12) }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SCREENS TAB ──────────────────────────────────────── */}
      {subTab === 'screens' && (
        <div className="ds-tab-content">
          <div className="ds-card">
            <div className="ds-card-header">
              <Smartphone size={16} style={{ color: '#fb923c' }} />
              <span>Per-Screen Design Breakdown — {screens.length || 8} screens</span>
            </div>
            <div className="ds-screens-table-wrap">
              <table className="ds-screens-table">
                <thead>
                  <tr>
                    <th>Screen</th>
                    <th>Primary Color</th>
                    <th>Background</th>
                    <th>Font Family</th>
                    <th>Corner Style</th>
                    <th>Theme</th>
                  </tr>
                </thead>
                <tbody>
                  {(screens.length > 0 ? screens : SCREEN_VARIANTS.map((s, i) => ({
                    screen_id: `screen_0${i+1}`, name: s.name,
                    design: { primary_color: s.color, background_color: '#0f172a', font_family: 'Inter', corner_style: 'rounded', theme: 'light' }
                  }))).map((s, idx) => {
                    const d = s.design || {}
                    return (
                      <tr key={s.screen_id || idx}>
                        <td className="ds-tbl-screen-name">{s.name}</td>
                        <td>
                          <span className="ds-tbl-color-chip">
                            <span className="ds-tbl-color-dot" style={{ background: d.primary_color || SCREEN_VARIANTS[idx]?.color || '#6366f1' }} />
                            {d.primary_color || SCREEN_VARIANTS[idx]?.color || '#6366f1'}
                          </span>
                        </td>
                        <td>
                          <span className="ds-tbl-color-chip">
                            <span className="ds-tbl-color-dot" style={{ background: d.background_color || '#0f172a' }} />
                            {d.background_color || '#0f172a'}
                          </span>
                        </td>
                        <td className="ds-tbl-mono">{d.font_family || 'Inter'}</td>
                        <td><span className="ds-tbl-pill">{d.corner_style || 'rounded'}</span></td>
                        <td>
                          <span className={`ds-tbl-theme-badge ${d.theme === 'dark' ? 'dark' : 'light'}`}>
                            {d.theme === 'dark' ? <><Moon size={10} /> dark</> : <><Sun size={10} /> light</>}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
