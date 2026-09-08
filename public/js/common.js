/* PixTools common helpers — 全部浏览器本地处理,不传服务器 */

/** 绑定拖拽/点击上传区。cb(file) */
function setupDropzone(dzId, inputId, cb) {
  const dz = document.getElementById(dzId);
  const input = document.getElementById(inputId);
  if (!dz || !input) return;

  dz.addEventListener('click', () => input.click());
  input.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) cb(e.target.files[0]);
  });
  ['dragover', 'dragenter'].forEach(ev => dz.addEventListener(ev, (e) => {
    e.preventDefault(); dz.classList.add('dragover');
  }));
  ['dragleave', 'drop'].forEach(ev => dz.addEventListener(ev, (e) => {
    e.preventDefault(); dz.classList.remove('dragover');
  }));
  dz.addEventListener('drop', (e) => {
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) cb(e.dataTransfer.files[0]);
  });
}

/** 读取文件为 Image 元素(自释放 URL) */
function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => { URL.revokeObjectURL(url); reject(new Error('图片解码失败,请换一张试试')); };
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

/** 文件名校后缀: test.png -> test.webp */
function swapExt(name, newExt) {
  const base = name.replace(/\.[^.]+$/, '');
  return base + '.' + newExt;
}