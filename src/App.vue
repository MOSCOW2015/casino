<script setup>
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
import { ref } from 'vue';
import usePlayer from './composables/usePlayer';

const { isLoggedIn, username } = usePlayer()
</script>

<template>
    <AppHeader :isLoggedIn :username/>
    <RouterView />

    <AppFooter />
</template>

<style scoped>

</style>