// PixTools 九宫格切图工具
let cachedImg = null;
let pieces = [];

async function handleFile(file) {
  clearError();
  document.getElementById('dropzone').classList.add('hidden');
  document.getElementById('workArea').classList.remove('hidden');
  const img = await loadImage(file);
  cachedImg = img;
  cut();
}

async function cut() {
  const n = parseInt(document.getElementById('grid').value);
  const outFmt = document.getElementById('outFmt').value;
  const ext = outFmt === 'image/jpeg' ? 'jpg' : outFmt === 'image/webp' ? 'webp' : 'png';
  const status = document.getElementById('status');
  status.classList.add('show');
  document.getElementById('statusText').textContent = `切成 ${n}×${n} 网格…`;
  document.getElementById('statusBar').style.width = '40%';

  const w = cachedImg.naturalWidth, h = cachedImg.naturalHeight;
  const pw = Math.floor(w / n), ph = Math.floor(h / n);
  pieces = [];
  const gridEl = document.getElementById('gridPreview');
  gridEl.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
  gridEl.innerHTML = '';

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const canvas = document.createElement('canvas');
      canvas.width = pw; canvas.height = ph;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(cachedImg, c * pw, r * ph, pw, ph, 0, 0, pw, ph);
      const blob = await new Promise((res) => canvas.toBlob(res, outFmt, 0.92));
      pieces.push(blob);
      const box = document.createElement('div');
      box.style.aspectRatio = '1/1';
      box.style.overflow = 'hidden';
      box.style.borderRadius = '4px';
      const im = document.createElement('img');
      im.src = URL.createObjectURL(blob);
      im.style.width = '100%'; im.style.display = 'block';
      box.appendChild(im);
      gridEl.appendChild(box);
    }
  }
  document.getElementById('statusBar').style.width = '100%';
  setTimeout(() => status.classList.remove('show'), 300);
  document.getElementById('metaResult').textContent =
    `${n}×${n} = ${pieces.length} 张 · 每张 ${pw}×${ph}px · 共 ${fmtBytes(pieces.reduce((a, b) => a + b.size, 0))}`;
}

document.getElementById('grid').addEventListener('change', () => { if (cachedImg) cut(); });
document.getElementById('outFmt').addEventListener('change', () => { if (cachedImg) cut(); });

document.getElementById('btnZip').addEventListener('click', async () => {
  if (!pieces.length) return;
  const { default: JSZip } = await import('https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm');
  const zip = new JSZip();
  const n = parseInt(document.getElementById('grid').value);
  const outFmt = document.getElementById('outFmt').value;
  const ext = outFmt === 'image/jpeg' ? 'jpg' : outFmt === 'image/webp' ? 'webp' : 'png';
  pieces.forEach((blob, i) => {
    const r = Math.floor(i / n) + 1, c = (i % n) + 1;
    zip.file(`nine-grid_${r}-${c}.${ext}`, blob);
  });
  const zblob = await zip.generateAsync({ type: 'blob' });
  download(zblob, 'nine-grid.zip');
});

setupDropzone('dropzone', 'fileInput', handleFile);