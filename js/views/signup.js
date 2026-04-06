// Signup view — 2-step registration form
import { saveUser, isSignedUp } from '../state.js';
import { eyeClosedSVG, initPasswordToggle } from './auth-helpers.js';

export function renderSignup() {
  if (isSignedUp()) { location.hash = '#/profile'; return; }

  const container = document.getElementById('main-view');
  let step = 1;
  const data = { email: '', password: '', gender: '', age: '' };

  function renderStep() {
    if (step === 1) renderStep1();
    else renderStep2();
  }

  function renderStep1() {
    container.innerHTML = `
      <div class="auth-container">
        <div class="auth-card">
          <div class="step-indicator">
            <span class="step-dot active"></span>
            <span class="step-dot"></span>
          </div>
          <h2>สมัครสมาชิก</h2>
          <p class="auth-desc">สร้างบัญชีเพื่อบันทึกความก้าวหน้าของคุณ</p>
          <div class="form-group">
            <label for="signup-email">อีเมล</label>
            <input type="email" id="signup-email" class="form-input" placeholder="you@example.com" value="${data.email}">
            <div class="form-error" id="email-error"></div>
          </div>
          <div class="form-group">
            <label for="signup-password">รหัสผ่าน</label>
            <div class="password-wrapper">
              <input type="password" id="signup-password" class="form-input" placeholder="อย่างน้อย 6 ตัวอักษร" value="${data.password}">
              <button type="button" class="password-toggle" id="toggle-password">${eyeClosedSVG}</button>
            </div>
            <div class="form-error" id="password-error"></div>
          </div>
          <div class="form-actions">
            <button class="btn btn-primary" id="btn-next">ถัดไป</button>
          </div>
          <div class="auth-switch">
            มีบัญชีแล้ว? <a href="#/login">เข้าสู่ระบบ</a>
          </div>
        </div>
      </div>
    `;

    initPasswordToggle('signup-password', 'toggle-password');

    document.getElementById('btn-next').addEventListener('click', () => {
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value;
      let valid = true;

      document.getElementById('email-error').textContent = '';
      document.getElementById('password-error').textContent = '';

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('email-error').textContent = 'กรุณากรอกอีเมลให้ถูกต้อง';
        valid = false;
      }
      if (password.length < 6) {
        document.getElementById('password-error').textContent = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
        valid = false;
      }
      if (!valid) return;

      data.email = email;
      data.password = password;
      step = 2;
      renderStep();
    });
  }

  function renderStep2() {
    container.innerHTML = `
      <div class="auth-container">
        <div class="auth-card">
          <div class="step-indicator">
            <span class="step-dot active"></span>
            <span class="step-dot active"></span>
          </div>
          <h2>ข้อมูลเพิ่มเติม</h2>
          <p class="auth-desc">บอกเราเพิ่มเติมเกี่ยวกับตัวคุณ</p>
          <div class="form-group">
            <label>เพศ</label>
            <div class="gender-options">
              <div class="gender-opt${data.gender === 'ชาย' ? ' selected' : ''}" data-gender="ชาย">ชาย</div>
              <div class="gender-opt${data.gender === 'หญิง' ? ' selected' : ''}" data-gender="หญิง">หญิง</div>
              <div class="gender-opt${data.gender === 'อื่น ๆ' ? ' selected' : ''}" data-gender="อื่น ๆ">อื่น ๆ</div>
            </div>
            <div class="form-error" id="gender-error"></div>
          </div>
          <div class="form-group">
            <label for="signup-age">อายุ</label>
            <input type="number" id="signup-age" class="form-input" placeholder="เช่น 25" min="1" max="120" value="${data.age}">
            <div class="form-error" id="age-error"></div>
          </div>
          <div class="form-actions">
            <button class="btn btn-secondary" id="btn-back">ย้อนกลับ</button>
            <button class="btn btn-primary" id="btn-submit">สมัครสมาชิก</button>
          </div>
        </div>
      </div>
    `;

    // Gender selection
    container.querySelectorAll('.gender-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        container.querySelectorAll('.gender-opt').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        data.gender = opt.dataset.gender;
      });
    });

    document.getElementById('btn-back').addEventListener('click', () => {
      step = 1;
      renderStep();
    });

    document.getElementById('btn-submit').addEventListener('click', () => {
      const age = document.getElementById('signup-age').value.trim();
      let valid = true;

      document.getElementById('gender-error').textContent = '';
      document.getElementById('age-error').textContent = '';

      if (!data.gender) {
        document.getElementById('gender-error').textContent = 'กรุณาเลือกเพศ';
        valid = false;
      }
      if (!age || isNaN(age) || Number(age) < 1 || Number(age) > 120) {
        document.getElementById('age-error').textContent = 'กรุณากรอกอายุที่ถูกต้อง (1-120)';
        valid = false;
      }
      if (!valid) return;

      data.age = Number(age);
      saveUser(data);
      location.hash = '#/profile';
    });
  }

  renderStep();
}
