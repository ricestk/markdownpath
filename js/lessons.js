// All 10 lessons for MarkdownPath. Thai UI strings + English MD samples.

export const LESSONS = [
  // ========= BEGINNER =========
  {
    id: 1, level: 'beginner', levelLabel: 'เริ่มต้น',
    title: 'Markdown คืออะไร?',
    tag: 'บทที่ 1 · 3 นาที',
    minutes: 3, xp: 20,
    description: 'รู้จัก Markdown ภาษาเขียนเอกสารสุดเบาที่แปลงเป็นหน้าเว็บสวย ๆ ได้ทันที',
    starterMd: `# สวัสดี Markdown!

นี่คือ**ย่อหน้า**แรกของคุณ

- ง่ายต่อการอ่าน
- ง่ายต่อการเขียน
- ใช้ได้ทุกที่`,
    explanation: `
<h3>Markdown คืออะไร?</h3>
<p>Markdown เป็นภาษา Markup แบบเบา (lightweight markup language) ที่ถูกสร้างขึ้นในปี 2004 โดย John Gruber เพื่อให้เขียนเอกสารได้อ่านง่ายแม้เป็น plain text และยังแปลงเป็น HTML ได้ทันที</p>
<h3>ทำไมต้องเรียน Markdown?</h3>
<ul>
  <li>ใช้บน GitHub, Reddit, Discord, Notion และ Stack Overflow</li>
  <li>เขียน README, เอกสารโปรเจ็กต์ และ blog ได้เร็ว</li>
  <li>ไวยากรณ์เรียบง่าย เรียนครบใน 30 นาที</li>
</ul>
<h3>หลักการพื้นฐาน</h3>
<p>ใช้สัญลักษณ์ง่าย ๆ อย่าง <code>#</code>, <code>*</code>, <code>-</code> มาแทน HTML tag เช่น &lt;h1&gt;, &lt;strong&gt;, &lt;li&gt;</p>`,
    examples: [
      { label: 'ข้อความธรรมดา', md: 'นี่คือย่อหน้าแรก\n\nนี่คือย่อหน้าที่สอง' },
      { label: 'เน้นคำ', md: 'Markdown **ง่าย** และ *เร็ว*' },
    ],
    challenge: {
      task: 'เขียนหัวข้อ H1 คำว่า "Hello Markdown" (ใช้เครื่องหมาย # หนึ่งตัว)',
      starter: '',
      validate: /^\s*#\s+Hello\s+Markdown\s*$/im,
      hint: 'ขึ้นต้นบรรทัดด้วย # เว้นวรรค แล้วตามด้วยข้อความ',
    },
    quiz: {
      q: 'Markdown ถูกสร้างขึ้นเพื่อจุดประสงค์หลักอะไร?',
      options: [
        'แทนที่ HTML ทั้งหมด',
        'ให้เขียน plain text ที่อ่านง่ายและแปลงเป็น HTML ได้',
        'สร้างฐานข้อมูล',
        'ออกแบบกราฟิก',
      ],
      answer: 1,
    },
  },

  {
    id: 2, level: 'beginner', levelLabel: 'เริ่มต้น',
    title: 'หัวข้อและย่อหน้า',
    tag: 'บทที่ 2 · 4 นาที',
    minutes: 4, xp: 25,
    description: 'ใช้ # สร้างหัวข้อ 6 ระดับ และเว้นบรรทัดว่างเพื่อขึ้นย่อหน้าใหม่',
    starterMd: `# หัวข้อระดับ 1
## หัวข้อระดับ 2
### หัวข้อระดับ 3
#### หัวข้อระดับ 4

นี่คือย่อหน้าแรก ซึ่งมีหลายประโยค
ประโยคนี้ยังอยู่ย่อหน้าเดียวกัน

นี่คือย่อหน้าที่สอง`,
    explanation: `
<h3>หัวข้อ (Headings)</h3>
<p>Markdown มีหัวข้อ 6 ระดับ ใช้ <code>#</code> นำหน้า จำนวน # เท่ากับระดับของหัวข้อ</p>
<ul>
  <li><code># หัวข้อ</code> → H1 (ใหญ่สุด)</li>
  <li><code>## หัวข้อ</code> → H2</li>
  <li><code>### หัวข้อ</code> → H3</li>
  <li>... ไปจนถึง <code>######</code> → H6</li>
</ul>
<h3>ย่อหน้า (Paragraphs)</h3>
<p>เว้นบรรทัดว่าง 1 บรรทัดเพื่อขึ้นย่อหน้าใหม่ การกด Enter ธรรมดาจะไม่ขึ้นย่อหน้า</p>
<h3>ขึ้นบรรทัดใหม่ (Line Break)</h3>
<p>เคาะ space 2 ครั้งท้ายบรรทัดแล้ว Enter เพื่อขึ้นบรรทัดใหม่โดยไม่ขึ้นย่อหน้า</p>`,
    examples: [
      { label: 'หัวข้อหลายระดับ', md: '# H1\n## H2\n### H3' },
      { label: 'ย่อหน้า', md: 'ย่อหน้าแรก\n\nย่อหน้าที่สอง' },
    ],
    challenge: {
      task: 'สร้างหัวข้อระดับ 2 (H2) ด้วยข้อความ "About Me"',
      starter: '',
      validate: /^\s*##\s+About\s+Me\s*$/im,
      hint: 'ใช้ ## สองตัว เว้นวรรค แล้วตามด้วย "About Me"',
    },
    quiz: {
      q: 'ต้องใช้ # กี่ตัวเพื่อสร้างหัวข้อระดับ 4?',
      options: ['1 ตัว', '3 ตัว', '4 ตัว', '6 ตัว'],
      answer: 2,
    },
  },

  {
    id: 3, level: 'beginner', levelLabel: 'เริ่มต้น',
    title: 'ตัวหนาและตัวเอียง',
    tag: 'บทที่ 3 · 5 นาที',
    minutes: 5, xp: 25,
    description: 'เน้นข้อความสำคัญด้วยตัวหนา (**bold**) และเอียง (*italic*)',
    starterMd: `ข้อความ**ตัวหนา** ใช้ ** คู่
ข้อความ*ตัวเอียง* ใช้ * เดี่ยว
ข้อความ***ทั้งหนาและเอียง*** ใช้ *** สามตัว
ข้อความ~~ขีดฆ่า~~ ใช้ ~~ คู่`,
    explanation: `
<h3>ตัวหนา (Bold)</h3>
<p>ครอบข้อความด้วย <code>**</code> สองตัวทั้งสองฝั่ง หรือใช้ <code>__</code> ก็ได้</p>
<p>ตัวอย่าง: <code>**สำคัญ**</code> → <strong>สำคัญ</strong></p>
<h3>ตัวเอียง (Italic)</h3>
<p>ครอบข้อความด้วย <code>*</code> หนึ่งตัว หรือ <code>_</code></p>
<p>ตัวอย่าง: <code>*เอียง*</code> → <em>เอียง</em></p>
<h3>หนาและเอียงพร้อมกัน</h3>
<p>ใช้ <code>***</code> สามตัว</p>
<h3>ขีดฆ่า (Strikethrough)</h3>
<p>ใช้ <code>~~ข้อความ~~</code> ใน GitHub Flavored Markdown</p>`,
    examples: [
      { label: 'ตัวหนา', md: 'นี่คือ **ข้อความตัวหนา**' },
      { label: 'ตัวเอียง', md: 'นี่คือ *ข้อความเอียง*' },
      { label: 'รวมกัน', md: '***หนาและเอียง***' },
    ],
    challenge: {
      task: 'ทำให้คำว่า "important" เป็นตัวหนา',
      starter: 'This is very important to remember',
      validate: /\*\*important\*\*|__important__/,
      hint: 'ครอบคำว่า important ด้วย ** สองตัวทั้งสองฝั่ง',
    },
    quiz: {
      q: 'สัญลักษณ์ใดสร้างตัวหนาใน Markdown?',
      options: ['*text*', '**text**', '_text_', '`text`'],
      answer: 1,
    },
  },

  {
    id: 4, level: 'beginner', levelLabel: 'เริ่มต้น',
    title: 'รายการ (Lists)',
    tag: 'บทที่ 4 · 5 นาที',
    minutes: 5, xp: 30,
    description: 'สร้างรายการแบบมีลำดับ (1. 2. 3.) และไม่มีลำดับ (- * +)',
    starterMd: `## รายการแบบไม่มีลำดับ
- แอปเปิล
- กล้วย
- ส้ม
  - ส้มเขียวหวาน
  - ส้มสายน้ำผึ้ง

## รายการแบบมีลำดับ
1. ตื่นนอน
2. แปรงฟัน
3. กินข้าว
4. ออกไปทำงาน`,
    explanation: `
<h3>รายการไม่มีลำดับ (Unordered)</h3>
<p>ใช้ <code>-</code>, <code>*</code>, หรือ <code>+</code> นำหน้าแต่ละข้อ ตามด้วยเว้นวรรค</p>
<h3>รายการมีลำดับ (Ordered)</h3>
<p>ใช้ตัวเลขตามด้วย <code>.</code> เช่น <code>1.</code> Markdown จะจัดหมายเลขให้อัตโนมัติ แม้คุณเขียน 1, 1, 1 ก็ได้</p>
<h3>รายการซ้อน (Nested)</h3>
<p>เยื้อง (indent) 2 หรือ 4 ช่องว่างเพื่อสร้างรายการย่อย</p>
<h3>เคล็ดลับ</h3>
<ul>
  <li>เลือกใช้สัญลักษณ์ให้สม่ำเสมอ</li>
  <li>เว้นบรรทัดก่อน/หลัง list เพื่อให้ render ถูก</li>
</ul>`,
    examples: [
      { label: 'ไม่มีลำดับ', md: '- Item 1\n- Item 2\n- Item 3' },
      { label: 'มีลำดับ', md: '1. First\n2. Second\n3. Third' },
      { label: 'ซ้อน', md: '- Parent\n  - Child\n  - Child' },
    ],
    challenge: {
      task: 'สร้างรายการไม่มีลำดับที่มี 3 ข้อ: Red, Green, Blue (ใช้เครื่องหมาย -)',
      starter: '',
      validate: /^\s*-\s+Red\s*$\n^\s*-\s+Green\s*$\n^\s*-\s+Blue\s*$/im,
      hint: 'ขึ้นบรรทัดละ "- ชื่อสี" สามบรรทัด',
    },
    quiz: {
      q: 'ข้อใดสร้างรายการแบบมีลำดับไม่ถูกต้อง?',
      options: ['1. Apple', '2) Apple', '- Apple', 'ทุกข้อถูก'],
      answer: 2,
    },
  },

  {
    id: 5, level: 'beginner', levelLabel: 'เริ่มต้น',
    title: 'ลิงก์และรูปภาพ',
    tag: 'บทที่ 5 · 6 นาที',
    minutes: 6, xp: 30,
    description: 'ใส่ลิงก์ [text](url) และรูป ![alt](url) ในเอกสาร',
    starterMd: `## ลิงก์
ไปที่ [Google](https://google.com) หรือ [GitHub](https://github.com)

## รูปภาพ
![โลโก้](https://placehold.co/200x100/2D6BE4/fff?text=Markdown)

## ลิงก์พร้อม title
[Hover me](https://example.com "คำอธิบายเพิ่มเติม")`,
    explanation: `
<h3>ลิงก์ (Link)</h3>
<p>รูปแบบ: <code>[ข้อความ](URL)</code></p>
<p>ตัวอย่าง: <code>[Google](https://google.com)</code></p>
<h3>รูปภาพ (Image)</h3>
<p>คล้ายลิงก์แต่ใส่ <code>!</code> นำหน้า</p>
<p>รูปแบบ: <code>![alt text](URL)</code></p>
<h3>ลิงก์พร้อม Title</h3>
<p>ใส่ข้อความใน "..." หลัง URL: <code>[text](url "title")</code></p>
<h3>ลิงก์อัตโนมัติ</h3>
<p>ครอบ URL ด้วย <code>&lt;...&gt;</code> เช่น <code>&lt;https://example.com&gt;</code></p>`,
    examples: [
      { label: 'ลิงก์พื้นฐาน', md: '[คลิกที่นี่](https://example.com)' },
      { label: 'รูปภาพ', md: '![แมว](https://placekitten.com/200/150)' },
    ],
    challenge: {
      task: 'สร้างลิงก์ที่มีข้อความ "Click here" ชี้ไปที่ https://example.com',
      starter: '',
      validate: /\[Click\s+here\]\(https:\/\/example\.com\/?\)/i,
      hint: 'รูปแบบคือ [Click here](https://example.com)',
    },
    quiz: {
      q: 'รูปแบบใดสร้างรูปภาพใน Markdown?',
      options: [
        '[alt](url)',
        '!(alt)[url]',
        '![alt](url)',
        '<img src="url">',
      ],
      answer: 2,
    },
  },

  // ========= INTERMEDIATE =========
  {
    id: 6, level: 'intermediate', levelLabel: 'ระดับกลาง',
    title: 'ตารางและบล็อกโค้ด',
    tag: 'บทที่ 6 · 7 นาที',
    minutes: 7, xp: 40,
    description: 'สร้างตาราง (table) และแสดงโค้ดด้วย ``` fenced code block',
    starterMd: `## ตาราง
| ชื่อ | อายุ | เมือง |
|------|-----|-------|
| Alice | 28 | Bangkok |
| Bob   | 35 | Chiang Mai |
| Carol | 22 | Phuket |

## บล็อกโค้ด
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet('World'));
\`\`\`

## โค้ดในบรรทัด
ใช้ฟังก์ชัน \`map()\` เพื่อแปลง array`,
    explanation: `
<h3>ตาราง (Table)</h3>
<p>ใช้ <code>|</code> แบ่งคอลัมน์ และบรรทัดที่สองใช้ <code>---</code> กำหนดการจัดชิด</p>
<ul>
  <li><code>:---</code> ชิดซ้าย</li>
  <li><code>:---:</code> กลาง</li>
  <li><code>---:</code> ชิดขวา</li>
</ul>
<h3>Fenced Code Block</h3>
<p>ครอบโค้ดด้วย <code>\`\`\`</code> สามตัว (backtick) ทั้งบนและล่าง ใส่ชื่อภาษาหลัง \`\`\` เพื่อให้ syntax highlight</p>
<h3>Inline Code</h3>
<p>ครอบด้วย <code>\`</code> ตัวเดียว: <code>\`code\`</code> → <code>code</code></p>
<h3>เคล็ดลับ</h3>
<p>ภาษายอดนิยม: javascript, python, html, css, bash, json, sql</p>`,
    examples: [
      { label: 'ตารางเรียบง่าย', md: '| A | B |\n|---|---|\n| 1 | 2 |' },
      { label: 'โค้ด Python', md: '```python\ndef hello():\n    print("Hi")\n```' },
    ],
    challenge: {
      task: 'สร้าง fenced code block ภาษา python ที่มีคำสั่ง print("Hello")',
      starter: '',
      validate: /```python\s*\n\s*print\(["']Hello["']\)\s*\n\s*```/i,
      hint: 'ขึ้นบรรทัดด้วย ```python แล้วใส่โค้ด แล้วปิดด้วย ```',
    },
    quiz: {
      q: 'สัญลักษณ์ใดใช้ปิดและเปิด fenced code block?',
      options: ['~~~ (tilde 3 ตัว)', '``` (backtick 3 ตัว)', "''' (quote 3 ตัว)", '--- (dash 3 ตัว)'],
      answer: 1,
    },
  },

  {
    id: 7, level: 'intermediate', levelLabel: 'ระดับกลาง',
    title: 'Blockquote',
    tag: 'บทที่ 7 · 4 นาที',
    minutes: 4, xp: 25,
    description: 'อ้างคำพูดหรือเน้นข้อความด้วย > นำหน้า',
    starterMd: `> "The only way to learn a new programming language
> is by writing programs in it."
>
> — Dennis Ritchie

> ข้อความนี้เป็น blockquote
>
> > นี่คือ blockquote ซ้อน
>
> กลับมาระดับเดิม`,
    explanation: `
<h3>Blockquote</h3>
<p>ใช้ <code>&gt;</code> นำหน้าบรรทัดเพื่อสร้างบล็อกคำพูด เหมาะสำหรับอ้างอิงคำกล่าวหรือเน้นเนื้อหา</p>
<h3>Blockquote หลายย่อหน้า</h3>
<p>ใส่ <code>&gt;</code> บนบรรทัดว่างระหว่างย่อหน้า</p>
<h3>Blockquote ซ้อน (Nested)</h3>
<p>ใช้ <code>&gt;&gt;</code> สองตัวสำหรับระดับซ้อน</p>
<h3>ใส่ Markdown อื่นข้างใน</h3>
<p>คุณใส่ <strong>ตัวหนา</strong> list หรือ code ได้ภายใน blockquote</p>`,
    examples: [
      { label: 'คำพูดสั้น', md: '> ความฝันเริ่มต้นที่นี่' },
      { label: 'หลายบรรทัด', md: '> บรรทัดหนึ่ง\n> บรรทัดสอง' },
    ],
    challenge: {
      task: 'สร้าง blockquote ที่มีข้อความ "Stay hungry, stay foolish"',
      starter: '',
      validate: /^\s*>\s*Stay\s+hungry,?\s+stay\s+foolish\s*$/im,
      hint: 'ขึ้นบรรทัดด้วย > แล้วเว้นวรรค ตามด้วย "Stay hungry, stay foolish"',
    },
    quiz: {
      q: 'สัญลักษณ์ใดสร้าง blockquote?',
      options: ['#', '>', '*', '|'],
      answer: 1,
    },
  },

  {
    id: 8, level: 'intermediate', levelLabel: 'ระดับกลาง',
    title: 'Horizontal Rule',
    tag: 'บทที่ 8 · 3 นาที',
    minutes: 3, xp: 20,
    description: 'ขีดเส้นแนวนอนแบ่งส่วนเนื้อหาด้วย --- หรือ *** หรือ ___',
    starterMd: `ส่วนที่ 1

---

ส่วนที่ 2

***

ส่วนที่ 3

___

จบ`,
    explanation: `
<h3>Horizontal Rule คืออะไร?</h3>
<p>เส้นแนวนอน (thematic break) ใช้แบ่งส่วนเนื้อหาให้เห็นชัดเจน</p>
<h3>วิธีเขียน</h3>
<p>ใช้สัญลักษณ์ 3 ตัวขึ้นไปบนบรรทัดเดียว ได้แก่:</p>
<ul>
  <li><code>---</code> (dash)</li>
  <li><code>***</code> (asterisk)</li>
  <li><code>___</code> (underscore)</li>
</ul>
<h3>ข้อควรระวัง</h3>
<p>ต้องเว้นบรรทัดว่างก่อนและหลัง ไม่งั้นอาจตีความเป็นอย่างอื่น เช่น <code>---</code> หลังหัวข้ออาจกลายเป็น setext heading</p>`,
    examples: [
      { label: 'Dash', md: 'Above\n\n---\n\nBelow' },
      { label: 'Asterisk', md: 'Above\n\n***\n\nBelow' },
    ],
    challenge: {
      task: 'ใส่ horizontal rule แบบ dash (---) ระหว่างสองย่อหน้า',
      starter: 'First paragraph\n\n\n\nSecond paragraph',
      validate: /^\s*-{3,}\s*$/m,
      hint: 'ใส่บรรทัดที่มี --- (สามขีดขึ้นไป) โดยมีบรรทัดว่างคั่น',
    },
    quiz: {
      q: 'ข้อใดไม่สามารถสร้าง horizontal rule ได้?',
      options: ['---', '***', '___', '==='],
      answer: 3,
    },
  },

  // ========= ADVANCED =========
  {
    id: 9, level: 'advanced', levelLabel: 'ขั้นสูง',
    title: 'Footnotes',
    tag: 'บทที่ 9 · 5 นาที',
    minutes: 5, xp: 35,
    description: 'ใส่เชิงอรรถ (footnote) เพื่ออ้างอิงเพิ่มเติมโดยไม่รบกวนเนื้อหา',
    starterMd: `Markdown ถูกสร้างในปี 2004[^1] โดย John Gruber

นักพัฒนาหลายคนชอบใช้[^fav] เพราะเรียบง่าย

[^1]: ปีที่เปิดตัวสเปกแรก
[^fav]: จากผลสำรวจของ Stack Overflow ปี 2023`,
    explanation: `
<h3>Footnotes คืออะไร?</h3>
<p>เชิงอรรถใช้สำหรับใส่หมายเหตุหรือการอ้างอิงเพิ่มเติมที่ไม่อยากใส่ในเนื้อหาหลัก</p>
<h3>วิธีเขียน</h3>
<p>ใส่ <code>[^label]</code> ในเนื้อหา แล้วอธิบายในที่อื่น (มักอยู่ท้ายเอกสาร) ด้วย <code>[^label]: คำอธิบาย</code></p>
<h3>กฎการใช้งาน</h3>
<ul>
  <li>label สามารถเป็นตัวเลข ข้อความ หรือ slug</li>
  <li>footnote จะถูกย้ายไปท้ายเอกสารอัตโนมัติ</li>
  <li>คลิกเลขเชิงอรรถเพื่อกระโดดไปอ่าน และคลิก ↵ กลับ</li>
</ul>
<h3>หมายเหตุ</h3>
<p>Footnotes เป็น GitHub Flavored Markdown (GFM) extension ไม่ใช่ Markdown ต้นฉบับ</p>`,
    examples: [
      { label: 'Footnote พื้นฐาน', md: 'ข้อความ[^note]\n\n[^note]: คำอธิบาย' },
      { label: 'หลาย footnote', md: 'หนึ่ง[^1] สอง[^2]\n\n[^1]: หนึ่ง\n[^2]: สอง' },
    ],
    challenge: {
      task: 'เพิ่ม footnote label "ref" ในข้อความ และเขียน footnote definition ของ "ref" ด้วยคำอธิบายอะไรก็ได้',
      starter: 'See more[^ref]\n\n',
      validate: /\[\^ref\][\s\S]*\n\s*\[\^ref\]:\s*\S+/,
      hint: 'ใช้ [^ref] ในข้อความ แล้วเพิ่มบรรทัด [^ref]: คำอธิบายของคุณ',
    },
    quiz: {
      q: 'รูปแบบการประกาศ footnote definition คืออะไร?',
      options: [
        '[^label] คำอธิบาย',
        '[^label]: คำอธิบาย',
        '(^label): คำอธิบาย',
        '{label}: คำอธิบาย',
      ],
      answer: 1,
    },
  },

  {
    id: 10, level: 'advanced', levelLabel: 'ขั้นสูง',
    title: 'Task Lists & Checkboxes',
    tag: 'บทที่ 10 · 5 นาที',
    minutes: 5, xp: 40,
    description: 'สร้างรายการที่ติ๊กได้ [ ] และ [x] — เหมาะกับ todo list และ GitHub issue',
    starterMd: `## Todo วันนี้
- [x] ตื่นนอน
- [x] กินข้าวเช้า
- [ ] เรียน Markdown บทที่ 10
- [ ] ออกกำลังกาย
- [ ] อ่านหนังสือ

## GitHub issue checklist
- [x] ออกแบบ UI
- [x] เขียน component
- [ ] เขียน test
- [ ] deploy production`,
    explanation: `
<h3>Task Lists คืออะไร?</h3>
<p>รายการที่แต่ละข้อมีกล่องติ๊กได้ นิยมใช้ใน GitHub issues, Notion และ README ของโปรเจ็กต์</p>
<h3>วิธีเขียน</h3>
<ul>
  <li><code>- [ ] งาน</code> → กล่องว่าง (ยังไม่เสร็จ)</li>
  <li><code>- [x] งาน</code> → ติ๊กแล้ว (เสร็จแล้ว)</li>
</ul>
<h3>กฎ</h3>
<ul>
  <li>ต้องมีเว้นวรรคระหว่าง <code>[</code> กับ <code>]</code></li>
  <li>ใช้ x ตัวเล็กหรือใหญ่ก็ได้</li>
  <li>อยู่ใน GFM (GitHub Flavored Markdown)</li>
</ul>
<h3>ซ้อนรายการ</h3>
<p>เยื้องเพื่อสร้าง sub-task ได้ เหมือน list ทั่วไป</p>`,
    examples: [
      { label: 'Todo list', md: '- [ ] ยังไม่เสร็จ\n- [x] เสร็จแล้ว' },
      { label: 'Sub-tasks', md: '- [x] Parent\n  - [x] Child 1\n  - [ ] Child 2' },
    ],
    challenge: {
      task: 'สร้าง task list ที่มี 2 ข้อ: ข้อแรกติ๊กแล้ว "Learn syntax" และข้อสองยังไม่ติ๊ก "Build project"',
      starter: '',
      validate: /-\s*\[x\]\s*Learn\s+syntax[\s\S]*-\s*\[\s\]\s*Build\s+project/i,
      hint: 'ใช้ - [x] สำหรับข้อแรก และ - [ ] สำหรับข้อที่สอง (มีเว้นวรรคในวงเล็บ)',
    },
    quiz: {
      q: 'ข้อใดคือรูปแบบของ task ที่ยัง "ไม่ได้" ติ๊ก?',
      options: ['- [x] task', '- [X] task', '- [ ] task', '- () task'],
      answer: 2,
    },
  },
];

export function getLesson(id) {
  return LESSONS.find(l => l.id === Number(id));
}

export const TOTAL_LESSONS = LESSONS.length;

export const CHEAT_SHEET = [
  { syntax: '# H1', out: 'หัวข้อใหญ่' },
  { syntax: '## H2', out: 'หัวข้อรอง' },
  { syntax: '**bold**', out: 'ตัวหนา' },
  { syntax: '*italic*', out: 'ตัวเอียง' },
  { syntax: '~~strike~~', out: 'ขีดฆ่า' },
  { syntax: '[text](url)', out: 'ลิงก์' },
  { syntax: '![alt](url)', out: 'รูปภาพ' },
  { syntax: '`code`', out: 'inline code' },
  { syntax: '```lang', out: 'code block' },
  { syntax: '- item', out: 'bullet list' },
  { syntax: '1. item', out: 'numbered' },
  { syntax: '> quote', out: 'blockquote' },
  { syntax: '---', out: 'เส้นแบ่ง' },
  { syntax: '| a | b |', out: 'ตาราง' },
  { syntax: '- [x]', out: 'task list' },
];
