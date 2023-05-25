import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";

const routes: RouteRecordRaw[] = [{ path: "/", component: HomePage }];

export const router = createRouter({
    routes,
    history: createWebHistory(),
});