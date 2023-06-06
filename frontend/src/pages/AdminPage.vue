<script lang="ts" setup>
import AnimeListTable from "../components/AnimeListTable.vue";
</script>

<template>
    <div>
        <div class="container-fluid">
            <router-link to="/admin/createanime">
                create anime
            </router-link>

            <AnimeListTable />
        </div>
    </div>
</template>