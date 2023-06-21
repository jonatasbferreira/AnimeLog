<script lang="ts" setup>
import { useUploadURL } from "../composables/useUploadUrl";
import { useAnimeService } from "../api/animeService";
import { AnimeCollection } from "../types";
import { ref, computed, onMounted } from "vue";

const animeService = useAnimeService();
const animeCollection = ref({} as AnimeCollection);
const animes = computed(() => animeCollection.value.items);

const selectedAnime = ref({ id: "-1", title: "" });

onMounted(async () => {
    const result = await animeService.get();
    if (result instanceof Error) {
        throw result as Error;
    } else {
        animeCollection.value = result;
    }
});

function askConfirmation(id: string, title: string) {
    selectedAnime.value = { id: id, title: title };
}

async function deleteAnime() {
    const result = await animeService.remove(selectedAnime.value.id);
    if (result instanceof Error) {
        throw result;
    } else {
        const spliceNumber = 1;
        animeCollection.value.items.splice(
            animeCollection.value.items.findIndex(
                (m) => m.id === selectedAnime.value.id,
            ), spliceNumber,
        );
    }
}
</script>

<template>
    <div>
        <div class="container">
            <router-link
                class="btn btn-primary mb-5"
                to="/admin/create"
            >
                create anime
            </router-link>

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
                            Rating
                        </th>
                        <th scope="col">
                            Options
                        </th>
                    </tr>
                </thead>
                <tbody
                    v-for="anime in animes"
                    :key="anime.id"
                >
                    <tr>
                        <th scope="row">
                            {{ anime.id }}
                        </th>
                        <td>
                            <img
                                :src="`${useUploadURL(anime.cover.url)}`"
                                class="hover-info image"
                            >
                        </td>
                        <td>
                            <router-link
                                :to="`/animes/${anime.id}`"
                                class="routerlink"
                            >
                                {{ anime.title }}
                            </router-link>
                        </td>
                        <td>{{ anime.rating }}</td>
                        <td>
                            <router-link
                                :to="`/admin/${anime.id}/update`"
                                class="btn btn-sm btn-primary me-2"
                                data-bs-target="#confirmationModal"
                            >
                                <i class="bi bi-pencil" />
                            </router-link>
                            <a
                                class="btn btn-sm btn-danger"
                                data-bs-toggle="modal"
                                data-bs-target="#confirmationModal"
                                @click="askConfirmation(anime.id, anime.title)"
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
                                @click="deleteAnime"
                            >
                                Yes
                            </button>
                        </div>
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