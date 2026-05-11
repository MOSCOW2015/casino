<script setup>

import { computed, ref } from 'vue';
import usePlayer from '../composables/usePlayer';
import useSlots from '../composables/useSlots';

const { spin } = useSlots()
const { balance, recordGame } = usePlayer()
const reels = ref([])
const bet = ref(0)
const hasSpin = ref(false)
const lastWin = ref(0)

const streak = computed(() => {
    if (reels.value.length === 0) return 0
    const first = reels.value[0]?.emoji
    let count = 0
    for (let i = 0; i < reels.value.length; i++) {
        if (reels.value[i]?.emoji === first) count++
        else break
    }
    return count
})

const result = computed(() => {
    if (streak.value === 5) return 'jackpot'
    if (streak.value === 4) return 'bigwin'
    if (streak.value === 3) return 'win'
    if (streak.value === 2) return 'smallwin'
    return 'lose'
})

function clickSpin() {
    hasSpin.value = true
    reels.value = spin()
    const betAmount = Number(bet.value)
    balance.value -= betAmount

    if (streak.value >= 2) {
        const payout = reels.value[0].payouts[streak.value]
        lastWin.value = Math.floor(betAmount * payout)
        balance.value += lastWin.value
    } else {
        lastWin.value = 0
    }
    recordGame(lastWin.value)
}

</script>

<template>
    <div class="slots-page">
        <h2>Слоты</h2>
        <div class="balance">Баланс: {{ balance }} ₽</div>
        <div class="controls">
            <input type="number" placeholder="Введите ставку" v-model="bet"> 
            <button @click="clickSpin" :disabled="bet <= 0 || bet > balance">Крутить</button>
        </div>
        <div class="reels">
            <div class="reel">{{ reels[0]?.emoji }}</div>
            <div class="reel">{{ reels[1]?.emoji }}</div>
            <div class="reel">{{ reels[2]?.emoji }}</div>
            <div class="reel">{{ reels[3]?.emoji }}</div>
            <div class="reel">{{ reels[4]?.emoji }}</div>
        </div>

        <div class="result-block">
            <div v-if="hasSpin" class="result-text" :class="{
                'result-jackpot': result === 'jackpot',
                'result-bigwin':  result === 'bigwin',
                'result-win':     result === 'win',
                'result-smallwin':result === 'smallwin',
                'result-lose':    result === 'lose'
            }">
                {{ result === 'jackpot'  ? 'ДЖЕКПОТ!'        :
                   result === 'bigwin'   ? 'БОЛЬШОЙ ВЫИГРЫШ' :
                   result === 'win'      ? 'ВЫИГРЫШ'         :
                   result === 'smallwin' ? 'МАЛЫЙ ВЫИГРЫШ'   :
                                          'ПРОИГРЫШ' }}
                <span v-if="lastWin > 0"> +{{ lastWin }} ₽</span>
            </div>
        </div>
    </div>

</template>

<style scoped>
.reels {
    display: flex;
    gap: 12px;
}

.reel {
    width: 100px;
    height: 100px;
    background-color: var(--casino-bg-card);
    border: var(--border-card);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
}

.slots-page {
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
    font-size: 20px;
    color: var(--casino-text-primary);
}

.controls {
    display: flex;
    gap: 12px;
}

.controls input {
    background: var(--casino-bg-card);
    border: var(--border-card);
    border-radius: var(--radius-sm);
    color: var(--casino-text-primary);
    padding: 10px 16px;
    font-size: 16px;
    width: 140px;
}

.controls button {
    background: var(--gold);
    color: #000;
    border: none;
    border-radius: var(--radius-sm);
    padding: 10px 24px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
}

.controls button:disabled {
    background: var(--text-secondary);
    cursor: not-allowed;
    opacity: 0.5;
}

.result-block {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.result-text {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 2px;
}

.result-jackpot  { color: var(--gold); }
.result-bigwin   { color: var(--neon); }
.result-win      { color: var(--green); }
.result-smallwin { color: var(--casino-text-primary); }
.result-lose     { color: var(--red); }

@media (max-width: 768px) {
    .slots-page {
        padding: 24px 16px;
        gap: 16px;
    }

    .reels {
        gap: 6px;
    }

    .reel {
        width: 56px;
        height: 56px;
        font-size: 28px;
    }

    .controls input {
        width: 110px;
    }
}
</style>