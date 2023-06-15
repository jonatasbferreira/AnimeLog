<script lang="ts" setup>
import CommentsSection from "../components/CommentsSection.vue";
import { useAnimeService } from "../api/animeService";
import { Anime } from "../types";
import { ref, onBeforeMount } from "vue";
import { useUploadURL } from "../composables/useUploadUrl";
import { useUserStore } from "../stores/userStore";
import { router } from "../router/routerScript";
import { useAssessmentService } from "../api/assessmentService";

const userStore = useUserStore();
const assessmentService = useAssessmentService();
const animeService = useAnimeService();

const personalRating = ref("");
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

async function addToList(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const result = await assessmentService.create(
        userStore.id,
        props.id,
        Number(personalRating.value),
    );

    if (result instanceof Error) {
        throw result as Error;
    } else {
        router.push(`/users/${userStore.id}`);
    }
}
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
                    data-bs-toggle="modal"
                    data-bs-target="#confirmationModal"
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

        <div
            id="confirmationModal"
            class="modal fade"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5
                            id="exampleModalLabel"
                            class="modal-title"
                        >
                            Add {{ anime.title }} to your list
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div class="modal-body">
                        <form>
                            <input
                                id="rating"
                                v-model="personalRating"
                                type="number"
                                class="form-control"
                                placeholder="Input your personal rating"
                            >
                            <div class="invalid-feedback">
                                Please provide a valid rating.
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer justify-content-start">
                        <button
                            type="button"
                            class="btn btn-danger"
                            data-bs-dismiss="modal"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                            @click="addToList"
                        >
                            Add
                        </button>
                    </div>
                </div>
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