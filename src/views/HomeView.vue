<script setup>
import GameCards from '../components/GameCards.vue';

</script>
<template>
    <main>
        <section class="hero">
        <h1>ROYALE CASINO</h1>
        <RouterLink to="/slots" class="hero-btn">Играть сейчас</RouterLink>
    </section>

    <GameCards />
    </main>

</template>
<style scoped>
.hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    text-align: center;
    gap: 20px;
}

.hero h1 {
    font-size: 64px;
    color: var(--gold);
    letter-spacing: 8px;
}

.hero p {
    font-size: 20px;
    color: var(--text-secondary);
}

.hero-btn {
    background: var(--gold);
    color: #000;
    padding: 14px 40px;
    border-radius: var(--radius-md);
    font-size: 18px;
    font-weight: 700;
    text-decoration: none;
    letter-spacing: 2px;
}

</style>