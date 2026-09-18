import React, { useState } from 'react'
import { 
  Home, 
  Search,
  Film,
  User,
  Edit,
  Star,
  Maximize2
} from 'lucide-react'

export default function AppMapView({ screens = [], activeScreen, onSelectScreen }) {
  const [zoom, setZoom] = useState(1)

  // FMovies screen hierarchy
  const nodeLayout = [
    {
      id: "screen_01",
      badge: 1,
      name: "Home",
      elements: 7,
      icon: Home,
      iconColor: "#60a5fa",
      iconBg: "rgba(96, 165, 250, 0.2)",
      borderColor: "#3D5A99",
      x: 270,
      y: 20
    },
    {
      id: "screen_02",
      badge: 2,
      name: "Movie Explorer",
      elements: 8,
      icon: Search,
      iconColor: "#818cf8",
      iconBg: "rgba(129, 140, 248, 0.2)",
      borderColor: "#5C7EC7",
      x: 60,
      y: 145
    },
    {
      id: "screen_03",
      badge: 3,
      name: "My Rentals",
      elements: 4,
      icon: Film,
      iconColor: "#c084fc",
      iconBg: "rgba(192, 132, 252, 0.2)",
      borderColor: "#6B46C1",
      x: 270,
      y: 145
    },
    {
      id: "screen_04",
      badge: 4,
      name: "User Profile",
      elements: 8,
      icon: User,
      iconColor: "#34d399",
      iconBg: "rgba(52, 211, 153, 0.2)",
      borderColor: "#3D5A99",
      x: 480,
      y: 145
    },
    {
      id: "screen_06",
      badge: 6,
      name: "Movie Detail",
      elements: 6,
      icon: Star,
      iconColor: "#fbbf24",
      iconBg: "rgba(251, 191, 36, 0.2)",
      borderColor: "#D69E2E",
      x: 60,
      y: 270
    },
    {
      id: "screen_05",
      badge: 5,
      name: "Edit Profile",
      elements: 7,
      icon: Edit,
      iconColor: "#f87171",
      iconBg: "rgba(248, 113, 113, 0.2)",
      borderColor: "#E53E3E",
      x: 480,
      y: 270
    }
  ]

  const edges = [
    // Home → Explorer, Rentals, Profile
    { from: "screen_01", to: "screen_02", d: "M 300 90 C 230 110, 170 120, 160 145" },
    { from: "screen_01", to: "screen_03", d: "M 340 90 L 340 145" },
    { from: "screen_01", to: "screen_04", d: "M 380 90 C 440 110, 510 120, 540 145" },
    // Explorer → Movie Detail
    { from: "screen_02", to: "screen_06", d: "M 130 215 L 130 270" },
    // Movie Detail → Rentals
    { from: "screen_06", to: "screen_03", d: "M 200 305 C 230 320, 290 320, 310 295" },
    // Profile → Edit Profile
    { from: "screen_04", to: "screen_05", d: "M 550 215 L 550 270" }
  ]

  const handleZoom = (delta) => {
    setZoom((prev) => Math.min(Math.max(0.7, prev + delta), 1.5))
  }

  const handleSelectNode = (nodeId) => {
    const matched = screens.find((s) => s.screen_id === nodeId)
    if (matched && onSelectScreen) {
      onSelectScreen(matched)
    }
  }

  return (
    <div className="app-map-card">
      <div className="map-card-header">
        <div>
          <div className="map-heading-title">Application Map</div>
          <div className="map-heading-sub">Visual representation of the app's screens and navigation flow</div>
        </div>

        <div className="map-zoom-tools">
          <button className="btn-zoom" onClick={() => handleZoom(-0.15)} title="Zoom Out">−</button>
          <button className="btn-zoom" onClick={() => handleZoom(0.15)} title="Zoom In">+</button>
          <button className="btn-zoom text-btn" onClick={() => setZoom(1)}>Reset</button>
          <button className="btn-zoom" onClick={() => setZoom(1.15)} title="Fit to Screen">
            <Maximize2 size={13} />
          </button>
        </div>
      </div>

      <div className="map-canvas-area">
        <svg 
          width="680" 
          height="480" 
          viewBox="0 0 680 480"
          style={{ 
            transform: `scale(${zoom})`, 
            transformOrigin: 'center center',
            transition: 'transform 0.2s ease-out' 
          }}
        >
          <defs>
            <marker
              id="map-arrow"
              markerWidth="8"
              markerHeight="6"
              refX="6"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#6366f1" />
            </marker>
          </defs>

          {/* Curved Connector Lines */}
          {edges.map((edge, idx) => (
            <path
              key={idx}
              d={edge.d}
              fill="none"
              stroke="#4338ca"
              strokeWidth="2"
              strokeDasharray={edge.d.includes('C') ? 'none' : 'none'}
              markerEnd="url(#map-arrow)"
            />
          ))}

          {/* Screen Cards / Nodes */}
          {nodeLayout.map((node) => {
            const Icon = node.icon
            const isSelected = activeScreen?.screen_id === node.id || (!activeScreen && node.id === 'screen_05')

            return (
              <g 
                key={node.id} 
                className={`svg-node ${isSelected ? 'active' : ''}`}
                onClick={() => handleSelectNode(node.id)}
                transform={`translate(${node.x}, ${node.y})`}
              >
                {/* Node Card Box */}
                <rect
                  className="node-bg"
                  x="0"
                  y="0"
                  width="140"
                  height="70"
                  rx="12"
                  fill="#0e1424"
                  stroke={isSelected ? "#6366f1" : node.borderColor}
                  strokeWidth={isSelected ? "2" : "1.5"}
                />

                {/* Left Icon in Colored Rounded Square */}
                <rect
                  x="12"
                  y="16"
                  width="36"
                  height="36"
                  rx="8"
                  fill={node.iconBg}
                />
                <foreignObject x="18" y="22" width="24" height="24">
                  <div style={{ color: node.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={20} />
                  </div>
                </foreignObject>

                {/* Node Title */}
                <text
                  x="56"
                  y="32"
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="Inter, sans-serif"
                >
                  {node.name}
                </text>

                {/* Element Count Subtitle */}
                <text
                  x="56"
                  y="48"
                  fill="#94a3b8"
                  fontSize="10"
                  fontFamily="Inter, sans-serif"
                >
                  {node.elements} elements
                </text>

                {/* Top-Right Numbered Badge Circle */}
                <circle
                  cx="128"
                  cy="12"
                  r="8"
                  fill={isSelected ? "#6366f1" : "#1e293b"}
                  stroke={node.borderColor}
                  strokeWidth="1"
                />
                <text
                  x="128"
                  y="15"
                  fill="#ffffff"
                  fontSize="9"
                  fontWeight="700"
                  fontFamily="Inter, sans-serif"
                  textAnchor="middle"
                >
                  {node.badge}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
