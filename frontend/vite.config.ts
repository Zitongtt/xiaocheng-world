import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react-swc"
import {defineConfig} from "vite"
import process from "process"

// 只有当运行在云端 IDE（会注入 X_IDE_SPACE_* 变量）时，才使用它的 wss 转发域名；
// 在本机直接 npm run dev 时保持 Vite 默认 HMR，浏览器才能正常热更新。
const { X_IDE_SPACE_KEY: spaceKey, X_IDE_SPACE_REGION: spaceRegion, X_IDE_SPACE_HOST: spaceHost } =
  process.env
const ideHmr =
  spaceKey && spaceRegion && spaceHost
    ? {
        hmr: {
          protocol: "wss" as const,
          host: `5173-${spaceKey}.e2b.${spaceRegion}.${spaceHost}`,
        },
      }
    : {}

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 部署：项目页需设置为 "/仓库名/"，可通过 VITE_BASE 环境变量注入
  base: process.env.VITE_BASE || "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '::',
    port: 5173,
    allowedHosts: true,
    cors: true,
    watch: {
      // Windows 下编辑器自动保存/工具写入的临时文件会让 chokidar 抛 EBUSY 并直接崩掉 dev server，这里忽略掉
      ignored: ['**/*.tmpdir/**', '**/*.tmp', '**/.~*', '**/~$*'],
    },
    ...ideHmr,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true
      },
    },
  },
})
