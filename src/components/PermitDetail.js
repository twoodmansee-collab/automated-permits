import React from 'react';

const STATUS_COLORS = {
  'Pending Review':        { bg: 'rgba(245,166,35,0.1)',  border: 'rgba(245,166,35,0.25)',  text: '#f5a623' },
  'Approved':              { bg: 'rgba(0,212,170,0.1)',   border: 'rgba(0,212,170,0.25)',   text: 'var(--accent)' },
  'Submitted':             { bg: 'rgba(74,158,255,0.1)',  border: 'rgba(74,158,255,0.25)',  text: 'var(--blue)' },
  'Action Needed':         { bg: 'rgba(255,77,77,0.1)',   border: 'rgba(255,77,77,0.25)',   text: 'var(--red)' },
  'Inspection Scheduled':  { bg: 'rgba(74,158,255,0.1)',  border: 'rgba(74,158,255,0.25)',  text: 'var(--blue)' },
  'Closed':                { bg: 'rgba(100,100,120,0.1)', border: 'rgba(100,100,120,0.2)',  text: 'var(--text3)' },
};

function getTimeline(permit) {
  const steps = [
    { label: 'Job pulled from ServiceTitan', time: permit.submitted + ' · 8:47am', done: true },
    { label: 'Jurisdiction detected — ' + permit.jurisdiction, time: permit.submitted + ' · 8:47am', done: true },
    { label: 'Permit submitted', time: permit.submitted + ' · 8:49am', done: true },
  ];
  if (['Approved','Inspection Scheduled','Closed'].includes(permit.status)) {
    steps.push({ label: 'Permit approved by ' + permit.jurisdiction, time: 'Approx 2 business days after submission', done: true });
  }
  if (permit.inspectionDate) {
    steps.push({ label: 'Inspection scheduled — ' + permit.inspectionDate, time: 'Tech notified via SMS', done: permit.status === 'Closed' });
  }
  if (permit.status === 'Closed') {
    steps.push({ label: 'Inspection passed — job closed', time: permit.inspectionDate, done: true });
  }
  if (permit.status === 'Action Needed') {
    steps.push({ label: 'Action needed — county response required', time: 'See notes below', done: false, alert: true });
  }
  if (!['Approved','Inspection Scheduled','Closed','Action Needed'].includes(permit.status)) {
    steps.push({ label: 'Awaiting jurisdiction review', time: 'Est. 2–4 business days', done: false, pending: true });
  }
  return steps;
}

const s = {
  backBtn: {
    display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px',
    background: 'transparent', border: '1px solid var(--border)', borderRadius: '7px',
    padding: '6px 12px', color: 'var(--text2)', fontSize: '12px', cursor: 'pointer',
    transition: 'all 0.15s',
  },
  grid: { display: 'grid', gridTemplateColumns: '1fr 340px', gap: '16px' },
  card: { background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '20px 24px', marginBottom: '16px' },
  cardTitle: { fontSize: '12px', fontWeight: '500', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '8px 0', borderBottom: '1px solid var(--border)' },
  rowLast: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '8px 0' },
  rowLabel: { fontSize: '12px', color: 'var(--text2)' },
  rowVal: { fontSize: '13px', color: 'var(--text)', fontWeight: '500', textAlign: 'right', maxWidth: '220px' },
  mono: { fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text2)' },
  badge: (status) => ({
    display: 'inline-block', fontSize: '11px', fontWeight: '500', padding: '4px 10px',
    borderRadius: '20px', border: `1px solid ${STATUS_COLORS[status]?.border || 'var(--border)'}`,
    background: STATUS_COLORS[status]?.bg || 'transparent',
    color: STATUS_COLORS[status]?.text || 'var(--text2)',
  }),
  notes: { fontSize: '13px', color: 'var(--text2)', lineHeight: 1.6, padding: '10px 0' },
  tlItem: { display: 'flex', gap: '12px', paddingBottom: '16px', position: 'relative' },
  tlLine: { position: 'absolute', left: '7px', top: '16px', bottom: 0, width: '1px', background: 'var(--border)' },
  tlDot: (done, alert, pending) => ({
    width: '15px', height: '15px', borderRadius: '50%', flexShrink: 0, marginTop: '2px',
    background: alert ? 'var(--red)' : done ? 'var(--accent)' : pending ? 'var(--bg3)' : 'var(--blue)',
    border: pending ? '1px solid var(--border2)' : 'none',
    zIndex: 1,
  }),
  tlLabel: { fontSize: '13px', color: 'var(--text)', fontWeight: '500', lineHeight: 1.4 },
  tlTime: { fontSize: '11px', color: 'var(--text3)', marginTop: '2px' },
  alertBox: {
    background: 'rgba(255,77,77,0.06)', border: '1px solid rgba(255,77,77,0.2)',
    borderRadius: '8px', padding: '12px 14px', marginTop: '8px',
    fontSize: '12px', color: '#ff7070', lineHeight: 1.5,
  },
};

export default function PermitDetail({ permit, onBack }) {
  const timeline = getTimeline(permit);

  return (
    <div>
      <button style={s.backBtn} onClick={onBack}>← Back to permits</button>

      <div style={s.grid}>
        <div>
          <div style={s.card}>
            <div style={s.cardTitle}>Permit details</div>
            {[
              ['Permit ID', <span style={s.mono}>{permit.id}</span>],
              ['Address', permit.address],
              ['Jurisdiction', permit.jurisdiction],
              ['Permit type', permit.type],
              ['Status', <span style={s.badge(permit.status)}>{permit.status}</span>],
              ['Submitted', permit.submitted],
              ['Tech assigned', permit.tech],
              ['Fee', permit.fee],
            ].map(([label, val], i, arr) => (
              <div key={label} style={i === arr.length - 1 ? s.rowLast : s.row}>
                <div style={s.rowLabel}>{label}</div>
                <div style={s.rowVal}>{val}</div>
              </div>
            ))}
            {permit.accelaId && (
              <div style={{ ...s.row, borderBottom: 'none' }}>
                <div style={s.rowLabel}>Accela record ID</div>
                <div style={{ ...s.rowVal }}><span style={s.mono}>{permit.accelaId}</span></div>
              </div>
            )}
          </div>

          {permit.inspectionDate && (
            <div style={s.card}>
              <div style={s.cardTitle}>Inspection</div>
              <div style={s.row}>
                <div style={s.rowLabel}>Scheduled date</div>
                <div style={{ ...s.rowVal, color: 'var(--blue)' }}>{permit.inspectionDate}</div>
              </div>
              <div style={s.rowLast}>
                <div style={s.rowLabel}>Tech notified</div>
                <div style={{ ...s.rowVal, color: 'var(--accent)' }}>SMS sent ✓</div>
              </div>
            </div>
          )}

          <div style={s.card}>
            <div style={s.cardTitle}>Notes</div>
            <div style={s.notes}>{permit.notes}</div>
          </div>

          {permit.status === 'Action Needed' && (
            <div style={s.alertBox}>
              Action required: {permit.notes}
            </div>
          )}
        </div>

        <div>
          <div style={s.card}>
            <div style={s.cardTitle}>Status timeline</div>
            {timeline.map((step, i) => (
              <div key={i} style={s.tlItem}>
                {i < timeline.length - 1 && <div style={s.tlLine} />}
                <div style={s.tlDot(step.done, step.alert, step.pending)} />
                <div>
                  <div style={s.tlLabel}>{step.label}</div>
                  <div style={s.tlTime}>{step.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}