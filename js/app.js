// MarkdownPath — app entry, router, init
import { state, subscribe, updateStreak, isSignedUp, incrementVisitCount } from './state.js';
import { renderHeader } from './components/header.js';
import { renderSidebar } from './components/sidebar.js';
import { renderRightPanel } from './components/rightPanel.js';
import { renderHome } from './views/home.js';
import { renderLesson } from './views/lesson.js';
import { renderCheatsheet } from './views/cheatsheet.js';
import { renderSignup } from './views/signup.js';
import { renderLogin } from './views/login.js';
import { renderProfile } from './views/profile.js';
import { getLesson } from './lessons.js';

// ---- Toast helper ----
let toastTimer = null;
export function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
}

// ---- Router ----
function parseRoute() {
  const h = (location.hash || '#/').replace(/^#/, '');
  // '/' | '/lesson/3' | '/cheatsheet' | '/exercises' | '/community'
  return h || '/';
}

async function route() {
  const path = parseRoute();
  renderHeader(path);

  if (path === '/' || path === '') {
    renderSidebar(null);
    renderHome();
    renderRightPanel(null);
    return;
  }
  if (path.startsWith('/lesson/')) {
    const id = Number(path.split('/')[2]);
    const lesson = getLesson(id);
    renderSidebar(id);
    if (!lesson) {
      document.getElementById('main-view').innerHTML = '<p>ไม่พบบทเรียน</p>';
      renderRightPanel(null);
      return;
    }
    await renderLesson(id);
    renderRightPanel(lesson);
    return;
  }
  if (path.startsWith('/cheatsheet')) {
    renderSidebar(null);
    await renderCheatsheet();
    renderRightPanel(null);
    return;
  }
  if (path.startsWith('/exercises')) {
    renderSidebar(null);
    document.getElementById('main-view').innerHTML = `
      <div class="page-header">
        <span class="tag">เร็ว ๆ นี้</span>
        <h1>แบบฝึกหัด</h1>
        <p class="desc">ฝึกทำโจทย์ Markdown เพิ่มเติมเร็ว ๆ นี้ ตอนนี้คุณลองทำ challenge ในแต่ละบทเรียนได้เลย</p>
      </div>
      <div class="lesson-grid">
        ${[1,2,3,4,5,6,7,8,9,10].map(i => `
          <div class="lesson-card" onclick="location.hash='#/lesson/${i}'">
            <div class="lesson-card-level">Challenge · บทที่ ${i}</div>
            <h4>${getLesson(i).title}</h4>
            <p>${getLesson(i).challenge.task}</p>
          </div>
        `).join('')}
      </div>
    `;
    renderRightPanel(null);
    return;
  }
  if (path.startsWith('/login')) {
    renderSidebar(null);
    renderLogin();
    renderRightPanel(null);
    return;
  }
  if (path.startsWith('/signup')) {
    renderSidebar(null);
    renderSignup();
    renderRightPanel(null);
    return;
  }
  if (path.startsWith('/profile')) {
    renderSidebar(null);
    renderProfile();
    renderRightPanel(null);
    return;
  }
  if (path.startsWith('/community')) {
    renderSidebar(null);
    document.getElementById('main-view').innerHTML = `
      <div class="page-header">
        <span class="tag">Community</span>
        <h1>ชุมชน MarkdownPath</h1>
        <p class="desc">พบปะผู้เรียน Markdown คนอื่น ๆ — เร็ว ๆ นี้</p>
      </div>
    `;
    renderRightPanel(null);
    return;
  }

  // Fallback
  location.hash = '#/';
}

// Re-render header/sidebar/right when state changes
subscribe(() => {
  const path = parseRoute();
  renderHeader(path);
  if (path.startsWith('/lesson/')) {
    const id = Number(path.split('/')[2]);
    renderSidebar(id);
    // don't re-render right panel to preserve quiz UI after click
  } else {
    renderSidebar(null);
  }
});

window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', () => {
  incrementVisitCount();
  updateStreak();
  route();
});

// If DOMContentLoaded already fired
if (document.readyState !== 'loading') {
  incrementVisitCount();
  updateStreak();
  route();
}
