<script lang="ts" setup>
import NavBar from "../components/NavBar.vue";
import AnimeCard from "../components/AnimeCard.vue";
import { useAnimeService, AnimeCollection } from "../api/animeService";
import { ref, computed, onMounted } from "vue";

const animeService = useAnimeService();
const animeCollection = ref({} as AnimeCollection);
const animes = computed(() => animeCollection.value.items);

onMounted(async () => {
    animeCollection.value = await animeService.get();
});

</script>

<template>
    <div>
        <NavBar />
        <div class="album py-5 bg-body-tertiary">
            <div class="container">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <AnimeCard
                        v-for="anime in animes"
                        :id="anime.id"
                        :key="anime.id"
                        :title="anime.title"
                        :cover="anime.cover"
                        :rating="anime.rating"
                        :description="anime.description"
                    />
                </div>
            </div>
        </div>
    </div>

    <!-- <div class="album py-5 bg-body-tertiary">
        <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <AnimeCard v-for="index in 10" :key="index" class="col" />
                </div>
            </div>
        </div>
    </div> -->
</template>

<style scoped>
    a {
        text-decoration: none;
    }
</style>