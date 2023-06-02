<script lang="ts" setup>
</script>

<template>
    <div class="container d-flex justify-content-center mt-5">
        <form>
            <div class="text-center">
                <h2 class="fw-normal mb-3 pb-3">
                    Register
                </h2>
            </div>

            <div class="form-outline mb-4">
                <label
                    class="form-label"
                    for="username"
                >Username</label>
                <input
                    id="username"
                    type="text"
                    class="form-control"
                >
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
                    type="submit"
                    class="btn btn-primary mb-4"
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