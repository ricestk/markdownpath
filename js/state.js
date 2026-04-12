// State + localStorage persistence for MarkdownPath
const KEY = 'markdownpath:v1';

const DEFAULT_STATE = {
  xp: 0,
  completed: [],           // lesson ids
  challengesPassed: [],    // lesson ids
  quizzesPassed: [],       // lesson ids
  streak: 0,
  lastVisit: null,         // 'YYYY-MM-DD'
  visitDates: [],          // last 30 dates
  user: null,              // { email, password, gender, age, signedUpAt }
  visitCount: 0,           // total site visits
  isGuest: false,          // guest mode flag
};

function todayStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function daysBetween(a, b) {
  const da = new Date(a + 'T00:00:00');
  const db = new Date(b + 'T00:00:00');
  return Math.round((db - da) / 86400000);
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}

export const state = load();
const listeners = new Set();

export function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }
function emit() { listeners.forEach(fn => fn(state)); }

export function addXp(amount) {
  state.xp += amount;
  save(); emit();
}

export function markChallengePassed(lessonId, xpReward) {
  if (state.challengesPassed.includes(lessonId)) return false;
  state.challengesPassed.push(lessonId);
  state.xp += xpReward;
  maybeComplete(lessonId);
  save(); emit();
  return true;
}

export function markQuizPassed(lessonId, xpReward = 10) {
  if (state.quizzesPassed.includes(lessonId)) return false;
  state.quizzesPassed.push(lessonId);
  state.xp += xpReward;
  maybeComplete(lessonId);
  save(); emit();
  return true;
}

function maybeComplete(lessonId) {
  if (state.challengesPassed.includes(lessonId) &&
      state.quizzesPassed.includes(lessonId) &&
      !state.completed.includes(lessonId)) {
    state.completed.push(lessonId);
  }
}

export function isLocked() {
  return false;
}

export function progressPct(totalLessons) {
  return Math.round((state.completed.length / totalLessons) * 100);
}

// Streak calc on init
export function updateStreak() {
  const today = todayStr();
  if (state.lastVisit === today) return;
  if (!state.lastVisit) {
    state.streak = 1;
  } else {
    const gap = daysBetween(state.lastVisit, today);
    if (gap === 1) state.streak = (state.streak || 0) + 1;
    else if (gap >= 2) state.streak = 1;
    // gap = 0 handled above
  }
  state.lastVisit = today;
  if (!state.visitDates.includes(today)) state.visitDates.push(today);
  // trim to last 30
  if (state.visitDates.length > 30) state.visitDates = state.visitDates.slice(-30);
  save(); emit();
}

export function getWeekVisits() {
  // Returns array of 7 {date, done, isToday} for Sun..Sat of current week
  const now = new Date();
  const todayStrV = todayStr();
  const dayOfWeek = now.getDay(); // 0=Sun
  const start = new Date(now); start.setDate(now.getDate() - dayOfWeek);
  const out = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start); d.setDate(start.getDate() + i);
    const s = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    out.push({
      date: s,
      label: ['Su','Mo','Tu','We','Th','Fr','Sa'][i],
      done: state.visitDates.includes(s),
      isToday: s === todayStrV,
    });
  }
  return out;
}

export function reset() {
  Object.assign(state, { ...DEFAULT_STATE });
  save(); emit();
}

// ---- Visit counter ----
export function incrementVisitCount() {
  state.visitCount = (state.visitCount || 0) + 1;
  save();
}
export function getVisitCount() { return state.visitCount || 0; }

// ---- Guest mode ----
export function enterGuestMode() {
  state.isGuest = true;
  save(); emit();
}
export function exitGuestMode() {
  state.isGuest = false;
  save(); emit();
}
export function isGuest() { return !!state.isGuest; }

// ---- User auth helpers ----
export function saveUser({ email, password, gender, age, signedUpAt }) {
  state.user = { email, password, gender, age, signedUpAt: signedUpAt || new Date().toISOString() };
  state.isGuest = false;
  save(); emit();
}
export function getUser() { return state.user; }
export function isSignedUp() { return !!state.user; }
export function clearUser() {
  state.user = null;
  save(); emit();
}

// Expose for debugging
window.__mdpath = { state, reset };
