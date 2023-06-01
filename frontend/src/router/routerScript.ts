import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import AnimeDetail from "../pages/AnimeDetail.vue";

const routes: RouteRecordRaw[] = [
    { path: "/", alias:"/home", component: HomePage },
    { path: "/animes/:id", component: AnimeDetail, props: true },
    { path: "/login", component: LoginPage },
    { path: "/register", component: RegisterPage },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundPage },
];

export const router = createRouter({
    routes,
    history: createWebHistory(),
});