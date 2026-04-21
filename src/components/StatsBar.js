import React from 'react';

const STATS = [
  { label: 'Submitted this month', value: '47', sub: '↑ 12 from last month', subColor: 'var(--accent)' },
  { label: 'Pending review', value: '8', sub: 'Shelby ×4 · Bartlett ×3 · CV ×1', subColor: 'var(--text2)' },
  { label: 'Approved', value: '31', sub: 'Ready for inspection', subColor: 'var(--accent)' },
  { label: 'Inspections this week', value: '6', sub: '2 scheduled today', subColor: 'var(--blue)' },
  { label: 'Action needed', value: '3', sub: 'Missing info or docs', subColor: 'var(--red)' },
];

const s = {
  row: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '24px' },
  card: {
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: '10px', padding: '16px 18px',
  },
  label: { fontSize: '11px', color: 'var(--text2)', marginBottom: '8px', letterSpacing: '0.02em' },
  value: { fontSize: '26px', fontWeight: '600', color: 'var(--text)', letterSpacing: '-0.5px', lineHeight: 1 },
  sub: { fontSize: '11px', marginTop: '6px' },
};

export default function StatsBar() {
  return (
    <div style={s.row}>
      {STATS.map((st, i) => (
        <div key={i} style={s.card}>
          <div style={s.label}>{st.label}</div>
          <div style={s.value}>{st.value}</div>
          <div style={{ ...s.sub, color: st.subColor }}>{st.sub}</div>
        </div>
      ))}
    </div>
  );
}