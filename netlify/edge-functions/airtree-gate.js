const COOKIE_NAME = 'af_access';
const COOKIE_VALUE = 'granted';

export default async (request, context) => {
  const password = Deno.env.get('AIRTREE_PASSWORD') ?? 'frontier2026';

  const cookieHeader = request.headers.get('cookie') ?? '';
  const isAuthed = cookieHeader.split(';').some(c => c.trim() === `${COOKIE_NAME}=${COOKIE_VALUE}`);

  if (isAuthed) {
    return context.next();
  }

  if (request.method === 'POST') {
    let submitted = '';
    try {
      const data = await request.formData();
      submitted = data.get('password') ?? '';
    } catch { /* ignore parse errors */ }

    if (submitted === password) {
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/airtree-2026/',
          'Set-Cookie': `${COOKIE_NAME}=${COOKIE_VALUE}; Path=/airtree-2026; HttpOnly; SameSite=Strict; Max-Age=2592000`,
        },
      });
    }

    return new Response(gatePage(true), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  return new Response(gatePage(false), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
};

function gatePage(error) {
  const errorHTML = error
    ? '<p class="error">That code doesn\'t look right — please try again.</p>'
    : '';

  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>Jay Bergmann</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%23f4ede1'/%3E%3Ctext x='50' y='52' font-family='Georgia,serif' font-size='62' font-weight='600' fill='%23b07b3e' text-anchor='middle' dominant-baseline='central'%3EJ%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #f4ede1;
    --ink: #2c2620;
    --soft: #6b6052;
    --line: rgba(44,38,32,0.12);
    --gold: #b07b3e;
    --cream: #fbf6ec;
    --shadow: rgba(60,45,25,0.12);
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { height: 100%; }
  body {
    background: var(--bg);
    color: var(--ink);
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  body::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
    mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  }
  .gate {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
    animation: fadein 0.7s cubic-bezier(.2,.8,.2,1) both;
  }
  @keyframes fadein {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: none; }
  }
  .logo {
    width: 58px;
    height: 58px;
    background: var(--gold);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Newsreader', serif;
    font-size: 2rem;
    font-weight: 600;
    color: var(--bg);
    margin-bottom: 30px;
    box-shadow: 0 10px 28px -8px rgba(176,123,62,0.45);
  }
  .eyebrow {
    font-size: 0.68rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 600;
    margin-bottom: 12px;
    text-align: center;
  }
  h1 {
    font-family: 'Newsreader', serif;
    font-weight: 500;
    font-size: clamp(2rem, 6vw, 2.8rem);
    letter-spacing: -0.01em;
    line-height: 1.1;
    margin-bottom: 14px;
    text-align: center;
  }
  .sub {
    font-family: 'Newsreader', serif;
    font-style: italic;
    font-size: 1.05rem;
    color: var(--soft);
    max-width: 340px;
    text-align: center;
    line-height: 1.55;
    margin-bottom: 32px;
  }
  .card {
    background: var(--cream);
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 36px 32px;
    width: 100%;
    max-width: 360px;
    box-shadow: 0 20px 48px -24px var(--shadow);
  }
  .field { margin-bottom: 14px; }
  .field label {
    display: block;
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 600;
    color: var(--soft);
    margin-bottom: 8px;
  }
  .field input {
    width: 100%;
    border: 1.5px solid var(--line);
    border-radius: 10px;
    padding: 13px 15px;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    color: var(--ink);
    background: var(--bg);
    outline: none;
    transition: border-color 0.2s;
    letter-spacing: 0.1em;
  }
  .field input:focus { border-color: var(--gold); }
  button {
    width: 100%;
    background: var(--ink);
    color: var(--bg);
    border: none;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 0.96rem;
    padding: 14px;
    border-radius: 100px;
    cursor: pointer;
    transition: transform 0.2s;
    margin-top: 6px;
  }
  button:hover { transform: translateY(-2px); }
  .error {
    font-size: 0.88rem;
    color: #7a3020;
    background: rgba(122,48,32,0.08);
    border-radius: 8px;
    padding: 10px 14px;
    margin-bottom: 16px;
    text-align: center;
    line-height: 1.4;
  }
</style>
</head>
<body>
<div class="gate">
  <div class="logo">J</div>
  <p class="eyebrow">Airtree Frontier · Private</p>
  <h1>Jay Bergmann</h1>
  <p class="sub">This page is shared privately with Airtree Frontier. Enter the access code to continue.</p>
  <div class="card">
    ${errorHTML}
    <form method="POST" action="/airtree-2026/">
      <div class="field">
        <label for="pw">Access code</label>
        <input id="pw" type="password" name="password" placeholder="••••••••••" autofocus autocomplete="current-password" required>
      </div>
      <button type="submit">Enter →</button>
    </form>
  </div>
</div>
</body>
</html>`;
}
