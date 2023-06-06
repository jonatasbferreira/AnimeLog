<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAnimeService, AnimeCollection } from "../api/animeService";
import { useUploadURL } from "../composables/useUploadUrl";
import AnimeListItem from "./AnimeListItem.vue";

const animeService = useAnimeService();
const animeCollection = ref({} as AnimeCollection);
const animes = computed(() => animeCollection.value.items);

onMounted(async () => {
    animeCollection.value = await animeService.get();
});
</script>

<template>
    <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">
                        #
                    </th>
                    <th scope="col">
                        Image
                    </th>
                    <th scope="col">
                        Anime Title
                    </th>
                    <th scope="col">
                        Rating
                    </th>
                </tr>
            </thead>
            <tbody
                v-for="anime in animes"
                :key="anime.id"
            >
                <AnimeListItem
                    :id="anime.id"
                    :cover="`${useUploadURL(anime.cover.url)}`"
                    :title="anime.title"
                    :rating="anime.rating"
                />
            </tbody>
        </table>
    </div>
</template>

<style scoped>
</style>
