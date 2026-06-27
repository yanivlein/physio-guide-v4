/* ════════════════════════════════════════════════════════════
   V2 shared enhancement layer — additive, dependency-free.
   Loaded on every page (after gate.js). Provides:
     • reveal-on-scroll for feature blocks (fail-safe: only hides
       elements once JS is confirmed running)
     • a floating back-to-top button
     • a top scroll-progress bar on pages without the sidebar #rp
     • focus-visible + smooth-scroll polish (injected CSS)
   Every animation is disabled under prefers-reduced-motion.
   ════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var reduce = window.matchMedia &&
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- inject component styles ------------------------------ */
  var css =
  '.v2-progress{position:fixed;top:0;right:0;left:0;height:3px;width:0;' +
    'background:linear-gradient(90deg,var(--accent,#2A4B7C),var(--era-2,#3A6B8A));' +
    'z-index:1200;transition:width .12s ease;}' +
  '.v2-totop{position:fixed;left:22px;bottom:22px;z-index:950;width:46px;height:46px;' +
    'border-radius:50%;border:1px solid var(--border-strong,#C4BFB5);' +
    'background:var(--bg,#FDFCF9);color:var(--accent,#2A4B7C);' +
    'box-shadow:0 6px 20px rgba(28,27,24,.16);cursor:pointer;' +
    'display:grid;place-items:center;font-size:1.2rem;line-height:1;' +
    'font-family:var(--font-ui,system-ui,sans-serif);' +
    'opacity:0;transform:translateY(10px);pointer-events:none;' +
    'transition:opacity .25s ease,transform .25s ease,border-color .2s,color .2s,background .2s;}' +
  '.v2-totop.show{opacity:1;transform:none;pointer-events:auto;}' +
  '.v2-totop:hover{background:var(--accent,#2A4B7C);color:#fff;border-color:var(--accent,#2A4B7C);}' +
  '.v2-reveal{opacity:0;transform:translateY(22px);' +
    'transition:opacity .7s cubic-bezier(.22,.61,.36,1),transform .7s cubic-bezier(.22,.61,.36,1);}' +
  '.v2-reveal.v2-in{opacity:1;transform:none;}' +
  'a:focus-visible,button:focus-visible,summary:focus-visible,[tabindex]:focus-visible{' +
    'outline:2px solid var(--accent,#2A4B7C);outline-offset:2px;border-radius:3px;}' +
  '@media (prefers-reduced-motion: reduce){' +
    '.v2-progress{transition:none;}' +
    '.v2-totop{transition:opacity .2s ease;transform:none;}' +
    '.v2-reveal{opacity:1 !important;transform:none !important;transition:none !important;}}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  function ready(fn){
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    /* ---- back-to-top button -------------------------------- */
    var toTop = document.createElement('button');
    toTop.className = 'v2-totop';
    toTop.setAttribute('aria-label', 'חזרה לראש העמוד');
    toTop.setAttribute('title', 'חזרה לראש העמוד');
    toTop.innerHTML = '↑';
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
    document.body.appendChild(toTop);

    /* ---- top progress bar (only if no sidebar #rp) --------- */
    var bar = null;
    if (!document.getElementById('rp')) {
      bar = document.createElement('div');
      bar.className = 'v2-progress';
      bar.setAttribute('aria-hidden', 'true');
      document.body.appendChild(bar);
    }

    function onScroll() {
      var sy = window.pageYOffset || document.documentElement.scrollTop || 0;
      toTop.classList.toggle('show', sy > 420);
      if (bar) {
        var h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        bar.style.width = (h > 0 ? (sy / h * 100) : 0) + '%';
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    /* ---- reveal-on-scroll for feature blocks --------------- */
    var SEL = '.card,.sk-card,.callout,.kc,.inf-card,.adv-card,.mode-card,' +
              '.schema-bridge,.era-group,.funnel-step,.sources-block,.data-notice,' +
              '.page-nav,.next-sec,.quote-band';
    var els = [].slice.call(document.querySelectorAll(SEL));

    if (els.length && !reduce && 'IntersectionObserver' in window) {
      els.forEach(function (el) { el.classList.add('v2-reveal'); });
      // gentle stagger within each parent group
      els.forEach(function (el) {
        var sibs = el.parentNode
          ? [].slice.call(el.parentNode.children).filter(function (c) {
              return c.classList && c.classList.contains('v2-reveal');
            })
          : [el];
        var idx = sibs.indexOf(el);
        if (idx > 0) el.style.transitionDelay = Math.min(idx * 70, 350) + 'ms';
      });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('v2-in'); io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      els.forEach(function (el) { io.observe(el); });
    }
    // reduced-motion / no-IO: elements keep their natural (visible) state.
  });
})();
