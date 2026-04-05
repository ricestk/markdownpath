import { CHEAT_SHEET } from '../lessons.js';
import { state, markQuizPassed, getWeekVisits } from '../state.js';
import { showToast } from '../app.js';

export function renderRightPanel(lesson) {
  const el = document.getElementById('right-sidebar');
  if (!el) return;
  el.innerHTML = `
    <div class="card">
      <h3>Cheat Sheet</h3>
      <table class="cheat-table">
        ${CHEAT_SHEET.map(r => `<tr><td>${escapeHtml(r.syntax)}</td><td>${r.out}</td></tr>`).join('')}
      </table>
    </div>
    ${lesson ? quizCard(lesson) : ''}
    ${lesson ? aiHelpCard(lesson) : ''}
    <div class="card">
      <h3>Streak Tracker</h3>
      <div class="streak-grid" id="streak-grid"></div>
      <p style="margin:10px 0 0;font-size:12px;color:var(--text-muted)">🔥 ${state.streak} วันติดกัน</p>
    </div>
  `;

  renderStreakGrid();
  if (lesson) wireQuiz(lesson);
  if (lesson) wireAiHelp(lesson);
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function quizCard(lesson) {
  const done = state.quizzesPassed.includes(lesson.id);
  return `
    <div class="card">
      <h3>Mini Quiz</h3>
      <p class="quiz-q">${lesson.quiz.q}</p>
      <div class="quiz-options" id="quiz-options">
        ${lesson.quiz.options.map((opt, i) =>
          `<button class="quiz-opt" data-i="${i}" ${done ? 'disabled' : ''}>${escapeHtml(opt)}</button>`
        ).join('')}
      </div>
      ${done ? '<p style="margin:10px 0 0;font-size:12px;color:var(--success)">✓ ตอบถูกแล้ว +10 XP</p>' : ''}
    </div>
  `;
}

function wireQuiz(lesson) {
  const container = document.getElementById('quiz-options');
  if (!container) return;
  container.querySelectorAll('.quiz-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.i);
      container.querySelectorAll('.quiz-opt').forEach(b => b.disabled = true);
      if (i === lesson.quiz.answer) {
        btn.classList.add('correct');
        if (markQuizPassed(lesson.id, 10)) {
          showToast('✓ ถูกต้อง! +10 XP');
        }
      } else {
        btn.classList.add('wrong');
        // reveal correct
        const correct = container.querySelector(`.quiz-opt[data-i="${lesson.quiz.answer}"]`);
        if (correct) correct.classList.add('correct');
      }
    });
  });
}

function aiHelpCard(lesson) {
  return `
    <div class="card">
      <h3>AI Help</h3>
      <button class="ai-btn" id="ai-help-btn">✨ ถาม AI เกี่ยวกับบทนี้</button>
    </div>
  `;
}

function wireAiHelp(lesson) {
  const btn = document.getElementById('ai-help-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const prompt = `อธิบายบทเรียน "${lesson.title}" ให้ผู้เริ่มต้น Markdown เข้าใจง่าย ๆ\n\nหัวข้อย่อย:\n${lesson.description}\n\nเนื้อหาตัวอย่าง:\n${lesson.starterMd}`;
    openAiModal(prompt);
  });
}

function openAiModal(prompt) {
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="modal-backdrop" id="modal-backdrop">
      <div class="modal" onclick="event.stopPropagation()">
        <h3>✨ AI Help</h3>
        <p style="color:var(--text-muted);font-size:13px;margin:0 0 10px">คัดลอก prompt นี้ไปถาม ChatGPT / Claude / Gemini ได้เลย</p>
        <textarea readonly id="ai-prompt-ta">${prompt}</textarea>
        <div class="modal-actions">
          <button class="btn-secondary" id="modal-close">ปิด</button>
          <button class="btn-primary" id="modal-copy">คัดลอก</button>
        </div>
      </div>
    </div>
  `;
  const close = () => { root.innerHTML = ''; };
  document.getElementById('modal-backdrop').addEventListener('click', close);
  document.getElementById('modal-close').addEventListener('click', close);
  document.getElementById('modal-copy').addEventListener('click', async () => {
    const ta = document.getElementById('ai-prompt-ta');
    try {
      await navigator.clipboard.writeText(ta.value);
      showToast('คัดลอกแล้ว ✓');
    } catch {
      ta.select(); document.execCommand('copy');
      showToast('คัดลอกแล้ว ✓');
    }
  });
}

function renderStreakGrid() {
  const grid = document.getElementById('streak-grid');
  if (!grid) return;
  const week = getWeekVisits();
  grid.innerHTML = week.map(d =>
    `<div class="streak-day ${d.done ? 'done' : ''} ${d.isToday ? 'today' : ''}">${d.label}</div>`
  ).join('');
}
