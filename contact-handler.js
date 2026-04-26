// contact-handler.js
(function () {
  const API_BASE = window.API_BASE || '/api/contact';
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = document.getElementById('submitBtn');
  const statusEl = document.getElementById('formStatus');
  const toast = document.getElementById('toast');

  function showToast(text, timeout = 3500) {
    toast.textContent = text;
    toast.classList.add('show');
    toast.setAttribute('aria-hidden','false');
    setTimeout(() => {
      toast.classList.remove('show');
      toast.setAttribute('aria-hidden','true');
    }, timeout);
  }

  function setStatus(text, isError = false) {
    statusEl.textContent = text;
    statusEl.style.color = isError ? '#b00020' : '#118c4f';
  }

  function validateEmail(email) {
    return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    setStatus('', false);

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const phone = form.querySelector('#phone').value.trim();
    const subject = form.querySelector('#subject').value.trim();
    const message = form.querySelector('#message').value.trim();
    const honeypot = form.querySelector('#website').value.trim();

    if (honeypot) return; // bot detected silently

    if (!name || !email || !message) {
      setStatus('Vui lòng điền đầy đủ tên, email và nội dung.', true);
      return;
    }
    if (!validateEmail(email)) {
      setStatus('Email không hợp lệ.', true);
      return;
    }
    if (message.length > 5000) {
      setStatus('Nội dung quá dài.', true);
      return;
    }

    submitBtn.disabled = true;
    const origHtml = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span>Đang gửi...';

    const payload = { name, email, phone, subject, message };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
        credentials: 'same-origin'
      });

      clearTimeout(timeout);

      const data = (res.headers.get('content-type') || '').includes('application/json')
        ? await res.json()
        : {};

      if (res.ok) {
        setStatus(data.message || 'Gửi thành công! Cảm ơn bạn.');
        showToast('Gửi thành công!');
        form.reset();
      } else {
        const errMsg = data.error || 'Có lỗi xảy ra khi gửi. Vui lòng thử lại.';
        setStatus(errMsg, true);
        showToast('Lỗi: ' + errMsg, 5000);
        console.error('Contact submit error', data);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setStatus('Yêu cầu quá thời gian. Vui lòng thử lại.', true);
        showToast('Yêu cầu quá thời gian.', 4000);
      } else {
        setStatus('Lỗi kết nối. Vui lòng thử lại sau.', true);
        showToast('Lỗi kết nối.', 4000);
        console.error(err);
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = origHtml;
    }
  });
})();