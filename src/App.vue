<script setup>
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
import { ref } from 'vue';

const username = ref("Игрок")
const isLoggedIn = ref(false)




</script>

<template>
    <AppHeader :isLoggedIn :username/>
    <RouterView />

    <AppFooter />
</template>

<style scoped>

</style>