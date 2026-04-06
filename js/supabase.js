// Supabase client for MarkdownPath
const SUPABASE_URL = 'https://nzosbertptfprvbwdzko.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56b3NiZXJ0cHRmcHJ2YndkemtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NTkyMzUsImV4cCI6MjA5MTAzNTIzNX0.aJ4QX4vA6V88FyTvfX_BsBR0-fVv-RL97y4i9VjGQpg';

const HEADERS = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation',
};

const REST = `${SUPABASE_URL}/rest/v1`;

// ---- Members API ----

export async function createMember({ email, password, gender, age }) {
  const res = await fetch(`${REST}/members`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ email, password, gender, age }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (res.status === 409 || (err.code === '23505')) {
      throw new Error('EMAIL_EXISTS');
    }
    throw new Error(err.message || 'signup failed');
  }
  const data = await res.json();
  return data[0];
}

export async function getMemberByEmail(email) {
  const res = await fetch(
    `${REST}/members?email=eq.${encodeURIComponent(email)}&select=*`,
    { headers: HEADERS }
  );
  if (!res.ok) throw new Error('fetch failed');
  const data = await res.json();
  return data[0] || null;
}

export async function updateMemberVisitCount(email, visitCount) {
  const res = await fetch(
    `${REST}/members?email=eq.${encodeURIComponent(email)}`,
    {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({ visit_count: visitCount }),
    }
  );
  if (!res.ok) throw new Error('update failed');
  const data = await res.json();
  return data[0];
}
