import {
    RouteLocationNormalized,
    RouteRecordRaw,
    createRouter,
    createWebHistory,
} from "vue-router";

import AnimeDetailPage from "../pages/AnimeDetailPage.vue";
import AnimeFormPage from "../pages/AnimeFormPage.vue";
import AdminPage from "../pages/AdminPage.vue";
import CommunityPage from "../pages/CommunityPage.vue";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import UserPage from "../pages/UserPage.vue";

import { useUserStore } from "../stores/userStore";

const routes: RouteRecordRaw[] = [
    { path: "/404", component: NotFoundPage },
    { path: "/", alias:"/home", component: HomePage },
    { path: "/animes/:id", component: AnimeDetailPage, props: true },
    { path: "/login", component: LoginPage },
    { path: "/register", component: RegisterPage },
    { path: "/admin", component: AdminPage, meta: { requiresAdmin: true } },
    {
        path: "/community",
        component: CommunityPage,
        meta: { requiresAuth: true },
    },
    {
        path: "/admin/create",
        component: AnimeFormPage,
        meta: { requiresAdmin: true },
    },
    {
        path: "/admin/:id/update",
        component: AnimeFormPage,
        meta: { requiresAdmin: true }, props: true,
    },
    {
        path: "/users/:id",
        component: UserPage,
        props: true,
        meta: { requiresAuth: true },
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundPage },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

router.beforeEach((to: RouteLocationNormalized) => {
    const userStore = useUserStore();

    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
        return { path: "/login" };
    }

    if (to.meta.requiresAdmin && !userStore.isAdmin) {
        return { path: "/login" };
    }
});

export { router };