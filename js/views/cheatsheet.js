import { CHEAT_SHEET } from '../lessons.js';
import { renderMd } from '../editor.js';

export async function renderCheatsheet() {
  const main = document.getElementById('main-view');
  main.innerHTML = `
    <div class="page-header">
      <span class="tag">อ้างอิงฉบับย่อ</span>
      <h1>Markdown Cheat Sheet</h1>
      <p class="desc">ไวยากรณ์ Markdown ทั้งหมดที่คุณต้องรู้ รวบรวมในหน้าเดียว</p>
    </div>
    <div class="examples-list">
      ${CHEAT_SHEET.map((r, i) => `
        <div class="example-item">
          <div class="example-label">${escapeHtml(r.out)}</div>
          <div class="example-grid">
            <pre>${escapeHtml(r.syntax)}</pre>
            <div class="rendered" id="cs-${i}"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  for (let i = 0; i < CHEAT_SHEET.length; i++) {
    const target = document.getElementById(`cs-${i}`);
    const sample = buildSample(CHEAT_SHEET[i].syntax);
    await renderMd(sample, target);
  }
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// Turn the terse cheat syntax into a renderable sample
function buildSample(syntax) {
  const map = {
    '# H1': '# หัวข้อใหญ่',
    '## H2': '## หัวข้อรอง',
    '**bold**': '**ตัวหนา**',
    '*italic*': '*ตัวเอียง*',
    '~~strike~~': '~~ขีดฆ่า~~',
    '[text](url)': '[Google](https://google.com)',
    '![alt](url)': '![dot](https://placehold.co/40x40/2D6BE4/fff?text=+)',
    '`code`': 'ใช้ `map()`',
    '```lang': '```js\nconst x = 1;\n```',
    '- item': '- หนึ่ง\n- สอง',
    '1. item': '1. แรก\n2. สอง',
    '> quote': '> คำคม',
    '---': 'บน\n\n---\n\nล่าง',
    '| a | b |': '| A | B |\n|---|---|\n| 1 | 2 |',
    '- [x]': '- [x] done\n- [ ] todo',
  };
  return map[syntax] || syntax;
}
