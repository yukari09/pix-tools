// PixTools 缩放工具
let currentBlob = null;
let currentExt = 'png';
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
  document.getElementById('metaOrig').textContent = `${file.name} · ${img.naturalWidth}×${img.naturalHeight} · ${fmtBytes(file.size)}`;
  resize();
}

function computeSize() {
  const w = cachedImg.naturalWidth, h = cachedImg.naturalHeight;
  const mode = document.getElementById('mode').value;
  const keep = document.getElementById('keepRatio').value === 'true';
  if (mode === 'percent') {
    const p = parseInt(document.getElementById('percent').value) / 100;
    return { width: Math.max(1, Math.round(w * p)), height: Math.max(1, Math.round(h * p)) };
  }
  const pw = parseInt(document.getElementById('pixelW').value);
  const ph = parseInt(document.getElementById('pixelH').value);
  let nw, nh;
  if (!isNaN(pw) && pw > 0 && !isNaN(ph) && ph > 0) { nw = pw; nh = ph; }
  else if (!isNaN(pw) && pw > 0) {
    nw = pw; nh = keep ? Math.max(1, Math.round(h * (pw / w))) : h;
  } else if (!isNaN(ph) && ph > 0) {
    nh = ph; nw = keep ? Math.max(1, Math.round(w * (ph / h))) : w;
  } else { nw = w; nh = h; }
  return { width: nw, height: nh };
}

async function resize() {
  if (!cachedImg) return;
  const { width: nw, height: nh } = computeSize();
  const status = document.getElementById('status');
  status.classList.add('show');
  document.getElementById('statusText').textContent = `缩放为 ${nw}×${nh}…`;
  document.getElementById('statusBar').style.width = '50%';

  const canvas = document.createElement('canvas');
  canvas.width = nw; canvas.height = nh;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = document.getElementById('interp').value;

  const outFmt = document.getElementById('outFmt').value;
  currentExt = outFmt === 'image/jpeg' ? 'jpg' : outFmt === 'image/webp' ? 'webp' : 'png';
  if (outFmt === 'image/jpeg') {
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, nw, nh);
  }
  ctx.drawImage(cachedImg, 0, 0, nw, nh);
  currentBlob = await new Promise((res) => canvas.toBlob(res, outFmt, 0.92));
  document.getElementById('statusBar').style.width = '100%';
  setTimeout(() => status.classList.remove('show'), 400);

  document.getElementById('previewResult').src = URL.createObjectURL(currentBlob);
  document.getElementById('metaResult').textContent =
    `${nw}×${nh} · ${fmtBytes(currentBlob.size)}${origSize ? ' · 原 ' + fmtBytes(origSize) : ''}`;
}

document.getElementById('mode').addEventListener('change', () => {
  const mode = document.getElementById('mode').value;
  document.getElementById('percentCtrl').classList.toggle('hidden', mode !== 'percent');
  document.getElementById('pixelCtrl').classList.toggle('hidden', mode !== 'pixels');
  document.getElementById('pixelCtrlH').classList.toggle('hidden', mode !== 'pixels');
  clearError(); resize();
});
document.getElementById('percent').addEventListener('input', () => {
  document.getElementById('percentVal').textContent = document.getElementById('percent').value;
  clearError(); resize();
});
['pixelW', 'pixelH', 'keepRatio', 'interp', 'outFmt'].forEach((id) =>
  document.getElementById(id).addEventListener('change', () => { clearError(); resize(); })
);
document.getElementById('btnExport').addEventListener('click', () => {
  if (currentBlob) download(currentBlob, swapExt('resized', currentExt));
});

setupDropzone('dropzone', 'fileInput', handleFile);