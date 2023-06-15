import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
    const jwt = ref(localStorage.token ?? "");
    const username = ref(localStorage.username ?? "");
    const role = ref(localStorage.role ?? "");
    const id = ref(localStorage.id ?? "");

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

    return { jwt, username, role, id, isAdmin, isAuthenticated, logout };
});