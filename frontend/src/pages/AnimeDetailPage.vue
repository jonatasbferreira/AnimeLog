<script lang="ts" setup>
import { Anime, useAnimeService } from "../api/animeService";
import { ref, onBeforeMount } from "vue";
import { useUploadURL } from "../composables/useUploadUrl";
import NavBar from "../components/NavBar.vue";

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
    <div>
        <NavBar />
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
                    <h1>{{ anime.title }}</h1>
                    <p class="text-muted">
                        Nota: {{ anime.rating }}
                    </p>
                    <p class="anime-description">
                        {{ anime.description }}
                    </p>
                </div>
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
}
</style>