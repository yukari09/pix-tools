// PixTools 抠图工具 — 浏览器本地 AI 推理 (RMBG-1.4 via transformers.js)
let model = null;
let processor = null;
let currentBlob = null;

async function getRemover() {
  if (model) return { model, processor };
  const st = document.getElementById('status');
  const bar = document.getElementById('statusBar');
  const txt = document.getElementById('statusText');
  st.classList.add('show');
  txt.textContent = '下载 AI 抠图模型(首次约 90MB,之后有浏览器缓存)…';
  bar.style.width = '15%';
  try {
    const mod = await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.3.3');
    mod.env.allowLocalModels = false;
    if (mod.env.backends?.onnx?.wasm) mod.env.backends.onnx.wasm.proxy = true;
    bar.style.width = '30%';
    txt.textContent = '初始化 AI 模型…';
    const t0 = Date.now();
    model = await mod.AutoModel.from_pretrained('briaai/RMBG-1.4', {
      progress_callback: (p) => { bar.style.width = 30 + Math.round(p * 50) + '%'; },
    });
    processor = await mod.AutoProcessor.from_pretrained('briaai/RMBG-1.4');
    console.log('model ready in', ((Date.now() - t0) / 1000).toFixed(1) + 's');
    bar.style.width = '100%';
    txt.textContent = '模型就绪 ✓';
    setTimeout(() => st.classList.remove('show'), 800);
  } catch (err) {
    console.error(err);
    st.classList.remove('show');
    showError('模型加载失败,请检查网络后重试(需能访问 HuggingFace/镜像)。');
    throw err;
  }
  return { model, processor };
}

async function handleFile(file) {
  clearError();
  if (!file.type.startsWith('image/')) { showError('请选择图片文件(jpg/png/webp)'); return; }
  document.getElementById('dropzone').classList.add('hidden');
  document.getElementById('workArea').classList.remove('hidden');
  const img = await loadImage(file);
  document.getElementById('previewOrig').src = img.src;
  document.getElementById('metaOrig').textContent = `${file.name} · ${fmtBytes(file.size)} · ${img.naturalWidth}×${img.naturalHeight}`;
  document.getElementById('metaResult').textContent = '处理中…';

  const st = document.getElementById('status');
  const bar = document.getElementById('statusBar');
  const txt = document.getElementById('statusText');
  st.classList.add('show');

  try {
    const { model: m, processor: p } = await getRemover();
    txt.textContent = 'AI 抠图中(本地推理,约 5-30 秒)…';
    bar.style.width = '60%';

    const tmod = await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.3.3');
    const raw = await tmod.RawImage.fromURL(URL.createObjectURL(file));
    const { pixel_values } = await p(raw);
    const { output } = await m({ input: pixel_values });
    bar.style.width = '85%';

    const maskData = (
      await tmod.RawImage.fromTensor(output[0].mul(255).to('uint8')).resize(raw.width, raw.height)
    ).data;

    const outCanvas = document.createElement('canvas');
    outCanvas.width = raw.width;
    outCanvas.height = raw.height;
    const ctx = outCanvas.getContext('2d');
    ctx.drawImage(raw.toCanvas(), 0, 0);
    const imgData = ctx.getImageData(0, 0, raw.width, raw.height);
    for (let i = 0; i < maskData.length; ++i) {
      imgData.data[4 * i + 3] = maskData[i];
    }
    ctx.putImageData(imgData, 0, 0);

    currentBlob = await new Promise((res) => outCanvas.toBlob(res, 'image/png'));
    const url = URL.createObjectURL(currentBlob);
    document.getElementById('previewResult').src = url;
    document.getElementById('metaResult').textContent = `${fmtBytes(currentBlob.size)} · ${raw.width}×${raw.height} · 透明背景`;
    bar.style.width = '100%';
    txt.textContent = '完成 ✓';
    setTimeout(() => st.classList.remove('show'), 600);
  } catch (err) {
    console.error(err);
    st.classList.remove('show');
    showError('抠图失败:' + (err.message || err));
  }
}

setupDropzone('dropzone', 'fileInput', handleFile);
document.getElementById('btnDownload')?.addEventListener('click', () => {
  if (currentBlob) download(currentBlob, 'removebg.png');
});
document.getElementById('btnAgain')?.addEventListener('click', () => {
  document.getElementById('dropzone').classList.remove('hidden');
  document.getElementById('workArea').classList.add('hidden');
  document.getElementById('fileInput').value = '';
  currentBlob = null;
});