<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { router } from "../router/routerScript";
import { Anime } from "../types";
import { useAnimeService } from "../api/animeService";
import { useUploadURL } from "../composables/useUploadUrl";

const props = defineProps<{
    id?: string,
}>();

const message = ref("");

const animeService = useAnimeService();
const anime = ref({} as Anime);
const cover = ref<File>();

onMounted(async () => {
    if (props.id) {
        const result = await animeService.getAnimeById(props.id);
        if (!(result instanceof Error)) {
            anime.value = result;
        } else {
            router.push("/404");
        }
    }
});

async function create(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const { title, description, rating } = anime.value;
    const minRating = 0;
    const maxRating = 10;

    if (title === undefined) {
        message.value = "Anime Title Is Necessary";
    } else if (description === undefined) {
        message.value = "Anime Description Is Necessary";
    } else if (rating === undefined) {
        message.value = "Anime Rating is Necessary";
    } else if (rating <= minRating || rating > maxRating) {
        message.value = "Anime Rating Must Be a Value Greater "
                        + "Than Zero And Less Than or Equal to Ten";
    } else if (!cover.value?.name) {
        message.value = "Anime Cover is Necessary!!";
    } else {
        const result = await animeService.create({
            title,
            rating,
            description,
            cover: cover.value,
        });

        if (result instanceof Error) {
            message.value = result.message;
        } else {
            router.push("/admin");
        }
    }
}

async function update(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const { id, title, description, rating } = anime.value;
    const minRating = 0;
    const maxRating = 10;

    if (!anime.value.cover.url) {
        message.value = "Anime Cover Is Necessary";
    } else if (title === "") {
        message.value = "Anime Title Is Necessary";
    } else if (description === "") {
        message.value = "Anime Description Is Necessary";
    } else if (rating <= minRating || rating > maxRating) {
        message.value = "Anime Rating Must Be a Value Greater "
                        + "Than Zero And Less Than or Equal to Ten";
    } else {
        const result = await animeService.update({
            id,
            title,
            rating,
            description,
            cover: cover.value,
        });

        if (result instanceof Error) {
            message.value = result.message;
        } else {
            router.push(`/animes/${props.id}`);
        }
    }
}

function handleFileUpload(event: Event) {
    const firstFile = 0;
    const inputEvent = event as InputEvent;
    const target = inputEvent.target as HTMLInputElement;
    cover.value = target.files?.item(firstFile) as File;
}
</script>

<template>
    <div class="container d-flex justify-content-center mt-5">
        <form>
            <div class="text-center">
                <h2 class="fw-normal mb-3 pb-3">
                    {{ props.id ? "Update Anime" : "Create Anime" }}
                </h2>
            </div>

            <div
                v-if="message"
                class="alert alert-danger"
                role="alert"
            >
                {{ message }}
            </div>

            <div
                v-if="anime.cover"
                class="container d-flex justify-content-center"
            >
                <img
                    :src="`${useUploadURL(anime.cover.url)}`"
                    :alt="`${anime.title} cover image`"
                    class="mb-3"
                >
            </div>

            <div class="form-outline mb-4">
                <label
                    class="form-label"
                    for="title"
                >
                    Title
                </label>
                <input
                    id="title"
                    v-model="anime.title"
                    type="text"
                    class="form-control"
                    required
                >
            </div>

            <div class="form-outline mb-4">
                <label
                    class="form-label"
                    for="description"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    v-model="anime.description"
                    name="description"
                    class="form-control"
                    rows="10"
                    required
                />
            </div>

            <div class="row gap-3">
                <div class="col-3 form-outline mb-4">
                    <label
                        class="form-label"
                        for="rating"
                    >
                        Rating
                    </label>
                    <input
                        id="rating"
                        v-model="anime.rating"
                        type="number"
                        class="form-control"
                        required
                    >
                </div>

                <div class="col form-outline mb-4">
                    <label
                        class="form-label"
                        for="cover"
                    >
                        Cover
                    </label>
                    <input
                        id="cover"
                        type="file"
                        class="form-control"
                        accept="image/*"
                        @change="handleFileUpload"
                    >
                </div>
            </div>

            <div class="d-grid gap-2">
                <button
                    v-if="props.id"
                    type="submit"
                    class="btn btn-primary mb-4"
                    @click="update"
                >
                    Update
                </button>
                <button
                    v-else
                    type="submit"
                    class="btn btn-primary mb-4"
                    @click="create"
                >
                    Create
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