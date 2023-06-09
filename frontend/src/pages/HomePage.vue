<script lang="ts" setup>
import AnimeCard from "../components/AnimeCard.vue";
import { useAnimeService } from "../api/animeService";
import { AnimeCollection } from "../types";
import { ref, computed, onMounted } from "vue";
import { router } from "../router/routerScript";

const animeService = useAnimeService();
const animeCollection = ref({} as AnimeCollection);
const animes = computed(() => animeCollection.value.items);

onMounted(async () => {
    const result = await animeService.get();
    if (result instanceof Error) {
        router.push("/404");
    } else {
        animeCollection.value = result;
    }
});

</script>

<template>
    <div class="album py-5 bg-body-tertiary">
        <div class="container d-flex justify-content-center">
            <div class="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
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
</template>

<style scoped>
    a {
        text-decoration: none;
    }
</style>