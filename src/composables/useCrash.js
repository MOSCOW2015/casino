import { ref } from 'vue'
import usePlayer from './usePlayer'

const { balance } = usePlayer()

const multiplier = ref(1.00)
const gameState = ref('idle') // idle | running | crashed | cashedOut
const bet = ref(0)
const cashoutMultiplier = ref(null)
const crashPoint = ref(null)

let interval = null

function generateCrashPoint() {
    const r = Math.random()
    if (r < 0.01) return 1.00
    return Math.max(1.00, Math.floor((100 / (r * 100)) * 100) / 100)
}

function startGame() {
    if (bet.value <= 0 || bet.value > balance.value) return

    balance.value -= bet.value
    multiplier.value = 1.00
    cashoutMultiplier.value = null
    crashPoint.value = generateCrashPoint()
    gameState.value = 'running'

    interval = setInterval(() => {
        multiplier.value = Math.round((multiplier.value + 0.01) * 100) / 100

        if (multiplier.value >= crashPoint.value) {
            multiplier.value = crashPoint.value
            gameState.value = 'crashed'
            clearInterval(interval)
        }
    }, 100)
}

function cashOut() {
    if (gameState.value !== 'running') return

    clearInterval(interval)
    cashoutMultiplier.value = multiplier.value
    const win = Math.floor(bet.value * multiplier.value)
    balance.value += win
    gameState.value = 'cashedOut'
}

function reset() {
    gameState.value = 'idle'
    multiplier.value = 1.00
    cashoutMultiplier.value = null
    crashPoint.value = null
}

export default function useCrash() {
    return { multiplier, gameState, bet, cashoutMultiplier, startGame, cashOut, reset }
}
