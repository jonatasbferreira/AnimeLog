<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { UserCollection } from "../types/index.ts";
import { useUserService } from "../api/userService";

const userService = useUserService();

const userSearch = ref("");
const users = ref({} as UserCollection);

onMounted(async () => {
    const usersResult = await userService.getUsersByName(userSearch.value);
    if (usersResult instanceof Error) {
        throw usersResult;
    } else {
        users.value = usersResult;
    }
});

async function searchUser(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const usersResult = await userService.getUsersByName(userSearch.value);
    if (usersResult instanceof Error) {
        throw usersResult;
    } else {
        users.value = usersResult;
    }
}
</script>

<template>
    <div class="search-form container">
        <form class="d-flex gap-2">
            <input
                v-model="userSearch"
                class="form-control"
                type="text"
                placeholder="Username"
            >
            <button
                class="btn btn-primary"
                @click="searchUser($event)"
            >
                Search
            </button>
        </form>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">
                        #
                    </th>
                    <th scope="col">
                        Username
                    </th>
                </tr>
            </thead>
            <tbody
                v-for="user in users.items"
                :key="user.id"
            >
                <tr>
                    <td scope="row">
                        {{ users.items.indexOf(user) + 1 }}
                    </td>
                    <td>
                        <router-link
                            :to="`/users/${user.id}`"
                        >
                            {{ user.username }}
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.search-form {
    width: 800px;
    margin-bottom: 3rem;
}

@media (max-width: 600px) {
    .search-form {
        max-width: 450px;
    }
}

a {
    text-decoration: none;
    color: black;
}
</style>