<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { router } from "../router/routerScript";
import { Anime } from "../types";
import { useUserStore } from "../stores/userStore";
import { useAnimeService } from "../api/animeService";
import { useAssessmentService } from "../api/assessmentService";
import CommentsSection from "../components/CommentsSection.vue";
import { useUploadURL } from "../composables/useUploadUrl";

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
        <div class="row anime-main">
            <div class="anime-cover">
                <img
                    :src="useUploadURL(anime.cover.url)"
                    class="card-img-top"
                    alt="anime cover"
                >
            </div>
            <div class="anime-content">
                <div class="anime-heading">
                    <h1 class="anime-title">
                        {{ anime.title }}
                    </h1>
                    <div class="rating-container">
                        <p class="rating text-muted">
                            Rating: {{ anime.rating }}
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

                <div class="anime-body">
                    <p class="anime-description">
                        {{ anime.description }}
                    </p>
                </div>
            </div>
        </div>

        <div class="row">
            <CommentsSection
                :anime="anime"
            />
        </div>
    </div>
</template>

<style scoped>
@media (min-width: 1000px) {
    .anime-main {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(5, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        height: 700px;
    }

    .anime-content { grid-area: 1 / 3 / 6 / 6; }
    .anime-cover { grid-area: 1 / 1 / 5 / 3; }
}

.anime-cover {
    height: 75vh;
}

img {
    height: 100%;
}

.anime-description {
    font-size: 15px;
    text-align: justify;
}
.rating-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.rating {
    margin-bottom: 0;
    text-align: center;
}

.assessment-stars {
  display: flex;
  justify-content: center;
  align-items: center;
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