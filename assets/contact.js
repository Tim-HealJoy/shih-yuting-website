// 聯絡區行為：
// 1. 「寄信給昱廷」大按鈕：電腦版開 Gmail 撰寫頁（新分頁，收件人與主旨已填），手機維持 mailto 交給郵件 App
// 2. 底部信箱小字：點一下複製信箱並顯示「已複製」；複製失敗才退回 mailto
(function () {
  const EMAIL = 'j2hsi9123@gmail.com';

  function isPhone() {
    const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    return coarse && window.innerWidth < 900;
  }

  function gmailUrl(subject) {
    const p = new URLSearchParams({ view: 'cm', fs: '1', to: EMAIL });
    if (subject) p.set('su', subject);
    return 'https://mail.google.com/mail/?' + p.toString();
  }

  let toastEl = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.setAttribute('role', 'status');
      toastEl.style.cssText =
        'position:fixed;left:50%;bottom:32px;transform:translateX(-50%) translateY(12px);' +
        'background:#1f2a30;color:#f4efe3;padding:12px 20px;border-radius:999px;' +
        'font-size:15px;letter-spacing:.02em;box-shadow:0 8px 24px rgba(0,0,0,.35);' +
        'opacity:0;transition:opacity .2s,transform .2s;z-index:9999;pointer-events:none;';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    requestAnimationFrame(() => {
      toastEl.style.opacity = '1';
      toastEl.style.transform = 'translateX(-50%) translateY(0)';
    });
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => {
      toastEl.style.opacity = '0';
      toastEl.style.transform = 'translateX(-50%) translateY(12px)';
    }, 2200);
  }

  // 1. 大按鈕
  document.querySelectorAll('a.contact-cta').forEach(a => {
    a.addEventListener('click', e => {
      if (isPhone()) return; // 手機走 mailto
      e.preventDefault();
      const subject = a.dataset.subject || '';
      window.open(gmailUrl(subject), '_blank', 'noopener');
    });
  });

  // 2. 底部信箱：複製
  document.querySelectorAll('a.contact-link[href^="mailto:"]').forEach(a => {
    a.title = '點一下複製信箱';
    a.addEventListener('click', e => {
      if (!navigator.clipboard || !navigator.clipboard.writeText) return; // 退回 mailto
      e.preventDefault();
      navigator.clipboard.writeText(EMAIL)
        .then(() => toast('已複製信箱 ' + EMAIL))
        .catch(() => { window.location.href = 'mailto:' + EMAIL; });
    });
  });
})();
