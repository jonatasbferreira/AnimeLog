<script lang="ts" setup>
import { ref } from "vue";
import { router } from "../router/routerScript";
import { useUserService } from "../api/userService";

const username = ref("");
const email = ref("");
const password = ref("");
const message = ref("");

async function register(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    const userService = useUserService();
    const result = await userService.register(
        username.value,
        email.value,
        password.value);

    if (result instanceof Error) {
        message.value = result.message;
    } else {
        router.push("/login");
    }
}
</script>

<template>
    <div class="container d-flex justify-content-center mt-5">
        <form>
            <div class="text-center">
                <h2 class="fw-normal mb-3 pb-3">
                    Register
                </h2>
            </div>

            <div
                v-if="message"
                class="alert alert-danger"
                role="alert"
            >
                {{ message }}
            </div>

            <div class="form-outline mb-4">
                <label
                    class="form-label"
                    for="username"
                >
                    Username
                </label>
                <input
                    id="username"
                    v-model="username"
                    type="text"
                    class="form-control"
                >
            </div>

            <div class="form-outline mb-4">
                <label
                    class="form-label"
                    for="email"
                >
                    Email address
                </label>
                <input
                    id="email"
                    v-model="email"
                    type="email"
                    class="form-control"
                >
            </div>

            <div class="form-outline mb-4">
                <label
                    class="form-label"
                    for="password"
                >
                    Password
                </label>
                <input
                    id="password"
                    v-model="password"
                    type="password"
                    class="form-control"
                >
            </div>

            <div class="d-grid gap-2">
                <button
                    type="submit"
                    class="btn btn-primary mb-4"
                    @click="register"
                >
                    Register
                </button>
            </div>

            <div class="text-center">
                <router-link to="/login">
                    Already a member?
                </router-link>
            </div>
        </form>
    </div>
</template>

<style scoped>
form {
    width: 450px;
}
</style>