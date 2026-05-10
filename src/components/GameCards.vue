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
    <section class="games-grid">
        <div class="game-card" v-for="game in games" :key="game.id">
            <RouterLink :to="game.route">
                <div class="game-emoji">{{ game.emoji }}</div>
                <div class="game-name">{{ game.name }}</div>
                <div class="game-provider">{{ game.provider }}</div>
                <div class="game-badge" :class="{
                    'badge-new': game.badge === 'NEW',
                    'badge-fire': game.badge === 'FIRE',
                    'badge-live': game.badge === 'Live'
                }">{{ game.badge }}</div>
            </RouterLink>
        </div>
    </section>

</template>

<style scoped>


.games-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding: 40px;
}

.game-card {
    background: var(--casino-bg-card);
    border: var(--border-card);
    border-radius: var(--radius-md);
    overflow: hidden;
    transition: transform var(--t-base);
}

.game-card:hover {
    transform: translateY(-4px);
}

.game-card a {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 16px;
    gap: 8px;
    text-decoration: none;
}

.game-emoji { font-size: 48px; }

.game-name {
    font-size: 16px;
    font-weight: 700;
    color: var(--casino-text-primary);
}

.game-provider {
    font-size: 12px;
    color: var(--text-secondary);
}

.game-badge {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    padding: 2px 8px;
    border-radius: var(--radius-sm);
}

.badge-new  { color: var(--green); background: rgba(45,198,83,0.1); }
.badge-fire { color: var(--red);   background: rgba(230,57,70,0.1); }
.badge-live { color: var(--neon);  background: rgba(157,78,221,0.1); }

</style>