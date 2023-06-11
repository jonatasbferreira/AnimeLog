/* eslint-disable max-len */
import { RouteLocationNormalized, RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/userStore";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import AnimeDetailPage from "../pages/AnimeDetailPage.vue";
import AdminPage from "../pages/AdminPage.vue";
import AnimeFormPage from "../pages/AnimeFormPage.vue";

const routes: RouteRecordRaw[] = [
    { path: "/", alias:"/home", component: HomePage },
    { path: "/animes/:id", component: AnimeDetailPage, props: true },
    { path: "/login", component: LoginPage },
    { path: "/register", component: RegisterPage },
    { path: "/admin", component: AdminPage, meta: { permissions: ["admin"] } },
    { path: "/admin/create", component: AnimeFormPage, meta: { permissions: ["admin"] } },
    { path: "/admin/:id/update", component: AnimeFormPage, meta: { permissions: ["admin"] }, props: true },
    { path: "/404", component: NotFoundPage },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundPage },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

router.beforeEach((to: RouteLocationNormalized) => {
    const userStore = useUserStore();

    if (to.meta.permissions) {
        if (!userStore.isAuthenticated) {
            return { path: "/login" };
        } else {
            if(!userStore.isAdmin) {
                return { path: "/" }.path;
            }
        }
    }
});

export { router };