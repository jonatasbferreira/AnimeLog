<script lang="ts" setup>
import AnimeCard from "../components/AnimeCard.vue";
import { useAnimeService } from "../api/animeService";
import { AnimeCollection } from "../types";
import { ref, computed, onMounted } from "vue";

const animeService = useAnimeService();
const animeSearch = ref("");
const animeCollection = ref({} as AnimeCollection);
const animes = computed(() => animeCollection.value.items);

onMounted(async () => {
    const animeResult = await animeService.getAllAnimes();
    if (animeResult instanceof Error) {
        throw animeResult;
    } else {
        animeCollection.value = animeResult;
    }
});

async function searchAnime(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const animeResult = await animeService.getAnimesByTitle(animeSearch.value);
    if (animeResult instanceof Error) {
        throw animeResult;
    } else {
        animeCollection.value = animeResult;
    }
}

</script>

<template>
    <div class="album bg-body-tertiary">
        <div class="search-form container">
            <form class="d-flex gap-2">
                <input
                    v-model="animeSearch"
                    class="form-control"
                    type="text"
                    placeholder="Anime name"
                >
                <button
                    class="btn btn-primary"
                    @click="searchAnime($event)"
                >
                    Search
                </button>
            </form>
        </div>
        <div class="container">
            <div class="row row-cols-md-2 row-cols-lg-3 g-3">
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

.search-form {
    width: 800px;
    margin-bottom: 3rem;
}

@media (max-width: 600px) {
    .search-form {
        max-width: 450px;
    }
}
</style>