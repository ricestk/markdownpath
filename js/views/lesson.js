import { getLesson, LESSONS } from '../lessons.js';
import { state, markChallengePassed } from '../state.js';
import { mountEditor, renderMd } from '../editor.js';
import { showToast } from '../app.js';

let currentEditor = null;
let currentTab = 'editor';

export async function renderLesson(id) {
  const lesson = getLesson(id);
  const main = document.getElementById('main-view');
  if (!lesson) {
    main.innerHTML = `<p>ไม่พบบทเรียน</p>`;
    return;
  }
  currentTab = 'editor';
  main.innerHTML = `
    <div class="page-header">
      <span class="tag">${lesson.tag}</span>
      <h1>${lesson.title}</h1>
      <p class="desc">${lesson.description}</p>
    </div>
    <div class="tabs">
      <button class="tab active" data-tab="editor">Live Editor</button>
      <button class="tab" data-tab="explain">คำอธิบาย</button>
      <button class="tab" data-tab="examples">ตัวอย่าง</button>
    </div>
    <div id="tab-content"></div>
    <div class="challenge" id="challenge"></div>
  `;

  main.querySelectorAll('.tab').forEach(t => {
    t.addEventListener('click', () => switchTab(t.dataset.tab, lesson));
  });

  await renderTab('editor', lesson);
  renderChallenge(lesson);
}

async function switchTab(tab, lesson) {
  currentTab = tab;
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  if (currentEditor) { currentEditor.destroy(); currentEditor = null; }
  await renderTab(tab, lesson);
}

async function renderTab(tab, lesson) {
  const host = document.getElementById('tab-content');
  if (tab === 'editor') {
    host.innerHTML = `
      <div class="split-editor">
        <div class="pane">
          <div class="pane-header">Markdown</div>
          <div class="editor-host" id="editor-host"></div>
        </div>
        <div class="pane">
          <div class="pane-header">Preview</div>
          <div class="preview" id="preview-host"></div>
        </div>
      </div>
    `;
    currentEditor = await mountEditor(
      document.getElementById('editor-host'),
      document.getElementById('preview-host'),
      lesson.starterMd
    );
  } else if (tab === 'explain') {
    host.innerHTML = `<div class="explanation">${lesson.explanation}</div>`;
  } else if (tab === 'examples') {
    host.innerHTML = `
      <div class="examples-list">
        ${lesson.examples.map((ex, i) => `
          <div class="example-item">
            <div class="example-label">${ex.label}</div>
            <div class="example-grid">
              <pre>${escapeHtml(ex.md)}</pre>
              <div class="rendered" id="ex-${i}"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    for (let i = 0; i < lesson.examples.length; i++) {
      await renderMd(lesson.examples[i].md, document.getElementById(`ex-${i}`));
    }
  }
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function renderChallenge(lesson) {
  const el = document.getElementById('challenge');
  const passed = state.challengesPassed.includes(lesson.id);
  el.innerHTML = `
    <h3 class="challenge-title">🎯 Challenge</h3>
    <p class="challenge-task">${lesson.challenge.task}</p>
    <textarea class="challenge-input" id="challenge-input" placeholder="พิมพ์คำตอบของคุณที่นี่...">${lesson.challenge.starter || ''}</textarea>
    <div class="challenge-actions">
      <button class="btn-primary" id="check-btn">ตรวจคำตอบ</button>
      <button class="btn-secondary" id="hint-btn">💡 ดูคำใบ้</button>
      <span class="feedback" id="feedback">${passed ? '<span class="ok">✓ ผ่านแล้ว +' + lesson.xp + ' XP</span>' : ''}</span>
    </div>
  `;
  document.getElementById('check-btn').addEventListener('click', () => {
    const val = document.getElementById('challenge-input').value;
    const fb = document.getElementById('feedback');
    if (lesson.challenge.validate.test(val)) {
      fb.innerHTML = `<span class="ok">✓ ถูกต้อง! +${lesson.xp} XP</span>`;
      if (markChallengePassed(lesson.id, lesson.xp)) {
        showToast(`✓ Challenge ผ่าน! +${lesson.xp} XP`);
        // If both quiz + challenge passed → lesson complete
        if (state.completed.includes(lesson.id)) {
          const next = lesson.id + 1;
          if (next <= LESSONS.length) {
            setTimeout(() => showToast(`🎉 ปลดล็อกบทที่ ${next} แล้ว!`), 1200);
          }
        }
      }
    } else {
      fb.innerHTML = `<span class="bad">✗ ยังไม่ถูก — ลองอีกครั้ง</span>`;
    }
  });
  document.getElementById('hint-btn').addEventListener('click', () => {
    document.getElementById('feedback').innerHTML = `<span style="color:var(--text-muted)">💡 ${lesson.challenge.hint}</span>`;
  });
}
