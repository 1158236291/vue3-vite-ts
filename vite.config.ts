import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

const vendorLibs: { match: string[]; output: string }[] = [
  {
    match: ["ant-design-vue"],
    output: "antdv",
  },
  // {
  //     match: ["echarts"],
  //     output: "echarts",
  // },
];

const configManualChunk = (id: string) => {
  if (/[\\/]node_modules[\\/]/.test(id)) {
    const matchItem = vendorLibs.find((item) => {
      const reg = new RegExp(
        `[\\/]node_modules[\\/]_?(${item.match.join("|")})(.*)`,
        "ig"
      );
      return reg.test(id);
    });
    return matchItem ? matchItem.output : null;
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: "less",
          resolveIcons: true,
        }),
      ],
    }),
    //打包体积可视化分析
    visualizer({
      open: true, //注意这里要设置为true，否则无效
      gzipSize: true,
      brotliSize: true,
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
    //Chunk 拆包
    rollupOptions: {
      output: {
        manualChunks: configManualChunk,
      },
    },
  },
});
