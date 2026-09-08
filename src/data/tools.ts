// PixTools 工具元数据 —— 全站 SEO 数据集中管理
// 新增工具页 = 在这里加一条 + 建一个页面, 自动获得 og/schema/导航/footer 一致性

export interface Tool {
  slug: string;          // 页面文件名 (不含 .html)
  name: string;          // 面包屑/标题用名
  icon: string;          // emoji
  iconBg: string;        // tailwind 风格背景色
  iconColor: string;
  cardTitle: string;     // 首页卡片标题
  cardDesc: string;      // 首页卡片描述
  pageTitle: string;     // <title>
  pageDesc: string;      // meta description + 页面 h1 下方简介首句
  hotTag?: string;       // 首页「热门」标签
  faqs: [string, string][]; // [问题, 答案]
}

export const SITE = {
  name: 'PixTools 图片工具箱',
  domain: 'https://pixtools.morio.cc',
};

export const HOT_TERMS: [string, string][] = [
  ['在线抠图', '/removebg.html'],
  ['AI 去背景', '/removebg.html'],
  ['图片压缩', '/compress.html'],
  ['照片压缩', '/compress.html'],
  ['WebP 转 JPG', '/convert.html'],
  ['JPG 转 PNG', '/convert.html'],
  ['PNG 转 JPG', '/convert.html'],
  ['图片改尺寸', '/resize.html'],
  ['朋友圈九宫格', '/nine-grid.html'],
  ['图片加水印', '/watermark.html'],
  ['电商图片加水印', '/watermark.html'],
  ['照片滤镜', '/filters.html'],
  ['图片黑白', '/filters.html'],
];

export const RELATED_LINKS: [string, string][] = [
  ['✂ AI 一键抠图', '/removebg.html'],
  ['🗜 图片压缩', '/compress.html'],
  ['⇄ 图片格式转换', '/convert.html'],
  ['⤢ 图片缩放', '/resize.html'],
  ['▦ 九宫格切图', '/nine-grid.html'],
  ['🖋 图片加水印', '/watermark.html'],
  ['◐ 图片滤镜', '/filters.html'],
];

export const TOOLS: Tool[] = [
  {
    slug: 'removebg',
    name: 'AI 抠图去背景',
    icon: '✂',
    iconBg: '#eef2ff',
    iconColor: '#4f46e5',
    cardTitle: 'AI 一键抠图',
    cardDesc: '一键去除图片背景,生成透明背景 PNG。模特图、产品图、头像皆可用,AI 模型直接在浏览器运行。',
    hotTag: '热门',
    pageTitle: 'AI 一键抠图 — 免费在线去背景生成透明PNG | PixTools',
    pageDesc: '免费在线 AI 抠图工具:一键去除图片背景,生成透明背景 PNG 下载。AI 模型在浏览器本地运行,图片不上传服务器,支持人物、商品、产品图抠图。',
    faqs: [
      ['AI 抠图是怎么工作的?', '上传图片后,PixTools 会在你的浏览器本地运行 AI 抠图模型(首次需下载约 90MB 模型,之后有浏览器缓存),自动识别图片主体并去除背景,输出透明背景 PNG。'],
      ['抠图会损坏原图吗?', '不会。原图只用于本地处理,不会上传、不会修改,结果会另存为新图片,随时可以重新处理。'],
      ['抠出来的图可以用在哪里?', '透明背景 PNG 可以用于做头像、电商白底图、贴纸、拼图素材、PPT 插图等场景,边缘质量在网页工具里属于第一梯队。'],
      ['手机浏览器可以用吗?', '可以。PixTools 支持任何现代浏览器(Chrome、Edge、Safari、Firefox 及国产浏览器),手机电脑均可使用,无账号无限制。'],
    ],
  },
  {
    slug: 'compress',
    name: '在线图片压缩',
    icon: '🗜',
    iconBg: '#f0fdf4',
    iconColor: '#16a34a',
    cardTitle: '图片压缩',
    cardDesc: '压缩 JPG/PNG/WebP,自定义质量,实时预览大小对比。适合压缩后发邮件、传微信、贴网页。',
    pageTitle: '在线图片压缩 — JPG/PNG/WebP 免费压缩 | PixTools',
    pageDesc: '免费在线图片压缩工具:压缩 JPG、PNG、WebP 图片,自定义质量,实时预览压缩前后大小对比。浏览器本地处理,图片不上传服务器。',
    faqs: [
      ['图片压缩会变模糊吗?', '压缩质量可以自己调(5%-100%)。默认 75% 质量在绝大多数图片上看不出差异,但体积能减少一半以上;要求极致画质可以调高质量。'],
      ['压缩后的图片上传到服务器吗?', '不会。整个压缩过程都在浏览器本地完成,你的图片不会离开设备,适合压缩敏感图片。'],
      ['哪种格式压缩后体积最小?', 'WebP 格式压缩后体积最小,通常比 JPG 再小 25%-35%,且支持透明。兼容性要求高时再选 JPG。'],
      ['可以批量压缩多张图片吗?', '工具按张处理,你可以在设置好质量和格式后,依次上传每张图片并下载结果,效果一致。'],
    ],
  },
  {
    slug: 'convert',
    name: '图片格式转换',
    icon: '⇄',
    iconBg: '#fff7ed',
    iconColor: '#ea580c',
    cardTitle: '图片格式转换',
    cardDesc: 'PNG、JPG、WebP 三种格式互转。WebP 转 JPG、JPG 转 PNG 透明底等场景一键搞定。',
    pageTitle: '图片格式转换 — WebP转JPG/PNG互转在线工具 | PixTools',
    pageDesc: '免费在线图片格式转换:PNG、JPG、WebP 一键互转,包含 WebP 转 JPG。浏览器本地转换,图片不上传服务器。',
    faqs: [
      ['WebP 转 JPG 怎么做?', '在 PixTools 格式转换页上传 WebP 图片,目标格式选择 JPG,点击导出即可,一次完成,不需要装任何软件。'],
      ['格式转换会压缩图片吗?', '转换时使用高质量编码(默认 90%),像素尺寸和主体内容完全保留,只有 JPG/WebP 这类有损格式会按质量参数编码。'],
      ['JPG 能转成透明 PNG 吗?', 'JPG 本身不含透明通道,转 PNG 后透明区域仍是白色背景。真正需要透明背景建议先使用 AI 抠图工具去除背景。'],
      ['转换需要上传到服务器吗?', '不需要。所有转换都在浏览器本地完成,支持 PNG、JPG、WebP 三种格式互转。'],
    ],
  },
  {
    slug: 'resize',
    name: '在线图片缩放',
    icon: '⤢',
    iconBg: '#fdf4ff',
    iconColor: '#c026d3',
    cardTitle: '图片缩放',
    cardDesc: '按比例或指定尺寸缩放图片。批量导出多尺寸,适合做店铺主图、公众号配图、社交媒体封面。',
    pageTitle: '在线图片缩放 — 按比例或指定尺寸改图片大小 | PixTools',
    pageDesc: '免费在线图片缩放工具:按百分比或指定宽高调整图片尺寸,支持高质量插值,浏览器本地处理不上传服务器。',
    faqs: [
      ['按百分比缩放和按像素缩放有什么区别?', '按百分比(如 50%)是按原图等比例缩小一半;按像素缩放则指定目标宽或高,适合店铺主图(如 800×800)、社交封面等固定尺寸需求。'],
      ['小图放大后会模糊吗?', '放大时选择高质量(双三次)插值可获得比默认更好的效果,但超过原分辨率的信息无法凭空创造,建议尽量使用原始大图。'],
      ['缩放后的图片尺寸是多少?', '工具预览区会实时显示目标尺寸(宽×高),导出时按该尺寸输出,同时可以选择 PNG、JPG、WebP 格式。'],
      ['缩放会改变画质吗?', '缩小通常几乎无感;放大看插值算法。输出 JPG/WebP 时可通过默认高质量编码保持画质。'],
    ],
  },
  {
    slug: 'nine-grid',
    name: '九宫格切图',
    icon: '▦',
    iconBg: '#faf5ff',
    iconColor: '#7c3aed',
    cardTitle: '九宫格切图',
    cardDesc: '把一张大图一键切成 3×3 九宫格,发朋友圈、小红书、Instagram 拼成完整大图,支持 2×2、4×4 网格。',
    pageTitle: '免费九宫格切图工具 — 图片一键切成9格发朋友圈 | PixTools',
    pageDesc: '免费在线九宫格切图:把一张图一键切成 3×3(或 2×2/4×4)九宫格,适合朋友圈、小红书、Instagram 发图。浏览器本地处理,图片不上传服务器,隐私安全。',
    faqs: [
      ['九宫格切图是什么意思?', '九宫格切图是把一张大图平均切成 3×3 共 9 张小图,发朋友圈或小红书时按顺序发出,主页会拼回一张完整大图,视觉冲击力更强。'],
      ['九宫格切图需要上传图片到服务器吗?', '不需要。PixTools 的九宫格切图完全在浏览器本地运行,图片不会上传到任何服务器,处理完成后可以放心删除或分享。'],
      ['朋友圈九宫格用什么尺寸的图最好?', '推荐使用 3:3 等宽高比例的大图(如 1080×1080),切成 9 张后每张正好是 1:1 方形,发朋友圈时不会被压缩变形。'],
      ['九宫格切图是免费的吗?', '完全免费,不限次数、无需注册登录、无水印,还支持 2×2 和 4×4 网格。'],
    ],
  },
  {
    slug: 'watermark',
    name: '图片加水印',
    icon: '🖋',
    iconBg: '#ecfeff',
    iconColor: '#0891b2',
    cardTitle: '图片加水印',
    cardDesc: '给电商原图、摄影作品添加文字或 Logo 水印,支持平铺防裁剪,保护原创不被搬运。',
    pageTitle: '免费图片加水印工具 — 在线批量添加文字/Logo水印 | PixTools',
    pageDesc: '免费在线图片加水印:给照片添加文字水印或 Logo 水印,支持自定义字号、颜色、透明度、位置和平铺。电商原图、摄影作品防搬运必备,浏览器本地处理不上传。',
    faqs: [
      ['图片加水印工具怎么用?', '上传图片后,输入水印文字或上传 Logo 图片,调整字号、颜色、透明度和位置,预览满意后一键下载,全程不需要注册。'],
      ['加水印的图片会上传到服务器吗?', '不会。加水印全程在你的浏览器本地完成,图片和水印都不会上传到任何服务器,适合给电商原图、摄影作品等敏感图片加水印。'],
      ['可以批量给多张图片加水印吗?', '可以。工具支持逐张处理并下载,批量场景建议把样式设置好后,依次上传每张图片再下载,效果一致。'],
      ['电商图片防搬运用什么水印效果最好?', '推荐半透明平铺水印,铺满整张图后很难被裁掉或抹除,同时不影响看图的体验。可以配合 Logo 水印一起使用。'],
    ],
  },
  {
    slug: 'filters',
    name: '在线图片滤镜',
    icon: '◐',
    iconBg: '#f0f9ff',
    iconColor: '#0284c7',
    cardTitle: '图片滤镜美化',
    cardDesc: '亮度、对比度、饱和度、灰度、模糊、复古滤镜,实时预览,一键导出。',
    pageTitle: '在线图片滤镜 — 亮度对比度调节、黑白复古效果 | PixTools',
    pageDesc: '免费在线图片滤镜工具:亮度、对比度、饱和度调节,一键黑白、复古、模糊效果,实时预览,浏览器本地处理。',
    faqs: [
      ['有哪些滤镜效果?', '支持亮度、对比度、饱和度、模糊四项手动调节,以及黑白、复古、反色、鲜艳、褪色五组一键预设,适合快速给照片调风格。'],
      ['滤镜处理会压缩画质吗?', '处理以 PNG 无损格式导出,不会二次压缩,适合需要精修后继续编辑的场景。'],
      ['可以恢复原图吗?', '可以。原图始终保留在左侧预览区,重新上传即可从头开始,调整滑块会实时重新渲染。'],
      ['适合处理什么图?', '头像、产品图、照片调色都可以,黑白和复古预设特别适合做朋友圈和社交媒体配图。'],
    ],
  },
];

export function toolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}