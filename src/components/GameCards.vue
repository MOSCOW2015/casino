<script setup>
import { ref } from 'vue';

const games = ref([
    {id: 1,
    name: "Book of Ra",
    provider: "Royal Casino",
    badge: "NEW",
    emoji: '🎰',
    route: '/slots'},

    {id: 2,
    name: "Black Jack Pro",
    provider: "Royal Casino",
    badge: "FIRE",
    emoji: '♠️',
    route: '/blackjack'},

    {id: 3,
    name: "Poker Texas",
    provider: "Royal Casino",
    badge: "NEW",
    emoji: '♦️',
    route: '/poker'},

    {id: 4,
    name: "Roulette",
    provider: "Royal Casino",
    badge: "Live",
    emoji: '🎡',
    route: '/roulette'},

    
])
</script>

<template>
        <section>
            <div v-for="game in games" :key="game.id">
                <RouterLink :to="game.route">
                    <div>{{ game.name }}</div>
                    <div>{{ game.provider }}</div>
                    <div :class="{
                    'badge-new': game.badge === 'NEW',
                    'badge-fire': game.badge === 'FIRE',
                    'badge-live': game.badge === 'Live'
                    }">
                    {{ game.badge }}
                    </div>

                <div>{{ game.emoji }}</div>
                </RouterLink>
            </div>
        </section>
</template>

<style scoped>
section {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}

.badge-new {
    color: var(--green);
}

.badge-fire {
    color: var(--red);
}

.badge-live {
    color: rgb(0, 0, 255);
}

.badge-jackpot {
    color: var(--gold);
}
</style>