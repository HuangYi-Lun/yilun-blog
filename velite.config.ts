 import { defineCollection, defineConfig, s } from 'velite'

// 定義文章集合
const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.{md,mdx}',
  schema: s
    .object({
      slug: s.path(),                           // 自動生成路徑
      title: s.string().max(99),               // 文章標題
      description: s.string().max(999).optional(), // 文章描述
      date: s.isodate(),                       // 發布日期
      published: s.boolean().default(true),    // 是否發布
      tags: s.array(s.string()).default([]),   // 標籤陣列
      category: s.string().optional(),         // 分類（可選）
      cover: s.string().optional(),            // 封面圖片（可選）
      body: s.mdx(),                          // MDX 內容
    })
    .transform(data => ({ 
      ...data, 
      permalink: `/blog/${data.slug}`,         // 生成固定連結
      readingTime: Math.ceil(data.body.length / 1000) // 估算閱讀時間（分鐘）
    }))
})

// 定義頁面集合（可選）
const pages = defineCollection({
  name: 'Page',
  pattern: 'pages/**/*.{md,mdx}',
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      body: s.mdx(),
    })
    .transform(data => ({ 
      ...data, 
      permalink: `/${data.slug}` 
    }))
})

export default defineConfig({
  root: 'content',                    // 內容根目錄
  output: {
    data: '.velite',                  // 輸出資料目錄
    assets: 'public/static',          // 靜態資源目錄
    base: '/static/',                 // 靜態資源基礎路徑
    name: '[name]-[hash:6].[ext]',    // 檔案命名格式
    clean: true                       // 清理輸出目錄
  },
  collections: { posts, pages },     // 註冊集合
  mdx: {
    rehypePlugins: [],                // MDX 處理插件
    remarkPlugins: []
  }
})

