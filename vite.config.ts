import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: "src/main.ts",
      userscript: {
        icon: "https://vitejs.dev/logo.svg",
        namespace: "npm/vite-plugin-monkey",
        match: ["https://dds.lanhuapp.com/"],
        license: "MIT",
        description:
          "油猴插件，旨在在蓝湖设计稿页面中拦截用户复制的代码，并将其重新组装成适用于 CSS Module 格式。借助该插件，您可以将蓝湖设计稿中的样式代码转换为更适用于前端项目的模块化样式，从而加速样式的应用过程",
      },
    }),
  ],
});
