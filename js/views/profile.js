// Profile view — displays user info, stats, logout
import { state, getUser, isSignedUp, clearUser, getVisitCount, updateDisplayName } from '../state.js';
import { updateMemberDisplayName } from '../supabase.js';

export function renderProfile() {
  if (!isSignedUp()) { location.hash = '#/signup'; return; }

  const container = document.getElementById('main-view');
  const user = getUser();
  const displayName = user.displayName || user.email.split('@')[0];
  const initial = displayName[0].toUpperCase();
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
            <div class="profile-name-row">
              <h2 id="display-name">${displayName}</h2>
              <button class="edit-name-btn" id="btn-edit-name" title="แก้ไขชื่อ">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"/></svg>
              </button>
            </div>
            <p class="email-text">${user.email}</p>
          </div>
        </div>
        <div id="edit-name-form" class="edit-name-form" style="display:none;">
          <input type="text" id="input-display-name" class="form-input" value="${displayName}" maxlength="30" placeholder="ชื่อที่ต้องการแสดง">
          <div class="edit-name-actions">
            <button class="btn btn-secondary btn-sm" id="btn-cancel-name">ยกเลิก</button>
            <button class="btn btn-primary btn-sm" id="btn-save-name">บันทึก</button>
          </div>
          <div class="form-error" id="name-error"></div>
        </div>
        <div class="profile-info">
          <div class="profile-row">
            <span class="profile-label">ชื่อโปรไฟล์</span>
            <span class="profile-value">${displayName}</span>
          </div>
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
          <div class="profile-stat">
            <div class="num">${getVisitCount()}</div>
            <div class="lbl">เข้าใช้งาน</div>
          </div>
        </div>
        <button class="logout-btn" id="btn-logout">ออกจากระบบ</button>
      </div>
    </div>
  `;

  // Edit name toggle
  document.getElementById('btn-edit-name').addEventListener('click', () => {
    const form = document.getElementById('edit-name-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    if (form.style.display === 'block') {
      document.getElementById('input-display-name').focus();
    }
  });

  // Cancel edit
  document.getElementById('btn-cancel-name').addEventListener('click', () => {
    document.getElementById('edit-name-form').style.display = 'none';
    document.getElementById('input-display-name').value = displayName;
    document.getElementById('name-error').textContent = '';
  });

  // Save name
  document.getElementById('btn-save-name').addEventListener('click', async () => {
    const newName = document.getElementById('input-display-name').value.trim();
    document.getElementById('name-error').textContent = '';

    if (!newName) {
      document.getElementById('name-error').textContent = 'กรุณากรอกชื่อ';
      return;
    }

    const btn = document.getElementById('btn-save-name');
    btn.disabled = true;
    btn.textContent = 'กำลังบันทึก...';

    try {
      await updateMemberDisplayName(user.email, newName);
      updateDisplayName(newName);
      renderProfile();
    } catch {
      btn.disabled = false;
      btn.textContent = 'บันทึก';
      document.getElementById('name-error').textContent = 'เกิดข้อผิดพลาด กรุณาลองใหม่';
    }
  });

  // Logout
  document.getElementById('btn-logout').addEventListener('click', () => {
    clearUser();
    location.hash = '#/';
  });
}
