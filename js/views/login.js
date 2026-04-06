// Login view — email + password login form
import { saveUser, isSignedUp, isGuest, enterGuestMode, getVisitCount } from '../state.js';
import { getMemberByEmail } from '../supabase.js';
import { eyeClosedSVG, initPasswordToggle } from './auth-helpers.js';

export function renderLogin() {
  if (isSignedUp()) { location.hash = '#/profile'; return; }
  if (isGuest()) { location.hash = '#/'; return; }

  const container = document.getElementById('main-view');
  const visits = getVisitCount();

  container.innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <h2>เข้าสู่ระบบ</h2>
        <p class="auth-desc">ลงชื่อเข้าใช้บัญชีของคุณ</p>
        <div class="form-group">
          <label for="login-email">อีเมล</label>
          <input type="email" id="login-email" class="form-input" placeholder="you@example.com">
          <div class="form-error" id="email-error"></div>
        </div>
        <div class="form-group">
          <label for="login-password">รหัสผ่าน</label>
          <div class="password-wrapper">
            <input type="password" id="login-password" class="form-input" placeholder="รหัสผ่านของคุณ">
            <button type="button" class="password-toggle" id="toggle-password">${eyeClosedSVG}</button>
          </div>
          <div class="form-error" id="password-error"></div>
        </div>
        <div class="form-actions">
          <button class="btn btn-primary" id="btn-login">เข้าสู่ระบบ</button>
        </div>
        <div class="divider-or"><span>หรือ</span></div>
        <button class="btn-guest" id="btn-guest">เข้าใช้งานแบบไม่ลงทะเบียน</button>
        <div class="auth-switch">
          ยังไม่มีบัญชี? <a href="#/signup">สมัครสมาชิก</a>
        </div>
      </div>
      <div class="visit-counter">
        มีผู้เข้าใช้งานแล้ว <strong>${visits.toLocaleString()}</strong> ครั้ง
      </div>
    </div>
  `;

  initPasswordToggle('login-password', 'toggle-password');

  document.getElementById('btn-guest').addEventListener('click', () => {
    enterGuestMode();
    location.hash = '#/';
  });

  document.getElementById('btn-login').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    document.getElementById('email-error').textContent = '';
    document.getElementById('password-error').textContent = '';

    if (!email) {
      document.getElementById('email-error').textContent = 'กรุณากรอกอีเมล';
      return;
    }
    if (!password) {
      document.getElementById('password-error').textContent = 'กรุณากรอกรหัสผ่าน';
      return;
    }

    const btn = document.getElementById('btn-login');
    btn.disabled = true;
    btn.textContent = 'กำลังเข้าสู่ระบบ...';

    try {
      const member = await getMemberByEmail(email);
      if (!member) {
        document.getElementById('email-error').textContent = 'ไม่พบบัญชี กรุณาสมัครสมาชิก';
        btn.disabled = false;
        btn.textContent = 'เข้าสู่ระบบ';
        return;
      }
      if (member.password !== password) {
        document.getElementById('password-error').textContent = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง';
        btn.disabled = false;
        btn.textContent = 'เข้าสู่ระบบ';
        return;
      }

      saveUser({
        email: member.email,
        password: member.password,
        gender: member.gender,
        age: member.age,
        signedUpAt: member.signed_up_at,
      });
      location.hash = '#/profile';
    } catch {
      document.getElementById('password-error').textContent = 'เกิดข้อผิดพลาด กรุณาลองใหม่';
      btn.disabled = false;
      btn.textContent = 'เข้าสู่ระบบ';
    }
  });
}
