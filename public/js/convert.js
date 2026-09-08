// PixTools 格式转换工具
let currentBlob = null;
let currentExt = 'webp';
let cachedImg = null;
let origSize = 0;

async function handleFile(file) {
  clearError();
  origSize = file.size;
  document.getElementById('dropzone').classList.add('hidden');
  document.getElementById('workArea').classList.remove('hidden');
  const img = await loadImage(file);
  cachedImg = img;
  document.getElementById('previewOrig').src = img.src;
  document.getElementById('metaOrig').textContent = `${file.name} · ${fmtBytes(file.size)} · ${img.naturalWidth}×${img.naturalHeight}`;
  convert();
}

async function convert() {
  if (!cachedImg) return;
  const target = document.getElementById('target').value;
  const q = parseInt(document.getElementById('quality').value);
  currentExt = target === 'image/jpeg' ? 'jpg' : target === 'image/png' ? 'png' : 'webp';

  const status = document.getElementById('status');
  status.classList.add('show');
  document.getElementById('statusText').textContent = `转换为 ${currentExt.toUpperCase()}…`;
  document.getElementById('statusBar').style.width = '50%';

  const canvas = document.createElement('canvas');
  canvas.width = cachedImg.naturalWidth;
  canvas.height = cachedImg.naturalHeight;
  const ctx = canvas.getContext('2d');

  if (target === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(cachedImg, 0, 0);

  currentBlob = await new Promise((res) => canvas.toBlob(res, target, q / 100));
  document.getElementById('statusBar').style.width = '100%';
  setTimeout(() => status.classList.remove('show'), 400);

  const url = URL.createObjectURL(currentBlob);
  document.getElementById('previewResult').src = url;
  const diff = origSize > 0 ? ((currentBlob.size - origSize) / origSize * 100).toFixed(0) : 0;
  document.getElementById('metaResult').textContent =
    `${fmtBytes(currentBlob.size)} · ${diff >= 0 ? '+' : ''}${diff}% vs 原图`;
}

document.getElementById('target').addEventListener('change', () => { clearError(); convert(); });
document.getElementById('quality').addEventListener('input', () => {
  document.getElementById('qualityVal').textContent = document.getElementById('quality').value;
  clearError(); convert();
});
document.getElementById('btnExport').addEventListener('click', () => {
  if (currentBlob) download(currentBlob, swapExt('converted', currentExt));
});

setupDropzone('dropzone', 'fileInput', handleFile);