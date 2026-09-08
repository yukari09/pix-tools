// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://pixtools.morio.cc',
  compressHTML: true,
  trailingSlash: 'ignore',
  build: {
    // format: 'file' 保持线上 URL 形态 (.html 后缀), SEO 已收录 URL 不变
    format: 'file',
  },
});