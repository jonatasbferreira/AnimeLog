<script lang="ts" setup>
defineProps<{
    number: number,
    cover: string,
    title: string,
    score: number
}>();
</script>

<template>
    <tr>
        <th scope="row">
            {{ number }}
        </th>
        <td>
            <img
                :src="cover"
                class="hover-info image"
            >
        </td>
        <td>{{ title }}</td>
        <td>{{ score }}</td>
    </tr>
</template>

<style scoped>
img {
    width: 3rem;
    height: auto;
}
</style>