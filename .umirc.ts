import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/list", component: "list" },
  ],
  npmClient: "cnpm",
  base: "/mi_diy/",
  publicPath: "/mi_diy/",
});
