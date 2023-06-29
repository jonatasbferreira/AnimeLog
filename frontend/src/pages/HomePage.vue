<script lang="ts" setup>
import AnimeCard from "../components/AnimeCard.vue";
import { useAnimeService } from "../api/animeService";
import { AnimeCollection } from "../types";
import { ref, computed, onBeforeMount } from "vue";
import {
    useRoute,
    onBeforeRouteUpdate,
    RouteLocationNormalized,
} from "vue-router";

const animeService = useAnimeService();

const animeSearch = ref("");
const animeCollection = ref({} as AnimeCollection);

const animes = computed(() => animeCollection.value.items);
const pagination = computed(() => animeCollection.value.pagination);

const firstPage = 1;
const route = useRoute();
const currentPage = route.query.page ? Number(route.query.page) : firstPage;

onBeforeRouteUpdate(async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
) => {
    if (to.query.page && to.query.page !== from.query.page) {
        const page = Number(to.query.page);
        const result = await animeService.getAllAnimes(page);
        if (result instanceof Error) {
            throw result;
        } else {
            animeCollection.value = result;
        }
    }
});

onBeforeMount(async () => {
    const animeResult = await animeService.getAllAnimes(currentPage);
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
            <div class="row">
                <nav aria-label="Page navigation">
                    <ul class="pagination justify-content-center">
                        <li class="page-item">
                            <router-link
                                :to="{
                                    path: $route.path,
                                    query: { page: pagination.page - 1 }
                                }"
                                class="page-link"
                                aria-label="Previous"
                                :class="{ disabled: pagination.page == 1 }"
                            >
                                <span aria-hidden="true">&laquo;</span>
                            </router-link>
                        </li>
                        <li
                            v-for="pageNumber in pagination.pageCount"
                            :key="pageNumber"
                            class="page-item"
                        >
                            <router-link
                                :to="{
                                    path: $route.path,
                                    query: { page: pageNumber }
                                }"
                                :class="{
                                    active: pagination.page == pageNumber
                                }"
                                class="page-link"
                            >
                                {{ pageNumber }}
                            </router-link>
                        </li>

                        <li class="page-item">
                            <router-link
                                class="page-link"
                                aria-label="Next"
                                :class="{
                                    disabled:
                                        pagination.page == pagination.pageCount
                                }"
                                :to="{
                                    path: $route.path,
                                    query: { page: pagination.page + 1 }
                                }"
                            >
                                <span aria-hidden="true">&raquo;</span>
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </div>

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