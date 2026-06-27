/* Soft password gate for the psychophysiology guide.
   NOTE: this is a client-side gate only. The site is a public, static GitHub
   Pages site, so this file (and the password below) is downloadable by anyone
   with the URL. It keeps casual visitors out — it is NOT real security. */
(function () {
  var PASSWORD = 'ARLAB2026';        // compared case-insensitively, trimmed
  var KEY = 'arlabAuth';
  var LOCK_CLASS = 'arlab-gate-locked';
  var docEl = document.documentElement;

  // Already unlocked this browser session — reveal content and stop.
  try {
    if (sessionStorage.getItem(KEY) === '1') {
      docEl.classList.remove(LOCK_CLASS);
      return;
    }
  } catch (e) { /* storage blocked — fail open below */ }

  function unlock(style, gate) {
    try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
    docEl.classList.remove(LOCK_CLASS);
    if (gate && gate.parentNode) gate.parentNode.removeChild(gate);
    if (style && style.parentNode) style.parentNode.removeChild(style);
  }

  function buildGate() {
    var style = document.createElement('style');
    style.textContent = [
      '#arlab-gate{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;',
      'background:#FDFCF9;font-family:"Lato",system-ui,sans-serif;padding:24px;}',
      '#arlab-gate .gate-card{width:100%;max-width:380px;text-align:center;}',
      '#arlab-gate .gate-lock{font-size:2rem;margin-bottom:18px;line-height:1;}',
      '#arlab-gate .gate-kicker{font-family:"Lato",system-ui,sans-serif;font-size:0.7rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#8A8680;margin-bottom:10px;}',
      '#arlab-gate h1{font-family:"Frank Ruhl Libre",Georgia,serif;font-size:1.5rem;font-weight:700;color:#1C1B18;margin:0 0 8px;line-height:1.3;}',
      '#arlab-gate p.gate-sub{font-size:0.9rem;color:#4A4840;margin:0 0 24px;line-height:1.6;}',
      '#arlab-gate form{display:flex;flex-direction:column;gap:12px;}',
      '#arlab-gate input{font-family:inherit;font-size:1rem;padding:12px 16px;border:1px solid #C4BFB5;border-radius:4px;background:#fff;color:#1C1B18;text-align:center;letter-spacing:0.08em;outline:none;transition:border-color .15s,box-shadow .15s;}',
      '#arlab-gate input:focus{border-color:#2A4B7C;box-shadow:0 0 0 3px #E8EEF7;}',
      '#arlab-gate button{font-family:inherit;font-size:0.92rem;font-weight:700;padding:12px 16px;border:1px solid #2A4B7C;border-radius:4px;background:#2A4B7C;color:#fff;cursor:pointer;transition:background .15s;}',
      '#arlab-gate button:hover{background:#1E3659;}',
      '#arlab-gate .gate-err{min-height:18px;font-size:0.82rem;color:#B0413E;margin-top:2px;visibility:hidden;}',
      '#arlab-gate .gate-err.show{visibility:visible;}',
      '#arlab-gate.shake .gate-card{animation:arlabShake .4s;}',
      '@keyframes arlabShake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-7px)}40%,80%{transform:translateX(7px)}}',
      '@media(prefers-reduced-motion:reduce){#arlab-gate.shake .gate-card{animation:none;}}'
    ].join('');
    document.head.appendChild(style);

    var gate = document.createElement('div');
    gate.id = 'arlab-gate';
    gate.setAttribute('role', 'dialog');
    gate.setAttribute('aria-modal', 'true');
    gate.setAttribute('aria-label', 'הזנת סיסמה');
    gate.innerHTML =
      '<div class="gate-card">' +
        '<div class="gate-lock" aria-hidden="true">🔒</div>' +
        '<div class="gate-kicker">גישה מוגבלת</div>' +
        '<h1>מדריך פסיכופיזיולוגיה</h1>' +
        '<p class="gate-sub">האתר מיועד לחברי המעבדה. יש להזין סיסמה כדי להמשיך.</p>' +
        '<form id="arlab-gate-form" autocomplete="off">' +
          '<input id="arlab-gate-input" type="password" aria-label="סיסמה" placeholder="סיסמה" autocomplete="current-password" autocapitalize="off" spellcheck="false">' +
          '<button type="submit">כניסה</button>' +
          '<div class="gate-err" id="arlab-gate-err" role="alert">סיסמה שגויה. נסו שוב.</div>' +
        '</form>' +
      '</div>';
    document.body.appendChild(gate);

    var input = document.getElementById('arlab-gate-input');
    var err = document.getElementById('arlab-gate-err');
    var form = document.getElementById('arlab-gate-form');
    input.focus();

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (input.value.trim().toUpperCase() === PASSWORD) {
        unlock(style, gate);
      } else {
        err.classList.add('show');
        gate.classList.add('shake');
        input.select();
        setTimeout(function () { gate.classList.remove('shake'); }, 450);
      }
    });
  }

  if (document.body) buildGate();
  else document.addEventListener('DOMContentLoaded', buildGate);
})();
