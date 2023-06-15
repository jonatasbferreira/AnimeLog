<script lang="ts" setup>
import { User } from "../types";
import { useUserService } from "../api/userService";
import { onBeforeMount, ref } from "vue";
import { router } from "../router/routerScript";

const user = ref({} as User);
const userService = useUserService();

const props = defineProps<{
    id: string,
}>();

onBeforeMount(async () => {
    const result = await userService.getUserById(props.id);

    if (result instanceof Error) {
        router.push("/404");
    } else {
        user.value = result;
    }
});
</script>

<template>
    <div class="container">
        <div class="row">
            <h1>{{ user.username }}'s Profile</h1>
        </div>
    </div>
</template>

<style scoped></style>