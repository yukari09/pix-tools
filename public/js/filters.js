// PixTools 滤镜工具
let cachedImg = null;
let currentBlob = null;
let rendering = false;

async function handleFile(file) {
  clearError();
  document.getElementById('dropzone').classList.add('hidden');
  document.getElementById('workArea').classList.remove('hidden');
  const img = await loadImage(file);
  cachedImg = img;
  document.getElementById('previewOrig').src = img.src;
  document.getElementById('metaOrig').textContent = `${file.name} · ${img.naturalWidth}×${img.naturalHeight} · ${fmtBytes(file.size)}`;
  render();
}

function cssFilter() {
  const b = parseInt(document.getElementById('brightness').value);
  const c = parseInt(document.getElementById('contrast').value);
  const s = parseInt(document.getElementById('saturate').value);
  const bl = parseInt(document.getElementById('blur').value);
  return `brightness(${1 + b / 100}) contrast(${1 + c / 100}) saturate(${1 + s / 100}) blur(${bl}px)`;
}

function applyPreset(name) {
  const set = (id, v) => { document.getElementById(id).value = v; document.getElementById(id + 'Val').textContent = v; };
  if (name === 'grayscale') { set('brightness', 0); set('contrast', 0); set('saturate', -100); set('blur', 0); }
  else if (name === 'sepia') { set('brightness', 0); set('contrast', -10); set('saturate', -30); set('blur', 0); }
  else if (name === 'invert') { set('brightness', 0); set('contrast', 0); set('saturate', 0); set('blur', 0); }
  else if (name === 'vivid') { set('brightness', 5); set('contrast', 15); set('saturate', 25); set('blur', 0); }
  else if (name === 'fade') { set('brightness', 10); set('contrast', -20); set('saturate', -20); set('blur', 0); }
}

async function render() {
  if (!cachedImg || rendering) return;
  rendering = true;
  const status = document.getElementById('status');
  status.classList.add('show');
  document.getElementById('statusText').textContent = '应用滤镜…';
  document.getElementById('statusBar').style.width = '50%';

  try {
    const canvas = document.createElement('canvas');
    canvas.width = cachedImg.naturalWidth;
    canvas.height = cachedImg.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.filter = cssFilter();
    ctx.drawImage(cachedImg, 0, 0);
    ctx.filter = 'none';

    const preset = document.getElementById('preset').value;
    if (preset === 'invert') {
      const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < id.data.length; i += 4) {
        id.data[i] = 255 - id.data[i];
        id.data[i + 1] = 255 - id.data[i + 1];
        id.data[i + 2] = 255 - id.data[i + 2];
      }
      ctx.putImageData(id, 0, 0);
    }

    currentBlob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
    document.getElementById('previewResult').src = URL.createObjectURL(currentBlob);
    document.getElementById('metaResult').textContent = `PNG · ${fmtBytes(currentBlob.size)}`;
  } catch (e) {
    console.error(e);
    showError('滤镜处理失败:' + (e.message || e));
  } finally {
    document.getElementById('statusBar').style.width = '100%';
    setTimeout(() => status.classList.remove('show'), 300);
    rendering = false;
  }
}

['brightness', 'contrast', 'saturate', 'blur'].forEach((id) => {
  document.getElementById(id).addEventListener('input', () => {
    document.getElementById(id + 'Val').textContent = document.getElementById(id).value;
    clearError();
    if (document.getElementById('preset').value) document.getElementById('preset').value = '';
    render();
  });
});
document.getElementById('preset').addEventListener('change', () => {
  applyPreset(document.getElementById('preset').value);
  ['brightness', 'contrast', 'saturate', 'blur'].forEach((id) =>
    document.getElementById(id + 'Val').textContent = document.getElementById(id).value);
  clearError(); render();
});
document.getElementById('btnExport').addEventListener('click', () => {
  if (currentBlob) download(currentBlob, swapExt('filtered', 'png'));
});

setupDropzone('dropzone', 'fileInput', handleFile);