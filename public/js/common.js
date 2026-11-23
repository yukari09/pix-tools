/* PixTools common helpers — 全部浏览器本地处理，不传服务器 */

/** 绑定拖拽/点击上传区。cb(file) */
function setupDropzone(dzId, inputId, cb) {
  const dz = document.getElementById(dzId);
  const input = document.getElementById(inputId);
  if (!dz || !input) return;

  dz.addEventListener('click', () => input.click());
  dz.setAttribute('role', 'button');
  if (!dz.hasAttribute('tabindex')) dz.tabIndex = 0;
  dz.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); }
  });
  const safe = async (file) => {
    clearError();
    try {
      await cb(file);
    } catch (e) {
      console.error(e);
      showError((e && e.message) || '图片解码失败，请换一张图片试试');
      const wa = document.getElementById('workArea');
      const st = document.getElementById('status');
      dz.classList.remove('hidden');
      if (wa) wa.classList.add('hidden');
      if (st) st.classList.remove('show');
      input.value = '';
    }
  };
  input.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) safe(e.target.files[0]);
  });
  ['dragover', 'dragenter'].forEach(ev => dz.addEventListener(ev, (e) => {
    e.preventDefault(); dz.classList.add('dragover');
  }));
  ['dragleave', 'drop'].forEach(ev => dz.addEventListener(ev, (e) => {
    e.preventDefault(); dz.classList.remove('dragover');
  }));
  dz.addEventListener('drop', (e) => {
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) safe(e.dataTransfer.files[0]);
  });
}

/** 读取文件为 Image 元素(自释放 URL) */
function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => { URL.revokeObjectURL(url); reject(new Error('图片解码失败，请换一张试试')); };
    img.src = url;
  });
}

/** 读文件为 ArrayBuffer */
function readArrayBuffer(file) {
  return file.arrayBuffer();
}

/** 格式化字节数 */
function fmtBytes(n) {
  if (n < 1024) return n + ' B';
  if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB';
  return (n / (1024 * 1024)).toFixed(2) + ' MB';
}

/** 触发下载 */
function download(blob, filename) {
  const a = document.createElement('a');
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1000);
}

/** 显示/隐藏状态条 */
function setStatus(el, {show, text, progress, done}) {
  if (!el) return;
  if (!show) { el.classList.remove('show'); return; }
  el.classList.add('show');
  const bar = el.querySelector('.progress-bar');
  const txt = el.querySelector('.status-text');
  const spin = el.querySelector('.spinner');
  if (progress !== undefined && bar) bar.style.width = Math.round(progress * 100) + '%';
  if (text && txt) txt.textContent = text;
  if (done !== undefined && spin) spin.style.display = done ? 'none' : '';
}

/** 显示错误条 */
function showError(msg) {
  const box = document.querySelector('.msg-error');
  if (!box) return;
  box.textContent = msg;
  box.style.display = 'block';
}
function clearError() {
  const box = document.querySelector('.msg-error');
  if (box) box.style.display = 'none';
}

/** 文件名校后缀：test.png -> test.webp */
function swapExt(name, newExt) {
  const base = name.replace(/\.[^.]+$/, '');
  return base + '.' + newExt;
}
/** 是否减少动效 */
function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** 换一张：清空文件、隐藏工作区、回到上传区 */
function resetTool() {
  const dz = document.getElementById('dropzone');
  const wa = document.getElementById('workArea');
  const input = document.getElementById('fileInput');
  const st = document.getElementById('status');
  clearError();
  if (st) st.classList.remove('show');
  if (wa) wa.classList.add('hidden');
  if (dz) dz.classList.remove('hidden');
  if (input) input.value = '';
  if (dz) dz.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
}
document.querySelectorAll('[data-reset]').forEach((b) => b.addEventListener('click', resetTool));

/** 上传后把工作区带到视野里 */
(function revealWorkArea() {
  const work = document.getElementById('workArea');
  if (!work || typeof MutationObserver === 'undefined') return;
  let wasHidden = work.classList.contains('hidden');
  new MutationObserver(() => {
    const hidden = work.classList.contains('hidden');
    if (wasHidden && !hidden) {
      setTimeout(() => work.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' }), 60);
    }
    wasHidden = hidden;
  }).observe(work, { attributes: true, attributeFilter: ['class'] });
})();
