// PixTools 加水印工具
let cachedImg = null;
let logoImg = null;
let currentBlob = null;
let renderTimer = null;

async function handleFile(file) {
  clearError();
  document.getElementById('dropzone').classList.add('hidden');
  document.getElementById('workArea').classList.remove('hidden');
  const img = await loadImage(file);
  cachedImg = img;
  document.getElementById('previewOrig').src = img.src;
  document.getElementById('metaOrig').textContent = `${file.name} · ${img.naturalWidth}×${img.naturalHeight} · ${fmtBytes(file.size)}`;
  scheduleRender();
}

function scheduleRender() {
  clearTimeout(renderTimer);
  renderTimer = setTimeout(render, 150);
}

async function render() {
  if (!cachedImg) return;
  const status = document.getElementById('status');
  status.classList.add('show');
  document.getElementById('statusText').textContent = '绘制水印…';
  document.getElementById('statusBar').style.width = '40%';

  const w = cachedImg.naturalWidth, h = cachedImg.naturalHeight;
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(cachedImg, 0, 0);

  const type = document.getElementById('wmType').value;
  const opacity = parseInt(document.getElementById('wmOpacity').value) / 100;

  if (type === 'text') {
    const text = document.getElementById('wmText').value || '水印';
    const size = Math.max(12, Math.round(w * parseInt(document.getElementById('wmSize').value) / 800));
    const color = document.getElementById('wmColor').value;
    ctx.font = `bold ${size}px sans-serif`;
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    const tile = document.getElementById('wmTile').value === 'true';
    const tw = ctx.measureText(text).width;
    const lineH = size * 1.6;
    const pad = 24;
    if (tile) {
      const stepX = Math.max(tw + 60, w * 0.3);
      const stepY = Math.max(lineH * 2, h * 0.25);
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(-Math.PI / 6);
      for (let x = -w; x < w * 2; x += stepX) {
        for (let y = -h; y < h * 2; y += stepY) {
          ctx.fillText(text, x, y);
        }
      }
      ctx.restore();
    } else {
      const pos = document.getElementById('wmPos').value;
      const margin = pad;
      const anchors = {
        tl: [margin, margin + size], tc: [(w - tw) / 2, margin + size], tr: [w - tw - margin, margin + size],
        ml: [margin, h / 2], mc: [(w - tw) / 2, h / 2], mr: [w - tw - margin, h / 2],
        bl: [margin, h - margin], bc: [(w - tw) / 2, h - margin], br: [w - tw - margin, h - margin],
      };
      const [x, y] = anchors[pos] || anchors.br;
      ctx.fillText(text, x, y);
    }
    ctx.globalAlpha = 1;
  } else if (type === 'logo' && logoImg) {
    const logoW = Math.round(w * parseInt(document.getElementById('wmSize').value) / 400);
    const logoH = Math.round(logoW * logoImg.naturalHeight / logoImg.naturalWidth);
    ctx.globalAlpha = opacity;
    const pos = document.getElementById('wmPos').value;
    const pad = 24;
    const anchors = {
      tl: [pad, pad], tc: [(w - logoW) / 2, pad], tr: [w - logoW - pad, pad],
      ml: [pad, (h - logoH) / 2], mc: [(w - logoW) / 2, (h - logoH) / 2], mr: [w - logoW - pad, (h - logoH) / 2],
      bl: [pad, h - logoH - pad], bc: [(w - logoW) / 2, h - logoH - pad], br: [w - logoW - pad, h - logoH - pad],
    };
    const [x, y] = anchors[pos] || anchors.br;
    ctx.drawImage(logoImg, x, y, logoW, logoH);
    ctx.globalAlpha = 1;
  }

  currentBlob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
  document.getElementById('previewResult').src = URL.createObjectURL(currentBlob);
  document.getElementById('metaResult').textContent = `PNG · ${fmtBytes(currentBlob.size)} · ${w}×${h}`;
  document.getElementById('statusBar').style.width = '100%';
  setTimeout(() => status.classList.remove('show'), 300);
}

['wmText', 'wmSize', 'wmOpacity', 'wmColor', 'wmPos', 'wmTile', 'wmType'].forEach((id) => {
  const el = document.getElementById(id);
  el.addEventListener('input', () => {
    if (id === 'wmSize') document.getElementById('wmSizeVal').textContent = el.value;
    if (id === 'wmOpacity') document.getElementById('wmOpacityVal').textContent = el.value;
    scheduleRender();
  });
  el.addEventListener('change', () => {
    document.getElementById('textCtrl').classList.toggle('hidden', id === 'wmType' && el.value !== 'text');
    document.getElementById('logoCtrl').classList.toggle('hidden', id === 'wmType' && el.value !== 'logo');
    scheduleRender();
  });
});

document.getElementById('logoInput').addEventListener('change', async (e) => {
  if (e.target.files && e.target.files[0]) {
    logoImg = await loadImage(e.target.files[0]);
    scheduleRender();
  }
});

document.getElementById('btnExport').addEventListener('click', () => {
  if (currentBlob) download(currentBlob, 'watermarked.png');
});

setupDropzone('dropzone', 'fileInput', handleFile);