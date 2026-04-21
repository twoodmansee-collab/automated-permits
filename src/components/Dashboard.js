import React, { useState } from 'react';
import PermitTable from './PermitTable';
import PermitDetail from './PermitDetail';
import StatsBar from './StatsBar';

const NAV = ['Dashboard', 'Permits', 'Inspections', 'Reports'];

const s = {
  shell: { display: 'flex', minHeight: '100vh', background: 'var(--bg)' },
  sidebar: {
    width: '220px', flexShrink: 0, background: 'var(--bg2)',
    borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column',
    padding: '0',
  },
  logoArea: { padding: '24px 20px 20px', borderBottom: '1px solid var(--border)' },
  logoRow: { display: 'flex', alignItems: 'center', gap: '10px' },
  logoMark: {
    width: '32px', height: '32px', borderRadius: '7px',
    background: 'var(--accent)', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '16px', fontWeight: '700', color: '#0a0a0f',
  },
  logoText: { fontSize: '13px', fontWeight: '600', color: 'var(--text)', letterSpacing: '-0.2px', lineHeight: 1.2 },
  logoSub: { fontSize: '10px', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.05em' },
  nav: { padding: '16px 10px', flex: 1 },
  navItem: (active) => ({
    display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px',
    borderRadius: '7px', cursor: 'pointer', marginBottom: '2px',
    background: active ? 'var(--accent-glow)' : 'transparent',
    color: active ? 'var(--accent)' : 'var(--text2)',
    fontSize: '13px', fontWeight: active ? '500' : '400',
    border: active ? '1px solid rgba(0,212,170,0.2)' : '1px solid transparent',
    transition: 'all 0.15s',
  }),
  navDot: (active) => ({
    width: '6px', height: '6px', borderRadius: '50%',
    background: active ? 'var(--accent)' : 'var(--text3)',
    flexShrink: 0,
  }),
  clientBox: {
    margin: '10px', padding: '12px', background: 'var(--bg3)',
    borderRadius: '8px', border: '1px solid var(--border)',
  },
  clientLabel: { fontSize: '10px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' },
  clientName: { fontSize: '13px', fontWeight: '500', color: 'var(--text)' },
  clientSub: { fontSize: '11px', color: 'var(--text2)', marginTop: '1px' },
  logoutBtn: {
    display: 'block', width: 'calc(100% - 20px)', margin: '0 10px 16px',
    padding: '8px', background: 'transparent', border: '1px solid var(--border)',
    borderRadius: '7px', color: 'var(--text2)', fontSize: '12px', cursor: 'pointer',
    transition: 'all 0.15s',
  },
  main: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  topbar: {
    padding: '16px 28px', borderBottom: '1px solid var(--border)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: 'var(--bg2)',
  },
  topbarTitle: { fontSize: '16px', fontWeight: '600', color: 'var(--text)', letterSpacing: '-0.2px' },
  topbarSub: { fontSize: '12px', color: 'var(--text2)', marginTop: '1px' },
  topbarRight: { display: 'flex', alignItems: 'center', gap: '12px' },
  liveChip: {
    display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px',
    background: 'rgba(0,212,170,0.08)', border: '1px solid rgba(0,212,170,0.2)',
    borderRadius: '20px', fontSize: '11px', color: 'var(--accent)',
  },
  liveDot: {
    width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)',
    animation: 'pulse 2s infinite',
  },
  content: { flex: 1, padding: '24px 28px', overflowY: 'auto' },
};

export default function Dashboard({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [selectedPermit, setSelectedPermit] = useState(null);

  return (
    <div style={s.shell}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .nav-item:hover { background: var(--bg3) !important; color: var(--text) !important; }
        .logout-btn:hover { border-color: var(--border2) !important; color: var(--text) !important; }
      `}</style>

      <div style={s.sidebar}>
        <div style={s.logoArea}>
          <div style={s.logoRow}>
            <div style={s.logoMark}>S</div>
            <div>
              <div style={s.logoText}>ServiceTrades AI</div>
              <div style={s.logoSub}>Permit Platform</div>
            </div>
          </div>
        </div>

        <div style={s.nav}>
          {NAV.map(item => (
            <div key={item} className="nav-item" style={s.navItem(activeNav === item)} onClick={() => { setActiveNav(item); setSelectedPermit(null); }}>
              <div style={s.navDot(activeNav === item)} />
              {item}
            </div>
          ))}
        </div>

        <div style={s.clientBox}>
          <div style={s.clientLabel}>Logged in as</div>
          <div style={s.clientName}>{user.company}</div>
          <div style={s.clientSub}>{user.email}</div>
        </div>
        <button className="logout-btn" style={s.logoutBtn} onClick={onLogout}>Sign out</button>
      </div>

      <div style={s.main}>
        <div style={s.topbar}>
          <div>
            <div style={s.topbarTitle}>
              {selectedPermit ? `Permit — ${selectedPermit.address}` : activeNav}
            </div>
            <div style={s.topbarSub}>
              {selectedPermit ? `${selectedPermit.jurisdiction} · ${selectedPermit.type}` : `${user.company} · Memphis, TN`}
            </div>
          </div>
          <div style={s.topbarRight}>
            <div style={s.liveChip}>
              <div style={s.liveDot} />
              Live sync
            </div>
          </div>
        </div>

        <div style={s.content}>
          {selectedPermit ? (
            <PermitDetail permit={selectedPermit} onBack={() => setSelectedPermit(null)} />
          ) : (
            <>
              <StatsBar />
              <PermitTable onSelect={setSelectedPermit} activeNav={activeNav} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}