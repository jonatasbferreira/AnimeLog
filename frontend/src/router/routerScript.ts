// eslint-disable-next-line max-len
import { RouteLocationNormalized, RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/userStore";
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
    { path: "/admin", component: AdminPage, meta: { permissions: ["admin"] } },
    // eslint-disable-next-line max-len
    { path: "/admin/createanime", component: CreateAnimePage, meta: { permissions: ["admin"] } },
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