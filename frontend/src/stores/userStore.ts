import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
    const jwt = ref("");
    const username = ref("");
    const role = ref("");

    const isAdmin = computed(() => {
        return role.value === "admin";
    });

    const isAuthenticated = computed(() => {
        return jwt.value ? true : false;
    });

    function logout() {
        jwt.value = "";
        username.value = "";
        role.value = "";
    }

    return { jwt, username, role, isAdmin, isAuthenticated, logout };
});