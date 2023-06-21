<script lang="ts" setup>
import { Anime } from "../types";
import { ref, onBeforeMount } from "vue";
import { useUserStore } from "../stores/userStore";
import { router } from "../router/routerScript";
import { useUploadURL } from "../composables/useUploadUrl";
import CommentsSection from "../components/CommentsSection.vue";
import { useAnimeService } from "../api/animeService";
import { useAssessmentService } from "../api/assessmentService";

const userStore = useUserStore();
const assessmentService = useAssessmentService();
const animeService = useAnimeService();

const initialRating = 0;
const personalRating = ref(initialRating);
const anime = ref({} as Anime);

const props = defineProps<{
    id: string
}>();

onBeforeMount(async () => {
    const animeResult = await animeService.getAnimeById(props.id);
    if (animeResult instanceof Error) {
        router.push("/404");
    } else {
        anime.value = animeResult;
    }

    const assessment = await getAssessment(anime.value.id);
    if (assessment !== initialRating) {
        personalRating.value = assessment?.personalRating!;
    } else {
        personalRating.value = assessment!;
    }
});

async function getAssessment(animeId: string) {
    const assessmentResult = await assessmentService.getByAnime(
        animeId,
        userStore.id,
    );

    if (!(assessmentResult instanceof Error)) {
        return assessmentResult === undefined
            ? initialRating
            : assessmentResult;
    }
}

async function createAssesment() {
    const result = await assessmentService.create(
        userStore.id,
        props.id,
        Number(personalRating.value),
    );

    if (result instanceof Error) {
        throw result;
    }
}

async function updateAssessment() {
    const result = await assessmentService.update(
        props.id,
        userStore.id,
        personalRating.value,
    );

    if (result instanceof Error) {
        throw result;
    }
}

async function addToList(newPersonalRating: number) {
    if (personalRating.value === initialRating) {
        personalRating.value = newPersonalRating;
        createAssesment();
    } else if (personalRating.value !== newPersonalRating) {
        personalRating.value = newPersonalRating;
        updateAssessment();
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
                <div
                    v-if="userStore.isAuthenticated"
                    class="assessment-stars"
                >
                    <div class="stars">
                        <div
                            v-for="i in [5,4,3,2,1]"
                            :key="i"
                            class="star"
                            :data-selected="personalRating === i"
                            @click="addToList(i)"
                        >
                            ⭐
                        </div>
                    </div>
                </div>
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
                            @click="createAssesment"
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
.assessment-stars {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}

.stars {
  display: flex;
  flex-direction: row-reverse;
}

.star {
  font-size: 1.5rem;
  user-select: none;
  cursor: pointer;
  opacity: 0.5;
}

.stars:not(:hover) .star[data-selected="true"] ~ .star,
.stars:not(:hover) .star[data-selected="true"] {
  opacity: 1;
}

.star:hover ~ .star,
.star:hover {
  opacity: 1;
}

</style>