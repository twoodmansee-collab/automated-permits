import React, { useState } from 'react';

const styles = {
  page: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--bg)',
    backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,212,170,0.08) 0%, transparent 70%)',
  },
  card: {
    width: '100%', maxWidth: '400px', padding: '48px 40px',
    background: 'var(--bg2)', border: '1px solid var(--border2)',
    borderRadius: '16px',
  },
  logoRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' },
  logoMark: {
    width: '36px', height: '36px', borderRadius: '8px',
    background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '18px', fontWeight: '600', color: '#0a0a0f',
  },
  logoText: { fontSize: '15px', fontWeight: '600', color: 'var(--text)', letterSpacing: '-0.2px' },
  logoSub: { fontSize: '11px', color: 'var(--text2)', letterSpacing: '0.05em', textTransform: 'uppercase' },
  heading: { fontSize: '22px', fontWeight: '600', color: 'var(--text)', marginBottom: '6px', letterSpacing: '-0.3px' },
  sub: { fontSize: '13px', color: 'var(--text2)', marginBottom: '32px' },
  label: { display: 'block', fontSize: '12px', fontWeight: '500', color: 'var(--text2)', marginBottom: '6px', letterSpacing: '0.03em' },
  input: {
    width: '100%', padding: '10px 14px', background: 'var(--bg3)',
    border: '1px solid var(--border2)', borderRadius: '8px',
    color: 'var(--text)', fontSize: '14px', outline: 'none',
    transition: 'border-color 0.15s',
    marginBottom: '16px',
  },
  btn: {
    width: '100%', padding: '12px', background: 'var(--accent)',
    border: 'none', borderRadius: '8px', color: '#0a0a0f',
    fontSize: '14px', fontWeight: '600', cursor: 'pointer',
    transition: 'background 0.15s', marginTop: '8px',
  },
  error: { fontSize: '12px', color: 'var(--red)', marginBottom: '12px', padding: '8px 12px', background: 'rgba(255,77,77,0.08)', borderRadius: '6px', border: '1px solid rgba(255,77,77,0.2)' },
  footer: { marginTop: '32px', paddingTop: '20px', borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '11px', color: 'var(--text3)' },
};

const DEMO_USERS = [
  { email: 'choates@servicetradesai.com', password: 'choates2024', company: "Choate's HVAC", role: 'admin' },
  { email: 'demo@servicetradesai.com', password: 'demo2024', company: 'Demo Company', role: 'viewer' },
];

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const user = DEMO_USERS.find(u => u.email === email && u.password === password);
      if (user) { onLogin(user); }
      else { setError('Invalid email or password.'); setLoading(false); }
    }, 800);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logoRow}>
          <div style={styles.logoMark}>S</div>
          <div>
            <div style={styles.logoText}>ServiceTrades AI</div>
            <div style={styles.logoSub}>Permit Dashboard</div>
          </div>
        </div>

        <div style={styles.heading}>Welcome back</div>
        <div style={styles.sub}>Sign in to your permit dashboard</div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handle}>
          <label style={styles.label}>Email address</label>
          <input style={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" required />
          <label style={styles.label}>Password</label>
          <input style={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div style={styles.footer}>
          Powered by ServiceTrades AI · app.servicetradesai.com<br />
          Need access? Contact your administrator.
        </div>
      </div>
    </div>
  );
}