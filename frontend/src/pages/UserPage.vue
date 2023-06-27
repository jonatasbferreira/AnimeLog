<script lang="ts" setup>
import { User, AssessmentCollection } from "../types";
import { onBeforeMount, ref } from "vue";
import { router } from "../router/routerScript";
import { useUserService } from "../api/userService";
import { useAssessmentService } from "../api/assessmentService";
import { useUploadURL } from "../composables/useUploadUrl";
import { useUserStore } from "../stores/userStore";

const user = ref({} as User);
const userService = useUserService();
const userStore = useUserStore();

const selectedAnime = ref({ animeId: "-1", assessmentId: "-1", title: "" });

const assessmentService = useAssessmentService();
const assessments = ref({} as AssessmentCollection);

const props = defineProps<{
    id: string,
}>();

onBeforeMount(async () => {
    const userResult = await userService.getUserById(props.id);

    if (userResult instanceof Error) {
        router.push("/404");
    } else {
        user.value = userResult;
    }

    const assessmentsResult = await assessmentService.getAllByUser(
        user.value.id,
    );

    if (!(assessmentsResult instanceof Error)) {
        assessments.value = assessmentsResult;
    }
});

function askConfirmation (
    animeId: string,
    assessmentId: string,
    title: string,
) {
    selectedAnime.value = {
        animeId: animeId,
        assessmentId: assessmentId,
        title: title,
    };
}

async function updateAssessment(newPersonalRating: number, animeId: string) {
    const result = await assessmentService.update(
        animeId,
        userStore.id,
        newPersonalRating,
    );

    if (result instanceof Error) {
        throw result;
    } else {
        const assessmentsResult = await assessmentService.getAllByUser(
            user.value.id,
        );

        if (!(assessmentsResult instanceof Error)) {
            assessments.value = assessmentsResult;
        }
    }
}

async function removeAssessment() {
    const result = await assessmentService.remove(
        selectedAnime.value.assessmentId,
    );

    if (result instanceof Error) {
        throw Error;
    } else {
        const spliceNumber = 1;
        assessments.value.items.splice(
            assessments.value.items.findIndex(
                (m) => m.id === selectedAnime.value.assessmentId,
            ), spliceNumber,
        );
    }
}
</script>

<template>
    <div class="container text-center">
        <div class="mb-5">
            <h4>{{ user.username }}'s Anime List</h4>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">
                        #
                    </th>
                    <th scope="col">
                        Image
                    </th>
                    <th scope="col">
                        Anime Title
                    </th>
                    <th scope="col">
                        Personal Rating
                    </th>
                    <th
                        v-if="userStore.id === props.id"
                        scope="col"
                    >
                        Options
                    </th>
                </tr>
            </thead>
            <tbody
                v-for="assessment in assessments.items"
                :key="assessment.anime.id"
            >
                <tr>
                    <th scope="row">
                        {{ assessments.items.indexOf(assessment) + 1 }}
                    </th>
                    <td>
                        <img
                            class="hover-info image"
                            :src="useUploadURL(assessment.anime.cover.url)"
                        >
                    </td>
                    <td>
                        <router-link
                            :to="`/animes/${assessment.anime.id}`"
                            class="routerlink title"
                        >
                            {{ assessment.anime.title }}
                        </router-link>
                    </td>
                    <td class="assessments">
                        <div
                            v-if="userStore.id === props.id"
                            class="stars"
                        >
                            <div
                                v-for="i in [5,4,3,2,1]"
                                :key="i"
                                class="star"
                                :data-selected="assessment.personalRating === i"
                                @click="[
                                    assessment.personalRating = i,
                                    updateAssessment(i, assessment.anime.id,)
                                ]"
                            >
                                ⭐
                            </div>
                        </div>
                        <div
                            v-else
                            class="viewer-stars"
                        >
                            <div
                                v-for="i in [5,4,3,2,1]"
                                :key="i"
                                class="view-star"
                                :data-selected="assessment.personalRating === i"
                            >
                                ⭐
                            </div>
                        </div>
                    </td>
                    <td
                        v-if="userStore.id === props.id"
                        class="options"
                    >
                        <a
                            class="btn btn-sm btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#confirmationModal"
                            @click="askConfirmation(
                                assessment.anime.id,
                                assessment.id,
                                assessment.anime.title
                            )"
                        >
                            <i class="bi bi-trash" />
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>

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
                            Confirmation
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div class="modal-body">
                        Delete <strong>{{ selectedAnime.title }}</strong>
                        from your list?
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            No
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                            @click="removeAssessment"
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
img {
    width: 3rem;
    height: auto;
}

.routerlink {
    text-decoration: none;
    color: black;
}

.stars, .viewer-stars {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row-reverse;
}

.star, .view-star {
  font-size: 1.5rem;
  user-select: none;
  cursor: pointer;
  opacity: 0.5;
}

.view-star[data-selected="true"] ~ .view-star,
.view-star[data-selected="true"] {
  opacity: 1;
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