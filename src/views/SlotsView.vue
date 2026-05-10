<script setup>

import { computed, ref } from 'vue';
import usePlayer from '../composables/usePlayer';
import useSlots from '../composables/useSlots';

const { spin } = useSlots()
const {balance} = usePlayer()
const reels = ref([])
const bet = ref(0)
const hasSpin = ref(false)


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
        balance.value += Math.floor(betAmount * payout)
    }
}

</script>

<template>
    <div>Слоты</div>
    <div>{{ balance }}</div>
    <input type="number" placeholder="Введите ставку" v-model="bet"> 
    <button @click="clickSpin">Крутить</button>
    <div v-if="hasSpin">
        <div>{{ reels[0]?.emoji }}</div>
        <div>{{ reels[1]?.emoji }}</div>
        <div>{{ reels[2]?.emoji }}</div>
        <div>{{reels[3]?.emoji}}</div>
        <div>{{reels[4]?.emoji}}</div>
        {{ result }}
    </div>
</template>

<style scoped>

</style>