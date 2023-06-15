<script lang="ts" setup>
import { User, AssessmentCollection, AnimeCollection } from "../types";
import { onBeforeMount, ref } from "vue";
import { router } from "../router/routerScript";
import { useAnimeService } from "../api/animeService";
import { useUserService } from "../api/userService";
import { useAssessmentService } from "../api/assessmentService";

const user = ref({} as User);
const userService = useUserService();

const animeService = useAnimeService();
const animeCollection = ref({} as AnimeCollection);
const selectedAnime = ref({ id: "-1", title: "" });

const assessmentService = useAssessmentService();
const assessments = ref({} as AssessmentCollection);

const props = defineProps<{
    id: string,
}>();

function askConfirmation(id: string, title: string) {
    selectedAnime.value = { id: id, title: title };
}

onBeforeMount(async () => {
    const userResult = await userService.getUserById(props.id);

    if (userResult instanceof Error) {
        router.push("/404");
    } else {
        user.value = userResult;
    }

    const animesResult = await animeService.get();
    if (animesResult instanceof Error) {
        throw animesResult as Error;
    } else {
        animeCollection.value = animesResult;
    }

    const assessmentsResult = await assessmentService.getByUser(user.value.id);
    if (!(assessmentsResult instanceof Error)) {
        assessments.value = assessmentsResult;
    }
});
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
                    <th scope="col">
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
                        >
                    </td>
                    <td>
                        <router-link
                            :to="`/animes/${assessment.anime.id}`"
                            class="routerlink"
                        >
                            {{ assessment.anime.title }}
                        </router-link>
                    </td>
                    <td>{{ assessment.personalRating }}</td>
                    <td>
                        <router-link
                            to="#"
                            class="btn btn-sm btn-primary me-2"
                            data-bs-target="#confirmationModal"
                        >
                            <i class="bi bi-pencil" />
                        </router-link>
                        <a
                            class="btn btn-sm btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#confirmationModal"
                            @click="askConfirmation(
                                assessment.anime.id,
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
                        Are you sure you want to delete the anime
                        <strong>{{ selectedAnime.title }}</strong>?
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
</style>