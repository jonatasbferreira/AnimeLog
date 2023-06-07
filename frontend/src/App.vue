<script setup lang="ts">
import NavBar from "../src/components/NavBar.vue";
import { useUserStore } from "./stores/userStore";

const userStore = useUserStore();
</script>

<template>
    <div>
        <NavBar />
        <router-view />
    </div>
</template>

<style scoped>
</style>