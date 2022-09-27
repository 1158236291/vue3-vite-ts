import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [AntDesignVueResolver({ resolveIcons: true })],
        }),
        // gzip压缩 生产环境生成 .gz 文件
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: "gzip",
            ext: ".gz",
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                additionalData: '@import "@/assets/style/index.less";',
            },
        },
    },
    // 本地反向代理解决浏览器跨域限制
    server: {
        host: "localhost",
        port: 3000,
        open: true,
        https: false,
        proxy: {
            "/api": {
                target: "http://localhost:9999",
                changeOrigin: true,
                rewrite: (path) => path.replace("/api", ""),
            },
        },
    },
    build: {
        //生产环境去除 console debugger
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
});
