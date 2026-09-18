import React from 'react'
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight,
  Search,
  User,
  Film,
  Home,
  Star,
  Wifi,
  BatteryMedium,
  Edit,
} from 'lucide-react'

// FMovies phone screen renderer — builds UI from knowledge base element data
function PhoneScreenRenderer({ screen }) {
  const ct = screen?.phoneState?.customContent

  // ── Home ──────────────────────────────────────────────────
  if (ct === 'home') return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F2F4FA', fontFamily: 'Inter, sans-serif' }}>
      {/* App bar */}
      <div style={{ background: '#F2F4FA', padding: '10px 12px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 800, fontSize: '0.82rem', color: '#1A2340' }}>FMovies Home</span>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#3D5A99', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <User size={14} color="#fff" />
        </div>
      </div>
      {/* Greeting */}
      <div style={{ padding: '8px 12px 4px' }}>
        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1A2340' }}>Hello, Movie Buff!</div>
        <div style={{ fontSize: '0.6rem', color: '#6B7280' }}>You have 0 active rentals</div>
      </div>
      {/* Quick actions */}
      <div style={{ padding: '6px 12px', display: 'flex', gap: 8 }}>
        {[
          { icon: <Search size={14} />, label: 'Explore', sub: 'Find movies' },
          { icon: <Film size={14} />, label: 'Rentals', sub: 'Manage items' }
        ].map(a => (
          <div key={a.label} style={{ flex: 1, background: '#EDF0F8', borderRadius: 10, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 3, border: '1px solid #DDE3F0' }}>
            <div style={{ color: '#3D5A99' }}>{a.icon}</div>
            <div style={{ fontWeight: 700, fontSize: '0.7rem', color: '#1A2340' }}>{a.label}</div>
            <div style={{ fontSize: '0.55rem', color: '#6B7280' }}>{a.sub}</div>
          </div>
        ))}
      </div>
      {/* Featured Movies */}
      <div style={{ padding: '4px 12px 2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 800, fontSize: '0.72rem', color: '#1A2340' }}>Featured Movies</span>
        <span style={{ fontSize: '0.55rem', color: '#3D5A99', fontWeight: 600 }}>See All →</span>
      </div>
      {/* Movie posters */}
      <div style={{ padding: '4px 12px', display: 'flex', gap: 6, overflow: 'hidden' }}>
        {[
          { title: 'Shawshank Redemption', genre: 'Drama', color: '#8B6914' },
          { title: 'The Godfather', genre: 'Crime', color: '#2C3E50' },
        ].map(m => (
          <div key={m.title} style={{ flex: 1, background: m.color, borderRadius: 8, overflow: 'hidden', minHeight: 60, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div style={{ background: 'rgba(0,0,0,0.55)', padding: '4px 6px' }}>
              <div style={{ color: '#fff', fontSize: '0.48rem', fontWeight: 700, lineHeight: 1.2 }}>{m.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.42rem' }}>{m.genre}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Bottom nav */}
      <div style={{ marginTop: 'auto', borderTop: '1px solid #DDE3F0', background: '#fff', display: 'flex', justifyContent: 'space-around', padding: '6px 0 2px' }}>
        {[
          { icon: <Home size={14} />, label: 'Home', active: true },
          { icon: <Search size={14} />, label: 'Explore' },
          { icon: <Film size={14} />, label: 'Rentals' },
          { icon: <User size={14} />, label: 'Profile' }
        ].map(n => (
          <div key={n.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            {n.active
              ? <div style={{ background: '#EDF0F8', borderRadius: 10, padding: '3px 8px', color: '#3D5A99' }}>{n.icon}</div>
              : <div style={{ color: '#94a3b8' }}>{n.icon}</div>
            }
            <span style={{ fontSize: '0.45rem', color: n.active ? '#3D5A99' : '#94a3b8', fontWeight: n.active ? 700 : 400 }}>{n.label}</span>
          </div>
        ))}
      </div>
    </div>
  )

  // ── Movie Explorer ────────────────────────────────────────
  if (ct === 'explorer') return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F2F4FA', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ padding: '10px 12px 4px' }}>
        <span style={{ fontWeight: 800, fontSize: '0.82rem', color: '#1A2340' }}>Movie Explorer</span>
      </div>
      {/* Search */}
      <div style={{ margin: '4px 12px', background: '#fff', borderRadius: 20, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 5, border: '1px solid #DDE3F0' }}>
        <Search size={11} color="#94a3b8" />
        <span style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Search movies...</span>
      </div>
      {/* Genre chips */}
      <div style={{ padding: '4px 12px', display: 'flex', gap: 4, overflow: 'hidden' }}>
        {['All','Action','Adventure'].map((g, i) => (
          <div key={g} style={{ padding: '2px 8px', borderRadius: 99, fontSize: '0.5rem', fontWeight: 600, background: i === 0 ? '#3D5A99' : 'transparent', color: i === 0 ? '#fff' : '#6B7280', border: `1px solid ${i === 0 ? '#3D5A99' : '#DDE3F0'}` }}>{g}</div>
        ))}
      </div>
      {/* Movie cards */}
      {[
        { title: 'The Shawshank Redemption', genre: 'Drama',   rating: '9.3', price: '₹6.98', bg: '#8B6914' },
        { title: 'The Godfather',            genre: 'Crime',   rating: '9.2', price: '₹6.90', bg: '#2C3E50' },
      ].map(m => (
        <div key={m.title} style={{ margin: '3px 12px', background: '#fff', borderRadius: 10, padding: '7px', display: 'flex', gap: 8, border: '1px solid #EDF0F8', alignItems: 'flex-start' }}>
          <div style={{ width: 36, height: 50, background: m.bg, borderRadius: 6, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: '0.62rem', color: '#1A2340', lineHeight: 1.2 }}>{m.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 3 }}>
              <Star size={8} color="#F59E0B" fill="#F59E0B" />
              <span style={{ fontSize: '0.55rem', fontWeight: 700, color: '#1A2340' }}>{m.rating}</span>
            </div>
            <div style={{ fontSize: '0.5rem', color: '#6B7280' }}>{m.price} / day</div>
            <div style={{ marginTop: 4, background: '#3D5A99', color: '#fff', borderRadius: 99, padding: '2px 10px', fontSize: '0.5rem', fontWeight: 700, display: 'inline-block' }}>Rent</div>
          </div>
        </div>
      ))}
      {/* Bottom nav */}
      <div style={{ marginTop: 'auto', borderTop: '1px solid #DDE3F0', background: '#fff', display: 'flex', justifyContent: 'space-around', padding: '6px 0 2px' }}>
        {[<Home size={13} />, <Search size={13} />, <Film size={13} />, <User size={13} />].map((ic, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            {i === 1 ? <div style={{ background: '#EDF0F8', borderRadius: 10, padding: '3px 8px', color: '#3D5A99' }}>{ic}</div> : <div style={{ color: '#94a3b8' }}>{ic}</div>}
            <span style={{ fontSize: '0.4rem', color: i === 1 ? '#3D5A99' : '#94a3b8' }}>{['Home','Explore','Rentals','Profile'][i]}</span>
          </div>
        ))}
      </div>
    </div>
  )

  // ── My Rentals ────────────────────────────────────────────
  if (ct === 'rentals') return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F2F4FA', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ padding: '10px 12px 4px' }}>
        <span style={{ fontWeight: 800, fontSize: '0.82rem', color: '#1A2340' }}>My Rentals</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Film size={28} color="#94a3b8" />
        <div style={{ fontSize: '0.65rem', color: '#6B7280', fontWeight: 600 }}>No active rentals</div>
        <div style={{ fontSize: '0.55rem', color: '#94a3b8', textAlign: 'center', padding: '0 16px' }}>Rent a movie from Explorer to see it here.</div>
      </div>
      {/* Reminder interval */}
      <div style={{ padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #DDE3F0' }}>
        <div>
          <div style={{ fontSize: '0.6rem', color: '#1A2340', fontWeight: 600 }}>Reminder interval</div>
          <div style={{ fontSize: '0.52rem', color: '#6B7280' }}>Every 12 hour(s)</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['−', '+'].map(s => (
            <div key={s} style={{ width: 24, height: 24, borderRadius: '50%', background: '#fff', border: '1px solid #DDE3F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: '#1A2340', fontWeight: 700 }}>{s}</div>
          ))}
        </div>
      </div>
      {/* Bottom nav */}
      <div style={{ borderTop: '1px solid #DDE3F0', background: '#fff', display: 'flex', justifyContent: 'space-around', padding: '6px 0 2px' }}>
        {[<Home size={13} />, <Search size={13} />, <Film size={13} />, <User size={13} />].map((ic, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            {i === 2 ? <div style={{ background: '#EDF0F8', borderRadius: 10, padding: '3px 8px', color: '#3D5A99' }}>{ic}</div> : <div style={{ color: '#94a3b8' }}>{ic}</div>}
            <span style={{ fontSize: '0.4rem', color: i === 2 ? '#3D5A99' : '#94a3b8' }}>{['Home','Explore','Rentals','Profile'][i]}</span>
          </div>
        ))}
      </div>
    </div>
  )

  // ── User Profile ──────────────────────────────────────────
  if (ct === 'profile') return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F2F4FA', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ padding: '10px 12px 4px' }}>
        <span style={{ fontWeight: 800, fontSize: '0.82rem', color: '#1A2340' }}>User Profile</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0 8px' }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#3D5A99', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <User size={22} color="#fff" />
        </div>
        <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#1A2340', marginTop: 6 }}>John Doe</div>
        <div style={{ fontSize: '0.55rem', color: '#6B7280' }}>john.doe@example.com</div>
        <div style={{ marginTop: 8, background: '#3D5A99', color: '#fff', borderRadius: 99, padding: '5px 18px', fontSize: '0.6rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Edit size={10} /> Edit Profile
        </div>
      </div>
      {/* Settings */}
      <div style={{ margin: '0 10px', background: '#fff', borderRadius: 10, border: '1px solid #DDE3F0', overflow: 'hidden' }}>
        {[
          { label: 'Push Notifications', sub: 'Get reminders for rentals', on: true },
          { label: 'Dark Mode', sub: 'Use dark theme', on: false }
        ].map((s, i) => (
          <div key={s.label} style={{ padding: '7px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i === 0 ? '1px solid #EDF0F8' : 'none' }}>
            <div>
              <div style={{ fontSize: '0.6rem', fontWeight: 600, color: '#1A2340' }}>{s.label}</div>
              <div style={{ fontSize: '0.48rem', color: '#6B7280' }}>{s.sub}</div>
            </div>
            <div style={{ width: 24, height: 13, borderRadius: 99, background: s.on ? '#3D5A99' : '#DDE3F0', position: 'relative' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff', position: 'absolute', top: 1.5, left: s.on ? 12 : 2, transition: 'left 0.2s' }} />
            </div>
          </div>
        ))}
      </div>
      {/* Bottom nav */}
      <div style={{ marginTop: 'auto', borderTop: '1px solid #DDE3F0', background: '#fff', display: 'flex', justifyContent: 'space-around', padding: '6px 0 2px' }}>
        {[<Home size={13} />, <Search size={13} />, <Film size={13} />, <User size={13} />].map((ic, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            {i === 3 ? <div style={{ background: '#EDF0F8', borderRadius: 10, padding: '3px 8px', color: '#3D5A99' }}>{ic}</div> : <div style={{ color: '#94a3b8' }}>{ic}</div>}
            <span style={{ fontSize: '0.4rem', color: i === 3 ? '#3D5A99' : '#94a3b8' }}>{['Home','Explore','Rentals','Profile'][i]}</span>
          </div>
        ))}
      </div>
    </div>
  )

  // ── Edit Profile ──────────────────────────────────────────
  if (ct === 'edit_profile') return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F2F4FA', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ padding: '10px 12px 4px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <ArrowLeft size={13} color="#1A2340" />
        <span style={{ fontWeight: 700, fontSize: '0.75rem', color: '#1A2340' }}>Edit Profile</span>
      </div>
      <div style={{ padding: '8px 12px 4px' }}>
        <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#1A2340' }}>Edit Profile</div>
      </div>
      <div style={{ padding: '4px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[
          { label: 'Name',  icon: <User size={10} />,   value: 'John Doe' },
          { label: 'Email', icon: '✉', value: 'john.doe@example.com' },
          { label: 'Phone', icon: '📞', value: '+1 234 567 890' }
        ].map(f => (
          <div key={f.label} style={{ border: '1px solid #DDE3F0', borderRadius: 8, background: '#fff', padding: '6px 9px' }}>
            <div style={{ fontSize: '0.48rem', color: '#6B7280', marginBottom: 2 }}>{f.label}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ color: '#3D5A99', fontSize: '0.55rem' }}>{f.icon}</span>
              <span style={{ fontSize: '0.6rem', color: '#1A2340', fontWeight: 500 }}>{f.value}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 'auto', padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ background: '#3D5A99', color: '#fff', borderRadius: 99, padding: '7px', textAlign: 'center', fontSize: '0.62rem', fontWeight: 700 }}>Save Profile</div>
        <div style={{ border: '1px solid #DDE3F0', borderRadius: 99, padding: '6px', textAlign: 'center', fontSize: '0.62rem', color: '#1A2340' }}>Cancel</div>
      </div>
    </div>
  )

  // ── Movie Detail ──────────────────────────────────────────
  if (ct === 'movie_detail') return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F2F4FA', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      <div style={{ background: '#8B6914', height: 80, display: 'flex', alignItems: 'flex-end', padding: '6px 10px' }}>
        <div style={{ background: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: 4 }}>
          <div style={{ color: '#fff', fontSize: '0.7rem', fontWeight: 800 }}>The Shawshank Redemption</div>
          <div style={{ color: '#d1d5db', fontSize: '0.5rem' }}>Drama • 1994</div>
        </div>
      </div>
      <div style={{ padding: '8px 12px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
          <Star size={11} color="#F59E0B" fill="#F59E0B" />
          <span style={{ fontWeight: 700, fontSize: '0.65rem', color: '#1A2340' }}>9.3</span>
          <span style={{ fontSize: '0.55rem', color: '#6B7280' }}>• ₹6.98 / day</span>
        </div>
        <p style={{ fontSize: '0.55rem', color: '#6B7280', lineHeight: 1.5, margin: 0 }}>
          Over the course of several years, two convicts form a friendship seeking consolation and redemption.
        </p>
      </div>
      <div style={{ padding: '6px 12px 8px' }}>
        <div style={{ background: '#3D5A99', color: '#fff', borderRadius: 99, padding: '7px', textAlign: 'center', fontSize: '0.65rem', fontWeight: 700 }}>Rent — ₹6.98/day</div>
      </div>
    </div>
  )

  // Generic fallback
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F2F4FA', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <Film size={28} color="#94a3b8" />
      <div style={{ fontSize: '0.65rem', color: '#6B7280', marginTop: 8 }}>{screen?.name || 'Screen Preview'}</div>
    </div>
  )
}

export default function ScreenSidebar({ 
  screen, 
  totalScreens = 6, 
  currentIndex = 1, 
  onNext, 
  onPrev,
  onNavigateToScreen
}) {
  if (!screen) return null

  const elements = screen.elements || []

  return (
    <aside className="screen-details-card">
      {/* Header Row */}
      <div className="screen-details-header">
        <div className="details-title-row">
          <span className="details-title">Screen Details</span>
          <span className="details-counter">{currentIndex} of {totalScreens}</span>
        </div>

        <div className="details-nav-arrows">
          <button className="btn-icon-subtle" onClick={onPrev} title="Previous screen">
            <ChevronLeft size={16} />
          </button>
          <button className="btn-icon-subtle" onClick={onNext} title="Next screen">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Screen Title & ID Banner */}
      <div className="screen-banner-row">
        <div className="screen-icon-square" style={{ background: screen.borderColor || 'rgba(61,90,153,0.15)', color: screen.iconColor || '#3D5A99' }}>
          <Film size={20} />
        </div>
        <div>
          <div className="screen-banner-name">{screen.name}</div>
          <div className="screen-banner-id">{screen.screen_id} · {screen.category}</div>
        </div>
      </div>

      {/* Realistic Phone Mockup — built from knowledge base */}
      <div className="phone-preview-wrapper">
        <div className="realistic-phone" style={{ background: '#F2F4FA' }}>
          {/* Status Bar */}
          <div className="phone-status-bar" style={{ background: '#F2F4FA', color: '#1A2340' }}>
            <span style={{ color: '#6B7280', fontSize: '0.55rem' }}>9:41</span>
            <div className="phone-notch-island" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6B7280' }}>
              <Wifi size={11} />
              <BatteryMedium size={13} />
            </div>
          </div>
          {/* Screen content */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <PhoneScreenRenderer screen={screen} />
          </div>
        </div>
      </div>

      {/* AI Reconstruction label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.6rem', background: 'rgba(61,90,153,0.08)', border: '1px dashed rgba(61,90,153,0.25)', borderRadius: '6px', fontSize: '0.68rem', color: '#5C7EC7' }}>
        <span>🤖</span>
        <span>Screen reconstructed from knowledge base elements</span>
      </div>

      {/* Purpose */}
      <div>
        <div className="details-section-label">Purpose</div>
        <p className="purpose-content-text">{screen.purpose}</p>
      </div>

      {/* Elements Stack */}
      <div>
        <div className="details-section-label">Elements ({elements.length})</div>
        <div className="elements-stack-list">
          {elements.map((el, i) => {
            const isHighlighted = el.isPrimary || el.interactive
            return (
              <div key={i} className={`element-row-item ${isHighlighted ? 'highlighted' : ''}`}>
                <span className="element-icon-chip">{el.icon || 'T'}</span>
                <span>{el.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation Links */}
      <div>
        <div className="details-section-label">Navigation</div>
        <div className="nav-direction-row">
          <div className="nav-direction-box">
            <div className="nav-direction-label">Previous Screen</div>
            <button 
              className="nav-btn-pill"
              onClick={() => onNavigateToScreen && onNavigateToScreen(screen.navigation?.prev)}
              disabled={!screen.navigation?.prev}
            >
              <ArrowLeft size={13} />
              <span>{screen.navigation?.prev || 'None'}</span>
            </button>
          </div>

          <div className="nav-direction-box">
            <div className="nav-direction-label">Next Screen</div>
            <button 
              className="nav-btn-pill"
              onClick={() => onNavigateToScreen && onNavigateToScreen(screen.navigation?.next)}
              disabled={!screen.navigation?.next}
            >
              <span>{screen.navigation?.next || 'None'}</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
