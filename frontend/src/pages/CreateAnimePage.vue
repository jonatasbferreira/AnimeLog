<script lang="ts" setup>
</script>

<template>
    <div class="container d-flex justify-content-center mt-5">
        <form>
            <div class="text-center">
                <h2 class="fw-normal mb-3 pb-3">
                    Create Anime
                </h2>
            </div>

            <div class="form-outline mb-4">
                <label
                    class="form-label"
                    for="title"
                >Title</label>
                <input
                    id="title"
                    type="text"
                    class="form-control"
                >
            </div>

            <div class="form-outline mb-4">
                <label
                    class="form-label"
                    for="description"
                >Description</label>
                <textarea
                    id="description"
                    name="description"
                    class="form-control"
                    rows="3"
                />
            </div>

            <div class="row gap-3">
                <div class="col-3 form-outline mb-4">
                    <label
                        class="form-label"
                        for="password"
                    >Rating</label>
                    <input
                        id="password"
                        type="number"
                        class="form-control"
                    >
                </div>

                <div class="col form-outline mb-4">
                    <label
                        class="form-label"
                        for="cover"
                    >Cover</label>
                    <input
                        id="cover"
                        type="file"
                        class="form-control"
                    >
                </div>
            </div>

            <div class="d-grid gap-2">
                <button
                    type="submit"
                    class="btn btn-primary mb-4"
                >
                    Add
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
    form {
        width: 450px;
    }
</style>