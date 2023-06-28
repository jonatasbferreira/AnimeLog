<script lang="ts" setup>
import { Anime, Comment, CommentCollection } from "../types";
import { useUserStore } from "../stores/userStore";
import { onMounted, ref } from "vue";
import { useCommentService } from "../api/commentService";

const props = defineProps<{
    comments: Comment[];
    anime: Anime;
}>();

const commentService = useCommentService();

const userStore = useUserStore();
const comments = ref({} as CommentCollection);
const newComment = ref("");

async function createComment(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    if (newComment.value) {
        const commentResult = await commentService.create(
            newComment.value,
            props.anime.id,
            userStore.id,
        );
        newComment.value = "";

        if (commentResult instanceof Error) {
            throw commentResult;
        }

        const animeResult = await commentService.getCommentsByAnime(
            props.anime.id,
        );
        if (animeResult instanceof Error) {
            throw animeResult;
        } else {
            comments.value = animeResult;
        }
    }
}

async function deleteComment(commentId: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const result = commentService.deleteComments(commentId);
    if (result instanceof Error) {
        throw result;
    } else {
        const spliceNumber = 1;
        comments.value.items.splice(
            comments.value.items.findIndex(
                (m) => m.id === commentId,
            ), spliceNumber,
        );
    }
}

onMounted(async () => {
    const animeResult = await commentService.getCommentsByAnime(props.anime.id);
    if (!(animeResult instanceof Error)) {
        comments.value = animeResult;
    }
});
</script>

<template>
    <section class="mt-5 mb-5">
        <h4>Comments Section</h4>
        <hr>
        <form
            v-if="userStore.isAuthenticated"
            class="form-comment"
        >
            <input
                id="comment"
                v-model="newComment"
                type="text"
                class="form-control"
                placeholder="Type a comment here!"
            >
            <button
                class="btn btn-primary"
                type="submit"
                @click="createComment($event)"
            >
                Post
            </button>
        </form>
        <div>
            <div
                v-for="comment in comments.items"
                :key="comment.id"
                class="card m-4 text-start"
            >
                <div class="card-body">
                    <p class="card-text">
                        <strong>{{ comment.user.username }}:&nbsp;</strong>
                        {{ comment.text }}
                    </p>
                    <i
                        v-if="comment.user.id === userStore.id ||
                            userStore.isAdmin"
                        class="bi bi-x-circle"
                        @click="deleteComment(comment.id, $event)"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.form-comment {
    display: flex;
    gap: 1rem;
    padding: 0 1.45rem;
    margin-bottom: 1rem;
}

.card-body, .card-text {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

p.card-text {
    margin-bottom: 0;
}

.bi-x-circle:hover {
    cursor:pointer
}
</style>