<script setup>
import { ref } from 'vue'
import useRoulette from '../composables/useRoulette'
import usePlayer from '../composables/usePlayer'

const { NUMBER_COLORS, bets, result, winnings, gameState, placeBet, clearBets, spin, newGame } = useRoulette()
const { balance } = usePlayer()

const betAmount = ref(100)
const numbers = Array.from({ length: 37 }, (_, i) => i)

function getBetOnNumber(n) {
    return bets.value.find(b => b.type === 'number' && b.value === n)?.amount
}
</script>

<template>
    <div class="roulette-page">
        <h2>Roulette</h2>
        <div class="balance">Баланс: {{ balance }} ₽</div>

        <div v-if="gameState === 'result'" class="result-overlay">
            <div class="result-number" :class="'color-' + NUMBER_COLORS[result]">
                {{ result }}
            </div>
            <div class="result-text">
                {{ winnings > 0 ? `Выигрыш +${winnings} ₽` : 'Не повезло' }}
            </div>
            <button class="btn-gold" @click="newGame">Новая игра</button>
        </div>

        <template v-else>
            <div class="bet-controls">
                <label class="bet-label">Ставка:</label>
                <input class="bet-input" type="number" v-model="betAmount" min="1" :max="balance" />
            </div>

            <div class="board">
                <div
                    class="cell cell-zero"
                    @click="placeBet('number', 0, betAmount)"
                >
                    <span>0</span>
                    <span v-if="getBetOnNumber(0)" class="chip">{{ getBetOnNumber(0) }}</span>
                </div>
                <div class="numbers-grid">
                    <div
                        v-for="n in numbers.slice(1)"
                        :key="n"
                        class="cell"
                        :class="'color-' + NUMBER_COLORS[n]"
                        @click="placeBet('number', n, betAmount)"
                    >
                        <span>{{ n }}</span>
                        <span v-if="getBetOnNumber(n)" class="chip">{{ getBetOnNumber(n) }}</span>
                    </div>
                </div>
            </div>

            <div class="outside-bets">
                <button class="btn-outside" @click="placeBet('color', 'Красное', betAmount)">Красное</button>
                <button class="btn-outside" @click="placeBet('color', 'Чёрное', betAmount)">Чёрное</button>
                <button class="btn-outside" @click="placeBet('parity', 'Чётное', betAmount)">Чётное</button>
                <button class="btn-outside" @click="placeBet('parity', 'Нечётное', betAmount)">Нечётное</button>
                <button class="btn-outside" @click="placeBet('half', 'Маленькие', betAmount)">1–18</button>
                <button class="btn-outside" @click="placeBet('half', 'Большие', betAmount)">19–36</button>
                <button class="btn-outside" @click="placeBet('dozen', '1', betAmount)">1–12</button>
                <button class="btn-outside" @click="placeBet('dozen', '2', betAmount)">13–24</button>
                <button class="btn-outside" @click="placeBet('dozen', '3', betAmount)">25–36</button>
            </div>

            <div class="active-bets" v-if="bets.length > 0">
                <span v-for="(b, i) in bets" :key="i" class="bet-tag">
                    {{ b.type === 'number' ? `№${b.value}` : b.value }} — {{ b.amount }} ₽
                </span>
            </div>

            <div class="action-buttons">
                <button class="btn-gold" @click="spin" :disabled="bets.length === 0">Крутить</button>
                <button class="btn-outline" @click="clearBets" :disabled="bets.length === 0">Убрать ставки</button>
            </div>
        </template>
    </div>
</template>

<style scoped>
.roulette-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 40px 20px;
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

.bet-controls {
    display: flex;
    align-items: center;
    gap: 12px;
}

.bet-label {
    color: var(--text-secondary);
    font-size: 14px;
}

.bet-input {
    background: var(--casino-bg-card);
    border: var(--border-card);
    border-radius: var(--radius-sm);
    color: var(--casino-text-primary);
    padding: 8px 14px;
    font-size: 16px;
    width: 120px;
}

.board {
    display: flex;
    gap: 4px;
    align-items: stretch;
}

.cell-zero {
    background: #1a6b3a;
    width: 48px;
    border-radius: var(--radius-sm);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    font-weight: 700;
    color: #fff;
    font-size: 14px;
    transition: opacity var(--t-fast);
}

.cell-zero:hover { opacity: 0.8; }

.numbers-grid {
    display: grid;
    grid-template-columns: repeat(12, 48px);
    grid-template-rows: repeat(3, 48px);
    grid-auto-flow: column;
    gap: 3px;
}

.cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm);
    cursor: pointer;
    position: relative;
    font-weight: 700;
    color: #fff;
    font-size: 13px;
    transition: opacity var(--t-fast);
}

.cell:hover { opacity: 0.75; }

.color-red   { background: #c0392b; }
.color-black { background: #1a1a1a; border: 1px solid rgba(255,255,255,0.1); }
.color-green { background: #1a6b3a; }

.chip {
    position: absolute;
    bottom: 2px;
    right: 2px;
    background: var(--gold);
    color: #000;
    font-size: 9px;
    font-weight: 700;
    padding: 1px 3px;
    border-radius: 4px;
}

.outside-bets {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    max-width: 620px;
}

.btn-outside {
    background: var(--casino-bg-card);
    border: var(--border-card);
    border-radius: var(--radius-sm);
    color: var(--casino-text-primary);
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    transition: border-color var(--t-fast), color var(--t-fast);
}

.btn-outside:hover { border-color: var(--gold); color: var(--gold); }

.active-bets {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    max-width: 600px;
}

.bet-tag {
    background: var(--casino-bg-card);
    border: var(--border-card);
    border-radius: var(--radius-sm);
    color: var(--gold);
    font-size: 12px;
    padding: 4px 10px;
}

.action-buttons {
    display: flex;
    gap: 12px;
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

.result-overlay {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 40px;
}

.result-number {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    font-weight: 700;
    color: #fff;
}

.result-text {
    font-size: 24px;
    font-weight: 700;
    color: var(--gold);
    letter-spacing: 2px;
}

@media (max-width: 768px) {
    .roulette-page {
        padding: 24px 12px;
        gap: 16px;
    }

    .numbers-grid {
        grid-template-columns: repeat(12, 28px);
        grid-template-rows: repeat(3, 28px);
        gap: 2px;
    }

    .cell-zero {
        width: 28px;
        font-size: 11px;
    }

    .cell {
        font-size: 10px;
    }

    .outside-bets {
        gap: 6px;
    }

    .btn-outside {
        padding: 6px 10px;
        font-size: 12px;
    }

    .action-buttons {
        flex-wrap: wrap;
        justify-content: center;
    }
}
</style>
