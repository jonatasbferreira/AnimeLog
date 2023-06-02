import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import AnimeDetailPage from "../pages/AnimeDetailPage.vue";
import AdminPage from "../pages/AdminPage.vue";
import CreateAnimePage from "../pages/CreateAnimePage.vue";

const routes: RouteRecordRaw[] = [
    { path: "/", alias:"/home", component: HomePage },
    { path: "/animes/:id", component: AnimeDetailPage, props: true },
    { path: "/login", component: LoginPage },
    { path: "/register", component: RegisterPage },
    { path: "/admin", component: AdminPage },
    { path: "/admin/createanime", component: CreateAnimePage },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundPage },
];

export const router = createRouter({
    routes,
    history: createWebHistory(),
});