# ARC_OS — Design System

## Colors
```css
--bg-void: #000000;
--arc-blue: #00D9FF;
--terminal-green: #00FF41;
--text-white: #FFFFFF;
--warning-red: #FF3D3D;
--glass-surface: rgba(255,255,255,0.04);
--glass-border: rgba(0,217,255,0.18);
--glow-blue: 0 0 24px rgba(0,217,255,0.5);
--glow-green: 0 0 24px rgba(0,255,65,0.5);
--radius-card: 12px;
--radius-modal: 16px;
--transition-fast: 150ms ease;
--transition-med: 300ms cubic-bezier(0.4,0,0.2,1);
--transition-slow: 600ms cubic-bezier(0.16,1,0.3,1);
```

## Typography
| Font | Usage | Weights |
|------|-------|---------|
| Orbitron | Headings, titles | 400,700,900 |
| Rajdhani | Subheadings, UI labels | 400,500,600,700 |
| Exo 2 | Body text | 300,400,500,600 |
| Share Tech Mono | Terminal, code, IDs | 400 |

## Glassmorphism
```css
backdrop-filter: blur(12px) saturate(140%);
background: var(--glass-surface);
border: 1px solid var(--glass-border);
```

## Dot Grid Background
```css
background-color: #000;
background-image: radial-gradient(rgba(0,217,255,0.15) 1px, transparent 1px);
background-size: 28px 28px;
```

## Component States
- Subject Card: 0%=blue glow → 100%=green glow+"MASTERED"
- Question Row: ○ grey (unviewed) → ✓ green (viewed)

## Responsive: ≥1024px desktop orbit, <768px mobile stack
