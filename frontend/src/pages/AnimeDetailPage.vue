<script lang="ts" setup>
import { Anime, useAnimeService } from "../api/animeService";
import { ref, onBeforeMount } from "vue";
import { useUploadURL } from "../composables/useUploadUrl";

const animeService = useAnimeService();
const anime = ref({} as Anime);

const props = defineProps<{
    id: string
}>();

onBeforeMount(async () => {
    anime.value = await animeService.getAnimeById(props.id);
});
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <img
                    :src="useUploadURL(anime.cover.url)"
                    class="card-img-top col-3"
                    alt="anime cover"
                >
            </div>
            <div class="col-md-9 col-lg-8">
                <div class="d-flex align-items-center">
                    <h1 class="me-3">
                        {{ anime.title }}
                    </h1>
                    <button class="btn btn-primary">
                        + Add to list
                    </button>
                </div>
                <p class="text-muted">
                    Nota: {{ anime.rating }}
                </p>
                <p class="anime-description">
                    {{ anime.description }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
img {
    width: 250px;
}

.anime-description {
    font-size: 15px;
    text-align: justify;
}
</style>