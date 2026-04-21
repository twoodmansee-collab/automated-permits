import React, { useState } from 'react';

export const PERMITS = [
  { id: 'SHB-2024-0441', address: '4812 Quince Rd', jurisdiction: 'Shelby County', type: 'HVAC Replacement', status: 'Pending Review', submitted: 'Apr 18, 2026', tech: 'Marcus R.', accelaId: 'REC-2024-441', inspectionDate: null, fee: '$85', notes: 'Trane XR15 2-ton split system. Standard residential replacement.' },
  { id: 'SHB-2024-0440', address: '2201 Germantown Pkwy', jurisdiction: 'Shelby County', type: 'Plumbing', status: 'Approved', submitted: 'Apr 17, 2026', tech: 'James T.', accelaId: 'REC-2024-440', inspectionDate: 'Apr 23, 2026', fee: '$65', notes: 'Water heater replacement. 50gal gas Bradford White.' },
  { id: 'BAR-2024-0112', address: '211 Stage Rd', jurisdiction: 'Bartlett', type: 'Mechanical', status: 'Submitted', submitted: 'Apr 17, 2026', tech: 'Derek W.', accelaId: null, inspectionDate: null, fee: '$75', notes: 'PDF submitted via email to Bartlett Building Dept. Awaiting confirmation.' },
  { id: 'CV-2024-0089', address: '8901 Macon Rd', jurisdiction: 'Collierville', type: 'HVAC Replacement', status: 'Approved', submitted: 'Apr 15, 2026', tech: 'Tony S.', accelaId: null, inspectionDate: 'Apr 22, 2026', fee: '$90', notes: 'iWorQ portal submission confirmed. Inspection scheduled.' },
  { id: 'SHB-2024-0438', address: '553 Shelby Dr', jurisdiction: 'Shelby County', type: 'Gas Line', status: 'Action Needed', submitted: 'Apr 14, 2026', tech: 'Marcus R.', accelaId: 'REC-2024-438', inspectionDate: null, fee: '$95', notes: 'County requesting additional contractor license documentation.' },
  { id: 'BAR-2024-0111', address: '6677 Stage Rd', jurisdiction: 'Bartlett', type: 'Plumbing', status: 'Approved', submitted: 'Apr 12, 2026', tech: 'James T.', accelaId: null, inspectionDate: 'Apr 21, 2026', fee: '$75', notes: 'PDF submitted and confirmed by Bartlett.' },
  { id: 'SHB-2024-0436', address: '3301 Poplar Ave', jurisdiction: 'Shelby County', type: 'HVAC Replacement', status: 'Inspection Scheduled', submitted: 'Apr 10, 2026', tech: 'Derek W.', accelaId: 'REC-2024-436', inspectionDate: 'Apr 21, 2026', fee: '$85', notes: 'Carrier 3-ton. Inspection set for 9am-12pm window.' },
  { id: 'CV-2024-0087', address: '1104 W Poplar Ave', jurisdiction: 'Collierville', type: 'Plumbing', status: 'Pending Review', submitted: 'Apr 9, 2026', tech: 'Tony S.', accelaId: null, inspectionDate: null, fee: '$80', notes: 'iWorQ portal submission. Awaiting CV building dept review.' },
  { id: 'SHB-2024-0434', address: '7712 Winchester Rd', jurisdiction: 'Shelby County', type: 'Electrical', status: 'Closed', submitted: 'Apr 5, 2026', tech: 'Marcus R.', accelaId: 'REC-2024-434', inspectionDate: 'Apr 18, 2026', fee: '$75', notes: 'Passed inspection. Job complete and closed.' },
];

const STATUS_COLORS = {
  'Pending Review':        { bg: 'rgba(245,166,35,0.1)',  border: 'rgba(245,166,35,0.25)',  text: '#f5a623' },
  'Approved':              { bg: 'rgba(0,212,170,0.1)',   border: 'rgba(0,212,170,0.25)',   text: 'var(--accent)' },
  'Submitted':             { bg: 'rgba(74,158,255,0.1)',  border: 'rgba(74,158,255,0.25)',  text: 'var(--blue)' },
  'Action Needed':         { bg: 'rgba(255,77,77,0.1)',   border: 'rgba(255,77,77,0.25)',   text: 'var(--red)' },
  'Inspection Scheduled':  { bg: 'rgba(74,158,255,0.1)',  border: 'rgba(74,158,255,0.25)',  text: 'var(--blue)' },
  'Closed':                { bg: 'rgba(100,100,120,0.1)', border: 'rgba(100,100,120,0.2)',  text: 'var(--text3)' },
};

const JUR_COLORS = {
  'Shelby County': { color: '#a78bfa' },
  'Bartlett':      { color: '#fb923c' },
  'Collierville':  { color: '#38bdf8' },
};

const s = {
  section: { marginBottom: '8px' },
  sectionHead: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' },
  sectionTitle: { fontSize: '13px', fontWeight: '500', color: 'var(--text)' },
  filterRow: { display: 'flex', gap: '8px' },
  filterBtn: (active) => ({
    padding: '4px 12px', borderRadius: '20px', fontSize: '11px', cursor: 'pointer',
    border: active ? '1px solid rgba(0,212,170,0.4)' : '1px solid var(--border)',
    background: active ? 'rgba(0,212,170,0.08)' : 'transparent',
    color: active ? 'var(--accent)' : 'var(--text2)',
    transition: 'all 0.15s',
  }),
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { fontSize: '10px', fontWeight: '500', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '8px 14px', textAlign: 'left', borderBottom: '1px solid var(--border)' },
  tr: { borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.1s' },
  td: { padding: '12px 14px', fontSize: '13px', color: 'var(--text)' },
  badge: (status) => ({
    display: 'inline-block', fontSize: '10px', fontWeight: '500', padding: '3px 8px',
    borderRadius: '20px', border: `1px solid ${STATUS_COLORS[status]?.border || 'var(--border)'}`,
    background: STATUS_COLORS[status]?.bg || 'transparent',
    color: STATUS_COLORS[status]?.text || 'var(--text2)',
    whiteSpace: 'nowrap',
  }),
  jurDot: (jur) => ({
    display: 'inline-flex', alignItems: 'center', gap: '5px',
    fontSize: '12px', color: JUR_COLORS[jur]?.color || 'var(--text2)',
  }),
  dot: (jur) => ({
    width: '5px', height: '5px', borderRadius: '50%',
    background: JUR_COLORS[jur]?.color || 'var(--text2)', flexShrink: 0,
  }),
  mono: { fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text2)' },
  emptyRow: { padding: '40px', textAlign: 'center', color: 'var(--text3)', fontSize: '13px' },
};

const FILTERS = ['All', 'Shelby County', 'Bartlett', 'Collierville'];

export default function PermitTable({ onSelect, activeNav }) {
  const [filter, setFilter] = useState('All');

  let permits = PERMITS;
  if (activeNav === 'Inspections') permits = PERMITS.filter(p => p.inspectionDate);
  if (filter !== 'All') permits = permits.filter(p => p.jurisdiction === filter);

  return (
    <div style={s.section}>
      <div style={s.sectionHead}>
        <div style={s.sectionTitle}>
          {activeNav === 'Inspections' ? 'Scheduled inspections' : 'All permits'}
          <span style={{ color: 'var(--text3)', fontWeight: '400', marginLeft: '8px' }}>({permits.length})</span>
        </div>
        <div style={s.filterRow}>
          {FILTERS.map(f => (
            <button key={f} style={s.filterBtn(filter === f)} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Permit ID</th>
              <th style={s.th}>Address</th>
              <th style={s.th}>Jurisdiction</th>
              <th style={s.th}>Type</th>
              <th style={s.th}>Status</th>
              <th style={s.th}>Submitted</th>
              <th style={s.th}>Tech</th>
              {activeNav === 'Inspections' && <th style={s.th}>Inspection date</th>}
            </tr>
          </thead>
          <tbody>
            {permits.length === 0 ? (
              <tr><td colSpan="8" style={s.emptyRow}>No permits found</td></tr>
            ) : permits.map(p => (
              <tr key={p.id} style={s.tr} onClick={() => onSelect(p)}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={s.td}><span style={s.mono}>{p.id}</span></td>
                <td style={s.td}>{p.address}</td>
                <td style={s.td}>
                  <span style={s.jurDot(p.jurisdiction)}>
                    <span style={s.dot(p.jurisdiction)} />{p.jurisdiction}
                  </span>
                </td>
                <td style={{ ...s.td, color: 'var(--text2)' }}>{p.type}</td>
                <td style={s.td}><span style={s.badge(p.status)}>{p.status}</span></td>
                <td style={{ ...s.td, color: 'var(--text2)', fontSize: '12px' }}>{p.submitted}</td>
                <td style={{ ...s.td, color: 'var(--text2)' }}>{p.tech}</td>
                {activeNav === 'Inspections' && <td style={{ ...s.td, color: 'var(--blue)', fontSize: '12px' }}>{p.inspectionDate || '—'}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}