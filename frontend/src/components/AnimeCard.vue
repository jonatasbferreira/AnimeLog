<script lang="ts" setup>
import { Anime } from "../types";
import { useUploadURL } from "../composables/useUploadUrl";

const anime = defineProps<Omit<Anime, "comments">>();

function sliceAnimeDescription (description: string) {
    const minLenght = 0;
    const maxLenght = 100;
    return description.slice(minLenght, maxLenght)+"...";
}
</script>

<template>
    <router-link :to="`/animes/${anime.id}`">
        <div
            class="card shadow-sm"
            style="width: 18rem; height: 42rem;"
        >
            <figure>
                <img
                    :src="useUploadURL(anime.cover.url)"
                    class="card-img-top"
                    :alt="`${anime.title} cover image`"
                >
            </figure>
            <div class="card-body">
                <h5 class="card-title">
                    {{ anime.title }}
                </h5>
                <hr>
                <p
                    class="card-text"
                >
                    Rating: {{ anime.rating }}
                </p>
                <p
                    class="card-text"
                >
                    {{ sliceAnimeDescription(anime.description) }}
                </p>
            </div>
        </div>
    </router-link>
</template>

<style scoped>
img {
    width: 100%;
    height: 400px;
}

a {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>