<script lang="ts" setup>
import { router } from "../router/routerScript";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();

function logout() {
    userStore.logout();
    localStorage.clear();
    router.push("/login");
}
</script>

<template>
    <nav class="navbar navbar-dark bg-primary navbar-expand-sm  mb-5">
        <div class="container-fluid">
            <a
                class="navbar-brand"
                href="#"
            >
                AnimeLog
            </a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarText"
                aria-controls="navbarText"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon" />
            </button>
            <div
                id="navbarText"
                class="collapse navbar-collapse"
            >
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li
                        class="nav-item"
                    >
                        <router-link
                            class="nav-link"
                            to="/"
                        >
                            Home
                        </router-link>
                    </li>
                    <li
                        class="nav-item"
                    >
                        <router-link
                            class="nav-link"
                            to="/about"
                        >
                            About
                        </router-link>
                    </li>
                    <li
                        v-if="userStore.isAdmin"
                        class="nav-item"
                    >
                        <router-link
                            class="nav-link"
                            to="/admin"
                        >
                            Admin's Page
                        </router-link>
                    </li>
                </ul>
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li
                        v-if="!userStore.isAuthenticated"
                        class="nav-link"
                    >
                        <router-link
                            class="nav-link"
                            to="/login"
                        >
                            Login
                        </router-link>
                    </li>
                    <li
                        v-if="!userStore.isAuthenticated"
                        class="nav-link"
                    >
                        <router-link
                            class="nav-link"
                            to="/register"
                        >
                            Register
                        </router-link>
                    </li>
                    <li
                        v-if="userStore.isAuthenticated"
                        class="nav-item"
                    >
                        <router-link
                            class="nav-link"
                            to="#"
                        >
                            {{ userStore.username }}
                        </router-link>
                    </li>
                    <li
                        v-if="userStore.isAuthenticated"
                        class="nav-item"
                    >
                        <a
                            class="nav-link"
                            @click="logout"
                        >
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
    a, router-link {
        color: white;
        cursor: pointer;
    }

    .navbar-toggler-icon {
        color: white;
    }
</style>
