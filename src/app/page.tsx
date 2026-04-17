import { posts } from '#site/content'
import Link from 'next/link'

export default function Home() {
  // 取得最新的已發布文章
  const latestPosts = posts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5) // 顯示最新 5 篇

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* 頭部區域 */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            歡迎來到怡綸的部落格
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            分享 Next.js、Velite 和前端開發的學習心得
          </p>
        </header>

        {/* 最新文章區域 */}
        <main>
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">最新文章</h2>
              <Link 
                href="/blog"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                查看全部 →
              </Link>
            </div>

            {/* 文章列表 */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <article 
                  key={post.slug} 
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
                >
                  <header className="mb-4">
                    <Link href={post.permalink}>
                      <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                    <div className="text-sm text-gray-500 mt-2">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('zh-TW', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <span className="mx-2">•</span>
                      <span>約 {post.readingTime} 分鐘閱讀</span>
                    </div>
                  </header>

                  {post.description && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.description}
                    </p>
                  )}

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link 
                    href={post.permalink}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    閱讀更多 →
                  </Link>
                </article>
              ))}
            </div>

            {/* 如果沒有文章 */}
            {latestPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">還沒有文章，敬請期待！</p>
                <Link 
                  href="/test-content"
                  className="text-blue-600 hover:text-blue-800"
                >
                  查看內容測試頁面
                </Link>
              </div>
            )}
          </section>

          {/* 關於區域 */}
          <section className="text-center bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">關於本站</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              這是一個使用 Next.js 15、Velite 和 Tailwind CSS 建立的現代化部落格。
              我會在這裡分享技術學習心得、專案經驗和開發筆記。
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/blog"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                瀏覽文章
              </Link>
              <Link 
                href="/about"
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                了解更多
              </Link>
            </div>
          </section>
        </main>

        {/* 頁尾 */}
        <footer className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500">
            © 2025 我的部落格. 使用 Next.js + Velite 建立
          </p>
        </footer>
      </div>
    </div>
  )
}
