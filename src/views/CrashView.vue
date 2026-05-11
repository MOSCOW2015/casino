<script setup>
import { onUnmounted } from 'vue'
import useCrash from '../composables/useCrash'
import usePlayer from '../composables/usePlayer'

const { multiplier, gameState, bet, cashoutMultiplier, startGame, cashOut, reset, stopInterval } = useCrash()
const { balance } = usePlayer()

onUnmounted(() => {
    stopInterval()
})
</script>

<template>
    <div class="crash-page">
        <h2>Краш</h2>
        <div class="balance">Баланс: {{ balance }} ₽</div>

        <div class="multiplier-display" :class="{
            'state-running': gameState === 'running',
            'state-crashed': gameState === 'crashed',
            'state-cashed': gameState === 'cashedOut'
        }">
            <div class="multiplier-value">{{ multiplier.toFixed(2) }}x</div>
            <div class="multiplier-label">
                <span v-if="gameState === 'idle'">Сделай ставку</span>
                <span v-else-if="gameState === 'running'">Летим!</span>
                <span v-else-if="gameState === 'crashed'">КРАШ!</span>
                <span v-else-if="gameState === 'cashedOut'">Забрал на {{ cashoutMultiplier.toFixed(2) }}x</span>
            </div>
        </div>

        <div class="controls" v-if="gameState === 'idle' || gameState === 'crashed' || gameState === 'cashedOut'">
            <input
                class="bet-input"
                type="number"
                v-model="bet"
                placeholder="Ставка"
                min="1"
                :max="balance"
            />
            <button class="btn-gold" @click="gameState === 'idle' ? startGame() : reset()">
                {{ gameState === 'idle' ? 'Начать' : 'Ещё раз' }}
            </button>
        </div>

        <div class="controls" v-if="gameState === 'running'">
            <div class="current-win">Сейчас: {{ Math.floor(bet * multiplier) }} ₽</div>
            <button class="btn-cashout" @click="cashOut">Забрать</button>
        </div>

        <div class="result" v-if="gameState === 'crashed'">
            Краш на {{ multiplier.toFixed(2) }}x — вы проиграли {{ bet }} ₽
        </div>
        <div class="result result-win" v-if="gameState === 'cashedOut'">
            Выигрыш +{{ Math.floor(bet * cashoutMultiplier) }} ₽
        </div>
    </div>
</template>

<style scoped>
.crash-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
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

.multiplier-display {
    width: 260px;
    height: 260px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 3px solid var(--border-card);
    background: var(--casino-bg-card);
    transition: border-color 0.2s, background 0.2s;
    gap: 8px;
}

.state-running {
    border-color: var(--green);
    background: rgba(45, 198, 83, 0.05);
}

.state-crashed {
    border-color: var(--red);
    background: rgba(230, 57, 70, 0.08);
}

.state-cashed {
    border-color: var(--gold);
    background: rgba(212, 175, 55, 0.08);
}

.multiplier-value {
    font-size: 56px;
    font-weight: 700;
    color: var(--casino-text-primary);
    letter-spacing: 2px;
}

.state-running  .multiplier-value { color: var(--green); }
.state-crashed  .multiplier-value { color: var(--red); }
.state-cashed   .multiplier-value { color: var(--gold); }

.multiplier-label {
    font-size: 14px;
    color: var(--text-secondary);
    letter-spacing: 1px;
    text-transform: uppercase;
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
    padding: 10px 28px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: background var(--t-fast);
}

.btn-gold:hover { background: var(--gold-hover); }

.btn-cashout {
    background: var(--green);
    color: #000;
    border: none;
    border-radius: var(--radius-sm);
    padding: 12px 36px;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    transition: opacity var(--t-fast);
    animation: pulse 0.8s infinite alternate;
}

.btn-cashout:hover { opacity: 0.85; }

@keyframes pulse {
    from { box-shadow: 0 0 0 0 rgba(45, 198, 83, 0.4); }
    to   { box-shadow: 0 0 0 10px rgba(45, 198, 83, 0); }
}

.current-win {
    font-size: 20px;
    font-weight: 700;
    color: var(--green);
}

.result {
    font-size: 18px;
    color: var(--red);
    font-weight: 600;
}

.result-win {
    color: var(--gold);
}

@media (max-width: 768px) {
    .crash-page {
        padding: 24px 16px;
        gap: 20px;
    }

    .multiplier-display {
        width: 200px;
        height: 200px;
    }

    .multiplier-value {
        font-size: 40px;
    }

    .controls {
        flex-wrap: wrap;
        justify-content: center;
    }
}
</style>
