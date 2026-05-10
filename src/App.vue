<script setup>
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
import { ref } from 'vue';
import usePlayer from './composables/usePlayer';

const { isLoggedIn, username, balance } = usePlayer()
</script>

<template>
    <AppHeader :isLoggedIn :username :balance/>
    <RouterView />

    <AppFooter />
</template>

<style scoped>

</style>