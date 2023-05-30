<script lang="ts" setup>
import { Anime } from "../api/animeService";
import { useUploadURL } from "../composables/useUploadUrl";

const anime = defineProps<Anime>();

function sliceAnimeDescription (description: string) {
    const minLenght = 0;
    const maxLenght = 100;
    return description.slice(minLenght, maxLenght)+"...";
}
</script>

<template>
    <div
        class="card shadow-sm"
        style="width: 18rem;"
    >
        <figure>
            <img
                :src="useUploadURL(anime.cover.url)"
                class="card-img-top"
                alt="..."
            >
        </figure>
        <div class="card-body">
            <h5 class="card-title">
                {{ anime.title }}
            </h5>
            <p
                class="card-text"
            >
                {{ anime.rating }}
            </p>
            <p
                class="card-text"
            >
                {{ sliceAnimeDescription(anime.description) }}
            </p>
            <a
                href="#"
                class="btn btn-primary"
            >
                Go somewhere
            </a>
        </div>
    </div>
</template>