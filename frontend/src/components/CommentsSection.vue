<script lang="ts" setup>
import { Comment } from "../types";

defineProps<{
    comments: Comment[];
}>();
</script>

<template>
    <section class="mt-5">
        <h4>Comments Section</h4>
        <hr>
        <div v-if="comments.length > 0">
            <div
                v-for="comment in comments"
                :key="comment.id"
                class="card m-4 text-start"
            >
                <div class="card-body">
                    <p class="card-text">
                        {{ comment.text }}
                    </p>
                </div>
            </div>
        </div>
        <div v-else>
            <p>No comments yet</p>
        </div>
    </section>
</template>