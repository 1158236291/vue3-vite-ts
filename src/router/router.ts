import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/pages/login/Login.vue"), // 注意这里要带上 文件后缀.vue
  },
];
// const routerMap: RouteRecordRaw[] = [
//     {
//         path: "/app",
//         name: "index",
//         component: BasicLayout,
//         redirect: "/app/home",
//         meta: { title: "首页" },
//         children: [
//             {
//                 path: "/app/home",
//                 component: () => import("/@/views/home/index.vue"),
//                 name: "home",
//                 meta: {
//                     title: "首页",
//                     icon: "liulanqi",
//                     auth: ["home"],
//                 },
//             },
//             {
//                 path: "/app/others",
//                 name: "others",
//                 component: BlankLayout,
//                 redirect: "/app/others/about",
//                 meta: {
//                     title: "其他菜单",
//                     icon: "xitongrizhi",
//                     auth: ["others"],
//                 },
//                 children: [
//                     {
//                         path: "/app/others/about",
//                         name: "about",
//                         component: () =>
//                             import("/@/views/others/about/index.vue"),
//                         meta: {
//                             title: "关于",
//                             keepAlive: true,
//                             hiddenWrap: true,
//                         },
//                     },
//                     {
//                         path: "/app/others/antdv",
//                         name: "antdv",
//                         component: () =>
//                             import("/@/views/others/antdv/index.vue"),
//                         meta: {
//                             title: "组件",
//                             keepAlive: true,
//                             breadcrumb: true,
//                         },
//                     },
//                 ],
//             },
//         ],
//     },
// ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
