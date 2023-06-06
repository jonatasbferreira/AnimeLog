<script lang="ts" setup>
defineProps<{
    id: string,
    cover: string,
    title: string,
    rating: number
}>();
</script>

<template>
    <tr>
        <th scope="row">
            {{ id }}
        </th>
        <td>
            <img
                :src="cover"
                class="hover-info image"
            >
        </td>
        <td>{{ title }}</td>
        <td>{{ rating }}</td>
    </tr>
</template>

<style scoped>
img {
    width: 3rem;
    height: auto;
}
</style>