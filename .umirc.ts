import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/list", component: "list" },
  ],
  npmClient: 'cnpm',
});
