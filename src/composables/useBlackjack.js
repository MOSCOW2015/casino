import { ref } from 'vue'
import usePlayer from './usePlayer'

const { balance, recordGame } = usePlayer()

const deck = ref([])
const playerHand = ref([])
const dealerHand = ref([])
const gameState = ref('idle') // idle | playing | dealerTurn | finished
const message = ref('')
const bet = ref(0)

function createDeck() {
    const suits = ['♠', '♥', '♦', '♣']
    const values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
    const result = []
    for (const suit of suits) {
        for (const value of values) {
            result.push({ suit, value })
        }
    }
    return result
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}

function cardScore(value) {
    if (['J', 'Q', 'K'].includes(value)) return 10
    if (value === 'A') return 11
    return Number(value)
}

function handScore(hand) {
    let score = hand.reduce((sum, card) => sum + cardScore(card.value), 0)
    let aces = hand.filter(c => c.value === 'A').length
    while (score > 21 && aces > 0) {
        score -= 10
        aces--
    }
    return score
}

function startGame() {
    if (bet.value <= 0 || bet.value > balance.value) return
    deck.value = shuffle(createDeck())
    playerHand.value = [deck.value.pop(), deck.value.pop()]
    dealerHand.value = [deck.value.pop(), deck.value.pop()]
    gameState.value = 'playing'
    message.value = ''
    balance.value -= bet.value

    if (handScore(playerHand.value) === 21) {
        finish()
    }
}

function hit() {
    if (gameState.value !== 'playing') return
    playerHand.value.push(deck.value.pop())
    if (handScore(playerHand.value) > 21) {
        finish()
    }
}

function stand() {
    if (gameState.value !== 'playing') return
    gameState.value = 'dealerTurn'
    while (handScore(dealerHand.value) < 17) {
        dealerHand.value.push(deck.value.pop())
    }
    finish()
}

function double() {
    if (gameState.value !== 'playing') return
    balance.value -= bet.value
    bet.value *= 2
    playerHand.value.push(deck.value.pop())
    stand()
}

function finish() {
    gameState.value = 'finished'
    const playerScore = handScore(playerHand.value)
    const dealerScore = handScore(dealerHand.value)

    let win = 0
    if (playerScore > 21) {
        message.value = 'Перебор — вы проиграли'
    } else if (dealerScore > 21 || playerScore > dealerScore) {
        win = playerScore === 21 && playerHand.value.length === 2
            ? Math.floor(bet.value * 2.5)
            : bet.value * 2
        balance.value += win
        message.value = `Вы выиграли +${win} ₽`
    } else if (playerScore === dealerScore) {
        balance.value += bet.value
        message.value = 'Ничья — ставка возвращена'
    } else {
        message.value = 'Дилер выиграл'
    }
    recordGame(win)
}

export default function useBlackjack() {
    return { playerHand, dealerHand, gameState, message, bet, startGame, hit, stand, double, handScore }
}
