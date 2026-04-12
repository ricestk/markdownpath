import { state, progressPct as computePct, isSignedUp, getUser, isGuest, getVisitCount } from '../state.js';
import { TOTAL_LESSONS } from '../lessons.js';

const NAV = [
  { href: '#/', label: 'บทเรียน', match: (h) => h === '' || h === '/' || h.startsWith('/lesson') },
  { href: '#/exercises', label: 'แบบฝึกหัด', match: (h) => h.startsWith('/exercises') },
  { href: '#/cheatsheet', label: 'Cheat Sheet', match: (h) => h.startsWith('/cheatsheet') },
  { href: '#/community', label: 'Community', match: (h) => h.startsWith('/community') },
];

export function renderHeader(route) {
  const el = document.getElementById('site-header');
  const hash = route || '/';
  el.innerHTML = `
    <div class="header-inner">
      <a href="#/" class="logo">
        <span class="logo-mark">Md</span>
        <span class="logo-text">MarkdownPath</span>
      </a>
      <nav class="nav">
        ${NAV.map(n => `<a href="${n.href}" class="${n.match(hash) ? 'active' : ''}">${n.label}</a>`).join('')}
      </nav>
      <div class="header-right">
        <span class="stat-pill" title="เข้าใช้งานแล้ว ${getVisitCount()} ครั้ง">👁 ${getVisitCount()}</span>
        <span class="stat-pill">🔥 ${state.streak}-day streak</span>
        <span class="stat-pill">⭐ ${state.xp} XP</span>
        ${isSignedUp()
          ? `<a href="#/profile" class="profile-avatar">${(getUser().displayName || getUser().email)[0].toUpperCase()}</a>`
          : isGuest()
            ? `<a href="#/login" class="profile-avatar guest-avatar" title="ผู้เยี่ยมชม">G</a>`
            : `<button class="cta-btn" id="cta-start">เข้าสู่ระบบ</button>`
        }
      </div>
    </div>
  `;
  const ctaBtn = document.getElementById('cta-start');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      location.hash = '#/login';
    });
  }

  // progress strip
  const pct = computePct(TOTAL_LESSONS);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-label').textContent = `${state.completed.length}/${TOTAL_LESSONS} บท · ${pct}%`;
}
