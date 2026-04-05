# MarkdownPath

เว็บไซต์เรียน Markdown สำหรับผู้เริ่มต้น — live editor, 10 บทเรียน, ควิซ, XP, และ streak tracker

100% frontend (HTML + CSS + JS), ไม่มี build step, ไม่มี backend

## วิธีรัน

**ต้องเสิร์ฟผ่าน HTTP server** (เพราะใช้ ES modules) — เปิดด้วย `file://` ไม่ได้

### Python
```bash
python -m http.server 8000
```
แล้วเปิด http://localhost:8000

### Node
```bash
npx serve .
```

### VS Code
ใช้ extension "Live Server" แล้วคลิกขวาที่ `index.html` → Open with Live Server

## โครงสร้างไฟล์
```
index.html           # Shell หลัก
css/styles.css       # Theme + responsive layout
js/
├── app.js           # Router + init
├── state.js         # localStorage, XP, streak
├── lessons.js       # ข้อมูลบทเรียนทั้ง 10 บท
├── editor.js        # CodeMirror 6 + marked preview
├── components/      # Header, Sidebar, Right panel
└── views/           # Home, Lesson, Cheatsheet
```

## Debug
เปิด DevTools แล้วใช้ `window.__mdpath.reset()` เพื่อล้าง progress
