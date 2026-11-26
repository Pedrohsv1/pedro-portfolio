import fs from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function resolveSiteUrl(): string {
  const raw =
    process.env.VITE_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    process.env.URL ||
    ''

  const trimmed = raw.trim().replace(/\/+$/, '')
  if (!trimmed) return ''
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

function portfolioSeoPlugin(): Plugin {
  const siteUrl = resolveSiteUrl()

  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      let result = html.replace(/%SITE_URL%/g, siteUrl)

      // In local dev without a configured domain, remove absolute-only canonical/og:url/secure_url tags cleanly
      if (!siteUrl) {
        result = result
          .replace(/^\s*<link rel="canonical"[^>]*>\r?\n/gm, '')
          .replace(/^\s*<meta property="og:url"[^>]*>\r?\n/gm, '')
          .replace(/^\s*<meta property="og:image:secure_url"[^>]*>\r?\n/gm, '')
      }

      return result
    },
    writeBundle(options) {
      if (!siteUrl || !options.dir) return
      const projectsPath = path.resolve(import.meta.dirname, './src/content/projects.json')
      const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8')) as Array<{ id: string }>
      const urls = ['/', ...projects.map((p) => `/projetos/${p.id}`)]
      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls.map((u) => `  <url><loc>${siteUrl}${u}</loc></url>`),
        '</urlset>',
        '',
      ].join('\n')

      fs.writeFileSync(path.join(options.dir, 'sitemap.xml'), sitemap, 'utf-8')
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), portfolioSeoPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
