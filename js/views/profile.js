// Profile view — displays user info, stats, logout
import { state, getUser, isSignedUp, clearUser } from '../state.js';

export function renderProfile() {
  if (!isSignedUp()) { location.hash = '#/signup'; return; }

  const container = document.getElementById('main-view');
  const user = getUser();
  const initial = user.email[0].toUpperCase();
  const signedUpDate = new Date(user.signedUpAt).toLocaleDateString('th-TH', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  container.innerHTML = `
    <div class="profile-container">
      <div class="page-header" style="text-align:center;">
        <span class="tag">โปรไฟล์</span>
        <h1>บัญชีของฉัน</h1>
      </div>
      <div class="profile-card">
        <div class="profile-header">
          <div class="avatar-lg">${initial}</div>
          <div>
            <h2>${user.email.split('@')[0]}</h2>
            <p class="email-text">${user.email}</p>
          </div>
        </div>
        <div class="profile-info">
          <div class="profile-row">
            <span class="profile-label">อีเมล</span>
            <span class="profile-value">${user.email}</span>
          </div>
          <div class="profile-row">
            <span class="profile-label">เพศ</span>
            <span class="profile-value">${user.gender}</span>
          </div>
          <div class="profile-row">
            <span class="profile-label">อายุ</span>
            <span class="profile-value">${user.age} ปี</span>
          </div>
          <div class="profile-row">
            <span class="profile-label">สมัครเมื่อ</span>
            <span class="profile-value">${signedUpDate}</span>
          </div>
        </div>
        <div class="profile-stats">
          <div class="profile-stat">
            <div class="num">${state.xp}</div>
            <div class="lbl">XP</div>
          </div>
          <div class="profile-stat">
            <div class="num">${state.streak}</div>
            <div class="lbl">Streak</div>
          </div>
          <div class="profile-stat">
            <div class="num">${state.completed.length}</div>
            <div class="lbl">บทเรียนสำเร็จ</div>
          </div>
        </div>
        <button class="logout-btn" id="btn-logout">ออกจากระบบ</button>
      </div>
    </div>
  `;

  document.getElementById('btn-logout').addEventListener('click', () => {
    clearUser();
    location.hash = '#/';
  });
}
