<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAnimeService, AnimeCollection } from "../api/animeService";
import AnimeItem from "./AnimeItem.vue";

const animeService = useAnimeService();
const animeCollection = ref({} as AnimeCollection);
const animes = computed(() => animeCollection.value.items);

onMounted(async () => {
    animeCollection.value = await animeService.get();
    console.log(animeCollection);
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
                        Score
                    </th>
                </tr>
            </thead>
            <tbody v-for="anime in animes">
                <AnimeItem
                    :number="Number(1)"
                    cover="#"
                    :title="anime.title"
                    :score="Number(10)"
                />
            </tbody>
        </table>
    </div>
</template>

<style scoped>
</style>
