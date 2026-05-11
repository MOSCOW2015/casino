<script setup>
import useBlackjack from '../composables/useBlackjack'
import usePlayer from '../composables/usePlayer'

const { playerHand, dealerHand, gameState, message, bet, startGame, hit, stand, double, handScore } = useBlackjack()
const { balance } = usePlayer()
</script>

<template>
    <div class="bj-page">
        <h2>Black Jack Pro</h2>
        <div class="balance">Баланс: {{ balance }} ₽</div>

        <div class="dealer-section">
            <div class="section-label">Дилер{{ gameState === 'finished' ? ` — ${handScore(dealerHand)}` : '' }}</div>
            <div class="hand">
                <div
                    v-for="(card, i) in dealerHand"
                    :key="i"
                    class="card"
                    :class="{ 'card-red': card.suit === '♥' || card.suit === '♦', 'card-hidden': i === 1 && gameState === 'playing' }"
                >
                    <template v-if="i === 1 && gameState === 'playing'">?</template>
                    <template v-else>{{ card.value }}{{ card.suit }}</template>
                </div>
            </div>
        </div>

        <div class="player-section">
            <div class="section-label">Вы — {{ handScore(playerHand) }}</div>
            <div class="hand">
                <div
                    v-for="(card, i) in playerHand"
                    :key="i"
                    class="card"
                    :class="{ 'card-red': card.suit === '♥' || card.suit === '♦' }"
                >
                    {{ card.value }}{{ card.suit }}
                </div>
            </div>
        </div>

        <div v-if="message" class="message">{{ message }}</div>

        <div class="controls" v-if="gameState === 'idle' || gameState === 'finished'">
            <input class="bet-input" type="number" v-model="bet" placeholder="Ставка" min="1" :max="balance" />
            <button class="btn-gold" @click="startGame" :disabled="bet <= 0 || bet > balance">
                {{ gameState === 'finished' ? 'Ещё раз' : 'Начать' }}
            </button>
        </div>

        <div class="controls" v-if="gameState === 'playing'">
            <button class="btn-gold" @click="hit">Ещё</button>
            <button class="btn-outline" @click="stand">Хватит</button>
            <button class="btn-outline" @click="double" :disabled="balance < bet">Удвоить</button>
        </div>
    </div>
</template>

<style scoped>
.bj-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 40px;
}

h2 {
    font-size: 32px;
    color: var(--gold);
    letter-spacing: 4px;
}

.balance {
    font-size: 18px;
    color: var(--casino-text-primary);
}

.dealer-section,
.player-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

.section-label {
    font-size: 14px;
    color: var(--text-secondary);
    letter-spacing: 1px;
    text-transform: uppercase;
}

.hand {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
}

.card {
    width: 70px;
    height: 100px;
    background: var(--casino-bg-card);
    border: var(--border-card);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
    color: var(--casino-text-primary);
}

.card-red {
    color: var(--red);
}

.card-hidden {
    background: var(--casino-bg-surface);
    color: var(--text-secondary);
    font-size: 28px;
}

.message {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 2px;
    color: var(--gold);
}

.controls {
    display: flex;
    gap: 12px;
    align-items: center;
}

.bet-input {
    background: var(--casino-bg-card);
    border: var(--border-card);
    border-radius: var(--radius-sm);
    color: var(--casino-text-primary);
    padding: 10px 16px;
    font-size: 16px;
    width: 140px;
}

.btn-gold {
    background: var(--gold);
    color: #000;
    border: none;
    border-radius: var(--radius-sm);
    padding: 10px 24px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: background var(--t-fast);
}

.btn-gold:hover { background: var(--gold-hover); }
.btn-gold:disabled { background: var(--text-secondary); cursor: not-allowed; opacity: 0.5; }

.btn-outline {
    background: transparent;
    color: var(--casino-text-primary);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: var(--radius-sm);
    padding: 10px 24px;
    font-size: 16px;
    cursor: pointer;
    transition: border-color var(--t-fast);
}

.btn-outline:hover { border-color: var(--gold); color: var(--gold); }
.btn-outline:disabled { opacity: 0.4; cursor: not-allowed; }

@media (max-width: 768px) {
    .bj-page {
        padding: 24px 16px;
        gap: 16px;
    }

    .card {
        width: 52px;
        height: 76px;
        font-size: 14px;
    }

    .controls {
        flex-wrap: wrap;
        justify-content: center;
    }

    .bet-input {
        width: 110px;
    }
}
</style>
