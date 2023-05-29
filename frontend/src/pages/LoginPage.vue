<script lang="ts" setup>
import NavBar from "../components/NavBar.vue";
</script>

<template>
    <div>
        <NavBar />
        <div class="container d-flex justify-content-center mt-5">
            <form>
                <div class="text-center">
                    <h2 class="fw-normal mb-3 pb-3">
                        Login
                    </h2>
                </div>

                <div class="form-outline mb-4">
                    <label
                        class="form-label"
                        for="email"
                    >Email address</label>
                    <input
                        id="email"
                        type="email"
                        class="form-control"
                    >
                </div>

                <div class="form-outline mb-4">
                    <label
                        class="form-label"
                        for="password"
                    >Password</label>
                    <input
                        id="password"
                        type="password"
                        class="form-control"
                    >
                </div>

                <div class="d-grid gap-2">
                    <button
                        type="button"
                        class="btn btn-primary mb-4"
                    >
                        Sign in
                    </button>
                </div>

                <div class="text-center">
                    <router-link to="/register">
                        Not a member?
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
    form {
        width: 450px;
    }

    .btn {
        padding: 5px 30px;
    }
</style>