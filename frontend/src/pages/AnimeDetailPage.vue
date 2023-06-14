<script lang="ts" setup>
import CommentsSection from "../components/CommentsSection.vue";
import { useAnimeService } from "../api/animeService";
import { Anime } from "../types";
import { ref, onBeforeMount } from "vue";
import { useUploadURL } from "../composables/useUploadUrl";
import { useUserStore } from "../stores/userStore";
import { router } from "../router/routerScript";

const userStore = useUserStore();

const animeService = useAnimeService();
const anime = ref({} as Anime);

const props = defineProps<{
    id: string
}>();

onBeforeMount(async () => {
    const result = await animeService.getAnimeById(props.id);
    if (result instanceof Error) {
        router.push("/404");
    } else {
        anime.value = result;
    }
});
</script>

<template>
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
                <h1 class="me-3">
                    {{ anime.title }}
                </h1>
                <p class="text-muted">
                    Rating: {{ anime.rating }}
                </p>
                <p class="anime-description">
                    {{ anime.description }}
                </p>
                <button
                    v-if="userStore.isAuthenticated"
                    class="btn btn-primary"
                >
                    + Add to list
                </button>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <CommentsSection :comments="anime.comments" />
            </div>
        </div>
    </div>
</template>

<style scoped>
img {
    height: 100%;
}

.anime-description {
    font-size: 15px;
    text-align: justify;
}
</style>