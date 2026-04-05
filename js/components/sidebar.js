import { LESSONS } from '../lessons.js';
import { state, isLocked } from '../state.js';

const GROUPS = [
  { key: 'beginner', label: 'Beginner · เริ่มต้น' },
  { key: 'intermediate', label: 'Intermediate · ระดับกลาง' },
  { key: 'advanced', label: 'Advanced · ขั้นสูง' },
];

function itemHTML(lesson, activeId) {
  const locked = isLocked(lesson.id);
  const completed = state.completed.includes(lesson.id);
  const active = activeId === lesson.id;
  const cls = [
    'lesson-item',
    locked ? 'locked' : '',
    completed ? 'completed' : '',
    active ? 'active' : '',
  ].filter(Boolean).join(' ');
  const statusIcon = completed ? '✓' : locked ? '🔒' : lesson.id;
  return `
    <div class="${cls}" data-id="${lesson.id}">
      <span class="lesson-status">${statusIcon}</span>
      <div class="lesson-info">
        <div class="lesson-title">${lesson.title}</div>
        <div class="lesson-meta">${lesson.xp} XP · ${lesson.minutes} นาที</div>
      </div>
    </div>
  `;
}

export function renderSidebar(activeLessonId) {
  const el = document.getElementById('left-sidebar');
  let html = '';
  for (const g of GROUPS) {
    const items = LESSONS.filter(l => l.level === g.key);
    html += `<div class="sidebar-title">${g.label}</div>`;
    html += items.map(l => itemHTML(l, activeLessonId)).join('');
  }
  el.innerHTML = html;
  el.querySelectorAll('.lesson-item').forEach(node => {
    node.addEventListener('click', () => {
      if (node.classList.contains('locked')) return;
      const id = node.dataset.id;
      location.hash = `#/lesson/${id}`;
    });
  });
}
