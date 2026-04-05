import { LESSONS } from '../lessons.js';
import { state, isLocked } from '../state.js';

export function renderHome() {
  const main = document.getElementById('main-view');
  main.innerHTML = `
    <section class="hero">
      <span class="badge">สำหรับผู้เริ่มต้น · ฟรีทุกบทเรียน</span>
      <h1>เขียน Markdown ได้ใน 30 นาที</h1>
      <p class="sub">เรียนรู้ Markdown ผ่าน live editor แบบโต้ตอบ พร้อมแบบฝึกหัด ควิซ และระบบ XP ติดตามความก้าวหน้า — ทุกบทเรียนฟรี ไม่ต้องสมัครสมาชิก</p>
      <div class="hero-actions">
        <button class="btn-primary" id="hero-start">เริ่มบทเรียนแรก →</button>
        <button class="btn-secondary" id="hero-demo">ดูตัวอย่าง</button>
      </div>
    </section>

    <div class="lesson-grid">
      ${LESSONS.map(cardHTML).join('')}
    </div>
  `;

  document.getElementById('hero-start').addEventListener('click', () => {
    location.hash = '#/lesson/1';
  });
  document.getElementById('hero-demo').addEventListener('click', () => {
    location.hash = '#/lesson/1';
  });
  main.querySelectorAll('.lesson-card').forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('locked')) return;
      location.hash = `#/lesson/${card.dataset.id}`;
    });
  });
}

function cardHTML(l) {
  const locked = isLocked(l.id);
  const done = state.completed.includes(l.id);
  return `
    <div class="lesson-card ${locked ? 'locked' : ''}" data-id="${l.id}">
      <div class="lesson-card-level">${l.levelLabel} · บทที่ ${l.id}</div>
      <h4>${l.title} ${done ? '✓' : ''}</h4>
      <p>${l.description}</p>
      <div class="lesson-card-foot">
        <span>${l.minutes} นาที</span>
        <span>⭐ ${l.xp} XP</span>
      </div>
    </div>
  `;
}
