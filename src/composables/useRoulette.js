import { ref } from 'vue'
import usePlayer from './usePlayer'

const { balance } = usePlayer()

const NUMBER_COLORS = {
    0: 'green',
    1: 'red', 2: 'black', 3: 'red', 4: 'black', 5: 'red', 6: 'black',
    7: 'red', 8: 'black', 9: 'red', 10: 'black', 11: 'black', 12: 'red',
    13: 'black', 14: 'red', 15: 'black', 16: 'red', 17: 'black', 18: 'red',
    19: 'red', 20: 'black', 21: 'red', 22: 'black', 23: 'red', 24: 'black',
    25: 'red', 26: 'black', 27: 'red', 28: 'black', 29: 'black', 30: 'red',
    31: 'black', 32: 'red', 33: 'black', 34: 'red', 35: 'black', 36: 'red',
}

const bets = ref([])
const result = ref(null)
const winnings = ref(0)
const gameState = ref('betting')

function placeBet(type, value, amount) {
    if (amount <= 0 || amount > balance.value) return

    const existing = bets.value.find(b => b.type === type && b.value === value)

    if (existing) {
        existing.amount += Number(amount)
    } else {
        bets.value.push({ type, value, amount: Number(amount) })
    }

    balance.value -= Number(amount)
}

function clearBets() {
    for (const bet of bets.value) {
        balance.value += bet.amount
    }
    bets.value = []
}

function spin() {
    if (bets.value.length === 0) return

    gameState.value = 'result'

    const number = Math.floor(Math.random() * 37)
    result.value = number
    winnings.value = 0

    for (const bet of bets.value) {
        const payout = resolveBet(bet, number)
        winnings.value += payout
        balance.value += payout
    }
}

function resolveBet(bet, number) {
    const color = NUMBER_COLORS[number]

    if (bet.type === 'number') {
        if (bet.value === number) {
            return bet.amount * 36
        }
        return 0
    }

    if (bet.type === 'color') {
        if (bet.value === 'Красное' && color === 'red') {
            return bet.amount * 2
        }
        if (bet.value === 'Чёрное' && color === 'black') {
            return bet.amount * 2
        }
        return 0
    }

    if (bet.type === 'parity') {
        if (number === 0) return 0
        if (bet.value === 'Чётное' && number % 2 === 0) {
            return bet.amount * 2
        }
        if (bet.value === 'Нечётное' && number % 2 !== 0) {
            return bet.amount * 2
        }
        return 0
    }

    if (bet.type === 'half') {
        if (number === 0) return 0
        if (bet.value === 'Маленькие' && number <= 18) {
            return bet.amount * 2
        }
        if (bet.value === 'Большие' && number >= 19) {
            return bet.amount * 2
        }
        return 0
    }

    if (bet.type === 'dozen') {
        if (number === 0) return 0
        if (bet.value === '1' && number >= 1 && number <= 12) {
            return bet.amount * 3
        }
        if (bet.value === '2' && number >= 13 && number <= 24) {
            return bet.amount * 3
        }
        if (bet.value === '3' && number >= 25 && number <= 36) {
            return bet.amount * 3
        }
        return 0
    }

    return 0
}

function newGame() {
    bets.value = []
    result.value = null
    winnings.value = 0
    gameState.value = 'betting'
}

export default function useRoulette() {
    return { NUMBER_COLORS, bets, result, winnings, gameState, placeBet, clearBets, spin, newGame }
}
