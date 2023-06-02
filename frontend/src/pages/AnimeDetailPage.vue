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
        <img
            :src="useUploadURL(anime.cover.url)"
            class="card-img-top"
            alt="anime cover"
        >
        <p>{{ anime.title }}</p>
        <p>{{ anime.rating }}</p>
        <p>{{ anime.description }}</p>
    </div>
</template>

<style scoped>
    img {
        width: 250px;
    }
</style>