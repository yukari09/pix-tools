// PixTools 压缩工具
let currentBlob = null;
let currentExt = 'webp';
let origSize = 0;

async function handleFile(file) {
  clearError();
  origSize = file.size;
  document.getElementById('dropzone').classList.add('hidden');
  document.getElementById('workArea').classList.remove('hidden');
  const img = await loadImage(file);
  document.getElementById('previewOrig').src = img.src;
  document.getElementById('metaOrig').textContent = `${file.name} · <span class="orig-size">${fmtBytes(file.size)}</span> · ${img.naturalWidth}×${img.naturalHeight}`;
  compress(img);
}

async function compress(img) {
  const q = parseInt(document.getElementById('quality').value);
  const fmt = document.getElementById('format').value;
  currentExt = fmt === 'image/jpeg' ? 'jpg' : fmt === 'image/png' ? 'png' : 'webp';

  const status = document.getElementById('status');
  status.classList.add('show');
  document.getElementById('statusText').textContent = `编码 ${currentExt.toUpperCase()}…`;
  document.getElementById('statusBar').style.width = '50%';

  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  if (fmt === 'image/jpeg') {
    const bg = document.createElement('canvas');
    bg.width = canvas.width; bg.height = canvas.height;
    const bctx = bg.getContext('2d');
    bctx.fillStyle = '#ffffff';
    bctx.fillRect(0, 0, bg.width, bg.height);
    bctx.drawImage(canvas, 0, 0);
    currentBlob = await new Promise((res) => bg.toBlob(res, fmt, q / 100));
  } else {
    currentBlob = await new Promise((res) => canvas.toBlob(res, fmt, q / 100));
  }

  document.getElementById('statusBar').style.width = '100%';
  setTimeout(() => status.classList.remove('show'), 400);

  const url = URL.createObjectURL(currentBlob);
  document.getElementById('previewResult').src = url;
  const ratio = origSize > 0 ? (100 - (currentBlob.size / origSize * 100)).toFixed(0) : 0;
  const cls = ratio >= 0 ? 'new-size' : '';
  document.getElementById('metaResult').innerHTML =
    `<span class="${cls}">${fmtBytes(currentBlob.size)}</span> · ${ratio >= 0 ? '节省 ' + ratio + '%' : '变大 ' + Math.abs(ratio) + '%'}`;
}

const qInput = document.getElementById('quality');
qInput.addEventListener('input', () => {
  document.getElementById('qualityVal').textContent = qInput.value;
  clearError();
  const img = new Image();
  img.onload = () => compress(img);
  const orig = document.getElementById('previewOrig');
  if (orig && orig.src) img.src = orig.src;
});
document.getElementById('format').addEventListener('change', () => {
  clearError();
  const img = new Image();
  img.onload = () => compress(img);
  const orig = document.getElementById('previewOrig');
  if (orig && orig.src) img.src = orig.src;
});
document.getElementById('btnExport').addEventListener('click', () => {
  if (currentBlob) download(currentBlob, swapExt('compressed', currentExt));
});

setupDropzone('dropzone', 'fileInput', handleFile);